import { clsx } from 'clsx';
import Image from 'next/image';

export function AtomAvatar(props: {
  className?: string;
  image?: string;
  name: string;
  size: number;
}) {
  const initials = (
    <div
      className={clsx(
        'border-ink flex shrink-0 items-center justify-center border-[2.5px] font-bold',
        props.className,
      )}
      style={{
        fontSize: props.size / 2.26,
        height: props.size,
        width: props.size,
      }}
    >
      {props.name.charAt(0).toUpperCase()}
    </div>
  );

  if (!props.image) {
    return initials;
  }

  return (
    <span
      className="relative inline-flex shrink-0"
      style={{ height: props.size, width: props.size }}
    >
      {initials}
      <Image
        alt={props.name}
        className={clsx(
          'border-ink absolute inset-0 border-[2.5px] object-cover',
          props.className,
        )}
        height={props.size}
        onError={(event) => event.currentTarget.remove()}
        src={props.image}
        width={props.size}
      />
    </span>
  );
}
