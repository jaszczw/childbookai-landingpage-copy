"use client";

import { cn } from "@/utils";
import type React from "react";

export interface Book3DShellProps {
  children: React.ReactNode;
  bookBackColor: string;
  spineColor: string;
  bookSizePx?: number;
  className?: string;
}

/**
 * Shared 3D book frame (pages, spine, back). Front face = `children` (cover image or blank art).
 */
export function Book3DShell({
  children,
  bookBackColor,
  spineColor,
  bookSizePx = 240,
  className = "",
}: Book3DShellProps) {
  const safeBack = bookBackColor || "#2a2a2a";
  const safeSpine = spineColor || "#1a1a1a";
  const sizePx = `${bookSizePx}px`;

  return (
    <div
      className={cn("store-book3d-root", className)}
      style={
        {
          "--book-hover-deg": "-10deg",
          "--book-open-deg": "-32deg",
          "--book-back": safeBack,
          "--book-spine": safeSpine,
          perspective: `${bookSizePx * 3}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="store-book3d-book relative"
        style={
          {
            "--book-size": sizePx,
            width: bookSizePx,
            height: bookSizePx,
          } as React.CSSProperties
        }
      >
        <div className="relative">
          {children}
          <div className="book-cover pointer-events-none absolute inset-0 z-10 h-full w-full bg-transparent" />
        </div>
      </div>

      <style jsx global>{`
        .store-book3d-root {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes storeBookIntro {
          from {
            transform: rotateY(var(--book-hover-deg));
          }
          to {
            transform: rotateY(var(--book-open-deg));
          }
        }

        .store-book3d-root .store-book3d-book {
          position: relative;
          flex-shrink: 0;
          transform-style: preserve-3d;
          transform: rotateY(var(--book-open-deg));
          transition: transform 1s ease;
          animation: storeBookIntro 1s ease 0s 1 both;
        }

        .store-book3d-root:hover .store-book3d-book,
        .store-book3d-root:focus-within .store-book3d-book {
          transform: rotateY(var(--book-hover-deg));
        }

        .store-book3d-root .store-book3d-book > :first-child {
          position: absolute;
          top: 0;
          left: 0;
          width: var(--book-size, 240px);
          height: var(--book-size, 240px);
          transform: translateZ(15px);
          background-color: var(--book-back);
          border-radius: 0 2px 2px 0;
          box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);
        }

        .store-book3d-root .store-book3d-book::before {
          position: absolute;
          content: " ";
          left: 0;
          top: 1px;
          width: 28px;
          height: calc(var(--book-size) * 0.99);
          transform: translateX(calc(var(--book-size) - 16px)) rotateY(90deg);
          background: linear-gradient(
            90deg,
            #fff 0%,
            #f9f9f9 5%,
            #fff 10%,
            #f9f9f9 15%,
            #fff 20%,
            #f9f9f9 25%,
            #fff 30%,
            #f9f9f9 35%,
            #fff 40%,
            #f9f9f9 45%,
            #fff 50%,
            #f9f9f9 55%,
            #fff 60%,
            #f9f9f9 65%,
            #fff 70%,
            #f9f9f9 75%,
            #fff 80%,
            #f9f9f9 85%,
            #fff 90%,
            #f9f9f9 95%,
            #fff 100%
          );
          box-shadow: inset -2px 0 6px rgba(0, 0, 0, 0.12);
        }

        .store-book3d-root .store-book3d-book::after {
          position: absolute;
          top: 0;
          left: 0;
          content: " ";
          width: var(--book-size, 240px);
          height: var(--book-size, 240px);
          transform: translateZ(-15px);
          background-color: var(--book-spine);
          border-radius: 0 2px 2px 0;
          box-shadow: -10px 0 40px 10px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
