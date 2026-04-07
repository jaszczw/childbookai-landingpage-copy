"use client";

import { StoreStepCard } from "../StoreStepCard";
import type { StoreFormState } from "../useStoreState";

export function StoreNameStep({
  visible,
  form,
  setName,
}: {
  visible: boolean;
  form: StoreFormState;
  setName: (name: string) => void;
}) {
  return (
    <StoreStepCard visible={visible}>
      <label className="mb-3 block text-xl font-semibold text-blue-1000">
        Jak ma na imię bohater?
      </label>
      <input
        type="text"
        value={form.name}
        onChange={(e) => setName(e.target.value)}
        placeholder="np. Zosia"
        className="w-full rounded-xl border-0 bg-white px-5 py-4 text-2xl font-medium text-blue-1000 shadow-sm outline-none ring-1 ring-grey-100 transition-shadow placeholder:text-placeholder focus:ring-2 focus:ring-blue-400"
        autoFocus={!form.photoUploaded}
      />
    </StoreStepCard>
  );
}
