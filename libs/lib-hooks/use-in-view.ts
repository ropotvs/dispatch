'use client';

import { useCallback, useEffect, useRef } from 'react';

export function useInView<TElement extends HTMLElement>(
  enabled: boolean,
  onEnter: () => void,
) {
  const onEnterRef = useRef(onEnter);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    onEnterRef.current = onEnter;
  });

  return useCallback(
    (element: TElement | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!element || !enabled) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            onEnterRef.current();
          }
        },
        { rootMargin: '200px' },
      );
      observer.observe(element);
      observerRef.current = observer;
    },
    [enabled],
  );
}
