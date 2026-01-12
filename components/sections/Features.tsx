"use client";

import Image from "next/image";
import { features } from "@/lib/data";
import { HeadingText } from "@/components/typography";
import { BackgroundShape, MobileBackgroundCard } from "@/components/shared";
import { BACKGROUND_SHAPES } from "@/lib/constants";

export function Features() {
  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-16 md:py-18 lg:py-32 pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32 -top-[50px] sm:-top-[80px] md:-top-[100px] lg:-top-[150px] min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px]">
      {/* Desktop / large screens: SVG background */}
      <BackgroundShape
        viewBox={BACKGROUND_SHAPES.FEATURES.viewBox}
        path={BACKGROUND_SHAPES.FEATURES.path}
        fill="white"
        className="hidden lg:flex"
      />

      {/* Tablet / mobile: soft white background card */}
      <MobileBackgroundCard />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <HeadingText
            as="h1"
            variant="h1"
            title="Create Your Own Ai Generated Children's Book!"
            className="font-bold max-w-5xl mx-auto mt-2 sm:mt-4 md:mt-6 lg:mt-8 mb-3 sm:mb-4 md:mb-6 lg:mb-8"
            glyphs={[
              {
                word: "Your",
                position: 1,
                variant: "blue1",
                glyphSizeClassName:
                  "w-[0.6em] h-[0.6em] sm:w-[0.5em] sm:h-[0.5m] md:w-[0.6em] md:h-[0.6em] ",
              },
              {
                word: "Own",
                position: 0,
                variant: "blue2",
                glyphSizeClassName:
                  "w-[0.9em] h-[0.9em] sm:w-[0.8em] sm:h-[0.8m] md:w-[0.9em] md:h-[0.9em]",
              },
            ]}
            coloredPhrases={[
              {
                text: "Your Own Ai",
                color: "text-primary",
              },
            ]}
            defaultTextColor="text-foreground"
            endl={["Generated"]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-4 xl:gap-6 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16">
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-4">
            {features.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className="text-center md:text-center lg:text-left"
              >
                <div className="flex justify-center md:justify-center lg:justify-start">
                  <Image
                    src={feature.icon}
                    alt={feature.iconAlt}
                    width={85}
                    height={85}
                    className="mb-2 sm:mb-3 md:mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-[85px] xl:h-[85px]"
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, (max-width: 1280px) 96px, 85px"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-heading-sm mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-xs md:text-body-sm lg:text-body-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center order-2 lg:order-0 my-4 sm:my-6 md:my-8 lg:my-0">
            <Image
              src="/images/book-illustration.svg"
              alt="Book Illustration"
              width={1240}
              height={883}
              className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-[1240px] h-auto object-contain"
              sizes="(max-width: 640px) 280px, (max-width: 768px) 384px, (max-width: 1024px) 448px, (max-width: 1280px) 512px, 1240px"
            />
          </div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 order-3 lg:order-0">
            {features.slice(3).map((feature) => (
              <div
                key={feature.id}
                className="text-center md:text-center lg:text-left"
              >
                <div className="flex justify-center md:justify-center lg:justify-start">
                  <Image
                    src={feature.icon}
                    alt={feature.iconAlt}
                    width={85}
                    height={85}
                    className="mb-2 sm:mb-3 md:mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-[85px] xl:h-[85px]"
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, (max-width: 1280px) 96px, 85px"
                  />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-heading-sm mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-xs md:text-body-sm lg:text-body-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
