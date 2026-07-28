'use client';

import { actionMessageCreate } from '@dispatch/actions';
import { EnumMessageTag } from '@dispatch/enums';
import { FormMessageCreate } from '@dispatch/forms/form-message-create';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function FeedComposeView() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <FormMessageCreate
      defaults={{ tag: EnumMessageTag.Product, text: '' }}
      disabled={pending}
      onSubmit={(data) =>
        startTransition(async () => {
          await actionMessageCreate({ tag: data.tag, text: data.text });
          router.push('/');
          router.refresh();
        })
      }
    />
  );
}
