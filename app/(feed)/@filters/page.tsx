import { actionUsersGet } from '@dispatch/actions';
import { mapObjectFromQuery } from '@dispatch/maps';
import { TypeFormFeedFilter } from '@dispatch/types';
import { FeedFiltersView } from './view';

export default async function FeedFiltersPage(props: {
  searchParams: Promise<{ filters?: string }>;
}) {
  const params = await props.searchParams;
  const users = await actionUsersGet();

  return (
    <FeedFiltersView
      users={users}
      value={{
        dateFrom: '',
        dateTo: '',
        tag: null,
        userId: null,
        ...mapObjectFromQuery<TypeFormFeedFilter>(params.filters),
      }}
    />
  );
}
