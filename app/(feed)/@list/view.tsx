'use client';

import {
  actionMessageDelete,
  actionMessagesGet,
  actionMessageUpdate,
} from '@dispatch/actions';
import { AtomBreakpoint, AtomButton } from '@dispatch/atoms';
import { ConstMessagesPageSize } from '@dispatch/consts';
import { FeatFeedEmpty } from '@dispatch/feats/feat-feed-empty';
import { FeatFeedMessage } from '@dispatch/feats/feat-feed-message';
import { FeatFeedMessageLoading } from '@dispatch/feats/feat-feed-message-loading';
import { useInView, useStateWithProps } from '@dispatch/hooks';
import { IconArrowDown } from '@dispatch/icons';
import {
  TypeDtoMessage,
  TypeDtoUser,
  TypeFormFeedFilter,
} from '@dispatch/types';
import { useState } from 'react';

export function FeedListView(props: {
  count: number;
  messages: TypeDtoMessage[];
  filter: Partial<TypeFormFeedFilter>;
  user: TypeDtoUser;
}) {
  const [feed, setFeed] = useStateWithProps({
    count: props.count,
    messages: props.messages,
    pageCount: 1,
  });
  const [pending, setPending] = useState(false);

  const hasMore = feed.pageCount * ConstMessagesPageSize < feed.count;

  const loadMore = async () => {
    if (pending || !hasMore) {
      return;
    }

    setPending(true);
    const page = await actionMessagesGet({
      filterDateFrom: props.filter.dateFrom || undefined,
      filterDateTo: props.filter.dateTo || undefined,
      filterTag: props.filter.tag || undefined,
      filterAuthorId: props.filter.authorId || undefined,
      pageIndex: feed.pageCount,
      pageSize: ConstMessagesPageSize,
    });
    setFeed({
      count: page.count,
      messages: [...feed.messages, ...page.data],
      pageCount: feed.pageCount + 1,
    });
    setPending(false);
  };

  const updateMessage = async (message: TypeDtoMessage) => {
    await actionMessageUpdate({
      id: message.id,
      tag: message.tag,
      text: message.text,
    });
    setFeed({
      ...feed,
      messages: feed.messages.map((item) =>
        item.id === message.id ? message : item,
      ),
    });
  };

  const deleteMessage = async (message: TypeDtoMessage) => {
    await actionMessageDelete({ id: message.id });
    setFeed({
      ...feed,
      count: feed.count - 1,
      messages: feed.messages.filter((item) => item.id !== message.id),
    });
    const fresh = await actionMessagesGet({
      filterDateFrom: props.filter.dateFrom || undefined,
      filterDateTo: props.filter.dateTo || undefined,
      filterTag: props.filter.tag || undefined,
      filterAuthorId: props.filter.authorId || undefined,
      pageIndex: 0,
      pageSize: feed.pageCount * ConstMessagesPageSize,
    });
    setFeed({
      count: fresh.count,
      messages: fresh.data,
      pageCount: feed.pageCount,
    });
  };

  const sentinelRef = useInView<HTMLDivElement>(hasMore && !pending, loadMore);

  if (feed.messages.length === 0 && !hasMore) {
    return <FeatFeedEmpty />;
  }

  return (
    <>
      {feed.messages.map((message) => (
        <FeatFeedMessage
          activeTag={props.filter.tag ?? undefined}
          isAuthor={message.author.id === props.user.id}
          key={message.id}
          message={message}
          onDelete={() => deleteMessage(message)}
          onUpdate={(m) => updateMessage(m)}
        />
      ))}
      {hasMore && (
        <AtomBreakpoint
          desktop={
            <AtomButton
              className="mt-1 self-center disabled:opacity-60"
              color="white"
              disabled={pending}
              size="md"
              onClick={loadMore}
            >
              LOAD MORE <IconArrowDown className="h-3.5 w-3.5" />
            </AtomButton>
          }
          mobile={
            <div>
              {pending && <FeatFeedMessageLoading />}
              <div className="h-8" ref={sentinelRef} />
            </div>
          }
        />
      )}
    </>
  );
}
