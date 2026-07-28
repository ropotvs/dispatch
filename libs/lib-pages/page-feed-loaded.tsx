import { AtomButton } from '@dispatch/atoms';
import { EnumMessageTag } from '@dispatch/enums';
import { FeatFeedMessage } from '@dispatch/feats/feat-feed-message';
import { IconArrowDown } from '@dispatch/icons';
import { TypeDtoMessage, TypeDtoUser } from '@dispatch/types';

export function PageFeedLoaded(props: {
  activeTag?: EnumMessageTag;
  currentUser: TypeDtoUser;
  messages: TypeDtoMessage[];
}) {
  return (
    <>
      {props.messages.map((message) => (
        <FeatFeedMessage
          activeTag={props.activeTag}
          isAuthor={message.author.id === props.currentUser.id}
          key={message.id}
          message={message}
        />
      ))}
      <AtomButton className="mt-1 self-center" color="white" size="md">
        LOAD MORE <IconArrowDown className="h-3.5 w-3.5" />
      </AtomButton>
    </>
  );
}
