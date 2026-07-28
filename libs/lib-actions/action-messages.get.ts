'use server';

import { EnumMessageTag } from '@dispatch/enums';
import { TypeMessage } from '@dispatch/types';
import { actionUsersGet } from './action-users.get';

export async function actionMessagesGet(props: {
  filterTag?: EnumMessageTag;
  filterUserId?: string;
  pageIndex?: number;
  pageSize?: number;
}): Promise<TypeMessage[]> {
  const users = await actionUsersGet();

  const hardcodedDbMessages: TypeMessage[] = [
    {
      id: 'm-1',
      author: users[0],
      text: 'Shipped the new filter bar — tag + date now sync to the URL so any view is bookmarkable. Feedback welcome.',
      tag: EnumMessageTag.Product,
      timestamp: '2m',
    },
    {
      id: 'm-2',
      author: users[1],
      text: 'Is the empty-state copy too dry? Thinking we add a nudge to post the first message.',
      tag: EnumMessageTag.Design,
      timestamp: '18m',
    },
    {
      id: 'm-3',
      author: users[2],
      text: 'Reminder: standup moves to 10:30 starting next week.',
      tag: EnumMessageTag.Announce,
      timestamp: '1h',
    },
  ];

  const pageIndex = props.pageIndex ?? 0;
  const pageSize = props.pageSize ?? hardcodedDbMessages.length;

  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          hardcodedDbMessages
            .filter(
              (message) => !props.filterTag || message.tag === props.filterTag,
            )
            .filter(
              (message) =>
                !props.filterUserId || message.author.id === props.filterUserId,
            )
            .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
        ),
      2000,
    ),
  );
}
