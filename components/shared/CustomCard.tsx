import * as React from "react";
import { cn } from "@/lib/utils";

export interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  fillColor?: string;
  headerColor?: string;
  width?: number | string;
  height?: number | string;
  svgVariant?: "first" | "second";
}

export function CustomCard({
  children,
  headerContent,
  className,
  fillColor = "#F4FAFA",
  headerColor = "#30A0A6",
  width = 400,
  height = 913,
  svgVariant = "second",
  ...props
}: CustomCardProps) {
  const w = typeof width === "number" ? `${width}px` : width;
  const h = typeof height === "number" ? `${height}px` : height;

  // Calculate header height as percentage (230/913 ≈ 25.2% of total height)
  const headerHeightRatio = 230 / 913;
  // Calculate cloud divider height as percentage (92/913 ≈ 10.1% of total height)
  const cloudHeightRatio = 92 / 913;

  // SVG variants
  const svgPaths = {
    first: {
      viewBox: "0 0 400 823",
      path: "M0 30C0 13.4315 13.4315 0 30 0H370C386.569 0 400 13.4315 400 30V792.463C400 809.619 385.637 823.282 368.502 822.425L28.5018 805.425C12.5356 804.627 0 791.449 0 775.463V30Z",
    },
    second: {
      viewBox: "0 0 400 913",
      path: "M0 30C0 13.4314 13.4315 0 30 0H370C386.569 0 400 13.4315 400 30V865.463C400 881.449 387.464 894.627 371.498 895.425L31.4981 912.425C14.3626 913.282 0 899.619 0 882.463V30Z",
    },
  };

  const currentSvg = svgPaths[svgVariant];

  return (
    <div
      className={cn("relative isolate", className)}
      style={{ width: w, height: h }}
      {...props}
    >
      {/* Main Card SVG Background */}
      <svg
        viewBox={currentSvg.viewBox}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={currentSvg.path}
          fill={fillColor}
        />
      </svg>

      {/* Header SVG - Overlays the top section */}
      <svg
        viewBox="0 0 400 230"
        className="absolute top-0 left-0 w-full z-10"
        style={{ height: `${headerHeightRatio * 100}%` }}
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 30C0 13.4315 13.4315 0 30 0H370C386.569 0 400 13.4315 400 30V230H0V30Z"
          fill={headerColor}
        />
      </svg>

      {/* Cloud Divider - Between header and content */}
      <svg
        viewBox="0 0 400 92"
        className="absolute left-0 w-full z-10"
        style={{
          top: `${headerHeightRatio * 100}%`,
          height: `${cloudHeightRatio * 100}%`,
          transform: "translateY(-50%)",
          zIndex: 15,
        }}
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M166.806 11.736C166.008 0.105815 147.218 2.89769 145.278 11.736C140.49 6.52245 133.998 9.67668 133.333 12.8516C128.889 6.57673 118.204 12.2897 117.207 17.4698C100.05 5.83965 88.1131 14.2949 84.2893 19.9763C79.9002 17.9711 77.1405 20.8118 76.3092 22.4827C75.5112 15.6651 69.9917 16.3001 67.3317 17.4698C65.3367 8.24589 60.2421 10.2045 57.0833 11.8755C55.3329 9.03317 50.3741 11.0388 50.3741 13.9607C42.793 11.1534 34.4444 17.4698 35.2778 22.4827C32.4848 20.4776 30.1389 22.4827 30.1389 25.5407C28.1439 23.9365 23.3333 26.3773 22.0833 31.1183C21.1111 27.0745 18.1944 24.2857 13.3333 26.3773C13.3333 16.1981 3.47222 9.78387 0 10.9529V92H400V16.4672C384.04 2.02975 362.917 8.94723 357.606 18.4724C340 12.8516 335.556 28.0506 340 36.9748C335.611 36.9748 332.835 41.0308 333.666 43.5373C330.556 38.927 325.788 39.7636 325.139 42.5525C327.591 32.0252 318.889 30.7 315.711 33.0101C314.167 27.4929 307.361 27.7717 305.417 32.2338C296.111 23.4491 280.278 29.5845 278.056 36.9748C278.854 26.5478 272.917 23.0307 268.333 24.8435C267.361 16.6165 258.472 15.6404 255 20.5208C255 14.3853 250.833 12.991 248.472 14.3853C246.667 -2.62637 229.028 -1.51084 221.528 2.95124C218.472 -1.65029 212.361 -0.25591 211.25 2.95121C201.275 0.544943 198.279 5.93989 198.611 10.9529C195.818 10.1508 188.969 13.2156 187.639 14.3853C182.851 11.177 176.968 14.0246 175.139 15.3614C173.144 10.5489 169.167 9.64435 166.806 11.736Z"
          fill={fillColor}
        />
      </svg>

      {/* Header Content - Above cloud divider */}
      {headerContent && (
        <div
          className="absolute top-0 left-0 w-full z-20 p-4 pb-4"
          style={{ height: `${headerHeightRatio * 100}%` }}
        >
          {headerContent}
        </div>
      )}

      {/* Body Content - Below cloud divider */}
      <div
        className="absolute left-0 w-full z-20 px-6 pt-6 pb-4 flex flex-col"
        style={{
          top: `${(headerHeightRatio + cloudHeightRatio * 0.5) * 100}%`,
          height: `${(1 - headerHeightRatio - cloudHeightRatio * 0.5) * 100}%`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
