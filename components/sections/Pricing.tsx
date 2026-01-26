"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { IndividualPricing, BusinessPricing } from "./";
import { IMAGE_DIMENSIONS, Z_INDEX, BACKGROUND_SHAPES } from "@/lib/constants";
import { SectionContainer } from "@/components/shared";
import { HeadingText } from "@/components/typography";
import { scrollReveal, viewportOnce } from "@/lib/utils/animations";

export function Pricing() {
  const [activeTab, setActiveTab] = useState<"individual" | "business">(
    "individual"
  );
  const [isYearly, setIsYearly] = useState(true);

  return (
    <SectionContainer
      viewBox={BACKGROUND_SHAPES.PRICING.viewBox}
      path={BACKGROUND_SHAPES.PRICING.path}
      fill="white"
      sectionClassName="py-24 min-h-[500px] overflow-visible"
      backgroundShapeClassName="overflow-visible"
      mobileCardClassName="mb-10"
      contentClassName="px-4 sm:px-6 lg:px-8 overflow-visible"
    >
      {/* Decorative Elements - Behind Cards */}
      <div
        className="absolute inset-0 pointer-events-none overflow-visible hidden sm:block"
        style={{ zIndex: Z_INDEX.DECORATIVE_ELEMENTS }}
      >
        {activeTab === "individual" ? (
          <>
            {/* Money Bag - Upper Right */}
            <div className="absolute top-16 right-4 md:top-18 md:right-8 lg:top-2 lg:right-2" aria-hidden="true">
              <Image
                src="/illustrations/money-bag.svg"
                alt=""
                width={IMAGE_DIMENSIONS.MONEY_BAG.width}
                height={IMAGE_DIMENSIONS.MONEY_BAG.height}
                className="object-contain w-32 h-32 sm:w-40 sm:h-40 lg:w-auto lg:h-auto"
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 280px"
                aria-hidden="true"
              />
            </div>

            {/* Coins - Bottom Left */}
            <div className="absolute bottom-12 left-6 md:bottom-2 md:-left-6 lg:bottom-2 lg:left-0" aria-hidden="true">
              <Image
                src="/illustrations/coins.svg"
                alt=""
                width={IMAGE_DIMENSIONS.COINS.width}
                height={IMAGE_DIMENSIONS.COINS.height}
                className="object-contain w-24 h-24 sm:w-40 sm:h-40 lg:w-auto lg:h-auto"
                sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 220px"
                aria-hidden="true"
              />
            </div>
          </>
        ) : (
          <>
            {/* Money Bag - Different position for business */}
            <div className="absolute top-8 right-8 md:top-18 lg:top-16 md:right-12 lg:right-[100px] xl:right-[150px]" aria-hidden="true">
              <Image
                src="/illustrations/money-bag.svg"
                alt=""
                width={IMAGE_DIMENSIONS.MONEY_BAG_BUSINESS.width}
                height={IMAGE_DIMENSIONS.MONEY_BAG_BUSINESS.height}
                className="object-contain w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-auto lg:h-auto"
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 250px"
                aria-hidden="true"
              />
            </div>

            {/* Coins - Different position for business */}
            <div className="absolute bottom-4 left-0 lg:bottom-6 lg:left-[100px] xl:bottom-6 xl:left-[200px]" aria-hidden="true">
              <Image
                src="/illustrations/coins.svg"
                alt=""
                width={IMAGE_DIMENSIONS.COINS_BUSINESS.width}
                height={IMAGE_DIMENSIONS.COINS_BUSINESS.height}
                className="object-contain w-24 h-24 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-auto lg:h-auto"
                sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 250px"
                aria-hidden="true"
              />
            </div>
          </>
        )}
      </div>

      <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scrollReveal}
        >
          <HeadingText
            variant="h1"
            title="Customers Pricing"
            className="font-bold "
            glyphs={[
              {
                word: "Customers",
                position: 4,
                variant: "blue1",
              },
            ]}
            coloredPhrases={[
              {
                text: "Customers",
                color: "text-primary",
              },
            ]}
            defaultTextColor="text-foreground"
            glyphSizeClassName="w-[0.6em] h-[0.6em] sm:w-[0.5em] sm:h-[0.5m] md:w-[0.6em] md:h-[0.6em] mb-8 sm:mb-10 md:mb-12"
          />

          {/* Tab Buttons and Yearly Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <ButtonGroup
              orientation="horizontal"
              className="rounded-md border-2 border-blue-800"
            >
              <Button
                onClick={() => setActiveTab("individual")}
                role="tab"
                aria-selected={activeTab === "individual"}
                aria-controls="pricing-content"
                id="tab-individual"
                className={cn(
                  "px-3 sm:px-4 md:px-5 py-2 sm:py-3 font-semibold text-sm sm:text-body transition-all duration-200 ease-out rounded-l-sm rounded-r-none border-0 min-h-[40px] sm:min-h-[44px] touch-manipulation focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-teal-600 active:scale-95",
                  activeTab === "individual"
                    ? "bg-blue-800 text-white hover:bg-blue-800"
                    : "bg-white text-foreground hover:bg-white"
                )}
              >
                Individual
              </Button>
              <Button
                onClick={() => setActiveTab("business")}
                role="tab"
                aria-selected={activeTab === "business"}
                aria-controls="pricing-content"
                id="tab-business"
                className={cn(
                  "px-3 sm:px-4 md:px-5 py-2 sm:py-3 font-semibold text-sm sm:text-body transition-all duration-200 ease-out rounded-r-sm rounded-l-none border-0 min-h-[40px] sm:min-h-[44px] touch-manipulation focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-teal-600 active:scale-95",
                  activeTab === "business"
                    ? "bg-blue-800 text-white hover:bg-blue-800"
                    : "bg-white text-foreground hover:bg-white"
                )}
              >
                Business
              </Button>
            </ButtonGroup>

            {/* Yearly Checkbox */}
            <label
              className={cn(
                "px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md font-semibold text-sm sm:text-body transition-all duration-200 ease-out border-2 border-blue-800 flex items-center gap-2 bg-white text-foreground cursor-pointer hover:bg-white hover:scale-105 active:scale-95 min-h-[40px] sm:min-h-[44px] touch-manipulation justify-center focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-1 focus-within:ring-teal-600"
              )}
            >
              <Checkbox
                checked={isYearly}
                onCheckedChange={(checked) => setIsYearly(checked === true)}
                aria-label="Toggle yearly pricing"
                className="border-blue-800 data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800 text-white min-h-[20px] min-w-[20px]"
              />
              <span>Yearly</span>
            </label>
          </div>
        </motion.div>

        {/* Render appropriate pricing component based on active tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id="pricing-content"
            role="tabpanel"
            aria-labelledby={activeTab === "individual" ? "tab-individual" : "tab-business"}
            aria-live="polite"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "individual" ? (
              <IndividualPricing isYearly={isYearly} />
            ) : (
              <BusinessPricing isYearly={isYearly} />
            )}
          </motion.div>
        </AnimatePresence>
    </SectionContainer>
  );
}

