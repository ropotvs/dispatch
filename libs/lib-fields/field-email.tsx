'use client';

import { AtomField, AtomInput } from '@dispatch/atoms';
import { TypeField, TypeFieldEmail } from '@dispatch/types';
import { ReactNode, useId } from 'react';
import { FieldValues, useController } from 'react-hook-form';

export function FieldEmail<TValues extends FieldValues>(
  props: TypeField<TValues, TypeFieldEmail> & {
    label?: ReactNode;
    placeholder?: string;
  },
) {
  const id = useId();
  const controller = useController({
    control: props.control,
    name: props.name,
    rules: props.rules,
  });

  return (
    <AtomField
      error={controller.fieldState.error?.message}
      label={props.label}
      labelFor={id}
    >
      <AtomInput
        {...controller.field}
        id={id}
        type="email"
        autoComplete="email"
        aria-invalid={controller.fieldState.invalid}
        spellCheck={false}
        placeholder={props.placeholder}
      />
    </AtomField>
  );
}
