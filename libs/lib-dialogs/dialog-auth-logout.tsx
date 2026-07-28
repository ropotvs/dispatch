'use client';

import {
  AtomButton,
  AtomDialog,
  AtomDialogFooter,
  AtomDialogSubtitle,
  AtomDialogTitle,
} from '@dispatch/atoms';
import { TypeAtomDialog } from '@dispatch/types';
import { Ref } from 'react';

export function DialogAuthLogout({
  ref,
  ...props
}: {
  ref?: Ref<TypeAtomDialog>;
  onLogout: () => void;
}) {
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
        <AtomButton size="sm" onClick={props.onLogout}>
          LOG OUT
        </AtomButton>
      </AtomDialogFooter>
    </AtomDialog>
  );
}
