/**
 * Layout constants
 * Aspect ratios, z-index values, and scaling constants
 */
export const ASPECT_RATIOS = {
  FOOTER_BG: "1440/330",
  FEATURES: "1440/1061",
} as const;

export const Z_INDEX = {
  DECORATIVE_ELEMENTS: 5,
} as const;

export const SCALE = {
  BOOK_MOCKUP: 2.1, // scale-210 converted to decimal (210% = 2.1)
} as const;
