// src/stores/userPreferencesStore.ts
import { createStore } from 'zustand/vanilla';

export interface UserPreferencesState {
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
}

export const createUserPreferencesStore = (initialState?: Partial<UserPreferencesState>) =>
  createStore<UserPreferencesState>((set) => ({
    selectedVoice: initialState?.selectedVoice || null,
    setSelectedVoice: (voice) => set({ selectedVoice: voice }),
  }));
