'use client';

import { PageAuthLogin } from '@dispatch/pages/page-auth-login';
import { useRouter } from 'next/navigation';

export function AuthLoginView() {
  const router = useRouter();

  return (
    <PageAuthLogin
      onSubmit={(data) => {
        console.log('login with', data);
        router.push('/');
      }}
    />
  );
}
