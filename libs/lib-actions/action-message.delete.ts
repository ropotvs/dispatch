'use server';

import { DbMessages } from '@dispatch/db';
import { actionSessionGet } from './action-session.get';

export async function actionMessageDelete(props: {
  id: string;
}): Promise<void> {
  const session = await actionSessionGet();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const messages = await DbMessages.read();
  const message = messages.find((item) => item.id === props.id);
  if (message?.authorId !== session.id) {
    throw new Error('Forbidden');
  }

  await DbMessages.write(messages.filter((item) => item.id !== props.id));
}
