import { FeatAuthLayout } from '@dispatch/feats';
import { ReactNode } from 'react';

export default function AuthLayout(props: { children: ReactNode }) {
  return <FeatAuthLayout>{props.children}</FeatAuthLayout>;
}
