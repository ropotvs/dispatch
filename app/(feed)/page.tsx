import { actionMessagesGet, actionSessionGet } from '@dispatch/actions';
import { ConstMessagesPageSize } from '@dispatch/consts';
import { mapObjectFromQuery } from '@dispatch/maps';
import { PageFeedLoading } from '@dispatch/pages/page-feed-loading';
import { TypeFormFeedFilter } from '@dispatch/types';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { FeedListView } from './@list/view';

export const dynamic = 'force-dynamic';

export default async function FeedPage(props: {
  searchParams: Promise<{ filters?: string }>;
}) {
  const session = await actionSessionGet();
  if (!session) {
    redirect('/auth/login');
  }

  const params = await props.searchParams;
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
            session={session}
          />
        );
      })()}
    </Suspense>
  );
}
