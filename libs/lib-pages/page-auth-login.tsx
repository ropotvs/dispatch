'use client';

import { FeatAuthSubtitle } from '@dispatch/feats/feat-auth-subtitle';
import { FeatAuthTitle } from '@dispatch/feats/feat-auth-title';
import { FormAuthLogin } from '@dispatch/forms/form-auth-login';

export function PageAuthLogin() {
  return (
    <>
      <FeatAuthTitle>Log in</FeatAuthTitle>
      <FeatAuthSubtitle>Use a seeded account to continue.</FeatAuthSubtitle>
      <FormAuthLogin
        className="mt-6 lg:mt-8"
        defaults={{ email: '', password: '' }}
        onSubmit={(data) => {
          console.log('data', data);
        }}
      />
    </>
  );
}
