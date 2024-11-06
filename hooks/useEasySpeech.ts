'use client';

import EasySpeech from 'easy-speech';

typeof window !== 'undefined' && EasySpeech.init({ maxTimeout: 5000, interval: 250 });

export function useEasySpeech() {
  return { easySpeech: typeof window !== 'undefined' ? EasySpeech : null };
}
