'use client';

import { AtomInput } from '@dispatch/atoms';
import { IconEye, IconEyeOff } from '@dispatch/icons';
import { TypeField } from '@dispatch/types';
import { clsx } from 'clsx';
import { ReactNode, useState } from 'react';
import { Field } from './field';

export function FieldPassword(
  props: TypeField & {
    label: ReactNode;
    placeholder?: string;
    autocomplete?: 'current-password' | 'new-password';
  },
) {
  const [filled, setFilled] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <Field label={props.label}>
      <div className="relative">
        <AtomInput
          id={props.id}
          name={props.name}
          className={clsx(filled && 'pr-11')}
          spellCheck={false}
          autoComplete={props.autocomplete}
          placeholder={props.placeholder}
          type={revealed ? 'text' : 'password'}
          onChange={(event) => setFilled(event.target.value.length > 0)}
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
    </Field>
  );
}
