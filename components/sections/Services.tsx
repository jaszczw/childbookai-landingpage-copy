import Image from "next/image";
import { services } from "@/lib/data/services";
import { BackgroundShape } from "@/components/shared/BackgroundShape";
import { HeadingText } from "../typography/HeadingText";
import { ParagraphText } from "../typography/ParagraphText";

export function Services() {
  return (
    <section className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Desktop / large screens: SVG background */}
      <BackgroundShape
        viewBox="0 0 1440 734"
        path="M0 80.0009C0 34.8076 37.4087 -1.41418 82.5785 0.0424697L1362.58 41.3203C1405.74 42.712 1440 78.0997 1440 121.279V600.643C1440 643.531 1406.18 678.789 1363.33 680.574L83.3304 733.907C37.8803 735.801 0 699.466 0 653.977V80.0009Z"
        fill="white"
        className="hidden lg:flex"
      />

      {/* Tablet / mobile: soft white background card */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none lg:hidden">
        <div className="w-full h-[97%] rounded-[40px] bg-white shadow-[0_18px_60px_rgba(15,23,42,0.14)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 ">
        <div className="text-center mb-4 sm:mb-8 md:mb-10">
          <HeadingText
            variant="h1"
            title="We offer"
            className="font-bold "
            glyphs={[
              {
                word: "Offer",
                position: 0,
                variant: "blue2",
              },
            ]}
            coloredPhrases={[
              {
                text: "Offer",
                color: "text-primary",
              },
            ]}
            defaultTextColor="text-foreground"
            glyphSizeClassName="w-[0.9em] h-[0.9em] sm:w-[0.8em] sm:h-[0.8m] md:w-[0.9em] md:h-[0.9em]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 pb-8 sm:pb-10 md:pb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-40 h-40 mobile:w-48 mobile:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 mb-4 sm:mb-6">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 475px) 160px, (max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                />

                {/* Ellipse decorations based on column */}
                {service.id === 1 && (
                  <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-2 lg:right-2 -rotate-24 flex items-center justify-center pointer-events-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/illustrations/Ellipse 4.svg"
                      alt=""
                      className="w-10 h-16 sm:w-14 sm:h-24 md:w-[56px] md:h-[100px] object-contain"
                    />
                  </div>
                )}
                {service.id === 2 && (
                  <>
                    <div className="absolute -bottom-3 -left-4 sm:-bottom-6 sm:-left-2 lg:left-2 rotate-18 flex items-center justify-center pointer-events-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/illustrations/Ellipse 5.svg"
                        alt=""
                        className="w-6 h-12 sm:w-8 sm:h-16 md:w-[30px] md:h-[66px] object-contain"
                      />
                    </div>
                    <div className="absolute -bottom-6 -right-14 rotate-4 sm:-bottom-10 sm:-right-12 md:-bottom-8 md:-right-10 md:rotate-26 lg:-bottom-16 lg:-right-2 lg:rotate-18 flex items-center justify-center pointer-events-none">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/illustrations/Ellipse 6.svg"
                        alt=""
                        className="w-20 h-16 sm:w-24 sm:h-20 md:w-[110px] md:h-[86px] object-contain"
                      />
                    </div>
                  </>
                )}
                {service.id === 3 && (
                  <div className="absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-2 md:-left-4 lg:-bottom-12 lg:left-10 xl:-bottom-12 xl:left-4 flex items-center justify-center pointer-events-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/illustrations/Ellipse 7.svg"
                      alt=""
                      className="w-28 h-10 sm:w-36 sm:h-14 md:w-[145px] md:h-[54px] lg:w-[120px] lg:h-[54px] xl:w-[145px] xl:h-[54px] object-contain"
                    />
                  </div>
                )}
                {service.id === 4 && (
                  <div className="absolute -bottom-10 -right-4 sm:-bottom-12 sm:-right-8 md:-right-6 lg:-right-4 -rotate-10 flex items-center justify-center pointer-events-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/illustrations/Ellipse 8.svg"
                      alt=""
                      className="sm:w-[180px] sm:h-[78px] md:w-[180px] md:h-[86px] lg:w-[180px] lg:h-[80px] xl:w-[180px] xl:h-[86px] object-contain"
                    />
                  </div>
                )}
              </div>

              <HeadingText
                variant="h3"
                title={service.title}
                className="font-semibold mb-3 sm:mb-4 max-w-[300px]"
                defaultTextColor="text-foreground"
                as="h3"
              />

              <ParagraphText
                variant="body-sm"
                className="text-foreground leading-relaxed px-2"
                defaultTextColor="text-foreground"
              >
                {service.description}
              </ParagraphText>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

