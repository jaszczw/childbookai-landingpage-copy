"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { useState } from "react";
import Image from "next/image";
import { DocumentUpload } from "iconsax-react";
import { AppButton } from "../shared/AppButton";
import type { CharacterFormData } from "./AddCharacterDialog";
import {
  CHARACTER_TYPES,
  ETHNICITIES,
  GENDERS,
  HAIR_COLORS,
  EYE_COLORS,
  HAIR_LENGTHS,
  ATTRIBUTES,
} from "@/lib/constants";
import { MultiSelectAutocomplete } from "../ui/multi-select-autocomplete";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

export type CreateCharacterDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCharacterCreated?: (character: CharacterFormData) => void;
};

type ExtendedCharacterFormData = CharacterFormData & {
  characterType: string;
  ethnicity: string;
  hairColor: string;
  eyeColor: string;
  hairLength: string;
  attributes: string[];
};

// ============================================================================
// Component Constants
// ============================================================================

const DEFAULT_FORM_DATA: ExtendedCharacterFormData = {
  name: "",
  description: "",
  age: "",
  gender: "",
  characterType: "Human",
  ethnicity: "",
  hairColor: "",
  eyeColor: "Blue",
  hairLength: "very-short",
  attributes: [],
};

// ============================================================================
// Helper Components
// ============================================================================

interface GenderRadioButtonsProps {
  value: string;
  onChange: (value: string) => void;
}

function GenderRadioButtons({ value, onChange }: GenderRadioButtonsProps) {
  return (
    <div className="flex gap-4 w-full">
      {GENDERS.map((genderOption) => (
        <label
          key={genderOption}
          className={`flex items-center justify-start gap-2 px-4 py-2 rounded-md border-2 cursor-pointer transition-all flex-1 ${
            value === genderOption
              ? "bg-blue-800 text-white border-blue-800"
              : "bg-white text-foreground border-blue-800 hover:bg-blue-800/10"
          }`}
        >
          <input
            type="radio"
            name="gender"
            value={genderOption}
            checked={value === genderOption}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              value === genderOption ? "border-white" : "border-blue-800"
            }`}
          >
            {value === genderOption && (
              <div className="w-2 h-2 rounded-full bg-white" />
            )}
          </div>
          <span className="text-sm font-medium">{genderOption}</span>
        </label>
      ))}
    </div>
  );
}

interface HairColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

function HairColorPicker({ value, onChange }: HairColorPickerProps) {
  return (
    <div className="flex items-center -space-x-2">
      {HAIR_COLORS.primary.map((color, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange(color)}
          className={`relative w-10 h-10 rounded-full border-2 transition-all hover:z-10 ${
            value === color
              ? "border-blue-800 ring-2 ring-blue-800 ring-offset-1 z-10"
              : "border-white hover:border-blue-800"
          }`}
          style={{ backgroundColor: color }}
          aria-label={`Select hair color ${color}`}
        />
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="relative w-10 h-10 rounded-full border-2 border-blue-800 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors hover:z-10 ml-2"
            aria-label="More hair color options"
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
            {HAIR_COLORS.extended.map((color, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onChange(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  value === color
                    ? "border-blue-800 ring-2 ring-blue-800 ring-offset-1"
                    : "border-gray-300 hover:border-blue-800"
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select hair color ${color}`}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface EyeColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

function EyeColorPicker({ value, onChange }: EyeColorPickerProps) {
  return (
    <>
      <div className="bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center gap-2 h-[240px]">
        <Label className="text-heading-sm text-center">Eye color</Label>
        <div className="relative w-38 h-38 p-12">
          <Image
            src={`/illustrations/eye-color/${value}.svg`}
            alt={`${value} eyes`}
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="w-full space-y-2">
        <Label className="text-sm text-center block">
          Select the desired eye color
        </Label>
        <div className="flex items-center justify-center -space-x-2">
          {EYE_COLORS.primary.map((eyeColor, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onChange(eyeColor.svg)}
              className={`relative w-10 h-10 rounded-full border-2 transition-all hover:z-10 ${
                value === eyeColor.svg
                  ? "border-blue-800 ring-2 ring-blue-800 ring-offset-1 z-10"
                  : "border-white hover:border-blue-800"
              }`}
              style={{ backgroundColor: eyeColor.color }}
              aria-label={`Select eye color ${eyeColor.name}`}
            />
          ))}

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="relative w-10 h-10 rounded-full border-2 border-blue-800 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors hover:z-10 ml-2"
                aria-label="More eye color options"
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
                {EYE_COLORS.extended.map((eyeColor, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => onChange(eyeColor.svg)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      value === eyeColor.svg
                        ? "border-blue-800 ring-2 ring-blue-800 ring-offset-1"
                        : "border-gray-300 hover:border-blue-800"
                    }`}
                    style={{ backgroundColor: eyeColor.color }}
                    aria-label={`Select eye color ${eyeColor.name}`}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}

interface HairLengthSelectorProps {
  value: string;
  onChange: (length: string) => void;
}

function HairLengthSelector({ value, onChange }: HairLengthSelectorProps) {
  const hairLengthIndex = HAIR_LENGTHS.findIndex(
    (item) => item.value === value
  );

  return (
    <>
      <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center gap-2 h-[240px]">
        <Label className="text-heading-sm text-center">Hair length</Label>
        <div className="relative w-50 h-50">
          <Image
            src={`/illustrations/hair-color/${value}.svg`}
            alt={`${value} hair`}
            fill
            className="object-contain py-4"
          />
        </div>
      </div>

      <div className="w-full space-y-3">
        <Label className="text-sm text-center block">
          Select the desired hair length
        </Label>

        <div className="flex gap-1">
          {HAIR_LENGTHS.map((hairLength, index) => {
            const isSelected = index <= hairLengthIndex;

            return (
              <button
                key={hairLength.value}
                type="button"
                onClick={() => onChange(hairLength.value)}
                className={`flex-1 h-2 rounded-md transition-all ${
                  isSelected
                    ? "bg-[#30A0A6]"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={hairLength.label}
              />
            );
          })}
        </div>

        <div className="flex justify-between text-xs text-gray-600">
          <span>Short</span>
          <span>Medium</span>
          <span>Long</span>
        </div>
      </div>
    </>
  );
}

function UploadSection() {
  return (
    <div className="mt-6 rounded-lg bg-gray-100 p-6 mx-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div className="relative border-2 border-dashed border-blue-800 rounded-lg p-8 flex flex-col h-full bg-transparent">
            <div className="flex-1 flex items-center justify-center">
              <DocumentUpload size="40" color="#30a0a6" variant="Bold" />
            </div>
            <p className="text-xs text-gray-500 text-center">
              *Formats for download: .jpg, .jpeg, .png, .pdf
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-center">
          <h3 className="text-2xl font-bold text-foreground">Upload image</h3>
          <p className="text-sm text-foreground">
            Custom image uploads are only supported for human characters.
          </p>

          <div className="flex flex-col gap-2 text-xs text-gray-500">
            <p>
              *Adding character image means you accept our{" "}
              <a
                href="#"
                className="text-blue-800 hover:underline font-semibold"
              >
                privacy policy
              </a>
              . Make sure you upload recognizable face. If you want very
              cartoony character, create a non-human character instead.
            </p>
          </div>

          <div className="mt-auto text-center">
            <AppButton
              variant="primary"
              size="sm"
              shadow
              className="text-foreground font-semibold"
            >
              See guide
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export default function CreateCharacterDialog({
  open,
  onOpenChange,
  onCharacterCreated,
}: CreateCharacterDialogProps) {
  const [formData, setFormData] =
    useState<ExtendedCharacterFormData>(DEFAULT_FORM_DATA);

  const handleCreateCharacter = () => {
    if (!formData.name.trim()) return;

    onCharacterCreated?.(formData);
    onOpenChange(false);
    setFormData(DEFAULT_FORM_DATA);
  };

  const updateFormData = (updates: Partial<ExtendedCharacterFormData>) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[820px] max-h-[90vh] rounded-3xl p-0 bg-[#F4FAFA] overflow-hidden flex flex-col">
        <div className="overflow-y-auto flex-1 px-8 sm:px-10 pt-8 sm:pt-10 custom-scrollbar">
          <DialogHeader className="items-center text-center pt-8">
            <DialogTitle className="text-5xl font-bold text-foreground">
              Create Character
            </DialogTitle>
            <DialogDescription className="text-md text-foreground text-center mx-auto max-w-md">
              Upload a source image or use &quot;Generate Image&quot; to make
              character based on the form input.
            </DialogDescription>
          </DialogHeader>

          <UploadSection />

          {/* Form Fields */}
          <div className="mt-6 space-y-6 mx-12">
            {/* First Row: Character name, Character type, Age */}
            <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Character name</Label>
                <Input
                  id="name"
                  placeholder="Enter character name"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="characterType">Character type</Label>
                <Select
                  value={formData.characterType}
                  onValueChange={(value) =>
                    updateFormData({ characterType: value })
                  }
                >
                  <SelectTrigger id="characterType" className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {CHARACTER_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.age}
                  onChange={(e) => updateFormData({ age: e.target.value })}
                />
              </div>
            </div>

            {/* Second Row: Gender Radio Buttons */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <GenderRadioButtons
                value={formData.gender || ""}
                onChange={(value) => updateFormData({ gender: value })}
              />
            </div>

            {/* Third Row: Choose ethnicity and Hair color */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ethnicity">Choose ethnicity</Label>
                <Select
                  value={formData.ethnicity}
                  onValueChange={(value) =>
                    updateFormData({ ethnicity: value })
                  }
                >
                  <SelectTrigger id="ethnicity" className="w-full">
                    <SelectValue placeholder="Select ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    {ETHNICITIES.map((ethnicity) => (
                      <SelectItem key={ethnicity} value={ethnicity}>
                        {ethnicity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Hair color</Label>
                <HairColorPicker
                  value={formData.hairColor}
                  onChange={(color) => updateFormData({ hairColor: color })}
                />
              </div>
            </div>

            {/* Fourth Row: Eye color and Hair length */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
              <div className="flex flex-col gap-4">
                <EyeColorPicker
                  value={formData.eyeColor}
                  onChange={(color) => updateFormData({ eyeColor: color })}
                />
              </div>

              <div className="flex flex-col gap-4">
                <HairLengthSelector
                  value={formData.hairLength}
                  onChange={(length) => updateFormData({ hairLength: length })}
                />
              </div>
            </div>

            {/* Attributes Section */}
            <div className="space-y-2 pt-4 border-t border-gray-200">
              <Label htmlFor="attributes">Attributes</Label>
              <MultiSelectAutocomplete
                value={formData.attributes}
                onChange={(attributes) => updateFormData({ attributes })}
                options={[...ATTRIBUTES]}
                placeholder="Briefly describe visual traits or ad..."
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-2">
                Briefly describe visual traits or accessories (e.g., golden
                earrings, wheelchair, pirate outfit, Cleopatra attire) - these
                details will be reflected in all images of this character
              </p>
              
              {/* Suggestion Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                {ATTRIBUTES.map((option, index) => {
                  const isSelected = formData.attributes.includes(option);
                  const isAISuggested = index < 3;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          updateFormData({
                            attributes: formData.attributes.filter(
                              (attr) => attr !== option
                            ),
                          });
                        } else {
                          updateFormData({
                            attributes: [...formData.attributes, option],
                          });
                        }
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all whitespace-nowrap",
                        isSelected
                          ? "bg-gray-200 text-gray-600 cursor-pointer"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
                      )}
                    >
                      {isAISuggested && (
                        <Image
                          src={
                            isSelected
                              ? "/illustrations/dark-autobrightness.svg"
                              : "/illustrations/light-autobrightness.svg"
                          }
                          alt="AI suggested"
                          width={16}
                          height={16}
                        />
                      )}
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preview Image Section */}
            <div className="bg-gray-100 rounded-lg p-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Character Illustration Preview */}
                <div className="relative aspect-square rounded-lg overflow-hidden bg-white">
                  <Image
                    src="/images/child-preview-image.png"
                    alt="Character preview"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Right: Description and Generate Button */}
                <div className="flex flex-col justify-center gap-4">
                  <h3 className="text-heading-sm font-bold text-foreground text-center">
                    Preview image
                  </h3>
                  <div className="space-y-2 text-sm text-center">
                    <p className="text-foreground">
                      The photo will be generated based on the visual attributes
                      already entered
                    </p>
                    <p className="text-gray-500">
                      You can preview character illustration in the book only if
                      you uploaded a photo and filled all the fields.
                    </p>
                  </div>
                  <AppButton
                    variant="primary"
                    size="sm"
                    shadow
                    className="text-foreground font-medium"
                  >
                    Generate
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-center gap-4 px-8 sm:px-10 pb-2 sm:py-4">
          <AppButton
            variant="secondary"
            size="sm"
            shadow
            onClick={() => onOpenChange(false)}
            className="font-medium"
          >
            Save character
          </AppButton>
          <AppButton
            variant="primary"
            size="sm"
            shadow
            onClick={handleCreateCharacter}
            className="font-medium"
          >
            Next Step
          </AppButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
