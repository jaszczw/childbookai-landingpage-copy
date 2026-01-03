import type { ReactNode } from "react";
import Image from "next/image";

interface SocialIconProps {
  name: string;
  href: string;
  ariaLabel: string;
  children: ReactNode;
  backgroundIndex?: number;
}

export function SocialIcon({ href, ariaLabel, children, backgroundIndex = 0 }: SocialIconProps) {
  const backgroundSvg = backgroundIndex % 2 === 0 
    ? "/background/social-icon-bg-1.svg"
    : "/background/social-icon-bg-2.svg";

  return (
    <a
      href={href}
      className="group relative w-12 h-12 min-w-[44px] min-h-[44px] flex items-center justify-center transition-all touch-manipulation"
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={backgroundSvg}
        alt=""
        fill
        className="object-contain transition-opacity group-hover:opacity-80"
        sizes="48px"
        aria-hidden="true"
      />
      <span className="relative z-10 transition-colors group-hover:text-blue-400">{children}</span>
    </a>
  );
}

