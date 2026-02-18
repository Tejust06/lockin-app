import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommitments } from '../contexts/CommitmentContext';
import { useUI } from '../contexts/UIContext';

export default function ActiveSession() {
  const navigate = useNavigate();
  const { currentCommitment, updateCommitmentState } = useCommitments();
  const { showToast } = useUI();
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (currentCommitment) {
      // Set initial time from commitment duration
      setTimeRemaining(currentCommitment.duration * 60);
      
      // Update commitment state to active if it's not already
      if (currentCommitment.state !== 'active') {
        updateCommitmentState(currentCommitment.id, 'active');
      }
    }
  }, [currentCommitment, updateCommitmentState]);

  useEffect(() => {
    if (timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  const handleComplete = async () => {
    if (currentCommitment) {
      await updateCommitmentState(currentCommitment.id, 'completed');
      showToast('Session completed successfully!', 'success');
      navigate('/home');
    }
  };

  const handleEndEarly = async () => {
    if (currentCommitment) {
      await updateCommitmentState(currentCommitment.id, 'failed');
      navigate('/penalty');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentCommitment) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-lockin-bg">
        <p className="text-lockin-secondary">No active session</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-lockin-bg p-6">
      <h1 className="text-2xl font-bold text-lockin-primary mb-4">Session Active</h1>
      <p className="text-lockin-secondary mb-8 text-center">{currentCommitment.goal}</p>
      
      <div className="text-center mb-12">
        <p className="text-6xl font-mono font-bold text-lockin-primary mb-4">
          {formatTime(timeRemaining)}
        </p>
        <p className="text-lockin-secondary">Keep going! Stay focused on your goal.</p>
      </div>

      <button
        onClick={handleEndEarly}
        className="px-8 py-3 bg-lockin-danger text-white rounded-lg font-medium hover:opacity-90"
      >
        End Early (Penalty)
      </button>
    </div>
  );
}

