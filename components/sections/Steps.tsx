"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Sections.module.css";
import { steps } from "@/lib/data";
import { IMAGE_DIMENSIONS, SPACING, STEP_IDS } from "@/lib/constants";
import { HeadingText } from "@/components/typography";
import { scaleIn } from "@/lib/utils/animations";
import {
  AnimatedDashedLine,
  AnimatedSparkleIcon,
  AnimatedSparkleIconSecond,
  AnimatedImageIcon,
  AnimatedImageIconSecond,
  AnimatedImageIconThird
} from "@/components/shared";

const DASHED_DURATION_SECONDS = 20;

export function Steps() {
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setCycleKey((prev) => prev + 1),
      DASHED_DURATION_SECONDS * 1000
    );

    return () => clearInterval(intervalId);
  }, []);
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 lg:py-24 mt-12 sm:mt-20 md:mt-28 lg:mt-36 min-h-[400px] sm:min-h-[500px]">
      {/* Dashed lines background - full screen width */}
      <div
        className="absolute left-0 right-0 hidden lg:flex items-center justify-center pointer-events-none z-0"
        style={{
          top: "52%",
          transform: `translateY(-${SPACING.STEP_COLUMN_OFFSET})`,
        }}
        aria-hidden="true"
      >
        <AnimatedDashedLine
          key={cycleKey}
          width={IMAGE_DIMENSIONS.COMBINED_STROKE.width}
          height={IMAGE_DIMENSIONS.COMBINED_STROKE.height}
          className="w-full h-auto object-contain"
          duration={DASHED_DURATION_SECONDS}
          fillColor="#54E6ED"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12 max-w-[800px] mx-auto"
        >
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
        </motion.div>

        <div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 py-8 sm:py-10 md:py-12 md:justify-items-center"
        >
          {steps.map((step) => (
            <div
              key={step.id}
              className={`relative z-10 flex flex-col items-center text-center ${
                step.id === STEP_IDS.SECOND ? styles.stepColumnOffset : ""
              } ${
                step.id === STEP_IDS.THIRD ? "md:col-span-2 md:justify-self-center lg:col-span-1" : ""
              }`}
            >
              {step.id === STEP_IDS.FIRST && (
                <div className="absolute lg:-left-8 xl:-left-28 lg:top-[32%] xl:top-[30%] z-10 pointer-events-none hidden lg:block" aria-hidden="true">
                  <AnimatedSparkleIcon
                    key={cycleKey}
                    width={60}
                    height={60}
                    className="lg:w-12 lg:h-12 xl:w-14 xl:h-14"
                    duration={2}
                    delay={2.5}
                    fillColor="#54E6ED"
                  />
                </div>
              )}
              {step.id === STEP_IDS.FIRST && (
                <div className="absolute lg:-right-18 xl:-right-16 lg:top-[40%] xl:top-[38%] z-10 pointer-events-none hidden lg:block" aria-hidden="true">
                  <AnimatedSparkleIcon
                    key={cycleKey}
                    width={40}
                    height={40}
                    className="lg:w-12 lg:h-12 xl:w-14 xl:h-14"
                    duration={1}
                    delay={7.4}
                    fillColor="#54E6ED"
                  />
                </div>
              )}
              {step.id === STEP_IDS.THIRD && (
                <div className="absolute lg:-left-20 xl:-left-32 lg:top-[22%] xl:top-[20%] z-10 pointer-events-none hidden lg:block" aria-hidden="true">
                  <AnimatedSparkleIconSecond
                    key={cycleKey}
                    width={60}
                    height={60}
                    className="lg:w-12 lg:h-12 xl:w-14 xl:h-14"
                    duration={1}
                    delay={11}
                    fillColor="#54E6ED"
                  />
                </div>
              )}
              {step.id === STEP_IDS.THIRD && (
                <div className="absolute lg:-right-4 xl:-right-22 lg:top-[32%] xl:top-[30%] z-10 pointer-events-none hidden lg:block" aria-hidden="true">
                  <AnimatedSparkleIcon
                    key={cycleKey}
                    width={60}
                    height={60}
                    className="lg:w-12 lg:h-12 xl:w-14 xl:h-14"
                    duration={1}
                    delay={15}
                    fillColor="#54E6ED"
                  />
                </div>
              )}
              <motion.div
                className={`relative mb-4 sm:mb-6 transition-transform duration-200 ease-out ${
                  step.id === STEP_IDS.SECOND
                    ? "w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
                    : "w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
                }`}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
              >
                {step.id === STEP_IDS.FIRST ? (
                  <AnimatedImageIcon
                    key={cycleKey}
                    width="100%"
                    height="100%"
                    className="w-full h-full"
                    duration={2.3}
                    delay={5.3}
                    fillColor="#54E6ED"
                  />
                ) : step.id === STEP_IDS.SECOND ? (
                  <AnimatedImageIconSecond
                    key={cycleKey}
                    width="100%"
                    height="100%"
                    className="w-full h-full"
                    duration={2.3}
                    delay={8.5}
                    fillColor="#54E6ED"
                  />
                ) : (
                    <AnimatedImageIconThird
                      key={cycleKey}
                      width="100%"
                      height="100%"
                      className="w-full h-full"
                      duration={2.3}
                      delay={12}
                      fillColor="#54E6ED"
                    />
                )}
              </motion.div>

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
