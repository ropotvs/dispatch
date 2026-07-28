'use client';

import { AtomBreakpoint, AtomDrawer } from '@dispatch/atoms';
import { EnumMessageTag } from '@dispatch/enums';
import { FieldDate, FieldSelect, FieldTag } from '@dispatch/fields';
import { IconGear } from '@dispatch/icons';
import { TypeDtoUser, TypeFormFeedFilter } from '@dispatch/types';
import { ReactNode, useEffect, useMemo } from 'react';
import { Control, useForm } from 'react-hook-form';

export function FormFeedFilter(props: {
  users: TypeDtoUser[];
  value: TypeFormFeedFilter;
  valueChange: (value: TypeFormFeedFilter) => void;
}) {
  const form = useForm<TypeFormFeedFilter>({
    defaultValues: { dateFrom: '', dateTo: '', tag: null, authorId: null },
    resetOptions: { keepDefaultValues: true },
    values: props.value,
  });

  useEffect(() => {
    return form.subscribe({
      formState: { values: true },
      callback: (data) => {
        if (JSON.stringify(data.values) !== JSON.stringify(props.value)) {
          props.valueChange(data.values);
        }
      },
    });
  });

  const onClear = useMemo(() => {
    const isEmpty = Object.values(props.value).every(
      (entry) => entry === null || entry === '',
    );
    return isEmpty ? undefined : () => form.reset();
  }, [form, props.value]);

  return (
    <AtomBreakpoint
      desktop={
        <aside className="flex flex-col gap-6">
          <FormFeedFilterHeader onClear={onClear} />
          <FormFeedFilterTag
            className="flex flex-wrap gap-2"
            control={form.control}
            label="Tag"
          />
          <FormFeedFilterUser control={form.control} users={props.users} />
          <FormFeedFilterDate control={form.control} />
        </aside>
      }
      mobile={
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <FormFeedFilterTag
              className="-m-1 flex scrollbar-none gap-2 overflow-x-auto p-1"
              control={form.control}
            />
          </div>
          <AtomDrawer
            trigger={
              <button
                className="border-ink flex h-8 w-9 shrink-0 cursor-pointer items-center justify-center border-[2.5px] bg-white transition-[translate,box-shadow] duration-100 hover:translate-[-1px] hover:shadow-[2px_2px_0_var(--color-ink)] active:translate-[0px] active:shadow-none"
                type="button"
              >
                <IconGear />
              </button>
            }
          >
            <div className="flex flex-col gap-6">
              <FormFeedFilterHeader onClear={onClear} />
              <FormFeedFilterUser control={form.control} users={props.users} />
              <FormFeedFilterDate control={form.control} />
            </div>
          </AtomDrawer>
        </div>
      }
    />
  );
}

function FormFeedFilterHeader(props: { onClear?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="font-mono text-[0.8125rem] font-bold tracking-widest">
        FILTERS
      </div>
      {props.onClear && (
        <button
          type="button"
          className="text-muted hover:text-ink cursor-pointer text-xs underline transition-colors duration-100"
          onClick={props.onClear}
        >
          clear
        </button>
      )}
    </div>
  );
}

function FormFeedFilterTag(props: {
  className?: string;
  control: Control<TypeFormFeedFilter>;
  label?: ReactNode;
}) {
  return (
    <FieldTag
      className={props.className}
      control={props.control}
      label={props.label}
      name="tag"
      options={Object.values(EnumMessageTag).map((tag) => ({
        label: tag,
        value: tag,
      }))}
    />
  );
}

function FormFeedFilterUser(props: {
  control: Control<TypeFormFeedFilter>;
  users: TypeDtoUser[];
}) {
  return (
    <FieldSelect
      label="User"
      className="h-11.5 w-full justify-between border-[2.5px] px-3 text-sm"
      control={props.control}
      name="authorId"
      options={[
        { label: 'All users', value: null },
        ...props.users.map((user) => ({ label: user.name, value: user.id })),
      ]}
    />
  );
}

function FormFeedFilterDate(props: { control: Control<TypeFormFeedFilter> }) {
  return (
    <div className="flex flex-col gap-2">
      <FieldDate
        className="h-11.5 w-full border-[2.5px] px-3 text-sm"
        control={props.control}
        name="dateFrom"
        placeholder="From"
        label="Date"
      />
      <FieldDate
        className="h-11.5 w-full border-[2.5px] px-3 text-sm"
        control={props.control}
        name="dateTo"
        placeholder="To"
      />
    </div>
  );
}
