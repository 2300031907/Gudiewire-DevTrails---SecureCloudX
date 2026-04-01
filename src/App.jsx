// App.jsx — Master orchestrator
<<<<<<< HEAD
// Changes: Dashboard now imports LocationRiskMap directly via Dashboard.jsx.
// No changes needed here — App.jsx is identical to original except
// we removed the stray WeatherRiskCard import that was in the old Dashboard.
=======
// ✅ CHANGES vs original:
//  • Added: import Settings from './Settings'
//  • Added: screen === 10 renders <Settings />
//  • Added: onOpenSettings={() => go(10)} prop on <Dashboard />
>>>>>>> 351a5d7 (css changes)

import { useState } from 'react';
import { GLOBAL_CSS } from './styles';
import Screen1Landing from './Screen1Landing';
import { Screen2Mobile, Screen3OTP, Screen4Profile, Screen5Platforms, Screen6Bank } from './OnboardingSteps';
import Dashboard from './Dashboard';
import SignOut from './SignOut';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
<<<<<<< HEAD
=======
import Settings from './Settings'; // ✅ NEW
>>>>>>> 351a5d7 (css changes)

// Screens that show the dark mesh/grid background
const MESH_SCREENS = [0, 3, 4, 5];

function OnboardingNav() {
  return (
    <nav className="zs-nav">
      <div className="zs-nav-brand">
        <div className="zs-nav-logo">🛡️</div>
        <span className="zs-nav-name">ZeroShield</span>
      </div>
      <ul className="zs-nav-links">
        {['Product ▾', 'Features', 'Pricing'].map(l => (
          <li key={l}><a href="#">{l}</a></li>
        ))}
      </ul>
      <div className="zs-nav-right">
        <div className="zs-avatar">SS</div>
      </div>
    </nav>
  );
}

function OnboardingFooter() {
  return (
    <footer className="zs-footer">
      <a href="#">Privacy Policy</a>
      <span className="zs-footer-sep">|</span>
      <a href="#">Terms of Service</a>
      <span className="zs-footer-sep">|</span>
      <a href="#">Help Center</a>
      <span className="zs-footer-sep">|</span>
      <span>© 2024 ZeroShield Inc.</span>
    </footer>
  );
}

export default function App() {
  const [screen, setScreen] = useState(0);
  const [userData, setUserData] = useState({
    phone: '', name: '', city: '', vehicle: 'Bike',
    platform: '', exp: '', platforms: [], bank: {},
  });

  const go    = s    => setScreen(s);
  const merge = data => setUserData(prev => ({ ...prev, ...data }));
  const resetUser = () => setUserData({
    phone: '', name: '', city: '', vehicle: 'Bike',
    platform: '', exp: '', platforms: [], bank: {},
  });

  const showOnboardingNav = [3, 4, 5].includes(screen);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {MESH_SCREENS.includes(screen) && <div className="bg-mesh" />}
      {MESH_SCREENS.includes(screen) && <div className="bg-grid" />}

      {showOnboardingNav && <OnboardingNav />}

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* 0 — Landing */}
        {screen === 0 && (
          <Screen1Landing
            onGetStarted={() => go(1)}
            onSignIn={() => go(8)}
          />
        )}

        {/* 8 — Login */}
        {screen === 8 && (
          <LoginPage
            onSignIn={() => go(6)}
            onGetStarted={() => go(1)}
          />
        )}

        {/* 1 — Mobile entry */}
        {screen === 1 && (
          <Screen2Mobile
            onNext={phone => { merge({ phone }); go(2); }}
          />
        )}

        {/* 2 — OTP */}
        {screen === 2 && (
          <Screen3OTP
            phone={userData.phone}
            onNext={() => go(3)}
          />
        )}

        {/* 3 — Profile setup */}
        {screen === 3 && (
          <Screen4Profile
            onNext={profile => { merge(profile); go(4); }}
            onBack={() => go(2)}
          />
        )}

        {/* 4 — Platform selection */}
        {screen === 4 && (
          <Screen5Platforms
            onNext={platforms => { merge({ platforms }); go(5); }}
            onBack={() => go(3)}
          />
        )}

        {/* 5 — Bank details */}
        {screen === 5 && (
          <Screen6Bank
            onNext={bank => { merge({ bank }); go(6); }}
            onBack={() => go(4)}
          />
        )}

<<<<<<< HEAD
        {/* 6 — Dashboard (contains LocationRiskMap under Map tab) */}
=======
        {/* 6 — Dashboard */}
>>>>>>> 351a5d7 (css changes)
        {screen === 6 && (
          <Dashboard
            userData={userData}
            onSignOut={() => go(7)}
            onOpenProfile={() => go(9)}
<<<<<<< HEAD
=======
            onOpenSettings={() => go(10)}  // ✅ NEW
>>>>>>> 351a5d7 (css changes)
          />
        )}

        {/* 7 — Sign Out */}
        {screen === 7 && (
          <SignOut
            onReturnHome={() => { resetUser(); go(0); }}
          />
        )}

        {/* 9 — Profile page */}
        {screen === 9 && (
          <ProfilePage
            userData={userData}
            onClose={() => go(6)}
            onSignOut={() => go(7)}
            onManagePlan={() => go(6)}
          />
        )}

<<<<<<< HEAD
=======
        {/* 10 — Settings page ✅ NEW */}
        {screen === 10 && (
          <Settings
            userData={userData}
            onClose={() => go(6)}
            onSignOut={() => go(7)}
            onOpenProfile={() => go(9)}
          />
        )}

>>>>>>> 351a5d7 (css changes)
      </div>

      {showOnboardingNav && <OnboardingFooter />}
    </>
  );
}