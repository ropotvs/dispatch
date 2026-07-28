'use client';

import { AtomButton } from '@dispatch/atoms';
import { ConstMessageMaxLength } from '@dispatch/consts';
import { EnumMessageTag } from '@dispatch/enums';
import { FieldSelect } from '@dispatch/fields';
import { TypeFormMessageCreate } from '@dispatch/types';
import { clsx } from 'clsx';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

export function FormMessageCreate(props: {
  className?: string;
  defaults: TypeFormMessageCreate;
  onSubmit: SubmitHandler<TypeFormMessageCreate>;
}) {
  const form = useForm<TypeFormMessageCreate>({
    defaultValues: props.defaults,
  });
  const formValueText = useWatch({
    control: form.control,
    name: 'text',
  });

  const limitNear = formValueText.length >= ConstMessageMaxLength * 0.9;
  const limitReached = formValueText.length >= ConstMessageMaxLength;

  return (
    <form
      className={clsx(
        'border-ink border-[3px] bg-white p-3.5 shadow-[4px_4px_0_var(--color-ink)] lg:p-4.5 lg:shadow-[6px_6px_0_var(--color-ink)]',
        props.className,
      )}
      onSubmit={form.handleSubmit(props.onSubmit)}
    >
      <textarea
        {...form.register('text')}
        className="placeholder:text-placeholder block field-sizing-content max-h-40 min-h-10 w-full resize-none text-[0.9375rem] wrap-anywhere outline-none lg:min-h-16 lg:text-base"
        maxLength={ConstMessageMaxLength}
        placeholder="What's happening?"
      />
      <div className="mt-2.5 flex items-center justify-between lg:mt-1.5 lg:border-t-2 lg:border-[#eeeeee] lg:pt-3.5">
        <FieldSelect
          className="h-8 gap-1.5 border-2 px-2 font-mono text-[0.6875rem] font-bold lg:h-9.5 lg:px-3 lg:text-xs"
          control={form.control}
          name="tag"
          options={Object.values(EnumMessageTag).map((tag) => ({
            label: tag,
            value: tag,
          }))}
          prefix={<span className="hidden lg:inline">TAG:</span>}
        />
        <div className="flex items-center gap-4">
          <span
            className={clsx(
              'text-[0.8125rem]',
              `${limitNear ? 'inline' : 'hidden lg:inline'}`,
              `${limitReached ? 'text-error font-bold' : limitNear ? 'text-accent font-bold' : 'text-muted'}`,
            )}
          >
            {formValueText.length}/{ConstMessageMaxLength}
          </span>
          <AtomButton type="submit" size="sm">
            POST
          </AtomButton>
        </div>
      </div>
    </form>
  );
}
