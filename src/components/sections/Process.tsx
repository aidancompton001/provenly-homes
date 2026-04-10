"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homepageData from "@/data/homepage.json";
import type { HomepageData } from "@/data/types";
import { useMotion } from "@/components/motion/MotionProvider";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const data = homepageData as HomepageData;
const { process } = data;

export default function Process() {
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const line = timelineLineRef.current;
    const section = sectionRef.current;
    if (!line || !section) return;

    const ctx = gsap.context(() => {
      gsap.from(line, {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="bg-cream py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl lg:text-[3rem] font-normal text-charcoal leading-[1.2]">
              {process.heading}
            </h2>
            <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
              {process.subheading}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-2xl mx-auto">
          {/* Timeline vertical line — animated draw */}
          <div
            ref={timelineLineRef}
            className="absolute left-6 lg:left-8 top-0 bottom-0 w-px bg-copper/30"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12 lg:gap-16">
            {process.steps.map((step, index) => (
              <ScrollReveal
                key={step.number}
                delay={index * 0.15}
                direction="up"
              >
                <div className="relative flex gap-6 lg:gap-8">
                  {/* Step number badge */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-copper text-white font-heading text-xl lg:text-2xl font-bold shrink-0 shadow-[0_2px_8px_rgba(184,115,51,0.3)]">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="pt-1 lg:pt-3">
                    <h3 className="font-heading text-xl lg:text-2xl font-semibold text-charcoal">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-body text-base text-charcoal-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
