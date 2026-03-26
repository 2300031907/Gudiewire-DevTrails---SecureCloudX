import { useState, useRef, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#07090f;
  --blue:#4f8ef7;
  --cyan:#36d9c9;
  --green:#22d492;
  --red:#ff4f6a;
  --yellow:#ffd166;
  --text1:#eaf0ff;
  --text2:#7f96b8;
  --text3:#3d5270;
  --card:#0e1624;
  --card2:#111d2e;
  --border:rgba(79,142,247,0.13);
  --border2:rgba(79,142,247,0.28);
  --font:'DM Sans',sans-serif;
  --mono:'Space Mono',monospace;
}

body{
  background:var(--bg);
  font-family:var(--font);
  color:var(--text1);
  -webkit-font-smoothing:antialiased;
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow-x:hidden;
}

/* BG MESH */
.bg-mesh{
  position:fixed;inset:0;pointer-events:none;z-index:0;
  background:
    radial-gradient(ellipse 70% 50% at 20% 20%, rgba(79,142,247,0.07) 0%, transparent 60%),
    radial-gradient(ellipse 60% 60% at 80% 80%, rgba(54,217,201,0.06) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 50% 50%, rgba(34,212,146,0.03) 0%, transparent 70%);
}
.bg-grid{
  position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:
    linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px);
  background-size:48px 48px;
}

/* PAGE WRAPPER */
.page{
  position:relative;z-index:1;
  display:flex;align-items:center;justify-content:center;
  min-height:100vh;width:100%;padding:2rem 1rem;
}

/* PHONE SHELL */
.phone{
  width:375px;
  background:linear-gradient(160deg,#0c1828 0%,#071020 60%,#0a1a2e 100%);
  border-radius:44px;
  border:1.5px solid rgba(79,142,247,0.18);
  box-shadow:
    0 0 0 6px rgba(255,255,255,0.03),
    0 0 0 7px rgba(0,0,0,0.4),
    0 40px 80px rgba(0,0,0,0.6),
    0 0 60px rgba(79,142,247,0.08);
  overflow:hidden;
  position:relative;
}

/* NOTCH */
.notch{
  width:120px;height:30px;
  background:#000;
  border-radius:0 0 20px 20px;
  margin:0 auto;
  position:relative;z-index:10;
}

/* SCROLL CONTENT */
.phone-scroll{
  max-height:780px;
  overflow-y:auto;
  padding:0 0 2rem;
  scrollbar-width:none;
}
.phone-scroll::-webkit-scrollbar{display:none}

/* HEADER */
.ph-header{
  padding:1.25rem 1.5rem 1rem;
  background:linear-gradient(160deg,#0d1e35 0%,#091525 100%);
  border-bottom:1px solid var(--border);
}
.brand-row{
  display:flex;align-items:center;gap:9px;
  margin-bottom:.85rem;
}
.brand-icon{
  width:30px;height:30px;border-radius:8px;
  background:linear-gradient(135deg,var(--blue),var(--cyan));
  display:flex;align-items:center;justify-content:center;
  font-size:.85rem;
  box-shadow:0 0 14px rgba(79,142,247,0.4);
}
.brand-name{
  font-size:.95rem;font-weight:800;letter-spacing:.06em;
  background:linear-gradient(90deg,var(--text1),var(--cyan));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
}
.welcome-text{font-size:.82rem;color:var(--text2);line-height:1.5}
.welcome-text strong{color:var(--text1)}

/* GAUGE BADGE */
.gauge-badge{
  position:absolute;right:1.25rem;top:1.1rem;
  width:44px;height:44px;
}

/* SECTION */
.section{
  margin:1rem .9rem 0;
  background:var(--card);
  border:1px solid var(--border);
  border-radius:16px;
  overflow:hidden;
  animation:fadeUp .4s ease both;
}
.section:nth-child(2){animation-delay:.05s}
.section:nth-child(3){animation-delay:.1s}
.section:nth-child(4){animation-delay:.15s}
@keyframes fadeUp{
  from{opacity:0;transform:translateY(12px)}
  to{opacity:1;transform:translateY(0)}
}

.sec-header{
  padding:.6rem .85rem;
  background:rgba(79,142,247,0.06);
  border-bottom:1px solid var(--border);
  font-size:.65rem;font-weight:700;
  text-transform:uppercase;letter-spacing:.1em;
  color:var(--blue);display:flex;align-items:center;gap:6px;
}
.sec-num{
  width:16px;height:16px;border-radius:50%;
  background:var(--blue);color:#fff;
  font-size:.6rem;font-weight:800;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
}

/* PHONE INPUT */
.sec-body{padding:.85rem}
.phone-input-row{
  display:flex;gap:.5rem;margin-bottom:.75rem;
}
.country-select{
  display:flex;align-items:center;gap:4px;
  background:var(--card2);border:1px solid var(--border);
  border-radius:10px;padding:.5rem .65rem;
  font-size:.75rem;font-weight:600;color:var(--text2);
  cursor:pointer;flex-shrink:0;transition:border-color .2s;
  white-space:nowrap;
}
.country-select:hover{border-color:var(--border2)}
.flag{font-size:.9rem}
.ph-input{
  flex:1;background:var(--card2);border:1px solid var(--border);
  border-radius:10px;padding:.5rem .75rem;
  font-size:.8rem;font-family:var(--mono);color:var(--text1);
  outline:none;transition:border-color .2s,box-shadow .2s;
  letter-spacing:.05em;
}
.ph-input:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(79,142,247,0.1)}
.ph-input::placeholder{color:var(--text3);font-family:var(--mono)}

/* OTP */
.otp-label{font-size:.7rem;font-weight:600;color:var(--text2);margin-bottom:.5rem;text-transform:uppercase;letter-spacing:.06em}
.otp-row{display:flex;gap:.5rem;margin-bottom:.55rem}
.otp-box{
  flex:1;height:44px;
  background:var(--card2);border:1.5px solid var(--border);
  border-radius:10px;
  font-size:1rem;font-weight:700;font-family:var(--mono);
  color:var(--text1);text-align:center;outline:none;
  transition:border-color .2s,box-shadow .2s,background .2s;
  caret-color:var(--blue);
}
.otp-box:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(79,142,247,0.12);background:rgba(79,142,247,0.05)}
.otp-box.filled{border-color:rgba(34,212,146,0.4);background:rgba(34,212,146,0.04)}
.otp-meta{display:flex;align-items:center;justify-content:space-between}
.resend-btn{
  font-size:.67rem;font-weight:600;color:var(--blue);
  background:none;border:none;cursor:pointer;padding:0;
  transition:opacity .2s;
}
.resend-btn:hover{opacity:.7}
.resend-hint{font-size:.65rem;color:var(--text3)}

/* PLATFORM GRID */
.platform-grid{
  display:grid;grid-template-columns:1fr 1fr;
  gap:.5rem;
}
.platform-tip{
  grid-column:1/-1;
  font-size:.62rem;color:var(--text3);text-align:center;
  padding:.3rem 0 0;
}
.platform-item{
  display:flex;align-items:center;gap:.6rem;
  background:var(--card2);border:1.5px solid var(--border);
  border-radius:12px;padding:.65rem .75rem;
  cursor:pointer;transition:all .2s;position:relative;
}
.platform-item:hover{border-color:var(--border2);background:rgba(79,142,247,0.05)}
.platform-item.selected{
  border-color:rgba(34,212,146,0.45);
  background:rgba(34,212,146,0.06);
}
.pl-icon{font-size:1.3rem;flex-shrink:0}
.pl-name{font-size:.72rem;font-weight:600;color:var(--text1);line-height:1.3}
.pl-check{
  position:absolute;top:.5rem;right:.6rem;
  width:16px;height:16px;border-radius:4px;
  border:1.5px solid var(--border2);
  background:var(--card);
  display:flex;align-items:center;justify-content:center;
  font-size:.6rem;transition:all .2s;
}
.platform-item.selected .pl-check{
  background:var(--green);border-color:var(--green);color:#fff;
}

/* ACCOUNT SETTINGS */
.setting-row{
  display:flex;align-items:center;gap:.65rem;
  padding:.55rem 0;
}
.setting-row:not(:last-child){border-bottom:1px solid var(--border)}
.set-icon{font-size:1rem;flex-shrink:0}
.set-text{flex:1;font-size:.75rem;color:var(--text2)}
.set-text strong{color:var(--text1);font-weight:700}
.set-val{font-family:var(--mono);font-size:.72rem;font-weight:700;color:var(--cyan)}

/* CTA */
.cta-wrap{padding:.85rem .9rem .5rem}
.cta-btn{
  width:100%;padding:.85rem;
  background:linear-gradient(135deg,var(--green) 0%,#1ab87a 100%);
  border:none;border-radius:14px;
  font-size:.9rem;font-weight:800;font-family:var(--font);
  color:#062010;letter-spacing:.04em;
  cursor:pointer;transition:all .2s;
  box-shadow:0 4px 20px rgba(34,212,146,0.3);
  text-transform:uppercase;
}
.cta-btn:hover{transform:translateY(-1px);box-shadow:0 6px 28px rgba(34,212,146,0.4)}
.cta-btn:active{transform:translateY(0)}
.login-link{
  text-align:center;font-size:.7rem;color:var(--text3);
  padding:.5rem 0 .25rem;
}
.login-link a{color:var(--blue);font-weight:600;text-decoration:none}
.login-link a:hover{text-decoration:underline}

/* GAUGE SVG */
.gauge-mini-svg{width:44px;height:44px}
`;

const PLATFORMS = [
  { id: "zomato", icon: "🛵", name: "Zepto / Blinkit\nInstamart" },
  { id: "uber", icon: "🚗", name: "Uber / Ola\nDriver" },
  { id: "urban", icon: "🔧", name: "Urban Company\nService" },
  { id: "porter", icon: "📦", name: "Porter / Lynk\nServices" },
];

function MiniGauge() {
  const r = 16, cx = 22, cy = 22;
  const segs = [
    { color: "#22d492", a1: -175, a2: -135 },
    { color: "#ffd166", a1: -132, a2: -92 },
    { color: "#ff9840", a1: -89, a2: -49 },
    { color: "#ff4f6a", a1: -46, a2: -6 },
  ];
  const pt = (a) => ({
    x: cx + r * Math.cos((a * Math.PI) / 180),
    y: cy + r * Math.sin((a * Math.PI) / 180),
  });
  const arc = (a1, a2) => {
    const s = pt(a1), e = pt(a2);
    return `M ${s.x} ${s.y} A ${r} ${r} 0 0 1 ${e.x} ${e.y}`;
  };
  const needleA = -100;
  const nr = (needleA * Math.PI) / 180;
  const nx = cx + 12 * Math.cos(nr), ny = cy + 12 * Math.sin(nr);
  return (
    <svg viewBox="0 0 44 44" className="gauge-mini-svg">
      {segs.map((s, i) => (
        <path key={i} d={arc(s.a1, s.a2)} fill="none"
          stroke={s.color} strokeWidth="3.5" strokeLinecap="round" opacity={i === 3 ? 1 : 0.5} />
      ))}
      <line x1={cx} y1={cy} x2={nx} y2={ny}
        stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="2.5" fill="white" />
    </svg>
  );
}

export default function SignIn() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["1", "2", "3", "4", "5", "6"]);
  const [selected, setSelected] = useState(["zomato"]);
  const [timer, setTimer] = useState(45);
  const otpRefs = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const handleOtp = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const togglePlatform = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <>
      <style>{CSS}</style>
      <div className="bg-mesh" />
      <div className="bg-grid" />
      <div className="page">
        <div className="phone">
          <div className="notch" />
          <div className="phone-scroll">

            {/* HEADER */}
            <div className="ph-header" style={{ position: "relative" }}>
              <div className="brand-row">
                <div className="brand-icon">🛡️</div>
                <span className="brand-name">ZEROSHIELD</span>
              </div>
              <div className="welcome-text">
                Welcome to <strong>ZeroShield!</strong><br />
                Your Earnings Protection.
              </div>
              <div className="gauge-badge">
                <MiniGauge />
              </div>
            </div>

            {/* SECTION 1 — ACCOUNT VERIFICATION */}
            <div className="section">
              <div className="sec-header">
                <div className="sec-num">1</div>
                Account Verification
              </div>
              <div className="sec-body">
                <div className="phone-input-row">
                  <div className="country-select">
                    <span className="flag">🇮🇳</span>
                    +91 ▾
                  </div>
                  <input
                    className="ph-input"
                    placeholder="88XXXXXXXX"
                    value={phone}
                    maxLength={10}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                  />
                </div>

                <div className="otp-label">Enter OTP</div>
                <div className="otp-row">
                  {otp.map((v, i) => (
                    <input
                      key={i}
                      ref={el => otpRefs.current[i] = el}
                      className={`otp-box${v ? " filled" : ""}`}
                      maxLength={1}
                      value={v}
                      onChange={e => handleOtp(i, e.target.value)}
                      onKeyDown={e => handleOtpKey(i, e)}
                      inputMode="numeric"
                    />
                  ))}
                </div>
                <div className="otp-meta">
                  <button className="resend-btn" onClick={() => setTimer(45)}>
                    Resend OTP ({pad(Math.floor(timer / 60))}:{pad(timer % 60)})
                  </button>
                  <span className="resend-hint">
                    OTP sent to 88XXXXXXXX
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION 2 — PLATFORM SELECTION */}
            <div className="section">
              <div className="sec-header">
                <div className="sec-num">2</div>
                Platform Selection
              </div>
              <div className="sec-body">
                <div className="platform-grid">
                  {PLATFORMS.map(p => (
                    <div
                      key={p.id}
                      className={`platform-item${selected.includes(p.id) ? " selected" : ""}`}
                      onClick={() => togglePlatform(p.id)}
                    >
                      <span className="pl-icon">{p.icon}</span>
                      <span className="pl-name">{p.name.replace("\\n", "\n")}</span>
                      <div className="pl-check">
                        {selected.includes(p.id) ? "✓" : ""}
                      </div>
                    </div>
                  ))}
                  <div className="platform-tip">Tap to select all that apply</div>
                </div>
              </div>
            </div>

            {/* SECTION 3 — ACCOUNT SETTINGS */}
            <div className="section">
              <div className="sec-header">
                <div className="sec-num">3</div>
                Account Settings <span style={{ color: "var(--text3)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(Partial)</span>
              </div>
              <div className="sec-body">
                <div className="setting-row">
                  <span className="set-icon">⭐</span>
                  <span className="set-text">
                    Setup level: <strong>Rookie Partner</strong>
                  </span>
                </div>
                <div className="setting-row">
                  <span className="set-icon">🛡️</span>
                  <span className="set-text">
                    Weekly Income Protection starts at
                  </span>
                  <span className="set-val">₹5,000 / week</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="cta-wrap">
              <button className="cta-btn">Continue</button>
              <div className="login-link">
                Already a user? <a href="#">Log In</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}