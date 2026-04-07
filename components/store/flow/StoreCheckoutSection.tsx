"use client";

import { AppButton } from "@/ui/app-button";
import { ChevronRight, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { StoreStepCard } from "../StoreStepCard";

export function StoreCheckoutSection({
  visible,
  canSubmit,
  price,
  mobilePreviewOpen,
}: {
  visible: boolean;
  canSubmit: boolean;
  price: number;
  mobilePreviewOpen?: boolean;
}) {
  return (
    <>
      <StoreStepCard visible={visible} autoScroll={false}>
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

      {visible && !mobilePreviewOpen && (
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
    </>
  );
}
