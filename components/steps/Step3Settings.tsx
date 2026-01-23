"use client";

import React, { useState } from "react";
import { HeadingText } from "../typography";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Edit2, Trash, VideoSquare, Crown, InfoCircle } from "iconsax-react";
import { Maximize2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { AppButton, RadioButton } from "@/components/shared";
import type { Character } from "./Step2Character";
import type { StoryData } from "@/app/createbook/page";
import Image from "next/image";
import Step3Creating from "./Step3Creating";

// Book color options
const BOOK_COLORS = {
  primary: [
    { name: "White", color: "#FFFFFF" },
    { name: "Yellow", color: "#F8DB5D" },
    { name: "Blue", color: "#5DB5F8" },
    { name: "Green", color: "#5DF8A0" },
    { name: "Red", color: "#F89F5D" },
    { name: "Black", color: "#000000" },
  ],
  extended: [
    { name: "White", color: "#FFFFFF" },
    { name: "Yellow", color: "#F8DB5D" },
    { name: "Blue", color: "#5DB5F8" },
    { name: "Green", color: "#5DF8A0" },
    { name: "Red", color: "#F89F5D" },
    { name: "Black", color: "#000000" },
    { name: "Light Yellow", color: "#FFF8A0" },
    { name: "Light Blue", color: "#A0DBF8" },
    { name: "Light Green", color: "#A0F8C5" },
    { name: "Light Red", color: "#F8C5A0" },
  ],
} as const;

export type Step3SettingsProps = {
  storyData: StoryData;
  characters: Character[];
  onShowMoreToggle?: () => void;
  showMore?: boolean;
  onCreateClick?: () => void;
};

type CoverStyle = "old" | "new" | "premium";

const COVER_OPTIONS: { id: CoverStyle; label: string; image: string }[] = [
  { id: "old", label: "Old Style", image: "/images/old-style.png" },
  { id: "new", label: "New Style", image: "/images/new-style.png" },
  { id: "premium", label: "Premium", image: "/images/premium.png" },
];

const Step3Settings: React.FC<Step3SettingsProps> = ({ storyData, characters, onShowMoreToggle, showMore = false, onCreateClick }) => {
  const [isAudiobookEnabled, setIsAudiobookEnabled] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState("ruth");
  const [selectedBookColor, setSelectedBookColor] = useState("#FFFFFF");
  const [selectedCoverStyle, setSelectedCoverStyle] = useState<CoverStyle>("new");
  const [selectedPageCount, setSelectedPageCount] = useState(12);
  const [adnotation, setAdnotation] = useState("By childbook.ai");
  const [extrasLongerText, setExtrasLongerText] = useState("standard");
  const [extrasRhymingStory, setExtrasRhymingStory] = useState("disabled");
  const [isRhymingStoryChecked, setIsRhymingStoryChecked] = useState(false);
  const [maximizedCover, setMaximizedCover] = useState<CoverStyle | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateClick = () => {
    setIsCreating(true);
    onCreateClick?.();
  };

  // Show creating state UI
  if (isCreating) {
    return <Step3Creating />;
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-8">
      {/* Heading */}
      <HeadingText
        variant="h1"
        title="Create Settings"
        className="text-center font-bold text-foreground"
      />

      {/* Story Information */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-4">
        <div className="w-full text-center">
          <HeadingText
            variant="h3"
            title={storyData.title}
            className="text-center font-bold text-foreground"
          />
          <p className="text-lg text-gray-500 w-md mx-auto">
            {storyData.description}
          </p>
        </div>
      </div>

      {/* Character Cards */}
      {characters.length > 0 && (
        <div className="w-full flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-5">
            {characters.map((character) => (
              <Card
                key={character.id}
                className="w-72 items-center border-none bg-blue-100 px-6 py-8 shadow-sm"
              >
                <CardContent className="flex flex-col items-center gap-4 px-0">
                  <Avatar className="size-24 shadow-md">
                    <AvatarImage src={character.avatarSrc} alt={character.name} />
                    <AvatarFallback className="bg-blue-800/10 text-primary font-semibold">
                      {character.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-lg font-semibold text-foreground">
                      {character.name}
                    </p>
                    <p className="text-md text-foreground">
                      {character.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 hover:text-teal-700"
                    >
                      <Edit2 size={24} color="#30a0a6" variant="Bold" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 hover:text-teal-700"
                    >
                      <Trash size={24} color="#30a0a6" variant="Bold" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Select Settings Section */}
      <div className="w-full max-w-[650px] flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex items-end justify-center relative">
          <HeadingText
            variant="h3"
            title="Select settings"
            className="font-bold text-foreground"
          />
          <button
            type="button"
            onClick={onShowMoreToggle}
            className="absolute right-0 text-blue-800 hover:text-blue-600 transition-colors font-medium text-sm"
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </div>

        {/* Audiobook Card */}
        <Card className="border-none bg-blue-100 px-6 py-4 shadow-sm">
          <CardContent className="flex flex-col gap-6 px-0">
            {/* Top Row: Heading, Description, and Check Button */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <HeadingText
                  variant="h5"
                  title="Audiobook"
                  className="font-semibold text-foreground"
                />
                <p className="text-sm text-gray-600">
                  Add voice narration to your book
                </p>
              </div>
              <Checkbox
                checked={isAudiobookEnabled}
                onCheckedChange={(checked) => setIsAudiobookEnabled(checked === true)}
                className="size-5"
                aria-label="Toggle audiobook"
              />
            </div>

            {/* Bottom Section: Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center">
              {/* Left Column: Megaphone Image */}
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image src="/images/megaphone.svg" alt="Megaphone" width={200} height={200} />
                  </div>
                </div>
              </div>

              {/* Right Column: Voice Selection Controls */}
              <div className="flex flex-col gap-4">
                {/* Voice Label and Dropdown */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="voice-select" className="text-sm font-medium text-foreground">
                    Voice
                  </Label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger id="voice-select" className="w-full">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ruth">US - Female Adult - Ruth</SelectItem>
                      <SelectItem value="john">US - Male Adult - John</SelectItem>
                      <SelectItem value="emily">US - Female Child - Emily</SelectItem>
                      <SelectItem value="mike">US - Male Child - Mike</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    You can choose the voice of the narrator
                  </p>
                </div>

                {/* Voice Preview Button */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 border-2 border-blue-800 rounded-md bg-transparent hover:bg-blue-50 transition-colors text-left"
                    aria-label="Play voice preview"
                  >
                    <span className="text-sm text-foreground">Voice Preview</span>
                    <VideoSquare size={20} color="#30a0a6" variant="Bold" />
                  </button>
                  <p className="text-xs text-gray-500">
                    You can choose the voice of the narrator
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {showMore && (
          <>
            <Card className="border-none bg-blue-100 px-6 py-4 shadow-sm">
              <CardContent className="flex flex-col gap-6 px-0">
                {/* Top Row: Heading, Description */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <HeadingText
                      variant="h5"
                      title="Book Color"
                      className="font-semibold text-foreground"
                      />
                    <p className="text-sm text-gray-600">
                      Select page color
                    </p>
                  </div>
                  <div className="flex items-center justify-center -space-x-2">
                    {BOOK_COLORS.primary.map((bookColor, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedBookColor(bookColor.color)}
                        className={cn(
                          "relative w-10 h-10 rounded-full border-2 transition-all hover:z-10",
                          selectedBookColor === bookColor.color
                            ? "border-blue-800 ring-2 ring-blue-800 ring-offset-1 z-10"
                            : "border-white hover:border-blue-800"
                        )}
                        style={{ backgroundColor: bookColor.color }}
                        aria-label={`Select book color ${bookColor.name}`}
                      />
                    ))}

                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="relative w-10 h-10 rounded-full border-2 border-blue-800 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors hover:z-10 ml-2"
                          aria-label="More book color options"
                        >
                          <div className="flex gap-0.5">
                            <div className="w-1 h-1 rounded-full bg-blue-800" />
                            <div className="w-1 h-1 rounded-full bg-blue-800" />
                            <div className="w-1 h-1 rounded-full bg-blue-800" />
                          </div>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-4 bg-[#F4FAFA]">
                        <div className="grid grid-cols-3 gap-3">
                          {BOOK_COLORS.extended.map((bookColor, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setSelectedBookColor(bookColor.color)}
                              className={cn(
                                "w-10 h-10 rounded-full border-2 transition-all",
                                selectedBookColor === bookColor.color
                                  ? "border-blue-800 ring-2 ring-blue-800 ring-offset-1"
                                  : "border-gray-300 hover:border-blue-800"
                              )}
                              style={{ backgroundColor: bookColor.color }}
                              aria-label={`Select book color ${bookColor.name}`}
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-blue-100 px-6 py-4 shadow-sm">
              <CardContent className="flex flex-col gap-6 px-0">
                <div className="flex flex-col gap-1">
                  <HeadingText
                    variant="h5"
                    title="Cover Style"
                    className="font-semibold text-foreground"
                  />
                  <p className="text-sm text-gray-600">
                    Choose cover design for your book
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {COVER_OPTIONS.map((option) => (
                    <div key={option.id} className="flex flex-col gap-3 items-center sm:items-start">
                      {option.id === "premium" ? (
                        <div className="relative w-[190px] h-[190px] shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={option.image}
                            alt={option.label}
                            fill
                            className="object-cover rounded-md"
                            sizes="190px"
                          />
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="absolute top-2 right-2 z-10 hover:opacity-80 transition-opacity"
                                aria-label="Premium information"
                              >
                                <InfoCircle size="26" color="#FFFFFF" variant="Bold" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Premium cover style with enhanced features</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedCoverStyle(option.id)}
                          className={cn(
                            "relative w-[190px] h-[190px] shrink-0 overflow-hidden rounded-md transition-all",
                            selectedCoverStyle === option.id && "ring-2 ring-blue-800 ring-offset-2"
                          )}
                          aria-pressed={selectedCoverStyle === option.id}
                          aria-label={`${option.label} cover`}
                        >
                          <Image
                            src={option.image}
                            alt={option.label}
                            fill
                            className="object-cover rounded-md"
                            sizes="190px"
                          />
                          {selectedCoverStyle === option.id && (
                            <span 
                              className="absolute inset-0 flex items-center justify-center rounded-md bg-primary/30 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMaximizedCover(option.id);
                              }}
                              aria-label="Maximize cover image"
                            >
                              <span className="rounded-full bg-white p-2" aria-hidden>
                                <Maximize2 size={20} className="text-blue-800" />
                              </span>
                            </span>
                          )}
                        </button>
                      )}
                      {option.id === "premium" ? (
                        <div className="flex w-full items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <Crown size={20} color="#EDBD38" variant="Bold" className="shrink-0" />
                            <span className="font-semibold text-foreground text-lg">{option.label}</span>
                          </div>
                          <AppButton
                            variant="primary"
                            size="sm"
                            className="shrink-0 font-semibold w-12"
                          >
                            Buy
                          </AppButton>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-semibold text-foreground text-lg">{option.label}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-blue-100 px-6 py-4 shadow-sm">
              <CardContent className="flex flex-col gap-6 px-0">
                {/* Top Row: Heading, Description, and Check Button */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <HeadingText
                      variant="h5"
                      title="Page Count"
                      className="font-semibold text-foreground"
                    />
                    <p className="text-sm text-gray-600">
                      12 pages are available for a basic account
                    </p>
                  </div>
                </div>

                {/* Bottom Section: Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center">
                  {/* Left Column: Megaphone Image */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image src="/images/blue-book.svg" alt="Blue Book" width={200} height={200} />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Page Count Selection */}
                  <div className="flex flex-col gap-4">
                    {/* Quantity Label and Radio Buttons */}
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm font-medium text-foreground">
                        Quantity
                      </Label>
                      <div className="flex flex-wrap gap-3">
                        <RadioButton
                          label="12"
                          isSelected={selectedPageCount === 12}
                          onClick={() => setSelectedPageCount(12)}
                          gap="sm"
                          paddingX="md"
                          paddingY="md"
                          iconSize="sm"
                          radius="lg"
                          fontSize="md"
                          unselectedBgColor="bg-white"
                        />
                        <RadioButton
                          label={
                            <span className="flex items-center gap-1.5">
                              <span>16</span>
                              <Crown size={16} color="#82AAC7" variant="Bold" />
                            </span>
                          }
                          isSelected={selectedPageCount === 16}
                          onClick={() => setSelectedPageCount(16)}
                          gap="sm"
                          paddingX="sm"
                          paddingY="md"
                          iconSize="sm"
                          radius="lg"
                          fontSize="md"
                          unselectedBgColor="bg-white"
                        />
                        <RadioButton
                          label={
                            <span className="flex items-center gap-1.5">
                              <span>20</span>
                              <Crown size={16} color="#EDBD38" variant="Bold" />
                            </span>
                          }
                          isSelected={selectedPageCount === 20}
                          onClick={() => setSelectedPageCount(20)}
                          gap="sm"
                          paddingX="sm"
                          paddingY="md"
                          iconSize="sm"
                          radius="lg"
                          fontSize="md"
                          unselectedBgColor="bg-white"
                        />
                        <RadioButton
                          label={
                            <span className="flex items-center gap-1.5">
                              <span>24</span>
                              <Crown size={16} color="#EDBD38" variant="Bold" />
                            </span>
                          }
                          isSelected={selectedPageCount === 24}
                          onClick={() => setSelectedPageCount(24)}
                          gap="sm"
                          paddingX="sm"
                          paddingY="md"
                          iconSize="sm"
                          radius="lg"
                          fontSize="md"
                          unselectedBgColor="bg-white"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        You can choose how many pages your book will have.
                      </p>
                    </div>

                    {/* Buy Premium Button */}
                    <div className="flex justify-end">
                      <AppButton
                        variant="primary"
                        size="sm"
                        className="font-semibold"
                      >
                        Buy premium
                      </AppButton>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-blue-100 px-6 py-4 shadow-sm">
              <CardContent className="flex flex-col gap-6 px-0">
                {/* Top Row: Heading, Description, and Check Button */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <HeadingText
                      variant="h5"
                      title="Public"
                      className="font-semibold text-foreground"
                    />
                    <p className="text-sm text-gray-600">
                      Make your book visible to other users in the library
                    </p>
                  </div>
                  <Checkbox
                    checked={isAudiobookEnabled}
                    onCheckedChange={(checked) => setIsAudiobookEnabled(checked === true)}
                    className="size-5"
                    aria-label="Toggle audiobook"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-blue-100 px-6 py-4 shadow-sm">
              <CardContent className="flex flex-col gap-6 px-0">
                {/* Top Row: Heading, Description, and Check Button */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <HeadingText
                      variant="h5"
                      title="Extras"
                      className="font-semibold text-foreground"
                    />
                    <p className="text-sm text-gray-600">
                      12 pages are available for a basic account
                    </p>
                  </div>
                  <Checkbox
                    checked={isAudiobookEnabled}
                    onCheckedChange={(checked) => setIsAudiobookEnabled(checked === true)}
                    className="size-5"
                    aria-label="Toggle audiobook"
                  />
                </div>

                {/* Bottom Section: Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-stretch">
                  {/* Left Column: Crown illustration + Buy button at bottom */}
                  <div className="flex h-full flex-col items-center justify-between gap-4">
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image src="/images/golden-crown.svg" alt="Golden Crown" width={200} height={200} />
                      </div>
                    </div>
                    <AppButton
                      variant="primary"
                      size="sm"
                      className="font-semibold sm:w-auto"
                    >
                      Buy premium
                    </AppButton>
                  </div>

                  {/* Right Column: Extras Controls */}
                  <div className="flex flex-col gap-4">
                    {/* 1. Adnotation - Input with info icon */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="adnotation-input" className="text-sm font-medium text-foreground">
                        Adnotation
                      </Label>
                      <div className="relative">
                        <Input
                          id="adnotation-input"
                          value={adnotation}
                          onChange={(e) => setAdnotation(e.target.value)}
                          className="pr-10"
                        />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="absolute inset-y-0 right-3 flex items-center justify-center text-blue-800 hover:opacity-80"
                              aria-label="Adnotation information"
                            >
                              <InfoCircle size="20" color="#30a0a6" variant="Bold" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Specify how the author/adnotation should appear.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    {/* 2. Longer text - Select */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="extras-longer-text" className="text-sm font-medium text-foreground">
                        Longer text
                      </Label>
                      <Select value={extrasLongerText} onValueChange={setExtrasLongerText}>
                        <SelectTrigger id="extras-longer-text" className="w-full">
                          <SelectValue placeholder="Choose text length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard length</SelectItem>
                          <SelectItem value="longer">Longer story</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 3. Rhyming story - Select with checkbox inside content */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="extras-rhyming-story" className="text-sm font-medium text-foreground">
                        Rhyming story
                      </Label>
                      <Select value={extrasRhymingStory} onValueChange={setExtrasRhymingStory}>
                        <SelectTrigger id="extras-rhyming-story" className="w-full">
                          <SelectValue placeholder="Rhyming options" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="disabled">No rhymes</SelectItem>
                          <SelectItem value="enabled">Rhyming enabled</SelectItem>
                          <div className="mt-2 border-t border-gray-200 pt-2">
                            <div
                              className="flex w-full items-start gap-2 text-left cursor-pointer"
                              onClick={() => {
                                const next = !isRhymingStoryChecked;
                                setIsRhymingStoryChecked(next);
                                setExtrasRhymingStory(next ? "enabled" : "disabled");
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  const next = !isRhymingStoryChecked;
                                  setIsRhymingStoryChecked(next);
                                  setExtrasRhymingStory(next ? "enabled" : "disabled");
                                }
                              }}
                            >
                              <Checkbox
                                checked={isRhymingStoryChecked}
                                onCheckedChange={(checked) => {
                                  const next = checked === true;
                                  setIsRhymingStoryChecked(next);
                                  setExtrasRhymingStory(next ? "enabled" : "disabled");
                                }}
                                className="mt-0.5 size-4"
                                aria-label="Toggle rhyming story"
                              />
                              <span className="text-xs text-gray-600">
                                You can choose to have a rhyming story, so the story will be generated with rhymes.
                              </span>
                            </div>
                          </div>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 4. Disabled input for Colorbook */}
                    <div className="mt-1">
                      <Input
                        disabled
                        value="Colorbook (Coming soon)"
                        className="bg-gray-100 text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bottom Create CTA */}
            <div className="w-full flex justify-center pb-8">
              <AppButton
                variant="primary"
                size="md"
                shadow
                className="text-heading-sm font-semibold w-36"
                onClick={handleCreateClick}
              >
                Create
              </AppButton>
            </div>
          </>
        )}
      </div>


      {/* Maximized Cover Image Dialog */}
      <Dialog open={maximizedCover !== null} onOpenChange={(open) => !open && setMaximizedCover(null)}>
        <DialogContent 
          className="max-w-4xl w-full p-0 bg-transparent border-none shadow-none"
          showCloseButton={true}
        >
          <DialogTitle className="sr-only">
            {maximizedCover 
              ? `${COVER_OPTIONS.find(opt => opt.id === maximizedCover)?.label || "Cover"} preview`
              : "Cover preview"}
          </DialogTitle>
          {maximizedCover && (
            <div className="relative w-full h-auto max-h-[90vh] flex items-center justify-center">
              <Image
                src={COVER_OPTIONS.find(opt => opt.id === maximizedCover)?.image || ""}
                alt={COVER_OPTIONS.find(opt => opt.id === maximizedCover)?.label || "Cover preview"}
                width={800}
                height={800}
                className="object-contain rounded-lg w-full h-auto max-h-[90vh]"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Step3Settings;
