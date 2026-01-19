"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef, memo } from "react";
import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AppButton, CarouselMask, DecorativeElements } from "@/components/shared";
import { HeadingText } from "@/components/typography";
import { heroCarouselDecorations } from "@/lib/data";
import { CAROUSEL_CONFIG } from "@/lib/constants";
import { heroText, staggerContainer, fadeInUp } from "@/lib/utils/animations";

// Move slides outside component to prevent recreation on each render
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
] as const;

function HeroCarousel() {
  const [active, setActive] = useState(0);

  // Stable autoplay plugin instance so it doesn't get recreated on every render
  const autoplay = useRef(
    Autoplay({
      delay: CAROUSEL_CONFIG.AUTO_PLAY_INTERVAL,
      // Keep autoplay running even after user interactions or leaving viewport
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: 30, // higher = smoother/slower
    },
    [autoplay.current]
  );

  useEffect(() => {
    if (!emblaApi) return;

    // Ensure autoplay starts when Embla is ready
    autoplay.current?.play?.();

    const onSelect = () => {
      setActive(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Restart autoplay when tab/window becomes active again
  useEffect(() => {
    if (!emblaApi) return;

    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        autoplay.current?.reset?.();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
    };
  }, [emblaApi]);

  // Handle keyboard navigation for carousel
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    }
  }, [emblaApi]);

  // Handle arrow key navigation
  useEffect(() => {
    const handleArrowKeys = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi?.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi?.scrollNext();
      }
    };

    window.addEventListener("keydown", handleArrowKeys);
    return () => window.removeEventListener("keydown", handleArrowKeys);
  }, [emblaApi]);

  return (
    <section 
      className="relative w-full"
      aria-label="Hero carousel"
      role="region"
    >
      {/* Ratio-controlled hero frame */}
      <div className="relative w-full aspect-1264/629 max-h-[640px] mx-auto">
        <CarouselMask />

        {/* Masked image layer */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "url(#carouselMask)" }}
          aria-live="polite"
          aria-atomic="true"
        >
          <div ref={emblaRef} className="absolute inset-0">
            <div className="flex h-full">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="relative flex-[0_0_100%] h-full"
                  aria-hidden={index !== active}
                >
                  <Image
                    src={slide.src}
                    alt={`${slide.alt} - Slide ${index + 1} of ${slides.length}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="100vw"
                    quality={85}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />

                  {/* Slide content (headline + CTA) */}
                  <div className="absolute inset-0 z-10 flex items-center pt-4 sm:pt-0 overflow-visible">
                    <motion.div
                      className=" w-full max-w-[620px] p-2 sm:p-4 md:p-6 lg:p-6 ml-6 sm:ml-8 md:ml-10 lg:ml-16 xl:ml-[100px] overflow-visible"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.4 }}
                      variants={staggerContainer}
                    >
                      <motion.div variants={heroText}>
                        <HeadingText
                          title={slide.title}
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
                      </motion.div>
                      <motion.div className="overflow-visible pb-2 sm:pb-3" variants={fadeInUp}>
                        <Link href="/createbook">
                          <AppButton
                            variant="primary"
                            size="hero"
                            shadow
                            withSparkles
                            className="mt-2 sm:mt-4 transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
                          >
                            Create a Book
                          </AppButton>
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Decorative Elements - scoped to each slide */}
                  <DecorativeElements decorations={heroCarouselDecorations} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div 
            className="absolute hidden sm:inline-flex left-8 sm:left-12 md:left-16 lg:left-22 xl:left-[120px] top-1/2 translate-y-[66px] sm:translate-y-[110px] md:translate-y-[140px] lg:translate-y-[180px] xl:translate-y-[210px] z-10 items-center gap-2 sm:gap-3 max-w-full overflow-hidden"
            role="tablist"
            aria-label="Carousel navigation"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-label={`Go to slide ${index + 1} of ${slides.length}`}
                aria-selected={index === active}
                role="tab"
                tabIndex={index === active ? 0 : -1}
                style={{ transitionDuration: `${CAROUSEL_CONFIG.TRANSITION_DURATION}ms` }}
                className={`
                transition-all rounded-full touch-manipulation flex items-center justify-center
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
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
    </section>
  );
}

// Memoize component to prevent unnecessary re-renders
const MemoizedHeroCarousel = memo(HeroCarousel);

// Export both default and named for compatibility
export { MemoizedHeroCarousel as HeroCarousel };
export default MemoizedHeroCarousel;
