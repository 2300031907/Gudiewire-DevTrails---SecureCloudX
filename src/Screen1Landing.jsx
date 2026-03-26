// Screen1Landing.jsx
// State A: Open preview dashboard (Image 1) — widgets visible with demo data
// State B: Modal overlay (Image 2) — same dashboard dimmed, centered modal with X to close

import { useState } from 'react';

/* ══════════════════════════════════════════════
   SHARED MINI-COMPONENTS
══════════════════════════════════════════════ */

function GaugeMini({ label = 'MEDIUM', pct = 0.55 }) {
  const cx = 88, cy = 88, r = 70;
  const segs = [
    { color: '#10b981', a1: -178, a2: -137 },
    { color: '#fbbf24', a1: -134, a2: -93 },
    { color: '#f59e0b', a1: -90,  a2: -49 },
    { color: '#ef4444', a1: -46,  a2: -5  },
  ];
  const pt = a => ({ x: cx + r * Math.cos(a * Math.PI / 180), y: cy + r * Math.sin(a * Math.PI / 180) });
  const arc = (a1, a2) => { const s = pt(a1), e = pt(a2); return `M ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y}`; };
  const na = (-178 + pct * 173) * Math.PI / 180;
  const nx = cx + 56 * Math.cos(na), ny = cy + 56 * Math.sin(na);
  return (
    <svg viewBox="0 0 176 100" style={{ width: '100%', height: 90 }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {segs.map((s, i) => (
        <path key={i} d={arc(s.a1, s.a2)} fill="none"
          stroke={s.color} strokeWidth="11" strokeLinecap="round"
          opacity={i === 1 ? 1 : 0.45} />
      ))}
      {/* Needle glow */}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="rgba(240,246,255,0.15)" strokeWidth="6" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="rgba(240,246,255,0.9)" strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)" />
      <circle cx={cx} cy={cy} r="5.5" fill="rgba(240,246,255,0.9)" />
      <circle cx={cx} cy={cy} r="2.5" fill="#0c1528" />
      {/* Label arc text area */}
      <text x={cx + 18} y={cy - 22} textAnchor="middle"
        fill="#f59e0b" fontSize="8.5" fontFamily="Sora,sans-serif" fontWeight="800" letterSpacing="1">
        {label}
      </text>
    </svg>
  );
}

function RingScore({ score = 72 }) {
  const r = 52, cx = 68, cy = 68, circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 136 136" style={{ width: 130, height: 130 }}>
        <defs>
          <linearGradient id="rg-score" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(59,130,246,0.1)" strokeWidth="10" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#rg-score)" strokeWidth="10"
          strokeLinecap="round" strokeDasharray={`${fill} ${circ}`} strokeDashoffset={circ / 4}
          style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.45))' }} />
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '2rem', fontWeight: 700, color: '#f0f6ff', lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: '.62rem', color: 'rgba(240,246,255,0.45)', marginTop: 3, fontFamily: 'Sora, sans-serif' }}>Stability Score</div>
      </div>
    </div>
  );
}

function HeatmapCard() {
  return (
    <div style={{ width: '100%', height: 150, borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 340 150" preserveAspectRatio="none">
        <defs>
          <radialGradient id="hm1" cx="52%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity=".95" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity=".5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hm2" cx="68%" cy="42%" r="28%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity=".7" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="340" height="150" fill="#0c1c2e" />
        {/* Grid pattern */}
        {[34,68,102,136,170,204,238,272,306].map(x => <line key={x} x1={x} y1="0" x2={x} y2="150" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
        {[30,60,90,120].map(y => <line key={y} x1="0" y1={y} x2="340" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
        {/* Roads */}
        <path d="M0 75 Q85 48 170 75 Q255 102 340 75" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
        <path d="M170 0 Q185 75 170 150" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
        {/* Heat zones */}
        <rect width="340" height="150" fill="url(#hm1)" />
        <rect width="340" height="150" fill="url(#hm2)" />
        {/* Active zone blocks */}
        {[[155,62,22,18],[175,75,18,15],[138,75,16,14],[165,55,14,12]].map(([x,y,w,h],i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="3"
            fill={`rgba(249,115,22,${0.35 + i * 0.1})`} stroke="rgba(251,191,36,0.3)" strokeWidth=".5" />
        ))}
        {/* Rider dots */}
        {[[168,70],[148,80],[182,62],[140,90]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#22d3ee" opacity=".85"
            style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }} />
        ))}
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CARD WRAPPER
══════════════════════════════════════════════ */
function Card({ children, style = {}, locked = false }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.035)',
      border: `1px solid rgba(99,160,255,${locked ? '0.08' : '0.13'})`,
      borderRadius: 18,
      padding: '1.25rem',
      backdropFilter: 'blur(12px)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'border-color .2s',
      ...style,
    }}>
      {children}
    </div>
  );
}

function CardTitle({ icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: '.75rem' }}>
      {icon && <span style={{ fontSize: '.95rem', opacity: .65 }}>{icon}</span>}
      <span style={{ fontSize: '.82rem', fontWeight: 600, color: 'rgba(240,246,255,0.75)', fontFamily: 'Sora, sans-serif' }}>{children}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════
   LOCKED WIDGET (Image 2 state)
══════════════════════════════════════════════ */
function LockedWidget({ title, icon, children, style = {} }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(99,160,255,0.07)',
      borderRadius: 18,
      overflow: 'hidden',
      position: 'relative',
      ...style,
    }}>
      <div style={{ padding: '1rem 1.25rem .5rem', display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: '.85rem', opacity: .4 }}>🔒</span>
        <span style={{ fontSize: '.78rem', fontWeight: 600, color: 'rgba(240,246,255,0.35)', fontFamily: 'Sora, sans-serif' }}>{title}</span>
      </div>
      <div style={{ padding: '0 1.25rem', filter: 'blur(4px)', opacity: .25, pointerEvents: 'none' }}>
        {children}
      </div>
      <div style={{
        padding: '.5rem 1.25rem .9rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
        fontSize: '.68rem', color: 'rgba(240,246,255,0.25)', fontFamily: 'Sora, sans-serif',
        marginTop: '.25rem',
      }}>
        🔒 Login required
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function Screen1Landing({ onGetStarted, onSignIn }) {
  const [showModal, setShowModal] = useState(true); // false = Image 1, true = Image 2

  return (
    <div style={{ minHeight: '100vh', paddingTop: 62, paddingBottom: 64, position: 'relative', fontFamily: 'Sora, sans-serif' }}>

      {/* ═══ TOP NAV ═══ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: 62,
        background: 'rgba(5,10,20,0.88)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(99,160,255,0.1)',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', boxShadow: '0 0 18px rgba(59,130,246,0.4)',
          }}>🛡️</div>
          <span style={{
            fontSize: '1.05rem', fontWeight: 800, letterSpacing: '.05em',
            background: 'linear-gradient(90deg, #f0f6ff, #22d3ee)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>ZEROSHIELD</span>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 2 }}>
          {['Coverage', 'Alerts', 'GigScore', 'Pricing'].map((l, i) => (
            <a key={l} href="#" style={{
              padding: '.42rem 1.05rem',
              fontSize: '.84rem', fontWeight: 500, textDecoration: 'none',
              color: i === 0 ? '#f0f6ff' : 'rgba(240,246,255,0.5)',
              borderBottom: i === 0 ? '2px solid #3b82f6' : '2px solid transparent',
              borderRadius: i === 0 ? '8px 8px 0 0' : '8px',
              transition: 'all .18s',
            }}
            onMouseEnter={e => { if (i !== 0) e.currentTarget.style.color = '#f0f6ff'; }}
            onMouseLeave={e => { if (i !== 0) e.currentTarget.style.color = 'rgba(240,246,255,0.5)'; }}>
              {l}
            </a>
          ))}
        </div>

        {/* Sign In button */}
        <button onClick={onSignIn} style={{
          display: 'flex', alignItems: 'center', gap: 9,
          padding: '.6rem 1.6rem',
          background: 'rgba(255,255,255,0.06)',
          border: '1.5px solid rgba(240,246,255,0.22)',
          borderRadius: 50, cursor: 'pointer',
          fontSize: '.88rem', fontWeight: 700,
          color: '#f0f6ff', fontFamily: 'Sora, sans-serif',
          transition: 'all .2s',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.18)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(240,246,255,0.22)'; }}>
          <span style={{ fontSize: '1rem' }}>👤</span>
          Sign In
        </button>
      </nav>

      {/* ═══ HERO HEADLINE (Image 1 state only) ═══ */}
      {!showModal && (
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 2.5rem 1.25rem' }}>
          <h1 style={{
            fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-.025em', lineHeight: 1.2,
            marginBottom: '.5rem',
          }}>
            <span style={{ background: 'linear-gradient(90deg, #f0f6ff, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AI-powered income
            </span>
            <span style={{ color: 'rgba(240,246,255,0.7)', fontWeight: 400 }}> protection preview for delivery partners</span>
          </h1>
          <p style={{ fontSize: '.88rem', color: 'rgba(240,246,255,0.45)', fontWeight: 400 }}>
            Explore how ZeroShield predicts weather risks and protects your earnings
          </p>
        </div>
      )}

      {/* ═══ DASHBOARD GRID ═══ */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: showModal ? '1.75rem 2.5rem' : '1rem 2.5rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1.35fr 1fr',
        gridTemplateRows: 'auto auto auto',
        gap: '1rem',
        filter: showModal ? 'brightness(0.55) blur(1px)' : 'none',
        transition: 'filter .3s ease',
        pointerEvents: showModal ? 'none' : 'auto',
      }}>

        {/* ── ROW 1 ── */}

        {/* Income Risk Meter */}
        {showModal
          ? <LockedWidget title="Income Risk Meter"><GaugeMini label="MEDIUM" pct={0.55} /></LockedWidget>
          : (
            <Card>
              <CardTitle>Income Risk Meter</CardTitle>
              <GaugeMini label="MEDIUM" pct={0.55} />
              <div style={{ marginTop: '.5rem', fontSize: '.88rem', fontWeight: 600, color: 'rgba(240,246,255,0.8)' }}>
                <span style={{ color: '#f0f6ff', fontWeight: 700 }}>Medium</span> risk today
              </div>
            </Card>
          )
        }

        {/* Weather Disruption */}
        <Card style={{ position: 'relative' }}>
          <CardTitle icon="⛈️">{showModal ? 'Weather Alert' : 'Weather Disruption'}</CardTitle>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '.88rem', color: 'rgba(240,246,255,0.75)', marginBottom: '.4rem', lineHeight: 1.5 }}>
                {showModal ? 'Heavy rain is expected today.' : 'Heavy rain expected\nbetween 4 PM – 8 PM'}
              </div>
              <div style={{ fontSize: '.78rem', color: 'rgba(240,246,255,0.45)' }}>
                Income disruption {showModal ? 'probability' : 'risk'}: Medium{showModal ? '.' : ''}
              </div>
            </div>
            <div style={{ fontSize: '3rem', opacity: .55, flexShrink: 0 }}>🌧️</div>
          </div>
        </Card>

        {/* GigScore */}
        {showModal
          ? <LockedWidget title="GigScore" icon="🏆"><div style={{ padding: '.5rem 0' }}><RingScore score={72} /></div></LockedWidget>
          : (
            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
              <CardTitle>GigScore</CardTitle>
              <RingScore score={72} />
            </Card>
          )
        }

        {/* ── ROW 2 ── */}

        {/* Coverage */}
        {showModal
          ? (
            <Card locked>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '.75rem' }}>
                <span style={{ fontSize: '.8rem', opacity: .4 }}>🔒</span>
                <span style={{ fontSize: '.78rem', fontWeight: 600, color: 'rgba(240,246,255,0.35)' }}>Coverage</span>
              </div>
              <div style={{ fontSize: '.9rem', fontFamily: 'JetBrains Mono, monospace', color: 'rgba(240,246,255,0.25)', marginBottom: '.5rem' }}>
                ₹ XXXX protected this week
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                <div style={{ width: '55%', height: '100%', background: 'rgba(59,130,246,0.3)', borderRadius: 2 }} />
              </div>
            </Card>
          ) : (
            <Card>
              <CardTitle icon="🛡️">Coverage</CardTitle>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.5rem', fontWeight: 700, color: '#f0f6ff', marginBottom: '.25rem' }}>
                ₹ 3,200 <span style={{ fontSize: '.85rem', fontWeight: 400, color: 'rgba(240,246,255,0.5)', fontFamily: 'Sora, sans-serif' }}>protected this week</span>
              </div>
              <div style={{ fontSize: '.72rem', color: 'rgba(240,246,255,0.4)', marginTop: '.35rem' }}>Rookie Partner Level</div>
              <div style={{ marginTop: '.75rem', height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                <div style={{ width: '55%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #22d3ee)', borderRadius: 2 }} />
              </div>
            </Card>
          )
        }

        {/* Delivery Zone Heatmap */}
        <Card>
          <CardTitle icon="📍">Delivery Zone Heatmap</CardTitle>
          <HeatmapCard />
        </Card>

        {/* Alerts */}
        <Card>
          <CardTitle icon="🔔">Alerts</CardTitle>
          {[
            { icon: '🟡', title: 'Storm Warning', time: 'Today 4:00 PM', sub: showModal ? null : 'Heavy rain and flooding expected', dotColor: '#f59e0b', locked: showModal },
            { icon: '⚠️', title: 'Heat Advisory',  time: showModal ? '11:10' : 'Today 2:00 PM', sub: showModal ? null : 'Extreme heat conditions',  dotColor: '#ef4444', locked: showModal },
            { icon: '🟢', title: 'Air Quality Alert', time: showModal ? '09:30' : 'Today 9:30 AM', sub: showModal ? null : 'Unhealthy AQI 162', dotColor: '#10b981', locked: showModal },
          ].map((a, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: showModal ? 'center' : 'flex-start', gap: '.65rem',
              padding: '.5rem 0',
              borderBottom: i < 2 ? '1px solid rgba(99,160,255,0.07)' : 'none',
            }}>
              {showModal
                ? <span style={{ fontSize: '.8rem', opacity: .35 }}>🔒</span>
                : <div style={{ width: 7, height: 7, borderRadius: '50%', background: a.dotColor, flexShrink: 0, marginTop: 5, boxShadow: `0 0 5px ${a.dotColor}` }} />
              }
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '.78rem', fontWeight: 700, color: showModal ? 'rgba(240,246,255,0.3)' : 'rgba(240,246,255,0.85)' }}>
                  {a.title}
                  <span style={{ fontWeight: 400, color: 'rgba(240,246,255,0.4)', fontSize: '.7rem', marginLeft: 6 }}>{a.time}</span>
                </div>
                {!showModal && a.sub && <div style={{ fontSize: '.68rem', color: 'rgba(240,246,255,0.4)', marginTop: 2 }}>{a.sub}</div>}
              </div>
              {showModal && <span style={{ fontSize: '.62rem', color: 'rgba(240,246,255,0.25)', display: 'flex', alignItems: 'center', gap: 3 }}>🔒 Locked</span>}
            </div>
          ))}
        </Card>

        {/* ── ROW 3 — Sign in CTA bar (Image 1 only) ── */}
        {!showModal && (
          <div style={{
            gridColumn: '1 / 3',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(99,160,255,0.1)',
            borderRadius: 18, padding: '1.15rem 1.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '.92rem', color: 'rgba(240,246,255,0.65)', fontWeight: 400 }}>
              Sign in to activate your personalized protection dashboard
            </span>
            <button onClick={onSignIn} style={{
              padding: '.65rem 1.75rem', borderRadius: 50,
              background: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
              border: 'none', cursor: 'pointer',
              fontSize: '.88rem', fontWeight: 700, color: '#020d1a',
              fontFamily: 'Sora, sans-serif', flexShrink: 0,
              boxShadow: '0 4px 20px rgba(34,211,238,0.3)',
              transition: 'all .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Sign In
            </button>
          </div>
        )}

        {/* Preview toggle button (Image 1 only) */}
        {!showModal && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <button onClick={() => setShowModal(true)} style={{
              padding: '.6rem 1.4rem', borderRadius: 12,
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.2)',
              cursor: 'pointer', fontSize: '.72rem', fontWeight: 600,
              color: 'rgba(240,246,255,0.45)', fontFamily: 'Sora, sans-serif',
              transition: 'all .2s',
            }}>
              🔒 Lock preview
            </button>
          </div>
        )}
      </div>

      {/* ═══ MODAL OVERLAY ═══ */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 200,
          width: 560,
          background: 'linear-gradient(160deg, rgba(8,18,40,0.97) 0%, rgba(5,12,28,0.99) 100%)',
          border: '1px solid rgba(99,160,255,0.2)',
          borderRadius: 26,
          padding: '2.75rem 3rem 2.5rem',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 0 100px rgba(59,130,246,0.07), inset 0 1px 0 rgba(255,255,255,0.05)',
          textAlign: 'center',
          animation: 'scaleIn .4s cubic-bezier(.22,.68,0,1.2) both',
        }}>

          {/* ── X CLOSE BUTTON ── */}
          <button onClick={() => setShowModal(false)} style={{
            position: 'absolute', top: '1rem', right: '1rem',
            width: 34, height: 34,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(240,246,255,0.12)',
            borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', color: 'rgba(240,246,255,0.5)',
            fontFamily: 'Sora, sans-serif', fontWeight: 400,
            transition: 'all .18s', lineHeight: 1,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(240,246,255,0.12)'; e.currentTarget.style.color = 'rgba(240,246,255,0.5)'; }}>
            ✕
          </button>

          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
            width: 240, height: 240, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Floating shield */}
          <div style={{
            position: 'absolute', top: '-26px', left: '50%', transform: 'translateX(-50%)',
            width: 52, height: 52, borderRadius: 15,
            background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem',
            boxShadow: '0 8px 28px rgba(59,130,246,0.45), 0 0 0 5px rgba(5,12,28,0.99)',
          }}>🛡️</div>

          {/* Headline */}
          <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
            <h2 style={{
              fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '.8rem',
              letterSpacing: '-.02em',
              color: '#f0f6ff',
            }}>
              Unlock AI-powered<br />income protection insights
            </h2>
            <p style={{
              fontSize: '.82rem', color: 'rgba(240,246,255,0.45)',
              lineHeight: 1.75, maxWidth: 380, margin: '0 auto',
            }}>
              Sign in to personalize your risk prediction, coverage status and payouts dashboard
            </p>
          </div>

          {/* Get Started CTA */}
          <button onClick={onGetStarted} style={{
            width: '100%', padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
            border: 'none', borderRadius: 14,
            fontSize: '.98rem', fontWeight: 800,
            color: '#020e1f', cursor: 'pointer',
            fontFamily: 'Sora, sans-serif', letterSpacing: '.02em',
            boxShadow: '0 6px 32px rgba(34,211,238,0.35)',
            transition: 'all .2s', marginBottom: '.85rem',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(34,211,238,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 32px rgba(34,211,238,0.35)'; }}>
            Get Started
          </button>

          {/* Sign In link */}
          <div style={{ fontSize: '.75rem', color: 'rgba(240,246,255,0.3)', marginBottom: '1.25rem' }}>
            Already have an account?{' '}
            <button onClick={onSignIn} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#60a5fa', fontWeight: 700, fontSize: '.75rem',
              fontFamily: 'Sora, sans-serif',
              textDecoration: 'underline', textUnderlineOffset: 2,
            }}>Sign In</button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['⚡ Auto-payouts', '🛡️ Zero claim forms', '🔒 Bank-grade security'].map((b, i) => (
              <span key={i} style={{
                padding: '3px 11px', borderRadius: 20, fontSize: '.6rem',
                background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)',
                color: 'rgba(240,246,255,0.35)',
              }}>{b}</span>
            ))}
          </div>
        </div>
      )}

      {/* ═══ FOOTER ═══ */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: '1.75rem',
        padding: '.85rem', fontSize: '.72rem', color: 'rgba(240,246,255,0.28)',
        borderTop: '1px solid rgba(99,160,255,0.07)',
        background: 'rgba(5,10,20,0.75)', backdropFilter: 'blur(12px)',
        zIndex: 10,
      }}>
        {['About', 'Contact', 'Privacy', 'Terms'].map(l => (
          <a key={l} href="#" style={{ color: 'rgba(240,246,255,0.28)', textDecoration: 'none', transition: 'color .18s', fontFamily: 'Sora, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(240,246,255,0.65)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,246,255,0.28)'}>{l}</a>
        ))}
      </div>
    </div>
  );
}