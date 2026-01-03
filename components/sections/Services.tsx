import Image from "next/image";
import { DecorativeText } from "@/components/typography/DecorativeText";
import { services } from "@/lib/data/services";
import { BackgroundShape } from "@/components/shared/BackgroundShape";

export function Services() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 min-h-[400px] sm:min-h-[500px]">
      <BackgroundShape
        viewBox="0 0 1440 734"
        path="M0 80.0009C0 34.8076 37.4087 -1.41418 82.5785 0.0424697L1362.58 41.3203C1405.74 42.712 1440 78.0997 1440 121.279V600.643C1440 643.531 1406.18 678.789 1363.33 680.574L83.3304 733.907C37.8803 735.801 0 699.466 0 653.977V80.0009Z"
        fill="white"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-8 md:mb-10">
          <h1 className="text-heading-xl">
            <span className="inline-flex items-baseline flex-wrap justify-center gap-1">
              <span className="text-foreground">We&nbsp;</span>
              <DecorativeText
                text="offer"
                replace={[
                  { pattern: "o", variant: "blue2", occurrence: 1, size: { width: 40, height: 40 } }
                ]}
                className="text-primary"
              />
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 py-8 sm:py-10 md:py-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-6 sm:mb-8">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                />
              </div>

              <h3 className="text-heading-md font-bold text-foreground mb-3 sm:mb-4 max-w-[300x]">
                {service.title}
              </h3>

              <p className="text-foreground text-body-sm leading-relaxed px-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

