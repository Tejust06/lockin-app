import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ContractWizard() {
  const navigate = useNavigate();
  const [duration, setDuration] = useState('30');
  const [stake, setStake] = useState('10');
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/bond-auth');
  };

  return (
    <div className="min-h-screen bg-lockin-bg p-6">
      <h1 className="text-3xl font-bold text-lockin-primary mb-8">Create Commitment</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-lockin-primary mb-2">
            Goal
          </label>
          <input
            id="goal"
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="What do you want to accomplish?"
            className="w-full px-4 py-3 bg-lockin-surface border border-lockin-border rounded-lg text-lockin-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-lockin-primary mb-2">
            Duration (minutes)
          </label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            className="w-full px-4 py-3 bg-lockin-surface border border-lockin-border rounded-lg text-lockin-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="stake" className="block text-sm font-medium text-lockin-primary mb-2">
            Stake ($)
          </label>
          <input
            id="stake"
            type="number"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            min="1"
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
  );
}
