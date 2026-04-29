"use client";

import { Navbar } from "@/components/layout";
import { StoreFlow } from "@/components/store/StoreFlow";
import { StorePreviewPanel } from "@/components/store/StorePreviewPanel";
import { useStoreState } from "@/components/store/useStoreState";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronUp } from "lucide-react";

import type { StoryOption } from "./storeCoverPresets";

export interface StoreViewProps {
  preselect?: StoryOption | null;
}

export function StoreView({ preselect = null }: StoreViewProps) {
  const state = useStoreState({ preselect });
  const { form, mobilePreviewOpen, setMobilePreviewOpen } = state;

  const hasPreviewContent = form.name.trim().length > 0;

  return (
    <main className="bg-hero min-h-screen bg-blue-800">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pb-12 lg:pt-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center lg:mb-8 lg:text-left"
        >
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Stwórz swoją książkę
          </h1>
          <p className="mt-2 text-base text-white/70">
            {preselect
              ? `Personalizujesz: ${preselect.title}. Dodaj kolejne historie i zaoszczędź.`
              : "Spersonalizowana historia z wyjątkowymi ilustracjami"}
          </p>
        </motion.div>

        <div className="rounded-[32px] bg-white px-5 py-8 shadow-[0_18px_60px_rgba(15,23,42,0.14)] sm:rounded-[40px] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
            <div className="order-2 lg:order-1">
              <StoreFlow
                catalog={state.catalog}
                extraStories={state.extraStories}
                form={state.form}
                currentStep={state.currentStep}
                totalSteps={state.totalSteps}
                canSubmit={state.canSubmit}
                price={state.price}
                priceBreakdown={state.priceBreakdown}
                setName={state.setName}
                updateForm={state.updateForm}
                updateBookConfig={state.updateBookConfig}
                toggleStory={state.toggleStory}
                confirmStorySelection={state.confirmStorySelection}
                handlePhotoUpload={state.handlePhotoUpload}
                mobilePreviewOpen={mobilePreviewOpen}
              />
            </div>

            <div className="order-1 hidden lg:order-2 lg:block">
              <div className="sticky top-4">
                <StorePreviewPanel
                  catalog={state.catalog}
                  extraStories={state.extraStories}
                  form={state.form}
                  processingPhase={state.processingPhase}
                  price={state.price}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        {hasPreviewContent && !mobilePreviewOpen && (
          <button
            onClick={() => setMobilePreviewOpen(true)}
            className="text-blue-1000 fixed bottom-20 right-4 z-30 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur-md transition-all"
          >
            <BookOpen className="h-4 w-4" />
            Podgląd
            <ChevronUp className="h-4 w-4" />
          </button>
        )}

        <AnimatePresence>
          {mobilePreviewOpen && hasPreviewContent && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="border-grey-100 fixed inset-x-0 bottom-0 z-40 max-h-[60vh] overflow-y-auto rounded-t-3xl border-t bg-white/95 shadow-2xl backdrop-blur-md"
            >
              <button
                onClick={() => setMobilePreviewOpen(false)}
                className="sticky top-0 z-10 flex w-full flex-col items-center bg-white/95 pb-2 pt-3 backdrop-blur-md"
              >
                <div className="bg-grey-100 mb-2 h-1 w-10 rounded-full" />
                <div className="text-blue-1000/60 flex items-center gap-1.5 text-xs font-medium">
                  <ChevronUp className="h-3.5 w-3.5 rotate-180" />
                  Zamknij podgląd
                </div>
              </button>
              <div className="px-6 pb-6">
                <StorePreviewPanel
                  catalog={state.catalog}
                  extraStories={state.extraStories}
                  form={state.form}
                  processingPhase={state.processingPhase}
                  price={state.price}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
