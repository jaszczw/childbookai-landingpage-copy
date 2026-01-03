import type { ReactNode } from "react";

interface BackgroundShapeProps {
  viewBox: string;
  path: string;
  fill?: string;
  className?: string;
  children?: ReactNode;
}

export function BackgroundShape({
  viewBox,
  path,
  fill = "white",
  className = "",
  children,
}: BackgroundShapeProps) {
  return (
    <div className={`absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden ${className}`}>
      <svg
        viewBox={viewBox}
        className="w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={path} fill={fill} />
      </svg>
      {children}
    </div>
  );
}

