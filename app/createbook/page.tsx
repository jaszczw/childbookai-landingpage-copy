"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout";
import { Step1Story, Step2Character, Step3Settings } from "@/components/steps";

export default function CreateBook() {
  const [activeStep, setActiveStep] = useState(1);
  const steps = [1, 2, 3] as const;

  return (
    <>
      <main
        id="main-content"
        className="min-h-screen flex flex-col bg-blue-800 overflow-x-hidden"
      >
        <div className="relative w-full min-h-screen bg-contain bg-repeat bg-center bg-hero">
          <Navbar />

          <section className="relative w-full py-2 lg:py-4 min-h-[400px] sm:min-h-[500px] flex items-center justify-center">
            <div className="relative z-10">
              {/* Top-right stepper */}
              <div className="absolute top-8 right-8 z-20">
                {/* Dashed connector behind buttons */}
                <div className="absolute left-6 -top-2 -z-10 pointer-events-none">
                  <Image
                    src="/illustrations/stepper-dashed-lines.svg"
                    alt=""
                    width={180}
                    height={20}
                    className="w-auto h-auto"
                    aria-hidden="true"
                  />
                </div>

                {/* Step buttons */}
                <div className="relative flex items-end gap-6 pb-4">
                  {steps.map((step) => {
                    const isActive = activeStep === step;

                    return (
                      <div key={step} className="relative">
                        <button
                          type="button"
                          onClick={() => setActiveStep(step)}
                          className={`px-3 py-0.5 rounded-lg text-sm font-semibold transition-all relative z-10 ${
                            isActive
                              ? "bg-blue-800 text-white"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {`Step ${step}`}
                        </button>

                        {isActive && (
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
                            <Image
                              src="/illustrations/stepper-active-icon.svg"
                              alt=""
                              width={60}
                              height={20}
                              className="w-auto h-auto"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <svg
                width="1240"
                height="953"
                viewBox="0 0 1240 953"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1240 912.689C1240 934.78 1222.09 952.689 1200 952.689L39.9999 952.689C17.9086 952.689 -0.000120505 934.78 -0.000118573 912.689L-4.55518e-05 77.4194C-4.36644e-05 55.8301 17.1322 38.1363 38.7103 37.4403L1198.71 0.0210535C1221.3 -0.70746 1240 17.4034 1240 40.0002L1240 912.689Z"
                  fill="white"
                />
              </svg>

              {/* Step content - positioned inside SVG card, below stepper, centered */}
              <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-5xl px-8 z-10">
                {activeStep === 1 && <Step1Story />}
                {activeStep === 2 && <Step2Character />}
                {activeStep === 3 && <Step3Settings />}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
