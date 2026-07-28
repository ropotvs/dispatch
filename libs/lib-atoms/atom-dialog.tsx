'use client';

import { useBodyScrollLock, useKeydown } from '@dispatch/hooks';
import { TypeAtomDialog } from '@dispatch/types';
import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  Ref,
  useImperativeHandle,
  useState,
} from 'react';

export function AtomDialog({
  ref,
  ...props
}: {
  ref?: Ref<TypeAtomDialog>;
  trigger?: ReactElement<{
    'aria-expanded'?: boolean;
    'aria-haspopup'?: 'dialog';
    onClick?: MouseEventHandler<HTMLElement>;
  }>;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    close: () => setOpen(false),
    open: () => setOpen(true),
  }));

  useBodyScrollLock(open);
  useKeydown(open, 'Escape', () => setOpen(false));

  return (
    <>
      {props.trigger &&
        cloneElement(props.trigger, {
          'aria-expanded': open,
          'aria-haspopup': 'dialog',
          onClick: () => setOpen(!open),
        })}
      {open && (
        <div
          className="bg-ink/50 motion-safe:animate-fade-in fixed inset-0 z-30"
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <div
          aria-modal="true"
          role="dialog"
          className="border-ink motion-safe:animate-pop-in fixed top-1/2 left-1/2 z-40 w-[calc(100%-2.5rem)] max-w-105 -translate-x-1/2 -translate-y-1/2 border-[3px] bg-white p-6 shadow-[8px_8px_0_var(--color-ink)] lg:p-7"
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
