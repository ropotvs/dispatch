'use client';

import { EnumMessageTag } from '@dispatch/enums';
import { FormMessageCreate } from '@dispatch/forms/form-message-create';
import { useState } from 'react';
import { useFeed } from '../context';

export function FeedComposeView() {
  const [pending, setPending] = useState(false);
  const feed = useFeed();

  return (
    <FormMessageCreate
      defaults={{ tag: EnumMessageTag.Product, text: '' }}
      disabled={pending || feed.loading}
      onSubmit={async (data) => {
        setPending(true);
        await feed.createMessage(data);
        setPending(false);
      }}
    />
  );
}
