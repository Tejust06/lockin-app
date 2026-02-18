import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-lockin-bg p-6 pt-safe-top pb-safe-bottom">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-lockin-primary mb-2">Home</h1>
        <p className="text-lockin-secondary">Your commitment dashboard</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => navigate('/contract')}
          className="w-full py-4 bg-lockin-surface border border-lockin-border rounded-xl text-lockin-primary font-medium hover:bg-lockin-subtle"
        >
          Create New Commitment
        </button>

        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Active Commitments</h2>
          <p className="text-lockin-secondary text-center py-8">No active commitments</p>
        </div>
      </div>
    </div>
  );
}
