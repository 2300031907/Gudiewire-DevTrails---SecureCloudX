// OnboardingSteps.jsx — Steps 1–5 (mobile, OTP, profile, platforms, bank)
import { useState, useRef, useEffect } from 'react';
import styles from './OnboardingSteps.module.css';

/* ── STEP WRAPPER ─────────────────────────────────────────── */
function StepShell({ step, total, title, subtitle, illustration, children }) {
  return (
    <div className={styles.shell}>
      {/* Progress */}
      <div className={styles.progress}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={[
            styles.stepDot,
            i < step - 1 ? styles.stepDotDone : i === step - 1 ? styles.stepDotActive : styles.stepDotInactive
          ].join(' ')} />
        ))}
        <span className={styles.stepLabel}>Step {step} of {total}</span>
      </div>

      {/* Main panel */}
      <div className={styles.cols}>
        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>{title}</h2>
          <p className={styles.formSubtitle}>{subtitle}</p>
          {children}
        </div>
        <div className={styles.illustrationWrap}>
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
    <div className={styles.illustration} style={{ background: `${s.bg}, var(--bg2)` }}>
      {[200, 150, 100].map((sz, i) => (
        <div key={i} className={styles.ring} style={{ width: sz, height: sz,
          border: `1.5px solid rgba(59,130,246,${0.08 + i * 0.05})`,
          animationDuration: `${20 - i * 5}s`,
          animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
        }} />
      ))}
      <div className={styles.scooterEmoji}>🛵</div>
      <div className={styles.topRightEmoji}>{s.emoji}</div>
      <div className={styles.bottomLeftEmoji}>🛡️</div>
    </div>
  );
}

/* ── MAP ILLUSTRATION ────────────────────────────────────── */
function MapIllustration() {
  return (
    <div className={styles.illustration} style={{ background: 'var(--bg2)' }}>
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
        {[0,1,2,3,4,5,6].map(i => <line key={i} x1={i*60} y1="0" x2={i*60} y2="400" stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>)}
        {[0,1,2,3,4,5,6,7].map(i => <line key={i} x1="0" y1={i*56} x2="380" y2={i*56} stroke="rgba(59,130,246,0.06)" strokeWidth="1"/>)}
        <ellipse cx="190" cy="200" rx="140" ry="140" fill="url(#mg1)" />
        <ellipse cx="190" cy="200" rx="90" ry="90" fill="url(#mg2)" />
        <path d="M0 200 Q100 150 190 200 Q280 250 380 200" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3"/>
        <path d="M190 0 Q220 100 190 200 Q160 300 190 400" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
        {[[185,195],[220,160],[155,230],[210,220]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#22d3ee" opacity=".9" />
        ))}
        <circle cx="190" cy="200" r="10" fill="none" stroke="rgba(59,130,246,0.6)" strokeWidth="1.5" />
      </svg>
      <div className={styles.mapLabel}>Kondapur Dark Store · 3km Zone</div>
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
      <div className={styles.fields}>
        <div>
          <label className={styles.zsLabel}>Mobile Number</label>
          <div className={styles.phoneRow}>
            <div className={styles.countryPrefix}>🇮🇳 +91</div>
            <input className={styles.zsInput} placeholder="9876543210"
              value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,''))}
              maxLength={10} inputMode="numeric" />
          </div>
        </div>
        <div className={styles.infoBox}>
          📱 We'll send a 6-digit OTP to verify your number. Standard SMS rates apply.
        </div>
        <button
  className={styles.zsBtn}
  onClick={async () => {
    if (phone.length !== 10) {
      alert('Enter valid 10-digit number');
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ phone })
      });

      const data = await response.json();

      console.log("OTP:", data.otp); // for testing

      onNext(phone);

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send OTP");
    }
  }}
>
  Send OTP →
</button>
      </div>
    </StepShell>
  );
}

/* ── SCREEN 3: OTP ────────────────────────────────────────── */
export function Screen3OTP({ phone, onNext }) {
  const [otp, setOtp] = useState(['','','','','','']);
  const [timer, setTimer] = useState(52);
  const refs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  // Countdown — restarts whenever timer changes (and is > 0)
  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const handleChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp]; next[i] = v; setOtp(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g,'').slice(0, 6);
    const next = [...otp];
    pasted.split('').forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const pad = n => String(n).padStart(2, '0');
  const filled = otp.every(v => v !== '');

  return (
    <StepShell step={2} total={5}
      title="Verify Your Mobile Number"
      subtitle={`Enter the 6-digit code sent to +91 ${phone || '98765 43210'}`}
      illustration={<RiderIllustration variant="rain" />}>
      <div className={styles.fields}>
        <div>
          <label className={styles.zsLabel}>Enter OTP</label>
          <div className={styles.otpRow} onPaste={handlePaste}>
            {otp.map((v, i) => (
              <input
                key={i}
                ref={el => refs.current[i] = el}
                className={[styles.otpBox, v ? styles.otpBoxFilled : ''].join(' ')}
                maxLength={1}
                value={v}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKey(i, e)}
                inputMode="numeric"
              />
            ))}
          </div>
        </div>

        <div className={styles.otpMeta}>
          <span className={styles.otpMetaLeft}>Didn't receive code?</span>
          <button
            className={styles.resendBtn}
            style={{ color: timer > 0 ? 'var(--text3)' : 'var(--blue2)', cursor: timer > 0 ? 'not-allowed' : 'pointer' }}
            onClick={() => timer === 0 && setTimer(60)}
          >
            Resend OTP {timer > 0 ? `(${pad(Math.floor(timer/60))}:${pad(timer%60)})` : ''}
          </button>
        </div>

        <div className={styles.phoneDisplay}>
          <span>🇮🇳</span>
          <span style={{ fontSize: '.78rem', color: 'var(--text2)', fontFamily: 'var(--mono)' }}>
            +91 {phone || '98765 43210'}
          </span>
        </div>

        <button
  className={styles.zsBtn}
  onClick={async () => {
    if (!filled) return;

    const enteredOtp = otp.join("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone,
          otp: enteredOtp
        })
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("OTP Verified ✅");
        onNext(phone); // move to profile screen
      } else {
        alert("Invalid OTP ❌");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Verification failed");
    }
  }}
  style={{ opacity: filled ? 1 : 0.5, cursor: filled ? 'pointer' : 'not-allowed' }}
>
  Verify & Continue →
</button>
      </div>
    </StepShell>
  );
}

/* ── SCREEN 4: PROFILE ────────────────────────────────────── */
export function Screen4Profile({ onNext, onBack, phone }) {
  const [form, setForm] = useState({ name: '', city: '', vehicle: 'Bike', platform: '', exp: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <StepShell step={3} total={5}
      title="Tell Us About Yourself"
      subtitle="We need a few details to set up your partner account."
      illustration={<RiderIllustration variant="rain" />}>
      <div className={styles.fields}>
        <div className={styles.grid2}>
          <div>
            <label className={styles.zsLabel}>Full Name</label>
            <input className={styles.zsInput} placeholder="e.g. Rahul Sharma"
              value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label className={styles.zsLabel}>City</label>
            <input className={styles.zsInput} placeholder="e.g. Bengaluru"
              value={form.city} onChange={e => set('city', e.target.value)} />
          </div>
        </div>

        <div>
          <label className={styles.zsLabel}>Vehicle Type</label>
          <div className={styles.vehicleRow}>
            {['Bike', 'Scooter', 'Cycle'].map(v => (
              <button key={v} onClick={() => set('vehicle', v)}
                className={[styles.vehicleBtn, form.vehicle === v ? styles.vehicleBtnActive : styles.vehicleBtnDefault].join(' ')}>
                {v === 'Bike' ? '🏍️' : v === 'Scooter' ? '🛵' : '🚲'} {v}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={styles.zsLabel}>Primary Work Platform</label>
          <select className={styles.zsInput} value={form.platform} onChange={e => set('platform', e.target.value)}
            style={{ appearance: 'none', cursor: 'pointer' }}>
            <option value="">Select your main platform</option>
            {['Swiggy','Zomato','Porter','Dunzo','Zepto','Uber Eats','Amazon Flex'].map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.zsLabel}>Experience (in months)</label>
          <input className={styles.zsInput} placeholder="e.g. 18"
            value={form.exp} onChange={e => set('exp', e.target.value.replace(/\D/g,''))}
            inputMode="numeric" />
        </div>

        <div className={styles.btnRow}>
          <button className={styles.zsBtn} onClick={() => onNext({...form, phone})}>Continue →</button>
          <button className={[styles.zsBtn, styles.zsBtnGhost].join(' ')} onClick={onBack}>Back</button>
        </div>
      </div>
    </StepShell>
  );
}

/* ── SCREEN 5: PLATFORMS ──────────────────────────────────── */


const PLATFORMS = [
  { id: 'zomato',  name: 'Zomato',     icon: '🛵', bg: '#e23744' },
  { id: 'swiggy',  name: 'Swiggy',     icon: '🍊', bg: '#fc8019' },
  { id: 'uber',    name: 'Uber',       icon: '🚗', bg: '#1c1c1c' },
  { id: 'ola',     name: 'Ola',        icon: '🟡', bg: '#1c2b33' },
  { id: 'amazon',  name: 'Amazon Flex',icon: '📦', bg: '#232f3e' },
  { id: 'dunzo',   name: 'Dunzo',      icon: '⚡', bg: '#00b37e' },
  { id: 'zepto',   name: 'Zepto',      icon: '🔵', bg: '#8b5cf6' },
  { id: 'blinkit', name: 'Blinkit',    icon: '💛', bg: '#f59e0b' },
];

export function Screen5Platforms({ onNext, onBack, phone }) {
  const [selected, setSelected] = useState(['zomato', 'swiggy']);

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {

    // 🔥 check phone
    if (!phone) {
      console.error("PHONE IS MISSING ❌");
      alert("Phone missing");
      return;
    }
  
    // ✅ validation
    if (selected.length === 0) {
      alert("Please select at least one platform");
      return;
    }
  
    // ✅ debug
    console.log("PHONE:", phone);
    console.log("PLATFORMS:", selected);
  
    // ✅ just move forward (NO API here)
    onNext(selected);
  };

  return (
    <StepShell
      step={4}
      total={5}
      title="Select Your Delivery Platforms"
      subtitle="Select all platforms you work with to get comprehensive coverage."
      illustration={<MapIllustration />}
    >
      <div className={styles.fields}>

        <div className={styles.platformGrid}>
          {PLATFORMS.map(p => (
            <div
              key={p.id}
              className={[
                styles.platformCard,
                selected.includes(p.id) ? styles.platformCardSelected : ''
              ].join(' ')}
              onClick={() => toggle(p.id)}
            >
              <div className={styles.platformCheck}>✓</div>

              <div
                className={styles.platformCardIcon}
                style={{
                  background: p.bg + '22',
                  border: `1px solid ${p.bg}44`
                }}
              >
                {p.icon}
              </div>

              <span className={styles.platformCardName}>
                {p.name}
              </span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: '.68rem', color: 'var(--text3)', textAlign: 'center' }}>
          {selected.length} platform{selected.length !== 1 ? 's' : ''} selected
        </div>

        <div className={styles.btnRow}>

          <button className={styles.zsBtn} onClick={handleContinue}>
            Continue →
          </button>

          <button
            className={[styles.zsBtn, styles.zsBtnGhost].join(' ')}
            onClick={onBack}
          >
            Back
          </button>

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
        <div className={styles.bankIllustration}>
          <div className={styles.bankIcon}>💳</div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '.85rem', fontWeight: 700, color: 'var(--text1)', marginBottom: '.3rem' }}>Secure UPI Payouts</div>
            <div style={{ fontSize: '.72rem', color: 'var(--text2)', lineHeight: 1.6 }}>
              Instant payouts to your bank<br/>when a trigger fires in your zone
            </div>
          </div>
          <div className={styles.bankBadges}>
            {['🔒 256-bit SSL', '⚡ Instant UPI', '🏦 All Banks'].map((b, i) => (
              <div key={i} className={styles.bankBadge}>{b}</div>
            ))}
          </div>
        </div>
      }>
      <div className={styles.fields}>
        <div className={styles.securityBadge}>
          🔐 256-bit encrypted secure payout setup
        </div>

        <div>
          <label className={styles.zsLabel}>Account Holder Name</label>
          <input className={styles.zsInput} placeholder="As per bank records"
            value={form.holder} onChange={e => set('holder', e.target.value)} />
        </div>

        <div className={styles.grid2}>
          <div>
            <label className={styles.zsLabel}>Account Number</label>
            <input className={styles.zsInput} placeholder="Account Number"
              value={form.acct} onChange={e => set('acct', e.target.value.replace(/\D/g,''))}
              inputMode="numeric" type="password" />
          </div>
          <div>
            <label className={styles.zsLabel}>Confirm Account No.</label>
            <input className={styles.zsInput} placeholder="Confirm Account Number"
              value={form.confirm} onChange={e => set('confirm', e.target.value.replace(/\D/g,''))}
              inputMode="numeric" />
          </div>
        </div>

        <div className={styles.grid2}>
          <div>
            <label className={styles.zsLabel}>IFSC Code</label>
            <input className={styles.zsInput} placeholder="SBIN0001234"
              value={form.ifsc} onChange={e => set('ifsc', e.target.value.toUpperCase())} />
          </div>
          <div>
            <label className={styles.zsLabel}>Bank Name</label>
            <input className={styles.zsInput} placeholder="Bank Name"
              value={form.bank} onChange={e => set('bank', e.target.value)} />
          </div>
        </div>

        <div className={styles.btnRow}>
          <button className={styles.confirmBtn} onClick={() => onNext(form)}>
            Secure & Continue →
          </button>
          <button className={[styles.zsBtn, styles.zsBtnGhost].join(' ')} onClick={onBack}>Back</button>
        </div>
      </div>
    </StepShell>
  );
}