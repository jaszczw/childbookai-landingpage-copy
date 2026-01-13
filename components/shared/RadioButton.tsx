"use client";

import { Circle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RadioButtonProps {
  /** The label text for the radio button */
  label: string;
  /** Whether the radio button is selected */
  isSelected: boolean;
  /** Callback function when the radio button is clicked */
  onClick: () => void;
  /** Custom className for the button container */
  className?: string;
  /** Custom className for the label text */
  labelClassName?: string;
  /** Size of the icon (default: 'md') */
  iconSize?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Border radius (default: 'xl' for rounded-xl) */
  radius?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Padding horizontal (default: 'md') */
  paddingX?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /** Padding vertical (default: 'md') */
  paddingY?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /** Gap between icon and label (default: 'md') */
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /** Font size for label (default: 'md' for text-md) */
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Background color when selected (default: blue-800) */
  selectedBgColor?: string;
  /** Background color when not selected (default: blue-100) */
  unselectedBgColor?: string;
  /** Text color when selected (default: white) */
  selectedTextColor?: string;
  /** Text color when not selected (default: foreground) */
  unselectedTextColor?: string;
  /** Icon ring color when not selected (default: blue-800) */
  iconRingColor?: string;
  /** Check icon color when selected (default: blue-800) */
  checkIconColor?: string;
}

const radiusClasses = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

const fontSizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
};

const paddingXClasses = {
  xs: "px-1",
  sm: "px-2",
  md: "px-4",
  lg: "px-6",
  xl: "px-8",
  "2xl": "px-10",
};

const paddingYClasses = {
  xs: "py-1",
  sm: "py-2",
  md: "py-2",
  lg: "py-3",
  xl: "py-4",
  "2xl": "py-5",
};

const gapClasses = {
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
  "2xl": "gap-8",
};

const iconSizeClasses = {
  xs: { container: "w-3 h-3", check: "w-1.5 h-1.5" },
  sm: { container: "w-4 h-4", check: "w-2 h-2" },
  md: { container: "w-5 h-5", check: "w-3 h-3" },
  lg: { container: "w-6 h-6", check: "w-4 h-4" },
  xl: { container: "w-8 h-8", check: "w-5 h-5" },
};

export function RadioButton({
  label,
  isSelected,
  onClick,
  className,
  labelClassName,
  iconSize = "md",
  radius = "xl",
  paddingX = "md",
  paddingY = "md",
  gap = "md",
  fontSize = "md",
  selectedBgColor = "bg-blue-800",
  unselectedBgColor = "bg-blue-100",
  selectedTextColor = "text-white",
  unselectedTextColor = "text-foreground",
  iconRingColor = "text-blue-800",
  checkIconColor = "text-blue-800",
}: RadioButtonProps) {
  const radiusClass = radiusClasses[radius];
  const fontSizeClass = fontSizeClasses[fontSize];
  const paddingXClass = paddingXClasses[paddingX];
  const paddingYClass = paddingYClasses[paddingY];
  const gapClass = gapClasses[gap];
  const iconSizeClass = iconSizeClasses[iconSize];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center transition-all",
        gapClass,
        paddingXClass,
        paddingYClass,
        radiusClass,
        isSelected
          ? `${selectedBgColor} ${selectedTextColor}`
          : `${unselectedBgColor} ${unselectedTextColor}`,
        className
      )}
    >
      {isSelected ? (
        <div
          className={cn(
            iconSizeClass.container,
            radiusClass,
            "bg-white flex items-center justify-center"
          )}
        >
          <Check className={cn(iconSizeClass.check, checkIconColor)} />
        </div>
      ) : (
        <Circle
          className={cn(
            iconSizeClass.container,
            iconRingColor,
            "fill-none stroke-2"
          )}
        />
      )}
      <span className={cn("font-semibold", fontSizeClass, labelClassName)}>
        {label}
      </span>
    </button>
  );
}
