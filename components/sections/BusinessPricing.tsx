"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CustomCard, AppButton } from "@/components/shared";
import { HeadingText, ParagraphText } from "@/components/typography";
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
  
  return (
    <div className="flex justify-center items-start">
      {businessPlans.map((plan: PricingCard) => {
            // Split features into two columns
            const midPoint = Math.ceil(plan.features.length / 2);
            const leftColumnFeatures = plan.features.slice(0, midPoint);
            const rightColumnFeatures = plan.features.slice(midPoint);

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
                  className="max-w-[650px]"
                  headerContent={
                    <div className="flex flex-col h-full text-foreground">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <HeadingText
                            as="h3"
                            variant="h5"
                            title={plan.title}
                            className={cn("font-bold", "text-foreground")}
                            defaultTextColor="text-foreground"
                          />
                          {plan.badge && (
                            typeof plan.badge === "string" ? (
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
                            )
                          )}
                        </div>
                        {plan.disclaimer && (
                          <ParagraphText
                            as="p"
                            variant="body-sm"
                            className={cn("text-sm", "text-foreground")}
                            defaultTextColor="text-foreground"
                          >
                            {plan.disclaimer}
                          </ParagraphText>
                        )}
                      </div>

                      <div className="mb-2">
                        <span className="text-heading-lg md:text-heading-xl font-bold text-foreground">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-body text-foreground ml-2">
                            {plan.period}
                          </span>
                        )}
                      </div>

                      {plan.description && (
                        <p className="text-xs sm:text-sm md:text-body-sm text-foreground mb-4 sm:mb-5 md:mb-6">
                          {plan.description}
                        </p>
                      )}
                    </div>
                  }
                >
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 -mt-12 mb-3">
                      {/* Left Column */}
                      <ul className="space-y-0 xl:space-y-2">
                        {leftColumnFeatures.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start text-xs md:text-body text-foreground py-2"
                          >
                            <Image
                              src="/illustrations/check-icon.svg"
                              alt=""
                              width={20}
                              height={20}
                              className="mr-2 shrink-0 mt-0.5 w-3 h-3 sm:w-4 sm:h-4"
                              sizes="20px"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Right Column */}
                      <ul className="space-y-0 xl:space-y-2">
                        {rightColumnFeatures.map((feature, index) => {
                          const isLast = index === rightColumnFeatures.length - 1;
                          return (
                            <li
                              key={index}
                              className={`flex items-start text-xs md:text-body text-foreground ${isLast ? "pt-2 pb-4" : "py-2"}`}
                            >
                              <Image
                                src="/illustrations/check-icon.svg"
                                alt=""
                                width={20}
                                height={20}
                                className="mr-2 shrink-0 mt-0.5 w-3 h-3 sm:w-4 sm:h-4"
                                sizes="20px"
                              />
                              <span>{feature}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <AppButton
                      variant="primary"
                      size="md"
                      shadow
                      className="w-full text-body-sm md:text-heading-sm mt-2 md:mt-8 min-h-10 md:min-h-[44px] transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {typeof plan.buttonText === "string" ? plan.buttonText : plan.buttonText.text}
                    </AppButton>
                  </div>
                </CustomCard>
              </motion.div>
            );
          })}
    </div>
  );
}

