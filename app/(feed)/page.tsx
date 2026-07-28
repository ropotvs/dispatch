import { actionMessagesGet, actionUsersMeGet } from '@dispatch/actions';
import { ConstMessagesPageSize } from '@dispatch/consts';
import { mapObjectFromQuery } from '@dispatch/maps';
import { PageFeedLoading } from '@dispatch/pages/page-feed-loading';
import { TypeFormFeedFilter } from '@dispatch/types';
import { Suspense } from 'react';
import { FeedListView } from './@list/view';

export const dynamic = 'force-dynamic';

export default async function FeedPage(props: {
  searchParams: Promise<{ filters?: string }>;
}) {
  const params = await props.searchParams;
  const user = await actionUsersMeGet();
  const filter = mapObjectFromQuery<TypeFormFeedFilter>(params.filters);

  return (
    <Suspense key={JSON.stringify(filter)} fallback={<PageFeedLoading />}>
      {(async () => {
        const messages = await actionMessagesGet({
          filterDateFrom: filter.dateFrom || undefined,
          filterDateTo: filter.dateTo || undefined,
          filterTag: filter.tag || undefined,
          filterAuthorId: filter.authorId || undefined,
          pageIndex: 0,
          pageSize: ConstMessagesPageSize,
        });
        return (
          <FeedListView
            count={messages.count}
            messages={messages.data}
            filter={filter}
            user={user}
          />
        );
      })()}
    </Suspense>
  );
}
