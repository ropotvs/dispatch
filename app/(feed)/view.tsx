'use client';

import { AtomBreakpoint, AtomButton } from '@dispatch/atoms';
import { FeatFeedEmpty } from '@dispatch/feats/feat-feed-empty';
import { FeatFeedLoading } from '@dispatch/feats/feat-feed-loading';
import { FeatFeedMessage } from '@dispatch/feats/feat-feed-message';
import { useInView } from '@dispatch/hooks';
import { IconArrowDown } from '@dispatch/icons';
import { TypeDtoSession } from '@dispatch/types';
import { useFeed } from './context';

export function FeedView(props: { session: TypeDtoSession }) {
  const feed = useFeed();

  const sentinelRef = useInView<HTMLDivElement>(
    feed.hasMore && !feed.loading,
    feed.loadMore,
  );

  if (!feed.messages) {
    return <FeatFeedLoading />;
  }

  if (feed.messages.length === 0) {
    return <FeatFeedEmpty />;
  }

  return (
    <>
      {feed.messages.map((message) => (
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
