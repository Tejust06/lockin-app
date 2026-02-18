import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lockin-bg p-6">
      <h1 className="text-3xl font-bold text-lockin-primary mb-4">Welcome to LOCKIN</h1>
      <p className="text-lockin-secondary text-center mb-8 max-w-md">
        Build discipline through commitment-based sessions with real stakes.
      </p>
      <button
        onClick={() => navigate('/profile-setup')}
        className="px-8 py-3 bg-lockin-accent text-white rounded-lg font-medium hover:opacity-90"
      >
        Get Started
      </button>
    </div>
  );
}
