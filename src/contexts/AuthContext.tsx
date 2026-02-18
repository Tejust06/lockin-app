import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AuthContextValue, User } from '../../types';

const AUTH_STORAGE_KEY = 'lockin_auth_user';
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        setUser(parsed);
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user, isLoading]);

  const login = useCallback((newUser: User) => { setUser(newUser); }, []);
  const logout = useCallback(() => { setUser(null); localStorage.removeItem(AUTH_STORAGE_KEY); }, []);
  const updateUser = useCallback((partial: Partial<User>) => { setUser(prev => prev ? { ...prev, ...partial } : null); }, []);

  const value: AuthContextValue = { user, isAuthenticated: user !== null, isLoading, login, logout, updateUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

export default AuthContext;