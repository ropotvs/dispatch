import { clsx } from 'clsx';
import {
  cloneElement,
  ComponentProps,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';

export function AtomButton(props: {
  className?: string;
  disabled?: boolean;
  color?: 'brand' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
  variant?: 'shadow' | 'static';
  children?: ReactNode;
  element?: ReactElement<ComponentProps<'button'>>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const size = props.size ?? 'lg';

  return cloneElement(props.element ?? <button />, {
    ...props.element?.props,
    children: props.children,
    className: clsx(
      'border-ink inline-flex cursor-pointer items-center justify-center gap-2 font-mono font-bold',
      { brand: 'bg-brand', white: 'bg-white' }[props.color ?? 'brand'],
      {
        xs: 'border-2 px-2 py-1 text-[0.6875rem] lg:px-3 lg:py-1.5 lg:text-xs',
        sm: 'h-9 border-[2.5px] px-4 text-[0.8125rem] lg:h-10.5 lg:border-[3px] lg:px-5.5 lg:text-sm',
        md: 'h-11.5 border-[3px] px-6.5 text-[0.8125rem]',
        lg: 'h-13.5 border-[3px] text-base lg:h-14 lg:tracking-[0.02em]',
      }[size],
      (props.variant ?? 'shadow') === 'shadow' &&
        {
          xs: 'shadow-[2px_2px_0_var(--color-ink)]',
          sm: 'shadow-[2px_2px_0_var(--color-ink)] lg:shadow-[3px_3px_0_var(--color-ink)]',
          md: 'shadow-[4px_4px_0_var(--color-ink)]',
          lg: 'shadow-[5px_5px_0_var(--color-ink)]',
        }[size],
      props.className,
    ),
    disabled: props.disabled,
    onClick: props.onClick,
    type: props.element ? undefined : (props.type ?? 'button'),
  });
}
