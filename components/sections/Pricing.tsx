"use client";

import { useState } from "react";
import Image from "next/image";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { IndividualPricing } from "./IndividualPricing";
import { BusinessPricing } from "./BusinessPricing";
import { IMAGE_DIMENSIONS, Z_INDEX } from "@/lib/constants";
import { BackgroundShape } from "@/components/shared/BackgroundShape";
import { HeadingText } from "../typography/HeadingText";

export function Pricing() {
  const [activeTab, setActiveTab] = useState<"individual" | "business">(
    "individual"
  );
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section className="relative w-full py-24 min-h-[500px] overflow-visible">
      {/* Desktop / large screens: SVG background */}
      <BackgroundShape
        viewBox="0 0 1440 1200"
        path="M1440 80.0008C1440 34.8075 1402.59 -1.41424 1357.42 0.0424087L77.4214 41.3202C34.2648 42.7119 0 78.0997 0 121.279V948.643C0 991.531 33.8195 1026.79 76.6696 1028.57L1356.67 1081.91C1402.12 1083.8 1440 1047.47 1440 1001.98V80.0008Z"
        fill="white"
        className="hidden lg:flex overflow-visible"
      />

      {/* Tablet / mobile: soft white background card */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none lg:hidden">
        <div className="w-full h-[97%] mb-10 rounded-[40px] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.14)]" />
      </div>

      {/* Decorative Elements - Behind Cards */}
      <div
        className="absolute inset-0 pointer-events-none overflow-visible hidden sm:block"
        style={{ zIndex: Z_INDEX.DECORATIVE_ELEMENTS }}
      >
        {activeTab === "individual" ? (
          <>
            {/* Money Bag - Upper Right */}
            <div className="absolute top-16 right-4 md:top-18 md:right-8 lg:top-8 lg:right-8">
              <Image
                src="/illustrations/money-bag.svg"
                alt=""
                width={IMAGE_DIMENSIONS.MONEY_BAG.width}
                height={IMAGE_DIMENSIONS.MONEY_BAG.height}
                className="object-contain w-32 h-32 sm:w-40 sm:h-40 lg:w-auto lg:h-auto"
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 280px"
              />
            </div>

            {/* Coins - Bottom Left */}
            <div className="absolute bottom-12 left-6 md:bottom-2 md:-left-6 lg:bottom-16 lg:left-12">
              <Image
                src="/illustrations/coins.svg"
                alt=""
                width={IMAGE_DIMENSIONS.COINS.width}
                height={IMAGE_DIMENSIONS.COINS.height}
                className="object-contain w-24 h-24 sm:w-40 sm:h-40 lg:w-auto lg:h-auto"
                sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 220px"
              />
            </div>
          </>
        ) : (
          <>
            {/* Money Bag - Different position for business */}
            <div className="absolute top-8 right-8 md:top-18 lg:top-16 md:right-12 lg:right-[100px] xl:right-[150px]">
              <Image
                src="/illustrations/money-bag.svg"
                alt=""
                width={IMAGE_DIMENSIONS.MONEY_BAG_BUSINESS.width}
                height={IMAGE_DIMENSIONS.MONEY_BAG_BUSINESS.height}
                className="object-contain w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-auto lg:h-auto"
                sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 250px"
              />
            </div>

            {/* Coins - Different position for business */}
            <div className="absolute bottom-4 left-0 lg:bottom-6 lg:left-[100px] xl:bottom-6 xl:left-[200px]">
              <Image
                src="/illustrations/coins.svg"
                alt=""
                width={IMAGE_DIMENSIONS.COINS_BUSINESS.width}
                height={IMAGE_DIMENSIONS.COINS_BUSINESS.height}
                className="object-contain w-24 h-24 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-auto lg:h-auto"
                sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 250px"
              />
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
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
                className={cn(
                  "px-3 sm:px-4 md:px-5 py-2 sm:py-3 font-semibold text-sm sm:text-body transition-all rounded-l-sm rounded-r-none border-0 min-h-[40px] sm:min-h-[44px] touch-manipulation",
                  activeTab === "individual"
                    ? "bg-blue-800 text-white hover:bg-blue-800"
                    : "bg-white text-foreground hover:bg-white"
                )}
              >
                Individual
              </Button>
              <Button
                onClick={() => setActiveTab("business")}
                className={cn(
                  "px-3 sm:px-4 md:px-5 py-2 sm:py-3 font-semibold text-sm sm:text-body transition-all rounded-r-sm rounded-l-none border-0 min-h-[40px] sm:min-h-[44px] touch-manipulation",
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
                "px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md font-semibold text-sm sm:text-body transition-all border-2 border-blue-800 flex items-center gap-2 bg-white text-foreground cursor-pointer hover:bg-white min-h-[40px] sm:min-h-[44px] touch-manipulation justify-center"
              )}
            >
              <Checkbox
                checked={isYearly}
                onCheckedChange={(checked) => setIsYearly(checked === true)}
                className="border-blue-800 data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800 text-white min-h-[20px] min-w-[20px]"
              />
              <span>Yearly</span>
            </label>
          </div>
        </div>

        {/* Render appropriate pricing component based on active tab */}
        {activeTab === "individual" ? (
          <IndividualPricing isYearly={isYearly} />
        ) : (
          <BusinessPricing isYearly={isYearly} />
        )}
      </div>
    </section>
  );
}

