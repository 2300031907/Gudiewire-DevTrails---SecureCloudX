// Settings.jsx — ZeroShield Settings Page
// Integration: add screen 10 in App.jsx (see bottom of this file for snippet)
// Props:
//   userData       — from App.jsx state
//   onClose        — () => go(6)   back to Dashboard
//   onSignOut      — () => go(7)
//   onOpenProfile  — () => go(9)

import React, { useState } from "react";
import "./Settings.css";

/* ─── Primitives ──────────────────────────────────── */

function ToggleSwitch({ id, checked, onChange, label, description }) {
  return (
    <div className="zs-toggle-row">
      <div className="zs-toggle-info">
        <label htmlFor={id} className="zs-toggle-label">{label}</label>
        {description && <p className="zs-toggle-desc">{description}</p>}
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        className={`zs-toggle-btn ${checked ? "on" : "off"}`}
        onClick={() => onChange(!checked)}
      >
        <span className="zs-toggle-thumb" />
      </button>
    </div>
  );
}

function SectionCard({ title, subtitle, icon, accentColor = "#3b82f6", children }) {
  return (
    <div className="zs-card">
      <div className="zs-card-header">
        <div className="zs-card-icon" style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
          {icon}
        </div>
        <div>
          <h2 className="zs-card-title">{title}</h2>
          {subtitle && <p className="zs-card-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="zs-card-body">{children}</div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────── */

export default function Settings({ userData = {}, onClose, onSignOut, onOpenProfile }) {
  const [profile, setProfile] = useState({
    firstName:    userData.name?.split(" ")[0] || "Ravi",
    lastName:     userData.name?.split(" ")[1] || "Kumar",
    city:         userData.city || "Hyderabad",
    vehicleType:  userData.vehicle || "2-Wheeler",
    workingHours: "8",
  });

  const [deliveryPrefs, setDeliveryPrefs] = useState({
    highDemandAlerts:   true,
    unsafeAreaAlerts:   true,
    weatherSuggestions: false,
  });

  const [riskAlerts, setRiskAlerts] = useState({
    rainAlerts:      true,
    heatAlerts:      false,
    pollutionAlerts: true,
    lowDemandAlerts: false,
  });

  const [coverage, setCoverage] = useState({
    level:          "standard",
    autoProtection: true,
    dailyLimit:     500,
  });

  const [security, setSecurity]   = useState({ twoFA: false });
  const [saved,    setSaved]      = useState(false);
  const [activeNav, setActiveNav] = useState("profile");

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const tog = (setter, key) => (val) => setter((p) => ({ ...p, [key]: val }));

  const NAV = [
    { id: "profile",  icon: "👤", label: "Profile Info"   },
    { id: "delivery", icon: "🚚", label: "Delivery Prefs" },
    { id: "risk",     icon: "⚠️", label: "Risk Alerts"    },
    { id: "coverage", icon: "🛡️", label: "Coverage"       },
    { id: "security", icon: "🔐", label: "Security"       },
    { id: "gigscore", icon: "📊", label: "GigScore"       },
  ];

  const scrollTo = (id) => {
    setActiveNav(id);
    document.getElementById(`zs-sec-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="zs-settings-root">

      {/* ── Top Nav ── */}
      <nav className="zs-topnav">
        <div className="zs-topnav-left">
          <div className="zs-topnav-logo">🛡️</div>
          <span className="zs-topnav-brand">ZEROSHIELD</span>
          <span className="zs-topnav-crumb">/ Settings</span>
        </div>
        <div className="zs-topnav-right">
          <button className="zs-topnav-profile" onClick={onOpenProfile}>
            <div className="zs-nav-avatar">
              {(userData?.name || "RK").slice(0, 2).toUpperCase()}
            </div>
            <span>{userData?.name || "My Account"}</span>
          </button>
          <button className="zs-topnav-back" onClick={onClose}>← Dashboard</button>
          <button className="zs-topnav-signout" onClick={onSignOut}>🚪 Sign Out</button>
        </div>
      </nav>

      <div className="zs-layout">

        {/* ── Sidebar ── */}
        <aside className="zs-sidebar">
          <p className="zs-nav-section-label">SETTINGS</p>
          {NAV.map((item) => (
            <button
              key={item.id}
              className={`zs-nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => scrollTo(item.id)}
            >
              <span className="zs-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <div className="zs-nav-divider" />
          <p className="zs-nav-section-label">ACCOUNT</p>

          <button className="zs-nav-item" onClick={onOpenProfile}>
            <span className="zs-nav-icon">👤</span><span>My Profile</span>
          </button>
          <button className="zs-nav-item" onClick={onClose}>
            <span className="zs-nav-icon">⊞</span><span>Dashboard</span>
          </button>

          <div className="zs-shield-status">
            <span className="zs-shield-dot" />
            <div>
              <p className="zs-shield-title">Standard Shield</p>
              <p className="zs-shield-sub">Active · {profile.city}</p>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="zs-main">
          <div className="zs-page-header">
            <div>
              <h1 className="zs-page-title">Settings</h1>
              <p className="zs-page-sub">Manage account, coverage & alert preferences</p>
            </div>
            <button className={`zs-save-btn ${saved ? "saved" : ""}`} onClick={handleSave}>
              {saved ? "✓  Saved!" : "Save Changes"}
            </button>
          </div>

          {/* ───── 1. Profile Info ───── */}
          <div id="zs-sec-profile">
            <SectionCard title="Profile Information" subtitle="Personal details & delivery setup" icon="👤" accentColor="#3b82f6">
              <div className="zs-avatar-row">
                <div className="zs-avatar-lg">
                  {profile.firstName[0]}{profile.lastName[0]}
                </div>
                <div>
                  <button className="zs-upload-btn">Upload Photo</button>
                  <p className="zs-upload-hint">PNG, JPEG under 10MB</p>
                </div>
              </div>
              <div className="zs-form-grid">
                <div className="zs-form-group">
                  <label>First Name</label>
                  <input value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} placeholder="First name" />
                </div>
                <div className="zs-form-group">
                  <label>Last Name</label>
                  <input value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} placeholder="Last name" />
                </div>
                <div className="zs-form-group">
                  <label>City</label>
                  <select value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })}>
                    {["Hyderabad", "Bangalore", "Mumbai", "Delhi", "Chennai", "Pune", "Kolkata"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="zs-form-group">
                  <label>Vehicle Type</label>
                  <select value={profile.vehicleType} onChange={(e) => setProfile({ ...profile, vehicleType: e.target.value })}>
                    {["2-Wheeler", "3-Wheeler", "4-Wheeler", "Bicycle", "On Foot"].map((v) => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div className="zs-form-group zs-span2">
                  <label>Working Hours (per day)</label>
                  <div className="zs-range-row">
                    <input type="range" min="1" max="16" value={profile.workingHours}
                      onChange={(e) => setProfile({ ...profile, workingHours: e.target.value })}
                      className="zs-range" />
                    <span className="zs-range-badge">{profile.workingHours}h / day</span>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ───── 2. Delivery Preferences ───── */}
          <div id="zs-sec-delivery">
            <SectionCard title="Delivery Preferences" subtitle="Zone alerts and routing suggestions" icon="🚚" accentColor="#22d3ee">
              <ToggleSwitch id="highDemand" label="High-Demand Zone Alerts"
                description="Get notified when surge zones activate near you"
                checked={deliveryPrefs.highDemandAlerts} onChange={tog(setDeliveryPrefs, "highDemandAlerts")} />
              <ToggleSwitch id="unsafeArea" label="Unsafe Area Alerts"
                description="Warnings when entering flagged delivery zones"
                checked={deliveryPrefs.unsafeAreaAlerts} onChange={tog(setDeliveryPrefs, "unsafeAreaAlerts")} />
              <ToggleSwitch id="weatherSug" label="Weather Suggestions"
                description="Route adjustments and shift tips based on live weather"
                checked={deliveryPrefs.weatherSuggestions} onChange={tog(setDeliveryPrefs, "weatherSuggestions")} />
            </SectionCard>
          </div>

          {/* ───── 3. Risk Alerts ───── */}
          <div id="zs-sec-risk">
            <SectionCard title="Risk Alerts" subtitle="Environmental and demand risk notifications" icon="⚠️" accentColor="#f59e0b">
              <ToggleSwitch id="rain" label="Rain Alerts"
                description="Notified before heavy rain affects your delivery route"
                checked={riskAlerts.rainAlerts} onChange={tog(setRiskAlerts, "rainAlerts")} />
              <ToggleSwitch id="heat" label="Heat Alerts"
                description="Warnings when temperature exceeds safe riding thresholds"
                checked={riskAlerts.heatAlerts} onChange={tog(setRiskAlerts, "heatAlerts")} />
              <ToggleSwitch id="pollution" label="Pollution Alerts"
                description="AQI warnings when air quality drops in your zone"
                checked={riskAlerts.pollutionAlerts} onChange={tog(setRiskAlerts, "pollutionAlerts")} />
              <ToggleSwitch id="lowDemand" label="Low-Demand Alerts"
                description="Know when order volume drops sharply in your zone"
                checked={riskAlerts.lowDemandAlerts} onChange={tog(setRiskAlerts, "lowDemandAlerts")} />
            </SectionCard>
          </div>

          {/* ───── 4. Coverage Settings ───── */}
          <div id="zs-sec-coverage">
            <SectionCard title="Coverage Settings" subtitle="Manage your ZeroShield protection plan" icon="🛡️" accentColor="#10b981">
              <p className="zs-field-label" style={{ marginBottom: ".6rem" }}>Coverage Level</p>
              <div className="zs-cov-tabs">
                {[
                  { id: "basic",    label: "Basic",    price: "₹200/day", note: "Accident & theft" },
                  { id: "standard", label: "Standard", price: "₹350/day", note: "+ Weather damage", rec: true },
                  { id: "premium",  label: "Premium",  price: "₹600/day", note: "+ Health & income" },
                ].map((lvl) => (
                  <button key={lvl.id}
                    className={`zs-cov-tab ${coverage.level === lvl.id ? "active" : ""}`}
                    onClick={() => setCoverage({ ...coverage, level: lvl.id })}>
                    <span className="zs-cov-name">{lvl.label}</span>
                    <span className="zs-cov-price">{lvl.price}</span>
                    <span className="zs-cov-note">{lvl.note}</span>
                    {lvl.rec && <span className="zs-cov-rec">Recommended</span>}
                  </button>
                ))}
              </div>

              <div className="zs-divider" />

              <ToggleSwitch id="autoProtect" label="Auto-Protection"
                description="Automatically activate coverage when you start a delivery shift"
                checked={coverage.autoProtection} onChange={tog(setCoverage, "autoProtection")} />

              <div style={{ marginTop: "1.25rem" }}>
                <p className="zs-field-label" style={{ marginBottom: ".5rem" }}>Daily Protection Limit</p>
                <div className="zs-range-row">
                  <input type="range" min="100" max="2000" step="50"
                    value={coverage.dailyLimit}
                    onChange={(e) => setCoverage({ ...coverage, dailyLimit: Number(e.target.value) })}
                    className="zs-range green" />
                  <span className="zs-range-badge green">₹{coverage.dailyLimit.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ───── 5. Security ───── */}
          <div id="zs-sec-security">
            <SectionCard title="Security Settings" subtitle="Keep your ZeroShield account secure" icon="🔐" accentColor="#8b5cf6">
              <div className="zs-sec-row">
                <div>
                  <p className="zs-toggle-label">Password</p>
                  <p className="zs-toggle-desc">Update your account login password</p>
                </div>
                <button className="zs-outline-btn">Change Password</button>
              </div>
              <div className="zs-divider" />
              <ToggleSwitch id="twoFA" label="Two-Factor Authentication"
                description="Receive OTP on your registered mobile for every login"
                checked={security.twoFA} onChange={tog(setSecurity, "twoFA")} />
              <div className="zs-divider" />
              <div className="zs-sec-row">
                <div>
                  <p className="zs-toggle-label">Active Sessions</p>
                  <p className="zs-toggle-desc">Sign out from all devices except this one</p>
                </div>
                <button className="zs-danger-btn">Logout All Devices</button>
              </div>
            </SectionCard>
          </div>

          {/* ───── 6. GigScore Personalization ───── */}
          <div id="zs-sec-gigscore">
            <SectionCard title="GigScore Personalization" subtitle="Your alerts adapt in real-time based on these factors" icon="📊" accentColor="#22d3ee">
              <div className="zs-gs-grid">
                {[
                  { label: "City",          value: profile.city,                                                                          icon: "📍" },
                  { label: "Weather Risk",   value: riskAlerts.rainAlerts || riskAlerts.heatAlerts ? "Active" : "Inactive",               icon: "🌦" },
                  { label: "Demand Zones",   value: deliveryPrefs.highDemandAlerts ? "Tracking" : "Off",                                  icon: "📡" },
                  { label: "Working Hours",  value: `${profile.workingHours}h / day`,                                                      icon: "⏱" },
                  { label: "Coverage",       value: coverage.level.charAt(0).toUpperCase() + coverage.level.slice(1),                     icon: "🛡" },
                  { label: "Vehicle",        value: profile.vehicleType,                                                                   icon: "🚴" },
                ].map(({ label, value, icon }) => (
                  <div className="zs-gs-item" key={label}>
                    <span className="zs-gs-icon">{icon}</span>
                    <div>
                      <p className="zs-gs-label">{label}</p>
                      <p className="zs-gs-value">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="zs-gs-banner">
                <span className="zs-gs-dot" />
                <p><strong>GigScore personalization enabled</strong> — protection and alerts adapt based on city, weather, demand zones, working hours, coverage level, and vehicle type.</p>
              </div>
            </SectionCard>
          </div>

        </main>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HOW TO WIRE INTO App.jsx  (copy these 3 changes)
   ═══════════════════════════════════════════════════════

   1) At top of App.jsx, add:
      import Settings from './Settings';

   2) Add screen 10 inside the <div> block:
      {screen === 10 && (
        <Settings
          userData={userData}
          onClose={() => go(6)}
          onSignOut={() => go(7)}
          onOpenProfile={() => go(9)}
        />
      )}

   3) In Dashboard.jsx, update the Settings ⚙️ button onClick:
      Change:  onClick={()=>{}}
      To:      onClick={() => onOpenSettings()}

      And add onOpenSettings to Dashboard props + pass it from App.jsx:
      App.jsx:  <Dashboard ... onOpenSettings={() => go(10)} />
      Dashboard.jsx:  export default function Dashboard({ ..., onOpenSettings })
      Then in the ⚙️ button:  onClick={onOpenSettings}

   Also in Dashboard.jsx Sidebar, update Settings nav item:
      { icon:'⚙️', label:'Settings', fn: onOpenSettings }
   ══════════════════════════════════════════════════════ */