'use client';

import { AtomAvatar, AtomButton, AtomTag } from '@dispatch/atoms';
import { DialogMessageDelete } from '@dispatch/dialogs/dialog-message-delete';
import { EnumMessageTag } from '@dispatch/enums';
import { formatDateAbsolute, formatDateRelative } from '@dispatch/formats';
import { FormMessageUpdate } from '@dispatch/forms/form-message-update';
import { TypeAtomDialog, TypeDtoMessage } from '@dispatch/types';
import { useRef, useState } from 'react';

export function FeatFeedMessage(props: {
  activeTag?: EnumMessageTag;
  isAuthor?: boolean;
  message: TypeDtoMessage;
  onDelete: () => void;
  onUpdate: (message: TypeDtoMessage) => void;
}) {
  const deleteDialog = useRef<TypeAtomDialog>(null);
  const [editing, setEditing] = useState(false);

  return (
    <article className="border-ink border-[3px] bg-white p-3.5 lg:p-4.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 lg:gap-2.5">
          <AtomAvatar
            className={props.isAuthor ? 'bg-brand' : 'bg-white'}
            image={props.message.author.image}
            name={props.message.author.name}
            size={38}
          />
          <div className="hidden lg:block">
            <div className="text-[0.9375rem] font-bold">
              {props.message.author.name}
            </div>
            <div className="text-muted text-xs">
              {props.message.author.handle}
            </div>
          </div>
          <div className="text-sm font-bold lg:hidden">
            {props.message.author.handle}
          </div>
        </div>
        <div
          className="text-muted text-[0.6875rem] lg:text-xs"
          title={formatDateAbsolute(props.message.createdAt)}
        >
          {formatDateRelative(props.message.createdAt)}
        </div>
      </div>
      {editing ? (
        <div className="mt-2.5 lg:mt-3.5">
          <FormMessageUpdate
            defaults={{ tag: props.message.tag, text: props.message.text }}
            onCancel={() => setEditing(false)}
            onSubmit={(data) => {
              setEditing(false);
              props.onUpdate({ ...props.message, ...data });
            }}
          />
        </div>
      ) : (
        <div className="mt-2.5 text-sm leading-[1.45] wrap-anywhere lg:mt-3.5 lg:text-base lg:leading-[1.5]">
          {props.message.text}
        </div>
      )}
      {!editing && (
        <div className="mt-3 flex items-center justify-between lg:mt-4">
          <AtomTag
            className="px-2 py-0.75 text-[0.6875rem] font-bold lg:px-2.5 lg:py-1 lg:text-xs"
            color={props.message.tag === props.activeTag ? 'brand' : 'white'}
          >
            {props.message.tag}
          </AtomTag>
          {props.isAuthor && (
            <div className="flex gap-1.5 lg:gap-2.5">
              <AtomButton
                color="white"
                size="xs"
                variant="static"
                onClick={() => setEditing(true)}
              >
                EDIT
              </AtomButton>
              <AtomButton
                color="white"
                size="xs"
                variant="static"
                onClick={() => deleteDialog.current?.open()}
              >
                <span className="hidden lg:inline">DELETE</span>
                <span className="lg:hidden">DEL</span>
              </AtomButton>
              <DialogMessageDelete
                onDelete={props.onDelete}
                ref={deleteDialog}
              />
            </div>
          )}
        </div>
      )}
    </article>
  );
}
