import Image from "next/image";
import { AppButton } from "@/components/shared/AppButton";
import { settings } from "@/lib/data/settings";
import { kids } from "@/lib/data/kids";
import { IMAGE_DIMENSIONS, ASPECT_RATIOS, SCALE } from "@/lib/constants";
import { BackgroundShape } from "@/components/shared/BackgroundShape";

export function CreateABook() {
  return (
    <section className="relative w-full py-8 sm:py-10 md:py-12 lg:py-16 min-h-[400px] sm:min-h-[500px]">
      <BackgroundShape
        viewBox="0 0 1440 720"
        path="M1440 80.0008C1440 34.8075 1402.59 -1.41424 1357.42 0.0424087L77.4214 41.3202C34.2648 42.7119 0 78.0997 0 121.279V948.643C0 991.531 33.8195 1026.79 76.6696 1028.57L1356.67 1081.91C1402.12 1083.8 1440 1047.47 1440 1001.98V80.0008Z"
        fill="white"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto pt-2 sm:pt-10 md:pt-12 lg:pt-16o">
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-heading-xl mb-4 sm:mb-5">
            <span className="inline-flex items-baseline flex-wrap justify-center gap-1">
              <span className="text-primary">Let&apos;s Create&nbsp;</span>
              <span className="text-foreground">a Book</span>
            </span>
          </h1>
          <p className="text-heading-sm text-foreground">
            <span className="inline-flex items-baseline flex-wrap justify-center gap-1">
              <span className="text-foreground">
                Choose character options&nbsp;
              </span>
              <span className="text-primary">1/4</span>
            </span>
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* First Column - Setting */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
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
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                    <Image
                      src={setting.image}
                      alt={setting.label}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 64px, 80px"
                    />
                  </div>
                  <span className="text-body text-foreground flex-1 text-left wrap-break-word">
                    {setting.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Second Column - Book Preview */}
          <div className="flex flex-col items-center justify-center order-1 lg:order-2 pb-8 mb-4 sm:mb-0">
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl aspect-4/3 overflow-visible">
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
          <div className="flex flex-col justify-center order-3">
            <h2 className="text-heading-md text-foreground mb-4 sm:mb-6 text-right">
              Kid photo
            </h2>
            <div className="flex flex-col gap-3 sm:gap-4">
              {kids.map((kid) => (
                <button
                  key={kid.id}
                  className="flex items-center gap-3 sm:gap-4 cursor-pointer hover:opacity-80 transition-opacity min-h-[44px] touch-manipulation"
                  aria-label={`Select ${kid.name}`}
                >
                  <span className="text-body text-foreground flex-1 text-right wrap-break-word lg:order-1">
                    {kid.name}
                  </span>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 lg:order-2">
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
              <button className="flex items-center gap-4 sm:gap-5  cursor-pointer hover:opacity-80 transition-opacity min-h-[44px] touch-manipulation">
                <span className="text-body text-foreground flex-1 text-right wrap-break-word lg:order-1">
                  <span>
                    <span className="text-primary">Sign Up</span> &nbsp;use your
                  </span>
                  <br />
                  your photo
                </span>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 lg:order-2">
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
