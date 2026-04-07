"use client";

import { motion } from "framer-motion";
import { Book3DShell } from "./Book3DShell";

const PLACEHOLDER_BACK = "#3d4f6a";
const PLACEHOLDER_SPINE = "#243044";

export interface BlankStoreBookMockupProps {
  title: string;
  subtitle?: string;
  bookSizePx?: number;
}

/**
 * Placeholder 3D book before a theme is chosen: blurred illustration + title only.
 */
export function BlankStoreBookMockup({
  title,
  subtitle,
  bookSizePx = 240,
}: BlankStoreBookMockupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      <div
        className="mx-auto"
        style={{ width: bookSizePx, height: bookSizePx }}
      >
        <Book3DShell
          bookBackColor={PLACEHOLDER_BACK}
          spineColor={PLACEHOLDER_SPINE}
          bookSizePx={bookSizePx}
        >
          <div className="absolute inset-0 overflow-hidden rounded-r-sm shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element -- local SVG, blur as design */}
            <img
              src="/images/book-illustration.svg"
              alt=""
              className="absolute -left-[18%] -top-[18%] h-[136%] w-[136%] max-w-none object-cover opacity-75 blur-[26px]"
            />
            <div
              className="absolute inset-0 bg-linear-to-br from-slate-900/55 via-indigo-950/48 to-amber-950/42"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_18%,rgba(255,255,255,0.2),transparent_52%)]"
              aria-hidden
            />
          </div>
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 px-5 text-center">
            <h3 className="text-balance text-lg font-bold leading-snug tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]">
              {title}
            </h3>
            {subtitle ? (
              <p className="text-pretty text-xs font-medium leading-snug text-white/88 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
                {subtitle}
              </p>
            ) : null}
          </div>
        </Book3DShell>
      </div>
    </motion.div>
  );
}
