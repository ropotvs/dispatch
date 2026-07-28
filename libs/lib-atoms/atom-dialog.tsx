'use client';

import { useBodyScrollLock } from '@dispatch/hooks';
import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState,
} from 'react';

export function AtomDialog(props: {
  trigger: ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }>;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useBodyScrollLock(open);

  return (
    <>
      {cloneElement(props.trigger, { onClick: () => setOpen(!open) })}
      {open && (
        <div
          className="bg-ink/50 fixed inset-0 z-30"
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <div
          aria-modal="true"
          role="dialog"
          className="border-ink fixed top-1/2 left-1/2 z-40 w-[calc(100%-2.5rem)] max-w-105 -translate-x-1/2 -translate-y-1/2 border-[3px] bg-white p-6 shadow-[8px_8px_0_var(--color-ink)] lg:p-7"
          onClick={(event) => {
            if (
              event.target instanceof Element &&
              event.target.closest('a, button')
            ) {
              setOpen(false);
            }
          }}
        >
          {props.children}
        </div>
      )}
    </>
  );
}
