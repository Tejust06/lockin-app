import { Commitment, User } from '../types';

/**
 * Analytics service for calculating progress and stats
 */

export interface AnalyticsData {
  totalSessions: number;
  completedSessions: number;
  failedSessions: number;
  successRate: number;
  averageSessionDuration: number;
  totalStakeAmount: number;
  capitalPreserved: number;
  feesIncurred: number;
}

export function calculateAnalytics(
  commitments: Commitment[],
  user: User
): AnalyticsData {
  const totalSessions = commitments.length;
  const completedSessions = commitments.filter((c) => c.state === 'completed').length;
  const failedSessions = commitments.filter((c) => c.state === 'failed').length;
  
  const successRate = totalSessions > 0
    ? (completedSessions / totalSessions) * 100
    : 0;
  
  const averageSessionDuration = totalSessions > 0
    ? commitments.reduce((sum, c) => sum + c.duration, 0) / totalSessions
    : 0;
  
  const totalStakeAmount = commitments.reduce((sum, c) => sum + c.stake, 0);
  
  return {
    totalSessions,
    completedSessions,
    failedSessions,
    successRate,
    averageSessionDuration,
    totalStakeAmount,
    capitalPreserved: user.capitalPreserved,
    feesIncurred: user.feesIncurred,
  };
}

export function calculateStreak(commitments: Commitment[]): number {
  // Sort by completion date, most recent first
  const completed = commitments
    .filter((c) => c.state === 'completed' && c.completedAt)
    .sort((a, b) => {
      const dateA = new Date(a.completedAt!).getTime();
      const dateB = new Date(b.completedAt!).getTime();
      return dateB - dateA;
    });
  
  if (completed.length === 0) return 0;
  
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (const commitment of completed) {
    const commitmentDate = new Date(commitment.completedAt!);
    commitmentDate.setHours(0, 0, 0, 0);
    
    const dayDiff = Math.floor(
      (currentDate.getTime() - commitmentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (dayDiff === streak) {
      streak++;
      currentDate = commitmentDate;
    } else if (dayDiff > streak) {
      break;
    }
  }
  
  return streak;
}

export function calculateDRS(user: User, commitments: Commitment[]): number {
  const analytics = calculateAnalytics(commitments, user);
  
  // DRS formula: base score + (success rate * 10) + (streak * 5)
  const baseScore = 500;
  const successBonus = analytics.successRate * 10;
  const streakBonus = user.streak * 5;
  
  return Math.floor(baseScore + successBonus + streakBonus);
}
