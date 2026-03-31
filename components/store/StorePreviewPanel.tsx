"use client";

import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Sparkles, Tag } from "lucide-react";
import Image from "next/image";
import { ProcessingStatusBar } from "./ProcessingStatusBar";
import {
  STORY_OPTIONS,
  type ProcessingPhase,
  type StoreFormState,
  getBookTitle,
  singleBookPrice,
} from "./useStoreState";

interface StorePreviewPanelProps {
  form: StoreFormState;
  processingPhase: ProcessingPhase;
  price: number;
}

function SquareBookMockup({
  title,
  gradient,
  emoji,
  isProcessing,
  isRevealed,
  stacked,
  stackIndex,
  bookSize,
}: {
  title: string;
  gradient: string;
  emoji: string;
  isProcessing: boolean;
  isRevealed: boolean;
  stacked: boolean;
  stackIndex: number;
  bookSize: "21x21" | "30x30";
}) {
  const size = bookSize === "30x30" ? 280 : 240;
  const spineW = 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: stacked ? stackIndex * 2.5 - 2 : 0,
        x: stacked ? stackIndex * 8 : 0,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{
        width: size,
        height: size,
        zIndex: 10 - stackIndex,
        perspective: "800px",
      }}
    >
      <div
        className="group relative h-full w-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isRevealed
            ? "rotateY(-8deg) scale(1.03)"
            : "rotateY(-5deg)",
        }}
      >
        {/* Spine */}
        <div
          className="absolute inset-y-0 left-0 bg-linear-to-b from-blue-800 to-blue-1000"
          style={{
            width: spineW,
            transform: `translateZ(${spineW / 2}px) rotateY(-90deg)`,
            transformOrigin: "left center",
            borderRadius: "1px 0 0 1px",
          }}
        />

        {/* Front cover */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden rounded-lg bg-linear-to-br",
            gradient,
          )}
          style={{
            transform: `translateZ(${spineW / 2}px)`,
            boxShadow: "4px 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-6"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, transparent 100%)",
            }}
          />

          {isProcessing && (
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-white/0 via-white/35 to-white/0"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )}

          <div
            className={cn(
              "relative flex h-full flex-col items-center justify-center p-6 transition-all duration-700",
              isProcessing && !isRevealed ? "blur-[3px]" : "blur-0",
            )}
          >
            <span className="mb-4 text-5xl">{emoji}</span>

            <AnimatePresence mode="wait">
              <motion.h3
                key={title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-center text-3xl font-bold leading-tight text-white drop-shadow-lg"
              >
                {title}
              </motion.h3>
            </AnimatePresence>

            <div className="mx-auto mt-3 h-px w-16 bg-white/40" />

            <p className="mt-2 text-xs text-white/60">childbook.ai</p>
          </div>

          {isRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute inset-0 rounded-lg ring-2 ring-white/20"
              style={{
                boxShadow:
                  "inset 0 0 30px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.08)",
              }}
            />
          )}
        </div>

        {/* Back cover */}
        <div
          className="absolute inset-0 rounded bg-grey-100"
          style={{
            transform: `translateZ(-${spineW / 2}px)`,
          }}
        />

        {/* Bottom page edges */}
        <div
          className="absolute bottom-0 left-1"
          style={{
            width: "calc(100% - 4px)",
            height: spineW,
            background:
              "repeating-linear-gradient(90deg, #f5f5f4 0px, #f5f5f4 1px, #e7e5e4 1px, #e7e5e4 2px)",
            transform: `translateY(${spineW / 2}px) rotateX(90deg)`,
            transformOrigin: "top center",
          }}
        />
      </div>
    </motion.div>
  );
}

export function StorePreviewPanel({
  form,
  processingPhase,
  price,
}: StorePreviewPanelProps) {
  const bookTitle = getBookTitle(form.name, form.gender);
  const displayTitle = bookTitle || "Przygoda ...";
  const isEmpty = !form.name.trim();
  const isProcessing =
    processingPhase !== "idle" && processingPhase !== "done";
  const isRevealed = processingPhase === "done";

  const primaryStory =
    form.selectedStories.length > 0
      ? STORY_OPTIONS.find((s) => s.id === form.selectedStories[0])
      : null;
  const primaryGradient =
    primaryStory?.coverGradient ?? "from-blue-400 to-blue-800";
  const primaryEmoji = primaryStory?.coverEmoji ?? "📖";

  const primaryBookSize =
    form.selectedStories.length > 0 && form.selectedStories[0]
      ? (form.bookConfigs[form.selectedStories[0]]?.size ?? "21x21")
      : "21x21";

  const showHeroIllustration =
    isRevealed && form.gender && form.selectedStories.length > 0;
  const heroImage =
    form.gender === "girl" ? "/img/preview-girl.svg" : "/img/preview-boy.svg";

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Price tag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 shadow-sm"
      >
        <Tag className="h-3.5 w-3.5 text-blue-800" />
        <span className="text-sm font-semibold text-blue-1000">
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
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-grey-100 bg-blue-100/40"
            style={{ width: 240, height: 240 }}
          >
            <BookOpen className="mb-3 h-10 w-10 text-grey-100" />
            <p className="px-4 text-center text-sm text-blue-1000/40">
              Twoja książka pojawi się tutaj
            </p>
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
              <div className="relative" style={{ width: 300, height: 300 }}>
                {form.selectedStories.map((storyId, idx) => {
                  const story = STORY_OPTIONS.find((s) => s.id === storyId);
                  if (!story) return null;
                  const title =
                    idx === 0 ? displayTitle : story.title;
                  const bookSize =
                    form.bookConfigs[storyId]?.size ?? "21x21";
                  return (
                    <div
                      key={storyId}
                      className="absolute left-0 top-0"
                      style={{
                        transform: `translate(${idx * 12}px, ${idx * -6}px)`,
                      }}
                    >
                      <SquareBookMockup
                        title={title}
                        gradient={story.coverGradient}
                        emoji={story.coverEmoji}
                        isProcessing={isProcessing}
                        isRevealed={isRevealed}
                        stacked
                        stackIndex={idx}
                        bookSize={bookSize}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <SquareBookMockup
                title={displayTitle}
                gradient={primaryGradient}
                emoji={primaryEmoji}
                isProcessing={isProcessing}
                isRevealed={isRevealed}
                stacked={false}
                stackIndex={0}
                bookSize={primaryBookSize}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing status – hidden once illustration is revealed */}
      {processingPhase !== "done" && (
        <ProcessingStatusBar phase={processingPhase} />
      )}

      {/* Hero illustration reveal */}
      <AnimatePresence>
        {showHeroIllustration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[280px] overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-grey-100"
          >
            <div className="relative aspect-square w-full bg-linear-to-br from-blue-100 to-blue-200">
              <Image
                src={heroImage}
                alt="Przykładowa ilustracja"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center justify-center gap-1.5 px-3 py-2.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-medium text-blue-1000/60">
                Przykładowa ilustracja
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                const story = STORY_OPTIONS.find((s) => s.id === storyId);
                const config = form.bookConfigs[storyId];
                if (!story || !config) return null;
                const size =
                  config.size === "30x30" ? "30×30" : "21×21";
                return (
                  <div
                    key={storyId}
                    className="flex items-center justify-between rounded-lg bg-blue-100 px-3 py-2 text-[11px] text-blue-1000/60"
                  >
                    <span className="flex items-center gap-1.5 font-medium text-blue-1000/80">
                      <span>{story.coverEmoji}</span>
                      {story.title}
                    </span>
                    <span>{size} · {singleBookPrice(config)} zł</span>
                  </div>
                );
              })}
              <div className="grid grid-cols-2 gap-2 text-center text-[11px] text-blue-1000/40">
                <div className="rounded-lg bg-blue-100 px-2 py-1.5">
                  24 strony
                </div>
                <div className="rounded-lg bg-blue-100 px-2 py-1.5">
                  Druk premium
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 text-center text-[11px] text-blue-1000/40">
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
          )}
        </motion.div>
      )}
    </div>
  );
}
