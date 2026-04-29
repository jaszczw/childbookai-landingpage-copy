import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getVisibleStoryOptions, type StoryOption } from "./storeCoverPresets";
import {
  addonUpsellPln,
  defaultStoreCatalog,
  getBookDiscountRate,
  sizeExtraPln,
  upsellPricesMap,
  type StoreCatalog,
} from "./storeCatalog";

export type { StoreCatalog } from "./storeCatalog";
export { defaultStoreCatalog } from "./storeCatalog";
import type { StoreBookSizeId } from "./storeCatalog";

export type { StoryOption } from "./storeCoverPresets";
export { STORY_OPTIONS } from "./storeCoverPresets";

export type Gender = "girl" | "boy";
export type EyeColor = "blue" | "green" | "brown" | "black";
export type HairColor = "blonde" | "brown" | "black" | "red" | "auburn";
export type HairLength = "short" | "medium" | "long";

export type ProcessingPhase =
  | "idle"
  | "analyzing"
  | "matching"
  | "illustrating"
  | "done";

export type BookSize = StoreBookSizeId;

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
  /** After choosing stories, user must confirm before per-book configuration appears. */
  storySelectionConfirmed: boolean;
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
  storySelectionConfirmed: false,
  bookConfigs: {},
  consentChecked: false,
};

function buildInitialState(preselect: StoryOption | null): StoreFormState {
  if (!preselect) return INITIAL_STATE;
  return {
    ...INITIAL_STATE,
    selectedStories: [preselect.id],
    storySelectionConfirmed: true,
    bookConfigs: {
      [preselect.id]: createDefaultBookConfig(preselect.id),
    },
  };
}

const PHASE_DURATIONS: Record<ProcessingPhase, number> = {
  idle: 0,
  analyzing: 8000,
  matching: 10000,
  illustrating: 15000,
  done: 0,
};

export const BASE_PRICE = defaultStoreCatalog.baseBookPricePln;

export const UPSELL_PRICES = upsellPricesMap(defaultStoreCatalog);

export const BOOK_DISCOUNTS = defaultStoreCatalog.bookDiscountRates;

export function getBookDiscount(
  bookIndex: number,
  catalog: StoreCatalog = defaultStoreCatalog,
): number {
  return getBookDiscountRate(catalog, bookIndex);
}

/** Labels for book addon upsells that are enabled (catalog-driven). */
export function enabledBookAddonLabels(
  config: BookConfig,
  catalog: StoreCatalog = defaultStoreCatalog,
): string[] {
  const out: string[] = [];
  if (config.dedication.enabled) {
    const u = catalog.bookAddonUpsells.find((x) => x.id === "dedication");
    if (u) out.push(u.label);
  }
  if (config.finalPage.enabled) {
    const u = catalog.bookAddonUpsells.find((x) => x.id === "finalPage");
    if (u) out.push(u.label);
  }
  return out;
}

export function singleBookPrice(
  config: BookConfig,
  catalog: StoreCatalog = defaultStoreCatalog,
): number {
  let p = catalog.baseBookPricePln;
  p += sizeExtraPln(catalog, config.size);
  if (config.dedication.enabled) p += addonUpsellPln(catalog, "dedication");
  if (config.finalPage.enabled) p += addonUpsellPln(catalog, "finalPage");
  return p;
}

export function computePrice(
  form: StoreFormState,
  catalog: StoreCatalog = defaultStoreCatalog,
): number {
  const { selectedStories, bookConfigs } = form;
  if (selectedStories.length === 0) return catalog.baseBookPricePln;
  let total = 0;
  for (let i = 0; i < selectedStories.length; i++) {
    const storyId = selectedStories[i]!;
    const config = bookConfigs[storyId] ?? createDefaultBookConfig(storyId);
    const full = singleBookPrice(config, catalog);
    const discount = getBookDiscount(i, catalog);
    total += Math.round(full * (1 - discount));
  }
  return total;
}

export function computePriceBreakdown(
  form: StoreFormState,
  catalog: StoreCatalog = defaultStoreCatalog,
) {
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
    const full = singleBookPrice(config, catalog);
    const discount = getBookDiscount(i, catalog);
    const final = Math.round(full * (1 - discount));
    lines.push({ index: i, storyId, full, discount, final });
    total += final;
  }
  return { lines, total };
}

export function useStoreState(options?: {
  catalog?: StoreCatalog;
  /**
   * Optional storefront-driven preselected book. When provided, the flow boots
   * directly into per-book configuration with this story already selected as
   * the first one — letting users layer additional stories on top to claim the
   * multi-book discount.
   */
  preselect?: StoryOption | null;
}) {
  const catalog = options?.catalog ?? defaultStoreCatalog;
  const preselect = options?.preselect ?? null;
  const extraStories = useMemo<StoryOption[]>(
    () => (preselect ? [preselect] : []),
    [preselect],
  );
  const [form, setForm] = useState<StoreFormState>(() =>
    buildInitialState(preselect),
  );
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
        const nextConfigs = { ...prev.bookConfigs };
        delete nextConfigs[id];
        return {
          ...prev,
          selectedStories: prev.selectedStories.filter((s) => s !== id),
          bookConfigs: nextConfigs,
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

  useEffect(() => {
    if (form.gender === null) return;
    const allowed = new Set(
      getVisibleStoryOptions(form.gender, extraStories).map((s) => s.id),
    );
    setForm((prev) => {
      const nextSelected = prev.selectedStories.filter((id) => allowed.has(id));
      if (nextSelected.length === prev.selectedStories.length) return prev;
      const nextConfigs = { ...prev.bookConfigs };
      for (const id of prev.selectedStories) {
        if (!allowed.has(id)) delete nextConfigs[id];
      }
      return {
        ...prev,
        selectedStories: nextSelected,
        bookConfigs: nextConfigs,
      };
    });
  }, [form.gender, extraStories]);

  useEffect(() => {
    if (form.selectedStories.length > 0) return;
    setForm((prev) =>
      prev.storySelectionConfirmed
        ? { ...prev, storySelectionConfirmed: false }
        : prev,
    );
  }, [form.selectedStories.length]);

  const confirmStorySelection = useCallback(() => {
    updateForm("storySelectionConfirmed", true);
  }, [updateForm]);

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
    if (!form.storySelectionConfirmed) return 6;
    if (!form.consentChecked) return 7;
    return 8;
  })();

  const totalSteps = 8;

  const price = useMemo(() => computePrice(form, catalog), [form, catalog]);
  const priceBreakdown = useMemo(
    () => computePriceBreakdown(form, catalog),
    [form, catalog],
  );

  return {
    catalog,
    extraStories,
    form,
    updateForm,
    setName,
    toggleStory,
    confirmStorySelection,
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

export function getBookTitle(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "";
  return `${trimmed} i niesamowite przygody`;
}
