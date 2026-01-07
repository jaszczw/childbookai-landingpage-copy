"use client";

import { useEffect, useState } from "react";

export function useBreakpoint() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
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
