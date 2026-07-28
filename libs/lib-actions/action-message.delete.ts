'use server';

import { DbMessages } from '@dispatch/db';

export async function actionMessageDelete(props: {
  id: string;
}): Promise<void> {
  const messages = await DbMessages.read();

  await DbMessages.write(messages.filter((message) => message.id !== props.id));
}
