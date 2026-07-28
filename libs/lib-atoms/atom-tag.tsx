import { clsx } from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';

export function AtomTag(props: {
  className?: string;
  color?: 'brand' | 'white';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) {
  const className = clsx(
    'border-ink border-2 font-mono',
    { brand: 'bg-brand', white: 'bg-white' }[props.color ?? 'white'],
    props.className,
  );

  if (props.onClick) {
    return (
      <button
        className={clsx(
          className,
          'cursor-pointer transition-[translate,box-shadow] duration-100 hover:translate-[-1px] hover:shadow-[2px_2px_0_var(--color-ink)] active:translate-[0px] active:shadow-none',
        )}
        onClick={props.onClick}
        type="button"
      >
        {props.children}
      </button>
    );
  }

  return <span className={className}>{props.children}</span>;
}
