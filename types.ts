export interface User {
  id: string;
  username: string;
  email: string;
  drs: number; // Discipline Rating Score
  tier: 'TIER 1' | 'TIER 2' | 'TIER 3' | 'APEX';
  integrity: number; // Percentage
  streak: number;
  sessions: number;
  balance: number;
  capitalPreserved: number;
  feesIncurred: number;
}

export interface SessionConfig {
  duration: number; // minutes
  stake: number;
  goal: string;
  blockedApps: string[];
}

export interface Commitment {
  id: string;
  userId: string;
  goal: string;
  duration: number;
  stake: number;
  state: CommitmentState;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export type CommitmentState = 'idle' | 'creating' | 'active' | 'paused' | 'completed' | 'failed';

export interface Transaction {
  id: string;
  userId: string;
  type: 'AUTH_HOLD' | 'SERVICE_FEE_CAPTURE' | 'HOLD_RELEASE';
  amount: number;
  date: string;
  title: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export interface SubscriptionStatus {
  id: string;
  userId: string;
  plan: 'free' | 'premium' | 'pro';
  status: 'active' | 'cancelled' | 'expired';
  currentPeriodEnd: string;
}

export type Theme = 'light' | 'dark';