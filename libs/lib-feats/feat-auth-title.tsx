import { clsx } from 'clsx';
import { ComponentProps } from 'react';

export function FeatAuthTitle(props: ComponentProps<'h2'>) {
  return (
    <h2
      {...props}
      className={clsx(
        'text-[1.625rem] font-bold tracking-[-0.02em] lg:text-[1.875rem]',
        props.className,
      )}
    />
  );
}
