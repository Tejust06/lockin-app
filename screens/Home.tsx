import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCommitments } from '../contexts/CommitmentContext';
import { CommitmentCard } from '../components/CommitmentCard';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { commitments, getCommitments, setCurrentCommitment, deleteCommitment } = useCommitments();

  useEffect(() => {
    if (user) {
      getCommitments(user.id);
    }
  }, [user, getCommitments]);

  const handleSelectCommitment = useCallback(
    (commitmentId: string) => {
      const commitment = commitments.find((c) => c.id === commitmentId);
      if (commitment) {
        setCurrentCommitment(commitment);
        if (commitment.state === 'active') {
          navigate('/active-session');
        }
      }
    },
    [commitments, setCurrentCommitment, navigate]
  );

  const handleDeleteCommitment = useCallback(
    async (commitmentId: string) => {
      await deleteCommitment(commitmentId);
    },
    [deleteCommitment]
  );

  const activeCommitments = commitments.filter(
    (c) => c.state === 'active' || c.state === 'paused'
  );

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
          {activeCommitments.length === 0 ? (
            <p className="text-lockin-secondary text-center py-8">No active commitments</p>
          ) : (
            <div className="space-y-3">
              {activeCommitments.map((commitment) => (
                <CommitmentCard
                  key={commitment.id}
                  commitment={commitment}
                  onSelect={handleSelectCommitment}
                  onDelete={handleDeleteCommitment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

