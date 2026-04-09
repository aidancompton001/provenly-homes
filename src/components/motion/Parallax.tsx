"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotion } from "./MotionProvider";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxProps {
  children: ReactNode;
  /** Parallax speed factor. Positive = moves slower than scroll (default 0.2).
   *  Higher values = more dramatic offset. */
  speed?: number;
  className?: string;
}

/**
 * Parallax — applies a GSAP scroll-linked Y offset to its children.
 * Uses ScrollTrigger with scrub: true for smooth scroll-linked motion.
 */
export default function Parallax({
  children,
  speed = 0.2,
  className,
}: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    // No parallax for reduced motion
    if (reducedMotion) {
      gsap.set(inner, { y: 0 });
      return;
    }

    // Calculate the Y offset based on speed.
    // speed 0.2 means the inner element moves 20% of the scroll distance.
    const yOffset = speed * 100;

    const tween = gsap.fromTo(
      inner,
      { y: -yOffset },
      {
        y: yOffset,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, reducedMotion]);

  return (
    <div ref={containerRef} className={className} style={{ overflow: "hidden" }}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
