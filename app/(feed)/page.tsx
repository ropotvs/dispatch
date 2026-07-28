import { actionMessagesGet, actionUsersMeGet } from '@dispatch/actions';
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
  const filters = mapObjectFromQuery<TypeFormFeedFilter>(params.filters);

  return (
    <Suspense key={JSON.stringify(filters)} fallback={<PageFeedLoading />}>
      {(async () => {
        const user = await actionUsersMeGet();
        const messages = await actionMessagesGet({
          filterDateFrom: filters.dateFrom || undefined,
          filterDateTo: filters.dateTo || undefined,
          filterTag: filters.tag || undefined,
          filterUserId: filters.userId || undefined,
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
