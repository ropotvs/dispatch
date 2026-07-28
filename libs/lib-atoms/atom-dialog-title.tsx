import { ReactNode } from 'react';

export function AtomDialogTitle(props: { children: ReactNode }) {
  return (
    <div className="text-xl font-bold tracking-[-0.02em]">{props.children}</div>
  );
}
