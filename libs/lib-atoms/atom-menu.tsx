'use client';

import { clsx } from 'clsx';
import { ReactNode, useState } from 'react';

export function AtomMenu(props: {
  className?: string;
  trigger: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className={clsx(
          'border-ink flex cursor-pointer items-center bg-white',
          props.className,
        )}
        onClick={() => setOpen(!open)}
        type="button"
      >
        {props.trigger}
      </button>
      {open && (
        <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
      )}
      {open && (
        <div
          className="border-ink absolute top-full left-0 z-40 mt-1 min-w-full border-2 bg-white"
          onClick={() => setOpen(false)}
        >
          {props.children}
        </div>
      )}
    </div>
  );
}
