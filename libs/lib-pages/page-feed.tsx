import { FeatFeedHeader } from '@dispatch/feats/feat-feed-header';
import { TypeDtoUser } from '@dispatch/types';
import { ReactNode } from 'react';

export function PageFeed(props: {
  children: ReactNode;
  compose: ReactNode;
  filters: ReactNode;
  user: TypeDtoUser;
}) {
  return (
    <div className="bg-paper flex min-h-dvh flex-1 flex-col">
      <FeatFeedHeader user={props.user} />
      <div className="mx-auto grid w-full max-w-[49.5rem] flex-1 grid-cols-1 gap-3.5 p-4 lg:max-w-280 lg:grid-cols-[18.5rem_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:gap-y-5 lg:p-8">
        <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1">
          {props.compose}
        </div>
        <div className="order-2 lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1">
          {props.filters}
        </div>
        <main className="order-3 flex flex-col gap-3.5 lg:order-none lg:col-start-2 lg:row-start-2 lg:gap-5">
          {props.children}
        </main>
      </div>
    </div>
  );
}
