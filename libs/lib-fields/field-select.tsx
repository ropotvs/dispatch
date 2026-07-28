'use client';

import { AtomField, AtomMenu, AtomMenuItem } from '@dispatch/atoms';
import { IconChevronDown } from '@dispatch/icons';
import { TypeField, TypeFieldSelect } from '@dispatch/types';
import { clsx } from 'clsx';
import { ReactNode, useId } from 'react';
import {
  FieldPathByValue,
  FieldPathValue,
  FieldValues,
  useController,
} from 'react-hook-form';

export function FieldSelect<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, TypeFieldSelect<string | null>>,
>(
  props: TypeField<TValues, TypeFieldSelect<string | null>, TName> & {
    className?: string;
    label?: ReactNode;
    prefix?: ReactNode;
    options: readonly {
      label: ReactNode;
      value: FieldPathValue<TValues, TName>;
    }[];
  },
) {
  const id = useId();
  const controller = useController({
    control: props.control,
    name: props.name,
    rules: props.rules,
  });

  const selected = props.options.find(
    (option) => option.value === controller.field.value,
  );

  return (
    <AtomField
      error={controller.fieldState.error?.message}
      label={props.label}
      labelFor={id}
    >
      <AtomMenu
        trigger={
          <button
            id={id}
            type="button"
            data-invalid={controller.fieldState.invalid ? '' : undefined}
            className={clsx(
              'border-ink data-invalid:border-error flex cursor-pointer items-center bg-white',
              props.className,
            )}
          >
            {props.prefix}
            {selected?.label}
            <IconChevronDown />
          </button>
        }
      >
        {props.options.map((option) => (
          <AtomMenuItem
            active={option.value === controller.field.value}
            key={String(option.value)}
            onClick={() => controller.field.onChange(option.value)}
          >
            {option.label}
          </AtomMenuItem>
        ))}
      </AtomMenu>
    </AtomField>
  );
}
