"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CustomCard } from "@/components/shared";
import { AppButton } from "@/components/ui/app-button";
import { HeadingText, ParagraphText } from "@/components/typography";
import { FeatureList } from "@/components/ui/feature-list";
import { cn } from "@/lib/utils";
import { pricingData } from "@/lib/data";
import type { PricingCard } from "@/lib/types";
import { scrollReveal, viewportOnce } from "@/lib/utils/animations";

interface BusinessPricingProps {
  isYearly: boolean;
}

export function BusinessPricing({ isYearly }: BusinessPricingProps) {
  // isYearly is available for future pricing calculations
  void isYearly;
  const businessPlans = pricingData.business;
  const [headerHeightPx, setHeaderHeightPx] = useState(230);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (typeof window === "undefined") return;
      const viewportWidth = window.innerWidth;

      // Mobile (xs/sm) -> 210, larger screens -> 230
      if (viewportWidth < 640) {
        setHeaderHeightPx(210);
      } else {
        setHeaderHeightPx(230);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);
  
  return (
    <div className="flex justify-center items-start">
      {businessPlans.map((plan: PricingCard) => {
        return (
          <motion.div
            key={plan.id}
            className="flex justify-center items-start relative pb-12 sm:pb-16 md:pb-20 z-10 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={scrollReveal}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <CustomCard
              width={650}
              height={600}
              fillColor="var(--blue-100)"
              headerColor="#54E6ED"
              svgVariant="business"
              // Keep existing SVG responsiveness; just fine-tune layout like IndividualPricing
              headerHeightPx={headerHeightPx}
              cloudTranslateYPercent={-50}
              bodyTranslateYPercent={0}
              className="max-w-[650px]"
              headerContent={
                <div className="flex flex-col h-full text-foreground">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <HeadingText
                        as="h3"
                        variant="h5"
                        title={plan.title}
                        className={cn(
                          // Match responsive heading behavior from IndividualPricing
                          "font-bold text-lg sm:text-2xl md:text-2xl lg:text-2xl",
                          "text-foreground"
                        )}
                        defaultTextColor="text-foreground"
                      />
                      {plan.badge &&
                        (typeof plan.badge === "string" ? (
                          <span className="text-2xl">{plan.badge}</span>
                        ) : (
                          <Image
                            src={plan.badge.image}
                            alt={plan.badge.alt}
                            width={24}
                            height={24}
                            className="shrink-0 w-4 h-4 sm:w-7 sm:h-7"
                            sizes="24px"
                          />
                        ))}
                    </div>
                    {plan.disclaimer && (
                      <ParagraphText
                        as="p"
                        variant="body-sm"
                        className={cn(
                          // Responsive disclaimer text similar to IndividualPricing
                          "text-xs sm:text-sm md:text-sm lg:text-sm",
                          "text-foreground"
                        )}
                        defaultTextColor="text-foreground"
                      >
                        {plan.disclaimer}
                      </ParagraphText>
                    )}
                  </div>

                  <div className="mb-2">
                    {/* Responsive price text, aligned with IndividualPricing */}
                    <span className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-heading-xl lg:leading-[55px] text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="ml-2 text-sm sm:text-sm md:text-base text-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {plan.description && (
                    <ParagraphText
                      as="p"
                      variant="body-sm"
                      className="text-foreground mb-4 sm:mb-5 md:mb-6"
                      defaultTextColor="text-foreground"
                    >
                      {plan.description}
                    </ParagraphText>
                  )}
                </div>
              }
            >
              <div className="flex flex-col h-full">
                <FeatureList
                  features={plan.features}
                  columns={2}
                  textSize="md"
                  iconSize="sm"
                />

                <AppButton
                  variant="primary"
                  size="md"
                  shadow
                  className="w-full min-h-[44px] text-xs sm:text-sm md:text-body"
                >
                  {typeof plan.buttonText === "string"
                    ? plan.buttonText
                    : plan.buttonText.text}
                </AppButton>
              </div>
            </CustomCard>
          </motion.div>
        );
      })}
    </div>
  );
}

