'use client';

import {
  AtomAvatar,
  AtomBreakpoint,
  AtomLogo,
  AtomMenu,
  AtomMenuItem,
} from '@dispatch/atoms';
import { DialogAuthLogout } from '@dispatch/dialogs/dialog-auth-logout';
import { TypeAtomDialog, TypeDtoUser } from '@dispatch/types';
import { useRef } from 'react';

export function FeatFeedHeader(props: { user: TypeDtoUser }) {
  const dialog = useRef<TypeAtomDialog>(null);

  return (
    <header className="border-ink sticky top-0 z-20 flex h-15 shrink-0 items-center justify-between border-b-[3px] bg-white px-4.5 lg:h-18 lg:px-8">
      <AtomLogo className="h-[0.819rem] lg:h-[1.001rem]" />
      <AtomBreakpoint
        desktop={
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <AtomAvatar
                className="bg-brand"
                image={props.user.image}
                name={props.user.name}
                size={34}
              />
              <span className="text-sm">{props.user.handle}</span>
            </div>
            <button
              className="border-ink flex h-10 cursor-pointer items-center border-[2.5px] bg-white px-4 font-mono text-[0.8125rem] font-bold"
              type="button"
              onClick={() => dialog.current?.open()}
            >
              LOG OUT
            </button>
          </div>
        }
        mobile={
          <div>
            <AtomMenu
              align="end"
              trigger={
                <button className="block cursor-pointer" type="button">
                  <AtomAvatar
                    className="bg-brand"
                    image={props.user.image}
                    name={props.user.name}
                    size={34}
                  />
                </button>
              }
            >
              <div className="text-muted border-b-2 border-[#eeeeee] px-3 py-2 font-mono text-xs whitespace-nowrap">
                {props.user.handle}
              </div>
              <AtomMenuItem onClick={() => dialog.current?.open()}>
                LOG OUT
              </AtomMenuItem>
            </AtomMenu>
          </div>
        }
      />
      <DialogAuthLogout ref={dialog} />
    </header>
  );
}
