// LocationRiskMap.jsx
// Integrated into ZeroShield Dashboard — matches the existing dark glass aesthetic.
// Used as the "Map" tab in PageDashboard via Dashboard.jsx.

import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import {
  MapContainer, TileLayer, Marker, Popup, Polyline, useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ── Leaflet icon fix ─────────────────────────────────────────────────────── */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const userIcon = new L.DivIcon({
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#3b82f6;border:2.5px solid #fff;box-shadow:0 0 0 3px rgba(59,130,246,0.35);"></div>`,
  className: "", iconSize: [14,14], iconAnchor: [7,7],
});
const destIcon = new L.DivIcon({
  html: `<div style="width:18px;height:18px;border-radius:50%;background:#f97316;border:2.5px solid #fff;box-shadow:0 0 0 3px rgba(249,115,22,0.35);display:flex;align-items:center;justify-content:center;font-size:8px;">📦</div>`,
  className: "", iconSize: [18,18], iconAnchor: [9,9],
});

/* ── API key ─────────────────────────────────────────────────────────────── */
const OWM_KEY =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_OWM_KEY
    ? import.meta.env.VITE_OWM_KEY
    : "DEMO_KEY";

/* ── Logic ────────────────────────────────────────────────────────────────── */
function calcSafety(rain, wind) {
  if (rain > 60) return "HIGH_RISK";
  if (wind > 25) return "MODERATE";
  return "SAFE";
}

const SAFETY_META = {
  SAFE:      { label:"SAFE",          color:"#10b981", bg:"rgba(16,185,129,0.1)",  border:"rgba(16,185,129,0.25)"  },
  MODERATE:  { label:"MODERATE RISK", color:"#f59e0b", bg:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.25)"  },
  HIGH_RISK: { label:"HIGH RISK",     color:"#ef4444", bg:"rgba(239,68,68,0.1)",  border:"rgba(239,68,68,0.25)"   },
};

function calcAIScore({ rain, wind, temp, aqi }) {
  const rp = Math.min(rain,100)*0.35;
  const wp = Math.min((wind/50)*100,100)*0.25;
  const tp = temp<0?20:temp>40?15:temp<5||temp>35?10:0;
  const ap = Math.min(((aqi-1)/4)*100,100)*0.15;
  return Math.max(0, Math.min(100, Math.round(100-rp-wp-tp-ap)));
}

function scoreColor(s){ return s>=75?"#10b981":s>=45?"#f59e0b":"#ef4444"; }
function scoreLabel(s){ return s>=75?"Good":s>=45?"Fair":"Poor"; }

function aiRecommendation({ rain, wind, score }) {
  if (score>=75) return rain>20?"Conditions acceptable for delivery until evening.":"All clear — optimal delivery window throughout the day.";
  if (score>=45) return wind>20?"High winds may affect two-wheeler deliveries. Use caution.":rain>40?"Rain expected after 3 PM. Schedule early deliveries.":"Moderate conditions. Plan deliveries before peak heat hours.";
  return rain>60?"Heavy rain forecast. Delay non-urgent deliveries.":"Adverse conditions. Prioritise essential deliveries only.";
}

function haversine([lat1,lng1],[lat2,lng2]) {
  const R=6371, dLat=((lat2-lat1)*Math.PI)/180, dLng=((lng2-lng1)*Math.PI)/180;
  const a=Math.sin(dLat/2)**2+Math.cos((lat1*Math.PI)/180)*Math.cos((lat2*Math.PI)/180)*Math.sin(dLng/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

/* ── Small sub-components ────────────────────────────────────────────────── */
function MapController({ center }) {
  const map = useMap();
  useEffect(() => { if (center) map.flyTo(center, 12, { duration: 1.2 }); }, [center, map]);
  return null;
}

function CircularScore({ score }) {
  const r=38, circ=2*Math.PI*r, offset=circ-(score/100)*circ, color=scoreColor(score);
  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
      <circle cx="48" cy="48" r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 48 48)" style={{transition:"stroke-dashoffset 1s ease,stroke .5s ease"}}/>
      <text x="48" y="44" textAnchor="middle" fill="#f0f6ff" fontSize="18" fontWeight="700" fontFamily="monospace">{score}</text>
      <text x="48" y="58" textAnchor="middle" fill="rgba(240,246,255,0.38)" fontSize="8" fontFamily="sans-serif">/ 100</text>
    </svg>
  );
}

function MiniBar({ label, value, max, unit, color }) {
  const pct = Math.min(100,(value/max)*100);
  return (
    <div style={{marginBottom:8}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
        <span style={{fontSize:11,color:"rgba(120,150,190,0.8)"}}>{label}</span>
        <span style={{fontSize:11,color:"#f0f6ff",fontFamily:"monospace",fontWeight:600}}>{value}{unit}</span>
      </div>
      <div style={{height:4,background:"rgba(255,255,255,0.07)",borderRadius:3,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:color,borderRadius:3,transition:"width .8s ease"}}/>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function LocationRiskMap() {
  const [query,     setQuery]     = useState("");
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [userPos,   setUserPos]   = useState(null);
  const [destPos,   setDestPos]   = useState(null);
  const [cityName,  setCityName]  = useState("");
  const [weather,   setWeather]   = useState(null);
  const [aqi,       setAqi]       = useState(2);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const inputRef = useRef(null);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      ({ coords }) => setUserPos([coords.latitude, coords.longitude]),
      ()           => setUserPos([17.385, 78.4867])
    );
  }, []);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true); setError(""); setWeather(null);
    try {
      const geo = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: { q: query, format: "json", limit: 1 },
        headers: { "Accept-Language": "en" },
      });
      if (!geo.data.length) throw new Error("City not found");
      const { lat, lon, display_name } = geo.data[0];
      const coords = [parseFloat(lat), parseFloat(lon)];
      setDestPos(coords); setMapCenter(coords);
      setCityName(display_name.split(",").slice(0,2).join(", "));

      let wx;
      if (OWM_KEY !== "DEMO_KEY") {
        const wxRes = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
          params: { lat, lon, appid: OWM_KEY, units: "metric" },
        });
        wx = wxRes.data;
        try {
          const aqiRes = await axios.get("https://api.openweathermap.org/data/2.5/air_pollution", {
            params: { lat, lon, appid: OWM_KEY },
          });
          setAqi(aqiRes.data.list[0].main.aqi);
        } catch { setAqi(2); }
      } else {
        wx = { name: query, main: { temp:28, humidity:72 }, wind:{ speed:6.5 }, weather:[{ description:"light rain" }], rain:{"1h":0.8} };
        setAqi(2);
      }
      setWeather(wx);
    } catch(e) { setError(e.message||"Search failed"); }
    finally { setLoading(false); }
  }, [query]);

  /* derived values */
  const rain    = weather?.rain?.["1h"] ? Math.min(100,Math.round(weather.rain["1h"]*80)) : weather?.main?.humidity ? Math.round(weather.main.humidity*0.7) : 0;
  const wind    = weather ? Math.round((weather.wind?.speed||0)*3.6) : 0;
  const temp    = weather?.main?.temp ?? 25;
  const safety  = weather ? calcSafety(rain, wind) : null;
  const sm      = safety ? SAFETY_META[safety] : null;
  const aiScore = weather ? calcAIScore({ rain, wind, temp, aqi }) : null;
  const rec     = weather ? aiRecommendation({ rain, wind, temp, score: aiScore }) : null;
  const dist    = userPos && destPos ? haversine(userPos,destPos).toFixed(1) : null;
  const estTime = dist ? Math.round((parseFloat(dist)/30)*60) : null;
  const routePts= userPos && destPos ? [userPos,destPos] : [];

  const AQI_L = ["","Good","Fair","Moderate","Poor","Very Poor"];
  const AQI_C = ["","#10b981","#a3e635","#f59e0b","#f97316","#ef4444"];

  /* card style matching Dashboard.jsx Card */
  const card = { background:"rgba(255,255,255,0.03)", border:"1px solid rgba(99,160,255,0.1)", borderRadius:14, padding:"14px 16px" };
  const label10 = { fontSize:10, color:"rgba(99,160,255,0.5)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:10, fontWeight:700 };

  return (
    <div style={{ display:"flex", gap:14, height:"100%", minHeight:560 }}>

      {/* ── LEFT PANEL ──────────────────────────────────────────────────────── */}
      <div style={{ width:300, minWidth:280, display:"flex", flexDirection:"column", gap:10, overflowY:"auto", paddingRight:2 }}>

        {/* Search */}
        <div style={card}>
          <div style={label10}>Delivery Intelligence · Map</div>
          <div style={{ display:"flex", gap:7 }}>
            <input
              ref={inputRef}
              style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(99,160,255,0.15)", borderRadius:9, padding:"8px 12px", color:"#f0f6ff", fontSize:13, fontFamily:"inherit", outline:"none" }}
              placeholder="Enter delivery city…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key==="Enter" && handleSearch()}
              onFocus={e  => e.target.style.borderColor="rgba(59,130,246,0.5)"}
              onBlur={e   => e.target.style.borderColor="rgba(99,160,255,0.15)"}
            />
            <button
              onClick={handleSearch} disabled={loading}
              style={{ background:"rgba(59,130,246,0.12)", border:"1px solid rgba(59,130,246,0.25)", borderRadius:9, color:"#60a5fa", fontSize:13, padding:"8px 13px", cursor:"pointer", fontWeight:700, fontFamily:"inherit", transition:"all .18s", whiteSpace:"nowrap" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(59,130,246,0.22)"}
              onMouseLeave={e => e.currentTarget.style.background="rgba(59,130,246,0.12)"}
            >
              {loading ? "…" : "Search"}
            </button>
          </div>
          {error && <div style={{ color:"#ef4444", fontSize:12, marginTop:7 }}>⚠ {error}</div>}
        </div>

        {/* Weather */}
        {weather && (
          <div style={{ ...card, animation:"fadeUp .35s ease both" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:"#f0f6ff", lineHeight:1.2 }}>{cityName}</div>
                <div style={{ fontSize:11, color:"rgba(120,150,190,0.8)", marginTop:2 }}>{weather.weather[0].description}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontFamily:"monospace", fontSize:26, fontWeight:700, color:"#f0f6ff", lineHeight:1 }}>{Math.round(temp)}°</div>
                <div style={{ fontSize:10, color:"rgba(120,150,190,0.8)" }}>Celsius</div>
              </div>
            </div>
            <MiniBar label="Rain Probability" value={rain} max={100} unit="%" color="#3b82f6"/>
            <MiniBar label="Wind Speed"        value={wind} max={80}  unit=" km/h" color="#a78bfa"/>
            <MiniBar label="Humidity"          value={weather.main.humidity} max={100} unit="%" color="#22d3ee"/>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:6 }}>
              <span style={{ fontSize:11, color:"rgba(120,150,190,0.8)" }}>Air Quality</span>
              <span style={{ fontSize:11, fontWeight:700, fontFamily:"monospace", color:AQI_C[aqi] }}>{AQI_L[aqi]} · AQI {aqi}</span>
            </div>
          </div>
        )}

        {/* Safety badge */}
        {safety && (
          <div style={{ ...card, background:sm.bg, borderColor:sm.border, animation:"fadeUp .35s ease both" }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:sm.color, flexShrink:0, animation:"pulse-dot 1.5s infinite", boxShadow:`0 0 6px ${sm.color}` }}/>
              <span style={{ fontSize:11, fontWeight:700, color:sm.color, letterSpacing:".07em" }}>{sm.label}</span>
            </div>
            <div style={{ fontSize:12, color:"rgba(240,246,255,0.55)", lineHeight:1.55, fontStyle:"italic" }}>"{rec}"</div>
          </div>
        )}

        {/* AI Score */}
        {aiScore !== null && (
          <div style={{ ...card, animation:"fadeUp .35s ease both" }}>
            <div style={label10}>AI Delivery Safety Score</div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <CircularScore score={aiScore}/>
              <div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:20, background:`${scoreColor(aiScore)}18`, border:`1px solid ${scoreColor(aiScore)}35`, color:scoreColor(aiScore), fontSize:11, fontWeight:700, letterSpacing:".07em", marginBottom:6 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:scoreColor(aiScore) }}/>
                  {scoreLabel(aiScore)}
                </div>
                <div style={{ fontSize:11, color:"rgba(120,150,190,0.8)", lineHeight:1.5 }}>Rain · Wind · Temp · AQI</div>
              </div>
            </div>
            <div style={{ borderTop:"1px solid rgba(99,160,255,0.1)", paddingTop:10 }}>
              <MiniBar label="Rain Impact"  value={Math.round(rain*0.35)}                                               max={35} unit=" pts" color="#3b82f6"/>
              <MiniBar label="Wind Impact"  value={Math.round(Math.min((wind/50)*25,25))}                               max={25} unit=" pts" color="#a78bfa"/>
              <MiniBar label="Temp Impact"  value={temp<0||temp>40?20:temp<5||temp>35?10:5}                             max={20} unit=" pts" color="#f97316"/>
              <MiniBar label="Air Quality"  value={Math.round(((aqi-1)/4)*15)}                                          max={15} unit=" pts" color="#22d3ee"/>
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT PANEL: MAP ──────────────────────────────────────────────────── */}
      <div style={{ flex:1, position:"relative", borderRadius:14, overflow:"hidden", minHeight:500, border:"1px solid rgba(99,160,255,0.1)" }}>
        <MapContainer center={mapCenter} zoom={5} style={{ width:"100%", height:"100%" }} zoomControl={false}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="&copy; CARTO"/>
          <MapController center={mapCenter}/>
          {userPos && (
            <Marker position={userPos} icon={userIcon}>
              <Popup><span style={{fontSize:13}}>📍 Your Location</span></Popup>
            </Marker>
          )}
          {destPos && (
            <Marker position={destPos} icon={destIcon}>
              <Popup><span style={{fontSize:13}}>📦 {cityName}</span></Popup>
            </Marker>
          )}
          {routePts.length===2 && (
            <Polyline positions={routePts} pathOptions={{ color:"#3b82f6", weight:2.5, opacity:0.7, dashArray:"8 6" }}/>
          )}
        </MapContainer>

        {/* Route overlay card */}
        {dist && weather && (
          <div style={{ position:"absolute", bottom:14, right:14, zIndex:1000, background:"rgba(5,10,20,0.9)", backdropFilter:"blur(18px)", border:"1px solid rgba(99,160,255,0.15)", borderRadius:12, padding:"12px 16px", minWidth:190 }}>
            <div style={{ fontSize:10, color:"rgba(99,160,255,0.5)", letterSpacing:".1em", textTransform:"uppercase", marginBottom:9, fontWeight:700 }}>Route Summary</div>
            {[["Distance",`${dist} km`,"#f0f6ff"],["Est. Time",`${estTime} min`,"#f0f6ff"],["Risk Level",sm?.label||"",sm?.color||"#f0f6ff"],["Safety Score",`${aiScore}/100`,scoreColor(aiScore)]].map(([k,v,c])=>(
              <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"5px 0", borderTop:"1px solid rgba(99,160,255,0.08)", fontSize:12 }}>
                <span style={{ color:"rgba(180,200,230,0.7)" }}>{k}</span>
                <span style={{ fontWeight:700, fontFamily:"monospace", color:c, fontSize:12 }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(5,10,20,0.65)", zIndex:999, backdropFilter:"blur(4px)" }}>
            <div style={{ color:"#60a5fa", fontSize:13, fontFamily:"monospace", display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:14, height:14, border:"2px solid rgba(96,165,250,0.2)", borderTopColor:"#60a5fa", borderRadius:"50%", animation:"spin .8s linear infinite" }}/>
              Locating city…
            </div>
          </div>
        )}

        {/* Empty state */}
        {!destPos && !loading && (
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", pointerEvents:"none", zIndex:900 }}>
            <div style={{ fontSize:32, marginBottom:8, opacity:0.2 }}>🗺</div>
            <div style={{ fontSize:13, color:"rgba(120,150,190,0.38)", fontFamily:"monospace" }}>Search a city to begin</div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}