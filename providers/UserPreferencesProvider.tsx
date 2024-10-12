'use client';

import { createContext, useContext, useRef } from 'react';
import EasySpeech from 'easy-speech';
import { useStore } from 'zustand';
import { createUserPreferencesStore, UserPreferencesState } from '../stores/userPreferencesStore';

EasySpeech.init({ maxTimeout: 5000, interval: 250 });

type UserPreferencesStore = ReturnType<typeof createUserPreferencesStore>;

const UserPreferencesContext = createContext<UserPreferencesStore | null>(null);

export const UserPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storeRef = useRef<UserPreferencesStore>();

  if (!storeRef.current) {
    storeRef.current = createUserPreferencesStore();
  }

  return (
    <UserPreferencesContext.Provider value={storeRef.current}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = <T,>(selector: (state: UserPreferencesState) => T) => {
  const store = useContext(UserPreferencesContext);
  if (!store) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return useStore(store, selector);
};
