'use client';

import { FeatAuthSubtitle } from '@dispatch/feats/feat-auth-subtitle';
import { FeatAuthTitle } from '@dispatch/feats/feat-auth-title';
import { FormAuthLogin } from '@dispatch/forms/form-auth-login';
import { TypeFormAuthLogin } from '@dispatch/types';
import { SubmitHandler } from 'react-hook-form';

export function PageAuthLogin(props: {
  error?: string;
  onSubmit: SubmitHandler<TypeFormAuthLogin>;
}) {
  return (
    <>
      <FeatAuthTitle>Log in</FeatAuthTitle>
      <FeatAuthSubtitle>Use a seeded account to continue.</FeatAuthSubtitle>
      <FormAuthLogin
        className="mt-6 lg:mt-8"
        defaults={{ email: '', password: '' }}
        error={props.error}
        onSubmit={props.onSubmit}
      />
    </>
  );
}
