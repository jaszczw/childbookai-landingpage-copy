"use client";

import { HeadingText } from "../typography";
import { ParagraphText } from "../typography";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { AppButton } from "../shared/AppButton";
import { Edit2, Trash } from "iconsax-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type Character = {
  id: number;
  name: string;
  description: string;
  avatarSrc: string;
};

export type Step2CharacterProps = {
  characters: Character[];
  onNext?: () => void;
  onAddCharacter?: () => void;
};

export default function Step2Character({ characters, onNext, onAddCharacter }: Step2CharacterProps) {

  const cardColumnsClass =
    characters.length <= 1
      ? "md:grid-cols-1 lg:grid-cols-1"
      : characters.length === 2
      ? "md:grid-cols-2 lg:grid-cols-2"
      : "md:grid-cols-3 lg:grid-cols-3";

  // Empty state when no characters
  if (characters.length === 0) {
    return (
      <div className="relative w-full flex flex-col items-center justify-center gap-8 py-12">
        <div className="flex flex-col items-center gap-4">
          <HeadingText
            variant="h1"
            title="Create Your Story"
            className="text-center font-bold"
          />
          <ParagraphText
            as="p"
            variant="text"
            className="text-center font-medium max-w-xl text-slate-600"
          >
            Add characters to your story. It is advisable to use no more than 3 characters.
          </ParagraphText>
        </div>

        {/* Empty state illustration/content */}
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <Image
              src="/illustrations/book-face.svg"
              alt="Empty characters"
              width={256}
              height={256}
              className="opacity-50"
            />
          </div>
          
          <div className="flex flex-col items-center gap-3 text-center max-w-md">
            <HeadingText
              variant="h2"
              title="No Characters Yet"
              className="text-center font-semibold text-slate-700"
            />
            <ParagraphText
              as="p"
              variant="text"
              className="text-center text-slate-500"
            >
              Click the &quot;Create&quot; button in the navigation bar to add your first character to the story.
            </ParagraphText>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-4">
        <HeadingText
          variant="h1"
          title="Create Your Story"
          className="text-center font-bold"
        />
        <ParagraphText
          as="p"
          variant="text"
          className="text-center font-medium max-w-xl text-slate-600"
        >
          Characters you have already added to the story. It is advisable to use
          no more than 3 characters.
        </ParagraphText>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 justify-center justify-items-center gap-5",
          cardColumnsClass
        )}
      >
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

      {(onNext || onAddCharacter) && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          {onAddCharacter && (
            <AppButton
              onClick={onAddCharacter}
              variant="secondary"
              size="md"
              shadow
              className="w-full sm:w-auto sm:min-w-[190px] text-heading-sm min-h-[44px]"
            >
              Add a Character
            </AppButton>
          )}
          {onNext && (
            <AppButton
              onClick={onNext}
              size="md"
              shadow
              className="w-full sm:w-auto sm:min-w-[190px] text-heading-sm min-h-[44px]"
            >
              Next Step
            </AppButton>
          )}
        </div>
      )}
    </div>
  );
}
