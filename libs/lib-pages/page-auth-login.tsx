'use client';

import { AtomButton } from '@dispatch/atoms';
import { FeatAuthSubtitle, FeatAuthTitle } from '@dispatch/feats';
import { FieldEmail, FieldPassword } from '@dispatch/fields';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

export function PageAuthLogin() {
  const form = useForm<{
    email: string;
    password: string;
  }>();

  const onSubmit = useCallback<Parameters<(typeof form)['handleSubmit']>[0]>(
    (data) => {
      console.log('data', data);
    },
    [],
  );

  return (
    <>
      <FeatAuthTitle>Log in</FeatAuthTitle>
      <FeatAuthSubtitle>Use a seeded account to continue.</FeatAuthSubtitle>
      <FormProvider {...form}>
        <form className="mt-6 lg:mt-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldEmail
            label="Email"
            name="email"
            placeholder="ada@dispatch.dev"
          />
          <div className="mt-4.5 lg:mt-5">
            <FieldPassword
              label="Password"
              name="password"
              placeholder="••••••••"
              autocomplete="current-password"
            />
          </div>
          <AtomButton type="submit" className="mt-7 w-full lg:mt-8">
            LOG IN →
          </AtomButton>
        </form>
      </FormProvider>
    </>
  );
}
