import { clsx } from 'clsx';
import { ComponentProps } from 'react';

export function AtomLogo(props: ComponentProps<'span'>) {
  return (
    <span
      {...props}
      className={clsx(
        'font-mono tracking-[0.12em] select-none',
        props.className,
      )}
    >
      ◆ DISPATCH
    </span>
  );
}
