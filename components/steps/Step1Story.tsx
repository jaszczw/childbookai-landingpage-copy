"use client";

import React, { useCallback, useState, useEffect } from "react";
import { HeadingText } from "../typography";
import { RadioButton, RadioCard } from "../shared";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppButton } from "@/components/ui/app-button";
import { HighlightableInput } from "../shared/HighlightableInput";

const themes = [
  "Adventure",
  "Magic",
  "Nature",
  "Holidays",
  "Courage",
  "Animals",
  "School",
  "Family",
  "Friendship",
] as const;

const storyOptions = [
  {
    id: "story-1",
    title: "The Secret Club",
    description: "A treehouse becomes the headquarters for a special club where friendship and fun adventures are the only rules.",
  },
  {
    id: "story-2",
    title: "Unlikely Friends",
    description:
      "A shy bookworm and an outgoing athlete form an unexpected friendship that changes both their lives.",
  },
  {
    id: "story-3",
    title: "Different But The Same",
    description: "Two children learn the importance of communication and forgiveness.",
  },
] as const;

type Theme = (typeof themes)[number];
type StoryOption = (typeof storyOptions)[number];
type StoryId = StoryOption["id"];

const DEFAULT_THEME: Theme = "Friendship";
const DEFAULT_STORY_ID: StoryId = "story-2";

const getStoryById = (id: StoryId): StoryOption => {
  const story = storyOptions.find((option) => option.id === id);
  // Fallback to first story in case of data mismatch; should never happen in normal use.
  return story ?? storyOptions[0];
};

type StoryData = {
  title: string;
  description: string;
};

type Step1StoryProps = {
  onNext: () => void;
  onStoryChange?: (storyData: StoryData) => void;
};

const Step1Story: React.FC<Step1StoryProps> = ({ onNext, onStoryChange }) => {
  const defaultStory = getStoryById(DEFAULT_STORY_ID);

  const [selectedOption, setSelectedOption] = useState<Theme | "Custom Story">(DEFAULT_THEME);
  const [selectedStory, setSelectedStory] = useState<StoryId | null>(defaultStory.id);
  const [storyTitle, setStoryTitle] = useState<string>(defaultStory.title);
  const [description, setDescription] = useState<string>(defaultStory.description);

  // Sync initial story data with parent
  useEffect(() => {
    onStoryChange?.({ title: defaultStory.title, description: defaultStory.description });
  }, []); // Only run on mount

  const handleSelectStory = useCallback((story: StoryOption) => {
    setSelectedStory(story.id);
    setStoryTitle(story.title);
    setDescription(story.description);
    onStoryChange?.({ title: story.title, description: story.description });
  }, [onStoryChange]);

  const handleReroll = useCallback(() => {
    const randomStory =
      storyOptions[Math.floor(Math.random() * storyOptions.length)];
    handleSelectStory(randomStory);
  }, [handleSelectStory]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-6">
      <HeadingText
        variant="h1"
        title="Create Your Story"
        className="text-center font-bold"
      />

      {/* Custom Story Option */}
      <RadioButton
        label="Custom Story"
        isSelected={selectedOption === "Custom Story"}
        onClick={() => setSelectedOption("Custom Story")}
        gap="md"
        paddingX="md"
        paddingY="md"
        iconSize="md"
        radius="xl"
        fontSize="md"
      />

      {/* Pick A Theme Heading */}
      <HeadingText
        variant="h5"
        title="Pick A Theme"
        className="text-center font-semibold text-blue-1000"
      />

      {/* Theme Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 w-auto max-w-2xl">
        {themes.map((theme) => (
          <RadioButton
            key={theme}
            label={theme}
            isSelected={selectedOption === theme}
            onClick={() => setSelectedOption(theme)}
            gap="sm"
            paddingX="sm"
            paddingY="md"
            iconSize="md"
            radius="xl"
            fontSize="md"
          />
        ))}
      </div>

      {/* Story Cards Section */}
      <div className="w-full max-w-2xl">
        {/* Reroll Options Button */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="text-blue-800 hover:text-blue-600 transition-colors font-semibold text-sm"
            onClick={handleReroll}
          >
            Reroll Options
          </button>
        </div>

        {/* Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {storyOptions.map((story) => (
            <RadioCard
              key={story.id}
              title={story.title}
              description={story.description}
              isSelected={selectedStory === story.id}
              onClick={() => handleSelectStory(story)}
              radius="lg"
              padding="md"
            />
          ))}
        </div>
      </div>

      {/* Story Form Section */}
      <div className="w-full max-w-2xl space-y-6">
        {/* Story Title Input */}
        <div className="space-y-2">
          <Label htmlFor="story-title" className="text-foreground font-medium">
            Story title
          </Label>
          <Input
            id="story-title"
            type="text"
            value={storyTitle}
            onChange={(e) => {
              const newTitle = e.target.value;
              setStoryTitle(newTitle);
              onStoryChange?.({ title: newTitle, description });
            }}
            className="w-full text-lg font-semibold text-foreground bg-blue-100 border border-blue-800"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <HighlightableInput
            value={description}
            onChange={(html) => {
              setDescription(html);
              onStoryChange?.({ title: storyTitle, description: html });
            }}
          />
        </div>

        {/* Next Step Button */}
        <div className="flex justify-center">
          <AppButton
            size="md"
            shadow
            className="w-full sm:w-auto sm:min-w-[190px] text-heading-sm min-h-[44px]"
            onClick={onNext}
          >
            Next Step
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default Step1Story;
