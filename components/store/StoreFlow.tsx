"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StoreCatalog } from "./storeCatalog";
import { defaultStoreCatalog } from "./storeCatalog";
import { StoreBookConfigCard } from "./flow/StoreBookConfigCard";
import { StoreCheckoutSection } from "./flow/StoreCheckoutSection";
import { StoreConsentStep } from "./flow/StoreConsentStep";
import { StoreEarlyStepsSummary } from "./flow/StoreEarlyStepsSummary";
import { StoreEyeColorStep } from "./flow/StoreEyeColorStep";
import { StoreFlowProgress } from "./flow/StoreFlowProgress";
import { StoreGenderStep } from "./flow/StoreGenderStep";
import { StoreNameStep } from "./flow/StoreNameStep";
import {
  StorePhotoUploadStep,
  StorePhotoUploadedBanner,
} from "./flow/StorePhotoStep";
import { StorePriceBreakdown } from "./flow/StorePriceBreakdown";
import { StoreStorySelection } from "./flow/StoreStorySelection";
import { StoreTrustBadges } from "./flow/StoreTrustBadges";
import { STORY_OPTIONS } from "./useStoreState";
import type { BookConfig, StoreFormState } from "./useStoreState";

export interface StoreFlowProps {
  catalog?: StoreCatalog;
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
  confirmStorySelection: () => void;
  handlePhotoUpload: () => void;
  mobilePreviewOpen?: boolean;
}

export function StoreFlow({
  catalog = defaultStoreCatalog,
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
  confirmStorySelection,
  handlePhotoUpload,
  mobilePreviewOpen,
}: StoreFlowProps) {
  const onUploadClick = useCallback(() => {
    handlePhotoUpload();
  }, [handlePhotoUpload]);

  const [earlyStepsExpanded, setEarlyStepsExpanded] = useState(false);
  const [storiesSectionExpanded, setStoriesSectionExpanded] = useState(true);
  const bookConfigSectionTopRef = useRef<HTMLDivElement>(null);

  const handleConfirmStorySelection = useCallback(() => {
    confirmStorySelection();
    setEarlyStepsExpanded(false);
    setStoriesSectionExpanded(false);
  }, [confirmStorySelection]);
  const prevStorySelectionConfirmed = useRef(form.storySelectionConfirmed);

  const showLateSteps =
    form.photoUploaded &&
    form.selectedStories.length > 0 &&
    form.storySelectionConfirmed;

  useEffect(() => {
    const justConfirmed =
      form.storySelectionConfirmed && !prevStorySelectionConfirmed.current;
    prevStorySelectionConfirmed.current = form.storySelectionConfirmed;

    if (!justConfirmed) return;

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bookConfigSectionTopRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
    return () => cancelAnimationFrame(id);
  }, [form.storySelectionConfirmed]);

  const collapseEarlySteps = form.photoUploaded && !earlyStepsExpanded;

  return (
    <div className="flex flex-col pb-20 lg:pb-0">
      <StoreFlowProgress currentStep={currentStep} totalSteps={totalSteps} />

      <StoreTrustBadges />

      <StoreEarlyStepsSummary
        form={form}
        earlyStepsExpanded={earlyStepsExpanded}
        onToggleExpanded={() => setEarlyStepsExpanded((v) => !v)}
      />

      <StoreNameStep
        visible={!collapseEarlySteps}
        form={form}
        setName={setName}
      />

      <StoreGenderStep
        visible={!collapseEarlySteps && currentStep >= 2}
        form={form}
        updateForm={updateForm}
      />

      <StoreEyeColorStep
        visible={!collapseEarlySteps && currentStep >= 3}
        form={form}
        updateForm={updateForm}
      />

      <StorePhotoUploadStep
        visible={!collapseEarlySteps && currentStep >= 4 && !form.photoUploaded}
        onUploadClick={onUploadClick}
      />

      {form.photoUploaded && earlyStepsExpanded && <StorePhotoUploadedBanner />}

      {/* <StoreAppearanceStep
        visible={form.photoUploaded}
        form={form}
        updateForm={updateForm}
      /> */}

      <StoreStorySelection
        catalog={catalog}
        form={form}
        priceBreakdown={priceBreakdown}
        toggleStory={toggleStory}
        onConfirmSelection={handleConfirmStorySelection}
        storiesSectionExpanded={storiesSectionExpanded}
        onToggleStoriesSection={() =>
          setStoriesSectionExpanded((v) => !v)
        }
      />

      <div
        ref={bookConfigSectionTopRef}
        className="scroll-mt-28 h-px w-full shrink-0"
        aria-hidden
      />

      {form.selectedStories.map((storyId, idx) => {
        const story = STORY_OPTIONS.find((s) => s.id === storyId);
        if (!story) return null;
        const config = form.bookConfigs[storyId];
        if (!config) return null;

        return (
          <StoreBookConfigCard
            key={storyId}
            catalog={catalog}
            story={story}
            storyId={storyId}
            bookIndex={idx}
            totalBooks={form.selectedStories.length}
            config={config}
            formGender={form.gender}
            visible={showLateSteps}
            updateBookConfig={updateBookConfig}
          />
        );
      })}

      <StorePriceBreakdown
        visible={showLateSteps}
        catalog={catalog}
        bookConfigs={form.bookConfigs}
        price={price}
        priceBreakdown={priceBreakdown}
      />

      <StoreConsentStep
        visible={showLateSteps}
        form={form}
        updateForm={updateForm}
      />

      <StoreCheckoutSection
        visible={showLateSteps}
        canSubmit={canSubmit}
        price={price}
        mobilePreviewOpen={mobilePreviewOpen}
      />
    </div>
  );
}
