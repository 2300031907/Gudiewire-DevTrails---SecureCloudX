// Pages.jsx — Coverage, Alerts, GigScore, Payouts, Advisor

import { Card, CardTitle, Badge, ProgressBar, StatBlock, AlertRow, Button, Timestamp } from './layout';

/* ═══════════════════════════════════════════
   PAGE 2: COVERAGE
═══════════════════════════════════════════ */
function ShieldCard({ icon, name, status, weekly, remaining, pct, color }) {
  return (
    <div style={{ background: 'var(--glass)', border: `1px solid ${status === 'ACTIVE' ? color + '33' : 'var(--border)'}`, borderRadius: 16, padding: '1.1rem', transition: 'all .2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{icon}</div>
          <div>
            <div style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--text1)' }}>{name}</div>
            <div style={{ fontSize: '.62rem', color: 'var(--text3)' }}>Parametric trigger</div>
          </div>
        </div>
        <Badge type={status === 'ACTIVE' ? 'green' : 'red'} pulse={status === 'ACTIVE'}>{status}</Badge>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginBottom: '.6rem' }}>
        <div style={{ padding: '.4rem .55rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
          <div style={{ fontSize: '.58rem', color: 'var(--text3)', marginBottom: 2 }}>Weekly Limit</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '.88rem', fontWeight: 700, color: 'var(--text1)' }}>{weekly}</div>
        </div>
        <div style={{ padding: '.4rem .55rem', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
          <div style={{ fontSize: '.58rem', color: 'var(--text3)', marginBottom: 2 }}>Remaining</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '.88rem', fontWeight: 700, color }}{...{}}>{remaining}</div>
        </div>
      </div>
      <ProgressBar pct={pct} color={color} height={5} />
    </div>
  );
}

export function PageCoverage() {
  return (
    <div className="zs-page">
      <div className="zs-page-header">
        <div className="zs-page-title">Coverage</div>
        <div className="zs-page-sub">Your parametric insurance protection details · Standard Shield Active</div>
      </div>

      {/* Active plan banner */}
      <Card delay={1} style={{ marginBottom: '1rem', background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(34,211,238,0.05) 100%)', borderColor: 'rgba(59,130,246,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.4rem' }}>
              <span style={{ fontSize: '1.4rem' }}>🛡️</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text1)' }}>Standard Shield Plan</div>
              <Badge type="green" pulse>ACTIVE</Badge>
            </div>
            <div style={{ fontSize: '.78rem', color: 'var(--text2)', lineHeight: 1.6 }}>
              Policy ZS-542-1289 · Renews Sunday 11:59 PM · 75% payout ratio
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '2rem', fontWeight: 800, color: 'var(--text1)', lineHeight: 1 }}>₹7,500</div>
            <div style={{ fontSize: '.7rem', color: 'var(--text3)' }}>/week coverage cap</div>
            <Button variant="primary" size="sm" style={{ marginTop: '.65rem' }}>Upgrade to Premium →</Button>
          </div>
        </div>
      </Card>

      {/* Shield grid */}
      <div style={{ marginBottom: '.65rem', fontSize: '.72rem', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Active Shields</div>
      <div className="grid-2" style={{ marginBottom: '1rem' }}>
        <ShieldCard icon="🌧️" name="Rain Shield" status="ACTIVE" weekly="₹3,500" remaining="₹2,800" pct={80} color="#3b82f6" />
        <ShieldCard icon="🌡️" name="Heat Shield" status="ACTIVE" weekly="₹2,000" remaining="₹1,400" pct={70} color="#f59e0b" />
        <ShieldCard icon="😷" name="Pollution Shield" status="ACTIVE" weekly="₹1,500" remaining="₹1,200" pct={80} color="#8b5cf6" />
        <ShieldCard icon="⚡" name="Storm Shield" status="ACTIVE" weekly="₹2,000" remaining="₹500" pct={25} color="#ef4444" />
      </div>

      {/* Summary row */}
      <div className="grid-4" style={{ marginBottom: '1rem' }}>
        {[
          { v: '₹3,200', l: 'Remaining This Week', c: 'var(--green2)' },
          { v: '₹4,300', l: 'Used This Week', c: 'var(--orange)' },
          { v: 'Sunday', l: 'Next Renewal', c: 'var(--blue2)' },
          { v: '₹56/wk', l: 'Your Premium', c: 'var(--cyan)' },
        ].map((s, i) => (
          <Card key={i} delay={i + 1}>
            <Timestamp text="Updated 5 min ago" />
            <div style={{ marginTop: '.5rem' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '1.3rem', fontWeight: 700, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: '.65rem', color: 'var(--text3)', marginTop: 3 }}>{s.l}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pricing table */}
      <Card delay={1}>
        <CardTitle icon="💳">Plan Comparison · Upgrade Coverage</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { name: 'Basic Shield', price: '₹19', cap: '₹800/wk', ratio: '60%', best: false },
            { name: 'Standard Shield', price: '₹56', cap: '₹7,500/wk', ratio: '75%', best: true },
            { name: 'Premium Shield', price: '₹79', cap: '₹3,500/wk', ratio: '90%', best: false },
          ].map((p, i) => (
            <div key={i} style={{ padding: '1rem', background: p.best ? 'rgba(59,130,246,0.08)' : 'var(--glass)', border: `1.5px solid ${p.best ? 'rgba(59,130,246,0.3)' : 'var(--border)'}`, borderRadius: 14, position: 'relative' }}>
              {p.best && <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: 'var(--blue)', color: '#fff', fontSize: '.58rem', fontWeight: 700, padding: '2px 10px', borderRadius: 10 }}>CURRENT PLAN</div>}
              <div style={{ fontWeight: 700, fontSize: '.88rem', marginBottom: '.4rem' }}>{p.name}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--blue2)', marginBottom: '.65rem' }}>{p.price}<span style={{ fontSize: '.7rem', color: 'var(--text3)', fontFamily: 'var(--font)' }}>/week</span></div>
              {[['Cap', p.cap], ['Payout Ratio', p.ratio], ['UPI Speed', '< 5 min']].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.7rem', color: 'var(--text2)', padding: '.3rem 0', borderTop: '1px solid var(--border)' }}>
                  {l} <strong style={{ color: 'var(--text1)' }}>{v}</strong>
                </div>
              ))}
              <Button variant={p.best ? 'ghost' : 'primary'} size="sm" style={{ width: '100%', marginTop: '.75rem' }}>
                {p.best ? 'Current Plan' : 'Switch →'}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE 3: ALERTS
═══════════════════════════════════════════ */
export function PageAlerts() {
  return (
    <div className="zs-page">
      <div className="zs-page-header">
        <div className="zs-page-title">Alerts</div>
        <div className="zs-page-sub">Disruption alerts affecting your earnings · 3 active triggers</div>
      </div>

      {/* Stats row */}
      <div className="grid-4" style={{ marginBottom: '1rem' }}>
        {[['3','Active Now','var(--red)'],['2','Payouts Triggered','var(--green2)'],['5','Today Total','var(--orange)'],['12','This Week','var(--blue2)']].map(([v,l,c],i)=>(
          <Card key={i} delay={i+1}>
            <Timestamp text="Live" />
            <div style={{ marginTop:'.5rem', fontFamily:'var(--mono)', fontSize:'1.5rem', fontWeight:700, color:c }}>{v}</div>
            <div style={{ fontSize:'.65rem', color:'var(--text3)', marginTop:3 }}>{l}</div>
          </Card>
        ))}
      </div>

      {/* High priority */}
      <Card delay={1} style={{ marginBottom: '1rem', borderColor: 'rgba(239,68,68,0.2)' }}>
        <CardTitle icon="🚨" action={<Badge type="red" pulse>HIGH PRIORITY</Badge>}>High Priority — Immediate Action Required</CardTitle>
        <AlertRow icon="⚠️" title="Storm Warning — Rain Trigger FIRED" sub="Rainfall 16.2mm/hr exceeds 15mm/hr threshold · Auto-claim initiated · ₹900 payout processing" time="6:04 PM" priority="high" />
        <AlertRow icon="🌊" title="Flash Flood Alert — Main Road Blocked" sub="Kondapur main road flooded · Zone access restricted · Order drop 90%" time="5:48 PM" priority="high" />
      </Card>

      {/* Medium priority */}
      <Card delay={2} style={{ marginBottom: '1rem', borderColor: 'rgba(245,158,11,0.15)' }}>
        <CardTitle icon="⚠️" action={<Badge type="orange">MEDIUM PRIORITY</Badge>}>Medium Priority — Monitor Closely</CardTitle>
        <AlertRow icon="🌡️" title="Heatwave Advisory — 43°C Heat Index" sub="Heat index exceeds 42°C · Partial payout ₹320 triggered · Avoid riding 1–4 PM" time="2:30 PM" priority="medium" />
        <AlertRow icon="😷" title="Air Quality Alert — AQI 320 Hazardous" sub="WAQI API confirms AQI 320 · N95 mask recommended · Health payout ₹280 processing" time="11:00 AM" priority="medium" />
        <AlertRow icon="🚦" title="Traffic Disruption — Route 47 Closed" sub="Road closure near zone perimeter · Alternate route available · ETA impact +8 min" time="10:15 AM" priority="medium" />
      </Card>

      {/* Low priority */}
      <Card delay={3} style={{ borderColor: 'rgba(59,130,246,0.12)' }}>
        <CardTitle icon="ℹ️" action={<Badge type="blue">LOW PRIORITY</Badge>}>Low Priority — Informational</CardTitle>
        <AlertRow icon="🌥️" title="Cloud Cover — Reduced Solar Exposure" sub="Overcast conditions expected · No delivery impact · Comfortable riding temperature" time="9:00 AM" priority="low" />
        <AlertRow icon="📡" title="Platform API — Zepto Minor Latency" sub="Order assignment delay ~2 min · Back to normal in 20 min" time="8:30 AM" priority="low" />
        <AlertRow icon="💨" title="Wind Advisory — 30km/h Gusts" sub="Strong winds in outer zone · Standard riding precautions advised" time="7:00 AM" priority="low" />
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE 4: GIGSCORE
═══════════════════════════════════════════ */
function BigRing({ score = 720 }) {
  const r = 80, cx = 96, cy = 96, circ = 2 * Math.PI * r, fill = (score / 900) * circ;
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 192 192" style={{ width: 180, height: 180 }}>
        <defs>
          <linearGradient id="gr2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6"/><stop offset="50%" stopColor="#22d3ee"/><stop offset="100%" stopColor="#10b981"/>
          </linearGradient>
        </defs>
        {[60, 70, 80].map((ri, i) => (
          <circle key={i} cx={cx} cy={cy} r={ri} fill="none" stroke={`rgba(59,130,246,${0.04 + i * 0.02})`} strokeWidth="1" strokeDasharray="3 6"/>
        ))}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(59,130,246,0.08)" strokeWidth="12"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#gr2)" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={`${fill} ${circ}`} strokeDashoffset={circ / 4}
          style={{ filter: 'drop-shadow(0 0 12px rgba(34,211,238,0.5))' }}/>
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '2.2rem', fontWeight: 800, color: '#10b981', lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: '.65rem', color: 'var(--text3)', marginTop: 3 }}>/ 900</div>
        <Badge type="blue" style={{ marginTop: 6 }}>700–849 Tier</Badge>
      </div>
    </div>
  );
}

function HoursChart() {
  const hrs = [0,0,0,0,0,1,3,5,8,7,6,4,3,2,1,0,4,8,9,7,5,3,2,1];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 70 }}>
        {hrs.map((h, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{ width: '100%', height: `${(h / 9) * 60}px`, borderRadius: 3, background: h > 7 ? 'rgba(16,185,129,0.6)' : h > 4 ? 'rgba(59,130,246,0.45)' : 'rgba(59,130,246,0.2)', minHeight: 3 }}/>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.55rem', color: 'var(--text3)', marginTop: 4 }}>
        <span>12a</span><span>6a</span><span>12p</span><span>6p</span><span>11p</span>
      </div>
    </div>
  );
}

export function PageGigScore({ userData }) {
  return (
    <div className="zs-page">
      <div className="zs-page-header">
        <div className="zs-page-title">GigScore</div>
        <div className="zs-page-sub">Your delivery partner stability score · Modeled on credit scoring · Scale 300–900</div>
      </div>

      <div className="grid-13" style={{ marginBottom: '1rem' }}>
        {/* Big ring */}
        <Card delay={1}>
          <CardTitle icon="🏆" timestamp="Updated Sunday midnight">GigScore Circular Meter</CardTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <BigRing score={720} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '.72rem', color: 'var(--text2)', marginBottom: '.75rem', lineHeight: 1.6 }}>
                Score <strong style={{color:'var(--blue2)'}}>720</strong> places you in the <strong style={{color:'var(--blue2)'}}>700–849 tier</strong>. 
                You receive 10% premium discount, priority claim processing, and microloan eligibility (₹2k–10k).
              </div>
              <div style={{ padding: '.65rem .85rem', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 12, fontSize: '.72rem', color: '#a78bfa', lineHeight: 1.6 }}>
                💡 <strong>AI Suggestion:</strong> Improve score by working after 5PM today. Consistent evening shifts in the next 3 days will push you to 750+.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginTop: '.75rem' }}>
                {[['300–499','Standard pricing'],['500–699','5% discount'],['700–849','10% + priority','active'],['850–900','15% + microloan']].map(([r,b,a])=>(
                  <div key={r} style={{ padding: '.45rem .65rem', background: a ? 'rgba(59,130,246,0.1)' : 'var(--glass)', border: `1px solid ${a ? 'rgba(59,130,246,0.3)' : 'var(--border)'}`, borderRadius: 9 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', fontWeight: 700, color: a ? 'var(--blue2)' : 'var(--text2)' }}>{r}</div>
                    <div style={{ fontSize: '.6rem', color: 'var(--text3)', marginTop: 2 }}>{b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Breakdown */}
        <Card delay={2}>
          <CardTitle icon="📋">Score Breakdown</CardTitle>
          {[
            { label: 'Claim Accuracy', val: 98, score: 195, max: 200, c: '#10b981' },
            { label: 'Platform Tenure', val: 94, score: 188, max: 200, c: '#3b82f6' },
            { label: 'Shift Regularity', val: 88, score: 176, max: 200, c: '#22d3ee' },
            { label: 'Zone Adherence', val: 96, score: 96, max: 100, c: '#f59e0b' },
            { label: 'Peer Review', val: 78, score: 65, max: 200, c: '#8b5cf6' },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: '.65rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', color: 'var(--text2)', marginBottom: '.3rem' }}>
                <span>{s.label}</span>
                <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: s.c }}>{s.score}/{s.max}</span>
              </div>
              <ProgressBar pct={(s.score / s.max) * 100} color={s.c} height={5} />
            </div>
          ))}
        </Card>
      </div>

      <div className="grid-3">
        {/* Hours chart */}
        <Card delay={1}>
          <CardTitle icon="⏰" timestamp="Last 7 days average">Working Hours Pattern</CardTitle>
          <HoursChart />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginTop: '.75rem' }}>
            <div style={{ padding: '.5rem .65rem', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 10 }}>
              <div style={{ fontSize: '.6rem', color: 'var(--text3)' }}>Peak Hours</div>
              <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: '#10b981', fontSize: '.82rem' }}>6PM–10PM</div>
            </div>
            <div style={{ padding: '.5rem .65rem', background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 10 }}>
              <div style={{ fontSize: '.6rem', color: 'var(--text3)' }}>Avg Daily Hrs</div>
              <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--blue2)', fontSize: '.82rem' }}>8.4 hrs</div>
            </div>
          </div>
        </Card>

        {/* Zone usage */}
        <Card delay={2}>
          <CardTitle icon="📍">Zone Usage Analysis</CardTitle>
          {[
            { label: 'Safe Zone Usage', pct: 82, c: '#10b981' },
            { label: 'Risk Zone Exposure', pct: 18, c: '#ef4444' },
            { label: 'Core Zone Adherence', pct: 94, c: '#3b82f6' },
          ].map((z, i) => (
            <div key={i} style={{ marginBottom: '.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', color: 'var(--text2)', marginBottom: '.3rem' }}>
                <span>{z.label}</span>
                <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: z.c }}>{z.pct}%</span>
              </div>
              <ProgressBar pct={z.pct} color={z.c} />
            </div>
          ))}
          <div style={{ padding: '.6rem .75rem', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 10, fontSize: '.7rem', color: '#f59e0b', lineHeight: 1.5, marginTop: '.25rem' }}>
            ⚠️ Risk zone visits dropped by <strong>23%</strong> vs last week. Keep it up!
          </div>
        </Card>

        {/* Optimization suggestions */}
        <Card delay={3}>
          <CardTitle icon="💡">Coverage Optimization</CardTitle>
          {[
            { icon:'⏰', tip:'Work 6–10 PM today', detail:'+12 GigScore points', c:'#10b981' },
            { icon:'📍', tip:'Stay in core zone', detail:'+8 zone adherence pts', c:'#3b82f6' },
            { icon:'✅', tip:'Accept next 5 orders', detail:'+5 claim accuracy pts', c:'#22d3ee' },
            { icon:'🛡️', tip:'File rain claim today', detail:'Validates your claim history', c:'#f59e0b' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.65rem', padding: '.55rem .65rem', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 10, marginBottom: '.4rem' }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text1)' }}>{s.tip}</div>
                <div style={{ fontSize: '.62rem', color: s.c, marginTop: 1 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE 5: PAYOUTS
═══════════════════════════════════════════ */
function RainChart() {
  const data = [8, 10, 12, 14, 16, 18, 15, 13, 11, 9, 7, 5];
  const threshold = 15;
  const hours = ['1p','2p','3p','4p','5p','6p','7p','8p','9p','10p','11p','12a'];
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80, position: 'relative' }}>
        {/* Threshold line */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: `${(threshold / 20) * 80}px`, borderTop: '1.5px dashed rgba(239,68,68,0.6)', zIndex: 1 }}>
          <span style={{ position: 'absolute', right: 0, top: -10, fontSize: '.58rem', color: '#ef4444', fontFamily: 'var(--mono)', fontWeight: 700 }}>Trigger: 15mm</span>
        </div>
        {data.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <div style={{ width: '100%', height: `${(v / 20) * 76}px`, borderRadius: 4, background: v >= threshold ? 'rgba(239,68,68,0.65)' : 'rgba(59,130,246,0.4)', transition: 'height .3s' }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.58rem', color: 'var(--text3)', marginTop: 5 }}>
        {hours.map(h => <span key={h}>{h}</span>)}
      </div>
    </div>
  );
}

export function PagePayouts() {
  return (
    <div className="zs-page">
      <div className="zs-page-header">
        <div className="zs-page-title">Payouts</div>
        <div className="zs-page-sub">Automatic parametric insurance payouts · All via UPI in under 5 minutes</div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: '1rem' }}>
        {[['₹2,380','Total Payouts This Week','var(--green2)'],['2','Claims Triggered','var(--blue2)'],['< 4 min','Average Payout Speed','var(--cyan)'],['₹3,200','Coverage Remaining','var(--orange)']].map(([v,l,c],i)=>(
          <Card key={i} delay={i+1}>
            <Timestamp text="Updated 5 min ago" />
            <div style={{ marginTop: '.5rem', fontFamily: 'var(--mono)', fontSize: '1.4rem', fontWeight: 700, color: c }}>{v}</div>
            <div style={{ fontSize: '.65rem', color: 'var(--text3)', marginTop: 3 }}>{l}</div>
          </Card>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: '1rem' }}>
        {/* Triggered payout card */}
        <Card delay={1} style={{ borderColor: 'rgba(16,185,129,0.25)', background: 'linear-gradient(135deg, rgba(16,185,129,0.06) 0%, var(--glass) 100%)' }}>
          <CardTitle icon="⚡" action={<Badge type="green" pulse>PAID</Badge>}>Latest Triggered Payout</CardTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>💰</div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '1.8rem', fontWeight: 800, color: '#10b981', lineHeight: 1 }}>₹900</div>
              <div style={{ fontSize: '.7rem', color: 'var(--text2)', marginTop: 3 }}>Rain Shield · Credited via UPI · 3m 42s</div>
            </div>
          </div>
          {[['Trigger','Heavy Rain — 16.2mm/hr'],['Threshold','15mm/hr'],['Coverage Ratio','75%'],['Payout Time','3 min 42 sec'],['UPI Ref','ZS202401231842']].map(([l,v])=>(
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '.4rem 0', borderTop: '1px solid var(--border)', fontSize: '.72rem', color: 'var(--text2)' }}>
              {l} <span style={{ fontWeight: 600, color: 'var(--text1)', fontFamily: l === 'UPI Ref' ? 'var(--mono)' : 'var(--font)' }}>{v}</span>
            </div>
          ))}
        </Card>

        {/* Rain threshold chart */}
        <Card delay={2}>
          <CardTitle icon="🌧️" timestamp="Live weather data">Rain Threshold vs Actual</CardTitle>
          <div style={{ padding: '.6rem .75rem', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10, marginBottom: '.75rem', fontSize: '.72rem' }}>
            ⚡ Actual rain <strong style={{ color: '#ef4444' }}>16.2mm/hr</strong> exceeds threshold <strong style={{ color: '#f59e0b' }}>15mm/hr</strong> — Payout triggered successfully
          </div>
          <RainChart />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.5rem', marginTop: '.75rem' }}>
            {[['Rain Threshold','15mm/hr','#f59e0b'],['Actual Rain','16.2mm/hr','#ef4444'],['Status','Triggered','#10b981']].map(([l,v,c])=>(
              <div key={l} style={{ padding: '.5rem', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 9, textAlign: 'center' }}>
                <div style={{ fontSize: '.58rem', color: 'var(--text3)', marginBottom: 3 }}>{l}</div>
                <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: c, fontSize: '.78rem' }}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Claim history table */}
      <Card delay={1}>
        <CardTitle icon="📋">Claim History</CardTitle>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.75rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Claim ID','Date','Trigger','Amount','Speed','Status'].map(h => (
                  <th key={h} style={{ padding: '.55rem .75rem', textAlign: 'left', color: 'var(--text3)', fontWeight: 600, fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['ZS-CL-004','23 Jan 2025','Heavy Rain 16.2mm','₹900','3m 42s','Paid'],
                ['ZS-CL-003','20 Jan 2025','Heatwave 43°C','₹320','2m 15s','Paid'],
                ['ZS-CL-002','15 Jan 2025','AQI 325 Hazardous','₹280','4m 02s','Paid'],
                ['ZS-CL-001','8 Jan 2025','Storm Warning','₹900','3m 55s','Paid'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: 'background .18s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: '.65rem .75rem', color: j === 0 ? 'var(--text3)' : j === 3 ? '#10b981' : j === 5 ? '#10b981' : 'var(--text1)', fontFamily: j === 0 ? 'var(--mono)' : 'var(--font)', fontWeight: j === 3 ? 700 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE 6: ADVISOR
═══════════════════════════════════════════ */
function Timeline() {
  const hours = [
    { h: '6a', risk: 'low', order: 3 }, { h: '7a', risk: 'low', order: 5 },
    { h: '8a', risk: 'med', order: 7 }, { h: '9a', risk: 'med', order: 6 },
    { h: '10a', risk: 'med', order: 5 }, { h: '11a', risk: 'high', order: 3 },
    { h: '12p', risk: 'high', order: 2 }, { h: '1p', risk: 'high', order: 2 },
    { h: '2p', risk: 'high', order: 1 }, { h: '3p', risk: 'crit', order: 1 },
    { h: '4p', risk: 'crit', order: 0 }, { h: '5p', risk: 'high', order: 2 },
    { h: '6p', risk: 'med', order: 6 },  { h: '7p', risk: 'low', order: 9 },
    { h: '8p', risk: 'low', order: 10 }, { h: '9p', risk: 'low', order: 9 },
    { h: '10p', risk: 'med', order: 6 }, { h: '11p', risk: 'med', order: 4 },
  ];
  const riskColor = { low: '#10b981', med: '#f59e0b', high: '#f97316', crit: '#ef4444' };
  const riskLabel = { low: 'Safe', med: 'Caution', high: 'Risky', crit: 'Avoid' };
  return (
    <div>
      <div style={{ display: 'flex', gap: 4, marginBottom: '.5rem' }}>
        {hours.map((h, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
            <div style={{ width: '100%', height: 32, borderRadius: 6, background: riskColor[h.risk] + '35', border: `1px solid ${riskColor[h.risk]}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.5rem', color: riskColor[h.risk], fontWeight: 700 }}>
              {h.order > 0 ? h.order : '—'}
            </div>
            <div style={{ fontSize: '.45rem', color: 'var(--text3)' }}>{h.h}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '.75rem', marginTop: '.4rem' }}>
        {Object.entries(riskColor).map(([r, c]) => (
          <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '.6rem', color: 'var(--text3)' }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />{riskLabel[r]}
          </div>
        ))}
        <div style={{ fontSize: '.6rem', color: 'var(--text3)', marginLeft: 'auto' }}>Numbers = estimated order count</div>
      </div>
    </div>
  );
}

export function PageAdvisor({ userData }) {
  return (
    <div className="zs-page">
      <div className="zs-page-header">
        <div className="zs-page-title">AI Advisor 🤖</div>
        <div className="zs-page-sub">Personalized shift planning recommendations · Updated every Sunday · AI model: XGBoost + Prophet</div>
      </div>

      {/* Recommended shift */}
      <Card delay={1} style={{ marginBottom: '1rem', background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(34,211,238,0.04) 100%)', borderColor: 'rgba(16,185,129,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '.4rem' }}>
              <span style={{ fontSize: '1.5rem' }}>⭐</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text1)' }}>Recommended Shift Window Today</div>
              <Badge type="green" pulse>AI RECOMMENDED</Badge>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>6:00 PM – 10:00 PM</div>
            <div style={{ fontSize: '.78rem', color: 'var(--text2)', marginTop: '.3rem', maxWidth: 500, lineHeight: 1.6 }}>
              <strong>Reason:</strong> Heavy rainfall expected earlier in the day (3–5 PM). Evening window has 94% order success rate and lower disruption probability. GigScore impact: +12 points.
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '.65rem', color: 'var(--text3)', marginBottom: '.35rem' }}>Estimated Earnings</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '1.4rem', fontWeight: 700, color: '#10b981' }}>₹1,200</div>
            <div style={{ fontSize: '.65rem', color: 'var(--text3)', marginTop: 3 }}>4-hour window · 8–12 deliveries</div>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <Card delay={2} style={{ marginBottom: '1rem' }}>
        <CardTitle icon="⏰" timestamp="AI forecast · Updated 10 min ago">Risk Timeline — Today's Hourly Risk & Order Density</CardTitle>
        <Timeline />
        <div style={{ marginTop: '1rem', padding: '.65rem .85rem', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10, fontSize: '.72rem', color: '#ef4444' }}>
          🚫 <strong>Avoid 3 PM – 5 PM</strong> — High rainfall probability + low order density. Rain trigger likely to fire. Stay home and stay safe.
        </div>
      </Card>

      <div className="grid-3" style={{ marginBottom: '1rem' }}>
        {/* Weather forecast */}
        <Card delay={1}>
          <CardTitle icon="🌤️" timestamp="OpenWeatherMap · 5 min ago">Weather Forecast Risk</CardTitle>
          {[
            { time: '6–9 AM', cond: 'Partly cloudy', risk: 'Low', icon: '⛅', c: '#10b981' },
            { time: '9AM–12PM', cond: 'Overcast + humidity', risk: 'Medium', icon: '☁️', c: '#f59e0b' },
            { time: '12–3 PM', cond: 'Heavy rain building', risk: 'High', icon: '🌧️', c: '#f97316' },
            { time: '3–6 PM', cond: 'Extreme rain · Flood risk', risk: 'Critical', icon: '⛈️', c: '#ef4444' },
            { time: '6–10 PM', cond: 'Clearing · Safe window', risk: 'Low', icon: '🌦️', c: '#10b981' },
            { time: '10PM+', cond: 'Light drizzle', risk: 'Low-Med', icon: '🌂', c: '#f59e0b' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.65rem', padding: '.45rem .65rem', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 9, marginBottom: '.35rem' }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{f.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text1)' }}>{f.time}</div>
                <div style={{ fontSize: '.6rem', color: 'var(--text2)', marginTop: 1 }}>{f.cond}</div>
              </div>
              <Badge type={f.risk === 'Low' ? 'green' : f.risk === 'Medium' ? 'orange' : f.risk === 'Critical' ? 'red' : 'orange'}>{f.risk}</Badge>
            </div>
          ))}
        </Card>

        {/* Safe zones */}
        <Card delay={2}>
          <CardTitle icon="📍">Safe Delivery Zones</CardTitle>
          {[
            { zone: 'Kondapur Core', status: 'Safe', orders: '8–12/hr', icon: '🟢' },
            { zone: 'Madhapur B-zone', status: 'Moderate', orders: '4–6/hr', icon: '🟡' },
            { zone: 'HITEC City North', status: 'Safe', orders: '6–9/hr', icon: '🟢' },
            { zone: 'Kondapur Outer', status: 'Risky', orders: '1–2/hr', icon: '🔴' },
            { zone: 'Gachibowli', status: 'Safe', orders: '5–8/hr', icon: '🟢' },
          ].map((z, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.65rem', padding: '.5rem .65rem', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 10, marginBottom: '.4rem' }}>
              <span style={{ fontSize: '1rem' }}>{z.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--text1)' }}>{z.zone}</div>
                <div style={{ fontSize: '.62rem', color: 'var(--text2)', marginTop: 1 }}>{z.orders} estimated</div>
              </div>
              <Badge type={z.status === 'Safe' ? 'green' : z.status === 'Risky' ? 'red' : 'orange'}>{z.status}</Badge>
            </div>
          ))}
        </Card>

        {/* Coverage optimization */}
        <Card delay={3}>
          <CardTitle icon="💡">Coverage Optimization</CardTitle>
          <div style={{ padding: '.75rem', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 12, marginBottom: '.75rem' }}>
            <div style={{ fontSize: '.7rem', fontWeight: 700, color: '#a78bfa', marginBottom: '.35rem' }}>🤖 AI Insight</div>
            <div style={{ fontSize: '.72rem', color: 'var(--text2)', lineHeight: 1.65 }}>
              This monsoon season your disruption probability is <strong style={{color:'var(--text1)'}}>38% higher</strong> than last year. Upgrading to Premium Shield adds ₹23/week but increases payout ratio from 75% to 90%.
            </div>
          </div>
          {[
            { icon:'⬆️', tip:'Upgrade to Premium Shield', impact:'₹+270 protection/wk', c:'#8b5cf6' },
            { icon:'⏰', tip:'Work 6–10 PM consistently', impact:'+12 GigScore pts', c:'#10b981' },
            { icon:'📍', tip:'Avoid outer ring zones', impact:'−23% risk exposure', c:'#3b82f6' },
            { icon:'📱', tip:'Enable emergency contact', impact:'Auto-alert during curfew', c:'#f59e0b' },
            { icon:'🏦', tip:'Link UPI for instant pay', impact:'Reduce payout to < 2 min', c:'#22d3ee' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', padding: '.5rem .65rem', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: 10, marginBottom: '.38rem' }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '.72rem', fontWeight: 600, color: 'var(--text1)' }}>{s.tip}</div>
                <div style={{ fontSize: '.6rem', color: s.c, marginTop: 1 }}>{s.impact}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}