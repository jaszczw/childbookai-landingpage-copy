"use client";

import { useState } from "react";
import { cn } from "@/utils";

type Spread = { page: number; img: string; text?: string };

type PreviewGalleryProps = {
  spreads: Spread[];
  title: string;
};

export function PreviewGallery({ spreads, title }: PreviewGalleryProps) {
  const [active, setActive] = useState(0);
  if (spreads.length === 0) return null;

  const current = spreads[active] ?? spreads[0];
  if (!current) return null;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border-2 border-blue-1000/10 bg-blue-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.page}
          src={current.img}
          alt={`${title} - page ${current.page} preview`}
          className="aspect-[2/1] w-full bg-blue-100 object-contain"
        />
      </div>
      {spreads.length > 1 ? (
        <div className="-mx-1 flex flex-nowrap gap-2 overflow-x-auto pb-2">
          {spreads.map((spread, index) => (
            <button
              key={spread.page}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show page ${spread.page} preview`}
              aria-pressed={active === index}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-150",
                active === index
                  ? "border-blue-800 shadow-[0_3px_0_var(--blue-800)]"
                  : "border-blue-1000/10 hover:border-blue-1000/30",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={spread.img}
                alt=""
                className="aspect-[2/1] w-28 object-cover sm:w-36"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
