"use client";

import { cn } from "@/utils";
import { StoreStepCard } from "../StoreStepCard";
import { HAIR_COLORS, HAIR_LENGTHS } from "../storePickerOptions";
import type { StoreFormState } from "../useStoreState";

export function StoreAppearanceStep({
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
      <div className="mb-4">
        <p className="text-lg font-semibold text-blue-1000">Dopasuj wygląd</p>
        <p className="text-sm text-blue-1000/40">opcjonalnie</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-blue-1000/60">
            Kolor włosów
          </label>
          <div className="flex flex-wrap gap-2">
            {HAIR_COLORS.map((hc) => (
              <button
                key={hc.value}
                onClick={() => updateForm("hairColor", hc.value)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
                  form.hairColor === hc.value
                    ? "bg-white shadow-md ring-1 ring-blue-400"
                    : "bg-blue-100/80 hover:bg-white hover:shadow-sm",
                )}
              >
                <div
                  className={cn("h-4 w-4 rounded-full shadow-sm", hc.color)}
                />
                {hc.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-blue-1000/60">
            Długość włosów
          </label>
          <div className="flex gap-2">
            {HAIR_LENGTHS.map((hl) => (
              <button
                key={hl.value}
                onClick={() => updateForm("hairLength", hl.value)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm transition-all",
                  form.hairLength === hl.value
                    ? "bg-white shadow-md ring-1 ring-blue-400"
                    : "bg-blue-100/80 hover:bg-white hover:shadow-sm",
                )}
              >
                {hl.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </StoreStepCard>
  );
}
