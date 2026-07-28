import { PageAuth } from '@dispatch/pages/page-auth';
import { ReactNode } from 'react';

export default function AuthLayout(props: { children: ReactNode }) {
  return <PageAuth>{props.children}</PageAuth>;
}
