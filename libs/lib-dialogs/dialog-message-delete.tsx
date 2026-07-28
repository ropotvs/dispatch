import {
  AtomButton,
  AtomDialog,
  AtomDialogFooter,
  AtomDialogSubtitle,
  AtomDialogTitle,
} from '@dispatch/atoms';
import { TypeAtomDialog } from '@dispatch/types';
import { Ref } from 'react';

export function DialogMessageDelete({
  ref,
  ...props
}: {
  onDelete: () => void;
  ref?: Ref<TypeAtomDialog>;
}) {
  return (
    <AtomDialog ref={ref}>
      <AtomDialogTitle>Delete message?</AtomDialogTitle>
      <AtomDialogSubtitle>
        This removes the message from the feed. There is no undo.
      </AtomDialogSubtitle>
      <AtomDialogFooter>
        <AtomButton color="white" size="sm">
          CANCEL
        </AtomButton>
        <AtomButton size="sm" onClick={props.onDelete}>
          DELETE
        </AtomButton>
      </AtomDialogFooter>
    </AtomDialog>
  );
}
