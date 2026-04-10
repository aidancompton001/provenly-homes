// Shared animation presets — from DESIGN_MAP.md lines 386-423
// All values are EXACT specs from the design document.

export const REVEAL = {
  from: { opacity: 0, y: 40 },
  duration: 0.8,
  ease: "power2.out",
  triggerStart: "top 75%",
};

export const STAGGER = {
  from: { opacity: 0, y: 30 },
  stagger: 0.1,
  duration: 0.7,
  ease: "power2.out",
  triggerStart: "top 65%",
};

export const HEADING_REVEAL = {
  from: { opacity: 0, y: 40 },
  duration: 0.8,
  ease: "power2.out",
  triggerStart: "top 75%",
};

export const CHAR_SPLIT = {
  from: { yPercent: 150 },
  stagger: 0.03,
  duration: 0.8,
  ease: "power3.out",
};

export const CLIPPATH_REVEAL = {
  from: "polygon(0 0, 0 0, 0 100%, 0 100%)",
  to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  duration: 0.8,
  ease: "circ.out",
};

export const MOTION_PAGE_EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
export const MOTION_HOVER_DURATION = 0.2;
