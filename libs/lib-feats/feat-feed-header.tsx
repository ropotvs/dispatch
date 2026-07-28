'use client';

import {
  AtomAvatar,
  AtomBreakpoint,
  AtomButton,
  AtomLogo,
  AtomMenu,
  AtomMenuItem,
} from '@dispatch/atoms';
import { DialogAuthLogout } from '@dispatch/dialogs/dialog-auth-logout';
import { TypeAtomDialog, TypeDtoSession } from '@dispatch/types';
import { useRef } from 'react';

export function FeatFeedHeader(props: {
  session: TypeDtoSession;
  onLogout: () => void;
}) {
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
                image={props.session.image}
                name={props.session.name}
                size={34}
              />
              <span className="text-sm">{props.session.handle}</span>
            </div>
            <AtomButton
              color="white"
              size="sm"
              variant="static"
              onClick={() => dialog.current?.open()}
            >
              LOG OUT
            </AtomButton>
          </div>
        }
        mobile={
          <div>
            <AtomMenu
              align="end"
              trigger={
                <button
                  className="block cursor-pointer transition-[translate,box-shadow] duration-100 hover:translate-[-1px] hover:shadow-[2px_2px_0_var(--color-ink)] active:translate-[0px] active:shadow-none"
                  type="button"
                >
                  <AtomAvatar
                    className="bg-brand"
                    image={props.session.image}
                    name={props.session.name}
                    size={34}
                  />
                </button>
              }
            >
              <div className="text-muted border-b-2 border-[#eeeeee] px-3 py-2 font-mono text-xs whitespace-nowrap">
                {props.session.handle}
              </div>
              <AtomMenuItem onClick={() => dialog.current?.open()}>
                LOG OUT
              </AtomMenuItem>
            </AtomMenu>
          </div>
        }
      />
      <DialogAuthLogout onLogout={props.onLogout} ref={dialog} />
    </header>
  );
}
