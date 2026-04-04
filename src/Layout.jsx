import { useState } from 'react';
import styles from './Layout.module.css';

/* ═══════════════════════════════════════════════════════════════════
   Layout.jsx  —  ZeroShield component library
   Every className uses CSS Modules (styles.xxx).
   No global class strings, no inline LAYOUT_CSS injection.
   ═══════════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────────
   TIMESTAMP
────────────────────────────────────────────────────────────────── */
export function Timestamp({ text = 'Updated 5 minutes ago' }) {
  return (
    <div className={styles.ts}>
      <span>🕐</span> {text}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   BADGE
────────────────────────────────────────────────────────────────── */
const BADGE_CLASS = {
  green:  styles.badgeGreen,
  red:    styles.badgeRed,
  orange: styles.badgeOrange,
  blue:   styles.badgeBlue,
  purple: styles.badgePurple,
};

export function Badge({ type = 'green', children, pulse = false }) {
  return (
    <span className={`${styles.badge} ${BADGE_CLASS[type] ?? styles.badgeBlue}`}>
      <span className={`${styles.badgeDot}${pulse ? ` ${styles.badgeDotPulse}` : ''}`} />
      {children}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────
   PROGRESS BAR
────────────────────────────────────────────────────────────────── */
export function ProgressBar({ pct = 60, color = 'var(--blue)', height = 6 }) {
  return (
    <div className={styles.progWrap} style={{ height }}>
      <div className={styles.progFill} style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   LOADER SPINNER
────────────────────────────────────────────────────────────────── */
export function Loader({ size = 18 }) {
  return <div className={styles.spinner} style={{ width: size, height: size }} />;
}

/* ──────────────────────────────────────────────────────────────────
   SHIMMER SKELETON
────────────────────────────────────────────────────────────────── */
export function Shimmer({ h = 20, w = '100%', radius = 8 }) {
  return (
    <div className={styles.shimmer} style={{ height: h, width: w, borderRadius: radius }} />
  );
}

/* ──────────────────────────────────────────────────────────────────
   CARD
────────────────────────────────────────────────────────────────── */
const DELAY_CLASS = {
  1: styles.cardDelay1,
  2: styles.cardDelay2,
  3: styles.cardDelay3,
  4: styles.cardDelay4,
  5: styles.cardDelay5,
  6: styles.cardDelay6,
};

export function Card({ children, style = {}, className = '', delay = 0 }) {
  const delayClass = DELAY_CLASS[delay] ?? '';
  return (
    <div className={`${styles.card} ${delayClass} ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   CARD TITLE
────────────────────────────────────────────────────────────────── */
export function CardTitle({ children, icon, action, timestamp }) {
  return (
    <div className={styles.cardTitle}>
      <div className={styles.cardTitleLeft}>
        {icon && <span className={styles.cardTitleIcon}>{icon}</span>}
        <span>{children}</span>
      </div>
      <div className={styles.cardTitleRight}>
        {timestamp && <Timestamp text={timestamp} />}
        {action}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   BUTTON
────────────────────────────────────────────────────────────────── */
const BTN_VARIANT = {
  primary: styles.btnPrimary,
  green:   styles.btnGreen,
  ghost:   styles.btnGhost,
  danger:  styles.btnDanger,
};

export function Button({ variant = 'primary', size = '', children, onClick, style = {} }) {
  const variantClass = BTN_VARIANT[variant] ?? styles.btnPrimary;
  const sizeClass    = size === 'sm' ? styles.btnSm : '';
  return (
    <button
      className={`${styles.btn} ${variantClass} ${sizeClass}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────
   STAT BLOCK
────────────────────────────────────────────────────────────────── */
export function StatBlock({ value, label, change, changeDir = 'up', color }) {
  return (
    <div>
      <div className={styles.statNum} style={color ? { color } : {}}>
        {value}
      </div>
      <div className={styles.statLabel}>{label}</div>
      {change && (
        <div className={`${styles.statChange} ${changeDir === 'up' ? styles.statUp : styles.statDown}`}>
          {changeDir === 'up' ? '▲' : '▼'} {change}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ALERT ROW
────────────────────────────────────────────────────────────────── */
const PRIORITY_COLOR = { high: '#ef4444', medium: '#f59e0b', low: '#3b82f6' };

export function AlertRow({ icon, title, sub, time, priority = 'medium' }) {
  return (
    <div className={styles.alertRow}>
      <div
        className={styles.alertPriorityBar}
        style={{ background: PRIORITY_COLOR[priority] }}
      />
      <span className={styles.alertIcon}>{icon}</span>
      <div className={styles.alertBody}>
        <div className={styles.alertTitle}>{title}</div>
        {sub && <div className={styles.alertSub}>{sub}</div>}
      </div>
      <span className={styles.alertTime}>{time}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   NAVBAR
────────────────────────────────────────────────────────────────── */
export function Navbar({ userName = 'Ravi K.', onProfile, onSignOut }) {
  const [time] = useState(new Date());
  const timeStr = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* Brand (fixed top-left, overlaps sidebar header) */}
      <div className={styles.brand}>
        <div className={styles.brandIcon}>🛡️</div>
        <span className={styles.brandName}>ZEROSHIELD</span>
      </div>

      {/* Main navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <span className={styles.navTime}>{timeStr}</span>
          <div className={styles.navLiveDot} />
          <span className={styles.navLiveLabel}>LIVE</span>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navCoveragePill}>✓ Coverage Active</div>
          <div className={styles.navUser} onClick={onProfile}>
            <span>👤</span>
            {userName}
            <div className={styles.navAvatar}>
              {userName.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SIDEBAR
────────────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'dashboard', icon: '⊞',  label: 'Dashboard', badge: null },
  { id: 'coverage',  icon: '🛡️', label: 'Coverage',  badge: null },
  { id: 'alerts',    icon: '🔔', label: 'Alerts',    badge: '3'  },
  { id: 'gigscore',  icon: '📊', label: 'GigScore',  badge: null },
  { id: 'payouts',   icon: '💰', label: 'Payouts',   badge: null },
  { id: 'advisor',   icon: '🤖', label: 'Advisor',   badge: 'NEW'},
];

export function Sidebar({ active, onChange, onProfile, onSignOut }) {
  return (
    <aside className={styles.sidebar}>
      {/* Main nav */}
      <div className={styles.sidebarSection}>
        <div className={styles.sidebarLabel}>Main Menu</div>
        {NAV_ITEMS.map(item => (
          <div
            key={item.id}
            className={`${styles.sidebarItem} ${active === item.id ? styles.sidebarItemActive : ''}`}
            onClick={() => onChange(item.id)}
          >
            <span className={styles.sidebarItemIcon}>{item.icon}</span>
            {item.label}
            {item.badge && (
              <span className={`${styles.sidebarBadge}${item.badge === 'NEW' ? ` ${styles.sidebarBadgeNew}` : ''}`}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Account nav */}
      <div className={styles.sidebarSection} style={{ marginTop: '.5rem' }}>
        <div className={styles.sidebarLabel}>Account</div>
        <div className={styles.sidebarItem} onClick={onProfile}>
          <span className={styles.sidebarItemIcon}>👤</span> Profile
        </div>
        <div className={styles.sidebarItem}>
          <span className={styles.sidebarItemIcon}>⚙️</span> Settings
        </div>
        <div className={styles.sidebarItem}>
          <span className={styles.sidebarItemIcon}>❓</span> Help
        </div>
      </div>

      {/* Bottom zone card + sign out */}
      <div className={styles.sidebarBottom}>
        <div className={styles.zoneCard}>
          <div className={styles.zoneLabel}>Active Zone</div>
          <div className={styles.zoneName}>Kondapur Dark Store</div>
          <div className={styles.zoneStatus}>
            <span className={styles.zoneStatusDot} />
            3km · Shield Active
          </div>
        </div>
        <div className={styles.sidebarSignOut} onClick={onSignOut}>
          <span>🚪</span> Sign Out
        </div>
      </div>
    </aside>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SHELL  (wraps Navbar + Sidebar + page content)
────────────────────────────────────────────────────────────────── */
export function Shell({ active, onTabChange, userName, onProfile, onSignOut, children }) {
  return (
    <div className={styles.shell}>
      <Navbar userName={userName} onProfile={onProfile} onSignOut={onSignOut} />
      <Sidebar active={active} onChange={onTabChange} onProfile={onProfile} onSignOut={onSignOut} />
      <main className={styles.page}>
        {children}
      </main>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   PAGE HEADER  (use inside Shell's children)
────────────────────────────────────────────────────────────────── */
export function PageHeader({ title, sub }) {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.pageTitle}>{title}</div>
      {sub && <div className={styles.pageSub}>{sub}</div>}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   GRID HELPERS  (use inside Shell's children)
────────────────────────────────────────────────────────────────── */
export function Grid3({ children, style }) { return <div className={styles.grid3} style={style}>{children}</div>; }
export function Grid2({ children, style }) { return <div className={styles.grid2} style={style}>{children}</div>; }
export function Grid4({ children, style }) { return <div className={styles.grid4} style={style}>{children}</div>; }
export function Grid13({ children, style }) { return <div className={styles.grid13} style={style}>{children}</div>; }
export function Grid31({ children, style }) { return <div className={styles.grid31} style={style}>{children}</div>; }

/* ──────────────────────────────────────────────────────────────────
   SIGN-OUT PAGE  (standalone, no Shell needed)
────────────────────────────────────────────────────────────────── */
export function SignOutPage({ onSignIn }) {
  return (
    <div className={styles.signOutRoot}>
      <div className={styles.signOutCard}>
        <span className={styles.signOutIcon}>👋</span>
        <div className={styles.signOutTitle}>You've been signed out</div>
        <p className={styles.signOutSub}>
          Your ZeroShield session has ended safely.<br />
          Sign back in to resume coverage.
        </p>
        <button className={styles.signOutBtn} onClick={onSignIn}>
          Sign Back In →
        </button>
      </div>
    </div>
  );
}