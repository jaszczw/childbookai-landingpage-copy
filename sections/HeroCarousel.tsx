"use client";

import { useEffect, useState, useRef, memo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CarouselMask, CarouselMaskMobile, DecorativeElements } from "@/shared";
import { heroCarouselDecorations } from "@/lib/data/heroCarousel";
import { CAROUSEL_CONFIG } from "@/constants";
import { HERO_SLIDES } from "@/constants/hero";
import { NavigationDots } from "@/sections/hero/NavigationDots";
import { HeroSlideContent, HeroSlideContentMobile } from "@/sections/hero/HeroSlideContent";
import { HeroSlideImage } from "@/sections/hero/HeroSlideImage";

function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [animationFinished, setAnimationFinished] = useState(false);

  const autoplay = useRef(
    Autoplay({
      delay: CAROUSEL_CONFIG.AUTO_PLAY_INTERVAL,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      duration: 30,
    },
    [autoplay.current]
  );

  useEffect(() => {
    if (!emblaApi) return;
    autoplay.current?.play?.();
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Visibility handling
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

  useEffect(() => {
    const seen = new Set<string>();
    for (const slide of HERO_SLIDES) {
      const src = slide.src.src;
      if (seen.has(src)) continue;
      seen.add(src);
      const img = new window.Image();
      img.src = src;
    }
  }, []);

  return (
    <section className="relative w-full mt-4 px-0" aria-label="Hero carousel" role="region">
      {/* Desktop / tablet hero frame */}
      <div className="relative hidden md:block w-full aspect-1264/629 max-h-[640px] mx-auto overflow-hidden">
        <CarouselMask />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "url(#carouselMask)" }}
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Hidden Embla container */}
          <div ref={emblaRef} className="absolute inset-0 opacity-0 pointer-events-none">
            <div className="flex h-full">
              {HERO_SLIDES.map((slide) => (
                <div key={slide.id} className="relative flex-[0_0_100%] h-full" aria-hidden={true} />
              ))}
            </div>
          </div>

          <HeroSlideImage
            active={active}
            slides={HERO_SLIDES}
            onAnimationComplete={() => setAnimationFinished(true)}
            clipPathUrl="#carouselMask"
          />

          {animationFinished && (
            <div className="absolute inset-0 z-10 flex items-center pt-4 sm:pt-0 overflow-visible">
              <HeroSlideContent
                title={HERO_SLIDES[active]?.title || ""}
              />
            </div>
          )}

          <DecorativeElements decorations={heroCarouselDecorations} />

          {animationFinished && (
            <div className="absolute inline-flex left-12 md:left-16 lg:left-22 xl:left-[120px] top-1/2 translate-y-[140px] lg:translate-y-[180px] xl:translate-y-[210px] z-10 items-center gap-3 max-w-full overflow-hidden">
              <NavigationDots
                count={HERO_SLIDES.length}
                active={active}
                onSelect={(index) => emblaApi?.scrollTo(index)}
                className="flex items-center gap-3"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile hero frame */}
      <div className="relative block md:hidden w-full aspect-1240/700 mx-0 overflow-hidden">
        <CarouselMaskMobile />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "url(#carouselMaskMobile)" }}
          aria-live="polite"
          aria-atomic="true"
        >
          <HeroSlideImage
            active={active}
            slides={HERO_SLIDES}
            onAnimationComplete={() => setAnimationFinished(true)}
            clipPathUrl="#carouselMaskMobile"
          />

          {animationFinished && (
            <div className="absolute inset-0 z-10 flex items-center pt-4 overflow-visible">
              <HeroSlideContentMobile
                title={HERO_SLIDES[active]?.title || ""}
                active={active}
                onSelect={(index) => emblaApi?.scrollTo(index)}
                slidesCount={HERO_SLIDES.length}
                NavigationDots={NavigationDots}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const MemoizedHeroCarousel = memo(HeroCarousel);
export { MemoizedHeroCarousel as HeroCarousel };
export default MemoizedHeroCarousel;
