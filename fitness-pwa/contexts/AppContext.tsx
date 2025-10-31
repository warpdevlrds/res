'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserMode } from '@/types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userMode, setUserMode] = useState<UserMode>('student');

  return (
    <AppContext.Provider value={{ user, setUser, userMode, setUserMode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
