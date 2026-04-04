// Screen1Landing.jsx
import { useState } from 'react';
import styles from './Screen1Landing.module.css';

/* ══════════════════════════════════════════════
   MINI COMPONENTS
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
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="rgba(240,246,255,0.15)" strokeWidth="6" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="rgba(240,246,255,0.9)" strokeWidth="2.5" strokeLinecap="round" filter="url(#glow)" />
      <circle cx={cx} cy={cy} r="5.5" fill="rgba(240,246,255,0.9)" />
      <circle cx={cx} cy={cy} r="2.5" fill="#0c1528" />
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
        {[34,68,102,136,170,204,238,272,306].map(x => <line key={x} x1={x} y1="0" x2={x} y2="150" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
        {[30,60,90,120].map(y => <line key={y} x1="0" y1={y} x2="340" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />)}
        <path d="M0 75 Q85 48 170 75 Q255 102 340 75" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
        <rect width="340" height="150" fill="url(#hm1)" />
        <rect width="340" height="150" fill="url(#hm2)" />
        {[[155,62,22,18],[175,75,18,15],[138,75,16,14],[165,55,14,12]].map(([x,y,w,h],i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="3"
            fill={`rgba(249,115,22,${0.35 + i * 0.1})`} stroke="rgba(251,191,36,0.3)" strokeWidth=".5" />
        ))}
        {[[168,70],[148,80],[182,62],[140,90]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#22d3ee" opacity=".85"
            style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }} />
        ))}
      </svg>
    </div>
  );
}

function Card({ children, style = {}, locked = false }) {
  return (
    <div className={`${styles.card} ${locked ? styles.cardLocked : styles.cardNormal}`} style={style}>
      {children}
    </div>
  );
}

function CardTitle({ icon, children }) {
  return (
    <div className={styles.cardTitle}>
      {icon && <span className={styles.cardTitleIcon}>{icon}</span>}
      <span className={styles.cardTitleText}>{children}</span>
    </div>
  );
}

function LockedWidget({ title, children, style = {} }) {
  return (
    <div className={styles.lockedWidget} style={style}>
      <div className={styles.lockedHeader}>
        <span style={{ fontSize: '.85rem', opacity: .4 }}>🔒</span>
        <span style={{ fontSize: '.78rem', fontWeight: 600, color: 'rgba(240,246,255,0.35)', fontFamily: 'Sora, sans-serif' }}>{title}</span>
      </div>
      <div className={styles.lockedContent}>{children}</div>
      <div className={styles.lockedFooter}>🔒 Login required</div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function Screen1Landing({ onGetStarted, onSignIn }) {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className={styles.root}>

      {/* NAV */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <div className={styles.navLogo}>🛡️</div>
          <span className={styles.navBrandText}>ZEROSHIELD</span>
        </div>
        <div className={styles.navLinks}>
          {['Coverage', 'Alerts', 'GigScore', 'Pricing'].map((l, i) => (
            <a key={l} href="#"
              className={`${styles.navLink} ${i === 0 ? styles.navLinkActive : styles.navLinkDefault}`}>
              {l}
            </a>
          ))}
        </div>
        <button onClick={onSignIn} className={styles.navSignIn}>
          <span>👤</span> Sign In
        </button>
      </nav>

      {/* HERO (only when modal closed) */}
      {!showModal && (
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroGradient}>AI-powered income</span>
            <span style={{ color: 'rgba(240,246,255,0.7)', fontWeight: 400 }}> protection preview</span>
          </h1>
          <p className={styles.heroSub}>Explore how ZeroShield predicts weather risks and protects your earnings</p>
        </div>
      )}

      {/* PAGE BODY */}
      <div className={styles.pageBody}>

        {/* GRID */}
        <div className={`${styles.grid} ${showModal ? styles.gridBlurred : ''}`}>

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

          {/* Weather */}
          <Card>
            <CardTitle icon="⛈️">{showModal ? 'Weather Alert' : 'Weather Disruption'}</CardTitle>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '.88rem', color: 'rgba(240,246,255,0.75)', marginBottom: '.4rem', lineHeight: 1.5 }}>
                  {showModal ? 'Heavy rain is expected today.' : 'Heavy rain expected between 4 PM – 8 PM'}
                </div>
                <div style={{ fontSize: '.78rem', color: 'rgba(240,246,255,0.45)' }}>
                  Income disruption {showModal ? 'probability' : 'risk'}: Medium
                </div>
              </div>
              <div style={{ fontSize: '3rem', opacity: .55, flexShrink: 0 }}>🌧️</div>
            </div>
          </Card>

          {/* GigScore */}
          {showModal
            ? <LockedWidget title="GigScore"><div style={{ padding: '.5rem 0' }}><RingScore score={72} /></div></LockedWidget>
            : (
              <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                <CardTitle>GigScore</CardTitle>
                <RingScore score={72} />
              </Card>
            )
          }

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

          {/* Heatmap */}
          <Card>
            <CardTitle icon="📍">Delivery Zone Heatmap</CardTitle>
            <HeatmapCard />
          </Card>

          {/* Alerts */}
          <Card>
            <CardTitle icon="🔔">Alerts</CardTitle>
            {[
              { title: 'Storm Warning',    time: 'Today 4:00 PM', sub: 'Heavy rain and flooding expected', dotColor: '#f59e0b' },
              { title: 'Heat Advisory',    time: 'Today 2:00 PM', sub: 'Extreme heat conditions',          dotColor: '#ef4444' },
              { title: 'Air Quality Alert',time: 'Today 9:30 AM', sub: 'Unhealthy AQI 162',                dotColor: '#10b981' },
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
                  {!showModal && <div style={{ fontSize: '.68rem', color: 'rgba(240,246,255,0.4)', marginTop: 2 }}>{a.sub}</div>}
                </div>
                {showModal && <span style={{ fontSize: '.62rem', color: 'rgba(240,246,255,0.25)' }}>🔒 Locked</span>}
              </div>
            ))}
          </Card>

          {/* CTA bar (open only) */}
          {!showModal && (
            <div className={styles.ctaBar}>
              <span className={styles.ctaBarText}>Sign in to activate your personalized protection dashboard</span>
              <button onClick={onSignIn} className={styles.ctaBarBtn}>Sign In</button>
            </div>
          )}

          {/* Lock preview (open only) */}
          {!showModal && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button onClick={() => setShowModal(true)} className={styles.lockBtn}>🔒 Lock preview</button>
            </div>
          )}

        </div>

        {/* ══════════════════════════════════════════
            MODAL — shield is INSIDE the modal div,
            flows naturally, never clipped
        ══════════════════════════════════════════ */}
        {showModal && (
          <div className={styles.modalWrap}>
            <div className={styles.modal}>

              <button onClick={() => setShowModal(false)} className={styles.modalClose}>✕</button>
              <div className={styles.modalGlow} />

              {/* Shield — inline, not absolute */}
              <div className={styles.modalShield}>🛡️</div>

              <div className={styles.modalHeadline}>
                <h2 className={styles.modalH2}>
                  Unlock AI-powered<br />income protection insights
                </h2>
                <p className={styles.modalSub}>
                  Sign in to personalize your risk prediction, coverage status and payouts dashboard
                </p>
              </div>

              <button onClick={onGetStarted} className={styles.modalCta}>Get Started</button>

              <div className={styles.modalSignInRow}>
                Already have an account?{' '}
                <button onClick={onSignIn} className={styles.modalSignInLink}>Sign In</button>
              </div>

              <div className={styles.trustBadges}>
                {['⚡ Auto-payouts', '🛡️ Zero claim forms', '🔒 Bank-grade security'].map((b, i) => (
                  <span key={i} className={styles.trustBadge}>{b}</span>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        {['About', 'Contact', 'Privacy', 'Terms'].map(l => (
          <a key={l} href="#" className={styles.footerLink}>{l}</a>
        ))}
      </div>

    </div>
  );
}