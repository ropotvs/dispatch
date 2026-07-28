'use client';

import { AtomField, AtomInput } from '@dispatch/atoms';
import { IconEye, IconEyeOff } from '@dispatch/icons';
import { TypeField, TypeFieldPassword } from '@dispatch/types';
import { clsx } from 'clsx';
import { ReactNode, useId, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';

export function FieldPassword<TValues extends FieldValues>(
  props: TypeField<TValues, TypeFieldPassword> & {
    label?: ReactNode;
    placeholder?: string;
    autocomplete?: 'current-password' | 'new-password';
  },
) {
  const [revealed, setRevealed] = useState(false);

  const id = useId();
  const controller = useController({
    control: props.control,
    name: props.name,
    rules: props.rules,
  });

  const filled = String(controller.field.value ?? '').length > 0;

  return (
    <AtomField
      error={controller.fieldState.error?.message}
      label={props.label}
      labelFor={id}
    >
      <div className="relative">
        <AtomInput
          {...controller.field}
          id={id}
          className={clsx(filled && 'pr-11')}
          spellCheck={false}
          aria-invalid={controller.fieldState.invalid}
          autoComplete={props.autocomplete}
          placeholder={props.placeholder}
          type={revealed ? 'text' : 'password'}
        />
        {filled && (
          <button
            type="button"
            aria-label={revealed ? 'Hide password' : 'Show password'}
            className="text-ink absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer lg:right-4"
            onClick={() => setRevealed(!revealed)}
          >
            {revealed ? <IconEyeOff /> : <IconEye />}
          </button>
        )}
      </div>
    </AtomField>
  );
}
