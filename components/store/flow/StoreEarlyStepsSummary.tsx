"use client";

import { cn } from "@/utils";
import { ChevronDown, ImagePlus } from "lucide-react";
import { StoreStepCard } from "../StoreStepCard";
import { EYE_COLORS } from "../storePickerOptions";
import type { StoreFormState } from "../useStoreState";

export function StoreEarlyStepsSummary({
  form,
  earlyStepsExpanded,
  onToggleExpanded,
}: {
  form: StoreFormState;
  earlyStepsExpanded: boolean;
  onToggleExpanded: () => void;
}) {
  if (!form.photoUploaded) return null;

  const genderLabel =
    form.gender === "girl"
      ? "👧 Dziewczynka"
      : form.gender === "boy"
        ? "👦 Chłopiec"
        : null;
  const eyeLabel = EYE_COLORS.find((ec) => ec.value === form.eyeColor);

  return (
    <StoreStepCard visible>
      <button
        type="button"
        onClick={onToggleExpanded}
        className="flex w-full items-center justify-between rounded-xl bg-blue-100/60 px-4 py-3 transition-colors hover:bg-blue-100"
      >
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-semibold text-blue-1000">{form.name}</span>
          {genderLabel && (
            <span className="text-blue-1000/60">{genderLabel}</span>
          )}
          {eyeLabel && (
            <span className="flex items-center gap-1.5 text-blue-1000/60">
              <span
                className={cn(
                  "inline-block h-3.5 w-3.5 rounded-full shadow-sm",
                  eyeLabel.color,
                )}
              />
              {eyeLabel.label}
            </span>
          )}
          <span className="flex items-center gap-1 text-emerald-600">
            <ImagePlus className="h-3.5 w-3.5" />
            Zdjęcie
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-blue-1000/40 transition-transform",
            earlyStepsExpanded && "rotate-180",
          )}
        />
      </button>
    </StoreStepCard>
  );
}
