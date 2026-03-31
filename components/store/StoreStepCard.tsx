"use client";

import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

interface StoreStepCardProps {
  visible: boolean;
  children: React.ReactNode;
  className?: string;
  autoScroll?: boolean;
}

export function StoreStepCard({
  visible,
  children,
  className,
  autoScroll = true,
}: StoreStepCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={(definition) => {
            if (
              autoScroll &&
              (definition === "animate" ||
                (typeof definition === "object" && "opacity" in definition && definition.opacity === 1))
            ) {
              ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
              });
            }
          }}
          className={cn("mb-8", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
