"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homepageData from "@/data/homepage.json";
import type { HomepageData } from "@/data/types";
import { useMotion } from "@/components/motion/MotionProvider";
import Container from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

const data = homepageData as HomepageData;
const stats = data.vision.stats;

function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (match) {
    return { num: parseInt(match[1], 10), suffix: match[2] };
  }
  return { num: 0, suffix: value };
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(".stat-item");
      const numbers = el.querySelectorAll(".stat-number");
      const suffixes = el.querySelectorAll(".stat-suffix");

      gsap.from(items, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      numbers.forEach((numEl) => {
        const target = parseInt(numEl.getAttribute("data-value") || "0", 10);
        gsap.from(numEl, {
          textContent: 0,
          duration: 2,
          ease: "power1.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          onUpdate() {
            // textContent is set by GSAP snap
          },
        });
      });

      gsap.from(suffixes, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "back.out(1.7)",
        delay: 2,
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="bg-cream py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {stats.map((stat) => {
            const { num, suffix } = parseStatValue(stat.value);
            return (
              <div key={stat.label} className="stat-item text-center">
                <div className="flex items-baseline justify-center">
                  <span
                    className="stat-number font-heading text-5xl lg:text-6xl font-bold text-copper"
                    data-value={num}
                  >
                    {reducedMotion ? num : 0}
                  </span>
                  {suffix && (
                    <span className="stat-suffix font-heading text-3xl lg:text-4xl font-bold text-copper">
                      {suffix}
                    </span>
                  )}
                </div>
                <p className="mt-3 font-body text-sm lg:text-base text-charcoal-light leading-relaxed max-w-xs mx-auto">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
