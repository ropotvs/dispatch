import { clsx } from 'clsx';
import { ComponentProps } from 'react';

export function AtomButton(props: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        'border-ink bg-brand inline-flex h-13.5 cursor-pointer items-center justify-center gap-2 border-[3px] font-mono text-base font-bold shadow-[5px_5px_0_var(--color-ink)] lg:h-14 lg:tracking-[0.02em]',
        props.className,
      )}
    />
  );
}
