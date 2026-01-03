"use client";

import Image from "next/image";
import { features } from "@/lib/data/features";

export function Features() {
  return (
    <section
      className="relative w-full overflow-hidden py-32 -top-[150px]"
      style={{ aspectRatio: "1440/1061" }}
    >
      <svg
        className="absolute inset-0 z-0 w-full h-full"
        viewBox="0 0 1440 1061"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <path
          d="M600.5 42.0822C597.627 0.379421 529.984 10.3904 523 42.0822C505.763 23.3879 482.394 34.6982 480 46.0825C464 23.5825 425.536 44.0678 421.945 62.6423C360.18 20.9395 317.207 51.2579 303.441 71.6299C287.641 64.4398 277.706 74.6258 274.713 80.6175C271.84 56.171 251.97 58.448 242.394 62.6423C235.212 29.5677 216.872 36.5908 205.5 42.5825C199.198 32.3907 181.347 39.5825 181.347 50.0595C154.055 39.9933 124 62.6423 127 80.6175C116.945 73.4274 108.5 80.6175 108.5 91.5825C101.318 85.8304 84 94.5825 79.5 111.583C76 97.0825 65.5 87.0825 48 94.5825C48 58.0825 12.5 35.0825 0 39.2743V980.747C0 1025.8 37.1859 1061.97 82.2214 1060.72L1362.22 1025.16C1405.52 1023.96 1440 988.509 1440 945.191V59.0472C1382.54 7.27818 1306.5 32.0825 1287.38 66.2373C1224 46.0825 1208 100.583 1224 132.583C1208.2 132.583 1198.2 147.126 1201.2 156.114C1190 139.583 1172.84 142.583 1170.5 152.583C1179.33 114.834 1148 110.083 1136.56 118.366C1131 98.5825 1106.5 99.5825 1099.5 115.583C1066 84.0825 1009 106.083 1001 132.583C1003.87 95.1938 982.5 82.5825 966 89.0825C962.5 59.5825 930.5 56.0825 918 73.5825C918 51.5822 903 46.5825 894.5 51.5822C888 -9.41752 824.5 -5.41748 797.5 10.5824C786.5 -5.91752 764.5 -0.917629 760.5 10.5823C724.59 1.95403 713.803 21.299 715 39.2743C704.945 36.3983 680.288 47.388 675.5 51.5822C658.263 40.078 637.084 50.2888 630.5 55.0822C623.318 37.8259 609 34.5822 600.5 42.0822Z"
          fill="white"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-heading-xl max-w-5xl mx-auto mt-4 sm:mt-6 md:mt-8">
            <span className="inline-flex items-baseline flex-wrap justify-center gap-1 sm:gap-2">
              <span className="text-foreground">Create</span>
              <span className="text-primary">Your Own Ai</span>
            </span>
          </h1>
          <h1 className="text-heading-xl max-w-5xl mx-auto mb-4 sm:mb-6 md:mb-8">
            <span className="text-foreground inline-flex items-baseline flex-wrap justify-center gap-1 sm:gap-2">
              Generated Children&apos;s Book!
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-4 mt-8 sm:mt-12 md:mt-16">
          <div className="space-y-6 sm:space-y-8">
            {features.slice(0, 3).map((feature) => (
              <div key={feature.id} className="text-left">
                <Image
                  src={feature.icon}
                  alt={feature.iconAlt}
                  width={85}
                  height={85}
                  className="mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[85px] lg:h-[85px]"
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 85px"
                />
                <h3 className="text-heading-sm font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-body-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center order-2 lg:order-none my-6 lg:my-0">
            <Image
              src="/images/book-illustration.svg"
              alt="Book Illustration"
              width={1240}
              height={883}
              className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-[1240px] h-auto object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
            />
          </div>

          <div className="space-y-6 sm:space-y-8 order-3 lg:order-none">
            {features.slice(3).map((feature) => (
              <div key={feature.id} className="text-left">
                <Image
                  src={feature.icon}
                  alt={feature.iconAlt}
                  width={85}
                  height={85}
                  className="mb-3 sm:mb-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[85px] lg:h-[85px]"
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 96px, 85px"
                />
                <h3 className="text-heading-sm font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-body-sm">
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
