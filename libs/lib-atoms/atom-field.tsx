import { ReactNode } from 'react';

export function AtomField(props: {
  children: ReactNode;
  error?: ReactNode;
  label?: ReactNode;
  labelFor?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {props.label && (
        <label
          className="block font-mono text-[0.6875rem] font-bold tracking-[0.08em] uppercase lg:text-xs"
          htmlFor={props.labelFor}
        >
          {props.label}
        </label>
      )}
      {props.children}
      {props.error && (
        <p className="text-error font-mono text-[0.6875rem] font-bold tracking-[0.08em] uppercase lg:text-xs">
          {props.error}
        </p>
      )}
    </div>
  );
}
