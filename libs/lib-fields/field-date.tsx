'use client';

import { AtomField } from '@dispatch/atoms';
import { IconCalendar } from '@dispatch/icons';
import { TypeField, TypeFieldDate } from '@dispatch/types';
import { clsx } from 'clsx';
import { ReactNode, useId, useState } from 'react';
import { FieldPathByValue, FieldValues, useController } from 'react-hook-form';

export function FieldDate<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, TypeFieldDate>,
>(
  props: TypeField<TValues, TypeFieldDate, TName> & {
    className?: string;
    label?: ReactNode;
    placeholder?: string;
  },
) {
  const id = useId();
  const [focused, setFocused] = useState(false);

  const controller = useController({
    control: props.control,
    name: props.name,
    rules: props.rules,
  });

  const overlaid = !controller.field.value && !focused;

  return (
    <AtomField
      error={controller.fieldState.error?.message}
      label={props.label}
      labelFor={id}
    >
      <div className="relative">
        <input
          {...controller.field}
          id={id}
          aria-label={props.placeholder}
          className={clsx(
            'border-ink cursor-text bg-white outline-none [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:top-1/2 [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:size-4.5 [&::-webkit-calendar-picker-indicator]:-translate-y-1/2 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0',
            overlaid && 'text-transparent',
            props.className,
          )}
          type="date"
          value={controller.field.value ?? ''}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            controller.field.onBlur();
          }}
        />
        {overlaid && (
          <span
            className={clsx(
              'text-placeholder pointer-events-none absolute inset-0 flex items-center border-transparent',
              props.className,
            )}
          >
            {props.placeholder}
          </span>
        )}
        <span className="pointer-events-none absolute top-1/2 right-4 hidden -translate-y-1/2 supports-[selector(::-webkit-calendar-picker-indicator)]:block">
          <IconCalendar />
        </span>
      </div>
    </AtomField>
  );
}
