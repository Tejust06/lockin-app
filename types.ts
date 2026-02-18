// ─── Core Domain Types ───────────────────────────────────────────────────────

export type Theme = 'light' | 'dark';

export type UserTier = 'TIER 1' | 'TIER 2' | 'TIER 3' | 'APEX';

export interface User {
  id: string;
  username: string;
  email: string;
  drs: number; // Discipline Rating Score
  tier: UserTier;
  integrity: number; // 0-100 percentage
  streak: number;
  sessions: number;
  balance: number;
  capitalPreserved: number;
  feesIncurred: number;
  avatarUrl?: string;
  createdAt: string;
}

// ─── Commitment / Session ─────────────────────────────────────────────────────

export type CommitmentState =
  | 'idle'
  | 'creating'
  | 'active'
  | 'paused'
  | 'completed'
  | 'failed';

export interface Commitment {
  id: string;
  userId: string;
  goal: string;
  duration: number; // minutes
  stake: number; // USD
  blockedApps: string[];
  state: CommitmentState;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  failedAt?: string;
  pausedAt?: string;
}

export interface SessionConfig {
  duration: number; // minutes
  stake: number;
  goal: string;
  blockedApps: string[];
}

// ─── Transactions & Wallet ────────────────────────────────────────────────────

export type TransactionType = 'AUTH_HOLD' | 'SERVICE_FEE_CAPTURE' | 'HOLD_RELEASE';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  date: string;
  title: string;
  status: TransactionStatus;
  commitmentId?: string;
}

// ─── Subscription & Billing ───────────────────────────────────────────────────

export type SubscriptionPlan = 'free' | 'pro' | 'elite';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing';

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodEnd: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface DailyProgress {
  date: string; // ISO date string
  sessionsCompleted: number;
  sessionsFailed: number;
  totalStaked: number;
  capitalPreserved: number;
  feesIncurred: number;
}

export interface AnalyticsSummary {
  totalSessions: number;
  completedSessions: number;
  failedSessions: number;
  successRate: number; // 0-1
  currentStreak: number;
  longestStreak: number;
  totalCapitalPreserved: number;
  totalFeesIncurred: number;
  drsHistory: Array<{ date: string; value: number }>;
  dailyProgress: DailyProgress[];
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number; // ms, default 4000
}

export type ModalType = 'confirm' | 'payment' | 'streak' | 'penalty' | null;

export interface ModalState {
  type: ModalType;
  props?: Record<string, unknown>;
}

// ─── Context Value Shapes ─────────────────────────────────────────────────────

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
}

export interface CommitmentContextValue {
  commitments: Commitment[];
  activeCommitment: Commitment | null;
  createCommitment: (config: SessionConfig) => Commitment;
  startCommitment: (id: string) => void;
  pauseCommitment: (id: string) => void;
  resumeCommitment: (id: string) => void;
  completeCommitment: (id: string) => void;
  failCommitment: (id: string) => void;
}

export interface UIContextValue {
  theme: Theme;
  toggleTheme: () => void;
  toasts: ToastMessage[];
  addToast: (message: string, variant?: ToastVariant, duration?: number) => void;
  removeToast: (id: string) => void;
  modal: ModalState;
  openModal: (type: NonNullable<ModalType>, props?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export interface SubscriptionContextValue {
  subscription: Subscription | null;
  isPro: boolean;
  isElite: boolean;
  isLoading: boolean;
  setSubscription: (sub: Subscription | null) => void;
}