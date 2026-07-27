import { AtomLabel } from '@dispatch/atoms';
import { TypeField } from '@dispatch/types';
import { cloneElement, ReactElement, ReactNode } from 'react';

export function Field(props: {
  label: ReactNode;
  children: ReactElement<TypeField>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <AtomLabel htmlFor={props.children.props.id}>{props.label}</AtomLabel>
      {cloneElement(props.children)}
    </div>
  );
}
