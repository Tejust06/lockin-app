export interface User {
  username: string;
  drs: number; // Discipline Rating Score
  tier: 'TIER 1' | 'TIER 2' | 'TIER 3' | 'APEX';
  integrity: number; // Percentage
  streak: number;
  sessions: number;
  balance: number;
}

export interface SessionConfig {
  duration: number; // minutes
  stake: number;
  goal: string;
  blockedApps: string[];
}

export interface Transaction {
  id: string;
  type: 'AUTH_HOLD' | 'SERVICE_FEE_CAPTURE' | 'HOLD_RELEASE';
  amount: number;
  date: string;
  title: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export type Theme = 'light' | 'dark';