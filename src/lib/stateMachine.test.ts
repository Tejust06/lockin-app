import { describe, it, expect } from 'vitest';
import { transition, safeTransition, canTransition, getValidTransitions, isTerminalState, VALID_TRANSITIONS } from './stateMachine';
import type { CommitmentState } from '../../types';

describe('transition() - valid paths', () => {
  it('idle → creating', () => expect(transition('idle', 'creating')).toBe('creating'));
  it('creating → active', () => expect(transition('creating', 'active')).toBe('active'));
  it('creating → idle (cancel)', () => expect(transition('creating', 'idle')).toBe('idle'));
  it('active → paused', () => expect(transition('active', 'paused')).toBe('paused'));
  it('active → completed', () => expect(transition('active', 'completed')).toBe('completed'));
  it('active → failed', () => expect(transition('active', 'failed')).toBe('failed'));
  it('paused → active', () => expect(transition('paused', 'active')).toBe('active'));
  it('paused → failed', () => expect(transition('paused', 'failed')).toBe('failed'));
  it('completed → idle', () => expect(transition('completed', 'idle')).toBe('idle'));
  it('failed → idle', () => expect(transition('failed', 'idle')).toBe('idle'));
});

describe('transition() - invalid paths throw', () => {
  it('idle → active throws', () => expect(() => transition('idle', 'active')).toThrow());
  it('idle → completed throws', () => expect(() => transition('idle', 'completed')).toThrow());
  it('active → creating throws', () => expect(() => transition('active', 'creating')).toThrow());
  it('completed → active throws', () => expect(() => transition('completed', 'active')).toThrow());
  it('failed → active throws', () => expect(() => transition('failed', 'active')).toThrow());
  it('completed self-loop throws', () => expect(() => transition('completed', 'completed')).toThrow());
});

describe('safeTransition()', () => {
  it('returns next on valid', () => expect(safeTransition('idle', 'creating')).toBe('creating'));
  it('returns current on invalid (no throw)', () => expect(safeTransition('idle', 'completed')).toBe('idle'));
});

describe('canTransition()', () => {
  it('true for valid', () => expect(canTransition('idle', 'creating')).toBe(true));
  it('false for invalid', () => expect(canTransition('idle', 'completed')).toBe(false));
});

describe('getValidTransitions()', () => {
  it('idle → [creating]', () => expect(getValidTransitions('idle')).toEqual(['creating']));
  it('active has 3 exits', () => expect(getValidTransitions('active')).toHaveLength(3));
});

describe('isTerminalState()', () => {
  it('completed is terminal', () => expect(isTerminalState('completed')).toBe(true));
  it('failed is terminal', () => expect(isTerminalState('failed')).toBe(true));
  it('active is not terminal', () => expect(isTerminalState('active')).toBe(false));
  it('idle is not terminal', () => expect(isTerminalState('idle')).toBe(false));
});

describe('full lifecycle walks', () => {
  it('idle → creating → active → paused → active → completed → idle', () => {
    const path: CommitmentState[] = ['idle','creating','active','paused','active','completed','idle'];
    for (let i = 0; i < path.length - 1; i++) {
      expect(transition(path[i] as CommitmentState, path[i+1] as CommitmentState)).toBe(path[i+1]);
    }
  });
  it('idle → creating → active → failed → idle', () => {
    let s: CommitmentState = 'idle';
    s = transition(s, 'creating');
    s = transition(s, 'active');
    s = transition(s, 'failed');
    s = transition(s, 'idle');
    expect(s).toBe('idle');
  });
});
