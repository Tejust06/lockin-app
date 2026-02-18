import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Screens
import Splash from './screens/Splash';
import Auth from './screens/Auth';
import Onboarding from './screens/Onboarding';
import ProfileSetup from './screens/ProfileSetup';
import Home from './screens/Home';
import ContractWizard from './screens/ContractWizard';
import BondAuth from './screens/BondAuth';
import ActiveSession from './screens/ActiveSession';
import Penalty from './screens/Penalty';
import Analytics from './screens/Analytics';
import Wallet from './screens/Wallet';
import Network from './screens/Network';
import Profile from './screens/Profile';

// Components
import { BottomTabBar } from './components/Navigation';
import { TopNavbar } from './components/Navigation';

// Context
export const AppContext = createContext<any>(null);

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const hideNavRoutes = ['/', '/auth', '/onboarding', '/profile-setup', '/bond-auth', '/active-session', '/penalty'];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen relative">
      {showNav && <TopNavbar />}
      <main className="flex-1 w-full max-w-[393px] mx-auto relative">
        {children}
      </main>
      {showNav && <BottomTabBar />}
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [user, setUser] = useState({
    username: 'trader_1',
    drs: 1240,
    tier: 'TIER 2',
    integrity: 94,
    streak: 12,
    sessions: 42,
    balance: 0,
    capitalPreserved: 850.00,
    feesIncurred: 50.00,
  });

  // Toggle Theme
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <AppContext.Provider value={{ theme, toggleTheme, user, setUser }}>
      <HashRouter>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/profile-setup" element={<ProfileSetup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contract" element={<ContractWizard />} />
              <Route path="/bond-auth" element={<BondAuth />} />
              <Route path="/active-session" element={<ActiveSession />} />
              <Route path="/penalty" element={<Penalty />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/network" element={<Network />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </HashRouter>
    </AppContext.Provider>
  );
}