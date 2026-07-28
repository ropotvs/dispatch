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
}): Promise<{ count: number; data: TypeDtoMessage[] }> {
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
    {
      id: 'm-4',
      author: users[1],
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      text: 'Refreshed the empty state — dashed border, diagonal stripes, one big exclamation mark. Thoughts?',
      tag: EnumMessageTag.Design,
    },
    {
      id: 'm-5',
      author: users[0],
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      text: 'Load more is in: a proper button on desktop, infinite scroll on mobile. The feed finally scrolls forever*. (*eight messages)',
      tag: EnumMessageTag.Product,
    },
    {
      id: 'm-6',
      author: users[2],
      createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      text: 'The coffee machine on the 3rd floor is fixed. I repeat: it is fixed.',
      tag: EnumMessageTag.Random,
    },
    {
      id: 'm-7',
      author: users[0],
      createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
      text: 'Buttons now press into their shadows on click. Tiny thing, feels great.',
      tag: EnumMessageTag.Design,
    },
    {
      id: 'm-8',
      author: users[1],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      text: 'Heads up: the date filters understand ranges now, so "everything from Monday" is a bookmarkable link.',
      tag: EnumMessageTag.Product,
    },
  ];

  const pageIndex = props.pageIndex ?? 0;
  const pageSize = props.pageSize ?? hardcodedDbMessages.length;

  const filteredDbMessages = hardcodedDbMessages
    .filter((message) => !props.filterTag || message.tag === props.filterTag)
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
    );

  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          count: filteredDbMessages.length,
          data: filteredDbMessages.slice(
            pageIndex * pageSize,
            (pageIndex + 1) * pageSize,
          ),
        }),
      2000,
    ),
  );
}
