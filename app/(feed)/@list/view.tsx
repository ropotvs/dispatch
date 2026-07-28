'use client';

import { AtomBreakpoint, AtomButton } from '@dispatch/atoms';
import { FeatFeedEmpty } from '@dispatch/feats/feat-feed-empty';
import { FeatFeedLoading } from '@dispatch/feats/feat-feed-loading';
import { FeatFeedMessage } from '@dispatch/feats/feat-feed-message';
import { useInView } from '@dispatch/hooks';
import { IconArrowDown } from '@dispatch/icons';
import { TypeDtoMessage, TypeDtoSession } from '@dispatch/types';
import { useEffect } from 'react';
import { useFeed } from '../context';

export function FeedListView(props: {
  count: number;
  messages: TypeDtoMessage[];
  session: TypeDtoSession;
}) {
  const feed = useFeed();

  const sync = feed.sync;
  useEffect(() => {
    sync(props.messages, props.count);
  }, [props.count, props.messages, sync]);

  const list = feed.list ?? {
    count: props.count,
    messages: props.messages,
    pageCount: 1,
  };

  const sentinelRef = useInView<HTMLDivElement>(
    feed.hasMore && !feed.loading,
    feed.loadMore,
  );

  if (list.messages.length === 0 && !feed.hasMore) {
    return <FeatFeedEmpty />;
  }

  return (
    <>
      {list.messages.map((message) => (
        <FeatFeedMessage
          activeTag={feed.filter.tag ?? undefined}
          isAuthor={message.author.id === props.session.id}
          key={message.id}
          message={message}
          onDelete={() => feed.deleteMessage(message)}
          onUpdate={(message) => feed.updateMessage(message)}
        />
      ))}
      {feed.loading ? (
        <FeatFeedLoading />
      ) : (
        feed.hasMore && (
          <AtomBreakpoint
            desktop={
              <AtomButton
                className="mt-1 self-center"
                color="white"
                size="md"
                onClick={feed.loadMore}
              >
                LOAD MORE <IconArrowDown className="h-3.5 w-3.5" />
              </AtomButton>
            }
            mobile={<div className="h-8" ref={sentinelRef} />}
          />
        )
      )}
    </>
  );
}
