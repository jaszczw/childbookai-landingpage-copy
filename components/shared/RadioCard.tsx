"use client";

import { cn } from "@/lib/utils";

export interface RadioCardProps {
  /** The title text for the card */
  title: string;
  /** The description text for the card */
  description: string;
  /** Whether the card is selected */
  isSelected: boolean;
  /** Callback function when the card is clicked */
  onClick: () => void;
  /** Custom className for the card container */
  className?: string;
  /** Custom className for the title */
  titleClassName?: string;
  /** Custom className for the description */
  descriptionClassName?: string;
  /** Border radius (default: 'lg' for rounded-lg) */
  radius?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Padding (default: 'md') */
  padding?: "sm" | "md" | "lg" | "xl";
  /** Background color when selected (default: blue-800) */
  selectedBgColor?: string;
  /** Background color when not selected (default: white) */
  unselectedBgColor?: string;
  /** Text color when selected (default: white) */
  selectedTextColor?: string;
  /** Text color when not selected (default: foreground) */
  unselectedTextColor?: string;
  /** Border color when not selected (default: transparent) */
  borderColor?: string;
}

const radiusClasses = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

const paddingClasses = {
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

export function RadioCard({
  title,
  description,
  isSelected,
  onClick,
  className,
  titleClassName,
  descriptionClassName,
  radius = "lg",
  padding = "md",
  selectedBgColor = "bg-blue-800",
  unselectedBgColor = "bg-blue-100",
  selectedTextColor = "text-white",
  unselectedTextColor = "text-foreground",
  borderColor,
}: RadioCardProps) {
  const radiusClass = radiusClasses[radius];
  const paddingClass = paddingClasses[padding];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-left transition-all cursor-pointer flex flex-col items-start h-full",
        radiusClass,
        paddingClass,
        isSelected
          ? `${selectedBgColor} ${selectedTextColor}`
          : `${unselectedBgColor} ${unselectedTextColor}`,
        borderColor && !isSelected ? `border-2 ${borderColor}` : "",
        className
      )}
    >
      <h3
        className={cn(
          "text-lg font-semibold mb-2 leading-none",
          isSelected ? selectedTextColor : unselectedTextColor,
          titleClassName
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-sm",
          isSelected ? selectedTextColor : unselectedTextColor,
          descriptionClassName
        )}
      >
        {description}
      </p>
    </button>
  );
}
