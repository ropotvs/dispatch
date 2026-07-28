import { AtomAvatar, AtomButton, AtomDialog, AtomLogo } from '@dispatch/atoms';
import { TypeDtoUser } from '@dispatch/types';
import Link from 'next/link';

export function FeatFeedHeader(props: { user: TypeDtoUser }) {
  return (
    <header className="border-ink sticky top-0 z-20 flex h-15 shrink-0 items-center justify-between border-b-[3px] bg-white px-4.5 lg:h-18 lg:px-8">
      <AtomLogo className="h-[0.819rem] lg:h-[1.001rem]" />
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <AtomAvatar
            className="bg-brand"
            image={props.user.image}
            name={props.user.name}
            size={34}
          />
          <span className="hidden text-sm lg:inline">{props.user.handle}</span>
        </div>
        <AtomDialog
          trigger={
            <button
              className="border-ink hidden h-10 cursor-pointer items-center border-[2.5px] bg-white px-4 font-mono text-[0.8125rem] font-bold lg:flex"
              type="button"
            >
              LOG OUT
            </button>
          }
        >
          <div className="text-xl font-bold tracking-[-0.02em]">Log out?</div>
          <p className="text-muted mt-2 text-sm leading-[1.6]">
            You are about to sign out of Dispatch. Unposted drafts will be lost.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <AtomButton color="white" size="sm">
              CANCEL
            </AtomButton>
            <AtomButton element={<Link href="/auth/login" />} size="sm">
              LOG OUT
            </AtomButton>
          </div>
        </AtomDialog>
      </div>
    </header>
  );
}
