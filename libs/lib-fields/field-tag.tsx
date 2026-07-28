'use client';

import { AtomTag } from '@dispatch/atoms';
import { TypeField, TypeFieldTag } from '@dispatch/types';
import { clsx } from 'clsx';
import { ReactNode } from 'react';
import {
  FieldPathByValue,
  FieldPathValue,
  FieldValues,
  useController,
} from 'react-hook-form';

export function FieldTag<
  TValues extends FieldValues,
  TName extends FieldPathByValue<TValues, TypeFieldTag>,
>(
  props: TypeField<TValues, TypeFieldTag, TName> & {
    className?: string;
    options: readonly {
      label: ReactNode;
      value: FieldPathValue<TValues, TName>;
    }[];
  },
) {
  const controller = useController({
    control: props.control,
    name: props.name,
    rules: props.rules,
  });

  return (
    <div className={props.className}>
      {props.options.map((option) => (
        <AtomTag
          className={clsx(
            'shrink-0 px-2.25 py-1.25 text-[0.6875rem] lg:px-2.5 lg:text-xs',
            option.value === controller.field.value && 'font-bold',
          )}
          color={option.value === controller.field.value ? 'brand' : 'white'}
          key={String(option.value)}
          onClick={() =>
            controller.field.onChange(
              option.value === controller.field.value ? '' : option.value,
            )
          }
        >
          {option.label}
        </AtomTag>
      ))}
    </div>
  );
}
