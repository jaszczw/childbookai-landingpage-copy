import { Check } from "lucide-react";

import { cn } from "@/utils";
import { getDisplayedTiers, tierLabel } from "@/lib/marketplace/format";
import type { MarketplaceTier } from "@/lib/marketplace/types";

type TierSummaryProps = {
  availableTiers?: MarketplaceTier[] | null;
};

const TIER_BULLETS: Record<MarketplaceTier, string[]> = {
  personalized: [
    "Name and avatar personalization",
    "Consistent character across pages",
    "Best for testing a new story",
  ],
  creative: [
    "Multiple illustration variants per spread",
    "Quick swap and review tooling",
    "Great quality-to-speed ratio",
  ],
  studio: [
    "Full Canva-style editor access",
    "Custom layouts and brand-ready",
    "Complete control of the resulting book",
  ],
};

export function TierSummary({ availableTiers }: TierSummaryProps) {
  const tiers = getDisplayedTiers(availableTiers);
  if (tiers.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {tiers.map((tier, index) => (
        <div
          key={tier}
          className={cn(
            "rounded-2xl border-2 p-4",
            index === tiers.length - 1
              ? "border-blue-800 bg-blue-100/60"
              : "border-blue-1000/10 bg-white",
          )}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-1000">
              {tierLabel(tier)}
            </h4>
            {index === tiers.length - 1 ? (
              <span className="rounded-full bg-blue-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Top tier
              </span>
            ) : null}
          </div>
          <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-blue-1000/75">
            {TIER_BULLETS[tier].map((bullet) => (
              <li key={bullet} className="flex items-start gap-1.5">
                <Check
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-800"
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
