'use client';

import { AtomMenu } from '@dispatch/atoms';
import { IconChevronDown } from '@dispatch/icons';
import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export function FieldSelect<TValue extends string>(props: {
  className?: string;
  prefix?: ReactNode;
  name: string;
  options: readonly { label: ReactNode; value: TValue }[];
}) {
  const form = useFormContext();
  const value = useWatch({ control: form.control, name: props.name }) as TValue;
  const selected = props.options.find((option) => option.value === value);

  return (
    <AtomMenu
      className={props.className}
      trigger={
        <>
          {props.prefix}
          {selected?.label}
          <IconChevronDown />
        </>
      }
    >
      {props.options.map((option) => (
        <button
          className={clsx(
            'hover:bg-brand block w-full cursor-pointer px-3 py-2 text-left font-mono text-xs font-bold whitespace-nowrap',
            option.value === value && 'bg-brand',
          )}
          key={option.value}
          onClick={() => form.setValue(props.name, option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </AtomMenu>
  );
}
