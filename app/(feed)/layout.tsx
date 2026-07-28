import { actionUsersMeGet } from '@dispatch/actions';
import { PageFeed } from '@dispatch/pages/page-feed';
import { ReactNode } from 'react';
import { FeedProvider } from './context';

export default async function FeedLayout(props: {
  children: ReactNode;
  compose: ReactNode;
  filters: ReactNode;
}) {
  const user = await actionUsersMeGet();

  return (
    <FeedProvider>
      <PageFeed compose={props.compose} filters={props.filters} user={user}>
        {props.children}
      </PageFeed>
    </FeedProvider>
  );
}
