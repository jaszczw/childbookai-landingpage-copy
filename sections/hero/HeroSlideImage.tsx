"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface HeroSlideImageProps {
    active: number;
    slides: ReadonlyArray<{ id: number; src: StaticImageData; alt: string }>;
    onAnimationComplete: () => void;
    clipPathUrl: string;
}

const imageCrossfade = {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

export function HeroSlideImage({
    active,
    slides,
    onAnimationComplete,
    clipPathUrl,
}: HeroSlideImageProps) {
    const [loadedByIndex, setLoadedByIndex] = useState<Record<number, boolean>>({});
    const [shownIndex, setShownIndex] = useState(0);
    const introAnnouncedRef = useRef(false);

    useEffect(() => {
        if (!loadedByIndex[active]) return;

        const frame = requestAnimationFrame(() => {
            setShownIndex(active);
        });

        return () => cancelAnimationFrame(frame);
    }, [active, loadedByIndex]);

    const handleImageLoad = (index: number) => {
        setLoadedByIndex((prev) => ({ ...prev, [index]: true }));
        if (index === 0) {
            requestAnimationFrame(() => {
                if (introAnnouncedRef.current) return;
                introAnnouncedRef.current = true;
                onAnimationComplete();
            });
        }
    };

    return (
        <div className="absolute inset-0">
            {slides.map((slide, i) => (
                <motion.div
                    key={slide.id}
                    className="absolute inset-0"
                    style={{ clipPath: `url(${clipPathUrl})` }}
                    initial={false}
                    animate={{
                        opacity: shownIndex === i ? 1 : 0,
                        zIndex: shownIndex === i ? 1 : 0,
                    }}
                    transition={imageCrossfade}
                >
                    <Image
                        src={slide.src}
                        alt={`${slide.alt} - Slide ${i + 1} of ${slides.length}`}
                        fill
                        priority={i === 0}
                        className="object-cover"
                        sizes="100vw"
                        quality={85}
                        fetchPriority={i === 0 ? "high" : "auto"}
                        onLoad={() => handleImageLoad(i)}
                    />
                </motion.div>
            ))}
        </div>
    );
}
