import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Wallet, Users, User } from 'lucide-react';

export function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: Users, label: 'Network', path: '/network' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-lockin-surface border-t border-lockin-border">
      <div className="max-w-[393px] mx-auto flex justify-around items-center py-2 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                isActive ? 'text-lockin-accent' : 'text-lockin-secondary hover:text-lockin-primary'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function TopNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-lockin-surface border-b border-lockin-border z-10">
      <div className="max-w-[393px] mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold text-lockin-primary">LOCKIN</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-lockin-secondary">TIER 2</span>
        </div>
      </div>
    </nav>
  );
}
