'use client';

import { EnumMessageTag } from '@dispatch/enums';
import { FormMessageCreate } from '@dispatch/forms/form-message-create';

export function FeedComposeView() {
  return (
    <FormMessageCreate
      defaults={{ tag: EnumMessageTag.Product, text: '' }}
      onSubmit={(data) => {
        console.log('create message with', data);
        // TODO (out of scope for the challenge): implement message creation
      }}
    />
  );
}
