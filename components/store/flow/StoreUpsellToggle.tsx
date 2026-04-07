"use client";

import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export function StoreUpsellToggle({
  label,
  price,
  enabled,
  onToggle,
  children,
}: {
  label: string;
  price: number;
  enabled: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border transition-all",
        enabled
          ? "border-blue-400 bg-white shadow-sm"
          : "border-grey-100 bg-blue-100/60",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded border transition-all",
              enabled
                ? "border-blue-400 bg-blue-400"
                : "border-grey-100 bg-white",
            )}
          >
            {enabled && <Check className="h-3 w-3 text-white" />}
          </div>
          <span className="text-sm font-medium text-blue-1000">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-blue-800">
            +{price} zł
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-blue-1000/40 transition-transform",
              enabled && "rotate-180",
            )}
          />
        </div>
      </button>
      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-grey-100 px-4 pb-4 pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
