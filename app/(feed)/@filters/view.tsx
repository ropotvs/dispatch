'use client';

import { FormFeedFilter } from '@dispatch/forms/form-feed-filter';
import { mapObjectToQuery } from '@dispatch/maps';
import { TypeDtoUser, TypeFormFeedFilter } from '@dispatch/types';
import { useRouter } from 'next/navigation';

export function FeedFiltersView(props: {
  users: TypeDtoUser[];
  value: TypeFormFeedFilter;
}) {
  const router = useRouter();

  return (
    <FormFeedFilter
      users={props.users}
      value={props.value}
      valueChange={(value) => {
        const param = mapObjectToQuery(value);
        router.push(param ? `/?filters=${param}` : '/');
      }}
    />
  );
}
