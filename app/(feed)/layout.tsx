import { actionUsersMeGet } from '@dispatch/actions';
import { PageFeed } from '@dispatch/pages/page-feed';
import { ReactNode } from 'react';

export default async function FeedLayout(props: {
  children: ReactNode;
  compose: ReactNode;
  filters: ReactNode;
}) {
  const user = await actionUsersMeGet();

  return (
    <PageFeed compose={props.compose} filters={props.filters} user={user}>
      {props.children}
    </PageFeed>
  );
}
