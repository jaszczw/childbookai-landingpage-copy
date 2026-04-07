"use client";

import { Package, Percent, Star, Truck } from "lucide-react";
import { StoreStepCard } from "../StoreStepCard";

export function StoreTrustBadges() {
  return (
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
  );
}
