'use server';

import { DbMessages } from '@dispatch/db';
import { EnumMessageTag } from '@dispatch/enums';
import { actionUsersMeGet } from './action-users-me.get';

export async function actionMessageCreate(props: {
  tag: EnumMessageTag;
  text: string;
}): Promise<void> {
  const user = await actionUsersMeGet();
  const messages = await DbMessages.read();

  await DbMessages.write([
    {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      tag: props.tag,
      text: props.text,
      authorId: user.id,
    },
    ...messages,
  ]);
}
