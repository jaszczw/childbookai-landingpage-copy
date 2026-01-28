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
import { scrollReveal, transitions } from "@/lib/utils/animations";

interface IndividualPricingProps {
  isYearly: boolean;
}

export function IndividualPricing({ isYearly }: IndividualPricingProps) {
  // isYearly is available for future pricing calculations
  void isYearly;
  const individualPlans = pricingData.individual;

  // Scale card height based on viewport width (mobile = base),
  // and increase heights again for md and lg breakpoints.
  const [cardScale, setCardScale] = useState(1);
  const [heightMultiplier, setHeightMultiplier] = useState(1);

  useEffect(() => {
    const DESIGN_WIDTH = 400; // matches max card width
    const HORIZONTAL_PADDING = 32; // approximate padding/gap on mobile

    const updateScale = () => {
      if (typeof window === "undefined") return;
      const viewportWidth = window.innerWidth;
      const availableWidth = Math.min(
        Math.max(viewportWidth - HORIZONTAL_PADDING, 280),
        DESIGN_WIDTH
      );

      // Slightly reduce height overall on smaller screens
      const scale = (availableWidth / DESIGN_WIDTH) * 0.9;
      setCardScale(scale > 1 ? 1 : scale);

      // Use Tailwind-like breakpoints to adjust height as screen size changes
      // xs: <640px -> slightly smaller card
      // sm: 640-767px -> base height
      // md: 768-1023px -> slightly taller
      // lg and above: >=1024px -> even taller
      if (viewportWidth >= 1024) {
        setHeightMultiplier(1.15);
      } else if (viewportWidth >= 768) {
        setHeightMultiplier(1.08);
      } else if (viewportWidth >= 640) {
        setHeightMultiplier(1); // sm
      } else {
        setHeightMultiplier(0.9); // xs - make SVG card a bit smaller
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-items-center md:justify-center items-start max-w-6xl mx-auto">
      {individualPlans.map((plan: PricingCard, index: number) => {
        const isAlternate = index % 2 === 1;
        const headerColor = isAlternate
          ? "var(--blue-800)"
          : "var(--blue-400)";
        const textColorClass = isAlternate ? "text-white" : "text-foreground";

        // Base desktop heights (mobile = base), then scale by viewport and breakpoint
        const baseHeight = 900;
        const desktopHeight = plan.popular ? 1020 : baseHeight;
        let cardHeight = desktopHeight * cardScale * heightMultiplier;

        // Make the first column slightly shorter than the others
        if (index === 0) {
          cardHeight *= 0.8;
        }

        // Only apply hover motion on non-touch devices (desktop / tablets with cursor)
        const isTouchDevice =
          typeof window !== "undefined" &&
          window.matchMedia &&
          !window
            .matchMedia("(hover: hover) and (pointer: fine)")
            .matches;

        const hoverMotionProps = isTouchDevice
          ? {}
          : {
              whileHover: {
                y: plan.popular ? -8 : -6,
                scale: plan.popular ? 1.02 : 1.01,
              },
              transition: transitions.quick,
            };

        return (
          <motion.div
            key={plan.id}
            className={`flex justify-center items-start w-full ${
              plan.popular ? "relative z-20" : "relative z-10"
            }`}
            variants={scrollReveal}
            {...hoverMotionProps}
          >
            <CustomCard
              width="100%"
              height={cardHeight}
              fillColor="var(--blue-100)"
              headerColor={headerColor}
              svgVariant={index % 2 === 0 ? "first" : "second"}
              // Per-column header height control (in px)
              headerHeightPx={
                index === 0 ? 320 : index === 1 ? 276 : 290
              }
              // Per-column cloud divider translateY control
              cloudTranslateYPercent={
                index === 0 ? -50 : index === 1 ? -90 : -70
              }
              // Per-column body/content vertical alignment
              // Move 2nd and 3rd column content slightly upward to align with 1st
              bodyTranslateYPercent={
                index === 0 ? 2 : index === 1 ? -9 : -5
              }
              className={cn(
                plan.popular ? "origin-top" : "",
                // Slightly shrink full SVG/card on mobile, keep size on sm+
                "max-w-[400px] scale-[0.9] sm:scale-100"
              )}
              headerContent={
                <div className={`flex flex-col h-full ${textColorClass}`}>
                  {plan.popular && <div></div>}

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <HeadingText
                        as="h5"
                        variant="h5"
                        title={plan.title}
                        className={cn(
                          // Responsive badge heading: slightly smaller on xs, keep size on sm+
                          "font-bold text-lg sm:text-2xl md:text-2xl lg:text-2xl",
                          textColorClass
                        )}
                        defaultTextColor={textColorClass}
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
                            className="shrink-0 w-6 h-6 sm:w-7 sm:h-7"
                            sizes="24px"
                          />
                        ))}
                    </div>
                    {plan.disclaimer && (
                      <ParagraphText
                        as="p"
                        variant="body-sm"
                        className={cn(
                          // Responsive: smaller on xs/sm, keep existing size on md+
                          "text-xs sm:text-sm md:text-sm lg:text-sm",
                          isAlternate ? "text-white" : "text-foreground"
                        )}
                        defaultTextColor={
                          isAlternate ? "text-white" : "text-foreground"
                        }
                      >
                        {plan.disclaimer}
                      </ParagraphText>
                    )}
                  </div>

                  <div className="mb-2">
                    {/* Price - make responsive, but keep desktop size similar */}
                    <span
                      className={cn(
                        "font-bold text-4xl sm:text-5xl md:text-6xl lg:text-heading-xl lg:leading-[55px]",
                        textColorClass
                      )}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={cn(
                          // Period text: smaller on xs/sm, keep body size on md+
                          "ml-2 text-sm sm:text-sm md:text-base",
                          isAlternate ? "text-white" : "text-foreground"
                        )}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {plan.description && (
                    <ParagraphText
                      as="p"
                      variant="body-sm"
                      className={cn( "mb-6",
                        isAlternate ? "text-white" : "text-foreground"
                      )}
                      defaultTextColor={
                        isAlternate ? "text-white" : "text-foreground"
                      }
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
                  columns={1}
                  textSize="sm"
                  iconSize="md"
                />

                <AppButton
                  variant="primary"
                  size="md"
                  shadow
                  className="w-full min-h-[40px] text-xs sm:text-sm md:text-body"
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
    </motion.div>
  );
}
