"use client";

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

  return (
    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-items-center md:justify-center items-start max-w-6xl mx-auto">
      {individualPlans.map((plan: PricingCard, index: number) => {
        const isAlternate = index % 2 === 1;
        const headerColor = isAlternate
          ? "var(--blue-800)"
          : "var(--blue-400)";
        const textColorClass = isAlternate ? "text-white" : "text-foreground";
        // Calculate height based on content - popular card is taller
        const baseHeight = 930;
        const cardHeight = plan.popular ? 1060 : baseHeight;

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
              className={cn(plan.popular ? "origin-top" : "", "max-w-[400px]")}
              headerContent={
                <div className={`flex flex-col h-full ${textColorClass}`}>
                  {plan.popular && <div></div>}

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <HeadingText
                        as="h5"
                        variant="h5"
                        title={plan.title}
                        className={cn("font-bold", textColorClass)}
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
                          "text-sm",
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
                    <span
                      className={`text-heading-xl font-bold ${textColorClass}`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={`text-body ${
                          isAlternate ? "text-white" : "text-foreground"
                        } ml-2`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {plan.description && (
                    <ParagraphText
                      as="p"
                      variant="body-sm"
                      className={cn(
                        "text-body-sm mb-6",
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
                  className="w-full text-heading-sm min-h-[44px] transition-all duration-200 ease-out md:hover:scale-[1.02] md:active:scale-[0.98]"
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
