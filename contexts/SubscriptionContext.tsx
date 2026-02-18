import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { SubscriptionStatus } from '../types';

interface SubscriptionContextType {
  subscription: SubscriptionStatus | null;
  isLoading: boolean;
  updateSubscription: (subscription: SubscriptionStatus) => void;
  cancelSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateSubscription = useCallback((newSubscription: SubscriptionStatus) => {
    setSubscription(newSubscription);
  }, []);

  const cancelSubscription = useCallback(async () => {
    setIsLoading(true);
    try {
      // Mock delay for API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (subscription) {
        setSubscription({
          ...subscription,
          status: 'cancelled',
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [subscription]);

  const value: SubscriptionContextType = {
    subscription,
    isLoading,
    updateSubscription,
    cancelSubscription,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription(): SubscriptionContextType {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
