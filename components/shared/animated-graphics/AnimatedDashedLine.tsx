"use client";

import React, { useId } from "react";

interface AnimatedDashedLineProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  duration?: number; // Animation duration in seconds
  delay?: number; // Animation delay in seconds
  fillColor?: string; // Color to fill with
}

export function AnimatedDashedLine({
  width = 1440,
  height = 164,
  className = "",
  duration = 20,
  delay = 0,
  fillColor = "#54E6ED",
}: AnimatedDashedLineProps) {
  const maskId = `mask-${useId()}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1440 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Mask that reveals from left to right */}
        <mask id={maskId}>
          <rect width="100%" height="100%" fill="black" />
          <rect
            width="0%"
            height="100%"
            fill="white"
            style={{
              animation: `maskReveal ${duration}s ease-in-out ${delay}s forwards`,
            }}
          />
        </mask>
      </defs>
      
      {/* Base white dashed line */}
      <path
        d="M0 85.03C163.56 85.03 220.982 -10.6944 398 73.03C546 143.03 670 187.03 732 137.03C840.254 49.7286 986.5 -63.6399 1146.5 58.3601C1306.5 180.36 1334 33.03 1440 33.03"
        stroke="white"
        strokeWidth="10"
        strokeDasharray="50 50"
      />
      
      {/* Animated colored dashed line - masked to reveal from left to right */}
      <path
        d="M0 85.03C163.56 85.03 220.982 -10.6944 398 73.03C546 143.03 670 187.03 732 137.03C840.254 49.7286 986.5 -63.6399 1146.5 58.3601C1306.5 180.36 1334 33.03 1440 33.03"
        stroke={fillColor}
        strokeWidth="10"
        strokeDasharray="50 50"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
