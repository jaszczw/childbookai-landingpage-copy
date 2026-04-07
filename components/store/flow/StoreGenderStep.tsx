"use client";

import { cn } from "@/utils";
import { motion } from "framer-motion";
import { StoreStepCard } from "../StoreStepCard";
import type { StoreFormState } from "../useStoreState";

function GenderButton({
  emoji,
  label,
  selected,
  onSelect,
}: {
  emoji: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className={cn(
        "flex flex-1 items-center justify-center gap-3 rounded-xl px-6 py-4 text-lg transition-all",
        selected
          ? "bg-white font-semibold shadow-lg ring-2 ring-blue-400"
          : "bg-blue-100/50 shadow-sm hover:bg-white hover:shadow-md",
      )}
    >
      <span className="text-2xl">{emoji}</span>
      {label}
    </motion.button>
  );
}

export function StoreGenderStep({
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
        To dziewczynka czy chłopiec?
      </label>
      <div className="flex gap-3">
        <GenderButton
          emoji="👧"
          label="Dziewczynka"
          selected={form.gender === "girl"}
          onSelect={() => updateForm("gender", "girl")}
        />
        <GenderButton
          emoji="👦"
          label="Chłopiec"
          selected={form.gender === "boy"}
          onSelect={() => updateForm("gender", "boy")}
        />
      </div>
    </StoreStepCard>
  );
}
