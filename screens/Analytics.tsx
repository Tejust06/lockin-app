import React from 'react';

export default function Analytics() {
  return (
    <div className="min-h-screen bg-lockin-bg p-6 pt-safe-top pb-safe-bottom">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-lockin-primary mb-2">Analytics</h1>
        <p className="text-lockin-secondary">Track your progress and insights</p>
      </div>

      <div className="space-y-6">
        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-lockin-secondary text-sm mb-1">Total Sessions</p>
              <p className="text-2xl font-bold text-lockin-primary">42</p>
            </div>
            <div>
              <p className="text-lockin-secondary text-sm mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-lockin-success">94%</p>
            </div>
            <div>
              <p className="text-lockin-secondary text-sm mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-lockin-primary">12 days</p>
            </div>
            <div>
              <p className="text-lockin-secondary text-sm mb-1">DRS Score</p>
              <p className="text-2xl font-bold text-lockin-primary">1240</p>
            </div>
          </div>
        </div>

        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Financial Impact</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-lockin-secondary">Capital Preserved</span>
              <span className="text-lockin-success font-semibold">$850.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lockin-secondary">Fees Incurred</span>
              <span className="text-lockin-danger font-semibold">$50.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
