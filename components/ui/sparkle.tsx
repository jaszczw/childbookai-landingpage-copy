import Image from "next/image";
import { cn } from "@/lib/utils";

export interface SparkleProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Sparkle({ width, height, className }: SparkleProps) {
  // Responsive default sizes if not provided - allow override via className
  const defaultWidth = width ?? 16;
  const defaultHeight = height ?? 16;
  
  return (
    <Image
      src="/illustrations/sparkle.png"
      alt=""
      width={defaultWidth}
      height={defaultHeight}
      aria-hidden
      className={cn(
        "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7",
        className
      )}
    />
  );
}
