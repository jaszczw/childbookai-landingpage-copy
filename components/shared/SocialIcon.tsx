import type { ReactNode } from "react";

interface SocialIconProps {
  name: string;
  href: string;
  ariaLabel: string;
  children: ReactNode;
}

export function SocialIcon({ name, href, ariaLabel, children }: SocialIconProps) {
  return (
    <a
      href={href}
      className="w-12 h-12 min-w-[44px] min-h-[44px] rounded-full bg-primary flex items-center justify-center hover:opacity-80 transition-opacity touch-manipulation"
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

