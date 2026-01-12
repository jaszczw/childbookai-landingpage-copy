// Image dimensions
export const IMAGE_DIMENSIONS = {
  NAVBAR_BG: { width: 1320, height: 90 },
  LOGO: { width: 96, height: 38 },
  BOOK_ILLUSTRATION: { width: 1240, height: 883 },
  BOOK_MOCKUP: { width: 1240, height: 930 },
  COMBINED_STROKE: { width: 1440, height: 164 },
  MONEY_BAG: { width: 280, height: 280 },
  MONEY_BAG_BUSINESS: { width: 250, height: 250 },
  COINS: { width: 220, height: 220 },
  COINS_BUSINESS: { width: 250, height: 250 },
  SOCIAL_ICON: { width: 20, height: 20 },
  CHECK_ICON: { width: 20, height: 20 },
  FEATURE_ICON: { width: 85, height: 85 },
} as const;

// Aspect ratios
export const ASPECT_RATIOS = {
  FOOTER_BG: "1440/330",
  FEATURES: "1440/1061",
} as const;

// Spacing values
export const SPACING = {
  STEP_COLUMN_OFFSET: "35%",
} as const;

// Z-index values
export const Z_INDEX = {
  DECORATIVE_ELEMENTS: 5,
} as const;

// Scaling values
export const SCALE = {
  BOOK_MOCKUP: 2.1, // scale-210 converted to decimal (210% = 2.1)
} as const;

// Carousel configuration
export const CAROUSEL_CONFIG = {
  AUTO_PLAY_INTERVAL: 6000, // milliseconds
  TRANSITION_DURATION: 300, // milliseconds
} as const;

// Step IDs (for conditional rendering)
export const STEP_IDS = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
} as const;

// Service IDs (for conditional rendering)
export const SERVICE_IDS = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
} as const;

// Create a Book configuration
export const CREATE_BOOK_CONFIG = {
  CURRENT_STEP: "1/4",
  STEP_TEXT: "Choose character options",
} as const;
