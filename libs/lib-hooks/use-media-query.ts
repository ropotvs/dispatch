'use client';

import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(resolveQuery(query));
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(resolveQuery(query)).matches,
    () => false,
  );
}

function resolveQuery(query: string): string {
  return query.replace(/var\((--[\w-]+)\)/g, (match, name: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
  );
}
