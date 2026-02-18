import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BondAuth() {
  const navigate = useNavigate();

  const handleAuth = () => {
    // Mock payment authorization
    navigate('/active-session');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lockin-bg p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-lockin-primary mb-4">Authorize Payment</h1>
        <p className="text-lockin-secondary mb-8">
          Your payment method will be charged only if you fail to complete your commitment.
        </p>

        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6 mb-6">
          <p className="text-lockin-secondary text-sm mb-2">Payment Hold</p>
          <p className="text-3xl font-bold text-lockin-primary">$10.00</p>
        </div>

        <button
          onClick={handleAuth}
          className="w-full py-3 bg-lockin-accent text-white rounded-lg font-medium hover:opacity-90"
        >
          Authorize & Start Session
        </button>
      </div>
    </div>
  );
}
