"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AppButton } from "@/components/shared/AppButton";
import { Sparkle } from "@/components/shared/Sparkle";
import { DecorativeText } from "@/components/typography/DecorativeText";
import styles from "./Sections.module.css";

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
      <div className={`${styles.maskedCarousel} relative w-full`}>
        {/* Background Image */}
        <Image
          src={slides[active].src}
          alt={slides[active].alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-1/2 left-4 sm:left-8 md:left-[140px] -translate-y-[56%] max-w-[620px] px-4 sm:px-0 w-[calc(100%-2rem)] sm:w-auto overflow-hidden">
            <h1 className="text-display text-primary mb-6 sm:mb-10 leading-tight text-4xl sm:text-5xl md:text-display">
              <span className="block">
                <DecorativeText
                  text="Become the"
                  replace={[{ pattern: "o", variant: "blue1", occurrence: 1 }]}
                  className="inline-flex items-baseline gap-[2px]"
                />
              </span>
              <span className="block">
                <span className="inline-flex items-baseline gap-2">
                  <DecorativeText
                    text="hero"
                    replace={[
                      { pattern: "o", variant: "blue2", occurrence: 1 },
                    ]}
                  />
                  <span className="text-white">of your own</span>
                </span>
              </span>

              <span className="block text-white">story</span>
            </h1>

            <AppButton
              variant="hero"
              size="lg"
              leading={<Sparkle />}
              trailing={<Sparkle />}
            >
              Create a Book
            </AppButton>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute left-4 sm:left-8 md:left-[140px] top-1/2 translate-y-[200px] z-10 flex items-center gap-3 max-w-full overflow-hidden">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`
        transition-all duration-300 rounded-full
        ${index === active ? "w-6 h-3 bg-primary" : "w-3 h-3 bg-primary/50"}
      `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
