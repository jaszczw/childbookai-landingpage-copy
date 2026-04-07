import type { EyeColor, HairColor, HairLength } from "./useStoreState";

export const EYE_COLORS: { value: EyeColor; color: string; label: string }[] =
  [
    { value: "blue", color: "bg-blue-500", label: "Niebieskie" },
    { value: "green", color: "bg-emerald-500", label: "Zielone" },
    { value: "brown", color: "bg-amber-700", label: "Brązowe" },
    { value: "black", color: "bg-neutral-800", label: "Czarne" },
  ];

export const HAIR_COLORS: {
  value: HairColor;
  label: string;
  color: string;
}[] = [
  { value: "blonde", label: "Blond", color: "bg-amber-300" },
  { value: "brown", label: "Brązowe", color: "bg-amber-700" },
  { value: "black", label: "Czarne", color: "bg-neutral-800" },
  { value: "red", label: "Rude", color: "bg-orange-600" },
  { value: "auburn", label: "Kasztanowe", color: "bg-red-900" },
];

export const HAIR_LENGTHS: { value: HairLength; label: string }[] = [
  { value: "short", label: "Krótkie" },
  { value: "medium", label: "Średnie" },
  { value: "long", label: "Długie" },
];
