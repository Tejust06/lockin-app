import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCommitments } from '../contexts/CommitmentContext';
import { useProgress } from '../contexts/ProgressContext';
import { ProgressBar } from '../components/charts/ProgressBar';
import { RadialProgress } from '../components/charts/RadialProgress';
import { StreakChart } from '../components/charts/StreakChart';

export default function Analytics() {
  const { user } = useAuth();
  const { commitments } = useCommitments();
  const { analytics, updateAnalytics } = useProgress();

  useEffect(() => {
    if (user) {
      updateAnalytics(commitments, user);
    }
  }, [commitments, user, updateAnalytics]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-lockin-bg">
        <p className="text-lockin-secondary">Loading analytics...</p>
      </div>
    );
  }

  // Mock streak data for the last 7 days
  const streakData = [8, 12, 10, 15, 9, 14, 11];
  const streakLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen bg-lockin-bg p-6 pt-safe-top pb-safe-bottom">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-lockin-primary mb-2">Analytics</h1>
        <p className="text-lockin-secondary">Track your progress and insights</p>
      </div>

      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-lockin-secondary text-sm mb-1">Total Sessions</p>
              <p className="text-2xl font-bold text-lockin-primary">
                {analytics?.totalSessions || user.sessions}
              </p>
            </div>
            <div>
              <p className="text-lockin-secondary text-sm mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-lockin-success">
                {analytics?.successRate?.toFixed(0) || user.integrity}%
              </p>
            </div>
            <div>
              <p className="text-lockin-secondary text-sm mb-1">Current Streak</p>
              <p className="text-2xl font-bold text-lockin-primary">{user.streak} days</p>
            </div>
            <div>
              <p className="text-lockin-secondary text-sm mb-1">DRS Score</p>
              <p className="text-2xl font-bold text-lockin-primary">{user.drs}</p>
            </div>
          </div>
        </div>

        {/* Success Rate Progress */}
        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Success Rate</h2>
          <div className="flex justify-center mb-4">
            <RadialProgress
              value={analytics?.successRate || user.integrity}
              size={150}
              strokeWidth={12}
              label="Overall Success"
            />
          </div>
          <ProgressBar
            value={analytics?.completedSessions || user.sessions}
            max={analytics?.totalSessions || user.sessions}
            height={10}
            label="Completed Sessions"
          />
        </div>

        {/* Weekly Activity */}
        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Weekly Activity</h2>
          <StreakChart
            data={streakData}
            labels={streakLabels}
            height={120}
          />
        </div>

        {/* Financial Impact */}
        <div className="bg-lockin-surface border border-lockin-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-lockin-primary mb-4">Financial Impact</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-lockin-secondary">Capital Preserved</span>
              <span className="text-lockin-success font-semibold">
                ${analytics?.capitalPreserved?.toFixed(2) || user.capitalPreserved.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-lockin-secondary">Fees Incurred</span>
              <span className="text-lockin-danger font-semibold">
                ${analytics?.feesIncurred?.toFixed(2) || user.feesIncurred.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

