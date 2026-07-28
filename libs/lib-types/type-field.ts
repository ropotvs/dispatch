import {
  Control,
  FieldPathByValue,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';

export type TypeField<
  TValues extends FieldValues,
  TValue,
  TName extends FieldPathByValue<TValues, TValue> = FieldPathByValue<
    TValues,
    TValue
  >,
> = {
  control: Control<TValues>;
  name: TName;
  rules?: UseControllerProps<TValues, TName>['rules'];
};
