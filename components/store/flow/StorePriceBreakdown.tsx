"use client";

import { cn } from "@/utils";
import type { StoreCatalog } from "../storeCatalog";
import { defaultStoreCatalog } from "../storeCatalog";
import { StoreStepCard } from "../StoreStepCard";
import {
  STORY_OPTIONS,
  type BookConfig,
  enabledBookAddonLabels,
} from "../useStoreState";

export function StorePriceBreakdown({
  visible,
  catalog = defaultStoreCatalog,
  bookConfigs,
  price,
  priceBreakdown,
}: {
  visible: boolean;
  catalog?: StoreCatalog;
  bookConfigs: Record<string, BookConfig>;
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
}) {
  return (
    <StoreStepCard visible={visible} autoScroll={false}>
      <div className="space-y-2 rounded-xl bg-blue-100/60 px-4 py-3">
        {priceBreakdown.lines.map((line, i) => {
          const story = STORY_OPTIONS.find((s) => s.id === line.storyId);
          const config = bookConfigs[line.storyId];
          const addonLabels =
            config != null ? enabledBookAddonLabels(config, catalog) : [];
          return (
            <div key={line.storyId || i} className="space-y-0.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-1000/60">
                  {story?.coverEmoji} {story?.title ?? `Książka ${i + 1}`}
                </span>
                <span className="flex items-center gap-2">
                  {line.discount > 0 && (
                    <span className="text-xs text-blue-1000/40 line-through">
                      {line.full} zł
                    </span>
                  )}
                  <span
                    className={cn(
                      "font-medium",
                      line.discount > 0 ? "text-emerald-600" : "text-blue-1000",
                    )}
                  >
                    {line.final} zł
                  </span>
                  {line.discount > 0 && (
                    <span className="rounded bg-emerald-100 px-1 py-0.5 text-[10px] font-semibold text-emerald-600">
                      -{Math.round(line.discount * 100)}%
                    </span>
                  )}
                </span>
              </div>
              {addonLabels.length > 0 && (
                <p className="text-blue-1000/45 pl-0.5 text-[11px] leading-snug">
                  + {addonLabels.join(" · ")}
                </p>
              )}
            </div>
          );
        })}
        <div className="flex items-baseline justify-between border-t border-blue-200/50 pt-2">
          <span className="text-sm font-medium text-blue-1000/60">Razem</span>
          <span className="text-sm font-semibold text-blue-1000">
            {price} zł
          </span>
        </div>
        {priceBreakdown.lines.length > 1 && (
          <p className="text-[11px] text-emerald-600">
            Oszczędzasz{" "}
            {priceBreakdown.lines.reduce(
              (acc, l) => acc + (l.full - l.final),
              0,
            )}{" "}
            zł na zestawie
          </p>
        )}
      </div>
    </StoreStepCard>
  );
}
