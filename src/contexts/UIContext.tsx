import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { UIContextValue, Theme, ToastMessage, ToastVariant, ModalState, ModalType } from '../../types';

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [theme, setTheme] = useState<Theme>('dark');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [modal, setModal] = useState<ModalState>({ type: null });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') { html.classList.add('dark'); } else { html.classList.remove('dark'); }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const addToast = useCallback((message: string, variant: ToastVariant = 'info', duration = 4000) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, variant, duration }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const openModal = useCallback((type: NonNullable<ModalType>, props?: Record<string, unknown>) => {
    setModal({ type, props });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null });
  }, []);

  const value: UIContextValue = { theme, toggleTheme, toasts, addToast, removeToast, modal, openModal, closeModal };
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within <UIProvider>');
  return ctx;
}

export default UIContext;