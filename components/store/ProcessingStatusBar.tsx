"use client";

import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Sparkles } from "lucide-react";
import type { ProcessingPhase } from "./useStoreState";

const PHASE_LABELS: Record<ProcessingPhase, string> = {
  idle: "",
  analyzing: "Analizujemy zdjęcie",
  matching: "Dopasowujemy postać",
  illustrating: "Tworzymy ilustrację postaci",
  done: "Twój podgląd jest gotowy",
};

const PHASE_ORDER: ProcessingPhase[] = [
  "analyzing",
  "matching",
  "illustrating",
  "done",
];

function phaseIndex(phase: ProcessingPhase): number {
  return PHASE_ORDER.indexOf(phase);
}

export function ProcessingStatusBar({ phase }: { phase: ProcessingPhase }) {
  if (phase === "idle") return null;

  const isDone = phase === "done";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "overflow-hidden rounded-2xl border backdrop-blur-sm",
          isDone
            ? "border-emerald-200/60 bg-emerald-50/80"
            : "border-blue-200/60 bg-blue-100/80",
        )}
      >
        <div className="px-5 py-4">
          <div className="mb-3 flex items-center gap-2.5">
            {isDone ? (
              <Sparkles className="h-4 w-4 text-emerald-600" />
            ) : (
              <Loader2 className="h-4 w-4 animate-spin text-blue-800" />
            )}
            <span
              className={cn(
                "text-sm font-medium",
                isDone ? "text-emerald-700" : "text-blue-1000",
              )}
            >
              {isDone
                ? "Twój podgląd jest gotowy"
                : "Tworzymy ilustrację postaci..."}
            </span>
          </div>

          <div className="space-y-2">
            {PHASE_ORDER.filter((p) => p !== "done").map((p) => {
              const idx = phaseIndex(p);
              const currentIdx = phaseIndex(phase);
              const completed = currentIdx > idx;
              const active = currentIdx === idx;

              return (
                <div key={p} className="flex items-center gap-2.5">
                  {completed ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : active ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-full border border-grey-100" />
                  )}
                  <span
                    className={cn(
                      "text-xs",
                      completed
                        ? "text-emerald-600"
                        : active
                          ? "font-medium text-blue-1000"
                          : "text-blue-1000/40",
                    )}
                  >
                    {PHASE_LABELS[p]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
