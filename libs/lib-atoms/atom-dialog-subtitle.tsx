import { ReactNode } from 'react';

export function AtomDialogSubtitle(props: { children: ReactNode }) {
  return (
    <p className="text-muted mt-2 text-sm leading-[1.6]">{props.children}</p>
  );
}
