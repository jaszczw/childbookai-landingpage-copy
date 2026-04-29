import type {
  StoryOption,
  StoryRemotionPreset,
} from "@/components/store/storeCoverPresets";
import type {
  MarketplaceTemplateCard,
  MarketplaceTemplateDetail,
} from "@/lib/marketplace/types";

/**
 * Static palette used to give marketplace books a bit of visual variety on
 * the Remotion-style cover preview. Marketplace API does not currently expose
 * cover colors, so we mock them deterministically from the template id.
 */
const COVER_PALETTES: ReadonlyArray<{
  titleColor: string;
  highlightColor: string;
  backgroundColor: string;
  roundedColor: string;
}> = [
  {
    titleColor: "#ffffff",
    highlightColor: "#ffd166",
    backgroundColor: "#1f4068",
    roundedColor: "#ffd166",
  },
  {
    titleColor: "#ffffff",
    highlightColor: "#f8f089",
    backgroundColor: "#3B0066",
    roundedColor: "#23324a",
  },
  {
    titleColor: "#ffffff",
    highlightColor: "#caebd8",
    backgroundColor: "#1f847d",
    roundedColor: "#23324a",
  },
  {
    titleColor: "#ffffff",
    highlightColor: "#FFD700",
    backgroundColor: "#BB752E",
    roundedColor: "#FFD700",
  },
  {
    titleColor: "#ffffff",
    highlightColor: "#bababa",
    backgroundColor: "#161515",
    roundedColor: "#111111",
  },
];

const COVER_GRADIENTS: readonly string[] = [
  "from-sky-400 to-indigo-600",
  "from-violet-500 to-fuchsia-600",
  "from-amber-300 to-rose-400",
  "from-emerald-400 to-teal-600",
  "from-orange-400 to-red-500",
];

const COVER_EMOJIS: readonly string[] = ["📖", "✨", "🌟", "🎈", "🪄"];

function pickByHash<T>(seed: string, items: readonly T[]): T {
  let total = 0;
  for (let i = 0; i < seed.length; i += 1) {
    total = (total + seed.charCodeAt(i)) % 9973;
  }
  return items[total % items.length] as T;
}

function buildRemotionPreset(
  template: MarketplaceTemplateCard | MarketplaceTemplateDetail,
): StoryRemotionPreset {
  const palette = pickByHash(template.id, COVER_PALETTES);

  // Use the marketplace cover image as both female/male variants so the
  // existing `pickCoverIllustrationVariant` returns it regardless of the
  // child's gender. This keeps StoreFlow's preview happy without needing
  // gender-specific renders.
  const variant = template.coverImg
    ? { illustrationImage: template.coverImg }
    : undefined;

  return {
    titleTemplate: "{highlight}",
    highlightTemplate: "{childName}",
    titleColor: palette.titleColor,
    highlightColor: palette.highlightColor,
    backgroundColor: palette.backgroundColor,
    roundedColor: palette.roundedColor,
    color: palette.backgroundColor,
    illustrations: {
      female: variant,
      male: variant,
    },
  };
}

/**
 * Map a marketplace template into a `StoryOption` consumable by the existing
 * StoreFlow components. Anything the marketplace API doesn't expose
 * (Remotion preset, protagonist gender, gradient/emoji) is mocked.
 */
export function templateToStory(
  template: MarketplaceTemplateCard | MarketplaceTemplateDetail,
): StoryOption {
  return {
    id: template.slug,
    title: template.title,
    description: template.excerpt ?? "",
    coverGradient: pickByHash(template.id, COVER_GRADIENTS),
    coverEmoji: pickByHash(template.id, COVER_EMOJIS),
    protagonistGender: "neutral",
    remotion: buildRemotionPreset(template),
  };
}
