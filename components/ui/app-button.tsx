import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Sparkle } from "./sparkle";

type AppButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size"
> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "hero";
  loading?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  shadow?: boolean;
  withSparkles?: boolean;
};

const variantStyles = {
  primary:
    "bg-primary text-foreground hover:bg-blue-600 focus-visible:bg-blue-600 active:bg-blue-800 disabled:bg-grey-disabled disabled:hover:bg-grey-disabled disabled:focus-visible:bg-grey-disabled disabled:active:bg-grey-disabled",
  secondary:
    "bg-[var(--grey-100)] text-foreground hover:bg-[var(--grey-hover)] focus-visible:bg-[var(--grey-hover)] active:bg-[var(--grey-active)] disabled:bg-[var(--grey-disabled)] disabled:hover:bg-[var(--grey-disabled)] disabled:focus-visible:bg-[var(--grey-disabled)] disabled:active:bg-[var(--grey-disabled)]",
  ghost: "bg-transparent text-foreground hover:bg-muted disabled:bg-grey-disabled disabled:hover:bg-grey-disabled",
} as const;


// Core size tokens based on Figma specs with responsive text sizing
// Note: Shadows are applied conditionally via className - only on buttons that should have them
const sizeStyles: Record<NonNullable<AppButtonProps["size"]>, string> = {
  sm: "h-[36px] px-3 text-xs rounded-[14px] sm:h-[40px] sm:px-6 sm:text-sm md:text-base",
  md: "h-[40px] px-4 text-xs rounded-[14px] sm:h-[45px] sm:px-8 sm:text-sm md:text-base lg:text-lg",
  lg: "h-[44px] px-6 text-sm rounded-2xl sm:h-[56px] sm:px-10 sm:text-base md:text-lg",
  xl: "h-[48px] px-8 text-sm rounded-2xl sm:h-[60px] sm:px-10 sm:text-base md:h-[65px] md:text-lg lg:text-xl",
  "2xl":
    "h-[44px] px-6 text-sm rounded-2xl sm:h-[52px] sm:px-8 sm:text-base md:h-[56px] md:px-10 md:text-lg lg:h-[60px] lg:px-12 lg:text-xl",
  // Reusable responsive hero CTA size
  // Rough mapping:
  // - base: md
  // - sm: lg
  // - md: xl
  // - lg+: 2xl
  hero:
    // intentionally quite compact on mobile
    "h-7 px-2 rounded-lg text-[0.65rem] " +
    "sm:h-[40px] sm:px-6 sm:rounded-xl sm:text-sm " +
    "md:h-[56px] md:px-8 md:rounded-2xl md:text-lg " +
    "lg:h-[64px] lg:px-10 lg:rounded-2xl lg:text-2xl",
} as const;

// Shadow styles - pre-defined static classes for Tailwind compatibility
// Tailwind needs to see full class names at build time, so we use lookup objects
const shadowStyles = {
  // Regular buttons (sm, md, lg, xl)
  primary: "shadow-[0_5px_0_#30A0A6] hover:translate-y-[1px] hover:shadow-[0_4px_0_#30A0A6] active:translate-y-[3px] active:shadow-[0_3px_0_#30A0A6] focus-visible:translate-y-[1px] focus-visible:shadow-[0_4px_0_#30A0A6]",
  secondary: "shadow-[0_5px_0_#99AAAB] hover:translate-y-[1px] hover:shadow-[0_4px_0_#99AAAB] active:translate-y-[3px] active:shadow-[0_3px_0_#99AAAB] focus-visible:translate-y-[1px] focus-visible:shadow-[0_4px_0_#99AAAB]",
  disabled: "shadow-[0_5px_0_#A6A6A6]",
  // Large buttons (2xl, hero)
  primaryLarge: "shadow-[0_6px_0_#30A0A6] hover:translate-y-[1px] hover:shadow-[0_4px_0_#30A0A6] active:translate-y-[3px] active:shadow-[0_3px_0_#30A0A6] focus-visible:translate-y-[1px] focus-visible:shadow-[0_4px_0_#30A0A6]",
  secondaryLarge: "shadow-[0_6px_0_#99AAAB] hover:translate-y-[1px] hover:shadow-[0_4px_0_#99AAAB] active:translate-y-[3px] active:shadow-[0_3px_0_#99AAAB] focus-visible:translate-y-[1px] focus-visible:shadow-[0_4px_0_#99AAAB]",
  disabledLarge: "shadow-[0_6px_0_#A6A6A6]",
} as const;

const getShadowStyles = (
  variant: "primary" | "secondary" | "ghost",
  shadow: boolean,
  disabled: boolean,
  size: NonNullable<AppButtonProps["size"]>
) => {
  if (!shadow) {
    return "";
  }

  if (disabled) {
    const isLarge = size === "2xl" || size === "hero";
    return isLarge ? shadowStyles.disabledLarge : shadowStyles.disabled;
  }

  const isLarge = size === "2xl" || size === "hero";
  
  if (variant === "secondary") {
    return isLarge ? shadowStyles.secondaryLarge : shadowStyles.secondary;
  }

  return isLarge ? shadowStyles.primaryLarge : shadowStyles.primary;
};

export function AppButton({
  variant = "primary",
  size = "md",
  loading = false,
  leading,
  trailing,
  disabled,
  shadow = false,
  withSparkles = false,
  className,
  children,
  ...props
}: AppButtonProps) {
  // Responsive loader size based on button size
  const loaderSizes: Record<NonNullable<AppButtonProps["size"]>, string> = {
    sm: "h-3 w-3 sm:h-4 sm:w-4",
    md: "h-4 w-4 sm:h-5 sm:w-5",
    lg: "h-5 w-5 sm:h-6 sm:w-6",
    xl: "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7",
    "2xl": "h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8",
    hero: "h-3 w-3 sm:h-4 sm:w-4 md:h-6 md:w-6 lg:h-7 lg:w-7",
  };

  // Responsive sparkle size based on button size - scales proportionally across breakpoints
  const sparkleSizes: Record<NonNullable<AppButtonProps["size"]>, string> = {
    sm: "w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4",
    md: "w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5",
    lg: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
    xl: "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7",
    "2xl": "w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5",
    hero: "w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5",
  };

  // Automatically add sparkles if withSparkles is true and leading/trailing are not provided
  const finalLeading = withSparkles && !leading ? <Sparkle className={sparkleSizes[size]} /> : leading;
  const finalTrailing = withSparkles && !trailing ? <Sparkle className={sparkleSizes[size]} /> : trailing;

  return (
    <Button
      disabled={disabled || loading}
      // Map our semantic sizes to the underlying Button size tokens
      size={size === "hero" ? "2xl" : size}
      className={cn(
        "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        sizeStyles[size],
        variantStyles[variant],
        getShadowStyles(variant, shadow, disabled || loading, size),
        className
      )}
      {...props}
    >
      {loading ? (
        <Loader2 className={cn("animate-spin", loaderSizes[size])} />
      ) : (
        <span className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
          {finalLeading}
          {children}
          {finalTrailing}
        </span>
      )}
    </Button>
  );
}
