'use client';

import { TypeField, TypeFieldDate } from '@dispatch/types';
import { clsx } from 'clsx';
import { useState } from 'react';
import { FieldPathByValue, FieldValues, useController } from 'react-hook-form';

export function FieldDate<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, TypeFieldDate>,
>(
  props: TypeField<TValues, TypeFieldDate, TName> & {
    className?: string;
    placeholder?: string;
  },
) {
  const [focused, setFocused] = useState(false);

  const controller = useController({
    control: props.control,
    name: props.name,
    rules: props.rules,
  });

  const overlaid = !controller.field.value && !focused;

  return (
    <div className="relative">
      <input
        {...controller.field}
        aria-label={props.placeholder}
        className={clsx(
          'border-ink cursor-text bg-white outline-none [&::-webkit-calendar-picker-indicator]:cursor-pointer',
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
    </div>
  );
}
