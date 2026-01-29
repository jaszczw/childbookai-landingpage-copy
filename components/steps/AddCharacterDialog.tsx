"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { AddCircle, Edit2, Trash, MagicStar } from "iconsax-react";
import CreateCharacterDialog from "./CreateCharacterDialog";

export type CharacterFormData = {
  name: string;
  description: string;
  age?: string;
  gender?: string;
};

export type AddCharacterDialogProps = {
  trigger?: React.ReactNode;
  onAddCharacter?: (character: CharacterFormData) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const TABS = ["Characters", "Illustrators", "Books"] as const;
type TabKey = (typeof TABS)[number];

const MOCK_CHARACTERS = [
  "Adam",
  "Emilia",
  "User123",
  "Amanda",
  "Garry",
  "Lukas",
  "Adam2",
  "Emilia2",
  "User1232",
  "Amanda2",
  "Garry2",
  "Lukas2",
] as const;

const CHARACTER_IMAGES: Record<string, string> = {
  Adam: "/images/Adam.png",
  Emilia: "/images/Emilia.png",
  User123: "/images/User123.png",
  Amanda: "/images/Amanda.png",
  Garry: "/images/Garry.png",
  Lukas: "/images/Lukas.png",
  Adam2: "/images/Adam.png",
  Emilia2: "/images/Emilia.png",
  User1232: "/images/User123.png",
  Amanda2: "/images/Amanda.png",
  Garry2: "/images/Garry.png",
  Lukas2: "/images/Lukas.png",
};

export default function AddCharacterDialog({
  trigger,
  onAddCharacter,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: AddCharacterDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("Characters");
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(
    null
  );

  // Use controlled state if provided, otherwise use internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;

  const handleSelect = (name: string) => {
    onAddCharacter?.({
      name,
      description: "5 years old red haired female",
    });
    setOpen(false);
  };

  const handleCreateWithoutCharacter = () => {
    onAddCharacter?.({
      name: "No character",
      description: "Created without choosing a character",
    });
    setOpen(false);
  };

  const handleCharacterCreated = (character: CharacterFormData) => {
    onAddCharacter?.(character);
    setIsCreateOpen(false);
    setOpen(true);
  };

  return (
    <>
      <Dialog open={open && !isCreateOpen} onOpenChange={setOpen}>
        {trigger && (
          <DialogTrigger asChild>
            {trigger}
          </DialogTrigger>
        )}

        <DialogContent className="sm:max-w-[720px] rounded-3xl p-6 sm:p-10 w-[95%]">
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-3xl sm:text-5xl font-bold text-foreground">
              Create Character
            </DialogTitle>
            <DialogDescription className="text-md text-foreground">
              or choose an already created one
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full justify-center">
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="flex size-30 items-center justify-center rounded-full bg-blue-800 text-white shadow-md sm:size-34 hover:bg-teal-700 transition-colors cursor-pointer"
            >
              <MagicStar size={24} color="#ffffff" variant="Bold" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={
                    "min-w-[80px] sm:min-w-[120px] mt-2 rounded-lg px-4 sm:px-12 py-1.5 text-xs sm:text-sm transition-colors " +
                    (isActive
                      ? "bg-blue-800 text-white"
                      : "bg-slate-100 text-foreground hover:bg-slate-200")
                  }
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-2 grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 mx-auto">
            {MOCK_CHARACTERS.map((name) => {
              const isSelected = selectedCharacter === name;
              return (
                <div
                  key={name}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedCharacter(isSelected ? null : name)
                    }
                    className={`relative size-16 overflow-hidden rounded-full bg-blue-800 shadow-sm ${isSelected ? "ring-2 ring-blue-800" : ""
                      }`}
                    aria-pressed={isSelected}
                  >
                    <Image
                      src={CHARACTER_IMAGES[name] || "/images/child-1.png"}
                      alt={name}
                      fill
                      className="object-cover"
                    />
                    {isSelected && (
                      <div className="pointer-events-none absolute inset-0 rounded-full bg-blue-800/40" />
                    )}
                  </button>

                  {isSelected && (
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        className="flex size-6 items-center justify-center rounded-full bg-blue-800 text-white"
                        onClick={() => handleSelect(name)}
                      >
                        <AddCircle size={14} color="#ffffff" variant="Bold" />
                      </button>
                      <button
                        type="button"
                        className="flex size-6 items-center justify-center rounded-full bg-blue-800 text-white"
                      >
                        <Edit2 size={14} color="#ffffff" variant="Bold" />
                      </button>
                      <button
                        type="button"
                        className="flex size-6 items-center justify-center rounded-full bg-blue-800 text-white"
                      >
                        <Trash size={14} color="#ffffff" variant="Bold" />
                      </button>
                    </div>
                  )}

                  <span className="text-xs font-semibold text-slate-700">
                    {name}
                  </span>
                </div>
              );
            })}
          </div>

          <DialogFooter className="mt-2 flex flex-col items-center justify-center gap-4 sm:flex-col sm:justify-center">
            <button
              type="button"
              onClick={handleCreateWithoutCharacter}
              className="text-body font-semibold text-blue-800 hover:text-teal-700 text-center"
            >
              create without a character
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CreateCharacterDialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) setOpen(true);
        }}
        onCharacterCreated={handleCharacterCreated}
      />
    </>
  );
}
