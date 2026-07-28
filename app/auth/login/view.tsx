'use client';

import { actionAuthLogin } from '@dispatch/actions';
import { PageAuthLogin } from '@dispatch/pages/page-auth-login';
import { useState } from 'react';

export function AuthLoginView() {
  const [error, setError] = useState<string>();

  return (
    <PageAuthLogin
      error={error}
      onSubmit={async (data) => {
        setError(undefined);
        const success = await actionAuthLogin(data);
        if (!success) {
          setError('Invalid email or password');
        }
      }}
    />
  );
}
