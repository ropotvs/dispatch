import { ReactNode } from 'react';

export function AtomDialogFooter(props: { children: ReactNode }) {
  return <div className="mt-6 flex justify-end gap-3">{props.children}</div>;
}
