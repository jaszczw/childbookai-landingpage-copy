"use client";

import { Book3DShell } from "./Book3DShell";

export interface FloatingBookProps {
  coverUrl: string;
  alt: string;
  /** Front edge / back plate (e.g. theme background) */
  bookBackColor: string;
  /** Spine / depth tint */
  spineColor: string;
  className?: string;
  bookSizePx?: number;
}

export function FloatingBook({
  coverUrl,
  alt,
  bookBackColor,
  spineColor,
  className = "",
  bookSizePx = 240,
}: FloatingBookProps) {
  return (
    <Book3DShell
      bookBackColor={bookBackColor}
      spineColor={spineColor}
      bookSizePx={bookSizePx}
      className={className}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Remotion / external dynamic cover */}
      <img
        className="absolute inset-0 h-full w-full rounded-r-sm object-cover shadow-md"
        alt={alt}
        src={coverUrl}
        loading="lazy"
        decoding="async"
      />
    </Book3DShell>
  );
}
