'use client';

import {
  AtomButton,
  AtomDialog,
  AtomDialogFooter,
  AtomDialogSubtitle,
  AtomDialogTitle,
} from '@dispatch/atoms';
import { TypeAtomDialog } from '@dispatch/types';
import Link from 'next/link';
import { Ref } from 'react';

export function DialogAuthLogout({ ref }: { ref?: Ref<TypeAtomDialog> }) {
  return (
    <AtomDialog ref={ref}>
      <AtomDialogTitle>Log out?</AtomDialogTitle>
      <AtomDialogSubtitle>
        You are about to sign out of Dispatch. Unposted drafts will be lost.
      </AtomDialogSubtitle>
      <AtomDialogFooter>
        <AtomButton color="white" size="sm">
          CANCEL
        </AtomButton>
        <AtomButton element={<Link href="/auth/login" />} size="sm">
          LOG OUT
        </AtomButton>
      </AtomDialogFooter>
    </AtomDialog>
  );
}
