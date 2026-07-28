'use client';

import { useCallback, useState } from 'react';

export function useStateWithProps<TValue>(
  propsValue: TValue,
  valueChange?: (value: TValue) => void,
) {
  const [value, setValue] = useState(propsValue);
  const [previousPropsValue, setPreviousPropsValue] = useState(
    JSON.stringify(propsValue),
  );

  const propsValueJson = JSON.stringify(propsValue);
  if (previousPropsValue !== propsValueJson) {
    setPreviousPropsValue(propsValueJson);
    setValue(propsValue);
  }

  const setValueAndEmit = useCallback(
    (nextValue: TValue) => {
      setValue(nextValue);
      valueChange?.(nextValue);
    },
    [valueChange],
  );

  return [value, setValueAndEmit] as const;
}
