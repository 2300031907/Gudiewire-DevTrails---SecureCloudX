// SignOut.jsx — Signed out confirmation page

export default function SignOut({ onReturnHome }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse 80% 60% at 15% 50%, #0d1f3c 0%, #07090f 55%)',
      fontFamily: 'Sora, sans-serif',
      color: '#f0f6ff',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex', alignItems: 'center',
        padding: '1.25rem 2.5rem',
        gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem', boxShadow: '0 0 16px rgba(59,130,246,0.4)',
          flexShrink: 0,
        }}>🛡️</div>
        <span style={{
          fontSize: '1.05rem', fontWeight: 800, letterSpacing: '.05em',
          background: 'linear-gradient(90deg, #f0f6ff, #22d3ee)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>ZEROSHIELD</span>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
        padding: '2rem 2.5rem 3rem',
        gap: '2rem',
      }}>

        {/* LEFT */}
        <div style={{ animation: 'fadeUp .5s ease both' }}>
          <h1 style={{
            fontSize: '2.4rem', fontWeight: 800,
            lineHeight: 1.2, letterSpacing: '-.025em',
            marginBottom: '1.75rem',
          }}>
            <span style={{
              background: 'linear-gradient(90deg, #22d3ee, #60a5fa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Securely Signed Out</span>
            <br />
            <span style={{ color: '#f0f6ff' }}>Thank You for Protecting</span>
            <br />
            <span style={{ color: '#f0f6ff' }}>Your Future with ZeroShield.</span>
          </h1>

          {/* Message card */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(99,160,255,0.15)',
            borderRadius: 18,
            padding: '1.5rem 1.75rem',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(16px)',
          }}>
            <p style={{
              fontSize: '1.05rem', fontWeight: 600,
              color: 'rgba(240,246,255,0.85)',
              lineHeight: 1.65, marginBottom: '1.25rem',
            }}>
              You have successfully<br />
              signed out of all<br />
              ZeroShield services.
            </p>

            {/* Return / Login button */}
            <button
              onClick={onReturnHome}
              style={{
                width: '100%', padding: '.9rem 1.5rem',
                background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
                border: 'none', borderRadius: 12,
                fontSize: '.95rem', fontWeight: 700,
                color: '#020e1f', cursor: 'pointer',
                fontFamily: 'Sora, sans-serif', letterSpacing: '.01em',
                boxShadow: '0 6px 28px rgba(34,211,238,0.3)',
                transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(34,211,238,0.42)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(34,211,238,0.3)'; }}>
              Return to Home Page / Log In
            </button>
          </div>

          {/* Platform logos */}
          <div style={{ display: 'flex', gap: '.6rem', alignItems: 'center' }}>
            {[
              { icon: '🛵', name: 'zomato',  bg: '#e23744', label: 'zomato' },
              { icon: '🍊', name: 'swiggy',  bg: '#fc8019', label: 'S' },
              { icon: '🚗', name: 'uber',    bg: '#1c1c1c', label: 'Uber' },
              { icon: '🟡', name: 'ola',     bg: '#1c2b33', label: '⊙Ola' },
            ].map((p, i) => (
              <div key={i} style={{
                height: 44, minWidth: 60, borderRadius: 10,
                background: p.bg,
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 .85rem',
                fontSize: '.78rem', fontWeight: 700, color: '#fff',
                letterSpacing: '.01em',
              }}>{p.label}</div>
            ))}
          </div>
        </div>

        {/* RIGHT — illustration */}
        <div style={{
          position: 'relative',
          height: 480,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn .6s ease .1s both',
        }}>
          {/* Warm city background arc */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 28,
            background: 'radial-gradient(ellipse 85% 80% at 60% 45%, rgba(255,180,80,0.18) 0%, rgba(255,120,30,0.08) 50%, transparent 75%)',
            overflow: 'hidden',
          }}>
            {/* City skyline silhouette */}
            <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', opacity: .18 }} viewBox="0 0 500 200" preserveAspectRatio="none">
              <rect x="20"  y="60"  width="40" height="140" fill="#f0f6ff" />
              <rect x="30"  y="40"  width="20" height="20"  fill="#f0f6ff" />
              <rect x="70"  y="80"  width="55" height="120" fill="#f0f6ff" />
              <rect x="135" y="50"  width="35" height="150" fill="#f0f6ff" />
              <rect x="145" y="30"  width="15" height="22"  fill="#f0f6ff" />
              <rect x="180" y="90"  width="60" height="110" fill="#f0f6ff" />
              <rect x="350" y="55"  width="50" height="145" fill="#f0f6ff" />
              <rect x="360" y="35"  width="28" height="22"  fill="#f0f6ff" />
              <rect x="410" y="75"  width="45" height="125" fill="#f0f6ff" />
              <rect x="460" y="85"  width="40" height="115" fill="#f0f6ff" />
              {/* Windows */}
              {[[25,70],[25,90],[25,110],[75,90],[75,110],[140,60],[140,80],[185,100],[185,120],[355,65],[355,85],[415,85],[415,105]].map(([x,y],i)=>(
                <rect key={i} x={x+5} y={y} width="8" height="6" fill="rgba(255,220,100,0.6)" rx="1"/>
              ))}
            </svg>
            {/* Sun glow */}
            <div style={{
              position: 'absolute', top: '8%', right: '12%',
              width: 90, height: 90, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,200,60,0.7) 0%, rgba(255,140,30,0.3) 50%, transparent 70%)',
            }} />
            {/* Clouds */}
            {[[18,'12%',50],[35,'6%',38],[55,'16%',42]].map(([right,top,sz],i)=>(
              <div key={i} style={{
                position: 'absolute', right: `${right}%`, top,
                width: sz, height: sz * .55, borderRadius: 30,
                background: 'rgba(255,255,255,0.55)',
                filter: 'blur(2px)',
              }} />
            ))}
          </div>

          {/* Scooter */}
          <div style={{
            position: 'relative', zIndex: 2,
            fontSize: '10rem', lineHeight: 1,
            animation: 'float 3.5s ease-in-out infinite',
            filter: 'drop-shadow(0 16px 48px rgba(34,211,238,0.2))',
          }}>🛵</div>

          {/* Session Ended badge */}
          <div style={{
            position: 'absolute', top: '14%', right: '10%',
            background: 'rgba(16,185,129,0.15)',
            border: '1.5px solid rgba(16,185,129,0.35)',
            borderRadius: 12, padding: '.55rem .9rem',
            display: 'flex', alignItems: 'center', gap: 7,
            backdropFilter: 'blur(12px)',
            animation: 'fadeUp .5s ease .3s both',
            boxShadow: '0 4px 20px rgba(16,185,129,0.15)',
          }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--green, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem' }}>✓</div>
            <span style={{ fontSize: '.78rem', fontWeight: 700, color: '#10b981' }}>Session Ended</span>
          </div>

          {/* Come back soon badge */}
          <div style={{
            position: 'absolute', bottom: '22%', right: '6%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10, padding: '.45rem .85rem',
            backdropFilter: 'blur(10px)',
            animation: 'fadeUp .5s ease .5s both',
          }}>
            <span style={{ fontSize: '.72rem', color: 'rgba(240,246,255,0.6)', fontWeight: 500 }}>Come back soon!</span>
          </div>

          {/* Floating platform icons */}
          {[
            { icon: '🍊', bg: '#fc8019', top: '18%', left: '4%',  delay: '.2s' },
            { icon: '🚗', bg: '#1c1c1c', top: '38%', left: '2%',  delay: '.4s' },
            { icon: '🛵', bg: '#e23744', top: '55%', left: '6%',  delay: '.6s' },
            { icon: '🟡', bg: '#1c2b33', top: '70%', left: '3%',  delay: '.8s' },
            { icon: '📦', bg: '#f59e0b', top: '25%', right: '34%', delay: '.35s' },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: p.top, left: p.left, right: p.right,
              width: 44, height: 44, borderRadius: 12,
              background: p.bg,
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem',
              backdropFilter: 'blur(8px)',
              animation: `float ${3 + i * 0.4}s ease-in-out infinite ${p.delay}`,
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}>{p.icon}</div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        display: 'flex', justifyContent: 'center', gap: '1.5rem',
        padding: '.85rem', fontSize: '.72rem', color: 'rgba(240,246,255,0.28)',
        borderTop: '1px solid rgba(99,160,255,0.07)',
      }}>
        {['About', 'Contact', 'Privacy', 'Terms'].map(l => (
          <a key={l} href="#" style={{ color: 'rgba(240,246,255,0.28)', textDecoration: 'none', transition: 'color .18s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(240,246,255,0.65)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,246,255,0.28)'}>{l}</a>
        ))}
      </footer>
    </div>
  );
}