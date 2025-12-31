import * as React from "react";
import { cn } from "@/lib/utils";

export interface SvgWideCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fillColor?: string;
  width?: number | string;
  height?: number | string;
}

export function SvgWideCard({
  children,
  className,
  fillColor = "#FFFFFF",
  width = "100%",
  height = 1200,
  ...props
}: SvgWideCardProps) {
  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn("relative isolate", className)}
      style={{ width: w, height: h }}
      {...props}
    >
      {/* SVG Background */}
      <svg
        viewBox="0 0 1440 1082"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M1440 80.0008C1440 34.8075 1402.59 -1.41424 1357.42 0.0424087L77.4214 41.3202C34.2648 42.7119 0 78.0997 0 121.279V948.643C0 991.531 33.8195 1026.79 76.6696 1028.57L1356.67 1081.91C1402.12 1083.8 1440 1047.47 1440 1001.98V80.0008Z"
          fill={fillColor}
        />
      </svg>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full p-12">{children}</div>
    </div>
  );
}
