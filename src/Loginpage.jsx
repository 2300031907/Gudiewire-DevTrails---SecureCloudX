
import styles from './Loginpage.module.css'
import { useState } from 'react';
/* ── CITY ILLUSTRATION (right side) ───────────────────────── */
function CityIllustration() {
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      borderRadius: 24, overflow: 'hidden',
      background: 'radial-gradient(ellipse 90% 80% at 60% 45%, rgba(255,175,80,0.22) 0%, rgba(255,120,30,0.1) 50%, transparent 75%)',
    }}>
      {/* Sky gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(255,200,120,0.12) 0%, rgba(255,140,50,0.08) 40%, transparent 70%)',
        borderRadius: 24,
      }} />

      {/* City skyline */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '55%', opacity: .2 }} viewBox="0 0 500 220" preserveAspectRatio="xMidYMax meet">
        {[[20,60,40,160],[70,80,55,140],[135,45,35,175],[180,90,60,130],[250,70,40,150],[310,55,50,165],[370,80,45,140],[425,65,40,155],[472,85,28,135]].map(([x,y,w,h],i)=>(
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill="#c8d8f0"/>
            {[[x+5,y+12],[x+5,y+28],[x+5,y+44],[x+18,y+12],[x+18,y+28],[x+18,y+44]].filter(([,py])=>py<y+h-10).map(([px,py],j)=>(
              <rect key={j} x={px} y={py} width="8" height="7" fill="rgba(255,220,100,0.55)" rx="1"/>
            ))}
          </g>
        ))}
      </svg>

      {/* Sun */}
      <div style={{ position:'absolute', top:'10%', right:'15%', width:80, height:80, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,210,60,0.75) 0%, rgba(255,160,30,0.35) 50%, transparent 70%)' }} />

      {/* Clouds */}
      {[[18,'8%',55,30],[38,'4%',42,24],[55,'14%',48,27]].map(([right,top,w,h],i)=>(
        <div key={i} style={{ position:'absolute', right:`${right}%`, top, width:w, height:h, borderRadius:20, background:'rgba(255,255,255,0.65)', filter:'blur(2px)' }} />
      ))}

      {/* Scooter */}
      <div style={{
        position:'absolute', bottom:'8%', left:'50%', transform:'translateX(-50%)',
        fontSize:'9rem', lineHeight:1,
        filter:'drop-shadow(0 12px 40px rgba(34,211,238,0.2))',
        animation:'float 3.5s ease-in-out infinite',
        zIndex:2,
      }}>🛵</div>

      {/* Floating platform icons - left side */}
      {[
        { icon:'🍊', bg:'#fc8019', top:'22%', left:'8%',  delay:'0s' },
        { icon:'🚗', bg:'#1c1c1c', top:'42%', left:'5%',  delay:'.3s' },
        { icon:'🛵', bg:'#e23744', top:'58%', left:'9%',  delay:'.6s' },
        { icon:'🟡', bg:'#1c2b33', top:'73%', left:'4%',  delay:'.9s' },
      ].map((p,i)=>(
        <div key={i} style={{
          position:'absolute', top:p.top, left:p.left,
          width:44, height:44, borderRadius:12,
          background:p.bg, border:'1px solid rgba(255,255,255,0.15)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'1.1rem', animation:`float ${3+i*0.4}s ease-in-out infinite ${p.delay}`,
          boxShadow:'0 4px 16px rgba(0,0,0,0.3)',
        }}>{p.icon}</div>
      ))}

      {/* App grid badge top-right */}
      <div style={{
        position:'absolute', top:'8%', right:'5%',
        background:'rgba(255,255,255,0.92)',
        borderRadius:14, padding:'.6rem .65rem',
        display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
        gap:6, backdropFilter:'blur(10px)',
        boxShadow:'0 8px 28px rgba(0,0,0,0.2)',
        animation:'fadeIn .5s ease .2s both',
      }}>
        {[
          { label:'U',   bg:'#000' },
          { label:'🍊',  bg:'#fc8019' },
          { label:'🟡',  bg:'#f59e0b' },
          { label:'Uber',bg:'#1c1c1c', wide:true },
          { label:'🛵',  bg:'#e23744' },
        ].map((b,i)=>(
          <div key={i} style={{
            width:b.wide?'auto':30, height:30,
            borderRadius:8, background:b.bg,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'.72rem', fontWeight:700, color:'#fff',
            padding:b.wide?'0 6px':0,
            gridColumn:b.wide?'span 2':'span 1',
            fontFamily:'Sora, sans-serif',
          }}>{b.label}</div>
        ))}
      </div>

      {/* ZeroShield Login label */}
      <div style={{
        position:'absolute', bottom:'32%', right:'5%',
        fontSize:'.65rem', fontWeight:600,
        color:'rgba(240,246,255,0.45)',
        fontFamily:'Sora, sans-serif',
        letterSpacing:'.04em',
      }}>ZeroShield Login</div>
    </div>
  );
}

/* ── INPUT ROW ─────────────────────────────────────────────── */
function InputField({ icon, placeholder, type='text', value, onChange, rightSlot, style={} }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:10,
      background: focused ? 'rgba(59,130,246,0.07)' : 'rgba(255,255,255,0.05)',
      border: `1.5px solid ${focused ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.1)'}`,
      borderRadius:12, padding:'.8rem 1rem',
      transition:'all .18s',
      boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.1)' : 'none',
      ...style,
    }}>
      <span style={{ fontSize:'1rem', opacity:.55, flexShrink:0 }}>{icon}</span>
      <input
        type={type} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{
          flex:1, background:'none', border:'none', outline:'none',
          fontSize:'.9rem', color:'#f0f6ff', fontFamily:'Sora, sans-serif',
        }}
      />
      {rightSlot}
    </div>
  );
}

/* ── PLATFORM ROW ──────────────────────────────────────────── */
function PlatformRow() {
  return (
    <div>
      <div style={{ textAlign:'center', fontSize:'.72rem', color:'rgba(240,246,255,0.4)', marginBottom:'.75rem' }}>
        Or continue with:
      </div>
      <div style={{ display:'flex', gap:'.55rem', justifyContent:'center' }}>
        {[
          { label:'zomato', bg:'#e23744' },
          { label:'S',      bg:'#fc8019' },
          { label:'Uber',   bg:'#1c1c1c' },
          { label:'⊙Ola',  bg:'#1c2b33' },
        ].map((p,i)=>(
          <button key={i} style={{
            height:40, minWidth:60, padding:'0 .85rem',
            background:p.bg, border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:10, cursor:'pointer',
            fontSize:'.72rem', fontWeight:700, color:'#fff',
            fontFamily:'Sora, sans-serif', transition:'transform .15s',
          }}
          onMouseEnter={e=>e.currentTarget.style.transform='translateY(-1px)'}
          onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function LoginPage({ onSignIn, onGetStarted }) {
  const [mode, setMode] = useState('login'); // 'login' | 'setpassword'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [mobile, setMobile] = useState('');

  const handleSignIn = () => {
    if (email && password) onSignIn?.({ isNewUser: true });
  };

  return (
    <div style={{
      minHeight:'100vh',
      background:'radial-gradient(ellipse 80% 60% at 15% 50%, #0d1f3c 0%, #07090f 55%)',
      fontFamily:'Sora, sans-serif', color:'#f0f6ff',
      display:'flex', flexDirection:'column',
    }}>

      {/* ── NAV ── */}
      <nav style={{ display:'flex', alignItems:'center', padding:'1.25rem 2.5rem', gap:10 }}>
        <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#3b82f6,#22d3ee)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', boxShadow:'0 0 16px rgba(59,130,246,0.4)', flexShrink:0 }}>🛡️</div>
        <span style={{ fontSize:'1.05rem', fontWeight:800, letterSpacing:'.05em', background:'linear-gradient(90deg,#f0f6ff,#22d3ee)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>ZEROSHIELD</span>
      </nav>

      {/* ── BODY ── */}
      <div style={{
        flex:1, display:'grid', gridTemplateColumns:'480px 1fr',
        alignItems:'center', gap:'2rem',
        maxWidth:1200, margin:'0 auto', width:'100%',
        padding:'1.5rem 2.5rem 3rem',
      }}>

        {/* LEFT PANEL */}
        <div style={{ animation:'fadeUp .5s ease both' }}>

          {/* Headline */}
          <h1 style={{ fontSize:'2rem', fontWeight:800, lineHeight:1.2, letterSpacing:'-.025em', marginBottom:'.55rem' }}>
            <span style={{ background:'linear-gradient(90deg,#22d3ee,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              Secure Login to Your
            </span>
            <br />
            <span style={{ color:'#f0f6ff' }}>ZeroShield Account</span>
          </h1>
          <p style={{ fontSize:'.85rem', color:'rgba(240,246,255,0.5)', marginBottom:'1.75rem' }}>
            Enter your details to access your dashboard.
          </p>

          {/* Form card */}
          <div style={{
            background:'rgba(255,255,255,0.04)',
            border:'1px solid rgba(99,160,255,0.14)',
            borderRadius:18, padding:'1.5rem',
            backdropFilter:'blur(20px)',
            boxShadow:'0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
            display:'flex', flexDirection:'column', gap:'1rem',
          }}>

            {mode === 'login' ? (
              <>
                {/* Email */}
                <InputField icon="✉️" placeholder="Email Address or Username"
                  value={email} onChange={e=>setEmail(e.target.value)} />

                {/* Password */}
                <InputField icon="🔒" placeholder="Password" type={showPass?'text':'password'}
                  value={password} onChange={e=>setPassword(e.target.value)}
                  rightSlot={
                    <button onClick={()=>setShowPass(p=>!p)} style={{ background:'none',border:'none',cursor:'pointer',color:'rgba(59,130,246,0.8)',fontSize:'.72rem',fontWeight:600,fontFamily:'Sora,sans-serif',flexShrink:0,padding:0 }}>
                      Forgot Password?
                    </button>
                  }
                />

                {/* Mobile (optional) */}
                <InputField icon="📱" placeholder="Mobile Number (optional)"
                  value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,''))}
                  style={{ opacity:.75 }}
                />

                {/* Sign In */}
                <button onClick={handleSignIn} style={{
                  width:'100%', padding:'.9rem',
                  background:'linear-gradient(135deg,#22d3ee 0%,#3b82f6 100%)',
                  border:'none', borderRadius:12,
                  fontSize:'.95rem', fontWeight:800,
                  color:'#020e1f', cursor:'pointer',
                  fontFamily:'Sora,sans-serif', letterSpacing:'.02em',
                  boxShadow:'0 6px 28px rgba(34,211,238,0.32)',
                  transition:'all .2s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 10px 36px rgba(34,211,238,0.44)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 6px 28px rgba(34,211,238,0.32)';}}>
                  Sign In
                </button>

                <PlatformRow />

                <div style={{ textAlign:'center', fontSize:'.72rem', color:'rgba(240,246,255,0.38)' }}>
                  Don't have an account?{' '}
                  <span onClick={()=>setMode('setpassword')} style={{ color:'#60a5fa',fontWeight:700,cursor:'pointer',textDecoration:'underline',textUnderlineOffset:2 }}>
                    Sign Up
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* Email */}
                <InputField icon="@" placeholder="Enter Email or Username"
                  value={email} onChange={e=>setEmail(e.target.value)} />

                {/* Set password */}
                <InputField icon="🔒" placeholder="Set Your Password"
                  type={showPass?'text':'password'}
                  value={password} onChange={e=>setPassword(e.target.value)} />

                {/* Hint */}
                <p style={{ fontSize:'.72rem', color:'rgba(240,246,255,0.4)', lineHeight:1.65, marginTop:'-.25rem' }}>
                  Use at least 8 characters with a mix of letters, numbers, and symbols.
                </p>

                {/* Continue */}
                <button onClick={()=>{ if(email&&password.length>=8) onGetStarted?.(); }} style={{
                  width:'100%', padding:'.9rem',
                  background:'linear-gradient(135deg,#22d3ee 0%,#3b82f6 100%)',
                  border:'none', borderRadius:12,
                  fontSize:'.95rem', fontWeight:800,
                  color:'#020e1f', cursor:'pointer',
                  fontFamily:'Sora,sans-serif', letterSpacing:'.02em',
                  boxShadow:'0 6px 28px rgba(34,211,238,0.32)',
                  transition:'all .2s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 10px 36px rgba(34,211,238,0.44)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 6px 28px rgba(34,211,238,0.32)';}}>
                  Continue
                </button>

                <PlatformRow />

                <div style={{ textAlign:'center', fontSize:'.72rem', color:'rgba(240,246,255,0.38)' }}>
                  Create a new account?{' '}
                  <span style={{ color:'#60a5fa',fontWeight:700,cursor:'pointer' }}>
                    Set Password First.
                  </span>
                </div>

                <div style={{ textAlign:'center' }}>
                  <span onClick={()=>setMode('login')} style={{ fontSize:'.7rem', color:'rgba(240,246,255,0.3)', cursor:'pointer', textDecoration:'underline', textUnderlineOffset:2 }}>
                    ← Back to Sign In
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT — Illustration */}
        <div style={{ height:500, animation:'fadeIn .6s ease .1s both' }}>
          <CityIllustration />
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ display:'flex', justifyContent:'center', gap:'1.5rem', padding:'.85rem', fontSize:'.72rem', color:'rgba(240,246,255,0.28)', borderTop:'1px solid rgba(99,160,255,0.07)' }}>
        {['About','Contact','Privacy','Terms'].map(l=>(
          <a key={l} href="#" style={{ color:'rgba(240,246,255,0.28)',textDecoration:'none',transition:'color .18s' }}
            onMouseEnter={e=>e.currentTarget.style.color='rgba(240,246,255,0.65)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(240,246,255,0.28)'}>{l}</a>
        ))}
      </footer>
    </div>
  );
}