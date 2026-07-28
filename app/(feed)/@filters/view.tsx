'use client';

import { FormFeedFilter } from '@dispatch/forms/form-feed-filter';
import { TypeDtoUser } from '@dispatch/types';
import { useFeed } from '../context';

export function FeedFiltersView(props: { users: TypeDtoUser[] }) {
  const feed = useFeed();

  return (
    <FormFeedFilter
      users={props.users}
      value={feed.filter}
      valueChange={feed.setFilter}
    />
  );
}
