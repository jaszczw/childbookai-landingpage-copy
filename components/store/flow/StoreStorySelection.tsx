"use client";

import { cn } from "@/utils";
import { AppButton } from "@/ui/app-button";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Check, ChevronDown, ChevronRight, Percent } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import {
  getStoryOption,
  getVisibleStoryOptions,
  pickCoverIllustrationVariant,
  type StoryOption,
} from "../storeCoverPresets";
import { StoreStepCard } from "../StoreStepCard";
import type { StoreCatalog } from "../storeCatalog";
import { getBookDiscount } from "../useStoreState";
import type { StoreFormState } from "../useStoreState";

export function StoreStorySelection({
  catalog,
  extraStories,
  form,
  priceBreakdown,
  toggleStory,
  onConfirmSelection,
  storiesSectionExpanded,
  onToggleStoriesSection,
}: {
  catalog: StoreCatalog;
  extraStories?: readonly StoryOption[];
  form: StoreFormState;
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
  toggleStory: (id: string) => void;
  onConfirmSelection: () => void;
  storiesSectionExpanded: boolean;
  onToggleStoriesSection: () => void;
}) {
  const extras = useMemo(
    () => (extraStories ? [...extraStories] : []),
    [extraStories],
  );
  const visibleStories = useMemo(
    () => getVisibleStoryOptions(form.gender, extras),
    [form.gender, extras],
  );

  const selectedStoryTitles = useMemo(
    () =>
      form.selectedStories
        .map((id) => getStoryOption(id, extras)?.title)
        .filter((t): t is string => Boolean(t)),
    [form.selectedStories, extras],
  );

  const showStoryPickerBody =
    !form.storySelectionConfirmed || storiesSectionExpanded;

  return (
    <StoreStepCard visible={form.photoUploaded} autoScroll={false}>
      {form.storySelectionConfirmed &&
        form.selectedStories.length >= 1 && (
          <button
            type="button"
            onClick={onToggleStoriesSection}
            className="mb-4 flex w-full items-center justify-between rounded-xl bg-blue-100/60 px-4 py-3 text-left transition-colors hover:bg-blue-100"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 text-sm">
              <BookOpen className="h-4 w-4 shrink-0 text-blue-1000/50" />
              <div className="min-w-0">
                <span className="font-semibold text-blue-1000">
                  Wybór historii
                </span>
                <p className="truncate text-blue-1000/60 text-xs">
                  {selectedStoryTitles.join(" · ")}
                </p>
              </div>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-blue-1000/40 transition-transform",
                storiesSectionExpanded && "rotate-180",
              )}
            />
          </button>
        )}

      {showStoryPickerBody && (
        <>
          {!form.storySelectionConfirmed && (
            <div className="mb-4">
              <label className="text-blue-1000 block text-xl font-semibold">
                Wybierz historię
              </label>
              <p className="text-blue-1000/40 mt-1 text-sm">
                Możesz wybrać kilka — im więcej, tym taniej
              </p>
            </div>
          )}

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
                      {Math.round(getBookDiscount(1, catalog) * 100)}%
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
                    {getBookDiscount(form.selectedStories.length, catalog) >
                      0 &&
                      form.selectedStories.length < visibleStories.length && (
                        <>
                          . Kolejna z{" "}
                          <span className="font-bold">
                            {Math.round(
                              getBookDiscount(
                                form.selectedStories.length,
                                catalog,
                              ) * 100,
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {visibleStories.map((story) => {
          const selected = form.selectedStories.includes(story.id);
          const positionInSelection = form.selectedStories.indexOf(story.id);
          const discount =
            positionInSelection >= 0
              ? getBookDiscount(positionInSelection, catalog)
              : null;

          const nextSlot = form.selectedStories.length;
          const potentialDiscount = !selected
            ? getBookDiscount(nextSlot, catalog)
            : null;

          const coverVariant = pickCoverIllustrationVariant(
            story.remotion,
            story.protagonistGender,
            form.gender,
          );
          const coverImg = coverVariant?.illustrationImage;

          return (
            <motion.button
              key={story.id}
              onClick={() => toggleStory(story.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "relative overflow-hidden rounded-xl text-left transition-all",
                selected
                  ? "bg-white shadow-lg ring-2 ring-blue-400"
                  : "bg-blue-100/50 shadow-sm hover:bg-white hover:shadow-md",
              )}
            >
              <div
                className={cn(
                  "relative aspect-square w-full overflow-hidden bg-blue-100/80",
                  !coverImg &&
                    "flex flex-col items-center justify-center gap-2 px-4",
                )}
              >
                {coverImg ? (
                  <>
                    <Image
                      src={coverImg}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 45vw, 220px"
                      className="object-cover object-center"
                      style={
                        coverVariant?.illustrationTopOffset != null
                          ? {
                              objectPosition: `center calc(50% + ${coverVariant.illustrationTopOffset * 0.08}px)`,
                            }
                          : undefined
                      }
                    />
                    <div
                      className="bg-linear-to-t pointer-events-none absolute inset-0 from-black/35 via-black/5 to-transparent"
                      aria-hidden
                    />
                    <span
                      className="absolute bottom-2 left-3 text-2xl drop-shadow-md"
                      aria-hidden
                    >
                      {story.coverEmoji}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">{story.coverEmoji}</span>
                    <div
                      className={cn(
                        "bg-linear-to-r h-2 w-10 rounded-full",
                        story.coverGradient,
                      )}
                    />
                  </>
                )}
              </div>
              <div className="p-4 pt-3">
                <h4 className="text-blue-1000 mb-1 font-semibold">
                  {story.title}
                </h4>
                <p className="text-blue-1000/60 text-xs">{story.description}</p>

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
                      <Percent className="h-3 w-3" />-
                      {Math.round(potentialDiscount * 100)}% rabatu
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
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {form.selectedStories.length >= 1 && !form.storySelectionConfirmed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6"
          >
            <AppButton
              type="button"
              variant="primary"
              size="xl"
              shadow
              className="group w-full gap-2"
              onClick={onConfirmSelection}
            >
              Dalej — skonfiguruj książki
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </AppButton>
            <p className="text-blue-1000/45 mt-2 text-center text-xs">
              Najpierw dokończ wybór historii, potem ustawienia każdej książki
              poniżej.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {form.storySelectionConfirmed && form.selectedStories.length >= 1 && (
        <p className="text-blue-1000/45 mt-4 text-center text-xs">
          Możesz zmienić wybór historii tutaj — ustawienia książek zaktualizują się
          automatycznie.
        </p>
      )}
        </>
      )}
    </StoreStepCard>
  );
}
