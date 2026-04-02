import { useState } from 'react';
import styles from './Layout.module.css';
/* ═══════════════════════════════════════════
   SHARED STYLES
═══════════════════════════════════════════ */
export const LAYOUT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg0: #050a14;
  --bg1: #080f1e;
  --bg2: #0c1528;
  --bg3: #111d35;
  --bg4: #162240;
  --glass: rgba(255,255,255,0.04);
  --glass2: rgba(255,255,255,0.07);
  --border: rgba(99,160,255,0.1);
  --border2: rgba(99,160,255,0.22);
  --blue: #3b82f6;
  --blue2: #60a5fa;
  --cyan: #22d3ee;
  --green: #10b981;
  --green2: #34d399;
  --orange: #f59e0b;
  --red: #ef4444;
  --yellow: #fbbf24;
  --purple: #8b5cf6;
  --text1: #eaf0ff;
  --text2: #7a96c0;
  --text3: #3a5070;
  --font: 'Sora', sans-serif;
  --mono: 'JetBrains Mono', monospace;
  --sidebar-w: 220px;
  --nav-h: 58px;
}

html, body, #root { min-height: 100vh; font-family: var(--font); background: var(--bg0); color: var(--text1); -webkit-font-smoothing: antialiased; }

/* scrollbar */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

/* animations */
@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-6px); } }
@keyframes pulse-dot { 0%,100% { box-shadow:0 0 0 0 rgba(239,68,68,0.4); } 60% { box-shadow:0 0 0 8px rgba(239,68,68,0); } }
@keyframes glow { 0%,100% { opacity:.6; } 50% { opacity:1; } }
@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}

/* LAYOUT SHELL */
.zs-shell {
  display: flex;
  min-height: 100vh;
  padding-top: var(--nav-h);
}

/* NAVBAR */
.zs-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 300;
  height: var(--nav-h);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 1.5rem 0 calc(var(--sidebar-w) + 1.5rem);
  background: rgba(5,10,20,0.9); backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--border);
}
.zs-nav-brand {
  display: flex; align-items: center; gap: 9px;
  position: fixed; left: 0; top: 0; width: var(--sidebar-w);
  height: var(--nav-h); padding: 0 1.25rem;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: rgba(5,10,20,0.95);
}
.zs-brand-icon {
  width: 30px; height: 30px; border-radius: 8px;
  background: linear-gradient(135deg, var(--blue), var(--cyan));
  display: flex; align-items: center; justify-content: center;
  font-size: .85rem; box-shadow: 0 0 14px rgba(59,130,246,0.4);
}
.zs-brand-name {
  font-size: .9rem; font-weight: 800; letter-spacing: .04em;
  background: linear-gradient(90deg, var(--text1), var(--cyan));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.zs-nav-center { display: flex; align-items: center; gap: 4px; }
.zs-nav-right { display: flex; align-items: center; gap: .75rem; }

.zs-nav-pill {
  display: flex; align-items: center; gap: 6;
  padding: '4px 10px'; border-radius: 20;
  font-size: '.65rem'; font-weight: 700;
}

/* SIDEBAR */
.zs-sidebar {
  width: var(--sidebar-w); flex-shrink: 0;
  position: fixed; top: var(--nav-h); left: 0; bottom: 0;
  background: rgba(5,10,20,0.95); backdrop-filter: blur(20px);
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
  padding: 1.25rem 0;
  overflow-y: auto;
}
.zs-sidebar-section { padding: 0 .75rem; margin-bottom: .5rem; }
.zs-sidebar-label { font-size: .58rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--text3); padding: .5rem .75rem .35rem; }
.zs-sidebar-item {
  display: flex; align-items: center; gap: .7rem;
  padding: .58rem .85rem; border-radius: 10px;
  font-size: .8rem; font-weight: 500; color: var(--text2);
  cursor: pointer; transition: all .18s; text-decoration: none;
  margin-bottom: 2px;
}
.zs-sidebar-item:hover { color: var(--text1); background: var(--glass2); }
.zs-sidebar-item.active {
  color: var(--blue2); background: rgba(59,130,246,0.12);
  border: 1px solid rgba(59,130,246,0.2);
}
.zs-sidebar-item .icon { font-size: 1rem; flex-shrink: 0; }
.zs-sidebar-badge {
  margin-left: auto; font-size: .58rem; font-weight: 700;
  padding: 2px 6px; border-radius: 10px;
  background: rgba(239,68,68,0.15); color: #ef4444;
  border: 1px solid rgba(239,68,68,0.25);
}
.zs-sidebar-bottom {
  margin-top: auto; padding: .75rem;
  border-top: 1px solid var(--border);
}

/* PAGE BODY */
.zs-page {
  margin-left: var(--sidebar-w);
  flex: 1; min-height: 100vh;
  padding: 1.75rem 2rem 3rem;
  overflow-x: hidden;
}
.zs-page-header { margin-bottom: 1.5rem; }
.zs-page-title { font-size: 1.4rem; font-weight: 800; letter-spacing: -.02em; margin-bottom: .2rem; }
.zs-page-sub { font-size: .78rem; color: var(--text2); }

/* CARD */
.card {
  background: var(--glass);
  border: 1px solid var(--border);
  border-radius: 18px; padding: 1.2rem;
  position: relative; overflow: hidden;
  transition: border-color .22s, box-shadow .22s;
}
.card::before {
  content: ''; position: absolute; inset: 0; border-radius: 18px;
  background: radial-gradient(ellipse 70% 50% at 50% -10%, rgba(59,130,246,0.05) 0%, transparent 70%);
  pointer-events: none;
}
.card:hover { border-color: var(--border2); box-shadow: 0 0 28px rgba(59,130,246,0.07); }
.card-title {
  font-size: .72rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .07em; color: var(--text2); margin-bottom: .85rem;
  display: flex; align-items: center; justify-content: space-between;
}
.card-title-icon { font-size: .9rem; opacity: .55; }
.card.anim { animation: fadeUp .4s ease both; }
.card.anim-1 { animation-delay: .05s; }
.card.anim-2 { animation-delay: .1s; }
.card.anim-3 { animation-delay: .15s; }
.card.anim-4 { animation-delay: .2s; }
.card.anim-5 { animation-delay: .25s; }
.card.anim-6 { animation-delay: .3s; }

/* GRID LAYOUTS */
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.grid-13 { display: grid; grid-template-columns: 1fr 2fr; gap: 1rem; }
.grid-31 { display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; }

/* STATUS BADGE */
.badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 10px; border-radius: 20px;
  font-size: .62rem; font-weight: 700;
}
.badge-green { background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25); color: #10b981; }
.badge-red { background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25); color: #ef4444; }
.badge-orange { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); color: #f59e0b; }
.badge-blue { background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.25); color: #60a5fa; }
.badge-purple { background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.25); color: #a78bfa; }
.badge-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.badge-dot.pulse { animation: pulse-dot 1.5s infinite; }

/* PROGRESS BAR */
.prog-wrap { width: 100%; height: 6px; background: rgba(255,255,255,0.07); border-radius: 3px; overflow: hidden; }
.prog-fill { height: 100%; border-radius: 3px; transition: width .6s ease; }

/* BUTTONS */
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: .6rem 1.2rem; border-radius: 10px; border: none;
  font-size: .8rem; font-weight: 700; font-family: var(--font);
  cursor: pointer; transition: all .18s; letter-spacing: .01em;
}
.btn-primary { background: linear-gradient(135deg, var(--blue), #2563eb); color: #fff; box-shadow: 0 4px 16px rgba(59,130,246,0.3); }
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(59,130,246,0.42); }
.btn-green { background: linear-gradient(135deg, var(--green), #059669); color: #fff; box-shadow: 0 4px 16px rgba(16,185,129,0.28); }
.btn-green:hover { transform: translateY(-1px); box-shadow: 0 6px 24px rgba(16,185,129,0.4); }
.btn-ghost { background: var(--glass2); border: 1.5px solid var(--border2); color: var(--text2); }
.btn-ghost:hover { color: var(--text1); border-color: var(--blue); }
.btn-danger { background: rgba(239,68,68,0.1); border: 1.5px solid rgba(239,68,68,0.25); color: #ef4444; }
.btn-danger:hover { background: rgba(239,68,68,0.18); }
.btn-sm { padding: .38rem .85rem; font-size: .72rem; border-radius: 8px; }

/* LOADER */
.loader-spin { width: 18px; height: 18px; border: 2px solid var(--border); border-top-color: var(--blue); border-radius: 50%; animation: spin .7s linear infinite; }
.loader-shimmer {
  background: linear-gradient(90deg, var(--glass) 0%, rgba(255,255,255,0.08) 50%, var(--glass) 100%);
  background-size: 400px 100%; animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

/* STAT ROW */
.stat-num { font-family: var(--mono); font-size: 1.8rem; font-weight: 700; color: var(--text1); letter-spacing: -.03em; line-height: 1; }
.stat-label { font-size: .68rem; color: var(--text3); margin-top: .2rem; }
.stat-change { font-size: .7rem; font-weight: 600; display: flex; align-items: center; gap: 3px; margin-top: .25rem; }
.stat-up { color: var(--green2); }
.stat-down { color: var(--red); }

/* TIMESTAMP */
.ts { font-size: .6rem; color: var(--text3); display: flex; align-items: center; gap: 4px; }

/* ALERT ROWS */
.alert-row {
  display: flex; align-items: center; gap: .7rem;
  padding: .65rem .85rem; border-radius: 12px;
  background: var(--glass); border: 1px solid var(--border);
  margin-bottom: .45rem; cursor: pointer; transition: all .18s;
}
.alert-row:hover { border-color: var(--border2); transform: translateX(2px); }
.alert-row .al-icon { font-size: 1.1rem; flex-shrink: 0; }
.alert-row .al-body { flex: 1; }
.alert-row .al-title { font-size: .78rem; font-weight: 700; }
.alert-row .al-sub { font-size: .65rem; color: var(--text2); margin-top: 1px; }
.alert-row .al-time { font-size: .62rem; color: var(--text3); font-family: var(--mono); flex-shrink: 0; }
`;

/* ═══════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════ */

// Timestamp
export function Timestamp({ text = 'Updated 5 minutes ago' }) {
  return (
    <div className="ts">
      <span>🕐</span> {text}
    </div>
  );
}

// Status Badge
export function Badge({ type = 'green', children, pulse = false }) {
  return (
    <span className={`badge badge-${type}`}>
      <span className={`badge-dot${pulse ? ' pulse' : ''}`} />
      {children}
    </span>
  );
}

// Progress Bar
export function ProgressBar({ pct = 60, color = 'var(--blue)', height = 6 }) {
  return (
    <div className="prog-wrap" style={{ height }}>
      <div className="prog-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

// Loader Spinner
export function Loader({ size = 18 }) {
  return <div className="loader-spin" style={{ width: size, height: size }} />;
}

// Shimmer Skeleton
export function Shimmer({ h = 20, w = '100%', radius = 8 }) {
  return <div className="loader-shimmer" style={{ height: h, width: w, borderRadius: radius }} />;
}

// Card wrapper
export function Card({ children, style = {}, className = '', delay = 0 }) {
  return (
    <div className={`card anim anim-${delay} ${className}`} style={style}>
      {children}
    </div>
  );
}

// Card Title
export function CardTitle({ children, icon, action, timestamp }) {
  return (
    <div className="card-title">
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon && <span className="card-title-icon">{icon}</span>}
        <span>{children}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {timestamp && <Timestamp text={timestamp} />}
        {action}
      </div>
    </div>
  );
}

// Button
export function Button({ variant = 'primary', size = '', children, onClick, style = {} }) {
  return (
    <button className={`btn btn-${variant}${size ? ` btn-${size}` : ''}`} onClick={onClick} style={style}>
      {children}
    </button>
  );
}

// Stat Block
export function StatBlock({ value, label, change, changeDir = 'up', color }) {
  return (
    <div>
      <div className="stat-num" style={color ? { color } : {}}>{value}</div>
      <div className="stat-label">{label}</div>
      {change && (
        <div className={`stat-change stat-${changeDir}`}>
          {changeDir === 'up' ? '▲' : '▼'} {change}
        </div>
      )}
    </div>
  );
}

// Alert Row
export function AlertRow({ icon, title, sub, time, priority = 'medium' }) {
  const colors = { high: '#ef4444', medium: '#f59e0b', low: '#3b82f6' };
  return (
    <div className="alert-row">
      <div style={{ width: 4, height: '100%', minHeight: 36, background: colors[priority], borderRadius: 4, flexShrink: 0 }} />
      <span className="al-icon">{icon}</span>
      <div className="al-body">
        <div className="al-title">{title}</div>
        {sub && <div className="al-sub">{sub}</div>}
      </div>
      <span className="al-time">{time}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════ */
export function Navbar({ activeTab, onTabChange, userName = 'Ravi K.', onProfile, onSignOut }) {
  const [time, setTime] = useState(new Date());
  const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* Brand (fixed left) */}
      <div className="zs-nav-brand">
        <div className="zs-brand-icon">🛡️</div>
        <span className="zs-brand-name">ZEROSHIELD</span>
      </div>
      {/* Main nav */}
      <nav className="zs-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.72rem', color: 'var(--text3)' }}>
          <span style={{ fontFamily: 'var(--mono)', fontWeight: 600, color: 'var(--text2)' }}>{timeStr}</span>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444', animation: 'pulse-dot 1.5s infinite' }} />
          <span style={{ color: '#ef4444', fontWeight: 600 }}>LIVE</span>
        </div>
        <div className="zs-nav-right">
          <div style={{ fontSize: '.65rem', padding: '3px 10px', borderRadius: 20, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981', fontWeight: 600 }}>
            ✓ Coverage Active
          </div>
          <div onClick={onProfile} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', border: '1px solid var(--border)', borderRadius: 10, fontSize: '.78rem', color: 'var(--text2)', cursor: 'pointer', transition: 'all .18s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}>
            <span>👤</span> {userName}
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,var(--blue),var(--cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.62rem', fontWeight: 700 }}>
              {userName.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

/* ═══════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: 'dashboard', icon: '⊞',  label: 'Dashboard',  badge: null },
  { id: 'coverage',  icon: '🛡️', label: 'Coverage',   badge: null },
  { id: 'alerts',    icon: '🔔', label: 'Alerts',     badge: '3' },
  { id: 'gigscore',  icon: '📊', label: 'GigScore',   badge: null },
  { id: 'payouts',   icon: '💰', label: 'Payouts',    badge: null },
  { id: 'advisor',   icon: '🤖', label: 'Advisor',    badge: 'NEW' },
];

export function Sidebar({ active, onChange, onProfile, onSignOut }) {
  return (
    <aside className="zs-sidebar">
      <div className="zs-sidebar-section">
        <div className="zs-sidebar-label">Main Menu</div>
        {NAV_ITEMS.map(item => (
          <div key={item.id} className={`zs-sidebar-item${active === item.id ? ' active' : ''}`}
            onClick={() => onChange(item.id)}>
            <span className="icon">{item.icon}</span>
            {item.label}
            {item.badge && (
              <span className="zs-sidebar-badge" style={item.badge === 'NEW' ? { background: 'rgba(139,92,246,0.15)', color: '#a78bfa', borderColor: 'rgba(139,92,246,0.3)' } : {}}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="zs-sidebar-section" style={{ marginTop: '.5rem' }}>
        <div className="zs-sidebar-label">Account</div>
        <div className="zs-sidebar-item" onClick={onProfile}>
          <span className="icon">👤</span> Profile
        </div>
        <div className="zs-sidebar-item">
          <span className="icon">⚙️</span> Settings
        </div>
        <div className="zs-sidebar-item">
          <span className="icon">❓</span> Help
        </div>
      </div>

      <div className="zs-sidebar-bottom">
        {/* Zone status */}
        <div style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 12, padding: '.65rem .75rem', marginBottom: '.65rem' }}>
          <div style={{ fontSize: '.62rem', color: 'var(--text3)', marginBottom: '.25rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>Active Zone</div>
          <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--text1)' }}>Kondapur Dark Store</div>
          <div style={{ fontSize: '.62rem', color: '#10b981', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            3km · Shield Active
          </div>
        </div>
        <div className="zs-sidebar-item btn-danger" style={{ borderRadius: 10, justifyContent: 'center', color: 'rgba(239,68,68,0.7)' }}
          onClick={onSignOut}>
          <span>🚪</span> Sign Out
        </div>
      </div>
    </aside>
  );
}