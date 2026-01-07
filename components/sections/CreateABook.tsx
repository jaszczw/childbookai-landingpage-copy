import Image from "next/image";
import { AppButton } from "@/components/shared/AppButton";
import { settings } from "@/lib/data/settings";
import { kids } from "@/lib/data/kids";
import { IMAGE_DIMENSIONS, ASPECT_RATIOS, SCALE } from "@/lib/constants";
import { BackgroundShape } from "@/components/shared/BackgroundShape";
import HeadingText from "../typography/HeadingText";
import { ParagraphText } from "../typography/ParagraphText";

export function CreateABook() {
  return (
    <section className="relative w-full py-8 sm:py-10 md:py-12 lg:py-16 min-h-[400px] sm:min-h-[500px]">
      {/* Desktop / large screens: SVG background */}
      <BackgroundShape
        viewBox="0 0 1440 720"
        path="M1440 80.0008C1440 34.8075 1402.59 -1.41424 1357.42 0.0424087L77.4214 41.3202C34.2648 42.7119 0 78.0997 0 121.279V948.643C0 991.531 33.8195 1026.79 76.6696 1028.57L1356.67 1081.91C1402.12 1083.8 1440 1047.47 1440 1001.98V80.0008Z"
        fill="white"
        className="hidden lg:flex"
      />

      {/* Tablet / mobile: soft white background card */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none lg:hidden">
        <div className="w-full h-[97%] rounded-[40px] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.14)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-8 sm:p-10 md:p-12 lg:pt-16">
        <div className="text-center mb-4 sm:mb-8">
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

          <ParagraphText
            variant="text"
            className="text-center mt-1 font-semibold"
            defaultTextColor="text-foreground"
            coloredPhrases={[
              {
                text: "1/4",
                color: "text-primary",
              },
            ]}
          >
            Choose character options 1/4
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
                    className="text-foreground flex-1 text-left lg:text-left text-center wrap-break-word"
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
              />
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
              <button className="flex items-center gap-4 sm:gap-5 cursor-pointer hover:opacity-80 transition-opacity min-h-[44px] touch-manipulation">
                <ParagraphText
                  as="span"
                  variant="body-sm"
                  className="text-foreground flex-1 text-center lg:text-right wrap-break-word lg:order-1 whitespace-pre-line"
                  defaultTextColor="text-foreground"
                  coloredPhrases={[
                    {
                      text: "Sign Up",
                      color: "text-primary",
                    },
                  ]}
                >
                  {`Sign Up and use your\nphoto`}
                </ParagraphText>
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
          />
        </div>
      </div>
    </section>
  );
}
