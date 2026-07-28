import { AtomButton, AtomLogo } from '@dispatch/atoms';
import { IconArrowRight } from '@dispatch/icons';
import Link from 'next/link';

export function Page404() {
  return (
    <div className="bg-paper flex min-h-dvh flex-1 flex-col items-center justify-center p-6 text-center">
      <AtomLogo className="h-[0.591rem] lg:h-[0.637rem]" />
      <div className="border-ink bg-brand mt-9 border-[3px] px-7 py-3 text-[4rem] leading-[0.95] font-bold tracking-[-0.04em] shadow-[6px_6px_0_var(--color-ink)] lg:px-10 lg:py-4 lg:text-[6rem] lg:shadow-[8px_8px_0_var(--color-ink)]">
        404
      </div>
      <h1 className="mt-8 text-[1.625rem] font-bold tracking-[-0.02em] lg:mt-10 lg:text-[1.875rem]">
        Nothing at this address
      </h1>
      <p className="text-muted mt-2 max-w-90 text-[0.8125rem] leading-[1.6] lg:text-sm">
        This page was deleted, moved, or never posted.
      </p>
      <AtomButton
        className="mt-8 px-6.5 lg:mt-10"
        color="white"
        element={<Link href="/" />}
      >
        BACK TO FEED <IconArrowRight className="h-3.5 w-3.5" />
      </AtomButton>
    </div>
  );
}
