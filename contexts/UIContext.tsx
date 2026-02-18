import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Theme } from '../types';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ModalState {
  isOpen: boolean;
  title: string;
  content: ReactNode;
}

interface UIContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  modal: ModalState;
  openModal: (title: string, content: ReactNode) => void;
  closeModal: () => void;
}

const UIContext = createContext<UIContextType | null>(null);

const THEME_STORAGE_KEY = 'app_theme';

export function UIProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return (stored === 'light' || stored === 'dark') ? stored : 'dark';
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: '',
    content: null,
  });

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    
    const html = document.documentElement;
    if (newTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  const showToast = useCallback((message: string, type: ToastMessage['type']) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const openModal = useCallback((title: string, content: ReactNode) => {
    setModal({ isOpen: true, title, content });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, title: '', content: null });
  }, []);

  const value: UIContextType = {
    theme,
    toggleTheme,
    setTheme,
    toasts,
    showToast,
    removeToast,
    modal,
    openModal,
    closeModal,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextType {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
