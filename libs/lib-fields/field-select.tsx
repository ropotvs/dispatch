'use client';

import { AtomMenu, AtomMenuItem } from '@dispatch/atoms';
import { IconChevronDown } from '@dispatch/icons';
import { ReactNode } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export function FieldSelect<TValue extends string | null>(props: {
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
        <AtomMenuItem
          active={option.value === value}
          key={option.value}
          onClick={() => form.setValue(props.name, option.value)}
        >
          {option.label}
        </AtomMenuItem>
      ))}
    </AtomMenu>
  );
}
