"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { AppButton, InnerIconButton } from "@/components/shared";
import { settings, kids } from "@/lib/data";
import { IMAGE_DIMENSIONS, ASPECT_RATIOS, SCALE, CREATE_BOOK_CONFIG, BACKGROUND_SHAPES } from "@/lib/constants";
import { BackgroundShape, MobileBackgroundCard } from "@/components/shared";
import { HeadingText, ParagraphText } from "@/components/typography";
import { scrollReveal, scrollRevealLeft, scrollRevealRight, staggerContainer, scaleIn, viewportOnce } from "@/lib/utils/animations";

export function CreateABook() {
  const [isBookMockupActive, setIsBookMockupActive] = useState(false);

  const handleInnerIconClick = () => {
    setIsBookMockupActive((prev) => !prev);
  };
  return (
    <section className="relative w-full py-8 sm:py-10 md:py-12 lg:py-16 min-h-[400px] sm:min-h-[500px]">
      {/* Desktop / large screens: SVG background */}
      <BackgroundShape
        viewBox={BACKGROUND_SHAPES.CREATE_BOOK.viewBox}
        path={BACKGROUND_SHAPES.CREATE_BOOK.path}
        fill="white"
        className="hidden lg:flex"
      />

      {/* Tablet / mobile: soft white background card */}
      <MobileBackgroundCard />

      <div className="relative z-10 max-w-7xl mx-auto p-8 sm:p-10 md:p-12 lg:pt-16">
        <motion.div
          className="mb-4 sm:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scrollReveal}
        >
          <motion.div
            className="absolute shrink-0 -top-4 right-12 sm:-top-7 lg:-top-16 sm:right-[80px] md:-top-9 md:right-[100px] lg:right-[160px] hidden min-[421px]:block"
            aria-hidden="true"
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Image
              src="/illustrations/bookmark.svg"
              alt=""
              width={63}
              height={171}
              className="w-8 h-auto sm:w-10 md:w-12 lg:w-14 xl:w-16"
              style={{ objectFit: "contain" }}
              priority
              aria-hidden="true"
            />
          </motion.div>
          <div className="relative flex items-start justify-center gap-2 sm:gap-3 md:gap-4 mb-2">
            <div className="text-center flex-1">
              <HeadingText
                variant="h1"
                title="Let's Create a Book"
                className="font-bold "
                glyphs={[
                  {
                    word: "Book",
                    position: 1,
                    variant: "black1",
                  },
                  {
                    word: "Book",
                    position: 2,
                    variant: "black1",
                  },
                ]}
                coloredPhrases={[
                  {
                    text: "a Book",
                    color: "text-foreground",
                  },
                ]}
                defaultTextColor="text-primary"
                glyphSizeClassName="w-[0.5em] h-[0.5em] sm:w-[0.5em] sm:h-[0.5em] md:w-[0.6em] md:h-[0.6em]"
              />
            </div>
          </div>

          <ParagraphText
            variant="text"
            className="text-center mt-1 font-semibold"
            defaultTextColor="text-foreground"
            coloredPhrases={[
              {
                text: CREATE_BOOK_CONFIG.CURRENT_STEP,
                color: "text-primary",
              },
            ]}
          >
            {CREATE_BOOK_CONFIG.STEP_TEXT} {CREATE_BOOK_CONFIG.CURRENT_STEP}
          </ParagraphText>
        </motion.div>

        {/* Responsive Layout: 
            - Mobile (xs): single column (all stacked)
            - Small/Medium (sm, md): two columns (first and third side by side, book preview full-width)
            - Large+ (lg): three columns (first | preview | third)
        */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 mb-6 sm:mb-8 overflow-visible"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {/* First Column - Setting */}
          <motion.div
            className="flex flex-col justify-center mt-6 md:mt-0 items-center md:items-start order-2 sm:order-2 lg:order-1 overflow-visible relative z-10 mx-auto sm:mx-0"
            variants={scrollRevealLeft}
          >
            <h2 className="text-heading-md text-foreground mb-4 sm:mb-6 text-center lg:text-left">
              Setting
            </h2>
            <div className="flex flex-col gap-3 sm:gap-4 w-full overflow-visible">
              {settings.map((setting) => (
                <motion.button
                  key={setting.id}
                  className="flex items-center gap-3 sm:gap-4 cursor-pointer hover:opacity-80 min-h-[44px] touch-manipulation w-full overflow-visible"
                  aria-label={`Select ${setting.label}`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ willChange: "transform" }}
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20 shrink-0">
                    <Image
                      src={setting.image}
                      alt={setting.label}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                  </div>
                  <ParagraphText
                    as="span"
                    variant="body-sm"
                    className="text-foreground flex-1 text-left  wrap-break-word"
                    defaultTextColor="text-foreground"
                  >
                    {setting.label}
                  </ParagraphText>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Second Column - Book Preview */}
          <motion.div
            className="flex flex-col items-center justify-center order-1 sm:order-1 lg:order-2 pb-8 mb-4 sm:mb-0 sm:col-span-2 lg:col-span-1 relative z-0"
            variants={scaleIn}
          >
            <div className="relative w-full max-w-[300px] sm:max-w-md md:max-w-xl lg:max-w-md xl:max-w-xl aspect-4/3 overflow-visible z-0">
              <Image
                key={isBookMockupActive ? "mockup-4" : "mockup-3"}
                src={isBookMockupActive ? "/images/Childrens_Book_Mockup_4.svg" : "/images/Childrens_Book_Mockup_3.svg"}
                alt="Book Preview"
                width={isBookMockupActive ? IMAGE_DIMENSIONS.BOOK_MOCKUP_4.width : IMAGE_DIMENSIONS.BOOK_MOCKUP_3.width}
                height={isBookMockupActive ? IMAGE_DIMENSIONS.BOOK_MOCKUP_4.height : IMAGE_DIMENSIONS.BOOK_MOCKUP_3.height}
                className="object-contain absolute inset-0 w-full h-full z-0 transition-all duration-300 ease-in-out"
                style={{
                  transform: isBookMockupActive
                    ? `scale(${SCALE.BOOK_MOCKUP * 1.06}) translateY(8px)`
                    : `scale(${SCALE.BOOK_MOCKUP})`,
                }}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                loading="eager"
              />
              {/* Inner icon at bottom left */}
              <div
                className="absolute -bottom-6 sm:-bottom-8 md:-bottom-12 left-0 z-10"
              >
                <InnerIconButton
                  onClick={handleInnerIconClick}
                  active={isBookMockupActive}
                  width={85}
                  height={83}
                  imageClassName="w-12 h-auto sm:w-14 md:w-16 lg:w-[72px] xl:w-20"
                  ariaLabel="Toggle book preview"
                />
              </div>
            </div>
          </motion.div>

          {/* Third Column - Kid Photo */}
          <motion.div
            className="flex flex-col justify-center mt-6 lg:mt-0 items-center sm:items-center md:items-end order-3 sm:order-2 lg:order-3 overflow-visible mx-auto sm:mx-0"
            variants={scrollRevealRight}
          >
            <h2 className="text-heading-md text-foreground mb-4 sm:mb-6 text-center lg:text-right">
              Kid photo
            </h2>
            <div className="flex flex-col gap-3 sm:gap-4 w-full overflow-visible">
              {kids.map((kid) => (
                <motion.button
                  key={kid.id}
                  className="flex items-center gap-3 sm:gap-4 cursor-pointer hover:opacity-80 min-h-[44px] touch-manipulation w-full overflow-visible"
                  aria-label={`Select ${kid.name}`}
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ willChange: "transform" }}
                >
                  <ParagraphText
                    as="span"
                    variant="body-sm"
                    className="text-foreground flex-1 text-right wrap-break-word lg:order-1"
                    defaultTextColor="text-foreground"
                  >
                    {kid.name}
                  </ParagraphText>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20 shrink-0 lg:order-2">
                    <Image
                      src={kid.image}
                      alt={kid.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                  </div>
                </motion.button>
              ))}
              <div className="relative flex items-center gap-4 sm:gap-5 min-h-[44px] w-full overflow-visible">
                <div className="relative flex-1 text-right lg:order-1">
                  <ParagraphText
                    as="span"
                    variant="body-sm"
                    className="text-foreground wrap-break-word whitespace-pre-line"
                    defaultTextColor="text-foreground"
                    coloredPhrases={[
                      {
                        text: "Sign Up",
                        color: "text-primary",
                      },
                    ]}
                  >
                    {`Sign Up and use\nyour photo`}
                  </ParagraphText>
                </div>
                <div
                  className="absolute -bottom-6 md:-bottom-10 lg:-bottom-8 right-14 flex z-10 pointer-events-none"
                  aria-hidden="true"
                >
                  <Image
                    src="/illustrations/Ellipse 9.svg"
                    alt=""
                    width={180}
                    height={88}
                    className="w-28 h-auto sm:w-32 md:w-34 lg:w-36 xl:w-64"
                    aria-hidden="true"
                  />
                </div>
                <motion.button
                  className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 shrink-0 lg:order-2 focus:outline-none"
                  aria-label="Sign up and use your photo"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{ willChange: "transform" }}
                >
                  <Image
                    src="/illustrations/plus-icon.svg"
                    alt="Add photo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 64px, 80px"
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Next Step Button */}
        <motion.div
          className="flex justify-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scrollReveal}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <AppButton
              size="md"
              shadow
              className="w-full sm:w-auto sm:min-w-[190px] text-heading-sm min-h-[44px] mt-4"
            >
              Next Step
            </AppButton>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-1 w-full max-w-full overflow-hidden"
        style={{
          transform: "translateY(35%)",
        }}
      >
        <div
          className="relative w-full mx-auto"
          style={{ aspectRatio: ASPECT_RATIOS.FOOTER_BG, maxWidth: "100%" }}
        >
          <Image
            src="/background/inverted-cloud.svg"
            alt=""
            fill
            className="object-contain"
            priority
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
