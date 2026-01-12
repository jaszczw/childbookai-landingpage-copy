"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to detect current breakpoint
 * @returns Object with boolean flags for mobile, tablet, and desktop breakpoints
 */
export function useBreakpoint() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === "undefined") {
      return;
    }

    const onResize = () => {
      setWidth(window.innerWidth);
    };
    
    // Set initial width
    onResize();

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    isMobile: width !== null && width < 640,
    isTablet: width !== null && width >= 640 && width < 1024,
    isDesktop: width !== null && width >= 1024,
  };
}
