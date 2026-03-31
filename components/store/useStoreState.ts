import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type Gender = "girl" | "boy";
export type EyeColor = "blue" | "green" | "brown" | "black";
export type HairColor = "blonde" | "brown" | "black" | "red" | "auburn";
export type HairLength = "short" | "medium" | "long";

export interface StoryOption {
  id: string;
  title: string;
  description: string;
  coverGradient: string;
  coverEmoji: string;
}

export const STORY_OPTIONS: StoryOption[] = [
  {
    id: "adventure",
    title: "Wielka Przygoda",
    description: "Podróż przez magiczny las pełen niespodzianek",
    coverGradient: "from-emerald-400 to-teal-600",
    coverEmoji: "🌲",
  },
  {
    id: "space",
    title: "Kosmiczna Wyprawa",
    description: "Odkrywanie gwiazd i planet z nowym przyjacielem",
    coverGradient: "from-indigo-500 to-purple-700",
    coverEmoji: "🚀",
  },
  {
    id: "underwater",
    title: "Podwodny Świat",
    description: "Nurkowanie z delfinami i odkrywanie raf koralowych",
    coverGradient: "from-cyan-400 to-blue-600",
    coverEmoji: "🐬",
  },
  {
    id: "dinosaurs",
    title: "Kraina Dinozaurów",
    description: "Spotkanie z przyjaznymi dinozaurami sprzed milionów lat",
    coverGradient: "from-amber-500 to-orange-600",
    coverEmoji: "🦕",
  },
];

export type ProcessingPhase =
  | "idle"
  | "analyzing"
  | "matching"
  | "illustrating"
  | "done";

export type BookSize = "21x21" | "30x30";

export interface DedicationConfig {
  enabled: boolean;
  title: string;
  text: string;
  underwriting: string;
}

export interface FinalPageConfig {
  enabled: boolean;
  photoUrl: string | null;
  photoUploaded: boolean;
  shortTitle: string;
}

export interface BookConfig {
  storyId: string;
  size: BookSize;
  dedication: DedicationConfig;
  finalPage: FinalPageConfig;
}

export interface StoreFormState {
  name: string;
  gender: Gender | null;
  eyeColor: EyeColor | null;
  photoUploaded: boolean;
  photoUrl: string | null;
  hairColor: HairColor | null;
  hairLength: HairLength | null;
  selectedStories: string[];
  bookConfigs: Record<string, BookConfig>;
  consentChecked: boolean;
}

const DEFAULT_DEDICATION: DedicationConfig = {
  enabled: false,
  title: "",
  text: "",
  underwriting: "",
};

const DEFAULT_FINAL_PAGE: FinalPageConfig = {
  enabled: false,
  photoUrl: null,
  photoUploaded: false,
  shortTitle: "",
};

function createDefaultBookConfig(storyId: string): BookConfig {
  return {
    storyId,
    size: "21x21",
    dedication: { ...DEFAULT_DEDICATION },
    finalPage: { ...DEFAULT_FINAL_PAGE },
  };
}

const INITIAL_STATE: StoreFormState = {
  name: "",
  gender: null,
  eyeColor: null,
  photoUploaded: false,
  photoUrl: null,
  hairColor: null,
  hairLength: null,
  selectedStories: [],
  bookConfigs: {},
  consentChecked: false,
};

const PHASE_DURATIONS: Record<ProcessingPhase, number> = {
  idle: 0,
  analyzing: 8000,
  matching: 10000,
  illustrating: 15000,
  done: 0,
};

export const BASE_PRICE = 89;

export const UPSELL_PRICES = {
  size_30x30: 30,
  dedication: 15,
  finalPage: 15,
} as const;

export const BOOK_DISCOUNTS = [0, 0.1, 0.15, 0.2] as const;

export function getBookDiscount(bookIndex: number): number {
  if (bookIndex <= 0) return 0;
  if (bookIndex >= BOOK_DISCOUNTS.length)
    return BOOK_DISCOUNTS[BOOK_DISCOUNTS.length - 1]!;
  return BOOK_DISCOUNTS[bookIndex]!;
}

export function singleBookPrice(config: BookConfig): number {
  let p = BASE_PRICE;
  if (config.size === "30x30") p += UPSELL_PRICES.size_30x30;
  if (config.dedication.enabled) p += UPSELL_PRICES.dedication;
  if (config.finalPage.enabled) p += UPSELL_PRICES.finalPage;
  return p;
}

export function computePrice(form: StoreFormState): number {
  const { selectedStories, bookConfigs } = form;
  if (selectedStories.length === 0) return BASE_PRICE;
  let total = 0;
  for (let i = 0; i < selectedStories.length; i++) {
    const storyId = selectedStories[i]!;
    const config = bookConfigs[storyId] ?? createDefaultBookConfig(storyId);
    const full = singleBookPrice(config);
    const discount = getBookDiscount(i);
    total += Math.round(full * (1 - discount));
  }
  return total;
}

export function computePriceBreakdown(form: StoreFormState) {
  const { selectedStories, bookConfigs } = form;
  const count = Math.max(1, selectedStories.length);
  const lines: {
    index: number;
    storyId: string;
    full: number;
    discount: number;
    final: number;
  }[] = [];
  let total = 0;

  for (let i = 0; i < count; i++) {
    const storyId = selectedStories[i] ?? "";
    const config = bookConfigs[storyId] ?? createDefaultBookConfig(storyId);
    const full = singleBookPrice(config);
    const discount = getBookDiscount(i);
    const final = Math.round(full * (1 - discount));
    lines.push({ index: i, storyId, full, discount, final });
    total += final;
  }
  return { lines, total };
}

export function useStoreState() {
  const [form, setForm] = useState<StoreFormState>(INITIAL_STATE);
  const [processingPhase, setProcessingPhase] =
    useState<ProcessingPhase>("idle");
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateForm = useCallback(
    <K extends keyof StoreFormState>(key: K, value: StoreFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setName = useCallback(
    (raw: string) => {
      const trimmed = raw.trimStart();
      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      updateForm("name", capitalized);
    },
    [updateForm],
  );

  const toggleStory = useCallback((id: string) => {
    setForm((prev) => {
      const has = prev.selectedStories.includes(id);
      if (has) {
        const { [id]: _removed, ...rest } = prev.bookConfigs;
        return {
          ...prev,
          selectedStories: prev.selectedStories.filter((s) => s !== id),
          bookConfigs: rest,
        };
      }
      return {
        ...prev,
        selectedStories: [...prev.selectedStories, id],
        bookConfigs: {
          ...prev.bookConfigs,
          [id]: createDefaultBookConfig(id),
        },
      };
    });
  }, []);

  const updateBookConfig = useCallback(
    (storyId: string, updater: (prev: BookConfig) => BookConfig) => {
      setForm((prev) => {
        const existing =
          prev.bookConfigs[storyId] ?? createDefaultBookConfig(storyId);
        return {
          ...prev,
          bookConfigs: {
            ...prev.bookConfigs,
            [storyId]: updater(existing),
          },
        };
      });
    },
    [],
  );

  const startProcessing = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const phases: ProcessingPhase[] = [
      "analyzing",
      "matching",
      "illustrating",
      "done",
    ];
    let idx = 0;

    const advancePhase = () => {
      const phase = phases[idx];
      if (!phase) return;
      setProcessingPhase(phase);
      idx++;
      const duration = PHASE_DURATIONS[phase];
      if (duration > 0 && idx < phases.length) {
        timerRef.current = setTimeout(advancePhase, duration);
      }
    };

    advancePhase();
  }, []);

  const handlePhotoUpload = useCallback(() => {
    updateForm("photoUploaded", true);
    updateForm("photoUrl", "/mock-child.svg");
    updateForm("hairColor", "brown");
    updateForm("hairLength", "medium");
    startProcessing();
  }, [updateForm, startProcessing]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const canSubmit =
    form.name.trim().length > 0 &&
    form.gender !== null &&
    form.photoUploaded &&
    form.consentChecked;

  const currentStep = (() => {
    if (!form.name.trim()) return 1;
    if (!form.gender) return 2;
    if (!form.eyeColor) return 3;
    if (!form.photoUploaded) return 4;
    if (form.selectedStories.length === 0) return 6;
    if (!form.consentChecked) return 7;
    return 8;
  })();

  const totalSteps = 8;

  const price = useMemo(() => computePrice(form), [form]);
  const priceBreakdown = useMemo(() => computePriceBreakdown(form), [form]);

  return {
    form,
    updateForm,
    setName,
    toggleStory,
    updateBookConfig,
    handlePhotoUpload,
    processingPhase,
    canSubmit,
    currentStep,
    totalSteps,
    mobilePreviewOpen,
    setMobilePreviewOpen,
    price,
    priceBreakdown,
  };
}

export function getBookTitle(name: string, gender: Gender | null): string {
  if (!name.trim()) return "";
  const trimmed = name.trim();
  if (!gender) return `Przygoda ${trimmed}`;
  if (gender === "girl") {
    if (trimmed.endsWith("a")) {
      return `Przygoda ${trimmed.slice(0, -1)}i`;
    }
    return `Przygoda ${trimmed}`;
  }
  return `Przygoda ${trimmed}a`;
}
