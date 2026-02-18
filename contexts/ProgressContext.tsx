import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Commitment, User } from '../types';
import { AnalyticsData, calculateAnalytics } from '../services/analyticsService';

interface ProgressContextType {
  analytics: AnalyticsData | null;
  updateAnalytics: (commitments: Commitment[], user: User) => void;
  refreshAnalytics: () => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [cachedCommitments, setCachedCommitments] = useState<Commitment[]>([]);
  const [cachedUser, setCachedUser] = useState<User | null>(null);

  const updateAnalytics = useCallback((commitments: Commitment[], user: User) => {
    const newAnalytics = calculateAnalytics(commitments, user);
    setAnalytics(newAnalytics);
    setCachedCommitments(commitments);
    setCachedUser(user);
  }, []);

  const refreshAnalytics = useCallback(() => {
    if (cachedCommitments.length > 0 && cachedUser) {
      updateAnalytics(cachedCommitments, cachedUser);
    }
  }, [cachedCommitments, cachedUser, updateAnalytics]);

  const value: ProgressContextType = {
    analytics,
    updateAnalytics,
    refreshAnalytics,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextType {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
