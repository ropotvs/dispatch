'use client';

import { useEffect } from 'react';

export function useKeydown(
  active: boolean,
  key: string,
  onKeydown: () => void,
) {
  useEffect(() => {
    if (!active) return;
    const onEvent = (event: KeyboardEvent) => {
      if (event.key === key) onKeydown();
    };
    window.addEventListener('keydown', onEvent);
    return () => window.removeEventListener('keydown', onEvent);
  }, [active, key, onKeydown]);
}
