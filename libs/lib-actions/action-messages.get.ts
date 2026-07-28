'use server';

import { EnumMessageTag } from '@dispatch/enums';
import { TypeDtoMessage } from '@dispatch/types';
import { actionUsersGet } from './action-users.get';

export async function actionMessagesGet(props: {
  filterDateFrom?: string;
  filterDateTo?: string;
  filterTag?: EnumMessageTag;
  filterUserId?: string;
  pageIndex?: number;
  pageSize?: number;
}): Promise<TypeDtoMessage[]> {
  const users = await actionUsersGet();

  const hardcodedDbMessages: TypeDtoMessage[] = [
    {
      id: 'm-1',
      author: users[0],
      createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      text: 'Shipped the new filter bar — tag + date now sync to the URL so any view is bookmarkable. Feedback welcome.',
      tag: EnumMessageTag.Product,
    },
    {
      id: 'm-2',
      author: users[1],
      createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
      text: 'Is the empty-state copy too dry? Thinking we add a nudge to post the first message.',
      tag: EnumMessageTag.Design,
    },
    {
      id: 'm-3',
      author: users[2],
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      text: 'Reminder: standup moves to 10:30 starting next week.',
      tag: EnumMessageTag.Announce,
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
            .filter(
              (message) =>
                !props.filterDateFrom ||
                message.createdAt.slice(0, 10) >= props.filterDateFrom,
            )
            .filter(
              (message) =>
                !props.filterDateTo ||
                message.createdAt.slice(0, 10) <= props.filterDateTo,
            )
            .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
        ),
      2000,
    ),
  );
}
