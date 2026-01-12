import type { ReactNode } from "react";

interface MobileBackgroundCardProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Reusable mobile background card component
 * Used across multiple sections for consistent mobile styling
 */
export function MobileBackgroundCard({ children, className = "" }: MobileBackgroundCardProps) {
  return (
    <div className={`absolute inset-0 z-0 flex items-center justify-center pointer-events-none lg:hidden ${className}`}>
      <div className="w-full h-[97%] rounded-[40px] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.14)]" />
      {children}
    </div>
  );
}
