"use client";

import { cn } from "@/utils";
import { AppButton } from "@/ui/app-button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  ImagePlus,
  Package,
  Percent,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Upload,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Checkbox } from "@/ui/checkbox";
import { StoreStepCard } from "./StoreStepCard";
import {
  STORY_OPTIONS,
  UPSELL_PRICES,
  getBookDiscount,
  singleBookPrice,
  type BookConfig,
  type BookSize,
  type EyeColor,
  type Gender,
  type HairColor,
  type HairLength,
  type StoreFormState,
} from "./useStoreState";

interface StoreFlowProps {
  form: StoreFormState;
  currentStep: number;
  totalSteps: number;
  canSubmit: boolean;
  price: number;
  priceBreakdown: {
    lines: {
      index: number;
      storyId: string;
      full: number;
      discount: number;
      final: number;
    }[];
    total: number;
  };
  setName: (name: string) => void;
  updateForm: <K extends keyof StoreFormState>(
    key: K,
    value: StoreFormState[K],
  ) => void;
  updateBookConfig: (
    storyId: string,
    updater: (prev: BookConfig) => BookConfig,
  ) => void;
  toggleStory: (id: string) => void;
  handlePhotoUpload: () => void;
  mobilePreviewOpen?: boolean;
}

const EYE_COLORS: { value: EyeColor; color: string; label: string }[] = [
  { value: "blue", color: "bg-blue-500", label: "Niebieskie" },
  { value: "green", color: "bg-emerald-500", label: "Zielone" },
  { value: "brown", color: "bg-amber-700", label: "Brązowe" },
  { value: "black", color: "bg-neutral-800", label: "Czarne" },
];

const HAIR_COLORS: { value: HairColor; label: string; color: string }[] = [
  { value: "blonde", label: "Blond", color: "bg-amber-300" },
  { value: "brown", label: "Brązowe", color: "bg-amber-700" },
  { value: "black", label: "Czarne", color: "bg-neutral-800" },
  { value: "red", label: "Rude", color: "bg-orange-600" },
  { value: "auburn", label: "Kasztanowe", color: "bg-red-900" },
];

const HAIR_LENGTHS: { value: HairLength; label: string }[] = [
  { value: "short", label: "Krótkie" },
  { value: "medium", label: "Średnie" },
  { value: "long", label: "Długie" },
];

const SIZE_OPTIONS: { value: BookSize; label: string; extra: number }[] = [
  { value: "21x21", label: "21×21 cm", extra: 0 },
  { value: "30x30", label: "30×30 cm", extra: UPSELL_PRICES.size_30x30 },
];

export function StoreFlow({
  form,
  currentStep,
  totalSteps,
  canSubmit,
  price,
  priceBreakdown,
  setName,
  updateForm,
  updateBookConfig,
  toggleStory,
  handlePhotoUpload,
  mobilePreviewOpen,
}: StoreFlowProps) {
  const onUploadClick = useCallback(() => {
    handlePhotoUpload();
  }, [handlePhotoUpload]);

  const [earlyStepsExpanded, setEarlyStepsExpanded] = useState(false);
  const showLateSteps = form.photoUploaded && form.selectedStories.length > 0;
  const collapseEarlySteps = form.photoUploaded && !earlyStepsExpanded;

  const genderLabel = form.gender === "girl" ? "👧 Dziewczynka" : form.gender === "boy" ? "👦 Chłopiec" : null;
  const eyeLabel = EYE_COLORS.find((ec) => ec.value === form.eyeColor);

  return (
    <div className="flex flex-col pb-20 lg:pb-0">
      {/* Step progress indicator */}
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
                i < currentStep
                  ? "bg-blue-400"
                  : "bg-blue-100",
              )}
            />
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <StoreStepCard visible>
        <div className="flex flex-wrap gap-4 text-xs text-blue-1000/60">
          <span className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-blue-400" />
            Dostawa 3-5 dni
          </span>
          <span className="flex items-center gap-1.5">
            <Package className="h-3.5 w-3.5 text-blue-400" />
            Druk premium
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-blue-400" />
            4.9/5
          </span>
          <span className="flex items-center gap-1.5">
            <Percent className="h-3.5 w-3.5 text-blue-400" />
            Rabat na kolejne
          </span>
        </div>
      </StoreStepCard>

      {/* Collapsed summary of steps 1-4 (shown after photo upload) */}
      {form.photoUploaded && (
        <StoreStepCard visible>
          <button
            type="button"
            onClick={() => setEarlyStepsExpanded((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl bg-blue-100/60 px-4 py-3 transition-colors hover:bg-blue-100"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-semibold text-blue-1000">{form.name}</span>
              {genderLabel && (
                <span className="text-blue-1000/60">{genderLabel}</span>
              )}
              {eyeLabel && (
                <span className="flex items-center gap-1.5 text-blue-1000/60">
                  <span className={cn("inline-block h-3.5 w-3.5 rounded-full shadow-sm", eyeLabel.color)} />
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
      )}

      {/* Step 1: Name */}
      <StoreStepCard visible={!collapseEarlySteps}>
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

      {/* Step 2: Gender */}
      <StoreStepCard visible={!collapseEarlySteps && currentStep >= 2}>
        <label className="mb-4 block text-xl font-semibold text-blue-1000">
          To dziewczynka czy chłopiec?
        </label>
        <div className="flex gap-3">
          <GenderButton
            emoji="👧"
            label="Dziewczynka"
            value="girl"
            selected={form.gender === "girl"}
            onSelect={() => updateForm("gender", "girl")}
          />
          <GenderButton
            emoji="👦"
            label="Chłopiec"
            value="boy"
            selected={form.gender === "boy"}
            onSelect={() => updateForm("gender", "boy")}
          />
        </div>
      </StoreStepCard>

      {/* Step 3: Eye Color */}
      <StoreStepCard visible={!collapseEarlySteps && currentStep >= 3}>
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

      {/* Step 4: Photo Upload */}
      <StoreStepCard visible={!collapseEarlySteps && currentStep >= 4 && !form.photoUploaded}>
        <div
          role="button"
          tabIndex={0}
          onClick={onUploadClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onUploadClick();
          }}
          className="group flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-grey-100 bg-blue-100/50 px-8 py-12 transition-all hover:border-blue-400 hover:bg-blue-100"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Camera className="h-7 w-7 text-blue-800" />
          </div>
          <p className="mb-1 text-lg font-semibold text-blue-1000">
            Dodaj zdjęcie dziecka
          </p>
          <p className="text-sm text-blue-1000/40">
            Nie musisz nic kadrować — zrobimy to za Ciebie
          </p>
        </div>
      </StoreStepCard>

      {/* Photo uploaded confirmation (shown only when expanded) */}
      {form.photoUploaded && earlyStepsExpanded && (
        <StoreStepCard visible>
          <div className="flex items-center gap-3 rounded-xl bg-emerald-50/80 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
              <ImagePlus className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-emerald-700">
              Zdjęcie dodane
            </span>
          </div>
        </StoreStepCard>
      )}

      {/* Step 5: Auto-filled appearance (optional) */}
      <StoreStepCard visible={form.photoUploaded}>
        <div className="mb-4">
          <p className="text-lg font-semibold text-blue-1000">
            Dopasuj wygląd
          </p>
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

      {/* Step 6: Story Selection */}
      <StoreStepCard visible={form.photoUploaded} autoScroll={false}>
        <div className="mb-4">
          <label className="block text-xl font-semibold text-blue-1000">
            Wybierz historię
          </label>
          <p className="mt-1 text-sm text-blue-1000/40">
            Możesz wybrać kilka — im więcej, tym taniej
          </p>
        </div>

        {/* Savings banner */}
        <AnimatePresence>
          {form.selectedStories.length >= 1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 overflow-hidden"
            >
              <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 px-4 py-3">
                <Percent className="h-4 w-4 shrink-0 text-emerald-600" />
                <p className="text-sm text-emerald-700">
                  {form.selectedStories.length === 1 ? (
                    <>
                      Dodaj kolejną i zaoszczędź{" "}
                      <span className="font-bold">
                        {Math.round(getBookDiscount(1) * 100)}%
                      </span>{" "}
                      na drugiej książce!
                    </>
                  ) : (
                    <>
                      <span className="font-bold">
                        {form.selectedStories.length} książki
                      </span>
                      {" — "}
                      oszczędzasz{" "}
                      <span className="font-bold">
                        {priceBreakdown.lines.reduce(
                          (acc, l) => acc + (l.full - l.final),
                          0,
                        )}{" "}
                        zł
                      </span>
                      {getBookDiscount(form.selectedStories.length) > 0 &&
                        form.selectedStories.length < STORY_OPTIONS.length && (
                          <>
                            . Kolejna z{" "}
                            <span className="font-bold">
                              {Math.round(
                                getBookDiscount(form.selectedStories.length) *
                                  100,
                              )}
                              %
                            </span>{" "}
                            rabatem!
                          </>
                        )}
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {STORY_OPTIONS.map((story) => {
            const selected = form.selectedStories.includes(story.id);
            const positionInSelection = form.selectedStories.indexOf(story.id);
            const discount =
              positionInSelection >= 0
                ? getBookDiscount(positionInSelection)
                : null;

            const nextSlot = form.selectedStories.length;
            const potentialDiscount = !selected
              ? getBookDiscount(nextSlot)
              : null;

            return (
              <motion.button
                key={story.id}
                onClick={() => toggleStory(story.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "relative overflow-hidden rounded-xl p-4 text-left transition-all",
                  selected
                    ? "bg-white shadow-lg ring-2 ring-blue-400"
                    : "bg-blue-100/50 shadow-sm hover:bg-white hover:shadow-md",
                )}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl">{story.coverEmoji}</span>
                  <div
                    className={cn(
                      "h-2 w-10 rounded-full bg-linear-to-r",
                      story.coverGradient,
                    )}
                  />
                </div>
                <h4 className="mb-1 font-semibold text-blue-1000">
                  {story.title}
                </h4>
                <p className="text-xs text-blue-1000/60">{story.description}</p>

                {selected && discount !== null && discount > 0 && (
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    -{Math.round(discount * 100)}%
                  </div>
                )}
                {!selected &&
                  potentialDiscount !== null &&
                  potentialDiscount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                    >
                      <Percent className="h-3 w-3" />
                      -{Math.round(potentialDiscount * 100)}% rabatu
                    </motion.div>
                  )}

                {selected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-400"
                  >
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </StoreStepCard>

      {/* Step 7: Per-book configuration */}
      {form.selectedStories.map((storyId, idx) => {
        const story = STORY_OPTIONS.find((s) => s.id === storyId);
        if (!story) return null;
        const config = form.bookConfigs[storyId];
        if (!config) return null;

        return (
          <StoreStepCard key={storyId} visible={showLateSteps} autoScroll={false}>
            <div className="mb-5 flex items-center gap-2.5">
              <span className="text-2xl">{story.coverEmoji}</span>
              <div>
                <h3 className="text-lg font-semibold text-blue-1000">
                  {story.title}
                </h3>
                <p className="text-xs text-blue-1000/40">
                  Książka {idx + 1} z {form.selectedStories.length}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Size picker */}
              <div>
                <label className="mb-2 block text-sm font-medium text-blue-1000/60">
                  Rozmiar
                </label>
                <div className="flex gap-2">
                  {SIZE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        updateBookConfig(storyId, (prev) => ({
                          ...prev,
                          size: opt.value,
                        }))
                      }
                      className={cn(
                        "flex flex-1 flex-col items-center rounded-xl px-4 py-3 text-sm transition-all",
                        config.size === opt.value
                          ? "bg-white font-medium shadow-md ring-1 ring-blue-400"
                          : "bg-blue-100/80 hover:bg-white hover:shadow-sm",
                      )}
                    >
                      <span>{opt.label}</span>
                      {opt.extra > 0 && (
                        <span className="mt-0.5 text-[10px] text-blue-800">
                          +{opt.extra} zł
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dedication upsell */}
              <UpsellToggle
                label="Dedykacja"
                price={UPSELL_PRICES.dedication}
                enabled={config.dedication.enabled}
                onToggle={() =>
                  updateBookConfig(storyId, (prev) => ({
                    ...prev,
                    dedication: {
                      ...prev.dedication,
                      enabled: !prev.dedication.enabled,
                    },
                  }))
                }
              >
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-blue-1000/60">
                      Tytuł dedykacji
                    </label>
                    <input
                      type="text"
                      value={config.dedication.title}
                      onChange={(e) =>
                        updateBookConfig(storyId, (prev) => ({
                          ...prev,
                          dedication: {
                            ...prev.dedication,
                            title: e.target.value,
                          },
                        }))
                      }
                      placeholder="np. Dla mojego synka"
                      className="w-full rounded-lg border-0 bg-white px-3 py-2 text-sm text-blue-1000 shadow-sm outline-none ring-1 ring-grey-100 placeholder:text-placeholder focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-blue-1000/60">
                      Treść
                    </label>
                    <textarea
                      value={config.dedication.text}
                      onChange={(e) =>
                        updateBookConfig(storyId, (prev) => ({
                          ...prev,
                          dedication: {
                            ...prev.dedication,
                            text: e.target.value,
                          },
                        }))
                      }
                      placeholder="Twoja wiadomość..."
                      rows={3}
                      className="w-full resize-none rounded-lg border-0 bg-white px-3 py-2 text-sm text-blue-1000 shadow-sm outline-none ring-1 ring-grey-100 placeholder:text-placeholder focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-blue-1000/60">
                      Podpis
                    </label>
                    <input
                      type="text"
                      value={config.dedication.underwriting}
                      onChange={(e) =>
                        updateBookConfig(storyId, (prev) => ({
                          ...prev,
                          dedication: {
                            ...prev.dedication,
                            underwriting: e.target.value,
                          },
                        }))
                      }
                      placeholder="np. Od Mamy i Taty"
                      className="w-full rounded-lg border-0 bg-white px-3 py-2 text-sm text-blue-1000 shadow-sm outline-none ring-1 ring-grey-100 placeholder:text-placeholder focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </UpsellToggle>

              {/* Final page upsell */}
              <UpsellToggle
                label="Strona końcowa"
                price={UPSELL_PRICES.finalPage}
                enabled={config.finalPage.enabled}
                onToggle={() =>
                  updateBookConfig(storyId, (prev) => ({
                    ...prev,
                    finalPage: {
                      ...prev.finalPage,
                      enabled: !prev.finalPage.enabled,
                    },
                  }))
                }
              >
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-blue-1000/60">
                      Krótki tytuł
                    </label>
                    <input
                      type="text"
                      value={config.finalPage.shortTitle}
                      onChange={(e) =>
                        updateBookConfig(storyId, (prev) => ({
                          ...prev,
                          finalPage: {
                            ...prev.finalPage,
                            shortTitle: e.target.value,
                          },
                        }))
                      }
                      placeholder="np. Mój najlepszy przyjaciel"
                      className="w-full rounded-lg border-0 bg-white px-3 py-2 text-sm text-blue-1000 shadow-sm outline-none ring-1 ring-grey-100 placeholder:text-placeholder focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-blue-1000/60">
                      Zdjęcie na ostatnią stronę
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        updateBookConfig(storyId, (prev) => ({
                          ...prev,
                          finalPage: {
                            ...prev.finalPage,
                            photoUploaded: true,
                            photoUrl: "/mock-final-page.svg",
                          },
                        }));
                      }}
                      className={cn(
                        "flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-sm transition-all",
                        config.finalPage.photoUploaded
                          ? "border-emerald-300 bg-emerald-50/60 text-emerald-700"
                          : "border-grey-100 bg-blue-100/50 text-blue-1000/60 hover:border-blue-400 hover:bg-blue-100",
                      )}
                    >
                      {config.finalPage.photoUploaded ? (
                        <>
                          <Check className="h-4 w-4" />
                          Zdjęcie dodane
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Dodaj zdjęcie
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </UpsellToggle>

              {/* Per-book price summary */}
              <div className="rounded-lg bg-blue-100/80 px-3 py-2 text-right text-sm text-blue-1000/60">
                Ta książka:{" "}
                <span className="font-semibold text-blue-1000">
                  {singleBookPrice(config)} zł
                </span>
              </div>
            </div>
          </StoreStepCard>
        );
      })}

      {/* Price breakdown (after all book configs) */}
      <StoreStepCard visible={showLateSteps} autoScroll={false}>
        <div className="space-y-2 rounded-xl bg-blue-100/60 px-4 py-3">
          {priceBreakdown.lines.map((line, i) => {
            const story = STORY_OPTIONS.find(
              (s) => s.id === line.storyId,
            );
            return (
              <div
                key={line.storyId || i}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-blue-1000/60">
                  {story?.coverEmoji} {story?.title ?? `Książka ${i + 1}`}
                </span>
                <span className="flex items-center gap-2">
                  {line.discount > 0 && (
                    <span className="text-xs text-blue-1000/40 line-through">
                      {line.full} zł
                    </span>
                  )}
                  <span
                    className={cn(
                      "font-medium",
                      line.discount > 0
                        ? "text-emerald-600"
                        : "text-blue-1000",
                    )}
                  >
                    {line.final} zł
                  </span>
                  {line.discount > 0 && (
                    <span className="rounded bg-emerald-100 px-1 py-0.5 text-[10px] font-semibold text-emerald-600">
                      -{Math.round(line.discount * 100)}%
                    </span>
                  )}
                </span>
              </div>
            );
          })}
          <div className="flex items-baseline justify-between border-t border-blue-200/50 pt-2">
            <span className="text-sm font-medium text-blue-1000/60">Razem</span>
            <span className="text-sm font-semibold text-blue-1000">
              {price} zł
            </span>
          </div>
          {priceBreakdown.lines.length > 1 && (
            <p className="text-[11px] text-emerald-600">
              Oszczędzasz{" "}
              {priceBreakdown.lines.reduce(
                (acc, l) => acc + (l.full - l.final),
                0,
              )}{" "}
              zł na zestawie
            </p>
          )}
        </div>
      </StoreStepCard>

      {/* Step 8: Legal Consent */}
      <StoreStepCard visible={showLateSteps} autoScroll={false}>
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

      {/* Step 9: CTA */}
      <StoreStepCard visible={showLateSteps} autoScroll={false}>
        <AppButton
          variant="primary"
          size="xl"
          shadow
          disabled={!canSubmit}
          className="group w-full gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          Dodaj do koszyka — {price} zł
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </AppButton>
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-blue-1000/40">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            Bezpieczna płatność
          </span>
          <span className="flex items-center gap-1">
            <Truck className="h-3.5 w-3.5" />
            Darmowa dostawa od 150 zł
          </span>
        </div>
      </StoreStepCard>

      {/* Mobile sticky CTA */}
      {showLateSteps && !mobilePreviewOpen && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-grey-100 bg-white/90 px-4 py-3 backdrop-blur-md lg:hidden">
          <AppButton
            variant="primary"
            size="lg"
            shadow
            disabled={!canSubmit}
            className="w-full gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            Dodaj do koszyka — {price} zł
          </AppButton>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-blue-1000/40">
            <ShieldCheck className="h-3 w-3" />
            <span>Bezpieczna płatność</span>
          </div>
        </div>
      )}
    </div>
  );
}

function GenderButton({
  emoji,
  label,
  selected,
  onSelect,
}: {
  emoji: string;
  label: string;
  value: Gender;
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

function UpsellToggle({
  label,
  price,
  enabled,
  onToggle,
  children,
}: {
  label: string;
  price: number;
  enabled: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border transition-all",
        enabled
          ? "border-blue-400 bg-white shadow-sm"
          : "border-grey-100 bg-blue-100/60",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded border transition-all",
              enabled
                ? "border-blue-400 bg-blue-400"
                : "border-grey-100 bg-white",
            )}
          >
            {enabled && <Check className="h-3 w-3 text-white" />}
          </div>
          <span className="text-sm font-medium text-blue-1000">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-blue-800">
            +{price} zł
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-blue-1000/40 transition-transform",
              enabled && "rotate-180",
            )}
          />
        </div>
      </button>
      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-grey-100 px-4 pb-4 pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
