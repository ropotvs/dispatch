'use client';

import { useBodyScrollLock, useKeydown } from '@dispatch/hooks';
import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState,
} from 'react';

export function AtomDrawer(props: {
  trigger: ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }>;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useBodyScrollLock(open);
  useKeydown(open, 'Escape', () => setOpen(false));

  return (
    <>
      {cloneElement(props.trigger, { onClick: () => setOpen(!open) })}
      {open && (
        <div
          className="bg-ink/50 motion-safe:animate-fade-in fixed inset-0 z-30"
          onClick={() => setOpen(false)}
        />
      )}
      {open && (
        <div
          className="border-ink bg-paper motion-safe:animate-slide-up fixed inset-x-0 bottom-0 z-40 border-t-[3px] p-5 pb-8"
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest('a')) {
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
