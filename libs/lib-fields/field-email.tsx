import { AtomInput } from '@dispatch/atoms';
import { TypeField } from '@dispatch/types';
import { ReactNode } from 'react';
import { Field } from './field';

export function FieldEmail(
  props: TypeField & {
    label: ReactNode;
    placeholder?: string;
  },
) {
  return (
    <Field label={props.label}>
      <AtomInput
        id={props.id}
        name={props.name}
        type="email"
        autoComplete="email"
        spellCheck={false}
        placeholder={props.placeholder}
      />
    </Field>
  );
}
