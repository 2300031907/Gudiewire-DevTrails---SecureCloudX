// WeatherRiskCard.jsx
// Drop this anywhere in your ZeroShield dashboard.
// Uses only CSS-in-JS inline styles + your existing CSS variables from styles.js

import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════ */

/** Typography */
function Label({ children, style = {} }) {
  return (
    <div style={{
      fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '.1em', color: 'rgba(120,155,200,0.6)',
      ...style,
    }}>{children}</div>
  );
}

function Value({ children, size = 'md', color = 'var(--text1)', mono = false, style = {} }) {
  const sizes = { sm: '.78rem', md: '1rem', lg: '1.5rem', xl: '2rem' };
  return (
    <div style={{
      fontFamily: mono ? 'JetBrains Mono, monospace' : 'Sora, sans-serif',
      fontSize: sizes[size], fontWeight: 700,
      color, lineHeight: 1.15, ...style,
    }}>{children}</div>
  );
}

/** Icon — weather condition SVG icons */
function WeatherIcon({ condition, size = 48 }) {
  const icons = {
    rain: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <defs>
          <radialGradient id="cloud-g" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#94b4d4" stopOpacity=".9"/>
            <stop offset="100%" stopColor="#5a7fa8" stopOpacity=".7"/>
          </radialGradient>
        </defs>
        {/* Cloud */}
        <ellipse cx="24" cy="19" rx="14" ry="9" fill="url(#cloud-g)"/>
        <ellipse cx="16" cy="22" rx="8" ry="7" fill="#7ba3cc" opacity=".85"/>
        <ellipse cx="32" cy="22" rx="7" ry="6" fill="#7ba3cc" opacity=".85"/>
        <rect x="14" y="24" width="20" height="6" rx="3" fill="#7ba3cc" opacity=".85"/>
        {/* Raindrops */}
        {[[18,33],[24,36],[30,33],[21,39],[27,39]].map(([x,y],i)=>(
          <line key={i} x1={x} y1={y} x2={x-1.5} y2={y+5}
            stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"
            style={{ animation: `raindrop .8s ease-in-out infinite`, animationDelay: `${i*0.15}s` }}/>
        ))}
        {/* Lightning bolt */}
        <path d="M25 20 L22 26 L25 26 L22 33" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
          style={{ filter: 'drop-shadow(0 0 4px #fbbf24)', animation: 'lightning 2s ease-in-out infinite' }}/>
      </svg>
    ),
    cloudy: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <ellipse cx="24" cy="22" rx="15" ry="10" fill="#7ba3cc" opacity=".8"/>
        <ellipse cx="15" cy="25" rx="9" ry="8" fill="#94b4d4" opacity=".75"/>
        <ellipse cx="33" cy="25" rx="8" ry="7" fill="#94b4d4" opacity=".75"/>
        <rect x="13" y="26" width="22" height="7" rx="3.5" fill="#94b4d4" opacity=".8"/>
      </svg>
    ),
    sunny: (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="10" fill="#fbbf24" style={{ filter: 'drop-shadow(0 0 8px #fbbf24)' }}/>
        {[0,45,90,135,180,225,270,315].map((deg,i)=>{
          const r = deg * Math.PI / 180;
          const x1 = 24 + 14 * Math.cos(r), y1 = 24 + 14 * Math.sin(r);
          const x2 = 24 + 18 * Math.cos(r), y2 = 24 + 18 * Math.sin(r);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round"/>;
        })}
      </svg>
    ),
  };
  return icons[condition] || icons.rain;
}

/** Badge */
function Badge({ children, type = 'blue', size = 'sm', pulse = false, style = {} }) {
  const palettes = {
    red:    { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.28)',   color: '#ef4444'  },
    orange: { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.28)',  color: '#f59e0b'  },
    green:  { bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.28)',  color: '#10b981'  },
    blue:   { bg: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.28)',  color: '#60a5fa'  },
    purple: { bg: 'rgba(139,92,246,0.12)',  border: 'rgba(139,92,246,0.28)',  color: '#a78bfa'  },
    yellow: { bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.28)',  color: '#fbbf24'  },
    cyan:   { bg: 'rgba(34,211,238,0.12)',  border: 'rgba(34,211,238,0.28)',  color: '#22d3ee'  },
  };
  const p = palettes[type] || palettes.blue;
  const fontSize = size === 'lg' ? '.78rem' : '.62rem';
  const padding = size === 'lg' ? '5px 12px' : '3px 9px';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: p.bg, border: `1px solid ${p.border}`,
      borderRadius: 20, padding, fontSize, fontWeight: 700,
      color: p.color, fontFamily: 'Sora, sans-serif',
      ...style,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: '50%', background: p.color,
        flexShrink: 0,
        ...(pulse ? { animation: 'pulse-dot 1.5s ease-in-out infinite' } : {}),
      }} />
      {children}
    </span>
  );
}

/** ProgressIndicator */
function ProgressIndicator({ value, max, color, label, showPct = true, height = 6 }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.3rem' }}>
        <span style={{ fontSize: '.65rem', color: 'rgba(120,155,200,0.7)', fontFamily: 'Sora, sans-serif' }}>{label}</span>
        {showPct && (
          <span style={{ fontSize: '.65rem', fontWeight: 700, color, fontFamily: 'JetBrains Mono, monospace' }}>
            {Math.round(pct)}%
          </span>
        )}
      </div>
      <div style={{ width: '100%', height, background: 'rgba(255,255,255,0.06)', borderRadius: height / 2, overflow: 'hidden', position: 'relative' }}>
        <div style={{
          height: '100%', width: `${pct}%`, borderRadius: height / 2,
          background: color,
          boxShadow: `0 0 10px ${color}55`,
          transition: 'width 1s cubic-bezier(.22,.68,0,1.2)',
          position: 'relative',
        }}>
          {/* Shimmer sweep */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
            animation: 'shimmer-bar 2s ease-in-out infinite',
          }}/>
        </div>
      </div>
    </div>
  );
}

/** Stat Cell */
function StatCell({ icon, label, value, unit, color = 'var(--text1)', mono = true }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.035)',
      border: '1px solid rgba(99,160,255,0.09)',
      borderRadius: 14, padding: '.75rem .85rem',
      transition: 'border-color .2s, background .2s',
      cursor: 'default',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,160,255,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(99,160,255,0.09)'; e.currentTarget.style.background = 'rgba(255,255,255,0.035)'; }}>
      <div style={{ fontSize: '1.1rem', marginBottom: '.3rem' }}>{icon}</div>
      <Label style={{ marginBottom: '.2rem' }}>{label}</Label>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
        <span style={{ fontFamily: mono ? 'JetBrains Mono, monospace' : 'Sora, sans-serif', fontSize: '.95rem', fontWeight: 700, color }}>{value}</span>
        {unit && <span style={{ fontSize: '.6rem', color: 'rgba(120,155,200,0.6)', fontFamily: 'Sora, sans-serif' }}>{unit}</span>}
      </div>
    </div>
  );
}

/** Risk Timeline Bar */
function RiskTimeline({ riskWindow = '3PM – 6PM' }) {
  const hours = ['9a','10a','11a','12p','1p','2p','3p','4p','5p','6p','7p','8p'];
  const riskHours = ['3p','4p','5p'];
  const peakHours = ['4p'];
  return (
    <div>
      <div style={{ display: 'flex', gap: 3, marginBottom: '.4rem' }}>
        {hours.map(h => {
          const isRisk = riskHours.includes(h);
          const isPeak = peakHours.includes(h);
          return (
            <div key={h} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{
                width: '100%', height: 28, borderRadius: 6,
                background: isPeak
                  ? 'rgba(239,68,68,0.55)'
                  : isRisk
                    ? 'rgba(245,158,11,0.38)'
                    : 'rgba(16,185,129,0.18)',
                border: `1px solid ${isPeak ? 'rgba(239,68,68,0.5)' : isRisk ? 'rgba(245,158,11,0.35)' : 'rgba(16,185,129,0.2)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '.5rem', fontWeight: 700,
                color: isPeak ? '#ef4444' : isRisk ? '#f59e0b' : '#10b981',
                transition: 'all .2s',
                boxShadow: isPeak ? '0 0 8px rgba(239,68,68,0.25)' : 'none',
              }}>
                {isPeak ? '⚠' : isRisk ? '~' : '✓'}
              </div>
              <div style={{ fontSize: '.48rem', color: 'rgba(120,155,200,0.55)' }}>{h}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
        {[['#ef4444','Peak Risk'],['#f59e0b','Elevated'],['#10b981','Safe']].map(([c,l])=>(
          <div key={l} style={{ display:'flex', alignItems:'center', gap:4, fontSize:'.58rem', color:'rgba(120,155,200,0.6)' }}>
            <div style={{ width:7, height:7, borderRadius:2, background:c }}/>{l}
          </div>
        ))}
        <div style={{ marginLeft:'auto', fontSize:'.6rem', fontFamily:'JetBrains Mono, monospace', fontWeight:700, color:'#f59e0b' }}>
          ⚡ Risk window: {riskWindow}
        </div>
      </div>
    </div>
  );
}

/** Payout Eligibility Indicator */
function PayoutEligibility({ threshold, expected, unit = 'mm' }) {
  const triggered = expected >= threshold;
  const pct = Math.min((expected / (threshold * 1.5)) * 100, 100);
  return (
    <div style={{
      background: triggered
        ? 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(34,211,238,0.05) 100%)'
        : 'rgba(255,255,255,0.03)',
      border: `1.5px solid ${triggered ? 'rgba(16,185,129,0.28)' : 'rgba(99,160,255,0.12)'}`,
      borderRadius: 16, padding: '1rem 1.1rem',
      transition: 'all .3s',
    }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'.75rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{
            width:32, height:32, borderRadius:10,
            background: triggered ? 'rgba(16,185,129,0.15)' : 'rgba(99,160,255,0.1)',
            border: `1px solid ${triggered ? 'rgba(16,185,129,0.3)' : 'rgba(99,160,255,0.2)'}`,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem',
          }}>
            {triggered ? '💰' : '⏳'}
          </div>
          <div>
            <Label>Payout Eligibility</Label>
            <div style={{ fontSize:'.75rem', fontWeight:700, color:'var(--text1)', marginTop:2 }}>
              {triggered ? 'Likely Payout Triggered' : 'Below Threshold'}
            </div>
          </div>
        </div>
        <Badge type={triggered ? 'green' : 'orange'} size="lg" pulse={triggered}>
          {triggered ? 'ELIGIBLE' : 'PENDING'}
        </Badge>
      </div>

      {/* Threshold vs actual visual */}
      <div style={{ position:'relative', marginBottom:'.6rem' }}>
        <div style={{ width:'100%', height:8, background:'rgba(255,255,255,0.06)', borderRadius:4, overflow:'visible', position:'relative' }}>
          {/* Threshold marker */}
          <div style={{
            position:'absolute', left:`${(threshold / (threshold * 1.5)) * 100}%`,
            top:-4, bottom:-4, width:2, background:'rgba(245,158,11,0.8)',
            borderRadius:1, zIndex:2,
          }}>
            <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', fontSize:'.5rem', color:'#f59e0b', fontFamily:'JetBrains Mono, monospace', fontWeight:700, whiteSpace:'nowrap' }}>
              {threshold}{unit} min
            </div>
          </div>
          {/* Fill */}
          <div style={{
            height:'100%', width:`${pct}%`, borderRadius:4,
            background: triggered
              ? 'linear-gradient(90deg, #10b981, #22d3ee)'
              : 'linear-gradient(90deg, #3b82f6, #f59e0b)',
            boxShadow: triggered ? '0 0 12px rgba(16,185,129,0.4)' : 'none',
            transition: 'width 1.2s cubic-bezier(.22,.68,0,1.2)',
          }}/>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.5rem' }}>
        {[
          { label:'Rain Threshold', value:`${threshold} ${unit}`, color:'#f59e0b' },
          { label:'Expected Rainfall', value:`${expected} ${unit}`, color: triggered ? '#10b981' : 'var(--text1)' },
        ].map((item)=>(
          <div key={item.label} style={{ padding:'.45rem .65rem', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(99,160,255,0.08)', borderRadius:10 }}>
            <Label style={{ marginBottom:'.2rem' }}>{item.label}</Label>
            <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'.88rem', fontWeight:700, color:item.color }}>{item.value}</span>
          </div>
        ))}
      </div>

      {triggered && (
        <div style={{ marginTop:'.65rem', padding:'.5rem .75rem', background:'rgba(16,185,129,0.07)', border:'1px solid rgba(16,185,129,0.18)', borderRadius:10, fontSize:'.7rem', color:'#34d399', lineHeight:1.6 }}>
          ⚡ Expected rainfall <strong style={{color:'#10b981'}}>{expected}{unit}</strong> exceeds trigger threshold <strong style={{color:'#f59e0b'}}>{threshold}{unit}</strong> — claim will auto-initiate. Payout via UPI in under 5 min.
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */

const WEATHER_CSS = `
  @keyframes raindrop {
    0%, 100% { opacity: .3; transform: translateY(0); }
    50%       { opacity: 1;  transform: translateY(3px); }
  }
  @keyframes lightning {
    0%, 90%, 100% { opacity: 0; }
    92%, 96%      { opacity: 1; filter: drop-shadow(0 0 6px #fbbf24); }
  }
  @keyframes shimmer-bar {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(300%); }
  }
  @keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 0 currentColor; opacity: 1; }
    60%       { box-shadow: 0 0 0 6px transparent; opacity: .7; }
  }
  @keyframes slide-in {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes glow-pulse-risk {
    0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.3); }
    50%       { box-shadow: 0 0 24px 4px rgba(239,68,68,0.15); }
  }
  .wrc-slide { animation: slide-in .4s cubic-bezier(.22,.68,0,1.2) both; }
  .wrc-slide-1 { animation-delay: .05s; }
  .wrc-slide-2 { animation-delay: .1s; }
  .wrc-slide-3 { animation-delay: .15s; }
  .wrc-slide-4 { animation-delay: .2s; }
  .wrc-slide-5 { animation-delay: .25s; }
  .wrc-slide-6 { animation-delay: .3s; }
`;

export default function WeatherRiskCard({
  // All data is prop-driven so this can connect to your live API
  condition       = 'Heavy Rain Expected',
  conditionType   = 'rain',            // 'rain' | 'cloudy' | 'sunny'
  rainProbability = 82,
  rainfall        = 14,
  windSpeed       = 22,
  aqi             = 'Moderate',
  aqiLevel        = 'medium',          // 'good' | 'medium' | 'high' | 'hazardous'
  disruptionRisk  = 'HIGH',
  riskLevel       = 'high',            // 'low' | 'medium' | 'high'
  riskWindow      = '3PM – 6PM',
  aiMessage       = 'Delay deliveries until 6PM for safer working conditions and to avoid the active rain trigger window.',
  rainThreshold   = 12,
  timestamp       = 'Updated 5 minutes ago',
  showPayout      = true,
}) {
  const [expanded, setExpanded] = useState(false);

  const riskColors = { low: '#10b981', medium: '#f59e0b', high: '#ef4444' };
  const riskTypes  = { low: 'green',   medium: 'orange',  high: 'red'     };
  const aqiColors  = { good: '#10b981', medium: '#f59e0b', high: '#f97316', hazardous: '#ef4444' };

  const riskColor = riskColors[riskLevel] || riskColors.high;
  const riskType  = riskTypes[riskLevel]  || riskTypes.high;
  const aqiColor  = aqiColors[aqiLevel]   || aqiColors.medium;

  return (
    <>
      <style>{WEATHER_CSS}</style>

      {/* OUTER CARD */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(99,160,255,0.12)',
        borderRadius: 22,
        padding: '1.5rem',
        fontFamily: 'Sora, sans-serif',
        color: '#eaf0ff',
        maxWidth: 520,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: riskLevel === 'high'
          ? '0 0 0 1px rgba(239,68,68,0.15), 0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)'
          : '0 24px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
        animation: riskLevel === 'high' ? 'glow-pulse-risk 3s ease-in-out infinite' : 'none',
        transition: 'border-color .25s',
      }}>

        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 22, pointerEvents: 'none',
          background: riskLevel === 'high'
            ? 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(239,68,68,0.05) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.05) 0%, transparent 70%)',
        }}/>

        {/* ── HEADER ── */}
        <div className="wrc-slide" style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'1.25rem' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:'.3rem' }}>
              <span style={{ fontSize:'.65rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'rgba(120,155,200,0.55)' }}>
                ZeroShield
              </span>
              <span style={{ width:3, height:3, borderRadius:'50%', background:'rgba(120,155,200,0.3)', display:'inline-block' }}/>
              <span style={{ fontSize:'.65rem', color:'rgba(120,155,200,0.55)', fontWeight:600 }}>Weather Risk Today</span>
            </div>
            <div style={{ fontSize:'1.2rem', fontWeight:800, color:'#eaf0ff', letterSpacing:'-.02em', lineHeight:1.15 }}>
              {condition}
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
            <div style={{ filter: riskLevel === 'high' ? 'drop-shadow(0 0 12px rgba(59,130,246,0.4))' : 'none' }}>
              <WeatherIcon condition={conditionType} size={52} />
            </div>
            <div style={{ fontSize:'.58rem', color:'rgba(120,155,200,0.5)', display:'flex', alignItems:'center', gap:4 }}>
              🕐 {timestamp}
            </div>
          </div>
        </div>

        {/* ── RISK LEVEL BANNER ── */}
        <div className="wrc-slide wrc-slide-1" style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background: riskLevel === 'high'
            ? 'rgba(239,68,68,0.08)'
            : riskLevel === 'medium'
              ? 'rgba(245,158,11,0.08)'
              : 'rgba(16,185,129,0.08)',
          border: `1px solid ${riskColor}28`,
          borderRadius: 14, padding: '.8rem 1rem',
          marginBottom: '1.1rem',
        }}>
          <div>
            <Label style={{ marginBottom:'.2rem' }}>Income Disruption Risk</Label>
            <div style={{
              fontSize: '1.4rem', fontWeight: 900, color: riskColor,
              letterSpacing: '-.01em', lineHeight: 1,
              textShadow: `0 0 20px ${riskColor}55`,
            }}>
              {disruptionRisk}
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
            <Badge type={riskType} size="lg" pulse={riskLevel === 'high'}>
              {riskLevel === 'high' ? 'TRIGGER RISK' : riskLevel === 'medium' ? 'MONITOR' : 'CLEAR'}
            </Badge>
            <div style={{ fontSize:'.65rem', color:'rgba(120,155,200,0.6)', display:'flex', alignItems:'center', gap:5 }}>
              <span style={{ fontFamily:'JetBrains Mono, monospace', fontWeight:700, color:riskColor }}>⏱ {riskWindow}</span>
            </div>
          </div>
        </div>

        {/* ── STAT GRID ── */}
        <div className="wrc-slide wrc-slide-2" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'.5rem', marginBottom:'1.1rem' }}>
          <StatCell icon="🌧️" label="Rain Prob." value={`${rainProbability}%`} color="#60a5fa" />
          <StatCell icon="💧" label="Rainfall"   value={rainfall} unit=" mm" color="#22d3ee" />
          <StatCell icon="💨" label="Wind"       value={windSpeed} unit=" km/h" color="#a78bfa" />
          <StatCell icon="😷" label="AQI"        value={aqi} color={aqiColor} mono={false} />
        </div>

        {/* ── RAIN PROBABILITY BAR ── */}
        <div className="wrc-slide wrc-slide-3" style={{ marginBottom:'1rem' }}>
          <ProgressIndicator
            value={rainProbability} max={100}
            color={`linear-gradient(90deg, #3b82f6, #22d3ee${rainProbability > 70 ? ', #ef4444' : ''})`}
            label="Rain Probability"
          />
        </div>

        {/* ── RISK TIMELINE ── */}
        <div className="wrc-slide wrc-slide-4" style={{ marginBottom:'1.1rem' }}>
          <Label style={{ marginBottom:'.5rem' }}>Risk Window Timeline</Label>
          <RiskTimeline riskWindow={riskWindow} />
        </div>

        {/* ── AI RECOMMENDATION ── */}
        <div className="wrc-slide wrc-slide-5" style={{
          display:'flex', gap:'.75rem', alignItems:'flex-start',
          background:'rgba(139,92,246,0.07)',
          border:'1px solid rgba(139,92,246,0.18)',
          borderRadius:14, padding:'.85rem 1rem',
          marginBottom: showPayout ? '1.1rem' : 0,
        }}>
          <div style={{
            width:32, height:32, borderRadius:10, flexShrink:0,
            background:'rgba(139,92,246,0.15)', border:'1px solid rgba(139,92,246,0.3)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem',
          }}>🤖</div>
          <div>
            <div style={{ fontSize:'.62rem', fontWeight:700, color:'#a78bfa', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:'.3rem' }}>
              AI Recommendation
            </div>
            <div style={{ fontSize:'.78rem', color:'rgba(220,230,255,0.82)', lineHeight:1.65 }}>
              {aiMessage}
            </div>
          </div>
        </div>

        {/* ── PAYOUT ELIGIBILITY ── */}
        {showPayout && (
          <div className="wrc-slide wrc-slide-6">
            <PayoutEligibility threshold={rainThreshold} expected={rainfall} unit="mm" />
          </div>
        )}

        {/* ── EXPAND TOGGLE ── */}
        <div style={{ marginTop:'1rem', display:'flex', justifyContent:'center' }}>
          <button
            onClick={() => setExpanded(p => !p)}
            style={{
              background:'none', border:'none', cursor:'pointer',
              fontSize:'.68rem', fontWeight:600, color:'rgba(120,155,200,0.5)',
              display:'flex', alignItems:'center', gap:5,
              fontFamily:'Sora, sans-serif', padding:'.3rem .75rem',
              borderRadius:20, transition:'all .18s',
            }}
            onMouseEnter={e=>{ e.currentTarget.style.color='rgba(96,165,250,0.8)'; e.currentTarget.style.background='rgba(59,130,246,0.07)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.color='rgba(120,155,200,0.5)'; e.currentTarget.style.background='none'; }}>
            {expanded ? '▲ Less detail' : '▼ More detail'}
          </button>
        </div>

        {/* ── EXPANDED DETAIL ── */}
        {expanded && (
          <div style={{ marginTop:'.85rem', paddingTop:'.85rem', borderTop:'1px solid rgba(99,160,255,0.1)', animation:'slide-in .3s ease both' }}>
            <Label style={{ marginBottom:'.65rem' }}>Extended Forecast · Hourly Rainfall (mm)</Label>
            <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:60, marginBottom:'.4rem' }}>
              {[4,6,8,10,14,18,16,12,8,5,3,2].map((v,i)=>(
                <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                  <div style={{ width:'100%', height:`${(v/20)*56}px`, borderRadius:4, background:v>=rainThreshold?'rgba(239,68,68,0.55)':'rgba(59,130,246,0.4)', minHeight:3 }}/>
                </div>
              ))}
            </div>
            {/* Threshold line label */}
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:'.75rem', fontSize:'.6rem', color:'rgba(245,158,11,0.8)' }}>
              <div style={{ height:1.5, width:24, background:'rgba(245,158,11,0.7)', borderRadius:1 }}/>
              Payout threshold: {rainThreshold}mm
              <div style={{ height:1.5, flex:1, background:'rgba(245,158,11,0.15)', borderRadius:1 }}/>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.5rem' }}>
              {[
                { label:'Zone Coverage', value:'Kondapur · 3km', color:'var(--text1)' },
                { label:'Data Source', value:'OpenWeatherMap', color:'#60a5fa' },
                { label:'Trigger Type', value:'Parametric · Auto', color:'#22d3ee' },
                { label:'UPI Payout ETA', value:'< 5 minutes', color:'#10b981' },
              ].map(item=>(
                <div key={item.label} style={{ padding:'.45rem .65rem', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(99,160,255,0.08)', borderRadius:10 }}>
                  <Label style={{ marginBottom:'.2rem' }}>{item.label}</Label>
                  <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:'.75rem', fontWeight:700, color:item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}