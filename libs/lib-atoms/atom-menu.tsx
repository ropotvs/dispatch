'use client';

import {
  cloneElement,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useState,
} from 'react';

export function AtomMenu(props: {
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
          className="border-ink absolute top-full left-0 z-40 mt-1 min-w-full border-2 bg-white"
          onClick={() => setOpen(false)}
        >
          {props.children}
        </div>
      )}
    </div>
  );
}
