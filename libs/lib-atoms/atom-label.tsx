import { clsx } from 'clsx';
import { ComponentProps } from 'react';

export function AtomLabel(props: ComponentProps<'label'>) {
  return (
    <label
      {...props}
      className={clsx(
        'block font-mono text-[0.6875rem] font-bold tracking-[0.08em] uppercase lg:text-xs',
        props.className,
      )}
    />
  );
}
