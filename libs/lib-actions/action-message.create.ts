'use server';

import { DbMessages } from '@dispatch/db';
import { EnumMessageTag } from '@dispatch/enums';
import { actionSessionGet } from './action-session.get';

export async function actionMessageCreate(props: {
  tag: EnumMessageTag;
  text: string;
}): Promise<void> {
  const session = await actionSessionGet();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const messages = await DbMessages.read();
  await DbMessages.write([
    {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      tag: props.tag,
      text: props.text,
      authorId: session.id,
    },
    ...messages,
  ]);
}
