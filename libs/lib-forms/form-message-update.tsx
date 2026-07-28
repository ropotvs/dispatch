'use client';

import { AtomButton } from '@dispatch/atoms';
import { ConstMessageMaxLength } from '@dispatch/consts';
import { EnumMessageTag } from '@dispatch/enums';
import { FieldSelect } from '@dispatch/fields';
import { TypeFormMessageUpdate } from '@dispatch/types';
import { clsx } from 'clsx';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

export function FormMessageUpdate(props: {
  defaults: TypeFormMessageUpdate;
  onCancel: () => void;
  onSubmit: SubmitHandler<TypeFormMessageUpdate>;
}) {
  const form = useForm<TypeFormMessageUpdate>({
    defaultValues: props.defaults,
  });
  const formValueText = useWatch({
    control: form.control,
    name: 'text',
  });

  const limitNear = formValueText.length >= ConstMessageMaxLength * 0.9;
  const limitReached = formValueText.length >= ConstMessageMaxLength;

  return (
    <form onSubmit={form.handleSubmit(props.onSubmit)}>
      <textarea
        {...form.register('text', { required: true })}
        autoFocus
        className="border-ink focus:outline-ink block field-sizing-content max-h-40 min-h-16 w-full resize-none border-2 p-2.5 text-sm leading-[1.45] wrap-anywhere focus:outline-2 focus:outline-offset-2 lg:text-base lg:leading-[1.5]"
        maxLength={ConstMessageMaxLength}
      />
      <div className="mt-2.5 flex items-center justify-between">
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
              'hidden text-[0.8125rem] lg:inline',
              limitReached
                ? 'text-error font-bold'
                : limitNear
                  ? 'text-accent font-bold'
                  : 'text-muted',
            )}
          >
            {formValueText.length}/{ConstMessageMaxLength}
          </span>
          <div className="flex gap-1.5 lg:gap-2.5">
            <AtomButton
              color="white"
              size="xs"
              variant="static"
              onClick={props.onCancel}
            >
              CANCEL
            </AtomButton>
            <AtomButton size="xs" type="submit" variant="static">
              SAVE
            </AtomButton>
          </div>
        </div>
      </div>
    </form>
  );
}
