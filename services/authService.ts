import { User } from '../types';

/**
 * Mock authentication service
 * In production, this would call a real backend API
 */

export async function login(email: string, password: string): Promise<User> {
  // Mock delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Mock successful login
  return {
    id: crypto.randomUUID(),
    username: email.split('@')[0] || 'user',
    email,
    drs: 1240,
    tier: 'TIER 2',
    integrity: 94,
    streak: 12,
    sessions: 42,
    balance: 0,
    capitalPreserved: 850.00,
    feesIncurred: 50.00,
  };
}

export async function logout(): Promise<void> {
  // Mock delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  // In production, would invalidate session/token
}

export async function register(email: string, password: string, username: string): Promise<User> {
  // Mock delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Mock successful registration
  return {
    id: crypto.randomUUID(),
    username,
    email,
    drs: 0,
    tier: 'TIER 1',
    integrity: 100,
    streak: 0,
    sessions: 0,
    balance: 0,
    capitalPreserved: 0,
    feesIncurred: 0,
  };
}

export async function getCurrentUser(): Promise<User | null> {
  // In production, would validate session/token with backend
  const stored = localStorage.getItem('auth_user');
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}
