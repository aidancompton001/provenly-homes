import type { Variants } from "motion/react";

/**
 * Motion (Framer Motion) variants for React state/mount animations.
 * GSAP scroll-triggered animations are defined inline per ANIMATION_RULES.md.
 *
 * Duration/easing values match DESIGN_MAP.md specs:
 * - Element reveal: 0.8s, easeOut
 * - Micro (hover/focus): 0.2s
 * - Page transition: [0.25, 0.1, 0.25, 1] cubic-bezier
 */

// ---- Page transition ease (cubic-bezier) ----
export const MOTION_PAGE_EASE: [number, number, number, number] = [
  0.25, 0.1, 0.25, 1,
];

// ---- Fade ----
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// ---- Directional slides (40px offset per DESIGN_MAP REVEAL preset) ----
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// ---- Scale ----
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ---- Stagger containers (Motion staggerChildren for mount animations) ----
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

// ---- Stagger child (use as children inside a stagger container) ----
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// ---- Cookie banner / overlay slide-up ----
export const slideUpOverlay: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: MOTION_PAGE_EASE },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

// ---- Carousel / testimonial slide ----
export const carouselSlide: Variants = {
  enter: { opacity: 0, x: 50 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: MOTION_PAGE_EASE },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.4, ease: MOTION_PAGE_EASE },
  },
};

// ---- FAQ accordion expand ----
export const accordionContent: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: MOTION_PAGE_EASE },
  },
};

// ---- Hover duration constant ----
export const MOTION_HOVER_DURATION = 0.2;
