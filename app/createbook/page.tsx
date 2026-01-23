"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowCircleLeft2 } from "iconsax-react";
import { Navbar } from "@/components/layout";
import { Step1Story, Step2Character, Step3Settings } from "@/components/steps";
import type { Character } from "@/components/steps/Step2Character";
import type { CharacterFormData } from "@/components/steps/AddCharacterDialog";

const CHARACTER_IMAGES: Record<string, string> = {
  Adam: "/images/Adam.png",
  Emilia: "/images/Emilia.png",
  User123: "/images/User123.png",
  Garry: "/images/Garry.png",
  Lukas: "/images/Lukas.png",
  Amanda: "/images/Amanda.png",
};

export type StoryData = {
  title: string;
  description: string;
};

export default function CreateBook() {
  const [activeStep, setActiveStep] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [addCharacterDialogOpen, setAddCharacterDialogOpen] = useState(false);
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [storyData, setStoryData] = useState<StoryData>({
    title: "Unlikely Friends",
    description: "A shy bookworm and an outgoing athlete form an unexpected friendship that changes both their lives.",
  });
  const steps = [1, 2, 3] as const;

  const handleNextStep = () => {
    setActiveStep((prev) => (prev < steps.length ? prev + 1 : prev));
  };

  const handlePreviousStep = () => {
    setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleAddCharacter = (characterData: CharacterFormData) => {
    const newCharacter: Character = {
      id: characters.length + 1,
      name: characterData.name,
      description: characterData.description || `${characterData.age || ""} years old ${characterData.gender || ""}`.trim(),
      avatarSrc: CHARACTER_IMAGES[characterData.name] || "/images/child-1.png",
    };
    setCharacters([...characters, newCharacter]);
    setAddCharacterDialogOpen(false);
  };

  const handleOpenAddCharacterDialog = () => {
    setAddCharacterDialogOpen(true);
  };

  const handleShowMoreToggle = () => {
    setShowMoreContent((prev) => !prev);
  };

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  // Reset showMoreContent when step changes
  useEffect(() => {
    if (activeStep !== 3) {
      setShowMoreContent(false);
    }
  }, [activeStep]);

  return (
    <>
      <main
        id="main-content"
        className="min-h-screen flex flex-col bg-blue-800 overflow-x-hidden"
      >
        <div className="relative w-full min-h-screen bg-contain bg-repeat bg-center bg-hero">
          <Navbar 
            {...(activeStep === 2 ? {
              onOpenAddCharacterDialog: handleOpenAddCharacterDialog,
              addCharacterDialogOpen,
              onAddCharacterDialogChange: setAddCharacterDialogOpen,
              onAddCharacter: handleAddCharacter,
            } : {})}
          />

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
                <div className="relative flex items-end gap-8 pb-4">
                  {steps.map((step) => {
                    const isActive = activeStep === step;
                    const isCompleted = step < activeStep;

                    const stateClassName = isActive
                      ? "bg-blue-800 text-white"
                      : isCompleted
                      ? "bg-blue-800 text-white"
                      : "bg-blue-100 text-blue-800";

                    return (
                      <div key={step} className="relative">
                        <button
                          type="button"
                          className={`px-3 py-0.5 rounded-lg text-sm font-semibold transition-all relative z-10 cursor-default ${stateClassName}`}
                          aria-current={isActive ? "step" : undefined}
                          aria-disabled="true"
                          tabIndex={-1}
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

              {activeStep === 3 ? (
                isCreating ? (
                  <svg
                    width="1240"
                    height="853"
                    viewBox="0 0 1240 853"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1240 812.689C1240 834.781 1222.09 852.689 1200 852.689L39.9999 852.689C17.9086 852.689 -0.000120505 834.781 -0.000118573 812.689L-5.42941e-05 77.4199C-5.24067e-05 55.8306 17.1322 38.1368 38.7103 37.4408L1198.71 0.0215418C1221.3 -0.706972 1240 17.4039 1240 40.0007L1240 812.689Z"
                      fill="white"
                    />
                  </svg>
                ) : showMoreContent ? (
                  <svg
                    width="1240"
                    height="2497"
                    viewBox="0 0 1240 2497"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1240 2456.69C1240 2478.78 1222.09 2496.69 1200 2496.69L39.9999 2496.69C17.9086 2496.69 -0.000120505 2478.78 -0.000118573 2456.69L8.9429e-05 77.4191C9.13164e-05 55.8297 17.1323 38.1359 38.7104 37.4398L1198.71 0.0209925C1221.3 -0.707765 1240 17.4033 1240 40L1240 2456.69Z"
                      fill="white"
                    />
                  </svg>
                ) : (
                  <svg
                    width="1240"
                    height="1080"
                    viewBox="0 -227.311 1240 1080"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1240 812.689 C1240 834.781 1222.09 852.689 1200 852.689 L39.9999 852.689 C17.9086 852.689 -0.000120505 834.781 -0.000118573 812.689 L-5.42941e-05 -149.891 C-5.24067e-05 -171.48 17.1322 -189.174 38.7103 -189.87 L1198.71 -227.289 C1221.3 -228.018 1240 -209.906 1240 -187.309 L1240 812.689 Z"
                      fill="white"
                    />
                  </svg>
                )
              ) : (
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
              )}

              {/* Step content - positioned inside SVG card, below stepper, centered */}
              <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-5xl px-8 z-10">
                {activeStep === 1 && <Step1Story onNext={handleNextStep} onStoryChange={setStoryData} />}
                {activeStep === 2 && <Step2Character characters={characters} onNext={handleNextStep} onAddCharacter={handleOpenAddCharacterDialog} />}
                {activeStep === 3 && <Step3Settings storyData={storyData} characters={characters} onShowMoreToggle={handleShowMoreToggle} showMore={showMoreContent} onCreateClick={handleCreateClick} />}
              </div>

              {/* Back button - bottom left corner of SVG */}
              {(activeStep === 2 || activeStep === 3) && (
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="absolute bottom-8 left-8 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors z-20"
                  aria-label="Go back to previous step"
                >
                  <ArrowCircleLeft2 size="24" color="#30a0a6" variant="Bold" />
                </button>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
