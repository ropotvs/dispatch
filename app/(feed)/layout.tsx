import { actionAuthLogout, actionSessionGet } from '@dispatch/actions';
import { PageFeed } from '@dispatch/pages/page-feed';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { FeedProvider } from './context';

export default async function FeedLayout(props: {
  children: ReactNode;
  compose: ReactNode;
  filters: ReactNode;
}) {
  const session = await actionSessionGet();
  if (!session) {
    redirect('/auth/login');
  }

  return (
    <FeedProvider>
      <PageFeed
        compose={props.compose}
        filters={props.filters}
        session={session}
        onLogout={actionAuthLogout}
      >
        {props.children}
      </PageFeed>
    </FeedProvider>
  );
}
