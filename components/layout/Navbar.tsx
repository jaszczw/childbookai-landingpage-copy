"use client";

import { useState } from "react";
import { HambergerMenu, CloseCircle } from "iconsax-react";
import Link from "next/link";
import Image from "next/image";
import { AppButton } from "@/components/shared/AppButton";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    "Illustrator",
    "Gallery",
    "Pricing",
    "Guide",
    "Templates",
    "Login",
  ] as const;

  return (
    <header className="w-full">
      <div className="mx-auto max-w-[1320px] px-3 sm:px-4 laptop:px-6">
        <div className="relative">
          <Image
            src="/background/navbar-bg.png"
            alt=""
            width={1320}
            height={90}
            className="w-full h-auto"
            priority
          />

          {/* Navbar content */}
          <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-12 lg:px-16 laptop:px-18 desktop:px-22 top-[-10px] sm:top-[-20px] md:top-[-24px] laptop:top-[-28px] desktop:top-[-30px]">
            {/* Logo */}
            <Link href="/" aria-label="ChildbookAI Home">
              <Image
                src="/images/logo.png"
                alt="ChildbookAI"
                width={96}
                height={38}
                className="w-[36px] sm:w-[64px] md:w-[90px] laptop:w-[110px] desktop:w-[120px]"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-heading-sm tablet:text-sm lg:text-heading-sm laptop:text-heading-sm desktop:text-heading-sm font-medium text-blue-1000 hover:text-blue-600 transition-colors"
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
                className="hidden md:inline-flex rounded-[10px] text-heading-sm"
              >
                Create
              </AppButton>

              {/* Mobile / Tablet Menu Icon */}
              <button
                className="inline-flex items-center justify-center rounded-full h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:hidden"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <HambergerMenu
                  className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
                  color="#1E3A8A"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md">
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
            <Image
              src="/images/logo.png"
              alt="ChildbookAI"
              width={96}
              height={38}
              className="w-[82px] sm:w-[96px]"
            />
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center rounded-full p-1.5 sm:p-2 bg-white shadow-sm"
            >
              <CloseCircle size={26} color="#1E3A8A" />
            </button>
          </div>

          <nav className="flex flex-col items-center gap-5 sm:gap-6 mt-8 sm:mt-10 px-6">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-base sm:text-lg md:text-xl font-semibold text-blue-1000 hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            ))}

            <AppButton
              variant="primary"
              size="lg"
              className="mt-6 w-full max-w-xs text-base sm:text-lg"
            >
              Create
            </AppButton>
          </nav>
        </div>
      )}
    </header>
  );
}

