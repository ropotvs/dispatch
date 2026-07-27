import { clsx } from 'clsx';

export function AtomSkeleton(props: { className?: string }) {
  return (
    <div
      className={clsx(
        'bg-[#dddddd] motion-safe:animate-pulse',
        props.className,
      )}
    />
  );
}
