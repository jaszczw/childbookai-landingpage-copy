"use client";

import Image from "next/image";
import { useState } from "react";

interface InnerIconButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  width?: number;
  height?: number;
  imageClassName?: string;
  ariaLabel?: string;
}

export function InnerIconButton({
  onClick,
  disabled = false,
  active = false,
  className = "",
  width = 85,
  height = 83,
  imageClassName = "",
  ariaLabel = "Toggle book preview",
}: InnerIconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getIconSrc = () => {
    if (disabled) return "/illustrations/inner-disabled.svg";
    if (active) return "/illustrations/inner-active.svg";
    if (isHovered) return "/illustrations/inner-hover.svg";
    return "/illustrations/inner-icon.svg";
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative transition-opacity duration-200 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-90"
      } ${className}`}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      <Image
        src={getIconSrc()}
        alt=""
        width={width}
        height={height}
        className={imageClassName}
        style={{ objectFit: "contain" }}
        aria-hidden="true"
      />
    </button>
  );
}
