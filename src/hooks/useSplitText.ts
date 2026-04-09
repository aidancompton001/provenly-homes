"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useMotion } from "@/components/motion/MotionProvider";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface UseSplitTextOptions {
  /** Animation type: "chars" | "words" | "lines", default "chars" */
  type?: "chars" | "words" | "lines";
  /** Stagger delay between each unit, default 0.03 */
  stagger?: number;
  /** Duration of each unit animation, default 0.8 */
  duration?: number;
  /** Y offset as percent, default 100 */
  yPercent?: number;
  /** Ease, default "power2.out" */
  ease?: string;
  /** Optional delay before animation starts */
  delay?: number;
  /** If true, trigger on scroll instead of on mount. Default false. */
  triggerOnScroll?: boolean;
  /** ScrollTrigger start position, default "top 85%" */
  scrollStart?: string;
}

/**
 * useSplitText — splits text in the referenced element into chars/words/lines
 * using GSAP SplitText, then animates them in.
 *
 * Returns the SplitText instance ref (null until mounted).
 *
 * Respects prefers-reduced-motion: shows text immediately, no split.
 */
export function useSplitText(
  elementRef: RefObject<HTMLElement | null>,
  options: UseSplitTextOptions = {}
) {
  const {
    type = "chars",
    stagger = 0.03,
    duration = 0.8,
    yPercent = 100,
    ease = "power2.out",
    delay = 0,
    triggerOnScroll = false,
    scrollStart = "top 85%",
  } = options;

  const splitRef = useRef<SplitText | null>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Reduced motion: ensure text is visible, no animation
    if (reducedMotion) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    // Create the SplitText instance
    const split = SplitText.create(el, { type });
    splitRef.current = split;

    // Get the array of split elements based on type
    const targets =
      type === "chars"
        ? split.chars
        : type === "words"
          ? split.words
          : split.lines;

    if (!targets || targets.length === 0) return;

    // Set initial state — elements are hidden with yPercent offset and zero opacity
    gsap.set(targets, { yPercent, opacity: 0 });
    // Make sure the parent element is visible (it might have been hidden to prevent FOUC)
    gsap.set(el, { opacity: 1 });

    const animationConfig: gsap.TweenVars = {
      yPercent: 0,
      opacity: 1,
      stagger,
      duration,
      ease,
      delay: triggerOnScroll ? 0 : delay,
    };

    if (triggerOnScroll) {
      animationConfig.scrollTrigger = {
        trigger: el,
        start: scrollStart,
        toggleActions: "play none none none",
      };
    }

    const tween = gsap.to(targets, animationConfig);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
      splitRef.current = null;
    };
  }, [
    elementRef,
    type,
    stagger,
    duration,
    yPercent,
    ease,
    delay,
    triggerOnScroll,
    scrollStart,
    reducedMotion,
  ]);

  return splitRef;
}
