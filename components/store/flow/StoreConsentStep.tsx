"use client";

import { Checkbox } from "@/ui/checkbox";
import { StoreStepCard } from "../StoreStepCard";
import type { StoreFormState } from "../useStoreState";

export function StoreConsentStep({
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
    <StoreStepCard visible={visible} autoScroll={false}>
      <div className="flex items-start gap-3 rounded-xl bg-blue-100/50 px-4 py-3">
        <Checkbox
          id="consent"
          checked={form.consentChecked}
          onCheckedChange={(checked) =>
            updateForm("consentChecked", checked === true)
          }
          className="mt-0.5"
        />
        <div>
          <label
            htmlFor="consent"
            className="cursor-pointer text-sm font-medium text-blue-1000"
          >
            Potwierdzam, że mam prawo użyć tego zdjęcia
          </label>
          <p className="text-xs text-blue-1000/40">
            Zdjęcie jest używane tylko do stworzenia książki
          </p>
        </div>
      </div>
    </StoreStepCard>
  );
}
