import Image from "next/image";
import { AppButton } from "@/components/shared/AppButton";
import { settings } from "@/lib/data/settings";
import { kids } from "@/lib/data/kids";
import { IMAGE_DIMENSIONS, ASPECT_RATIOS, SCALE, CREATE_BOOK_CONFIG } from "@/lib/constants";
import { BackgroundShape } from "@/components/shared/BackgroundShape";
import { MobileBackgroundCard } from "@/components/shared/MobileBackgroundCard";
import HeadingText from "../typography/HeadingText";
import { ParagraphText } from "../typography/ParagraphText";
import { BACKGROUND_SHAPES } from "@/lib/constants/backgroundShapes";

export function CreateABook() {
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
        <div className="mb-4 sm:mb-8">
          <div className="absolute shrink-0 -top-4 right-12 sm:-top-7 lg:-top-16 sm:right-[80px] md:-top-9 md:right-[100px] lg:right-[160px] hidden min-[421px]:block" aria-hidden="true">
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
          </div>
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
        </div>

        {/* Responsive Layout: 
            - Mobile (xs): single column (all stacked)
            - Small/Medium (sm, md): two columns (first and third side by side, book preview full-width)
            - Large+ (lg): three columns (first | preview | third)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* First Column - Setting */}
          <div className="flex flex-col justify-center mt-6 md:mt-0 items-center md:items-start order-2 sm:order-2 lg:order-1">
            <h2 className="text-heading-md text-foreground mb-4 sm:mb-6 text-center lg:text-left">
              Setting
            </h2>
            <div className="flex flex-col gap-3 sm:gap-4">
              {settings.map((setting) => (
                <button
                  key={setting.id}
                  className="flex items-center gap-3 sm:gap-4 cursor-pointer hover:opacity-80 transition-opacity min-h-[44px] touch-manipulation"
                  aria-label={`Select ${setting.label}`}
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
                </button>
              ))}
            </div>
          </div>

          {/* Second Column - Book Preview */}
          <div className="flex flex-col items-center justify-center order-1 sm:order-1 lg:order-2 pb-8 mb-4 sm:mb-0 sm:col-span-2 lg:col-span-1">
            <div className="relative w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-md xl:max-w-xl aspect-4/3 overflow-visible">
              <Image
                src="/illustrations/Childrens_Book_Mockup_3.svg"
                alt="Book Preview"
                width={IMAGE_DIMENSIONS.BOOK_MOCKUP.width}
                height={IMAGE_DIMENSIONS.BOOK_MOCKUP.height}
                className="object-contain absolute inset-0 w-full h-full"
                style={{ transform: `scale(${SCALE.BOOK_MOCKUP})` }}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 50vw"
                loading="eager"
              />
              {/* Inner icon at bottom left */}
              <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-12 left-0 z-10" aria-hidden="true">
                <Image
                  src="/illustrations/inner-icon.svg"
                  alt=""
                  width={85}
                  height={83}
                  className="w-12 h-auto sm:w-14 md:w-16 lg:w-[72px] xl:w-20"
                  style={{ objectFit: "contain" }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Third Column - Kid Photo */}
          <div className="flex flex-col justify-center mt-6 lg:mt-0 items-center md:items-end order-3 sm:order-2 lg:order-3">
            <h2 className="text-heading-md text-foreground mb-4 sm:mb-6 text-center lg:text-right">
              Kid photo
            </h2>
            <div className="flex flex-col gap-3 sm:gap-4">
              {kids.map((kid) => (
                <button
                  key={kid.id}
                  className="flex items-center gap-3 sm:gap-4 cursor-pointer hover:opacity-80 transition-opacity min-h-[44px] touch-manipulation"
                  aria-label={`Select ${kid.name}`}
                >
                  <ParagraphText
                    as="span"
                    variant="body-sm"
                    className="text-foreground flex-1 text-center lg:text-right wrap-break-word lg:order-1"
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
                </button>
              ))}
              <button 
                className="relative flex items-center gap-4 sm:gap-5 cursor-pointer hover:opacity-80 transition-opacity min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
                aria-label="Sign up and use your photo"
              >
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
                <div className="absolute -bottom-6 md:-bottom-10 lg:-bottom-8 left-0 right-10 flex z-10 pointer-events-none" aria-hidden="true">
                  <Image
                    src="/illustrations/Ellipse 9.svg"
                    alt=""
                    width={180}
                    height={88}
                    className="w-28 h-auto sm:w-32 md:w-40 lg:w-36 xl:w-64"
                    aria-hidden="true"
                  />
                </div>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-16 lg:h-16 shrink-0 lg:order-2">
                  <Image
                    src="/illustrations/plus-icon.svg"
                    alt="Add photo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 64px, 80px"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Next Step Button */}
        <div className="flex justify-center">
          <AppButton
            size="md"
            shadow
            className="w-full sm:w-auto sm:min-w-[190px] text-heading-sm min-h-[44px] mt-4"
          >
            Next Step
          </AppButton>
        </div>
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
