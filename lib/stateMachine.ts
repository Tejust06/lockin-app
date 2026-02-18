import { CommitmentState } from '../types';

/**
 * Valid state transitions for commitments
 * Maps current state to array of valid next states
 */
const STATE_TRANSITIONS: Record<CommitmentState, CommitmentState[]> = {
  idle: ['creating'],
  creating: ['active', 'idle'],
  active: ['paused', 'completed', 'failed'],
  paused: ['active', 'failed'],
  completed: [],
  failed: [],
};

/**
 * Validates and performs a state transition
 * @param current - Current state
 * @param next - Desired next state
 * @returns The next state if transition is valid, otherwise returns current state
 */
export function transition(current: CommitmentState, next: CommitmentState): CommitmentState {
  const validTransitions = STATE_TRANSITIONS[current];
  
  if (!validTransitions) {
    console.error(`Invalid current state: ${current}`);
    return current;
  }
  
  if (!validTransitions.includes(next)) {
    console.error(
      `Invalid state transition: ${current} -> ${next}. ` +
      `Valid transitions from ${current}: ${validTransitions.join(', ')}`
    );
    return current;
  }
  
  return next;
}

/**
 * Check if a transition is valid without performing it
 * @param current - Current state
 * @param next - Desired next state
 * @returns true if transition is valid, false otherwise
 */
export function isValidTransition(current: CommitmentState, next: CommitmentState): boolean {
  const validTransitions = STATE_TRANSITIONS[current];
  return validTransitions ? validTransitions.includes(next) : false;
}

/**
 * Get all valid next states from current state
 * @param current - Current state
 * @returns Array of valid next states
 */
export function getValidTransitions(current: CommitmentState): CommitmentState[] {
  return STATE_TRANSITIONS[current] || [];
}

/**
 * Check if a state is a terminal state (no transitions possible)
 * @param state - State to check
 * @returns true if state is terminal, false otherwise
 */
export function isTerminalState(state: CommitmentState): boolean {
  return STATE_TRANSITIONS[state]?.length === 0;
}
