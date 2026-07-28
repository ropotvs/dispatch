import { clsx } from 'clsx';
import { ReactNode } from 'react';

export function AtomFieldError(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={clsx(
        'text-error font-mono text-[0.625rem] font-bold tracking-[0.08em] uppercase',
        props.className,
      )}
    >
      {props.children}
    </p>
  );
}
