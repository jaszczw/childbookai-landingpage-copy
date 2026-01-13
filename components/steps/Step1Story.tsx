"use client";

import { useState } from "react";
import { HeadingText } from "../typography";
import { RadioButton, RadioCard } from "../shared";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AppButton } from "@/components/shared";
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
    description: "A brave little squirrel sets off on a magical journey to find the lost acorn of wisdom.",
  },
  {
    id: "story-3",
    title: "Different But The Same",
    description: "Two children learn the importance of communication and forgiveness.",
  },
] as const;

export default function Step1Story() {
  const [selectedOption, setSelectedOption] = useState<string | null>("Friendship");
  const [selectedStory, setSelectedStory] = useState<string | null>("story-2");
  const [storyTitle, setStoryTitle] = useState("Unlikely Friends");
  const [description, setDescription] = useState(
    "A brave little squirrel sets off on a magical journey in Enchanted Forest to find the lost acorn of wisdom."
  );

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
              onClick={() => {
                setSelectedStory(story.id);
                setStoryTitle(story.title);
                setDescription(story.description);
              }}
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
            onChange={(e) => setStoryTitle(e.target.value)}
            className="w-full text-lg font-semibold text-foreground bg-blue-100 border border-blue-800 focus-visible:ring-1 focus-visible:ring-blue-800 focus-visible:border-blue-800"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <HighlightableInput
            value={description}
            onChange={setDescription}
          />
        </div>

        {/* Next Step Button */}
        <div className="flex justify-center">
          <AppButton
            size="md"
            shadow
            className="w-full sm:w-auto sm:min-w-[190px] text-heading-sm min-h-[44px]"
          >
            Next Step
          </AppButton>
        </div>
      </div>
    </div>
  );
}
