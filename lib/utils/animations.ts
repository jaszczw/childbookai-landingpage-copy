/**
 * Reusable Framer Motion animation variants and utilities
 * Professional, consistent animations for the landing page
 */

import { Variants, Transition } from "framer-motion";

/**
 * Common transition presets
 */
export const transitions = {
  smooth: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // easeOutCubic
  },
  snappy: {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number], // easeInOut
  },
  gentle: {
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], // easeOutQuad
  },
  quick: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },
} as const;

/**
 * Fade in from bottom (most common entrance)
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

/**
 * Fade in from top
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

/**
 * Fade in from left
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

/**
 * Fade in from right
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

/**
 * Scale in (for icons, images)
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
};

/**
 * Container for staggered children animations
 */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger container with faster stagger
 */
export const staggerContainerFast: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

/**
 * Stagger container with slower stagger (for larger sections)
 */
export const staggerContainerSlow: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Viewport-based animation (scroll reveal)
 * Use with whileInView prop
 */
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

/**
 * Scroll reveal from left
 */
export const scrollRevealLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

/**
 * Scroll reveal from right
 */
export const scrollRevealRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

/**
 * Hero text entrance (more dramatic)
 */
export const heroText: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...transitions.gentle,
      delay: 0.1,
    },
  },
};

/**
 * Hero image/illustration entrance
 */
export const heroImage: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...transitions.gentle,
      delay: 0.2,
    },
  },
};

/**
 * Card hover animation
 */
export const cardHover = {
  scale: 1.02,
  y: -4,
  transition: transitions.quick,
};

/**
 * Card tap animation
 */
export const cardTap = {
  scale: 0.98,
  transition: transitions.quick,
};

/**
 * Mobile menu slide in
 */
export const mobileMenu: Variants = {
  closed: {
    opacity: 0,
    y: -10,
    transition: transitions.quick,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

/**
 * Mobile menu item stagger
 */
export const mobileMenuContainer: Variants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

/**
 * Carousel slide transition - Horizontal slide only (no fade)
 */
export const carouselSlide: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
};

/**
 * Gentle floating animation (for decorative elements)
 */
export const floating: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "loop" as const,
      ease: "easeInOut",
    },
  },
};

/**
 * Viewport settings for scroll-based animations
 */
export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -100px 0px",
} as const;

export const viewportOnceStrict = {
  once: true,
  amount: 0.3,
} as const;
