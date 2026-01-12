"use client";

import Image from "next/image";
import { CustomCard, AppButton } from "@/components/shared";
import { HeadingText, ParagraphText } from "@/components/typography";
import { cn } from "@/lib/utils";
import { pricingData } from "@/lib/data";
import type { PricingCard } from "@/lib/types";

interface IndividualPricingProps {
  isYearly: boolean;
}

export function IndividualPricing({ isYearly }: IndividualPricingProps) {
  // isYearly is available for future pricing calculations
  void isYearly;
  const individualPlans = pricingData.individual;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 justify-items-center md:justify-center items-start max-w-6xl mx-auto">
      {individualPlans.map((plan: PricingCard, index: number) => {
            const isAlternate = index % 2 === 1;
            const headerColor = isAlternate
              ? "var(--blue-800)"
              : "var(--blue-400)";
            const textColorClass = isAlternate
              ? "text-white"
              : "text-foreground";
            // Calculate height based on content - popular card is taller
            const baseHeight = 930;
            const cardHeight = plan.popular ? 1060 : baseHeight;
            return (
              <div
                key={plan.id}
                className={`flex justify-center items-start w-full ${
                  plan.popular ? "relative z-20" : "relative z-10"
                }`}
              >
                <CustomCard
                  width="100%"
                  height={cardHeight}
                  fillColor="var(--blue-100)"
                  headerColor={headerColor}
                  svgVariant={index % 2 === 0 ? "first" : "second"}
                  className={cn(
                    plan.popular ? "origin-top" : "",
                    "max-w-[400px]"
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
                    <ul className="space-y-1 xl:space-y-2 -mt-12 mb-3">
                      {plan.features.map((feature, index) => {
                        const isLast = index === plan.features.length - 1;
                        return (
                          <li
                            key={index}
                            className={`flex items-start text-body-sm text-foreground ${
                              isLast ? "pt-2 pb-4" : "py-2"
                            }`}
                          >
                            <Image
                              src="/illustrations/check-icon.svg"
                              alt=""
                              width={20}
                              height={20}
                              className="mr-2 shrink-0 mt-0.5 w-5 h-5 sm:w-5 sm:h-5"
                              sizes="20px"
                            />
                            <span>{feature}</span>
                          </li>
                        );
                      })}
                    </ul>

                    <AppButton
                      variant="primary"
                      size="md"
                      shadow
                      className="w-full text-heading-sm min-h-[44px]"
                    >
                      {typeof plan.buttonText === "string"
                        ? plan.buttonText
                        : plan.buttonText.text}
                    </AppButton>
                  </div>
                </CustomCard>
              </div>
            );
          })}
    </div>
  );
}
