'use client';

import { AtomInput } from '@dispatch/atoms';
import { TypeField } from '@dispatch/types';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { Field } from './field';

export function FieldEmail(
  props: TypeField & {
    label: ReactNode;
    placeholder?: string;
  },
) {
  const form = useFormContext();

  return (
    <Field label={props.label}>
      <AtomInput
        {...form.register(props.name)}
        id={props.id}
        type="email"
        autoComplete="email"
        spellCheck={false}
        placeholder={props.placeholder}
      />
    </Field>
  );
}
