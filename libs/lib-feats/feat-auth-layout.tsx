import { AtomLogo } from '@dispatch/atoms';
import { ConstMessageMaxLength } from '@dispatch/consts';
import { ReactNode } from 'react';

export function FeatAuthLayout(props: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col bg-white lg:flex-row">
      <aside className="border-ink bg-brand flex flex-col border-b-[3px] px-7 pt-8 pb-10 lg:w-[43.06%] lg:max-w-155 lg:shrink-0 lg:border-r-[3px] lg:border-b-0 lg:p-14">
        <div className="mx-auto flex w-full max-w-95 flex-1 flex-col lg:mx-0 lg:max-w-none">
          <AtomLogo className="h-[0.591rem] lg:h-[0.637rem]" />
          <div className="mt-9 lg:my-auto">
            <h1 className="text-[3.25rem] leading-[0.95] font-bold tracking-[-0.03em] lg:text-[5.5rem] lg:tracking-[-0.04em]">
              Say it in
              <br />
              {ConstMessageMaxLength}.
            </h1>
            <p className="mt-6 hidden max-w-95 text-[0.9375rem] leading-[1.6] lg:block">
              A short-message board for your team. Post, tag, filter, done.
            </p>
          </div>
        </div>
      </aside>
      <main className="flex flex-1 flex-col px-7 py-8 lg:items-center lg:justify-center lg:p-10">
        <div className="mx-auto w-full max-w-95">{props.children}</div>
      </main>
    </div>
  );
}
