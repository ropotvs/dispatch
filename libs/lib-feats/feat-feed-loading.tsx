import { FeatFeedMessageLoading } from './feat-feed-message-loading';

export function FeatFeedLoading() {
  return (
    <>
      {[
        {
          handle: 'w-22.5',
          line2: 'w-4/5',
          name: 'w-35',
          text: 'w-full',
        },
        {
          handle: 'w-20',
          line2: 'w-3/5',
          name: 'w-30',
          text: 'w-[95%]',
        },
        {
          className: 'hidden lg:block',
          handle: 'w-17.5',
          name: 'w-32.5',
          text: 'w-[88%]',
        },
      ].map((skeleton) => (
        <FeatFeedMessageLoading
          className={skeleton.className}
          handle={skeleton.handle}
          key={skeleton.name}
          line2={skeleton.line2}
          name={skeleton.name}
          text={skeleton.text}
        />
      ))}
    </>
  );
}
