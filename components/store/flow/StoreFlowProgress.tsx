"use client";

import { cn } from "@/utils";

export function StoreFlowProgress({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-blue-1000/60">
          Krok {currentStep} z {totalSteps}
        </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-all duration-300",
              i < currentStep ? "bg-blue-400" : "bg-blue-100",
            )}
          />
        ))}
      </div>
    </div>
  );
}
