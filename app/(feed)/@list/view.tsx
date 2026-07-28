'use client';

import { actionMessagesGet } from '@dispatch/actions';
import { AtomBreakpoint, AtomButton } from '@dispatch/atoms';
import { ConstMessagesPageSize } from '@dispatch/consts';
import { FeatFeedEmpty } from '@dispatch/feats/feat-feed-empty';
import { FeatFeedMessage } from '@dispatch/feats/feat-feed-message';
import { FeatFeedMessageLoading } from '@dispatch/feats/feat-feed-message-loading';
import { useInView } from '@dispatch/hooks';
import { IconArrowDown } from '@dispatch/icons';
import {
  TypeDtoMessage,
  TypeDtoUser,
  TypeFormFeedFilter,
} from '@dispatch/types';
import { useEffect, useState } from 'react';
import { useFeedContext } from '../context';

export function FeedListView(props: {
  count: number;
  messages: TypeDtoMessage[];
  filter: Partial<TypeFormFeedFilter>;
  user: TypeDtoUser;
}) {
  const feed = useFeedContext();

  const [count, setCount] = useState(props.count);
  const [pageCount, setPageCount] = useState(1);
  const [pending, setPending] = useState(false);

  const resetMessages = feed.resetMessages;
  useEffect(() => {
    resetMessages(props.messages);
  }, [props.messages, resetMessages]);

  const hasMore = pageCount * ConstMessagesPageSize < count;

  const loadMore = async () => {
    if (pending || !hasMore) {
      return;
    }

    setPending(true);
    const page = await actionMessagesGet({
      filterDateFrom: props.filter.dateFrom || undefined,
      filterDateTo: props.filter.dateTo || undefined,
      filterTag: props.filter.tag || undefined,
      filterUserId: props.filter.userId || undefined,
      pageIndex: pageCount,
      pageSize: ConstMessagesPageSize,
    });
    feed.appendMessages(page.data);
    setPageCount(pageCount + 1);
    setCount(page.count);
    setPending(false);
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
          onDelete={() => feed.deleteMessage(message)}
          onUpdate={feed.updateMessage}
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
