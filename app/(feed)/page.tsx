import { actionSessionGet } from '@dispatch/actions';
import { redirect } from 'next/navigation';
import { FeedView } from './view';

export const dynamic = 'force-dynamic';

export default async function FeedPage() {
  const session = await actionSessionGet();
  if (!session) {
    redirect('/auth/login');
  }

  return <FeedView session={session} />;
}
