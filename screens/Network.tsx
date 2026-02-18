import React from 'react';

export default function Network() {
  return (
    <div className="min-h-screen bg-lockin-bg p-6 pt-safe-top pb-safe-bottom">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-lockin-primary mb-2">Network</h1>
        <p className="text-lockin-secondary">Connect with other committed individuals</p>
      </div>

      <div className="space-y-4">
        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Leaderboard</h2>
          <p className="text-lockin-secondary text-center py-8">Coming soon</p>
        </div>

        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Community</h2>
          <p className="text-lockin-secondary text-center py-8">Join group challenges and compete with friends</p>
        </div>
      </div>
    </div>
  );
}
