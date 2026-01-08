"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AppButton } from "@/components/shared/AppButton";
import { CarouselMask } from "@/components/shared/CarouselMask";
import HeadingText from "../typography/HeadingText";

const slides = [
  {
    id: 1,
    src: "/images/child-studying-2 1.png",
    alt: "Child reading a book",
    title: "Become the hero of your own story",
  },
  {
    id: 2,
    src: "/images/child-reading-2.jpg",
    alt: "Child reading a book",
    title: "Become the hero of your own story",
  },
  {
    id: 3,
    src: "/images/child-studying-2 1.png",
    alt: "Child reading a book",
    title: "Become the hero of your own story",
  },
  {
    id: 4,
    src: "/images/child-reading-2.jpg",
    alt: "Child reading a book",
    title: "Become the hero of your own story",
  },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full">
      {/* Ratio-controlled hero frame */}
      <div className="relative w-full aspect-1264/629 max-h-[640px] mx-auto">
        <CarouselMask />

        {/* Masked image layer */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "url(#carouselMask)" }}
        >
          <Image
            src={slides[active].src}
            alt={slides[active].alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 z-10 flex items-center pt-4 sm:pt-0 overflow-visible">
            <div className=" w-full max-w-[620px] p-2 sm:p-4 md:p-6 lg:p-6 ml-6 sm:ml-8 md:ml-10 lg:ml-16 xl:ml-[100px] overflow-visible">
              <HeadingText
                title="Become the hero of your own story"
                variant="display"
                className="font-bold"
                glyphs={[
                  {
                    word: "Become",
                    position: 3,
                  },
                  {
                    word: "hero",
                    position: 3,
                    variant: "blue2",
                  },
                ]}
                coloredPhrases={[
                  {
                    text: "Become the hero",
                    color: "text-primary",
                  },
                ]}
                defaultTextColor="text-white"
                defaultGlyphVariant="blue1"
                glyphSizeClassName="w-[0.5em] h-[0.5em] sm:w-[0.5em] sm:h-[0.5em] md:w-[0.6em] md:h-[0.6em]"
                endl={["hero of your own", "story"]}
              />
              <div className="overflow-visible pb-2 sm:pb-3">
                <AppButton
                  variant="primary"
                  size="hero"
                  shadow
                  withSparkles
                  className="mt-2 sm:mt-4"
                >
                  Create a Book
                </AppButton>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute hidden sm:inline-flex left-8 sm:left-12 md:left-16 lg:left-22 xl:left-[120px] top-1/2 translate-y-[66px] sm:translate-y-[110px] md:translate-y-[140px] lg:translate-y-[180px] xl:translate-y-[210px] z-10 items-center gap-2 sm:gap-3 max-w-full overflow-hidden">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`
                transition-all duration-300 rounded-full touch-manipulation flex items-center justify-center
                ${
                  index === active
                    ? "w-4 h-1 sm:w-5 sm:h-2 md:w-6 md:h-3 lg:w-6 lg:h-3 bg-primary"
                    : "w-1 h-1 sm:w-2 sm:h-2 md:w-3 md:h-3 lg:w-3 lg:h-3 bg-primary/50"
                }
              `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
