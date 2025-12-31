import * as React from "react";
import { cn } from "@/lib/utils";

export interface SvgWideCardAltProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  fillColor?: string;
  width?: number | string;
  height?: number | string;
}

export function SvgWideCardAlt({
  children,
  className,
  fillColor = "#FFFFFF",
  width = "100%",
  height = 734,
  ...props
}: SvgWideCardAltProps) {
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
        viewBox="0 0 1440 734"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 80.0009C0 34.8076 37.4087 -1.41418 82.5785 0.0424697L1362.58 41.3203C1405.74 42.712 1440 78.0997 1440 121.279V600.643C1440 643.531 1406.18 678.789 1363.33 680.574L83.3304 733.907C37.8803 735.801 0 699.466 0 653.977V80.0009Z"
          fill={fillColor}
        />
      </svg>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full p-12">{children}</div>
    </div>
  );
}
