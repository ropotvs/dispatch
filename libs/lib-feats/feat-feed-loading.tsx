import { AtomSkeleton } from '@dispatch/atoms';
import { clsx } from 'clsx';

export function FeatFeedLoading() {
  return (
    <>
      {[
        { handle: 'w-22.5', line2: 'w-4/5', name: 'w-35', text: 'w-full' },
        { handle: 'w-20', line2: 'w-3/5', name: 'w-30', text: 'w-[95%]' },
        { handle: 'w-17.5', line2: '', name: 'w-32.5', text: 'w-[88%]' },
      ].map((skeleton) => (
        <div
          className="border-ink border-[3px] bg-white p-3.5 lg:p-4.5"
          key={skeleton.name}
        >
          <div className="flex items-center gap-2 lg:gap-2.5">
            <AtomSkeleton className="size-8 lg:size-9.5" />
            <div className="flex-1">
              <AtomSkeleton className={clsx('h-3', skeleton.name)} />
              <AtomSkeleton
                className={clsx('mt-2 hidden h-2.5 lg:block', skeleton.handle)}
              />
            </div>
          </div>
          <AtomSkeleton className={clsx('mt-3 h-3 lg:mt-4', skeleton.text)} />
          {skeleton.line2 && (
            <AtomSkeleton className={clsx('mt-2 h-3', skeleton.line2)} />
          )}
          <AtomSkeleton className="mt-3 h-5 w-19 lg:mt-4 lg:h-5.5 lg:w-22.5" />
        </div>
      ))}
    </>
  );
}
