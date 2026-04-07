"use client";

import { Camera, ImagePlus } from "lucide-react";
import { StoreStepCard } from "../StoreStepCard";

export function StorePhotoUploadStep({
  visible,
  onUploadClick,
}: {
  visible: boolean;
  onUploadClick: () => void;
}) {
  return (
    <StoreStepCard visible={visible}>
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
  );
}

export function StorePhotoUploadedBanner() {
  return (
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
  );
}
