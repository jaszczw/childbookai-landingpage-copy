"use client";

import { useState } from "react";
import { HambergerMenu, CloseCircle } from "iconsax-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AppButton } from "@/components/ui/app-button";
import { navItems } from "@/lib/data";
import { IMAGE_DIMENSIONS } from "@/lib/constants";
import { mobileMenu, mobileMenuContainer, fadeInUp } from "@/lib/utils/animations";
import AddCharacterDialog, { type CharacterFormData } from "@/components/steps/AddCharacterDialog";

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
  onAddCharacter 
}: NavbarProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [internalDialogOpen, setInternalDialogOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const addCharacterDialogOpen = controlledDialogOpen !== undefined 
    ? controlledDialogOpen 
    : internalDialogOpen;
  const setAddCharacterDialogOpen = onAddCharacterDialogChange || setInternalDialogOpen;

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
                  className="text-heading-sm font-medium text-blue-1000 hover:text-blue-600 transition-all duration-200 ease-out hover:scale-105 px-2 py-1 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out group-hover:w-full" />
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
                    className="hidden lg:inline-flex rounded-[10px] text-heading-sm min-h-[44px] transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
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
                  className="hidden lg:inline-flex rounded-[10px] text-heading-sm min-h-[44px] transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                >
                  Create
                </AppButton>
              )}

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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-100"
              initial="closed"
              animate="open"
              variants={mobileMenu}
            >
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
                className="inline-flex items-center justify-center rounded-full min-h-[44px] min-w-[44px] p-2 bg-white shadow-sm touch-manipulation transition-transform duration-200 ease-out hover:scale-110 active:scale-95"
              >
                <CloseCircle size={24} color="#1E3A8A" />
              </button>
            </motion.div>

            <motion.nav
              className="flex flex-col items-center gap-4 sm:gap-5 mt-6 sm:mt-8 px-4 sm:px-6 pb-8"
              aria-label="Mobile navigation"
              initial="closed"
              animate="open"
              variants={mobileMenuContainer}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  variants={fadeInUp}
                  className="w-full flex justify-center"
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-base sm:text-lg font-semibold text-blue-1000 hover:text-blue-600 transition-all duration-200 ease-out hover:scale-105 min-h-[44px] flex items-center px-4 py-2 w-full justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={fadeInUp} className="w-full flex justify-center mt-4">
                {onAddCharacter ? (
                  <>
                    <AppButton
                      variant="primary"
                      size="lg"
                      onClick={() => {
                        setAddCharacterDialogOpen(true);
                        setMenuOpen(false);
                      }}
                      className="w-full max-w-xs text-base sm:text-lg min-h-[44px] transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
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
                    className="w-full max-w-xs text-base sm:text-lg min-h-[44px] transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
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

