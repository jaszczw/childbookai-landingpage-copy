"use client";

import React from "react";
import { Story, Verify } from "iconsax-react";
import { cn } from "@/lib/utils";

export type ProgressBadgeProps = {
  /**
   * Progress value (0-100)
   */
  progress: number;
  /**
   * Whether the progress is completed (100%)
   */
  isCompleted?: boolean;
  /**
   * Custom icon color (default: "#30a0a6")
   */
  iconColor?: string;
  /**
   * Icon size (default: 16)
   */
  iconSize?: number;
  /**
   * Additional CSS classes for the badge container
   */
  className?: string;
  /**
   * Additional CSS classes for the text
   */
  textClassName?: string;
  /**
   * Custom background color class (default: "bg-white")
   */
  backgroundColor?: string;
  /**
   * Position classes (default: "absolute bottom-2 right-2")
   */
  position?: string;
  /**
   * Whether to show the percentage text (default: true)
   */
  showPercentage?: boolean;
  /**
   * Custom text to display instead of percentage
   */
  customText?: string;
};

const ProgressBadge: React.FC<ProgressBadgeProps> = ({
  progress,
  isCompleted,
  iconColor = "#30a0a6",
  iconSize = 16,
  className,
  textClassName,
  backgroundColor = "bg-white",
  position = "absolute bottom-2 right-2",
  showPercentage = true,
  customText,
}) => {
  const displayText = customText ?? (showPercentage ? `${Math.round(progress)}%` : "");
  const completed = isCompleted ?? progress >= 100;

  return (
    <div className={cn("flex items-center gap-1 px-1 py-1.5 rounded-md", backgroundColor, position, className)}>
      <div className="flex items-center justify-center shrink-0">
        {completed ? (
          <Verify size={iconSize} color={iconColor} variant="Bold" />
        ) : (
          <Story size={iconSize} color={iconColor} variant="Bold" />
        )}
      </div>
      {displayText && (
        <span className={cn("text-foreground text-xs font-semibold whitespace-nowrap", textClassName)}>
          {displayText}
        </span>
      )}
    </div>
  );
};

export default ProgressBadge;
