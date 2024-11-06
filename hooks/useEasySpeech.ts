'use client';

import { useEffect, useState } from 'react';
import EasySpeech from 'easy-speech';

export function useEasySpeech() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== 'undefined') {
      EasySpeech.init({ maxTimeout: 5000, interval: 250 })
        .then(() => {
          setIsInitialized(true);
        })
        .catch((e) => {
          console.error('Error initializing EasySpeech:', e);
        });
    }
  }, []);

  return { easySpeech: typeof window !== 'undefined' && isInitialized ? EasySpeech : null };
}
