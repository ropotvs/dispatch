'use client';

import { AtomButton } from '@dispatch/atoms';
import { FieldEmail, FieldPassword } from '@dispatch/fields';
import { IconArrowRight } from '@dispatch/icons';
import { TypeFormAuthLogin } from '@dispatch/types';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

export function FormAuthLogin(props: {
  className?: string;
  defaults: TypeFormAuthLogin;
  onSubmit: SubmitHandler<TypeFormAuthLogin>;
}) {
  const form = useForm<TypeFormAuthLogin>({ defaultValues: props.defaults });

  return (
    <FormProvider {...form}>
      <form
        className={props.className}
        onSubmit={form.handleSubmit(props.onSubmit)}
      >
        <FieldEmail label="Email" name="email" placeholder="ada@dispatch.dev" />
        <div className="mt-4.5 lg:mt-5">
          <FieldPassword
            label="Password"
            name="password"
            placeholder="••••••••"
            autocomplete="current-password"
          />
        </div>
        <AtomButton type="submit" className="mt-7 w-full lg:mt-8">
          LOG IN <IconArrowRight />
        </AtomButton>
      </form>
    </FormProvider>
  );
}
