'use client';

import { EnumMessageTag } from '@dispatch/enums';
import { FormMessageCreate } from '@dispatch/forms/form-message-create';
import { TypeDtoUser } from '@dispatch/types';
import { useFeedContext } from '../context';

export function FeedComposeView(props: { user: TypeDtoUser }) {
  const feed = useFeedContext();

  return (
    <FormMessageCreate
      defaults={{ tag: EnumMessageTag.Product, text: '' }}
      onSubmit={(data) =>
        feed.createMessage({
          id: crypto.randomUUID(),
          author: props.user,
          createdAt: new Date().toISOString(),
          text: data.text,
          tag: data.tag,
        })
      }
    />
  );
}
