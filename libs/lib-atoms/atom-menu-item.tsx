import { clsx } from 'clsx';
import {
  cloneElement,
  ComponentProps,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from 'react';

export function AtomMenuItem(props: {
  active?: boolean;
  children?: ReactNode;
  className?: string;
  element?: ReactElement<ComponentProps<'button'>>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return cloneElement(props.element ?? <button />, {
    ...props.element?.props,
    children: props.children,
    className: clsx(
      'hover:bg-brand block w-full cursor-pointer px-3 py-2 text-left font-mono text-xs font-bold whitespace-nowrap',
      props.active && 'bg-brand',
      props.className,
    ),
    onClick: props.onClick,
    type: props.element ? undefined : 'button',
  });
}
