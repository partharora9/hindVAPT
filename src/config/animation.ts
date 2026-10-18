import type { Variants, Transition } from "framer-motion";

export const EASINGS = {
  cyber: [0.16, 1, 0.3, 1] as const,
  expoOut: [0.16, 1, 0.3, 1] as const,
  buttonHover: [0.22, 1, 0.36, 1] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,
};

export const DELAYS = {
  frame: 0.0,
  navbar: 0.2,
  divider: 0.4,
  h1: 0.5,
  tracesStart: 0.6,
  ringStart: 0.9,
  paragraph: 1.0,
  hudLine: 1.2,
  shieldBloom: 1.2,
  buttons: 1.4,
  stats: 1.6,
  keyholeFlash: 1.8,
};

export const DURATIONS = {
  fadeGrid: 1.0,
  bracketDraw: 1.2,
  navSlide: 0.8,
  dividerDraw: 1.1,
  paragraphFade: 0.9,
  hudDraw: 0.9,
  buttonRise: 0.8,
  shieldScale: 1.2,
  ringDraw: 1.4,
  statsCountUp: 2.0,
};

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

export const navVariants: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: DELAYS.navbar,
      duration: DURATIONS.navSlide,
      ease: EASINGS.cyber,
    },
  },
};

export const logoVariants: Variants = {
  hidden: { opacity: 0, rotate: -90, scale: 0.7 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      delay: DELAYS.navbar + 0.05,
      duration: 0.8,
      ease: EASINGS.cyber,
    },
  },
};

export const dividerVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      delay: DELAYS.divider,
      duration: DURATIONS.dividerDraw,
      ease: EASINGS.cyber,
    },
  },
};

export const paragraphVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: DELAYS.paragraph,
      duration: DURATIONS.paragraphFade,
      ease: EASINGS.cyber,
    },
  },
};

export const buttonContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: DELAYS.buttons,
      duration: DURATIONS.buttonRise,
      ease: EASINGS.cyber,
    },
  },
};

export const statsContainerVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: DELAYS.stats,
      duration: 0.9,
      ease: EASINGS.cyber,
    },
  },
};

export const shieldContainerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: DELAYS.shieldBloom,
      duration: DURATIONS.shieldScale,
      ease: EASINGS.cyber,
    },
  },
};

export const ringVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: DELAYS.ringStart,
      duration: DURATIONS.ringDraw,
      ease: EASINGS.cyber,
    },
  },
};
