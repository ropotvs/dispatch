import { AtomSkeleton } from '@dispatch/atoms';
import { clsx } from 'clsx';

export function FeatFeedMessageLoading(props: {
  className?: string;
  handle?: string;
  line2?: string;
  name?: string;
  text?: string;
}) {
  return (
    <div
      className={clsx(
        'border-ink border-[3px] bg-white p-3.5 lg:p-4.5',
        props.className,
      )}
    >
      <div className="flex items-center gap-2 lg:gap-2.5">
        <AtomSkeleton className="size-8 lg:size-9.5" />
        <div className="flex-1">
          <AtomSkeleton className={clsx('h-3', props.name ?? 'w-35')} />
          <AtomSkeleton
            className={clsx(
              'mt-2 hidden h-2.5 lg:block',
              props.handle ?? 'w-22.5',
            )}
          />
        </div>
      </div>
      <AtomSkeleton
        className={clsx('mt-3 h-3 lg:mt-4', props.text ?? 'w-full')}
      />
      {props.line2 && (
        <AtomSkeleton className={clsx('mt-2 h-3', props.line2)} />
      )}
      <AtomSkeleton className="mt-3 h-5 w-19 lg:mt-4 lg:h-5.5 lg:w-22.5" />
    </div>
  );
}
