import Link from 'next/link';

export function FeatFeedEmpty() {
  return (
    <div className="border-ink flex flex-1 flex-col items-center justify-center border-[3px] border-dashed bg-[repeating-linear-gradient(45deg,#edede7,#edede7_10px,#e4e4de_10px,#e4e4de_20px)] p-6 text-center lg:p-10">
      <div className="border-ink bg-brand flex size-14 items-center justify-center border-[3px] text-[1.75rem] font-bold shadow-[3px_3px_0_var(--color-ink)] lg:size-18 lg:text-[2.125rem] lg:shadow-[4px_4px_0_var(--color-ink)]">
        !
      </div>
      <div className="mt-4.5 text-[1.1875rem] font-bold lg:mt-6 lg:text-2xl">
        Nothing here yet
      </div>
      <div className="text-muted mt-2 text-xs leading-[1.6] lg:max-w-90 lg:text-sm">
        No messages match this view. Post the first one
        <span className="hidden lg:inline">
          , or{' '}
          <Link
            className="hover:text-ink underline transition-colors duration-100"
            href="/"
          >
            clear your filters
          </Link>
        </span>
        .
      </div>
    </div>
  );
}
