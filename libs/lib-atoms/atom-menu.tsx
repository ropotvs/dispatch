'use client';

import { clsx } from 'clsx';
import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState,
} from 'react';

export function AtomMenu(props: {
  align?: 'end' | 'start';
  trigger: ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }>;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {cloneElement(props.trigger, { onClick: () => setOpen(!open) })}
      {open && (
        <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
      )}
      {open && (
        <div
          className={clsx(
            'border-ink absolute top-full z-40 mt-1 min-w-full border-2 bg-white',
            props.align === 'end' ? 'right-0' : 'left-0',
          )}
          onClick={() => setOpen(false)}
        >
          {props.children}
        </div>
      )}
    </div>
  );
}
