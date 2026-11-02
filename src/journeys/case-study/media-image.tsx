'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

export function MediaImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div
        className="case-media-error"
        role="img"
        aria-label={props.alt}
        style={{ aspectRatio: `${props.width} / ${props.height}` }}
      >
        <p>
          Screenshot unavailable. Its caption and the live product link remain
          available below.
        </p>
      </div>
    );
  return <Image {...props} alt={props.alt} onError={() => setFailed(true)} />;
}
