import Image from "next/image";
import styles from "./Sections.module.css";
import { steps } from "@/lib/data/steps";
import { IMAGE_DIMENSIONS, SPACING } from "@/lib/constants";
import { HeadingText } from "../typography/HeadingText";

export function Steps() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 mt-12 sm:mt-20 md:mt-28 lg:mt-36 min-h-[400px] sm:min-h-[500px]">
      {/* Dashed lines background - full screen width */}
      <div
        className="absolute left-0 right-0 hidden lg:flex items-center justify-center pointer-events-none z-0"
        style={{
          top: "52%",
          transform: `translateY(-${SPACING.STEP_COLUMN_OFFSET})`,
        }}
      >
        <Image
          src="/background/combined-stroke.svg"
          alt=""
          width={IMAGE_DIMENSIONS.COMBINED_STROKE.width}
          height={IMAGE_DIMENSIONS.COMBINED_STROKE.height}
          className="w-full h-auto object-contain"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 max-w-[800px] mx-auto">
          <HeadingText
            variant="h1"
            title="Creating Your Magical Story in a Easy as 1-2-3"
            className="font-bold "
            glyphs={[
              {
                word: "Your",
                position: 1,
                variant: "white1",
              },
              {
                word: "Story",
                position: 2,
                variant: "blue2",
              },
            ]}
            coloredPhrases={[
              {
                text: "Magical Story",
                color: "text-primary",
              },
            ]}
            defaultTextColor="text-white"
            glyphSizeClassName="w-[0.6em] h-[0.6em] sm:w-[0.5em] sm:h-[0.5m] md:w-[0.6em] md:h-[0.6em]"
          />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 py-8 sm:py-10 md:py-12 md:justify-items-center">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`relative z-10 flex flex-col items-center text-center ${
                step.id === 2 ? styles.stepColumnOffset : ""
              } ${
                step.id === 3 ? "md:col-span-2 md:justify-self-center lg:col-span-1" : ""
              }`}
            >
              <div
                className={`relative mb-4 sm:mb-6 ${
                  step.id === 2
                    ? "w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
                    : "w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
                />
              </div>

              <h3 className="text-heading-md font-bold text-white mb-3 sm:mb-4 max-w-[275px] mx-auto">
                {step.title}
              </h3>

              <p className="text-white text-body max-w-[270px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
