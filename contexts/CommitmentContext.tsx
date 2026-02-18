import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Commitment, CommitmentState } from '../types';
import * as commitmentService from '../services/commitmentService';

interface CommitmentContextType {
  commitments: Commitment[];
  isLoading: boolean;
  createCommitment: (userId: string, goal: string, duration: number, stake: number) => Promise<Commitment>;
  getCommitments: (userId: string) => Promise<void>;
  updateCommitmentState: (commitmentId: string, newState: CommitmentState) => Promise<void>;
  deleteCommitment: (commitmentId: string) => Promise<void>;
  currentCommitment: Commitment | null;
  setCurrentCommitment: (commitment: Commitment | null) => void;
}

const CommitmentContext = createContext<CommitmentContextType | null>(null);

export function CommitmentProvider({ children }: { children: ReactNode }) {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [currentCommitment, setCurrentCommitment] = useState<Commitment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createCommitment = useCallback(
    async (userId: string, goal: string, duration: number, stake: number) => {
      setIsLoading(true);
      try {
        const newCommitment = await commitmentService.createCommitment(userId, goal, duration, stake);
        setCommitments((prev) => [...prev, newCommitment]);
        return newCommitment;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const getCommitments = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      const fetchedCommitments = await commitmentService.getCommitments(userId);
      setCommitments(fetchedCommitments);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCommitmentState = useCallback(
    async (commitmentId: string, newState: CommitmentState) => {
      setIsLoading(true);
      try {
        const updated = await commitmentService.updateCommitmentState(commitmentId, newState);
        if (updated) {
          setCommitments((prev) =>
            prev.map((c) => (c.id === commitmentId ? updated : c))
          );
          if (currentCommitment?.id === commitmentId) {
            setCurrentCommitment(updated);
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [currentCommitment]
  );

  const deleteCommitment = useCallback(async (commitmentId: string) => {
    setIsLoading(true);
    try {
      const success = await commitmentService.deleteCommitment(commitmentId);
      if (success) {
        setCommitments((prev) => prev.filter((c) => c.id !== commitmentId));
        if (currentCommitment?.id === commitmentId) {
          setCurrentCommitment(null);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentCommitment]);

  const value: CommitmentContextType = {
    commitments,
    isLoading,
    createCommitment,
    getCommitments,
    updateCommitmentState,
    deleteCommitment,
    currentCommitment,
    setCurrentCommitment,
  };

  return <CommitmentContext.Provider value={value}>{children}</CommitmentContext.Provider>;
}

export function useCommitments(): CommitmentContextType {
  const context = useContext(CommitmentContext);
  if (!context) {
    throw new Error('useCommitments must be used within a CommitmentProvider');
  }
  return context;
}
