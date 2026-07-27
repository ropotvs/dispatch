'use client';

import { clsx } from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

export function AtomAvatar(props: {
  className?: string;
  image?: string;
  name: string;
  size: number;
}) {
  const [imageLoadError, setImageLoadError] = useState(false);

  if (props.image && !imageLoadError) {
    return (
      <Image
        alt={props.name}
        className={clsx(
          'border-ink shrink-0 border-[2.5px] object-cover',
          props.className,
        )}
        height={props.size}
        onError={() => setImageLoadError(true)}
        src={props.image}
        width={props.size}
      />
    );
  }

  return (
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
}
