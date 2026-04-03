import { useState } from 'react';
import { GLOBAL_CSS } from './styles';
import Screen1Landing from './Screen1Landing';
import { Screen2Mobile, Screen3OTP, Screen4Profile, Screen5Platforms, Screen6Bank } from './OnboardingSteps';
import Dashboard from './Dashboard';
import SignOut from './SignOut';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import Settings from './Settings';

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

  const go = (s) => setScreen(s);

  const merge = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const resetUser = () => {
    setUserData({
      phone: '', name: '', city: '', vehicle: 'Bike',
      platform: '', exp: '', platforms: [], bank: {},
    });
  };

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

        {/* 8 — Login → ALWAYS goes straight to dashboard */}
        {screen === 8 && (
          <LoginPage
            onSignIn={() => go(6)}
            onGetStarted={() => go(1)}
          />
        )}

        {/* 1 — Mobile entry */}
        {screen === 1 && (
          <Screen2Mobile
            onNext={(phone) => {
              merge({ phone });
              go(2);
            }}
          />
        )}

        {/* 2 — OTP */}
        {screen === 2 && (
          <Screen3OTP
            phone={userData.phone}
            onNext={(phone) => {
              merge({ phone });
              go(3);
            }}
          />
        )}

        {/* 3 — Profile setup */}
        {screen === 3 && (
          <Screen4Profile
            phone={userData.phone}
            onNext={(profile) => {
              merge({
                ...profile,
                phone: userData.phone, // preserve phone
              });
              go(4);
            }}
            onBack={() => go(2)}
          />
        )}

        {/* 4 — Platform selection */}
        {screen === 4 && (
          <Screen5Platforms
            phone={userData.phone}
            onNext={(platforms) => {
              merge({ platforms, phone: userData.phone });
              go(5);
            }}
            onBack={() => go(3)}
          />
        )}

        {/* 5 — Bank details */}
        {screen === 5 && (
          <Screen6Bank
            onNext={async (bank) => {
              const { bank: _, ...cleanUser } = userData;

              const finalData = {
                ...cleanUser,
                bankHolder:    bank.holder,
                accountNumber: bank.acct,
                ifsc:          bank.ifsc,
                bankName:      bank.bank,
              };

              console.log('FINAL DATA:', finalData);

              try {
                const response = await fetch('http://localhost:8080/api/user/save-profile', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(finalData),
                });

                if (!response.ok) throw new Error('Server error');

                const data = await response.json();
                console.log('USER SAVED ✅', data);

                merge({ bank });
                go(6);
              } catch (error) {
                console.error('SAVE ERROR ❌', error);
                alert('Failed to save user');
              }
            }}
          />
        )}

        {/* 6 — Dashboard */}
        {screen === 6 && (
          <Dashboard
            userData={userData}
            onSignOut={() => go(7)}
            onOpenProfile={() => go(9)}
            onOpenSettings={() => go(10)}
          />
        )}

        {/* 7 — Sign Out */}
        {screen === 7 && (
          <SignOut
            onReturnHome={() => {
              resetUser();
              go(0);
            }}
          />
        )}

        {/* 9 — Profile */}
        {screen === 9 && (
          <ProfilePage
            userData={userData}
            onClose={() => go(6)}
            onSignOut={() => go(7)}
            onManagePlan={() => go(6)}
          />
        )}

        {/* 10 — Settings */}
        {screen === 10 && (
          <Settings
            userData={userData}
            onClose={() => go(6)}
            onSignOut={() => go(7)}
            onOpenProfile={() => go(9)}
          />
        )}

      </div>

      {showOnboardingNav && <OnboardingFooter />}
    </>
  );
}