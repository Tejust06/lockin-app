import type { CommitmentState } from '../../types';

// Valid transition map
export const VALID_TRANSITIONS: Record<CommitmentState, CommitmentState[]> = {
  idle:      ['creating'],
  creating:  ['active', 'idle'],
  active:    ['paused', 'completed', 'failed'],
  paused:    ['active', 'failed'],
  completed: ['idle'],
  failed:    ['idle'],
};

export const TERMINAL_STATES: CommitmentState[] = ['completed', 'failed'];

export function transition(current: CommitmentState, next: CommitmentState): CommitmentState {
  const allowed = VALID_TRANSITIONS[current];
  if (!allowed.includes(next)) {
    throw new Error(`Invalid state transition: ${current} → ${next}. Allowed: [${allowed.join(', ')}]`);
  }
  return next;
}

export function safeTransition(current: CommitmentState, next: CommitmentState): CommitmentState {
  try { return transition(current, next); } catch { return current; }
}

export function canTransition(current: CommitmentState, next: CommitmentState): boolean {
  return VALID_TRANSITIONS[current].includes(next);
}

export function getValidTransitions(current: CommitmentState): CommitmentState[] {
  return [...VALID_TRANSITIONS[current]];
}

export function isTerminalState(state: CommitmentState): boolean {
  return TERMINAL_STATES.includes(state);
}