import { clsx } from 'clsx';
import { ComponentProps } from 'react';

export function AtomInput(props: ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className={clsx(
        'border-ink aria-invalid:border-error h-12.5 w-full border-[2.5px] bg-white px-3.5 text-base outline-none lg:h-13 lg:px-4',
        props.className,
      )}
    />
  );
}
