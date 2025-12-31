"use client";

import { useState } from "react";
import Image from "next/image";
import { CustomCard } from "@/components/shared/CustomCard";
import { AppButton } from "@/components/shared/AppButton";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DecorativeText } from "@/components/typography/DecorativeText";
import { cn } from "@/lib/utils";

interface PricingCard {
  id: number;
  title: string;
  price: string;
  period?: string;
  disclaimer?: string;
  description?: string;
  features: string[];
  popular?: boolean;
  badge?: string | { image: string; alt: string };
  buttonText: string | { text: string; icon: string };
}

const individualPlans: PricingCard[] = [
  {
    id: 1,
    title: "Single Credit",
    price: "$2.5",
    period: "/1 credit",
    description:
      "You can buy a single credit to create a personalized book or use it to generate a book from a template. Illustrator is not included in the single credit purchase.",
    features: [
      "Listen to books come alive with text-to-speech feature",
      "Books in your language and voiceover",
      "Edit or change your illustrations up to 16 times",
      "Limitless editing with canva integration",
      "Personalized and unique characters",
      "Up to 12 pages per AI generated book",
      "One personalized book or a template generation",
    ],
    buttonText: "Buy a Single Book",
  },
  {
    id: 2,
    title: "Premium Plan",
    price: "$29",
    period: "/year*",
    disclaimer: "*Cancel anytime",
    description:
      "Premium plan is the best option for those who want to create a lot of personalized children's books with AI or want to illustrate their own story with our Childbook Illustrator™",
    features: [
      "Access to Childbook Illustrator™ and Illustrate your Children's Book with AI - without pages limitation",
      "500 illustrations per month",
      "Up to 100 personalized AI generated books per month",
      "Limitless editing with canva integration",
      "Books in your language",
      "Your name on the book cover",
      "Edit the story and illustrations to your liking",
      "Option for more text content per page",
      "Up to 20 pages per generated book",
      "Premium book cover that you can generate",
      "Personalized and unique characters, illustrations and stories",
      "Listen to books come alive with text-to-speech Feature",
    ],
    popular: true,
    badge: { image: "/illustrations/gold-crown-icon.svg", alt: "Crown" },
    buttonText: "Get Premium",
  },
  {
    id: 3,
    title: "Hobby Plan",
    price: "$19",
    period: "/year*",
    disclaimer: "*Cancel anytime",
    description:
      "Hobby plan is the best option for those who want to create a few personalized children's books with AI or want to illustrate a short story with our AI Illustrator™",
    features: [
      "Access to Childbook Illustrator™ and Illustrate your Children's Book with AI- without pages limitation",
      "100 illustrations per month",
      "Up to 20 ai generated books per month",
      "Books in your language",
      "Limitless editing with canva integration",
      "Your name on the book cover",
      "Option for more text content per page",
      "Up to 16 pages per generated book",
      "Personalized and unique characters, illustrations and stories",
      "Listen to books come alive with text-to-speech Feature",
    ],
    badge: { image: "/illustrations/silver-crown-icon.svg", alt: "Crown" },
    buttonText: "Buy Hobby Plan",
  },
];

const businessPlans: PricingCard[] = [
  {
    id: 1,
    title: "Starter",
    price: "$99",
    period: "/month",
    description:
      "Perfect for small businesses getting started with personalized children's books.",
    features: [
      "Up to 50 books per month",
      "Basic branding options",
      "Team collaboration (up to 5 users)",
      "Standard templates",
      "Email support",
    ],
    buttonText: "Get Started",
  },
  {
    id: 2,
    title: "Professional",
    price: "$199",
    period: "/month",
    description:
      "Ideal for growing businesses that need advanced features and more capacity.",
    features: [
      "Up to 200 books per month",
      "Custom branding",
      "Team collaboration (up to 20 users)",
      "All templates access",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
    popular: true,
    buttonText: "Get Professional",
  },
  {
    id: 3,
    title: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "Tailored solutions for large organizations with specific requirements.",
    features: [
      "Unlimited books",
      "Full white-label solution",
      "Unlimited team members",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom API development",
      "SLA guarantee",
      "On-premise deployment options",
    ],
    buttonText: "Contact Sales",
  },
];

export function Pricing() {
  const [activeTab, setActiveTab] = useState<"individual" | "business">(
    "individual"
  );
  const [isYearly, setIsYearly] = useState(true);

  const currentPlans =
    activeTab === "individual" ? individualPlans : businessPlans;

  return (
    <section className="relative w-full py-24 min-h-[500px] overflow-visible">
      {/* SvgWideCard Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-visible">
        <svg
          viewBox="0 0 1440 1200"
          className="w-full h-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M1440 80.0008C1440 34.8075 1402.59 -1.41424 1357.42 0.0424087L77.4214 41.3202C34.2648 42.7119 0 78.0997 0 121.279V948.643C0 991.531 33.8195 1026.79 76.6696 1028.57L1356.67 1081.91C1402.12 1083.8 1440 1047.47 1440 1001.98V80.0008Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="text-center mb-12">
          <h1 className="text-heading-xl max-w-5xl mx-auto mb-8">
            <span className="inline-flex items-baseline">
              <DecorativeText
                text="Customers"
                replace={[
                  { pattern: "o", variant: "blue1", occurrence: 1 }
                ]}
                className="text-primary"
              />
              <span className="text-foreground ml-2">Pricing</span>
            </span>
          </h1>

          {/* Tab Buttons and Yearly Toggle */}
          <div className="flex items-center justify-center gap-4">
            <ButtonGroup orientation="horizontal" className="rounded-md border-2 border-blue-800">
              <Button
                onClick={() => setActiveTab("individual")}
                className={cn(
                  "px-6 py-3 font-semibold text-body transition-all rounded-l-sm rounded-r-none border-0",
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
                  "px-6 py-3 font-semibold text-body transition-all rounded-r-sm rounded-l-none border-0",
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
                "px-3 py-[6px] rounded-md font-semibold text-body transition-all border-2 border-blue-800 flex items-center gap-2 bg-white text-forefround cursor-pointer hover:bg-white"
              )}
            >
              <Checkbox
                checked={isYearly}
                onCheckedChange={(checked) => setIsYearly(checked === true)}
                className="border-blue-800 data-[state=checked]:bg-blue-800 data-[state=checked]:border-blue-800 text-white"
              />
              <span>Yearly</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center items-start">
          {currentPlans.map((plan, index) => {
            const isAlternate = index % 2 === 1;
            const headerColor = isAlternate ? "var(--blue-800)" : "var(--blue-400)";
            const textColorClass = isAlternate ? "text-white" : "text-foreground";
            // Calculate height based on content - popular card is taller
            const baseHeight = 930;
            const cardHeight = plan.popular ? 1060 : baseHeight;
            return (
              <div
                key={plan.id}
                className={`flex justify-center items-start ${plan.popular ? "relative z-20" : "relative z-10"}`}
              >
                <CustomCard
                  width={400}
                  height={cardHeight}
                  fillColor="var(--blue-100)"
                  headerColor={headerColor}
                  svgVariant={index % 2 === 0 ? "first" : "second"}
                  className={plan.popular ? " origin-top" : ""}
                headerContent={
                  <div className={`flex flex-col h-full ${textColorClass}`}>
                    {plan.popular && <div></div>}

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`text-heading-sm font-bold ${textColorClass}`}
                        >
                          {plan.title}
                        </h3>
                        {plan.badge && (
                          typeof plan.badge === "string" ? (
                            <span className="text-2xl">{plan.badge}</span>
                          ) : (
                            <Image
                              src={plan.badge.image}
                              alt={plan.badge.alt}
                              width={24}
                              height={24}
                              className="shrink-0"
                            />
                          )
                        )}
                      </div>
                      {plan.disclaimer && (
                        <p
                          className={`text-sm ${
                            isAlternate ? "text-white" : "text-foreground"
                          }`}
                        >
                          {plan.disclaimer}
                        </p>
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
                      <p
                        className={`text-body-sm ${
                          isAlternate ? "text-white" : "text-foreground"
                        } mb-6`}
                      >
                        {plan.description}
                      </p>
                    )}
                  </div>
                }
              >
                 <div className="flex flex-col h-full">
                   <ul className="space-y-2 -mt-12 mb-3">
                     {plan.features.map((feature, index) => {
                       const isLast = index === plan.features.length - 1;
                       return (
                       <li
                         key={index}
                         className={`flex items-start text-body text-foreground ${isLast ? "pt-2 pb-4" : "py-2"}`}
                       >
                         <Image
                           src="/illustrations/check-icon.svg"
                           alt=""
                           width={20}
                           height={20}
                           className="mr-2 shrink-0 mt-0.5"
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
                    className="w-full text-heading-sm"
                  >
                    {typeof plan.buttonText === "string" ? plan.buttonText : plan.buttonText.text}
                  </AppButton>
                </div>
              </CustomCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

