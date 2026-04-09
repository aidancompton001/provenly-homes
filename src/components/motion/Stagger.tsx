"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useMotion } from "./MotionProvider";

gsap.registerPlugin(ScrollTrigger);

interface StaggerProps {
  children: ReactNode;
  /** Delay between each child animation, default 0.1s */
  staggerDelay?: number;
  className?: string;
  /** If true, uses GSAP ScrollTrigger to stagger on scroll.
   *  If false (default), uses Motion staggerChildren on mount. */
  triggerOnScroll?: boolean;
  /** ScrollTrigger start position, default "top 65%" */
  start?: string;
  /** Duration per child, default 0.7s */
  duration?: number;
}

/**
 * Stagger — staggers direct children either on scroll (GSAP) or mount (Motion).
 *
 * For scroll mode: wraps children in a container and uses GSAP to stagger
 * the direct child elements.
 *
 * For mount mode: wraps each child in a motion.div with staggerChildren.
 */
export default function Stagger({
  children,
  staggerDelay = 0.1,
  className,
  triggerOnScroll = false,
  start = "top 65%",
  duration = 0.7,
}: StaggerProps) {
  const { reducedMotion } = useMotion();

  // ------- SCROLL MODE (GSAP ScrollTrigger) -------
  if (triggerOnScroll) {
    return (
      <StaggerScroll
        staggerDelay={staggerDelay}
        className={className}
        start={start}
        duration={duration}
        reducedMotion={reducedMotion}
      >
        {children}
      </StaggerScroll>
    );
  }

  // ------- MOUNT MODE (Motion staggerChildren) -------
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ---- Internal scroll-triggered stagger component ----

interface StaggerScrollProps {
  children: ReactNode;
  staggerDelay: number;
  className?: string;
  start: string;
  duration: number;
  reducedMotion: boolean;
}

function StaggerScroll({
  children,
  staggerDelay,
  className,
  start,
  duration,
  reducedMotion,
}: StaggerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const childElements = container.children;
    if (childElements.length === 0) return;

    if (reducedMotion) {
      gsap.set(childElements, { opacity: 1, y: 0 });
      return;
    }

    // Set initial hidden state
    gsap.set(childElements, { opacity: 0, y: 30 });

    const tween = gsap.to(childElements, {
      opacity: 1,
      y: 0,
      stagger: staggerDelay,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [staggerDelay, start, duration, reducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
