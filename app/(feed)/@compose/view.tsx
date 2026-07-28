'use client';

import { EnumMessageTag } from '@dispatch/enums';
import { FormMessageCreate } from '@dispatch/forms/form-message-create';
import { useTransition } from 'react';
import { useFeed } from '../context';

export function FeedComposeView() {
  const [pending, startTransition] = useTransition();
  const feed = useFeed();

  return (
    <FormMessageCreate
      defaults={{ tag: EnumMessageTag.Product, text: '' }}
      disabled={pending || feed.loading}
      onSubmit={(data) => startTransition(() => feed.createMessage(data))}
    />
  );
}
