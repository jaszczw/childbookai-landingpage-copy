/**
 * Polish store themes aligned with product StoryTemplate + ColorTheme presets.
 * Cover images: Remotion mockup service (see buildStoreRemotionCoverUrl).
 */

export const REMOTION_COVER_BASE =
  "https://remotion-books-production.up.railway.app/bajka-omnie/cover";

/** Shared demo face for store preview when photo is not an absolute URL */
const STORE_PREVIEW_DEMO_CHILD_IMAGE =
  "https://images.childbook.ai/sig/s:256:256/czM6Ly9jaGlsZGJvb2stcGhvdG8tdXBsb2Fkcy9jaGFyYWN0ZXJzL2NtYTUyaTR2NjAwMDhsYTA0czd1dWZmbXMvNTdiNTA2ZjktNjIyYS00OTExLTg5ZjEtYjM0MmU3ODE5YzUx";

/** Child gender from the store flow; drives neutral-cover illustration choice */
export type StoreChildGender = "girl" | "boy";

/**
 * Who the story’s hero framing targets — also which illustration slots apply.
 * - neutral: offered to every child; pick female/male art from child gender.
 * - female: girl-protagonist stories (e.g. princess); offered only when child is a girl.
 * - male: boy-protagonist stories (e.g. knight); offered only when child is a boy.
 */
export type StoryProtagonistGender = "neutral" | "female" | "male";

export interface CoverIllustrationVariant {
  illustrationImage?: string;
  /** CUID of the source illustration (e.g. for parity with bajka-omnie cover tooling) */
  illustrationId?: string;
  illustrationTopOffset?: number;
}

export interface StoryRemotionPreset {
  titleTemplate: string;
  highlightTemplate: string;
  titleColor: string;
  highlightColor: string;
  backgroundColor: string;
  roundedColor: string;
  /** Cover accent; often matches background for bajka-omnie layout */
  color: string;
  /** Slots used according to the story’s `protagonistGender` */
  illustrations: {
    female?: CoverIllustrationVariant;
    male?: CoverIllustrationVariant;
  };
  /** Fallback child face when photo URL is missing or not absolute (SSR-safe) */
  demoChildImage?: string;
}

export interface StoryOption {
  id: string;
  title: string;
  description: string;
  coverGradient: string;
  coverEmoji: string;
  /** Hero framing + which children see this story in the picker */
  protagonistGender: StoryProtagonistGender;
  remotion: StoryRemotionPreset;
}

export const STORY_OPTIONS: StoryOption[] = [
  {
    id: "princess",
    title: "Księżniczka i klątwa Elodii",
    description:
      "Magiczna opowieść o odwadze i przyjaźni w zaczarowanym królestwie",
    coverGradient: "from-amber-200 to-rose-300",
    coverEmoji: "👑",
    protagonistGender: "female",
    remotion: {
      titleTemplate: "{highlight}\n I KLĄTWA ELODII",
      highlightTemplate: "Księżniczka {childName}",
      titleColor: "#ffffff",
      highlightColor: "#89272a",
      backgroundColor: "#f2c274",
      roundedColor: "#23324a",
      color: "#f2c274",
      illustrations: {
        female: {
          illustrationImage:
            "https://childbook-b2.b-cdn.net/illustrations/cma3yz028009fju04kmfv8zxn/eada1939-4cc5-4348-b124-c9411c7b5234_0.webp",
          illustrationTopOffset: -195,
        },
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "dinosaur",
    title: "Magiczne jajo dinozaura",
    description: "Wyprawy w prehistorię i spotkanie z wyjątkowym jajem",
    coverGradient: "from-emerald-800 to-lime-700",
    coverEmoji: "🦕",
    protagonistGender: "neutral",
    remotion: {
      titleTemplate: "{highlight} I MAGICZNE JAJO DINOZAURA",
      highlightTemplate: "{childName}",
      titleColor: "#ffffff",
      highlightColor: "#e2e3bd",
      backgroundColor: "#203f33",
      roundedColor: "#dedede",
      color: "#203f33",
      illustrations: {
        male: {
          /* Add illustrationImage when male dino hero asset is ready */
        },
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "space",
    title: "Sekret lodowej planety",
    description: "Podróż w kosmos i tajemnica odległej planety",
    coverGradient: "from-sky-300 to-indigo-500",
    coverEmoji: "🚀",
    protagonistGender: "neutral",
    remotion: {
      titleTemplate: "{highlight} i Sekret Lodowej Planety",
      highlightTemplate: "{childName}",
      titleColor: "#ffffff",
      highlightColor: "#001e69",
      backgroundColor: "#8dbde6",
      roundedColor: "#23324a",
      color: "#8dbde6",
      illustrations: {
        female: {
          /* Add illustrationImage when girl space hero is ready */
        },
        male: {
          /* Add illustrationImage when boy space hero is ready */
        },
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "mermaid",
    title: "Serce Atlantydy",
    description: "Podwodna przygoda i legenda zatopionego miasta",
    coverGradient: "from-teal-500 to-cyan-700",
    coverEmoji: "🧜‍♀️",
    protagonistGender: "female",
    remotion: {
      titleTemplate: "{highlight}\n I SERCE ATLANTYDY",
      highlightTemplate: "Syrenka {childName}",
      titleColor: "#ffffff",
      highlightColor: "#caebd8",
      backgroundColor: "#1f847d",
      roundedColor: "#23324a",
      color: "#1f847d",
      illustrations: {
        female: {
          illustrationImage:
            "https://childbook-b2.b-cdn.net/illustrations/cma52id1000c5la04vfikivfr/5c40aca3-132d-4fdb-aa6d-b2fbea8dfc90_0.webp",
          illustrationId: "cma52id1000c5la04vfikivfr",
          illustrationTopOffset: -195,
        },
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "faraon",
    title: "Skarb faraona",
    description:
      "Egipska przygoda, tajemnice piramid i skarb ukryty w piaskach",
    coverGradient: "from-amber-700 to-yellow-600",
    coverEmoji: "🏺",
    protagonistGender: "neutral",
    remotion: {
      titleTemplate: "{highlight}\n I SKARB FARAONA",
      highlightTemplate: "{childName}",
      titleColor: "#ffffff",
      highlightColor: "#FFD700",
      backgroundColor: "#BB752E",
      roundedColor: "#FFD700",
      color: "#BB752E",
      illustrations: {
        female: {},
        male: {},
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "halloween",
    title: "Nawiedzony dom",
    description: "Dreszczowiec pełen zagadek, cieni i halloweenowej magii",
    coverGradient: "from-orange-500 to-purple-950",
    coverEmoji: "🎃",
    protagonistGender: "neutral",
    remotion: {
      titleTemplate: "{highlight}\n i Nawiedzony Dom",
      highlightTemplate: "{childName}",
      titleColor: "#ffffff",
      highlightColor: "#452002",
      backgroundColor: "#f77f1c",
      roundedColor: "#000000",
      color: "#f77f1c",
      illustrations: {
        female: {},
        male: {},
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "jungle",
    title: "Skarb pod drzewem życia",
    description: "Ekspedycja przez dżunglę, dzika przyroda i legendarne drzewo",
    coverGradient: "from-green-800 to-emerald-950",
    coverEmoji: "🌴",
    protagonistGender: "neutral",
    remotion: {
      titleTemplate: "Odważny {highlight} I Skarb pod Drzewem życia",
      highlightTemplate: "{childName}",
      titleColor: "#ffffff",
      highlightColor: "#E6E044",
      backgroundColor: "#435F21",
      roundedColor: "#E09712",
      color: "#435F21",
      illustrations: {
        female: {},
        male: {},
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "knight",
    title: "Legenda niebieskiej lawy",
    description: "Rycerska wyprawa, złowroga lawa i mit, który ożywa",
    coverGradient: "from-zinc-800 to-neutral-950",
    coverEmoji: "⚔️",
    protagonistGender: "male",
    remotion: {
      titleTemplate: "{highlight}\n I LEGENDA NIEBIESKIEJ LAWY",
      highlightTemplate: "Rycerz {childName}",
      titleColor: "#ffffff",
      highlightColor: "#bababa",
      backgroundColor: "#161515",
      roundedColor: "#111",
      color: "#161515",
      illustrations: {
        female: {},
        male: {},
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "lost-star",
    title: "Zagubiona gwiazda północy",
    description: "Zimowa opowieść o gwieździe, która zgubiła drogę na niebie",
    coverGradient: "from-blue-950 to-amber-800",
    coverEmoji: "⭐",
    protagonistGender: "neutral",
    remotion: {
      titleTemplate: "{highlight} i Zagubiona Gwiazda Północy",
      highlightTemplate: "{childName}",
      titleColor: "#ffffff",
      highlightColor: "#FFD700",
      backgroundColor: "#1a3a5c",
      roundedColor: "#FFD700",
      color: "#1a3a5c",
      illustrations: {
        female: {},
        male: {},
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "magic-elixir",
    title: "Magiczny eliksir",
    description: "Alchemia, eliksiry i tajemnica, która zmienia wszystko",
    coverGradient: "from-violet-950 to-purple-800",
    coverEmoji: "🧪",
    protagonistGender: "neutral",
    remotion: {
      titleTemplate: "{highlight}\n i Magiczny Eliksir",
      highlightTemplate: "{childName}",
      titleColor: "#ffffff",
      highlightColor: "#f8f089",
      backgroundColor: "#3B0066",
      roundedColor: "#23324a",
      color: "#3B0066",
      illustrations: {
        female: {},
        male: {},
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "pirate",
    title: "Bestia z głębin",
    description: "Na pokładzie — morze, mapa skarbów i bestia z głębin",
    coverGradient: "from-amber-900 to-yellow-950",
    coverEmoji: "🏴‍☠️",
    protagonistGender: "neutral",
    remotion: {
      titleTemplate: "{highlight}\n I BESTIA Z GŁĘBIN",
      highlightTemplate: "Pirat {childName}",
      titleColor: "#ffffff",
      highlightColor: "#bababa",
      backgroundColor: "#5b4229",
      roundedColor: "#111",
      color: "#5b4229",
      illustrations: {
        female: {},
        male: {},
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "school-of-magic",
    title: "Szkoła magii",
    description:
      "Rok w magicznej szkole — czary, przyjaciele i pierwsze zaklęcia",
    coverGradient: "from-red-950 to-amber-900",
    coverEmoji: "🪄",
    protagonistGender: "neutral",
    remotion: {
      titleTemplate: "{highlight} i Szkoła Magii",
      highlightTemplate: "{childName}",
      titleColor: "#ffffff",
      highlightColor: "#ffd700",
      backgroundColor: "#530404",
      roundedColor: "#23324a",
      color: "#530404",
      illustrations: {
        female: {},
        male: {},
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
  {
    id: "unicorn",
    title: "Zaczarowany las",
    description: "Jednorożce, las pełen czarów i przygoda poza mapą",
    coverGradient: "from-purple-900 to-fuchsia-700",
    coverEmoji: "🦄",
    protagonistGender: "neutral",
    remotion: {
      titleTemplate: "{highlight} I ZACZAROWANY LAS",
      highlightTemplate: "{childName}",
      titleColor: "#ffffff",
      highlightColor: "#e0cee9",
      backgroundColor: "#432651",
      roundedColor: "#23324a",
      color: "#432651",
      illustrations: {
        female: {},
        male: {},
      },
      demoChildImage: STORE_PREVIEW_DEMO_CHILD_IMAGE,
    },
  },
];

export function buildHighlight(
  highlightTemplate: string,
  childName: string,
): string {
  const n = childName.trim() || "…";
  return highlightTemplate.replace(/\{childName\}/g, n);
}

/** Whether the story appears in the picker for this child gender (unknown → all). */
export function isStoryOfferedForChildGender(
  protagonistGender: StoryProtagonistGender,
  childGender: StoreChildGender | null,
): boolean {
  if (childGender === null) return true;
  switch (protagonistGender) {
    case "neutral":
      return true;
    case "female":
      return childGender === "girl";
    case "male":
      return childGender === "boy";
  }
}

export function getVisibleStoryOptions(
  childGender: StoreChildGender | null,
): StoryOption[] {
  return STORY_OPTIONS.filter((s) =>
    isStoryOfferedForChildGender(s.protagonistGender, childGender),
  );
}

export function pickCoverIllustrationVariant(
  preset: StoryRemotionPreset,
  protagonistGender: StoryProtagonistGender,
  gender: StoreChildGender | null,
): CoverIllustrationVariant | undefined {
  const { illustrations } = preset;
  const female = illustrations.female;
  const male = illustrations.male;

  switch (protagonistGender) {
    case "female":
      return female;
    case "male":
      return male;
    case "neutral": {
      const useMale = gender === "boy";
      if (useMale) return male ?? female;
      return female ?? male;
    }
  }
}

function resolveChildImageUrl(
  photoUrl: string | null,
  demoChildImage: string | undefined,
): string | undefined {
  if (!photoUrl) return demoChildImage;
  if (photoUrl.startsWith("http://") || photoUrl.startsWith("https://")) {
    return photoUrl;
  }
  return demoChildImage;
}

export function buildStoreRemotionCoverUrl(
  preset: StoryRemotionPreset,
  ctx: {
    childName: string;
    photoUrl: string | null;
    gender?: StoreChildGender | null;
    protagonistGender: StoryProtagonistGender;
  },
): string {
  const highlight = buildHighlight(preset.highlightTemplate, ctx.childName);
  const params = new URLSearchParams();
  params.set("title", preset.titleTemplate);
  params.set("highlight", highlight);
  params.set("titleColor", preset.titleColor);
  params.set("highlightColor", preset.highlightColor);
  params.set("roundedColor", preset.roundedColor);
  params.set("color", preset.color);
  params.set("backgroundColor", preset.backgroundColor);

  const variant = pickCoverIllustrationVariant(
    preset,
    ctx.protagonistGender,
    ctx.gender ?? null,
  );
  if (variant?.illustrationImage) {
    params.set("illustrationImage", variant.illustrationImage);
    if (variant.illustrationTopOffset != null) {
      params.set(
        "illustrationTopOffset",
        String(variant.illustrationTopOffset),
      );
    }
  }

  const childImage = resolveChildImageUrl(ctx.photoUrl, preset.demoChildImage);
  if (childImage) {
    params.set("childImage", childImage);
  }

  return `${REMOTION_COVER_BASE}?${params.toString()}`;
}

/** Distinct Remotion cover URLs to warm cache (neutral stories include both genders). */
export function getStoreCoverPreloadUrls(
  ctx: { childName: string; photoUrl: string | null } = {
    childName: "Maja",
    photoUrl: null,
  },
): string[] {
  const urls: string[] = [];

  for (const story of STORY_OPTIONS) {
    const { remotion: preset, protagonistGender } = story;
    switch (protagonistGender) {
      case "neutral":
        urls.push(
          buildStoreRemotionCoverUrl(preset, {
            ...ctx,
            gender: "girl",
            protagonistGender,
          }),
          buildStoreRemotionCoverUrl(preset, {
            ...ctx,
            gender: "boy",
            protagonistGender,
          }),
        );
        break;
      case "female":
        urls.push(
          buildStoreRemotionCoverUrl(preset, {
            ...ctx,
            gender: "girl",
            protagonistGender,
          }),
        );
        break;
      case "male":
        urls.push(
          buildStoreRemotionCoverUrl(preset, {
            ...ctx,
            gender: "boy",
            protagonistGender,
          }),
        );
        break;
    }
  }

  return [...new Set(urls)];
}

export function getStoryOption(id: string): StoryOption | undefined {
  return STORY_OPTIONS.find((s) => s.id === id);
}
