// OnboardingSteps.jsx — Steps 1–5 (mobile, OTP, profile, platforms, bank)
import { useState, useRef, useEffect } from 'react';

/* ── STEP WRAPPER ─────────────────────────────────────────── */
function StepShell({ step, total, title, subtitle, illustration, children }) {
  return (
    <div style={{
      minHeight: '100vh', paddingTop: 62, paddingBottom: 80,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '2rem' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`step-dot ${i < step - 1 ? 'done' : i === step - 1 ? 'active' : ''}`} />
        ))}
        <span className="step-label" style={{ marginLeft: '.5rem' }}>Step {step} of {total}</span>
      </div>

      {/* Main panel: form left, illustration right */}
      <div style={{
        display: 'grid', gridTemplateColumns: '520px 1fr',
        gap: '3rem', alignItems: 'center',
        width: '100%', maxWidth: 1100, padding: '0 2.5rem',
      }}>
        {/* Form card */}
        <div className="glass-card anim-scale-in" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '.5rem' }}>
            {title}
          </h2>
          <p style={{ fontSize: '.82rem', color: 'var(--text2)', marginBottom: '1.8rem', lineHeight: 1.6 }}>
            {subtitle}
          </p>
          {children}
        </div>

        {/* Illustration */}
        <div className="anim-fade-in" style={{ animationDelay: '.15s' }}>
          {illustration}
        </div>
      </div>
    </div>
  );
}

/* ── RIDER ILLUSTRATION ──────────────────────────────────── */
function RiderIllustration({ variant = 'rain' }) {
  const scenes = {
    rain: { bg: 'radial-gradient(circle at 50% 60%, rgba(59,130,246,0.18) 0%, transparent 70%)', emoji: '🌧️' },
    map:  { bg: 'radial-gradient(circle at 50% 60%, rgba(16,185,129,0.15) 0%, transparent 70%)', emoji: '🗺️' },
    bank: { bg: 'radial-gradient(circle at 50% 60%, rgba(251,191,36,0.12) 0%, transparent 70%)', emoji: '💳' },
  };
  const s = scenes[variant] || scenes.rain;
  return (
    <div style={{
      height: 400, borderRadius: 24, overflow: 'hidden',
      background: `${s.bg}, var(--bg2)`,
      border: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Rings */}
      {[200, 150, 100].map((sz, i) => (
        <div key={i} style={{
          position: 'absolute', width: sz, height: sz, borderRadius: '50%',
          border: `1.5px solid rgba(59,130,246,${0.08 + i * 0.05})`,
          animation: `spin-slow ${20 - i * 5}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
        }} />
      ))}
      <div style={{ fontSize: '7rem', lineHeight: 1, zIndex: 1, animation: 'float 3.5s ease-in-out infinite', filter: 'drop-shadow(0 8px 32px rgba(59,130,246,0.3))' }}>🛵</div>
      <div style={{ fontSize: '3rem', position: 'absolute', top: '15%', right: '18%', animation: 'float 2.8s ease-in-out infinite .5s' }}>{s.emoji}</div>
      <div style={{ fontSize: '2rem', position: 'absolute', bottom: '20%', left: '15%', animation: 'float 3.2s ease-in-out infinite .8s' }}>🛡️</div>
    </div>
  );
}

/* ── MAP ILLUSTRATION ────────────────────────────────────── */
function MapIllustration() {
  return (
    <div style={{
      height: 400, borderRadius: 24, overflow: 'hidden',
      background: 'var(--bg2)', border: '1px solid var(--border)',
      position: 'relative',
    }}>
      <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 380 400" preserveAspectRatio="none">
        <defs>
          <radialGradient id="mg1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity=".3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity=".5" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="380" height="400" fill="#0a1628" />
        {/* Grid */}
        {[0,1,2,3,4,5,6].map(i => <line key={i} x1={i*60} y1="0" x2={i*60} y2="400" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>)}
        {[0,1,2,3,4,5,6,7].map(i => <line key={i} x1="0" y1={i*56} x2="380" y2={i*56} stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>)}
        {/* Zone circles */}
        <ellipse cx="190" cy="200" rx="140" ry="140" fill="url(#mg1)" />
        <ellipse cx="190" cy="200" rx="90" ry="90" fill="url(#mg2)" />
        {/* Roads */}
        <path d="M0 200 Q100 150 190 200 Q280 250 380 200" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3"/>
        <path d="M190 0 Q220 100 190 200 Q160 300 190 400" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
        {/* Scooters on map */}
        {[[185,195],[220,160],[155,230],[210,220]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#22d3ee" opacity=".9"
            style={{ filter: 'drop-shadow(0 0 6px #22d3ee)' }} />
        ))}
        <circle cx="190" cy="200" r="10" fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5" />
      </svg>
      <div style={{
        position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
        border: '1px solid var(--border)', borderRadius: 8,
        padding: '4px 14px', fontSize: '.65rem', color: 'var(--text2)',
      }}>Kondapur Dark Store · 3km Zone</div>
    </div>
  );
}

/* ── SCREEN 2: MOBILE NUMBER ──────────────────────────────── */
export function Screen2Mobile({ onNext }) {
  const [phone, setPhone] = useState('');
  return (
    <StepShell step={1} total={5}
      title="Verify Your Mobile Number"
      subtitle="Enter your mobile number to receive a one-time verification code."
      illustration={<RiderIllustration variant="rain" />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div>
          <label className="zs-label">Mobile Number</label>
          <div style={{ display: 'flex', gap: '.65rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.04)', border: '1.5px solid var(--border)',
              borderRadius: 12, padding: '.75rem 1rem',
              fontSize: '.85rem', fontWeight: 600, color: 'var(--text2)',
              flexShrink: 0, whiteSpace: 'nowrap',
            }}>🇮🇳 +91</div>
            <input className="zs-input" placeholder="9876543210"
              value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,''))}
              maxLength={10} inputMode="numeric"
              style={{ fontFamily: 'var(--mono)', fontSize: '.95rem', letterSpacing: '.05em' }} />
          </div>
        </div>
        <div style={{ padding: '.75rem 1rem', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 10, fontSize: '.72rem', color: 'var(--text2)', lineHeight: 1.6 }}>
          📱 We'll send a 6-digit OTP to verify your number. Standard SMS rates apply.
        </div>
        <button className="zs-btn" onClick={() => phone.length >= 10 && onNext(phone)}>
          Send OTP →
        </button>
        <div style={{ textAlign: 'center', fontSize: '.72rem', color: 'var(--text3)' }}>
          Already have an account?{' '}
          <a href="#" style={{ color: 'var(--blue2)', fontWeight: 600, textDecoration: 'none' }}>Sign In</a>
        </div>
      </div>
    </StepShell>
  );
}

/* ── SCREEN 3: OTP ────────────────────────────────────────── */
export function Screen3OTP({ phone, onNext }) {
  const [otp, setOtp] = useState(['','','','','','']);
  const [timer, setTimer] = useState(52);
  const refs = useRef([]);

  useEffect(() => {
    refs.current[0]?.focus();
    if (timer <= 0) return;
    const t = setInterval(() => setTimer(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const handleChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp]; next[i] = v; setOtp(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
    if (!v && i > 0) refs.current[i - 1]?.focus();
  };
  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const pad = n => String(n).padStart(2, '0');
  const filled = otp.every(v => v !== '');

  return (
    <StepShell step={2} total={5}
      title="Verify Your Mobile Number"
      subtitle={`Enter the 6-digit code sent to +91 ${phone || '98765 43210'}`}
      illustration={<RiderIllustration variant="rain" />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label className="zs-label">Enter OTP</label>
          <div className="otp-row">
            {otp.map((v, i) => (
              <input key={i} ref={el => refs.current[i] = el}
                className={`otp-box${v ? ' filled' : ''}`}
                maxLength={1} value={v}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKey(i, e)}
                inputMode="numeric" />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '.72rem' }}>
          <span style={{ color: 'var(--text3)' }}>Didn't receive code?</span>
          <button style={{
            background: 'none', border: 'none', cursor: timer > 0 ? 'not-allowed' : 'pointer',
            color: timer > 0 ? 'var(--text3)' : 'var(--blue2)',
            fontSize: '.72rem', fontWeight: 600, fontFamily: 'var(--font)',
          }} onClick={() => timer === 0 && setTimer(60)}>
            Resend OTP {timer > 0 ? `(${pad(Math.floor(timer/60))}:${pad(timer%60)})` : ''}
          </button>
        </div>
        {/* Phone display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.65rem 1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <span style={{ fontSize: '.9rem' }}>🇮🇳</span>
          <span style={{ fontSize: '.78rem', color: 'var(--text2)', fontFamily: 'var(--mono)' }}>+91 {phone || '98765 43210'}</span>
        </div>
        <button className="zs-btn" onClick={() => filled && onNext()}
          style={{ opacity: filled ? 1 : 0.5 }}>
          Verify & Continue →
        </button>
      </div>
    </StepShell>
  );
}

/* ── SCREEN 4: PROFILE ────────────────────────────────────── */
export function Screen4Profile({ onNext, onBack }) {
  const [form, setForm] = useState({ name: '', city: '', vehicle: 'Bike', platform: '', exp: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <StepShell step={3} total={5}
      title="Tell Us About Yourself"
      subtitle="We need a few details to set up your partner account."
      illustration={<RiderIllustration variant="rain" />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
          <div>
            <label className="zs-label">Full Name</label>
            <input className="zs-input" placeholder="e.g. Rahul Sharma"
              value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label className="zs-label">City</label>
            <input className="zs-input" placeholder="e.g. Bengaluru"
              value={form.city} onChange={e => set('city', e.target.value)} />
          </div>
        </div>
        <div>
          <label className="zs-label">Vehicle Type</label>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            {['Bike', 'Scooter', 'Cycle'].map(v => (
              <button key={v} onClick={() => set('vehicle', v)} style={{
                flex: 1, padding: '.65rem',
                background: form.vehicle === v ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${form.vehicle === v ? 'var(--blue)' : 'var(--border)'}`,
                borderRadius: 10, fontSize: '.8rem', fontWeight: 600,
                color: form.vehicle === v ? 'var(--blue2)' : 'var(--text2)',
                cursor: 'pointer', fontFamily: 'var(--font)',
                transition: 'all .2s',
              }}>
                {v === 'Bike' ? '🏍️' : v === 'Scooter' ? '🛵' : '🚲'} {v}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="zs-label">Primary Work Platform</label>
          <select className="zs-input" value={form.platform} onChange={e => set('platform', e.target.value)}
            style={{ appearance: 'none', cursor: 'pointer' }}>
            <option value="">Select your main platform</option>
            {['Swiggy','Zomato','Porter','Dunzo','Zepto','Uber Eats','Amazon Flex'].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="zs-label">Experience (in months)</label>
          <input className="zs-input" placeholder="e.g. 18"
            value={form.exp} onChange={e => set('exp', e.target.value.replace(/\D/g,''))}
            inputMode="numeric" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '.75rem' }}>
          <button className="zs-btn" onClick={() => onNext(form)}>Continue →</button>
          <button className="zs-btn zs-btn-ghost" style={{ width: 'auto', padding: '.85rem 1.5rem' }}
            onClick={onBack}>Back</button>
        </div>
      </div>
    </StepShell>
  );
}

/* ── SCREEN 5: PLATFORMS ──────────────────────────────────── */
const PLATFORMS = [
  { id: 'zomato',  name: 'Zomato',     icon: '🛵', bg: '#e23744' },
  { id: 'swiggy',  name: 'Swiggy',     icon: '🍊', bg: '#fc8019' },
  { id: 'uber',    name: 'Uber',        icon: '🚗', bg: '#1c1c1c' },
  { id: 'ola',     name: 'Ola',         icon: '🟡', bg: '#1c2b33' },
  { id: 'amazon',  name: 'Amazon Flex', icon: '📦', bg: '#232f3e' },
  { id: 'dunzo',   name: 'Dunzo',       icon: '⚡', bg: '#00b37e' },
  { id: 'zepto',   name: 'Zepto',       icon: '🔵', bg: '#8b5cf6' },
  { id: 'blinkit', name: 'Blinkit',     icon: '💛', bg: '#f59e0b' },
];

export function Screen5Platforms({ onNext, onBack }) {
  const [selected, setSelected] = useState(['zomato', 'swiggy']);
  const toggle = id => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <StepShell step={4} total={5}
      title="Select Your Delivery Platforms"
      subtitle="Select all platforms you work with to get comprehensive coverage."
      illustration={<MapIllustration />}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div className="platform-grid">
          {PLATFORMS.map(p => (
            <div key={p.id} className={`platform-card${selected.includes(p.id) ? ' selected' : ''}`}
              onClick={() => toggle(p.id)}>
              <div className="platform-check">✓</div>
              <div className="platform-card-icon" style={{ background: p.bg + '22', border: `1px solid ${p.bg}44` }}>
                {p.icon}
              </div>
              <span className="platform-card-name">{p.name}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: '.68rem', color: 'var(--text3)', textAlign: 'center' }}>
          {selected.length} platform{selected.length !== 1 ? 's' : ''} selected · Tap to select all that apply
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '.75rem' }}>
          <button className="zs-btn" onClick={() => selected.length && onNext(selected)}
            style={{ opacity: selected.length ? 1 : 0.5 }}>
            Continue →
          </button>
          <button className="zs-btn zs-btn-ghost" style={{ width: 'auto', padding: '.85rem 1.5rem' }}
            onClick={onBack}>Back</button>
        </div>
      </div>
    </StepShell>
  );
}

/* ── SCREEN 6: BANK DETAILS ───────────────────────────────── */
export function Screen6Bank({ onNext, onBack }) {
  const [form, setForm] = useState({ holder: '', acct: '', confirm: '', ifsc: '', bank: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <StepShell step={5} total={5}
      title="Add Bank Account Details"
      subtitle="Enter your bank information below for secure and direct payouts."
      illustration={
        <div style={{
          height: 400, borderRadius: 24, background: 'var(--bg2)',
          border: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '1rem', padding: '2rem',
        }}>
          <div style={{ fontSize: '4rem', animation: 'float 3s ease-in-out infinite' }}>💳</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--text1)', marginBottom: '.3rem' }}>Secure UPI Payouts</div>
            <div style={{ fontSize: '.72rem', color: 'var(--text2)', lineHeight: 1.6 }}>Instant payouts to your bank<br/>when a trigger fires in your zone</div>
          </div>
          <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '.5rem' }}>
            {['🔒 256-bit SSL', '⚡ Instant UPI', '🏦 All Banks'].map((b, i) => (
              <div key={i} style={{
                background: 'var(--glass)', border: '1px solid var(--border)',
                borderRadius: 20, padding: '4px 12px', fontSize: '.65rem', color: 'var(--text2)',
              }}>{b}</div>
            ))}
          </div>
        </div>
      }>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Security badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '.65rem 1rem',
          background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)',
          borderRadius: 10, fontSize: '.72rem', color: 'var(--green2)',
        }}>
          🔐 256-bit encrypted secure payout setup
        </div>

        <div>
          <label className="zs-label">Account Holder Name</label>
          <input className="zs-input" placeholder="As per bank records"
            value={form.holder} onChange={e => set('holder', e.target.value)} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
          <div>
            <label className="zs-label">Account Number</label>
            <input className="zs-input" placeholder="Account Number"
              value={form.acct} onChange={e => set('acct', e.target.value.replace(/\D/g,''))}
              inputMode="numeric" type="password" />
          </div>
          <div>
            <label className="zs-label">Confirm Account No.</label>
            <input className="zs-input" placeholder="Confirm Account Number"
              value={form.confirm} onChange={e => set('confirm', e.target.value.replace(/\D/g,''))}
              inputMode="numeric" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
          <div>
            <label className="zs-label">IFSC Code</label>
            <input className="zs-input" placeholder="SBIN0001234"
              value={form.ifsc} onChange={e => set('ifsc', e.target.value.toUpperCase())} />
          </div>
          <div>
            <label className="zs-label">Bank Name</label>
            <input className="zs-input" placeholder="Bank Name"
              value={form.bank} onChange={e => set('bank', e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '.75rem', marginTop: '.25rem' }}>
          <button className="zs-btn" style={{ background: 'linear-gradient(135deg, var(--green), #059669)' }}
            onClick={() => onNext(form)}>
            Secure & Continue →
          </button>
          <button className="zs-btn zs-btn-ghost" style={{ width: 'auto', padding: '.85rem 1.5rem' }}
            onClick={onBack}>Back</button>
        </div>
      </div>
    </StepShell>
  );
}