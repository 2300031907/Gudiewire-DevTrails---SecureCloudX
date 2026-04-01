// PageDashboard.jsx — Dashboard page with all 8 widgets
<<<<<<< HEAD

import { Card, CardTitle, Badge, ProgressBar, StatBlock, AlertRow, Button, Timestamp, Shimmer } from './layout';

=======
import { Card, CardTitle, Badge, ProgressBar, StatBlock, AlertRow, Button, Timestamp, Shimmer } from './layout';
import styles from './PageDashboard.module.css';
>>>>>>> 351a5d7 (css changes)
/* ── GAUGE SVG ─── */
function RiskGauge({ pct = 0.55, label = 'MEDIUM' }) {
  const cx = 90, cy = 90, r = 72;
  const segs = [
    { c: '#10b981', a1: -178, a2: -137 }, { c: '#fbbf24', a1: -134, a2: -93 },
    { c: '#f59e0b', a1: -90, a2: -49 },  { c: '#ef4444', a1: -46, a2: -5 },
  ];
  const pt = a => ({ x: cx + r * Math.cos(a * Math.PI / 180), y: cy + r * Math.sin(a * Math.PI / 180) });
  const arc = (a1, a2) => { const s = pt(a1), e = pt(a2); return `M ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y}`; };
  const na = (-178 + pct * 173) * Math.PI / 180;
  const nx = cx + 58 * Math.cos(na), ny = cy + 58 * Math.sin(na);
  return (
    <svg viewBox="0 0 180 100" style={{ width: '100%', maxWidth: 200 }}>
      {segs.map((s, i) => <path key={i} d={arc(s.a1, s.a2)} fill="none" stroke={s.c} strokeWidth="11" strokeLinecap="round" opacity={i === 1 ? 1 : 0.45} />)}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="var(--text1)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="5" fill="var(--text1)" /><circle cx={cx} cy={cy} r="2.5" fill="var(--bg1)" />
      <text x={cx + 20} y={cy - 18} textAnchor="middle" fill="var(--yellow)" fontSize="8" fontFamily="Sora,sans-serif" fontWeight="800">{label}</text>
    </svg>
  );
}

/* ── RING ─── */
function GigRing({ score = 720 }) {
  const r = 44, cx = 56, cy = 56, circ = 2 * Math.PI * r, fill = (score / 900) * circ;
  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <svg viewBox="0 0 112 112" style={{ width: 110, height: 110 }}>
        <defs><linearGradient id="gr1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#10b981" /></linearGradient></defs>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="9" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#gr1)" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={`${fill} ${circ}`} strokeDashoffset={circ / 4} style={{ filter: 'drop-shadow(0 0 7px rgba(34,211,238,0.4))' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '1.3rem', fontWeight: 700, color: '#10b981', lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: '.55rem', color: 'var(--text3)', marginTop: 2 }}>GigScore</div>
      </div>
    </div>
  );
}

/* ── HEATMAP ─── */
function MiniHeatmap() {
  return (
    <div style={{ width: '100%', height: 160, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 320 160" preserveAspectRatio="none">
        <defs>
          <radialGradient id="h1" cx="55%" cy="50%" r="40%"><stop offset="0%" stopColor="#f59e0b" stopOpacity=".85"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/></radialGradient>
          <radialGradient id="h2" cx="30%" cy="62%" r="28%"><stop offset="0%" stopColor="#ef4444" stopOpacity=".5"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/></radialGradient>
          <radialGradient id="h3" cx="78%" cy="35%" r="22%"><stop offset="0%" stopColor="#10b981" stopOpacity=".4"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/></radialGradient>
        </defs>
        <rect width="320" height="160" fill="#0b1a10"/>
        {[40,80,120,160,200,240,280].map(x=><line key={x} x1={x} y1="0" x2={x} y2="160" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
        {[32,64,96,128].map(y=><line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>)}
        <rect width="320" height="160" fill="url(#h1)"/><rect width="320" height="160" fill="url(#h2)"/>
        <rect width="320" height="160" fill="url(#h3)"/>
        <path d="M0 80 Q80 52 160 80 Q240 108 320 80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5"/>
        {[[168,76],[132,90],[192,62],[110,105],[230,52],[155,60]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="3.5" fill="#22d3ee" opacity=".85" style={{filter:'drop-shadow(0 0 5px #22d3ee)'}}/>
        ))}
        <circle cx="168" cy="76" r="10" fill="none" stroke="rgba(245,158,11,0.6)" strokeWidth="1.5"/>
      </svg>
      <div style={{ position:'absolute', bottom:'.5rem', left:'.65rem', background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)', borderRadius:6, padding:'3px 9px', fontSize:'.6rem', color:'var(--text2)' }}>Kondapur · 3km zone</div>
      <div style={{ position:'absolute', bottom:'.5rem', right:'.65rem', display:'flex', gap:8 }}>
        {[['Hot','#ef4444'],['Active','#f59e0b'],['Safe','#10b981']].map(([l,c])=>(
          <div key={l} style={{display:'flex',alignItems:'center',gap:3,fontSize:'.58rem',color:'var(--text3)'}}>
            <div style={{width:6,height:6,borderRadius:2,background:c}}/>{l}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── RAIN CHART ─── */
function WeatherChart() {
  const bars = [40, 25, 60, 85, 72, 45, 30, 55, 90, 65, 38, 22];
  const hours = ['6a','7a','8a','9a','10a','11a','12p','1p','2p','3p','4p','5p'];
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:4, height:60, width:'100%' }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
          <div style={{ width:'100%', height: h * 0.56, borderRadius:4, background: h > 70 ? 'rgba(239,68,68,0.6)' : h > 45 ? 'rgba(245,158,11,0.5)' : 'rgba(59,130,246,0.35)', transition:'height .3s' }} />
          <div style={{ fontSize:'.48rem', color:'var(--text3)' }}>{hours[i]}</div>
        </div>
      ))}
    </div>
  );
}

export default function PageDashboard({ userData }) {
  return (
    <div className="zs-page">
      <div className="zs-page-header">
        <div className="zs-page-title">
          Welcome back, {userData?.name?.split(' ')[0] || 'Ravi'} 👋
        </div>
        <div className="zs-page-sub">Thursday, 23 Jan 2025 · Kondapur Zone · Standard Shield Active</div>
      </div>

      {/* ROW 1: 4 stat cards */}
      <div className="grid-4" style={{ marginBottom: '1rem' }}>
        {[
          { v:'₹4,680', l:'Earnings This Week', change:'+18%', dir:'up', c:'var(--text1)', delay:1 },
          { v:'₹900',   l:'Auto-Payout Today',  change:'Triggered', dir:'up', c:'var(--green2)', delay:2 },
          { v:'₹7,500', l:'Coverage This Week', change:'75% ratio', dir:'up', c:'var(--blue2)', delay:3 },
          { v:'72°C',   l:'Zone AQI / Heat',    change:'Monitoring', dir:'down', c:'var(--orange)', delay:4 },
        ].map((s, i) => (
          <Card key={i} delay={s.delay}>
            <CardTitle timestamp="Updated 5 min ago" />
            <StatBlock value={s.v} label={s.l} change={s.change} changeDir={s.dir} color={s.c} />
          </Card>
        ))}
      </div>

      {/* ROW 2: Risk Meter + Weather + GigScore */}
      <div className="grid-3" style={{ marginBottom: '1rem' }}>

        {/* Income Risk Meter */}
        <Card delay={1}>
          <CardTitle icon="📊" timestamp="Updated 2 min ago">Income Risk Meter</CardTitle>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'.5rem' }}>
            <RiskGauge pct={0.55} label="MEDIUM" />
            <Badge type="orange">Medium Risk Today</Badge>
            <div style={{ width:'100%', marginTop:'.5rem' }}>
              <ProgressBar pct={55} color="linear-gradient(90deg,#10b981,#fbbf24,#ef4444)" height={5} />
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.58rem', color:'var(--text3)', marginTop:4 }}>
                <span>Low</span><span>Medium</span><span>High</span>
              </div>
            </div>
            <div style={{ fontSize:'.72rem', color:'var(--text2)', textAlign:'center', lineHeight:1.5 }}>
              Potential disruption: <strong style={{color:'var(--orange)'}}>₹2,100–3,400</strong>
            </div>
          </div>
        </Card>

        {/* Weather Disruption */}
        <Card delay={2}>
          <CardTitle icon="⛈️" timestamp="Live weather data">Weather Disruption Risk</CardTitle>
          <div style={{ marginBottom:'.75rem' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'.5rem' }}>
              <div>
                <div style={{ fontSize:'1.1rem', fontWeight:800, color:'var(--blue2)' }}>Heavy Rain</div>
                <div style={{ fontSize:'.72rem', color:'var(--text2)' }}>Expected 3PM–8PM · 16.2mm/hr</div>
              </div>
              <div style={{ fontSize:'2.5rem' }}>🌧️</div>
            </div>
            <div style={{ padding:'.55rem .75rem', background:'rgba(239,68,68,0.07)', border:'1px solid rgba(239,68,68,0.15)', borderRadius:10, fontSize:'.7rem', color:'#ef4444' }}>
              ⚡ Rain trigger threshold <strong>15mm/hr — EXCEEDED</strong>
            </div>
          </div>
          <WeatherChart />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'.5rem', marginTop:'.75rem' }}>
            {[['🌡️','43°C','Heat'],['💨','22km/h','Wind'],['💧','88%','Humidity']].map(([i,v,l])=>(
              <div key={l} style={{ background:'var(--glass)', border:'1px solid var(--border)', borderRadius:9, padding:'.45rem', textAlign:'center' }}>
                <div style={{fontSize:'.9rem'}}>{i}</div>
                <div style={{fontFamily:'var(--mono)',fontSize:'.78rem',fontWeight:700,color:'var(--text1)'}}>{v}</div>
                <div style={{fontSize:'.58rem',color:'var(--text3)'}}>{l}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* GigScore Summary */}
        <Card delay={3}>
          <CardTitle icon="🏆" timestamp="Updated Sunday">GigScore Summary</CardTitle>
          <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'.85rem' }}>
            <GigRing score={720} />
            <div>
              <Badge type="blue">700–849 Tier</Badge>
              <div style={{ fontSize:'.72rem', color:'var(--text2)', marginTop:'.4rem', lineHeight:1.6 }}>
                10% premium discount<br/>Priority claim processing<br/>Microloan eligible
              </div>
            </div>
          </div>
          {[['Claim Accuracy','98%','var(--green2)'],['On-Time Rate','94%','var(--blue2)'],['Zone Adherence','96%','var(--cyan)']].map(([l,v,c])=>(
            <div key={l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'.38rem .55rem', background:'var(--glass)', borderRadius:8, marginBottom:'.35rem', fontSize:'.72rem', color:'var(--text2)' }}>
              {l} <span style={{fontFamily:'var(--mono)',fontWeight:700,color:c}}>{v}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* ROW 3: Coverage + Heatmap + Alerts */}
      <div className="grid-3" style={{ marginBottom: '1rem' }}>

        {/* Active Coverage Status */}
        <Card delay={1}>
          <CardTitle icon="🛡️">Active Coverage Status</CardTitle>
          <div style={{ fontFamily:'var(--mono)', fontSize:'1.6rem', fontWeight:700, color:'var(--text1)', letterSpacing:'-.03em', marginBottom:'.2rem' }}>₹7,500</div>
          <div style={{ fontSize:'.7rem', color:'var(--text3)', marginBottom:'.75rem' }}>/ Week · Standard Shield</div>
          <div style={{ fontSize:'.65rem', color:'var(--text2)', marginBottom:'.3rem' }}>Coverage used this week</div>
          <ProgressBar pct={57} color="linear-gradient(90deg,var(--green),var(--cyan))" />
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.65rem', color:'var(--text3)', marginTop:4, marginBottom:'.75rem' }}>
            <span>₹4,300 used</span><span>₹3,200 remaining</span>
          </div>
          {[['Policy ID','ZS-542-1289'],['Renewal','Sunday 11:59 PM'],['Payout Ratio','75%'],['Plan','Standard Shield']].map(([l,v])=>(
            <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'.4rem 0', borderTop:'1px solid var(--border)', fontSize:'.72rem', color:'var(--text2)' }}>
              {l} <span style={{fontWeight:600,color:'var(--text1)'}}>{v}</span>
            </div>
          ))}
          <Button variant="primary" size="sm" style={{ width:'100%', marginTop:'.75rem' }}>Manage Coverage</Button>
        </Card>

        {/* Heatmap */}
        <Card delay={2}>
          <CardTitle icon="📍" timestamp="Live zone data">Delivery Zone Heatmap</CardTitle>
          <MiniHeatmap />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.5rem', marginTop:'.75rem' }}>
            <div style={{ background:'rgba(16,185,129,0.07)', border:'1px solid rgba(16,185,129,0.15)', borderRadius:10, padding:'.55rem .75rem' }}>
              <div style={{fontSize:'.6rem',color:'var(--text3)',marginBottom:'.2rem'}}>Safe Zones</div>
              <div style={{fontFamily:'var(--mono)',fontWeight:700,color:'#10b981'}}>3 Active</div>
            </div>
            <div style={{ background:'rgba(239,68,68,0.07)', border:'1px solid rgba(239,68,68,0.15)', borderRadius:10, padding:'.55rem .75rem' }}>
              <div style={{fontSize:'.6rem',color:'var(--text3)',marginBottom:'.2rem'}}>High Risk</div>
              <div style={{fontFamily:'var(--mono)',fontWeight:700,color:'#ef4444'}}>2 Zones</div>
            </div>
          </div>
        </Card>

        {/* Safety Alerts */}
        <Card delay={3}>
          <CardTitle icon="⚠️" action={<Badge type="red" pulse>3 Active</Badge>}>Safety Alerts</CardTitle>
          <AlertRow icon="⚠️" title="Storm Warning — FIRED" sub="Rain 16.2mm/hr · Auto-claim in progress" time="6:04 PM" priority="high" />
          <AlertRow icon="🌡️" title="Heat Advisory — 43°C" sub="Avoid riding 1–4 PM · Stay hydrated" time="2:00 PM" priority="medium" />
          <AlertRow icon="😷" title="AQI Hazardous — 320" sub="N95 mask recommended" time="11:00 AM" priority="medium" />
          <Button variant="ghost" size="sm" style={{ width:'100%', marginTop:'.65rem' }}>View All Alerts →</Button>
        </Card>
      </div>

      {/* ROW 4: Weekly Summary + AI Recommendations */}
      <div className="grid-2">
        {/* Weekly Protection Summary */}
        <Card delay={1}>
          <CardTitle icon="📈" timestamp="Week of Jan 20–26">Weekly Protection Summary</CardTitle>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'.75rem', marginBottom:'1rem' }}>
            {[['₹4,680','Earnings','var(--text1)'],['₹900','Payouts','var(--green2)'],['₹56','Premium','var(--blue2)'],['1','Claims','var(--orange)']].map(([v,l,c])=>(
              <div key={l} style={{ textAlign:'center', padding:'.65rem', background:'var(--glass)', border:'1px solid var(--border)', borderRadius:12 }}>
                <div style={{fontFamily:'var(--mono)',fontSize:'1.1rem',fontWeight:700,color:c}}>{v}</div>
                <div style={{fontSize:'.62rem',color:'var(--text3)',marginTop:3}}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap' }}>
            {[['Mon','₹820','#10b981'],['Tue','₹960','#10b981'],['Wed','₹780','#10b981'],['Thu','₹900','#fbbf24'],['Fri','—','var(--text3)'],['Sat','—','var(--text3)'],['Sun','—','var(--text3)']].map(([d,v,c])=>(
              <div key={d} style={{ flex:1, textAlign:'center', padding:'.45rem .3rem', background:'var(--glass)', border:'1px solid var(--border)', borderRadius:8 }}>
                <div style={{fontSize:'.6rem',color:'var(--text3)',marginBottom:3}}>{d}</div>
                <div style={{fontFamily:'var(--mono)',fontSize:'.72rem',fontWeight:700,color:c}}>{v}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Recommendation Panel */}
        <Card delay={2}>
          <CardTitle icon="🤖" timestamp="AI updated 3 min ago">AI Recommendation Panel</CardTitle>
          <div style={{ display:'flex', flexDirection:'column', gap:'.6rem' }}>
            {[
              { icon:'🌧️', type:'orange', title:'Avoid deliveries 3PM–5PM', sub:'High rainfall probability in your zone. Rain trigger may fire.', urgent:true },
              { icon:'⚡', type:'green',  title:'Optimal window: 6PM–10PM', sub:'Lower rain risk, higher order density, 94% success rate historical.' },
              { icon:'📍', type:'blue',   title:'Stick to Kondapur core zone', sub:'Outer ring has 2 flooded streets. Stay within 1.5km radius.' },
              { icon:'📈', type:'purple', title:'Upgrade to Premium this week', sub:'Monsoon season — 90% payout ratio worth the ₹23 extra.' },
            ].map((r, i) => (
              <div key={i} style={{ display:'flex', gap:'.65rem', padding:'.65rem .75rem', background:'var(--glass)', border:`1px solid rgba(99,160,255,${r.urgent?'.2':'.08'})`, borderRadius:12, transition:'all .18s' }}>
                <span style={{ fontSize:'1.1rem', flexShrink:0 }}>{r.icon}</span>
                <div>
                  <div style={{ fontSize:'.78rem', fontWeight:700, color: r.urgent ? 'var(--orange)' : 'var(--text1)', marginBottom:2 }}>{r.title}</div>
                  <div style={{ fontSize:'.65rem', color:'var(--text2)', lineHeight:1.5 }}>{r.sub}</div>
                </div>
                {r.urgent && <Badge type="orange" style={{flexShrink:0,alignSelf:'flex-start'}}>URGENT</Badge>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}