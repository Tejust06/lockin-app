import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCommitments } from '../contexts/CommitmentContext';
import { useUI } from '../contexts/UIContext';

export default function ContractWizard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createCommitment, setCurrentCommitment } = useCommitments();
  const { showToast } = useUI();
  const [duration, setDuration] = useState('30');
  const [stake, setStake] = useState('10');
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showToast('Please log in to create a commitment', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const commitment = await createCommitment(
        user.id,
        goal,
        parseInt(duration, 10),
        parseFloat(stake)
      );
      setCurrentCommitment(commitment);
      showToast('Commitment created successfully!', 'success');
      navigate('/bond-auth');
    } catch (error) {
      showToast('Failed to create commitment', 'error');
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            step="0.01"
            className="w-full px-4 py-3 bg-lockin-surface border border-lockin-border rounded-lg text-lockin-primary"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-lockin-accent text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Continue'}
        </button>
      </form>
    </div>
  );
}

