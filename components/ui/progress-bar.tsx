"use client";

import React from "react";
import { TickCircle } from "iconsax-react";
import { cn } from "@/lib/utils";

export type ProgressBarProps = {
  progress?: number; // 0-100
  className?: string;
  showSections?: boolean;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress = 0, 
  className,
  showSections = true 
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const fillWidth = (clampedProgress / 100) * 820;
  
  // Determine which sections are completed
  const firstSectionCompleted = clampedProgress > 0;
  const middleSectionCompleted = clampedProgress >= 50;
  const endSectionCompleted = clampedProgress >= 100;

  return (
    <div className={cn("relative w-full max-w-[820px] flex flex-col gap-2", className)}>
      {/* Section labels */}
      {showSections && (
        <div className="relative w-full h-6 flex items-center">
          {/* Request label */}
          <div className="absolute left-0 text-center" style={{ transform: 'translateX(0)' }}>
            <span className="text-sm font-medium text-foreground">Request</span>
          </div>
          
          {/* Story label */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <span className="text-sm font-medium text-foreground">Story</span>
          </div>
          
          {/* Image label */}
          <div className="absolute right-0 text-center" style={{ transform: 'translateX(0)' }}>
            <span className="text-sm font-medium text-foreground">Image</span>
          </div>
        </div>
      )}
      
      {/* Progress bar container */}
      <div className="relative w-full h-12 flex items-center">
        {/* Base SVG with pattern */}
        <svg 
          width="820" 
          height="12" 
          viewBox="0 0 820 12" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-3"
        >
        <defs>
          <clipPath id="clip0_progress_bar">
            <rect width="820" height="12" rx="6" fill="white"/>
          </clipPath>
        </defs>
        <g clipPath="url(#clip0_progress_bar)">
          {/* Background */}
          <rect width="820" height="12" rx="6" fill="#F4FAFA"/>
          
          {/* Pattern lines */}
          {Array.from({ length: 40 }).map((_, i) => {
            const x = 12.4844 + i * 20.2851;
            return (
              <rect
                key={i}
                opacity="0.3"
                x={x}
                y="-8.13867"
                width="8"
                height="32"
                transform={`rotate(45 ${x} -8.13867)`}
                fill="#30A0A6"
              />
            );
          })}

          {/* Progress fill */}
          <rect
            width={fillWidth}
            height="12"
            rx="6"
            fill="#30A0A6"
            className="transition-all duration-300 ease-out"
          />
        </g>
      </svg>

        {/* Section markers */}
        {showSections && (
        <>
          {/* First section marker (start) */}
          <div className="absolute left-0 top-1 flex items-center justify-center">
            {firstSectionCompleted ? (
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9"
                >
                  <rect width="36" height="36" rx="18" fill="#30A0A6"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TickCircle size={28} color="#ffffff" variant="Bold" />
                </div>
              </div>
            ) : (
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9"
              >
                <rect width="36" height="36" rx="18" fill="#F4FAFA"/>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 18C8 23.51 12.49 28 18 28C23.51 28 28 23.51 28 18C28 12.49 23.51 8 18 8C12.49 8 8 12.49 8 18Z"
                  stroke="#30A0A6"
                  strokeWidth="1.25"
                />
              </svg>
            )}
          </div>

          {/* Middle section marker */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1 flex items-center justify-center">
            {middleSectionCompleted ? (
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9"
                >
                  <rect width="36" height="36" rx="18" fill="#30A0A6"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TickCircle size={28} color="#ffffff" variant="Bold" />
                </div>
              </div>
            ) : (
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9"
              >
                <rect width="36" height="36" rx="18" fill="#F4FAFA"/>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 18C8 23.51 12.49 28 18 28C23.51 28 28 23.51 28 18C28 12.49 23.51 8 18 8C12.49 8 8 12.49 8 18Z"
                  stroke="#30A0A6"
                  strokeWidth="1.25"
                />
              </svg>
            )}
          </div>

          {/* End section marker */}
          <div className="absolute right-0 top-1 flex items-center justify-center">
            {endSectionCompleted ? (
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-9"
                >
                  <rect width="36" height="36" rx="18" fill="#30A0A6"/>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TickCircle size={28} color="#ffffff" variant="Bold" />
                </div>
              </div>
            ) : (
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9"
              >
                <rect width="36" height="36" rx="18" fill="#F4FAFA"/>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 18C8 23.51 12.49 28 18 28C23.51 28 28 23.51 28 18C28 12.49 23.51 8 18 8C12.49 8 8 12.49 8 18Z"
                  stroke="#30A0A6"
                  strokeWidth="1.25"
                />
              </svg>
            )}
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
