import { actionUsersMeGet } from '@dispatch/actions';
import { FeedComposeView } from './view';

export default async function FeedComposePage() {
  const user = await actionUsersMeGet();

  return <FeedComposeView user={user} />;
}
