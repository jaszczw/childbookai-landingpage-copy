import type { FooterSection } from "@/lib/types";

export const footerSections: FooterSection[] = [
  {
    title: "Features",
    links: [
      { label: "AI Story Book Generator", href: "/#features" },
      { label: "Create Book", href: "/#create-book" },
      { label: "AI Illustrator", href: "/#illustrator" },
      { label: "Articles", href: "/#articles" },
      { label: "API", href: "/#api" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "FAQ", href: "/faq" },
      { label: "Affiliate Program", href: "/affiliate-program" },
      { label: "Store", href: "/store" },
    ],
  },
];

export const socialMediaLinks = [
  {
    name: "Twitter/X",
    href: "https://twitter.com/childbookai",
    ariaLabel: "Twitter/X",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/childbookai",
    ariaLabel: "Instagram",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/childbookai",
    ariaLabel: "YouTube",
  },
  {
    name: "Discord",
    href: "https://discord.gg/childbookai",
    ariaLabel: "Discord",
  },
  {
    name: "Email",
    href: "mailto:contact@childbook.ai",
    ariaLabel: "Email",
  },
] as const;

