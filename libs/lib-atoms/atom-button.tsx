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
  type?: 'button' | 'submit';
  children?: ReactNode;
  element?: ReactElement<ComponentProps<'button'>>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return cloneElement(props.element ?? <button />, {
    ...props.element?.props,
    children: props.children,
    className: clsx(
      'border-ink bg-brand inline-flex h-13.5 cursor-pointer items-center justify-center gap-2 border-[3px] font-mono text-base font-bold shadow-[5px_5px_0_var(--color-ink)] lg:h-14 lg:tracking-[0.02em]',
      props.className,
    ),
    disabled: props.disabled,
    onClick: props.onClick,
    type: props.element ? undefined : (props.type ?? 'button'),
  });
}
