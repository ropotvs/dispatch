'use server';

import { DbMessages } from '@dispatch/db';
import { EnumMessageTag } from '@dispatch/enums';
import { actionSessionGet } from './action-session.get';

export async function actionMessageUpdate(props: {
  id: string;
  tag: EnumMessageTag;
  text: string;
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

  await DbMessages.write(
    messages.map((item) =>
      item.id === props.id
        ? { ...item, tag: props.tag, text: props.text }
        : item,
    ),
  );
}
