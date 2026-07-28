'use server';

import { DbMessages, DbUsers } from '@dispatch/db';
import { EnumMessageTag } from '@dispatch/enums';
import { TypeDtoMessage } from '@dispatch/types';

export async function actionMessagesGet(props: {
  filterDateFrom?: string;
  filterDateTo?: string;
  filterTag?: EnumMessageTag;
  filterAuthorId?: string;
  pageIndex?: number;
  pageSize?: number;
}): Promise<{ count: number; data: TypeDtoMessage[] }> {
  const messages = await DbMessages.read();
  const users = await DbUsers.read();

  const pageIndex = props.pageIndex ?? 0;
  const pageSize = props.pageSize ?? messages.length;

  const filteredDbMessages = messages
    .filter((message) => !props.filterTag || message.tag === props.filterTag)
    .filter(
      (message) =>
        !props.filterAuthorId || message.authorId === props.filterAuthorId,
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
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const data = filteredDbMessages
    .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
    .flatMap((message) => {
      const author = users.find((user) => user.id === message.authorId);
      if (!author) return [];
      return [
        {
          id: message.id,
          author,
          createdAt: message.createdAt,
          tag: message.tag,
          text: message.text,
        },
      ];
    });

  return new Promise((resolve) =>
    setTimeout(() => resolve({ count: filteredDbMessages.length, data }), 1000),
  );
}
