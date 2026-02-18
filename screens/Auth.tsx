import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    navigate('/onboarding');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lockin-bg p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-lockin-primary mb-8">Sign In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-lockin-primary mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-lockin-surface border border-lockin-border rounded-lg text-lockin-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-lockin-primary mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-lockin-surface border border-lockin-border rounded-lg text-lockin-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-lockin-accent text-white rounded-lg font-medium hover:opacity-90"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
