'use client';

import { useEffect, useState } from 'react';
import EasySpeech from 'easy-speech';

typeof window !== 'undefined' && EasySpeech.init({ maxTimeout: 5000, interval: 250 });

export function useEasySpeech() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    typeof window !== 'undefined' &&
      EasySpeech.init({ maxTimeout: 5000, interval: 250 }).then(() => {
        setIsInitialized(true);
      });
  }, []);

  return {
    easySpeech: typeof window !== 'undefined' && isInitialized ? EasySpeech : null,
  };
}
