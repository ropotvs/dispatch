import {
  actionMessagesGet,
  actionUsersGet,
  actionUsersMeGet,
} from '@dispatch/actions';
import { mapObjectFromQuery } from '@dispatch/maps';
import { PageFeedEmpty } from '@dispatch/pages/page-feed-empty';
import { PageFeedLoaded } from '@dispatch/pages/page-feed-loaded';
import { PageFeedLoading } from '@dispatch/pages/page-feed-loading';
import { TypeFormFeedFilter } from '@dispatch/types';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function FeedPage(props: {
  searchParams: Promise<{ filters?: string }>;
}) {
  const params = await props.searchParams;
  const users = await actionUsersGet();
  const filters = mapObjectFromQuery<TypeFormFeedFilter>(params.filters);
  const activeUser = users.find((user) => user.id === filters.userId);

  return (
    <Suspense key={JSON.stringify(filters)} fallback={<PageFeedLoading />}>
      {(async () => {
        const user = await actionUsersMeGet();
        const messages = await actionMessagesGet({
          filterTag: filters.tag || undefined,
          filterUserId: activeUser?.id,
        });

        if (messages.length === 0) {
          return <PageFeedEmpty />;
        }

        return (
          <PageFeedLoaded
            activeTag={filters.tag || undefined}
            user={user}
            messages={messages}
          />
        );
      })()}
    </Suspense>
  );
}
