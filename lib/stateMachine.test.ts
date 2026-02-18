import { describe, it, expect } from 'vitest';
import {
  transition,
  isValidTransition,
  getValidTransitions,
  isTerminalState,
} from './stateMachine';
import { CommitmentState } from '../types';

describe('State Machine', () => {
  describe('transition', () => {
    it('should allow valid transitions', () => {
      expect(transition('idle', 'creating')).toBe('creating');
      expect(transition('creating', 'active')).toBe('active');
      expect(transition('active', 'completed')).toBe('completed');
      expect(transition('active', 'failed')).toBe('failed');
      expect(transition('active', 'paused')).toBe('paused');
      expect(transition('paused', 'active')).toBe('active');
      expect(transition('paused', 'failed')).toBe('failed');
      expect(transition('creating', 'idle')).toBe('idle');
    });

    it('should reject invalid transitions', () => {
      // Cannot go from idle directly to active
      expect(transition('idle', 'active')).toBe('idle');
      
      // Cannot go from completed to any other state
      expect(transition('completed', 'active')).toBe('completed');
      
      // Cannot go from failed to any other state
      expect(transition('failed', 'active')).toBe('failed');
      
      // Cannot go from creating directly to completed
      expect(transition('creating', 'completed')).toBe('creating');
    });

    it('should handle same-state transitions', () => {
      expect(transition('idle', 'idle')).toBe('idle');
      expect(transition('active', 'active')).toBe('active');
    });
  });

  describe('isValidTransition', () => {
    it('should return true for valid transitions', () => {
      expect(isValidTransition('idle', 'creating')).toBe(true);
      expect(isValidTransition('creating', 'active')).toBe(true);
      expect(isValidTransition('active', 'completed')).toBe(true);
      expect(isValidTransition('active', 'paused')).toBe(true);
    });

    it('should return false for invalid transitions', () => {
      expect(isValidTransition('idle', 'active')).toBe(false);
      expect(isValidTransition('completed', 'active')).toBe(false);
      expect(isValidTransition('failed', 'active')).toBe(false);
    });
  });

  describe('getValidTransitions', () => {
    it('should return correct valid transitions for each state', () => {
      expect(getValidTransitions('idle')).toEqual(['creating']);
      expect(getValidTransitions('creating')).toEqual(['active', 'idle']);
      expect(getValidTransitions('active')).toEqual(['paused', 'completed', 'failed']);
      expect(getValidTransitions('paused')).toEqual(['active', 'failed']);
      expect(getValidTransitions('completed')).toEqual([]);
      expect(getValidTransitions('failed')).toEqual([]);
    });
  });

  describe('isTerminalState', () => {
    it('should identify terminal states correctly', () => {
      expect(isTerminalState('completed')).toBe(true);
      expect(isTerminalState('failed')).toBe(true);
    });

    it('should identify non-terminal states correctly', () => {
      expect(isTerminalState('idle')).toBe(false);
      expect(isTerminalState('creating')).toBe(false);
      expect(isTerminalState('active')).toBe(false);
      expect(isTerminalState('paused')).toBe(false);
    });
  });

  describe('State reachability', () => {
    it('should be able to reach all states from idle', () => {
      // idle -> creating
      let state: CommitmentState = 'idle';
      state = transition(state, 'creating');
      expect(state).toBe('creating');

      // creating -> active
      state = transition(state, 'active');
      expect(state).toBe('active');

      // Test paused path
      state = transition(state, 'paused');
      expect(state).toBe('paused');
      state = transition(state, 'active');
      expect(state).toBe('active');

      // Test completed path
      state = transition(state, 'completed');
      expect(state).toBe('completed');
    });

    it('should be able to reach failed state from multiple paths', () => {
      // From active
      let state: CommitmentState = 'idle';
      state = transition(state, 'creating');
      state = transition(state, 'active');
      state = transition(state, 'failed');
      expect(state).toBe('failed');

      // From paused
      state = 'idle';
      state = transition(state, 'creating');
      state = transition(state, 'active');
      state = transition(state, 'paused');
      state = transition(state, 'failed');
      expect(state).toBe('failed');
    });

    it('should not be able to leave terminal states', () => {
      let state: CommitmentState = 'completed';
      state = transition(state, 'active');
      expect(state).toBe('completed');

      state = 'failed';
      state = transition(state, 'active');
      expect(state).toBe('failed');
    });
  });
});
