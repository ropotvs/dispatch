'use client';

import { AtomButton } from '@dispatch/atoms';
import { FieldEmail, FieldPassword } from '@dispatch/fields';
import { IconArrowRight } from '@dispatch/icons';
import { TypeFormAuthLogin } from '@dispatch/types';
import { SubmitHandler, useForm } from 'react-hook-form';

export function FormAuthLogin(props: {
  className?: string;
  defaults: TypeFormAuthLogin;
  error?: string;
  onSubmit: SubmitHandler<TypeFormAuthLogin>;
}) {
  const form = useForm<TypeFormAuthLogin>({
    defaultValues: props.defaults,
  });

  return (
    <form
      className={props.className}
      onSubmit={form.handleSubmit(props.onSubmit)}
    >
      <FieldEmail
        control={form.control}
        label="Email"
        name="email"
        placeholder="ada@dispatch.dev"
        rules={{
          required: 'Email is required',
          pattern: { message: 'Enter a valid email', value: /^\S+@\S+\.\S+$/ },
        }}
      />
      <div className="mt-4.5 lg:mt-5">
        <FieldPassword
          control={form.control}
          label="Password"
          name="password"
          placeholder="••••••••"
          autocomplete="current-password"
          rules={{ required: 'Password is required' }}
        />
      </div>
      {props.error && (
        <p className="text-error mt-4.5 font-mono text-[0.625rem] font-bold tracking-[0.08em] uppercase">
          {props.error}
        </p>
      )}
      <AtomButton type="submit" className="mt-7 w-full lg:mt-8">
        LOG IN <IconArrowRight />
      </AtomButton>
    </form>
  );
}
