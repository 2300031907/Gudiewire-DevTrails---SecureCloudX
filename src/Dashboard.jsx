import { useState, useEffect } from 'react';
import LocationRiskMap from './LocationRiskMap';
import styles from './Dashboard.module.css';
import PagePolicy from './PagePolicy';
import PageActuarial from './PageActuarial';


function Card({ children, style = {}, delay = 0 }) {
  return (
    <div style={{
      background:'rgba(255,255,255,0.03)', border:'1px solid rgba(99,160,255,0.1)',
      borderRadius:18, padding:'1.25rem', position:'relative', overflow:'hidden',
      transition:'border-color .25s, box-shadow .25s',
      animation:`fadeUp .45s ease ${delay*0.08}s both`, ...style,
    }}
    onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(99,160,255,0.22)'; e.currentTarget.style.boxShadow='0 0 24px rgba(59,130,246,0.07)'; }}
    onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(99,160,255,0.1)';  e.currentTarget.style.boxShadow='none'; }}>
      {children}
    </div>
  );
}
function CardTitle({ children, icon, action }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'.9rem' }}>
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        {icon && <span style={{ fontSize:'.9rem', opacity:.55 }}>{icon}</span>}
        <span style={{ fontSize:'.75rem', fontWeight:700, color:'var(--text1)', letterSpacing:'-.01em' }}>{children}</span>
      </div>
      {action}
    </div>
  );
}
function Badge({ type='green', children, pulse=false }) {
  const colors = {
    green: ['rgba(16,185,129,0.12)','rgba(16,185,129,0.25)','#10b981'],
    red:   ['rgba(239,68,68,0.12)', 'rgba(239,68,68,0.25)', '#ef4444'],
    orange:['rgba(245,158,11,0.12)','rgba(245,158,11,0.25)','#f59e0b'],
    blue:  ['rgba(59,130,246,0.12)','rgba(59,130,246,0.25)','#60a5fa'],
    purple:['rgba(139,92,246,0.12)','rgba(139,92,246,0.25)','#a78bfa'],
    cyan:  ['rgba(34,211,238,0.12)','rgba(34,211,238,0.25)','#22d3ee'],
  };
  const [bg,border,color] = colors[type]||colors.green;
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px', borderRadius:20, background:bg, border:`1px solid ${border}`, color, fontSize:'.62rem', fontWeight:700 }}>
      <span style={{ width:5, height:5, borderRadius:'50%', background:color, display:'inline-block', ...(pulse?{animation:'pulse-dot 1.5s infinite'}:{}) }}/>
      {children}
    </span>
  );
}
function ProgressBar({ pct=60, color='var(--blue)', height=6 }) {
  return (
    <div style={{ width:'100%', height, background:'rgba(255,255,255,0.07)', borderRadius:height/2, overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${pct}%`, background:color, borderRadius:height/2, transition:'width .6s ease' }}/>
    </div>
  );
}
function Ts({ text='Updated 5 min ago' }) {
  return <span style={{ fontSize:'.6rem', color:'var(--text3)', display:'flex', alignItems:'center', gap:4 }}>🕐 {text}</span>;
}
function AlertRow({ icon, title, sub, time, priority='medium' }) {
  const c = { high:'#ef4444', medium:'#f59e0b', low:'#3b82f6' }[priority];
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'.7rem', padding:'.65rem .85rem', borderRadius:12, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(99,160,255,0.08)', marginBottom:'.45rem', cursor:'pointer', transition:'all .18s' }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(99,160,255,0.2)'; e.currentTarget.style.transform='translateX(2px)'; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(99,160,255,0.08)'; e.currentTarget.style.transform='none'; }}>
      <div style={{ width:4, height:'100%', minHeight:36, background:c, borderRadius:4, flexShrink:0 }}/>
      <span style={{ fontSize:'1.1rem', flexShrink:0 }}>{icon}</span>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:'.78rem', fontWeight:700, color:'var(--text1)' }}>{title}</div>
        {sub && <div style={{ fontSize:'.65rem', color:'var(--text2)', marginTop:1 }}>{sub}</div>}
      </div>
      <span style={{ fontSize:'.62rem', color:'var(--text3)', fontFamily:'var(--mono)', flexShrink:0 }}>{time}</span>
    </div>
  );
}

/* ── SVG widgets ──────────────────────────────────────────────────────────── */
function RiskGauge({ pct=0.78 }) {
  const cx=90,cy=90,r=72;
  const segs=[{color:'#10b981',a1:-178,a2:-137},{color:'#fbbf24',a1:-134,a2:-93},{color:'#f59e0b',a1:-90,a2:-49},{color:'#ef4444',a1:-46,a2:-5}];
  const pt=a=>({x:cx+r*Math.cos(a*Math.PI/180),y:cy+r*Math.sin(a*Math.PI/180)});
  const arc=(a1,a2)=>{ const s=pt(a1),e=pt(a2); return `M ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y}`; };
  const na=(-178+pct*173)*Math.PI/180, nx=cx+58*Math.cos(na), ny=cy+58*Math.sin(na);
  return (
    <svg viewBox="0 0 180 100" style={{width:180,height:100}}>
      {segs.map((s,i)=><path key={i} d={arc(s.a1,s.a2)} fill="none" stroke={s.color} strokeWidth="11" strokeLinecap="round" opacity={i>=2?1:.45}/>)}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#f0f6ff" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx={cx} cy={cy} r="5.5" fill="#f0f6ff"/><circle cx={cx} cy={cy} r="2.5" fill="#0c1528"/>
    </svg>
  );
}
function GigRing({ score=720 }) {
  const r=52,cx=66,cy=66,circ=2*Math.PI*r,fill=(score/900)*circ;
  return (
    <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <svg viewBox="0 0 132 132" style={{width:132,height:132}}>
        <defs><linearGradient id="gig-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6"/><stop offset="50%" stopColor="#22d3ee"/><stop offset="100%" stopColor="#10b981"/>
        </linearGradient></defs>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="10"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#gig-g)" strokeWidth="10"
          strokeLinecap="round" strokeDasharray={`${fill} ${circ}`} strokeDashoffset={circ/4}
          style={{filter:'drop-shadow(0 0 8px rgba(34,211,238,0.4))'}}/>
      </svg>
      <div style={{position:'absolute',textAlign:'center'}}>
        <div style={{fontFamily:'var(--mono)',fontSize:'1.7rem',fontWeight:700,color:'#10b981',lineHeight:1}}>{score}</div>
        <div style={{fontSize:'.58rem',color:'var(--text3)',marginTop:2}}>GigScore</div>
      </div>
    </div>
  );
}
function Heatmap() {
  return (
    <div style={{width:'100%',height:150,borderRadius:14,overflow:'hidden',position:'relative'}}>
      <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}} viewBox="0 0 300 150" preserveAspectRatio="none">
        <defs>
          <radialGradient id="h1" cx="55%" cy="50%" r="45%"><stop offset="0%" stopColor="#f59e0b" stopOpacity=".8"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/></radialGradient>
          <radialGradient id="h2" cx="30%" cy="65%" r="30%"><stop offset="0%" stopColor="#ef4444" stopOpacity=".55"/><stop offset="100%" stopColor="transparent" stopOpacity="0"/></radialGradient>
        </defs>
        <rect width="300" height="150" fill="#0a1628"/>
        <rect width="300" height="150" fill="url(#h1)"/><rect width="300" height="150" fill="url(#h2)"/>
        {[40,80,120,160,200,240].map(x=><line key={x} x1={x} y1="0" x2={x} y2="150" stroke="rgba(59,130,246,0.05)" strokeWidth="1"/>)}
        {[30,60,90,120].map(y=><line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(59,130,246,0.05)" strokeWidth="1"/>)}
        <path d="M0 75 Q75 48 150 75 Q225 102 300 75" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5"/>
        {[[150,72],[118,90],[175,60],[100,105],[210,52]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="3.5" fill="#22d3ee" opacity=".9" style={{filter:'drop-shadow(0 0 5px #22d3ee)'}}/>
        ))}
      </svg>
      <div style={{position:'absolute',bottom:'.5rem',left:'.65rem',background:'rgba(0,0,0,0.6)',backdropFilter:'blur(8px)',borderRadius:6,padding:'3px 9px',fontSize:'.6rem',color:'rgba(240,246,255,0.5)'}}>Kondapur · 3km zone</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE COMPONENTS
═══════════════════════════════════════════════════ */

/* PAGE: DASHBOARD ─────────────────────────────────── */
function PageDashboard({ userData }) {
  return (
    <div>
      <div style={{marginBottom:'1.5rem'}}>
        <h2 style={{fontSize:'1.6rem',fontWeight:800,letterSpacing:'-.02em',marginBottom:'.2rem',background:'linear-gradient(90deg,var(--cyan),var(--blue))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>
          Welcome back, {userData?.name?.split(' ')[0]||'Ravi'}! 👋
        </h2>
        <p style={{fontSize:'.82rem',color:'var(--text2)'}}>Coverage & earnings overview · Kondapur Zone · Standard Shield Active</p>
      </div>

      {/* Live ticker */}
      <div style={{display:'flex',alignItems:'center',gap:'1.5rem',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(99,160,255,0.1)',borderRadius:14,padding:'.6rem 1.25rem',marginBottom:'1.25rem'}}>
        <span style={{fontSize:'.62rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'.08em',color:'var(--text3)',flexShrink:0}}>Live Triggers</span>
        <div style={{display:'flex',gap:'1rem',flex:1,flexWrap:'wrap'}}>
          {[{dot:'#ef4444',text:'Rain 16.2mm/hr · FIRED'},{dot:'#f59e0b',text:'Heat 43°C · Monitoring'},{dot:'var(--text3)',text:'AQI 320 · Health Alert'},{dot:'var(--text3)',text:'Platform outage −90%'}].map((item,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:6,fontSize:'.72rem',color:'var(--text2)'}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:item.dot,boxShadow:item.dot!=='var(--text3)'?`0 0 6px ${item.dot}`:'none',flexShrink:0}}/>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* 4 stat cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'1.1rem'}}>
        {[['₹4,680','Earnings This Week','var(--text1)'],['₹900','Auto-Payout Today','var(--green2)'],['₹7,500','Coverage This Week','var(--blue2)'],['< 5 min','Next Payout Speed','var(--cyan)']].map(([v,l,c],i)=>(
          <Card key={i} delay={i+1}>
            <Ts/><div style={{marginTop:'.5rem',fontFamily:'var(--mono)',fontSize:'1.4rem',fontWeight:700,color:c,lineHeight:1}}>{v}</div>
            <div style={{fontSize:'.65rem',color:'var(--text3)',marginTop:4}}>{l}</div>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 300px',gridTemplateRows:'auto auto auto',gap:'1.1rem'}}>

        <Card delay={1}>
          <CardTitle icon="📊" action={<Ts text="Updated 2 min ago"/>}>Income Risk Meter</CardTitle>
          <div style={{display:'flex',alignItems:'center',gap:'1.5rem'}}>
            <RiskGauge pct={0.8}/>
            <div>
              <div style={{fontSize:'1.25rem',fontWeight:800,color:'#f59e0b',letterSpacing:'-.02em',marginBottom:'.15rem'}}>High Risk</div>
              <div style={{fontSize:'.72rem',color:'#fbbf24',fontWeight:500,marginBottom:'.5rem'}}>Severe Weather Ahead!</div>
              <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
                {[['Rain','#3b82f6'],['Heat','#f59e0b'],['AQI','#ef4444']].map(([l,c])=>(
                  <span key={l} style={{fontSize:'.6rem',fontWeight:600,padding:'2px 8px',borderRadius:20,background:c+'18',color:c,border:`1px solid ${c}30`}}>{l}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{marginTop:'.85rem',paddingTop:'.75rem',borderTop:'1px solid rgba(99,160,255,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:'.75rem',color:'var(--text2)'}}>
            <span>Potential Loss</span>
            <span style={{fontFamily:'var(--mono)',fontWeight:700,color:'#f59e0b'}}>₹6,500 – 9,000</span>
          </div>
        </Card>

        <Card delay={2}>
          <CardTitle icon="📋" action={<Badge type="green" pulse>ACTIVE</Badge>}>Current Coverage</CardTitle>
          <div style={{fontSize:'.7rem',fontFamily:'var(--mono)',color:'var(--text3)',marginBottom:'.2rem'}}>ZS-542-1289</div>
          <div style={{fontSize:'.7rem',color:'var(--text2)',marginBottom:'.8rem'}}>Ends Today 11:59 PM</div>
          <div style={{fontFamily:'var(--mono)',fontSize:'1.8rem',fontWeight:700,color:'var(--text1)',letterSpacing:'-.03em',lineHeight:1}}>₹7,500</div>
          <div style={{fontSize:'.7rem',color:'var(--text3)',marginTop:'.2rem',marginBottom:'.75rem'}}>/Week · Standard Shield</div>
          <div style={{marginBottom:'.5rem'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:'.65rem',color:'var(--text3)',marginBottom:'.3rem'}}>
              <span>Risk Protection Level</span><span style={{color:'var(--cyan)',fontFamily:'var(--mono)',fontWeight:700}}>85%</span>
            </div>
            <ProgressBar pct={85} color="linear-gradient(90deg,var(--green),var(--cyan))"/>
          </div>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(16,185,129,0.1)',border:'1px solid rgba(16,185,129,0.2)',borderRadius:20,padding:'3px 10px',fontSize:'.68rem',fontWeight:600,color:'var(--green2)'}}>
            🛡️ Active · Monsoon Season
          </div>
        </Card>

        {/* Heatmap — spans 2 rows */}
        <Card delay={3} style={{gridRow:'span 2'}}>
          <CardTitle>Delivery Zone Heatmap</CardTitle>
          <Heatmap/>
          <div style={{display:'flex',gap:8,marginTop:'.65rem',flexWrap:'wrap'}}>
            {[['Hot','#ef4444'],['Active','#f59e0b'],['Normal','#10b981']].map(([l,c])=>(
              <div key={l} style={{display:'flex',alignItems:'center',gap:4,fontSize:'.62rem',color:'var(--text3)'}}>
                <div style={{width:7,height:7,borderRadius:2,background:c}}/>{l}
              </div>
            ))}
          </div>
          <div style={{marginTop:'1rem',paddingTop:'.85rem',borderTop:'1px solid rgba(99,160,255,0.1)'}}>
            <div style={{fontSize:'.72rem',fontWeight:700,marginBottom:'.65rem'}}>⚠️ Safety Alerts</div>
            {[{icon:'⚠️',title:'Storm Warning',val:'16.2mm/hr',c:'#f59e0b'},{icon:'🌡️',title:'Heat Advisory',val:'43°C',c:'#ef4444'},{icon:'😷',title:'AQI Hazardous',val:'AQI 320',c:'#8b5cf6'}].map((a,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'.45rem 0',borderBottom:i<2?'1px solid rgba(99,160,255,0.07)':'none',fontSize:'.72rem'}}>
                <span>{a.icon}</span><span style={{flex:1,color:'var(--text2)'}}>{a.title}</span>
                <span style={{fontFamily:'var(--mono)',fontSize:'.65rem',color:a.c,fontWeight:700}}>{a.val}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card delay={4}>
          <CardTitle icon="🏆" action={<Ts text="Updated Sunday"/>}>GigScore</CardTitle>
          <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
            <GigRing score={720}/>
            <div style={{flex:1,display:'flex',flexDirection:'column',gap:'.4rem'}}>
              {[{l:'Accuracy',v:'98%',c:'var(--green2)'},{l:'On-Time',v:'94%',c:'var(--blue2)'},{l:'Discount',v:'−10%',c:'var(--yellow)'},{l:'Tier',v:'700–849',c:'var(--cyan)'}].map(s=>(
                <div key={s.l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'.3rem .55rem',background:'var(--glass)',borderRadius:8,fontSize:'.68rem',color:'var(--text2)'}}>
                  {s.l}<span style={{fontFamily:'var(--mono)',fontWeight:700,color:s.c}}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card delay={5}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            <div>
              <div style={{fontSize:'.68rem',fontWeight:700,color:'var(--text1)',marginBottom:'.5rem'}}>🚑 Emergency Assist</div>
              <div style={{fontFamily:'var(--mono)',fontSize:'1.4rem',fontWeight:700,color:'var(--text1)',lineHeight:1}}>₹650</div>
              <div style={{fontSize:'.65rem',color:'var(--text3)',marginTop:'.15rem'}}>Instant Medical Aid</div>
            </div>
            <div style={{borderLeft:'1px solid rgba(99,160,255,0.1)',paddingLeft:'1rem'}}>
              <div style={{fontSize:'.68rem',fontWeight:700,color:'var(--text1)',marginBottom:'.5rem'}}>💰 Payouts</div>
              <div style={{fontFamily:'var(--mono)',fontSize:'1.4rem',fontWeight:700,color:'var(--green2)',lineHeight:1}}>₹1,200</div>
              <div style={{fontSize:'.65rem',color:'var(--text3)',marginTop:'.15rem'}}>Active Policies</div>
            </div>
          </div>
          <div style={{marginTop:'1rem',paddingTop:'.85rem',borderTop:'1px solid rgba(99,160,255,0.1)'}}>
            <div style={{fontSize:'.68rem',fontWeight:700,color:'var(--text1)',marginBottom:'.6rem'}}>⚡ Weekly Earnings</div>
            <div style={{fontFamily:'var(--mono)',fontSize:'1.5rem',fontWeight:700,letterSpacing:'-.03em',lineHeight:1}}>₹4,680</div>
            <div style={{fontSize:'.65rem',color:'var(--text3)',marginTop:'.15rem',marginBottom:'.6rem'}}>Mon – Thu · Standard Shield</div>
            {[{l:'Auto-Payout Today',v:'₹900',c:'var(--green2)'},{l:'Next Payout',v:'< 5 min',c:'var(--cyan)'},{l:'Premium',v:'₹56/wk',c:'var(--blue2)'}].map(r=>(
              <div key={r.l} style={{display:'flex',justifyContent:'space-between',padding:'.38rem 0',borderTop:'1px solid rgba(99,160,255,0.07)',fontSize:'.72rem',color:'var(--text2)'}}>
                {r.l}<span style={{fontFamily:'var(--mono)',fontWeight:700,color:r.c}}>{r.v}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card delay={6}>
          <CardTitle icon="🔔" action={<Badge type="red" pulse>3 Active</Badge>}>Recent Alerts</CardTitle>
          {[{icon:'⚠️',title:'Storm Warning FIRED',meta:'Rain 16.2mm/hr · Auto-claim',dot:'#ef4444',time:'6:04 PM'},{icon:'🌡️',title:'Heat Advisory Active',meta:'Stay hydrated · 43°C',dot:'#f59e0b',time:'2:30 PM'},{icon:'😷',title:'AQI Hazardous Alert',meta:'N95 recommended · AQI 320',dot:'#8b5cf6',time:'11:00 AM'},{icon:'💰',title:'Payout Processed',meta:'₹900 credited via UPI',dot:'#10b981',time:'Yesterday'}].map((a,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:'.65rem',padding:'.55rem .7rem',borderRadius:10,background:'var(--glass)',border:'1px solid rgba(99,160,255,0.08)',marginBottom:'.4rem',cursor:'pointer',transition:'all .18s'}}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(99,160,255,0.2)'; e.currentTarget.style.transform='translateX(2px)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(99,160,255,0.08)'; e.currentTarget.style.transform='none'; }}>
              <div style={{width:6,height:6,borderRadius:'50%',background:a.dot,flexShrink:0,boxShadow:`0 0 6px ${a.dot}`}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:'.75rem',fontWeight:600}}>{a.title}</div>
                <div style={{fontSize:'.62rem',color:'var(--text3)',marginTop:1}}>{a.meta}</div>
              </div>
              <span style={{fontSize:'.62rem',color:'var(--text3)',fontFamily:'var(--mono)',flexShrink:0}}>{a.time}</span>
            </div>
          ))}
        </Card>

        {/* Smart Advisor strip */}
        <Card delay={7} style={{gridColumn:'1 / -1',display:'flex',alignItems:'center',gap:'2rem'}}>
          <span style={{fontSize:'1.8rem',flexShrink:0}}>🤖</span>
          <div style={{flex:1}}>
            <div style={{fontSize:'.82rem',fontWeight:700,color:'var(--blue2)',marginBottom:'.35rem'}}>
              Smart Advisor · Weekly Forecast for {userData?.name?.split(' ')[0]||'Ravi'}
            </div>
            <div style={{display:'flex',gap:'.65rem',flexWrap:'wrap'}}>
              {[{icon:'🌧️',tip:<><strong>Avoid 5–9 PM today</strong> — peak flood risk</>},{icon:'☀️',tip:<><strong>Best window: 7–11 AM</strong> — 94% order success</>},{icon:'📍',tip:<><strong>Kondapur core zone</strong> safer than outer ring</>},{icon:'📈',tip:<><strong>Upgrade to Premium</strong> — 90% payout this monsoon</>}].map((t,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:6,background:'rgba(59,130,246,0.06)',border:'1px solid rgba(59,130,246,0.1)',borderRadius:8,padding:'.35rem .75rem',fontSize:'.72rem',color:'var(--text2)'}}>
                  <span>{t.icon}</span>{t.tip}
                </div>
              ))}
            </div>
          </div>
          <div style={{fontSize:'.62rem',fontFamily:'var(--mono)',fontWeight:700,background:'rgba(34,211,238,0.08)',border:'1px solid rgba(34,211,238,0.18)',color:'var(--cyan)',padding:'4px 12px',borderRadius:20,flexShrink:0}}>
            AI · Updated Sunday
          </div>
        </Card>
      </div>
    </div>
  );
}

/* PAGE: MAP ───────────────────────────────────────── */
function PageMap() {
  return (
    <div>
      <div style={{marginBottom:'1.25rem'}}>
        <h2 style={{fontSize:'1.4rem',fontWeight:800,letterSpacing:'-.02em',marginBottom:'.2rem'}}>Delivery Map</h2>
        <p style={{fontSize:'.78rem',color:'var(--text2)'}}>Real-time weather risk & route safety for any delivery city</p>
      </div>
      <div style={{height:'calc(100vh - 220px)',minHeight:520}}>
        <LocationRiskMap/>
      </div>
    </div>
  );
}

/* PAGE: COVERAGE ──────────────────────────────────── */
function ShieldCard({ icon,name,status,weekly,remaining,pct,color }) {
  return (
    <div style={{background:'rgba(255,255,255,0.03)',border:`1px solid ${status==='ACTIVE'?color+'33':'rgba(99,160,255,0.1)'}`,borderRadius:16,padding:'1.1rem',transition:'all .2s'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'.65rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{width:36,height:36,borderRadius:10,background:`${color}18`,border:`1px solid ${color}33`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem'}}>{icon}</div>
          <div><div style={{fontSize:'.8rem',fontWeight:700,color:'var(--text1)'}}>{name}</div><div style={{fontSize:'.62rem',color:'var(--text3)'}}>Parametric trigger</div></div>
        </div>
        <Badge type={status==='ACTIVE'?'green':'red'} pulse={status==='ACTIVE'}>{status}</Badge>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.5rem',marginBottom:'.6rem'}}>
        {[['Weekly Limit',weekly],['Remaining',remaining]].map(([l,v])=>(
          <div key={l} style={{padding:'.4rem .55rem',background:'rgba(255,255,255,0.03)',borderRadius:8}}>
            <div style={{fontSize:'.58rem',color:'var(--text3)',marginBottom:2}}>{l}</div>
            <div style={{fontFamily:'var(--mono)',fontSize:'.88rem',fontWeight:700,color:'var(--text1)'}}>{v}</div>
          </div>
        ))}
      </div>
      <ProgressBar pct={pct} color={color} height={5}/>
    </div>
  );
}
function PageCoverage() {
  return (
    <div>
      <div style={{marginBottom:'1.5rem'}}>
        <h2 style={{fontSize:'1.4rem',fontWeight:800,marginBottom:'.2rem'}}>Coverage</h2>
        <p style={{fontSize:'.78rem',color:'var(--text2)'}}>Your parametric insurance shields · Standard Shield Active</p>
      </div>
      <Card delay={1} style={{marginBottom:'1rem',background:'linear-gradient(135deg,rgba(59,130,246,0.08),rgba(34,211,238,0.04))',borderColor:'rgba(59,130,246,0.2)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:'.4rem'}}>
              <span style={{fontSize:'1.4rem'}}>🛡️</span>
              <div style={{fontSize:'1.1rem',fontWeight:800}}>Standard Shield Plan</div>
              <Badge type="green" pulse>ACTIVE</Badge>
            </div>
            <div style={{fontSize:'.78rem',color:'var(--text2)',lineHeight:1.6}}>Policy ZS-542-1289 · Renews Sunday · 75% payout ratio</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:'var(--mono)',fontSize:'2rem',fontWeight:800,lineHeight:1}}>₹7,500</div>
            <div style={{fontSize:'.7rem',color:'var(--text3)'}}>/week cap</div>
            <button style={{marginTop:'.65rem',padding:'.5rem 1.1rem',background:'linear-gradient(135deg,var(--blue),#2563eb)',border:'none',borderRadius:10,color:'#fff',fontSize:'.78rem',fontWeight:700,cursor:'pointer',fontFamily:'var(--font)'}}>Upgrade →</button>
          </div>
        </div>
      </Card>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1rem'}}>
        <ShieldCard icon="🌧️" name="Rain Shield"      status="ACTIVE" weekly="₹3,500" remaining="₹2,800" pct={80} color="#3b82f6"/>
        <ShieldCard icon="🌡️" name="Heat Shield"      status="ACTIVE" weekly="₹2,000" remaining="₹1,400" pct={70} color="#f59e0b"/>
        <ShieldCard icon="😷" name="Pollution Shield" status="ACTIVE" weekly="₹1,500" remaining="₹1,200" pct={80} color="#8b5cf6"/>
        <ShieldCard icon="⚡" name="Storm Shield"     status="ACTIVE" weekly="₹2,000" remaining="₹500"   pct={25} color="#ef4444"/>
      </div>
    </div>
  );
}

/* PAGE: ALERTS ────────────────────────────────────── */
function PageAlerts() {
  return (
    <div>
      <div style={{marginBottom:'1.5rem'}}>
        <h2 style={{fontSize:'1.4rem',fontWeight:800,marginBottom:'.2rem'}}>Alerts</h2>
        <p style={{fontSize:'.78rem',color:'var(--text2)'}}>Disruption alerts · 3 active triggers</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'1rem'}}>
        {[['3','Active Now','#ef4444'],['2','Payouts Triggered','var(--green2)'],['5','Today Total','var(--orange)'],['12','This Week','var(--blue2)']].map(([v,l,c],i)=>(
          <Card key={i} delay={i+1}><Ts text="Live"/><div style={{marginTop:'.5rem',fontFamily:'var(--mono)',fontSize:'1.5rem',fontWeight:700,color:c}}>{v}</div><div style={{fontSize:'.65rem',color:'var(--text3)',marginTop:3}}>{l}</div></Card>
        ))}
      </div>
      <Card delay={1} style={{marginBottom:'1rem',borderColor:'rgba(239,68,68,0.2)'}}>
        <CardTitle icon="🚨" action={<Badge type="red" pulse>HIGH</Badge>}>High Priority</CardTitle>
        <AlertRow icon="⚠️" title="Storm Warning — Rain Trigger FIRED" sub="Rainfall 16.2mm/hr · Auto-claim ₹900" time="6:04 PM" priority="high"/>
        <AlertRow icon="🌊" title="Flash Flood Alert" sub="Kondapur main road flooded · Orders −90%" time="5:48 PM" priority="high"/>
      </Card>
      <Card delay={2} style={{borderColor:'rgba(245,158,11,0.15)'}}>
        <CardTitle icon="⚠️" action={<Badge type="orange">MEDIUM</Badge>}>Medium Priority</CardTitle>
        <AlertRow icon="🌡️" title="Heatwave Advisory · 43°C" sub="Partial payout ₹320 triggered" time="2:30 PM" priority="medium"/>
        <AlertRow icon="😷" title="AQI 320 Hazardous" sub="N95 mask recommended · Payout ₹280" time="11:00 AM" priority="medium"/>
      </Card>
    </div>
  );
}

/* PAGE: GIGSCORE ──────────────────────────────────── */
function BigRing({ score=720 }) {
  const r=80,cx=96,cy=96,circ=2*Math.PI*r,fill=(score/900)*circ;
  return (
    <div style={{position:'relative',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
      <svg viewBox="0 0 192 192" style={{width:180,height:180}}>
        <defs><linearGradient id="big-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3b82f6"/><stop offset="50%" stopColor="#22d3ee"/><stop offset="100%" stopColor="#10b981"/></linearGradient></defs>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="12"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#big-g)" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={`${fill} ${circ}`} strokeDashoffset={circ/4} style={{filter:'drop-shadow(0 0 12px rgba(34,211,238,0.5))'}}/>
      </svg>
      <div style={{position:'absolute',textAlign:'center'}}>
        <div style={{fontFamily:'var(--mono)',fontSize:'2.2rem',fontWeight:800,color:'#10b981',lineHeight:1}}>{score}</div>
        <div style={{fontSize:'.65rem',color:'var(--text3)',marginTop:3}}>/ 900</div>
        <div style={{marginTop:6}}><Badge type="blue">700–849 Tier</Badge></div>
      </div>
    </div>
  );
}
function PageGigScore({ userData }) {
  return (
    <div>
      <div style={{marginBottom:'1.5rem'}}>
        <h2 style={{fontSize:'1.4rem',fontWeight:800,marginBottom:'.2rem'}}>GigScore</h2>
        <p style={{fontSize:'.78rem',color:'var(--text2)'}}>Delivery partner stability score · Scale 300–900</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:'1rem'}}>
        <Card delay={1}>
          <CardTitle icon="🏆" action={<Ts text="Updated Sunday"/>}>Score Meter</CardTitle>
          <div style={{display:'flex',justifyContent:'center',marginBottom:'1rem'}}><BigRing score={720}/></div>
          <div style={{padding:'.65rem .85rem',background:'rgba(139,92,246,0.08)',border:'1px solid rgba(139,92,246,0.2)',borderRadius:12,fontSize:'.72rem',color:'#a78bfa',lineHeight:1.65}}>
            💡 Work after 5 PM today to push score to 750+.
          </div>
        </Card>
        <Card delay={2}>
          <CardTitle icon="📋">Score Breakdown</CardTitle>
          {[{l:'Claim Accuracy',sc:195,max:200,c:'#10b981'},{l:'Platform Tenure',sc:188,max:200,c:'#3b82f6'},{l:'Shift Regularity',sc:176,max:200,c:'#22d3ee'},{l:'Zone Adherence',sc:96,max:100,c:'#f59e0b'},{l:'Peer Review',sc:65,max:200,c:'#8b5cf6'}].map((s,i)=>(
            <div key={i} style={{marginBottom:'.65rem'}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'.72rem',color:'var(--text2)',marginBottom:'.3rem'}}>
                {s.l}<span style={{fontFamily:'var(--mono)',fontWeight:700,color:s.c}}>{s.sc}/{s.max}</span>
              </div>
              <ProgressBar pct={(s.sc/s.max)*100} color={s.c} height={5}/>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* PAGE: PAYOUTS ───────────────────────────────────── */
function PagePayouts() {
  return (
    <div>
      <div style={{marginBottom:'1.5rem'}}>
        <h2 style={{fontSize:'1.4rem',fontWeight:800,marginBottom:'.2rem'}}>Payouts</h2>
        <p style={{fontSize:'.78rem',color:'var(--text2)'}}>Automatic parametric insurance payouts · All via UPI &lt; 5 min</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'1rem'}}>
        {[['₹2,380','Total This Week','var(--green2)'],['2','Claims Triggered','var(--blue2)'],['< 4 min','Average Speed','var(--cyan)'],['₹3,200','Coverage Remaining','var(--orange)']].map(([v,l,c],i)=>(
          <Card key={i} delay={i+1}><Ts/><div style={{marginTop:'.5rem',fontFamily:'var(--mono)',fontSize:'1.4rem',fontWeight:700,color:c}}>{v}</div><div style={{fontSize:'.65rem',color:'var(--text3)',marginTop:3}}>{l}</div></Card>
        ))}
      </div>
      <Card delay={1} style={{borderColor:'rgba(16,185,129,0.25)',background:'linear-gradient(135deg,rgba(16,185,129,0.06),rgba(255,255,255,0.03))'}}>
        <CardTitle icon="⚡" action={<Badge type="green" pulse>PAID</Badge>}>Latest Triggered Payout</CardTitle>
        <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1rem'}}>
          <div style={{width:52,height:52,borderRadius:'50%',background:'rgba(16,185,129,0.15)',border:'2px solid rgba(16,185,129,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem'}}>💰</div>
          <div>
            <div style={{fontFamily:'var(--mono)',fontSize:'1.8rem',fontWeight:800,color:'#10b981',lineHeight:1}}>₹900</div>
            <div style={{fontSize:'.7rem',color:'var(--text2)',marginTop:3}}>Rain Shield · UPI · 3m 42s</div>
          </div>
        </div>
        {[['Trigger','Heavy Rain 16.2mm/hr'],['Threshold','15mm/hr'],['Payout Time','3 min 42 sec'],['UPI Ref','ZS202401231842']].map(([l,v])=>(
          <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'.4rem 0',borderTop:'1px solid rgba(99,160,255,0.1)',fontSize:'.72rem',color:'var(--text2)'}}>
            {l}<span style={{fontWeight:600,color:'var(--text1)',fontFamily:l==='UPI Ref'?'var(--mono)':'var(--font)'}}>{v}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* PAGE: ADVISOR ───────────────────────────────────── */
function PageAdvisor({ userData }) {
  const hrs=[{h:'6a',r:'low'},{h:'7a',r:'low'},{h:'8a',r:'med'},{h:'9a',r:'med'},{h:'10a',r:'med'},{h:'11a',r:'high'},{h:'12p',r:'high'},{h:'1p',r:'high'},{h:'2p',r:'high'},{h:'3p',r:'crit'},{h:'4p',r:'crit'},{h:'5p',r:'high'},{h:'6p',r:'med'},{h:'7p',r:'low'},{h:'8p',r:'low'},{h:'9p',r:'low'},{h:'10p',r:'med'},{h:'11p',r:'med'}];
  const rc={low:'#10b981',med:'#f59e0b',high:'#f97316',crit:'#ef4444'};
  return (
    <div>
      <div style={{marginBottom:'1.5rem'}}>
        <h2 style={{fontSize:'1.4rem',fontWeight:800,marginBottom:'.2rem'}}>AI Advisor 🤖</h2>
        <p style={{fontSize:'.78rem',color:'var(--text2)'}}>Personalized shift planning · XGBoost + Prophet</p>
      </div>
      <Card delay={1} style={{marginBottom:'1rem',background:'linear-gradient(135deg,rgba(16,185,129,0.08),rgba(34,211,238,0.04))',borderColor:'rgba(16,185,129,0.25)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:'.4rem'}}>
              <span style={{fontSize:'1.5rem'}}>⭐</span>
              <div style={{fontSize:'1.1rem',fontWeight:800}}>Recommended Shift Today</div>
              <Badge type="green" pulse>AI RECOMMENDED</Badge>
            </div>
            <div style={{fontFamily:'var(--mono)',fontSize:'1.6rem',fontWeight:800,color:'#10b981'}}>6:00 PM – 10:00 PM</div>
            <div style={{fontSize:'.78rem',color:'var(--text2)',marginTop:'.3rem',maxWidth:500,lineHeight:1.6}}>
              Heavy rainfall expected 3–5 PM. Evening window has 94% order success rate.
            </div>
          </div>
          <div style={{textAlign:'right',flexShrink:0}}>
            <div style={{fontSize:'.65rem',color:'var(--text3)',marginBottom:'.35rem'}}>Est. Earnings</div>
            <div style={{fontFamily:'var(--mono)',fontSize:'1.4rem',fontWeight:700,color:'#10b981'}}>₹1,200</div>
          </div>
        </div>
      </Card>
      <Card delay={2} style={{marginBottom:'1rem'}}>
        <CardTitle icon="⏰" action={<Ts text="AI forecast"/>}>Risk Timeline</CardTitle>
        <div style={{display:'flex',gap:4,marginBottom:'.5rem'}}>
          {hrs.map((h,i)=>(
            <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
              <div style={{width:'100%',height:32,borderRadius:6,background:rc[h.r]+'35',border:`1px solid ${rc[h.r]}55`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.5rem',color:rc[h.r],fontWeight:700}}>
                {h.r==='crit'?'⛔':h.r==='high'?'⚠':'~'}
              </div>
              <div style={{fontSize:'.45rem',color:'var(--text3)'}}>{h.h}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:'1rem',padding:'.65rem .85rem',background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.15)',borderRadius:10,fontSize:'.72rem',color:'#ef4444'}}>
          🚫 <strong>Avoid 3 PM – 5 PM</strong> — High rainfall probability. Stay home.
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SIDEBAR  (collapsible)
═══════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id:'Dashboard', icon:'⊞',  badge:null },
  { id:'Map',       icon:'🗺️', badge:'NEW' },
  { id:'Coverage',  icon:'🛡️', badge:null },
  { id:'Alerts',    icon:'🔔', badge:'3'   },
  { id:'GigScore',  icon:'📊', badge:null },
  { id:'Payouts',   icon:'💰', badge:null },
  { id:'Advisor',   icon:'🤖', badge:'AI'  },
  { id:'Policy',    icon:'📜', badge:'NEW' },  // ← ADD THIS
  { id:'Actuarial', icon:'📐', badge:'NEW' },
];

const SIDEBAR_W   = 200;
const SIDEBAR_COL = 60;

function Sidebar({ active, onChange, onProfile, onSignOut, onOpenSettings, open, onToggle }) {
  const w = open ? SIDEBAR_W : SIDEBAR_COL;
  return (
    <div style={{
      width: w, flexShrink:0, position:'fixed', top:56, left:0, bottom:0,
      background:'rgba(5,10,20,0.95)', backdropFilter:'blur(20px)',
      borderRight:'1px solid rgba(99,160,255,0.1)',
      display:'flex', flexDirection:'column',
      transition:'width .22s cubic-bezier(.4,0,.2,1)',
      overflow:'hidden', zIndex:100,
    }}>

      {/* Toggle button */}
      <div style={{ display:'flex', justifyContent: open ? 'flex-end' : 'center', padding:open ? '10px 10px 4px' : '10px 0 4px' }}>
        <button onClick={onToggle} title={open ? 'Collapse sidebar' : 'Expand sidebar'} style={{
          width:28, height:28, borderRadius:8,
          background:'rgba(59,130,246,0.1)', border:'1px solid rgba(59,130,246,0.18)',
          color:'#60a5fa', cursor:'pointer', fontSize:'.75rem', fontWeight:700,
          display:'flex', alignItems:'center', justifyContent:'center',
          transition:'all .18s', flexShrink:0,
        }}
          onMouseEnter={e=>e.currentTarget.style.background='rgba(59,130,246,0.22)'}
          onMouseLeave={e=>e.currentTarget.style.background='rgba(59,130,246,0.1)'}
        >
          {open ? '←' : '→'}
        </button>
      </div>

      {/* Nav items */}
      <div style={{ padding:open ? '0 .65rem' : '0 .4rem', marginBottom:'.5rem', flex:1 }}>
        {open && <div style={{ fontSize:'.58rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'rgba(99,160,255,0.4)', padding:'.4rem .75rem .3rem' }}>Menu</div>}
        {NAV_ITEMS.map(item=>(
          <div key={item.id} onClick={()=>onChange(item.id)} title={!open ? item.id : ''} style={{
            display:'flex', alignItems:'center', gap:open ? '.65rem' : 0,
            justifyContent: open ? 'flex-start' : 'center',
            padding: open ? '.55rem .85rem' : '.55rem 0', borderRadius:10, cursor:'pointer',
            marginBottom:2, transition:'all .18s',
            color: active===item.id ? '#60a5fa' : 'rgba(120,150,190,0.9)',
            background: active===item.id ? 'rgba(59,130,246,0.12)' : 'transparent',
            border: active===item.id ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
            fontSize:'.8rem', fontWeight:500, overflow:'hidden', whiteSpace:'nowrap',
          }}
          onMouseEnter={e=>{ if(active!==item.id){ e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='#eaf0ff'; }}}
          onMouseLeave={e=>{ if(active!==item.id){ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(120,150,190,0.9)'; }}}>
            <span style={{ fontSize:'1rem', flexShrink:0 }}>{item.icon}</span>
            {open && <span style={{ flex:1, overflow:'hidden', textOverflow:'ellipsis' }}>{item.id}</span>}
            {open && item.badge && (
              <span style={{ fontSize:'.55rem', fontWeight:700, padding:'2px 6px', borderRadius:10, flexShrink:0,
                background: item.badge==='NEW'||item.badge==='AI' ? 'rgba(139,92,246,0.15)' : 'rgba(239,68,68,0.15)',
                color:       item.badge==='NEW'||item.badge==='AI' ? '#a78bfa'             : '#ef4444',
                border:`1px solid ${item.badge==='NEW'||item.badge==='AI' ? 'rgba(139,92,246,0.3)' : 'rgba(239,68,68,0.25)'}` }}>
                {item.badge}
              </span>
            )}
          </div>
        ))}

        {/* Account section */}
        {open && <div style={{ fontSize:'.58rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'rgba(99,160,255,0.4)', padding:'.8rem .75rem .3rem' }}>Account</div>}

        {[{icon:'👤',label:'Profile',fn:onProfile},{icon:'⚙️',label:'Settings',fn:onOpenSettings}].map(item=>(
          <div key={item.label} onClick={item.fn} title={!open ? item.label : ''} style={{
            display:'flex', alignItems:'center', gap:open ? '.65rem' : 0,
            justifyContent: open ? 'flex-start' : 'center',
            padding: open ? '.55rem .85rem' : '.55rem 0', borderRadius:10, cursor:'pointer',
            marginBottom:2, transition:'all .18s', color:'rgba(120,150,190,0.9)', fontSize:'.8rem', fontWeight:500,
            overflow:'hidden', whiteSpace:'nowrap',
          }}
            onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='#eaf0ff'; }}
            onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(120,150,190,0.9)'; }}>
            <span style={{fontSize:'1rem'}}>{item.icon}</span>
            {open && item.label}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ padding: open ? '.75rem .65rem' : '.5rem .4rem', borderTop:'1px solid rgba(99,160,255,0.1)' }}>
        {open && (
          <div style={{ background:'rgba(16,185,129,0.07)', border:'1px solid rgba(16,185,129,0.15)', borderRadius:12, padding:'.6rem .75rem', marginBottom:'.65rem' }}>
            <div style={{ fontSize:'.58rem', color:'rgba(99,160,255,0.4)', marginBottom:'.2rem', textTransform:'uppercase', letterSpacing:'.06em' }}>Active Zone</div>
            <div style={{ fontSize:'.78rem', fontWeight:700, color:'#eaf0ff' }}>Kondapur Dark Store</div>
            <div style={{ fontSize:'.62rem', color:'#10b981', marginTop:2, display:'flex', alignItems:'center', gap:4 }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#10b981', display:'inline-block' }}/> Shield Active
            </div>
          </div>
        )}
        <div onClick={onSignOut} title={!open ? 'Sign Out' : ''} style={{
          display:'flex', alignItems:'center', justifyContent:'center', gap: open ? 6 : 0,
          padding:'.6rem', borderRadius:10, cursor:'pointer',
          fontSize: open ? '.78rem' : '1rem', fontWeight:600,
          color:'rgba(239,68,68,0.7)', background:'rgba(239,68,68,0.07)',
          border:'1px solid rgba(239,68,68,0.15)', transition:'all .18s',
        }}
          onMouseEnter={e=>{ e.currentTarget.style.background='rgba(239,68,68,0.14)'; e.currentTarget.style.color='#ef4444'; }}
          onMouseLeave={e=>{ e.currentTarget.style.background='rgba(239,68,68,0.07)'; e.currentTarget.style.color='rgba(239,68,68,0.7)'; }}>
          🚪{open && ' Sign Out'}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN DASHBOARD EXPORT
═══════════════════════════════════════════════════ */
export default function Dashboard({ userData, onSignOut, onOpenProfile, onOpenSettings }) {
  const [tab,       setTab]       = useState('Dashboard');
  const [time,      setTime]      = useState(new Date());
  const [sideOpen,  setSideOpen]  = useState(true);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = time.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  const leftPad  = sideOpen ? SIDEBAR_W : SIDEBAR_COL;

  const pages = {
    Dashboard: <PageDashboard userData={userData}/>,
    Map:       <PageMap/>,
    Coverage:  <PageCoverage/>,
    Alerts:    <PageAlerts/>,
    GigScore:  <PageGigScore userData={userData}/>,
    Payouts:   <PagePayouts/>,
    Advisor:   <PageAdvisor userData={userData}/>,
    Policy:    <PagePolicy/>,  // ← ADD THIS
    Actuarial: <PageActuarial/>,
  };

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg0)' }}>

      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:200,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 1.25rem', height:56,
        background:'rgba(5,10,20,0.92)', backdropFilter:'blur(24px)',
        borderBottom:'1px solid rgba(99,160,255,0.1)',
      }}>
        {/* Brand */}
        <div style={{ display:'flex', alignItems:'center', gap:9 }}>
          <div style={{ width:28,height:28,borderRadius:7,background:'linear-gradient(135deg,var(--blue),var(--cyan))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.8rem',boxShadow:'0 0 12px rgba(59,130,246,0.4)' }}>🛡️</div>
          <span style={{ fontWeight:800,fontSize:'.88rem',letterSpacing:'.04em',background:'linear-gradient(90deg,#eaf0ff,var(--cyan))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>ZEROSHIELD</span>
          <span style={{ fontSize:'.68rem', color:'rgba(99,160,255,0.45)', marginLeft:4, fontFamily:'var(--mono)' }}>/ {tab}</span>
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:8 }}>

          {/* Live clock */}
          <div style={{ display:'flex',alignItems:'center',gap:5,padding:'4px 10px',borderRadius:20,background:'rgba(239,68,68,0.1)',border:'1px solid rgba(239,68,68,0.2)',fontSize:'.63rem',color:'#ef4444',fontWeight:600,fontFamily:'var(--mono)' }}>
            <div style={{ width:5,height:5,background:'#ef4444',borderRadius:'50%',animation:'pulse-dot 1.2s infinite' }}/>
            LIVE · {timeStr}
          </div>

          {/* Profile button */}
          <button onClick={onOpenProfile} style={{ display:'flex',alignItems:'center',gap:7,padding:'5px 11px',background:'transparent',border:'1px solid rgba(99,160,255,0.14)',borderRadius:9,fontSize:'.76rem',color:'var(--text2)',cursor:'pointer',fontFamily:'var(--font)',transition:'all .18s' }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(99,160,255,0.3)'; e.currentTarget.style.background='rgba(59,130,246,0.07)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(99,160,255,0.14)'; e.currentTarget.style.background='transparent'; }}>
            <div style={{ width:24,height:24,borderRadius:'50%',background:'linear-gradient(135deg,var(--blue),var(--cyan))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.6rem',fontWeight:700,color:'#fff' }}>
              {(userData?.name||'RK').slice(0,2).toUpperCase()}
            </div>
            {userData?.name||'My Account'}
          </button>

          {/* Settings */}
          <button onClick={onOpenSettings} title="Settings" style={{ width:32,height:32,display:'flex',alignItems:'center',justifyContent:'center',background:'transparent',border:'1px solid rgba(99,160,255,0.12)',borderRadius:9,cursor:'pointer',fontSize:'.9rem',color:'var(--text2)',transition:'all .18s' }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(99,160,255,0.28)'; e.currentTarget.style.background='rgba(59,130,246,0.07)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(99,160,255,0.12)'; e.currentTarget.style.background='transparent'; }}>
            ⚙️
          </button>

          {/* Sign Out */}
          <button onClick={onSignOut} style={{ display:'flex',alignItems:'center',gap:5,padding:'5px 12px',background:'rgba(239,68,68,0.07)',border:'1px solid rgba(239,68,68,0.18)',borderRadius:9,cursor:'pointer',fontSize:'.74rem',fontWeight:600,color:'rgba(239,68,68,0.8)',fontFamily:'var(--font)',transition:'all .18s' }}
            onMouseEnter={e=>{ e.currentTarget.style.background='rgba(239,68,68,0.15)'; e.currentTarget.style.color='#ef4444'; }}
            onMouseLeave={e=>{ e.currentTarget.style.background='rgba(239,68,68,0.07)'; e.currentTarget.style.color='rgba(239,68,68,0.8)'; }}>
            🚪 Sign Out
          </button>
        </div>
      </nav>

      {/* ── COLLAPSIBLE SIDEBAR ────────────────────────────────────────────── */}
      <Sidebar
        active={tab}
        onChange={setTab}
        onProfile={onOpenProfile}
        onSignOut={onSignOut}
        onOpenSettings={onOpenSettings}
        open={sideOpen}
        onToggle={() => setSideOpen(o => !o)}
      />

      {/* ── PAGE CONTENT ──────────────────────────────────────────────────── */}
      <div style={{
        paddingTop: 56,
        paddingLeft: leftPad,
        paddingBottom: 80,
        transition: 'padding-left .22s cubic-bezier(.4,0,.2,1)',
      }}>
        <div style={{ maxWidth:1300, margin:'0 auto', padding:'2rem 2rem' }}>
          {pages[tab]}
        </div>
      </div>
    </div>
  );
}