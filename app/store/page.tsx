"use client";

import { Navbar } from "@/components/layout";
import { StoreFlow } from "@/components/store/StoreFlow";
import { StorePreviewPanel } from "@/components/store/StorePreviewPanel";
import { useStoreState } from "@/components/store/useStoreState";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ChevronUp } from "lucide-react";

export default function StorePage() {
  const state = useStoreState();
  const { form, mobilePreviewOpen, setMobilePreviewOpen } = state;

  const hasPreviewContent = form.name.trim().length > 0;

  return (
    <main className="min-h-screen bg-blue-800 bg-hero">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 pt-6 pb-8 sm:px-6 lg:px-8 lg:pt-10 lg:pb-12">
        {/* Header -- sits above the white card, on the teal background */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center lg:mb-8 lg:text-left"
        >
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Stwórz swoją książkę
          </h1>
          <p className="mt-2 text-base text-white/70">
            Spersonalizowana historia z wyjątkowymi ilustracjami
          </p>
        </motion.div>

        {/* White surface card so content is readable over the noisy bg-hero */}
        <div className="rounded-[32px] bg-white px-5 py-8 shadow-[0_18px_60px_rgba(15,23,42,0.14)] sm:rounded-[40px] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
            {/* LEFT: Flow */}
            <div className="order-2 lg:order-1">
              <StoreFlow
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
                handlePhotoUpload={state.handlePhotoUpload}
                mobilePreviewOpen={mobilePreviewOpen}
              />
            </div>

            {/* RIGHT: Sticky preview (desktop) */}
            <div className="order-1 hidden lg:order-2 lg:block">
              <div className="sticky top-24">
                <StorePreviewPanel
                  form={state.form}
                  processingPhase={state.processingPhase}
                  price={state.price}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Sticky preview toggle */}
      <div className="lg:hidden">
        {hasPreviewContent && !mobilePreviewOpen && (
          <button
            onClick={() => setMobilePreviewOpen(true)}
            className="fixed bottom-20 right-4 z-30 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium text-blue-1000 shadow-lg backdrop-blur-md transition-all"
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
              className="fixed inset-x-0 bottom-0 z-40 max-h-[60vh] overflow-y-auto rounded-t-3xl border-t border-grey-100 bg-white/95 shadow-2xl backdrop-blur-md"
            >
              <button
                onClick={() => setMobilePreviewOpen(false)}
                className="sticky top-0 z-10 flex w-full flex-col items-center bg-white/95 pb-2 pt-3 backdrop-blur-md"
              >
                <div className="mb-2 h-1 w-10 rounded-full bg-grey-100" />
                <div className="flex items-center gap-1.5 text-xs font-medium text-blue-1000/60">
                  <ChevronUp className="h-3.5 w-3.5 rotate-180" />
                  Zamknij podgląd
                </div>
              </button>
              <div className="px-6 pb-6">
                <StorePreviewPanel
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
