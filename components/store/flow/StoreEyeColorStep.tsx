"use client";

import { cn } from "@/utils";
import { StoreStepCard } from "../StoreStepCard";
import { EYE_COLORS } from "../storePickerOptions";
import type { StoreFormState } from "../useStoreState";

export function StoreEyeColorStep({
  visible,
  form,
  updateForm,
}: {
  visible: boolean;
  form: StoreFormState;
  updateForm: <K extends keyof StoreFormState>(
    key: K,
    value: StoreFormState[K],
  ) => void;
}) {
  return (
    <StoreStepCard visible={visible}>
      <label className="mb-4 block text-xl font-semibold text-blue-1000">
        Kolor oczu
      </label>
      <div className="flex gap-4">
        {EYE_COLORS.map((ec) => (
          <button
            key={ec.value}
            onClick={() => updateForm("eyeColor", ec.value)}
            className="group flex flex-col items-center gap-1.5"
            aria-label={ec.label}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-full shadow-md transition-all",
                ec.color,
                form.eyeColor === ec.value
                  ? "ring-3 ring-blue-400 ring-offset-2 scale-110"
                  : "hover:scale-105",
              )}
            />
            <span className="text-[11px] text-blue-1000/60">{ec.label}</span>
          </button>
        ))}
      </div>
    </StoreStepCard>
  );
}
