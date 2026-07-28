import { AtomButton } from '@dispatch/atoms';
import { EnumMessageTag } from '@dispatch/enums';
import { FeatFeedMessage } from '@dispatch/feats/feat-feed-message';
import { IconArrowDown } from '@dispatch/icons';
import { TypeDtoMessage, TypeDtoUser } from '@dispatch/types';

export function PageFeedLoaded(props: {
  activeTag?: EnumMessageTag;
  user: TypeDtoUser;
  messages: TypeDtoMessage[];
}) {
  return (
    <>
      {props.messages.map((message) => (
        <FeatFeedMessage
          activeTag={props.activeTag}
          isAuthor={message.author.id === props.user.id}
          key={message.id}
          message={message}
        />
      ))}
      {/* TODO (out of scope for the challenge): wire LOAD MORE — paginate
          through actionMessagesGet (pageIndex/pageSize), hide the button once
          the last page is reached, and replace it with infinite scroll on
          mobile. */}
      <AtomButton className="mt-1 self-center" color="white" size="md">
        LOAD MORE <IconArrowDown className="h-3.5 w-3.5" />
      </AtomButton>
    </>
  );
}
