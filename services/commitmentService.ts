import { Commitment, CommitmentState } from '../types';
import { transition } from '../lib/stateMachine';

/**
 * Mock commitment service
 * In production, this would call a real backend API
 */

let mockCommitments: Commitment[] = [];

export async function createCommitment(
  userId: string,
  goal: string,
  duration: number,
  stake: number
): Promise<Commitment> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  
  const commitment: Commitment = {
    id: crypto.randomUUID(),
    userId,
    goal,
    duration,
    stake,
    state: 'creating',
    createdAt: new Date().toISOString(),
  };
  
  mockCommitments.push(commitment);
  return commitment;
}

export async function getCommitments(userId: string): Promise<Commitment[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockCommitments.filter((c) => c.userId === userId);
}

export async function getCommitment(commitmentId: string): Promise<Commitment | null> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return mockCommitments.find((c) => c.id === commitmentId) || null;
}

export async function updateCommitmentState(
  commitmentId: string,
  newState: CommitmentState
): Promise<Commitment | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const commitment = mockCommitments.find((c) => c.id === commitmentId);
  if (!commitment) return null;
  
  // Validate state transition
  const validatedState = transition(commitment.state, newState);
  
  if (validatedState !== newState) {
    throw new Error(`Invalid state transition from ${commitment.state} to ${newState}`);
  }
  
  commitment.state = validatedState;
  
  // Update timestamps based on state
  if (validatedState === 'active' && !commitment.startedAt) {
    commitment.startedAt = new Date().toISOString();
  } else if (validatedState === 'completed' || validatedState === 'failed') {
    commitment.completedAt = new Date().toISOString();
  }
  
  return commitment;
}

export async function deleteCommitment(commitmentId: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const index = mockCommitments.findIndex((c) => c.id === commitmentId);
  if (index === -1) return false;
  
  mockCommitments.splice(index, 1);
  return true;
}
