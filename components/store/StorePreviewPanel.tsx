"use client";

import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Tag } from "lucide-react";
import { useEffect } from "react";
import { BlankStoreBookMockup } from "./BlankStoreBookMockup";
import { ProcessingStatusBar } from "./ProcessingStatusBar";
import { FloatingBook } from "./FloatingBook";
import {
  buildStoreRemotionCoverUrl,
  getStoreCoverPreloadUrls,
  getStoryOption,
  type StoryOption,
} from "./storeCoverPresets";
import type { StoreCatalog } from "./storeCatalog";
import { defaultStoreCatalog } from "./storeCatalog";
import {
  type Gender,
  type ProcessingPhase,
  type StoreFormState,
  enabledBookAddonLabels,
  getBookTitle,
  singleBookPrice,
} from "./useStoreState";

/** Physical trim: 21 cm vs 30 cm — preview sizes derive from 30×30 baseline. */
const PREVIEW_CM_LARGE = 30;
const PREVIEW_CM_SMALL = 21;
const PREVIEW_RATIO_21_TO_30 = PREVIEW_CM_SMALL / PREVIEW_CM_LARGE;

const PREVIEW_PX_30_SINGLE = 260;
const PREVIEW_PX_30_STACKED = 220;

function storePreviewBookPx(
  bookSize: "21x21" | "30x30",
  stacked: boolean,
): number {
  const base30 = stacked ? PREVIEW_PX_30_STACKED : PREVIEW_PX_30_SINGLE;
  if (bookSize === "30x30") return base30;
  return Math.round(base30 * PREVIEW_RATIO_21_TO_30);
}

/** Smaller format first → drawn on top; 30×30 last → base of stack. Stable within same size. */
function storiesForStackPreview(
  selectedStories: string[],
  bookConfigs: StoreFormState["bookConfigs"],
): string[] {
  return [...selectedStories]
    .map((id, originalIndex) => ({ id, originalIndex }))
    .sort((a, b) => {
      const rank = (storyId: string) =>
        bookConfigs[storyId]?.size === "30x30" ? 1 : 0;
      const d = rank(a.id) - rank(b.id);
      return d !== 0 ? d : a.originalIndex - b.originalIndex;
    })
    .map((x) => x.id);
}

/** Horizontal bleed for 3D spine / shadows (see Book3DShell rotateY). */
const STACK_BLEED_X = 56;
const STACK_BLEED_Y = 36;

const STACK_DX_PER_BOOK = 16;
const STACK_DY_PER_BOOK = -12;

/** Keep stack inside sticky column (~400px) and mobile sheet. */
const MAX_STACK_VIEWPORT_W = 360;
const MAX_STACK_VIEWPORT_H = 440;

/**
 * Minimum box that fits all stacked covers when centers are at (W/2 + idx*dx, H/2 + idx*dy).
 */
function stackPreviewLayout(
  sortedStoryIds: string[],
  bookConfigs: StoreFormState["bookConfigs"],
): { width: number; height: number } {
  if (sortedStoryIds.length === 0) {
    return { width: 340, height: 320 };
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let idx = 0; idx < sortedStoryIds.length; idx++) {
    const storyId = sortedStoryIds[idx];
    const bookSize = bookConfigs[storyId]?.size ?? "21x21";
    const half = storePreviewBookPx(bookSize, true) / 2;
    const dx = idx * STACK_DX_PER_BOOK;
    const dy = idx * STACK_DY_PER_BOOK;
    minX = Math.min(minX, dx - half);
    maxX = Math.max(maxX, dx + half);
    minY = Math.min(minY, dy - half);
    maxY = Math.max(maxY, dy + half);
  }

  const width = Math.ceil(maxX - minX + 2 * STACK_BLEED_X);
  const height = Math.ceil(maxY - minY + 2 * STACK_BLEED_Y);

  return {
    width: Math.max(300, width),
    height: Math.max(280, height),
  };
}

interface StorePreviewPanelProps {
  catalog?: StoreCatalog;
  extraStories?: readonly StoryOption[];
  form: StoreFormState;
  processingPhase: ProcessingPhase;
  price: number;
}

function StoreBookPreview({
  storyId,
  childName,
  photoUrl,
  gender,
  isProcessing,
  isRevealed,
  stacked,
  bookSize,
  extraStories,
}: {
  storyId: string;
  childName: string;
  photoUrl: string | null;
  gender: Gender | null;
  isProcessing: boolean;
  isRevealed: boolean;
  stacked: boolean;
  bookSize: "21x21" | "30x30";
  extraStories?: readonly StoryOption[];
}) {
  const story = getStoryOption(storyId, extraStories);
  if (!story) return null;

  const coverUrl = buildStoreRemotionCoverUrl(story.remotion, {
    childName,
    photoUrl,
    gender,
    protagonistGender: story.protagonistGender,
  });

  const px = storePreviewBookPx(bookSize, stacked);

  return (
    <motion.div
      initial={{ opacity: 0, y: stacked ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={stacked ? undefined : { perspective: "1000px" }}
    >
      <div
        className={cn(
          "relative mx-auto transition-[filter,opacity] duration-700",
          isProcessing && !isRevealed && "opacity-90",
        )}
        style={{ width: px, height: px }}
      >
        <FloatingBook
          coverUrl={coverUrl}
          alt={`Okładka: ${story.title}`}
          bookBackColor={story.remotion.backgroundColor}
          spineColor={story.remotion.roundedColor}
          bookSizePx={px}
        />

        {isProcessing && !isRevealed && (
          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-r-sm"
            initial={false}
          >
            <motion.div
              className="bg-linear-to-r absolute inset-y-0 w-1/2 from-white/0 via-white/40 to-white/0"
              animate={{ x: ["-100%", "280%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        )}

        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="pointer-events-none absolute inset-0 rounded-r-sm ring-1 ring-white/25"
            style={{
              boxShadow:
                "inset 0 0 24px rgba(255,255,255,0.12), 0 0 36px rgba(255,255,255,0.06)",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

export function StorePreviewPanel({
  catalog = defaultStoreCatalog,
  extraStories,
  form,
  processingPhase,
  price,
}: StorePreviewPanelProps) {
  const extras = extraStories ?? [];
  useEffect(() => {
    const urls = getStoreCoverPreloadUrls({
      childName: "Maja",
      photoUrl: null,
    });
    const warm = () => {
      for (const url of urls) {
        const img = new Image();
        img.src = url;
      }
    };
    const idle =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(() => warm(), { timeout: 5000 })
        : null;
    const fallback = idle == null ? window.setTimeout(warm, 1) : null;
    return () => {
      if (idle != null) cancelIdleCallback(idle);
      if (fallback != null) window.clearTimeout(fallback);
    };
  }, []);

  const bookTitle = getBookTitle(form.name);
  const displayTitle = bookTitle || "Przygoda …";
  const isEmpty = !form.name.trim();
  const isProcessing = processingPhase !== "idle" && processingPhase !== "done";
  const isRevealed = processingPhase === "done";

  const primaryStory =
    form.selectedStories.length > 0 && form.selectedStories[0]
      ? (getStoryOption(form.selectedStories[0], extras) ?? null)
      : null;
  const primaryStoryId = form.selectedStories[0];
  const primaryBookSize =
    form.selectedStories.length > 0 && primaryStoryId
      ? (form.bookConfigs[primaryStoryId]?.size ?? "21x21")
      : "21x21";
  const primaryConfigForSummary =
    primaryStoryId != null ? form.bookConfigs[primaryStoryId] : undefined;
  const primarySingleBookAddons =
    primaryConfigForSummary != null
      ? enabledBookAddonLabels(primaryConfigForSummary, catalog)
      : [];

  const childName = form.name.trim() || "Maja";

  const stackSortedIds =
    form.selectedStories.length > 1
      ? storiesForStackPreview(form.selectedStories, form.bookConfigs)
      : [];
  const stackLayout =
    stackSortedIds.length > 0
      ? stackPreviewLayout(stackSortedIds, form.bookConfigs)
      : { width: 340, height: 320 };
  const stackScale =
    stackSortedIds.length > 0
      ? Math.min(
          1,
          MAX_STACK_VIEWPORT_W / stackLayout.width,
          MAX_STACK_VIEWPORT_H / stackLayout.height,
        )
      : 1;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Price tag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 shadow-sm"
      >
        <Tag className="h-3.5 w-3.5 text-blue-800" />
        <span className="text-blue-1000 text-sm font-semibold">
          {isEmpty ? (
            <>
              od <span className="text-blue-800">89 zł</span>
            </>
          ) : (
            <motion.span
              key={price}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-blue-800"
            >
              {price} zł
            </motion.span>
          )}
        </span>
      </motion.div>

      {/* Book mockup area */}
      <AnimatePresence mode="wait">
        {isEmpty ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center py-4"
          >
            <BlankStoreBookMockup
              title="Twoja osobista bajka"
              subtitle="Wpisz imię dziecka — zobaczysz podgląd okładki"
              bookSizePx={240}
            />
          </motion.div>
        ) : (
          <motion.div
            key="books"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex items-center justify-center py-4"
          >
            {form.selectedStories.length > 1 ? (
              <div
                className="relative mx-auto min-w-0 shrink-0"
                style={{
                  width: stackLayout.width * stackScale,
                  height: stackLayout.height * stackScale,
                }}
              >
                <div
                  className="absolute left-0 top-0 overflow-visible"
                  style={{
                    width: stackLayout.width,
                    height: stackLayout.height,
                    transform: `scale(${stackScale})`,
                    transformOrigin: "top left",
                  }}
                >
                  {stackSortedIds.map((storyId, idx) => {
                    const story = getStoryOption(storyId, extras);
                    if (!story) return null;
                    const bookSize = form.bookConfigs[storyId]?.size ?? "21x21";
                    const dx = idx * STACK_DX_PER_BOOK;
                    const dy = idx * STACK_DY_PER_BOOK;
                    const deg = idx * 3 - 2;
                    return (
                      <div
                        key={storyId}
                        className="absolute"
                        style={{
                          left: "50%",
                          top: "50%",
                          zIndex: 20 - idx,
                          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${deg}deg)`,
                          transformOrigin: "center center",
                        }}
                      >
                        <StoreBookPreview
                          storyId={storyId}
                          childName={childName}
                          photoUrl={form.photoUrl}
                          gender={form.gender}
                          isProcessing={isProcessing}
                          isRevealed={isRevealed}
                          stacked
                          bookSize={bookSize}
                          extraStories={extras}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : form.selectedStories[0] ? (
              <StoreBookPreview
                storyId={form.selectedStories[0]}
                childName={childName}
                photoUrl={form.photoUrl}
                gender={form.gender}
                isProcessing={isProcessing}
                isRevealed={isRevealed}
                stacked={false}
                bookSize={primaryBookSize}
                extraStories={extras}
              />
            ) : (
              <BlankStoreBookMockup
                title={displayTitle}
                subtitle="Magiczna historia o twoim dziecku"
                bookSizePx={240}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {processingPhase !== "done" && (
        <ProcessingStatusBar phase={processingPhase} />
      )}

      {/* Quick product facts */}
      {!isEmpty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-[280px]"
        >
          {form.selectedStories.length > 1 ? (
            <div className="space-y-2">
              {form.selectedStories.map((storyId) => {
                const story = getStoryOption(storyId, extras);
                const config = form.bookConfigs[storyId];
                if (!story || !config) return null;
                const size = config.size === "30x30" ? "30×30" : "21×21";
                const addons = enabledBookAddonLabels(config, catalog);
                return (
                  <div
                    key={storyId}
                    className="text-blue-1000/60 rounded-lg bg-blue-100 px-3 py-2 text-[11px]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-blue-1000/80 flex min-w-0 items-center gap-1.5 font-medium">
                        <span>{story.coverEmoji}</span>
                        <span className="truncate">{story.title}</span>
                      </span>
                      <span className="shrink-0">
                        {size} · {singleBookPrice(config, catalog)} zł
                      </span>
                    </div>
                    {addons.length > 0 && (
                      <p className="text-blue-1000/45 mt-1 text-[10px] leading-snug">
                        + {addons.join(" · ")}
                      </p>
                    )}
                  </div>
                );
              })}
              <div className="text-blue-1000/40 grid grid-cols-2 gap-2 text-center text-[11px]">
                <div className="rounded-lg bg-blue-100 px-2 py-1.5">
                  24 strony
                </div>
                <div className="rounded-lg bg-blue-100 px-2 py-1.5">
                  Druk premium
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-blue-1000/40 grid grid-cols-2 gap-2 text-center text-[11px]">
                <div className="rounded-lg bg-blue-100 px-2 py-1.5">
                  {primaryBookSize === "30x30" ? "30×30 cm" : "21×21 cm"}
                </div>
                <div className="rounded-lg bg-blue-100 px-2 py-1.5">
                  24 strony
                </div>
                <div className="rounded-lg bg-blue-100 px-2 py-1.5">
                  Druk premium
                </div>
                <div className="rounded-lg bg-blue-100 px-2 py-1.5">
                  Miękka okładka
                </div>
              </div>
              {primarySingleBookAddons.length > 0 && (
                <p className="text-blue-1000/45 text-center text-[10px] leading-snug">
                  + {primarySingleBookAddons.join(" · ")}
                </p>
              )}
            </div>
          )}
          {primaryStory && form.selectedStories.length === 1 && (
            <p className="text-blue-1000/45 mt-2 text-center text-[11px] leading-snug">
              Podgląd okładki:{" "}
              <span className="text-blue-1000/65 font-medium">
                {displayTitle}
              </span>
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
