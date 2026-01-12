"use client";

import { useState } from "react";
import { HambergerMenu, CloseCircle } from "iconsax-react";
import Link from "next/link";
import Image from "next/image";
import { AppButton } from "@/components/shared";
import { navItems } from "@/lib/data";
import { IMAGE_DIMENSIONS } from "@/lib/constants";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="mx-auto max-w-[1320px] px-3 sm:px-4 laptop:px-6">
        <div className="relative">
          <Image
            src="/background/navbar-bg.svg"
            alt=""
            width={1320}
            height={90}
            className="w-full h-auto"
            priority
            aria-hidden="true"
          />

          {/* Navbar content */}
          <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 top-[-8px] sm:top-[-12px] md:top-[-16px] lg:top-[-20px] xl:top-[-24px]">
            {/* Logo */}
            <Link href="/" aria-label="ChildbookAI Home" className="shrink-0">
              <Image
                src="/images/logo.svg"
                alt="ChildbookAI"
                width={IMAGE_DIMENSIONS.LOGO.width}
                height={IMAGE_DIMENSIONS.LOGO.height}
                className="w-[40px] sm:w-[54px] md:w-[64px] lg:w-[80px] xl:w-[96px] h-auto ml-2 md:ml-4"
                priority
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-heading-sm font-medium text-blue-1000 hover:text-blue-600 transition-colors px-2 py-1 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
                >
                  {item}
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Icon */}
            <div className="flex items-center gap-2 sm:gap-3">
              <AppButton
                variant="primary"
                size="sm"
                className="hidden lg:inline-flex rounded-[10px] text-heading-sm min-h-[44px]"
              >
                Create
              </AppButton>

              {/* Mobile / Tablet Menu Icon */}
              <button
                className="inline-flex items-center justify-center rounded-full min-h-[44px] min-w-[44px] lg:hidden touch-manipulation"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <HambergerMenu
                  className="h-4 w-4 sm:h-6 sm:w-6"
                  color="#1E3A8A"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md overflow-y-auto">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-100">
            <Image
              src="/images/logo.png"
              alt="ChildbookAI"
              width={IMAGE_DIMENSIONS.LOGO.width}
              height={IMAGE_DIMENSIONS.LOGO.height}
              className="w-[64px] sm:w-[80px] md:w-[96px] h-auto"
            />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center rounded-full min-h-[44px] min-w-[44px] p-2 bg-white shadow-sm touch-manipulation"
            >
              <CloseCircle size={24} color="#1E3A8A" />
            </button>
          </div>

          <nav className="flex flex-col items-center gap-4 sm:gap-5 mt-6 sm:mt-8 px-4 sm:px-6 pb-8" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-base sm:text-lg font-semibold text-blue-1000 hover:text-blue-600 transition-colors min-h-[44px] flex items-center px-4 py-2 w-full justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
              >
                {item}
              </Link>
            ))}

            <AppButton
              variant="primary"
              size="lg"
              className="mt-4 w-full max-w-xs text-base sm:text-lg min-h-[44px]"
            >
              Create
            </AppButton>
          </nav>
        </div>
      )}
    </header>
  );
}

