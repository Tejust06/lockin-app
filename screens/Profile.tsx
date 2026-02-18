import React, { useContext } from 'react';
import { AppContext } from '../App';

export default function Profile() {
  const { user, theme, toggleTheme } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-lockin-bg p-6 pt-safe-top pb-safe-bottom">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-lockin-primary mb-2">Profile</h1>
        <p className="text-lockin-secondary">Your account settings</p>
      </div>

      <div className="space-y-6">
        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-lockin-accent flex items-center justify-center text-white text-2xl font-bold">
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-lockin-primary">{user.username}</h2>
              <p className="text-lockin-secondary">{user.tier}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-lockin-border">
            <div>
              <p className="text-lockin-secondary text-sm mb-1">DRS Score</p>
              <p className="text-xl font-bold text-lockin-primary">{user.drs}</p>
            </div>
            <div>
              <p className="text-lockin-secondary text-sm mb-1">Integrity</p>
              <p className="text-xl font-bold text-lockin-primary">{user.integrity}%</p>
            </div>
            <div>
              <p className="text-lockin-secondary text-sm mb-1">Streak</p>
              <p className="text-xl font-bold text-lockin-primary">{user.streak} days</p>
            </div>
            <div>
              <p className="text-lockin-secondary text-sm mb-1">Sessions</p>
              <p className="text-xl font-bold text-lockin-primary">{user.sessions}</p>
            </div>
          </div>
        </div>

        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Settings</h2>
          <div className="flex items-center justify-between">
            <span className="text-lockin-primary">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-lockin-subtle border border-lockin-border rounded-lg text-lockin-primary font-medium hover:bg-lockin-surface"
            >
              {theme === 'dark' ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
