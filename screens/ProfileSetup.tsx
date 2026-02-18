import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lockin-bg p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-lockin-primary mb-8">Setup Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-lockin-primary mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-lockin-surface border border-lockin-border rounded-lg text-lockin-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-lockin-accent text-white rounded-lg font-medium hover:opacity-90"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
