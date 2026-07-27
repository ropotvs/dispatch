import { clsx } from 'clsx';
import { ComponentProps } from 'react';

export function FeatAuthSubtitle(props: ComponentProps<'p'>) {
  return (
    <p
      {...props}
      className={clsx(
        'text-muted mt-1.5 hidden text-[0.8125rem] lg:block',
        props.className,
      )}
    />
  );
}
