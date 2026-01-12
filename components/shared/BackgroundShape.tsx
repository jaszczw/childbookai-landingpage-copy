import type { ReactNode } from "react";

/**
 * Props for BackgroundShape component
 */
interface BackgroundShapeProps {
  /** SVG viewBox attribute */
  viewBox: string;
  /** SVG path data */
  path: string;
  /** Fill color for the shape */
  fill?: string;
  /** Additional CSS classes */
  className?: string;
  /** Optional children to render inside the shape */
  children?: ReactNode;
}

/**
 * BackgroundShape component
 * Renders an SVG background shape for section backgrounds
 * 
 * @param props - BackgroundShapeProps
 * @returns JSX.Element
 */
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

