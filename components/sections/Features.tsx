"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { features } from "@/lib/data";
import { HeadingText } from "@/components/typography";
import { SectionContainer } from "@/components/shared";
import { BACKGROUND_SHAPES } from "@/lib/constants";
import { scrollReveal, staggerContainerSlow, scaleIn, viewportOnce } from "@/lib/utils/animations";

export function Features() {
  return (
    <SectionContainer
      viewBox={BACKGROUND_SHAPES.FEATURES.viewBox}
      path={BACKGROUND_SHAPES.FEATURES.path}
      fill="white"
      sectionClassName="overflow-hidden py-12 sm:py-16 md:py-18 lg:py-32 pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32 -top-[50px] sm:-top-[80px] md:-top-[100px] lg:-top-[150px] min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px]"
      contentClassName="px-4 sm:px-6 lg:px-8 overflow-visible"
    >
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scrollReveal}
        >
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
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-4 xl:gap-6 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainerSlow}
        >
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-4">
            {features.slice(0, 3).map((feature) => (
              <motion.div
                key={feature.id}
                className="text-center md:text-center lg:text-left transition-transform duration-200 ease-out hover:-translate-y-1"
                variants={scrollReveal}
              >
                <motion.div
                  className="flex justify-center md:justify-center lg:justify-start"
                  variants={scaleIn}
                >
                  <Image
                    src={feature.icon}
                    alt={feature.iconAlt}
                    width={85}
                    height={85}
                    className="mb-2 sm:mb-3 md:mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-[85px] xl:h-[85px]"
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, (max-width: 1280px) 96px, 85px"
                  />
                </motion.div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-heading-sm mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-xs md:text-body-sm lg:text-body-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex items-end justify-center md:items-end md:justify-center lg:items-end lg:justify-center order-2 lg:order-0 my-4 sm:my-6 md:my-8 lg:my-0"
            variants={scaleIn}
          >
            <div className="relative inline-block">
              <Image
                src="/images/pirate-book.svg"
                alt="Book Illustration"
                width={1240}
                height={883}
                className="relative z-10 w-full max-w-[240px] sm:max-w-[320px] md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-[1240px] h-auto object-contain"
                sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, (max-width: 1024px) 448px, (max-width: 1280px) 512px, 1240px"
              />
              <motion.div
                className="absolute -top-6 md:-top-16 lg:-top-48 left-1/2 -translate-x-1/2 z-0 w-18 sm:w-20 md:w-36 lg:w-64"
                initial={{ x: 0, rotate: 0, scale: 1 }}
                animate={{ x: [-10, 10, -10], rotate: [-5, 5, -5], scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/illustrations/parachute.svg"
                  alt="Parachute"
                  width={150}
                  height={150}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 192px, (max-width: 1280px) 256px, 150px"
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 order-3 lg:order-0">
            {features.slice(3).map((feature) => (
              <motion.div
                key={feature.id}
                className="text-center md:text-center lg:text-left transition-transform duration-200 ease-out hover:-translate-y-1"
                variants={scrollReveal}
              >
                <motion.div
                  className="flex justify-center md:justify-center lg:justify-start"
                  variants={scaleIn}
                >
                  <Image
                    src={feature.icon}
                    alt={feature.iconAlt}
                    width={85}
                    height={85}
                    className="mb-2 sm:mb-3 md:mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-[85px] xl:h-[85px]"
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, (max-width: 1280px) 96px, 85px"
                  />
                </motion.div>
                <h3 className="text-sm sm:text-base md:text-lg lg:text-heading-sm mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-xs md:text-body-sm lg:text-body-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
    </SectionContainer>
  );
}
