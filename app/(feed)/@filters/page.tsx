import { actionUsersGet } from '@dispatch/actions';
import { FeedFiltersView } from './view';

export default async function FeedFiltersPage() {
  const users = await actionUsersGet();

  return <FeedFiltersView users={users} />;
}
