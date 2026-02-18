import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Penalty() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lockin-bg p-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-lockin-danger mb-4">Session Failed</h1>
        <p className="text-lockin-secondary mb-2">You ended your session early.</p>
        <p className="text-2xl font-bold text-lockin-danger">Penalty: $10.00</p>
      </div>

      <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6 mb-8 w-full max-w-md">
        <h2 className="text-lg font-semibold text-lockin-primary mb-4">Impact</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-lockin-secondary">Streak</span>
            <span className="text-lockin-danger font-medium">Reset to 0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-lockin-secondary">DRS Score</span>
            <span className="text-lockin-danger font-medium">-50 points</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/home')}
        className="px-8 py-3 bg-lockin-accent text-white rounded-lg font-medium hover:opacity-90"
      >
        Return Home
      </button>
    </div>
  );
}
