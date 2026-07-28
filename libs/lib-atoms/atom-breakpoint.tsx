'use client';

import { useIsHydrated, useMediaQuery } from '@dispatch/hooks';
import { clsx } from 'clsx';
import { cloneElement, ReactElement } from 'react';

export function AtomBreakpoint(props: {
  desktop: ReactElement<{ className?: string }>;
  mobile: ReactElement<{ className?: string }>;
}) {
  const isHydrated = useIsHydrated();
  const isDesktop = useMediaQuery('(min-width: var(--breakpoint-lg))');

  if (!isHydrated) {
    return (
      <>
        {cloneElement(props.desktop, {
          className: clsx(props.desktop.props.className, 'max-lg:hidden'),
        })}
        {cloneElement(props.mobile, {
          className: clsx(props.mobile.props.className, 'lg:hidden'),
        })}
      </>
    );
  }

  return isDesktop ? props.desktop : props.mobile;
}
