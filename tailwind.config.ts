import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      mobile: "360px", // small phones and up
      sm: "640px", // Tailwind default (small tablets)
      tablet: "768px", // tablets portrait/landscape
      md: "768px", // keep default alias
      lg: "1024px", // laptops
      laptop: "1200px", // wider laptops
      xl: "1280px", // large desktops
      desktop: "1440px", // full HD desktops
      "2xl": "1536px", // very large screens
    },
    extend: {
      colors: {
        grey: {
          100: "var(--grey-100)",
          200: "var(--grey-200)",
          hover: "var(--grey-hover)",
          active: "var(--grey-active)",
          disabled: "var(--grey-disabled)",
        },
        blue: {
          100: "var(--blue-100)",
          200: "var(--blue-200)",
          400: "var(--blue-400)",
          600: "var(--blue-600)",
          800: "var(--blue-800)",
          1000: "var(--blue-1000)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
