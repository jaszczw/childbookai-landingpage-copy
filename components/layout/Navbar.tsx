"use client";

import { useState } from "react";
import { HambergerMenu, CloseCircle } from "iconsax-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AppButton } from "@/ui/app-button";
import { navItems } from "@/lib/data";
import { IMAGE_DIMENSIONS } from "@/constants";
import { mobileMenu, mobileMenuContainer, fadeInUp } from "@/utils/animations";
import AddCharacterDialog from "@/components/steps/AddCharacterDialog";
import type { CharacterFormData } from "@/types/character";

/**
 * Some nav labels target real routes instead of section anchors on the home
 * page. Add new mappings here as more routed pages get added.
 */
const ROUTED_NAV_ITEMS: Record<string, string> = {
  Templates: "/marketplace",
};

function navItemHref(item: string): string {
  return ROUTED_NAV_ITEMS[item] ?? `#${item.toLowerCase()}`;
}

export type NavbarProps = {
  onOpenAddCharacterDialog?: () => void;
  addCharacterDialogOpen?: boolean;
  onAddCharacterDialogChange?: (open: boolean) => void;
  onAddCharacter?: (character: CharacterFormData) => void;
};

export function Navbar({
  onOpenAddCharacterDialog,
  addCharacterDialogOpen: controlledDialogOpen,
  onAddCharacterDialogChange,
  onAddCharacter,
}: NavbarProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [internalDialogOpen, setInternalDialogOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const addCharacterDialogOpen =
    controlledDialogOpen !== undefined
      ? controlledDialogOpen
      : internalDialogOpen;
  const setAddCharacterDialogOpen =
    onAddCharacterDialogChange || setInternalDialogOpen;

  const handleCreateClick = () => {
    if (onOpenAddCharacterDialog) {
      onOpenAddCharacterDialog();
    } else {
      // Default behavior: navigate to createbook page
      window.location.href = "/createbook";
    }
  };

  return (
    <header className="w-full">
      <div className="laptop:px-6 mx-auto max-w-[1320px] px-3 sm:px-4">
        <div className="relative">
          <Image
            src="/background/navbar-bg.svg"
            alt=""
            width={1320}
            height={90}
            className="h-auto w-full"
            priority
            aria-hidden="true"
          />

          {/* Navbar content */}
          <div className="absolute inset-0 top-[-8px] flex items-center justify-between px-4 sm:top-[-12px] sm:px-6 md:top-[-16px] md:px-8 lg:top-[-20px] lg:px-12 xl:top-[-24px] xl:px-16">
            {/* Logo */}
            <Link href="/" aria-label="ChildbookAI Home" className="shrink-0">
              <Image
                src="/images/logo.svg"
                alt="ChildbookAI"
                width={IMAGE_DIMENSIONS.LOGO.width}
                height={IMAGE_DIMENSIONS.LOGO.height}
                className="ml-2 h-auto w-[80px] sm:w-[108px] md:ml-4 md:w-[128px] lg:w-[160px] xl:w-[192px]"
                priority
                fetchPriority="high"
              />
            </Link>

            {/* Desktop Menu */}
            <nav
              className="hidden items-center gap-4 lg:flex xl:gap-6"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={navItemHref(item)}
                  className="text-heading-sm text-blue-1000 group relative flex min-h-[44px] items-center rounded-md px-2 py-1 font-medium transition-all duration-200 ease-out hover:scale-105 hover:text-blue-600"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Icon */}
            <div className="flex items-center gap-2 sm:gap-3">
              {onAddCharacter ? (
                <>
                  <AppButton
                    variant="primary"
                    size="sm"
                    onClick={() => setAddCharacterDialogOpen(true)}
                    className="text-heading-sm hidden min-h-[44px] rounded-[10px] transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] lg:inline-flex"
                  >
                    Create
                  </AppButton>
                  <AddCharacterDialog
                    open={addCharacterDialogOpen}
                    onOpenChange={setAddCharacterDialogOpen}
                    onAddCharacter={(character) => {
                      onAddCharacter(character);
                      setAddCharacterDialogOpen(false);
                    }}
                  />
                </>
              ) : (
                <AppButton
                  variant="primary"
                  size="sm"
                  onClick={handleCreateClick}
                  className="text-heading-sm hidden min-h-[44px] rounded-[10px] transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] lg:inline-flex"
                >
                  Create
                </AppButton>
              )}

              {/* Mobile / Tablet Menu Icon */}
              <button
                className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full lg:hidden"
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto bg-white/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6"
              initial="closed"
              animate="open"
              variants={mobileMenu}
            >
              <Image
                src="/images/logo.png"
                alt="ChildbookAI"
                width={IMAGE_DIMENSIONS.LOGO.width}
                height={IMAGE_DIMENSIONS.LOGO.height}
                className="h-auto w-[64px] sm:w-[80px] md:w-[96px]"
              />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="inline-flex min-h-[44px] min-w-[44px] touch-manipulation items-center justify-center rounded-full bg-white p-2 shadow-sm transition-transform duration-200 ease-out hover:scale-110 active:scale-95"
              >
                <CloseCircle size={24} color="#1E3A8A" />
              </button>
            </motion.div>

            <motion.nav
              className="mt-6 flex flex-col items-center gap-4 px-4 pb-8 sm:mt-8 sm:gap-5 sm:px-6"
              aria-label="Mobile navigation"
              initial="closed"
              animate="open"
              variants={mobileMenuContainer}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item}
                  variants={fadeInUp}
                  className="flex w-full justify-center"
                >
                  <Link
                    href={navItemHref(item)}
                    onClick={() => setMenuOpen(false)}
                    className="text-blue-1000 focus:ring-primary flex min-h-[44px] w-full items-center justify-center rounded-md px-4 py-2 text-base font-semibold transition-all duration-200 ease-out hover:scale-105 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-lg"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={fadeInUp}
                className="mt-4 flex w-full justify-center"
              >
                {onAddCharacter ? (
                  <>
                    <AppButton
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        setAddCharacterDialogOpen(true);
                        setMenuOpen(false);
                      }}
                      className="min-h-[44px] w-full max-w-xs text-base transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] sm:text-lg"
                    >
                      Create
                    </AppButton>
                    <AddCharacterDialog
                      open={addCharacterDialogOpen}
                      onOpenChange={setAddCharacterDialogOpen}
                      onAddCharacter={(character) => {
                        onAddCharacter?.(character);
                        setAddCharacterDialogOpen(false);
                      }}
                    />
                  </>
                ) : (
                  <AppButton
                    variant="primary"
                    size="lg"
                    onClick={handleCreateClick}
                    className="min-h-[44px] w-full max-w-xs text-base transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] sm:text-lg"
                  >
                    Create
                  </AppButton>
                )}
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
