"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "./MotionProvider";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  /** ScrollTrigger start position, default "top 85%" */
  start?: string;
}

function getDirectionOffset(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case "up":
      return { x: 0, y: 40 };
    case "down":
      return { x: 0, y: -40 };
    case "left":
      return { x: 40, y: 0 };
    case "right":
      return { x: -40, y: 0 };
  }
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className,
  start = "top 85%",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reduced motion: ensure element is visible, no animation
    if (reducedMotion) {
      gsap.set(el, { opacity: 1, x: 0, y: 0 });
      return;
    }

    const { x, y } = getDirectionOffset(direction);

    // Set initial hidden state
    gsap.set(el, { opacity: 0, x, y });

    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, delay, duration, start, reducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
