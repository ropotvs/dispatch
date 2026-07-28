'use server';

import { DbMessages } from '@dispatch/db';
import { EnumMessageTag } from '@dispatch/enums';

export async function actionMessageUpdate(props: {
  id: string;
  tag: EnumMessageTag;
  text: string;
}): Promise<void> {
  const messages = await DbMessages.read();

  await DbMessages.write(
    messages.map((message) =>
      message.id === props.id
        ? { ...message, tag: props.tag, text: props.text }
        : message,
    ),
  );
}
