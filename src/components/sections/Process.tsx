"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homepageData from "@/data/homepage.json";
import type { HomepageData } from "@/data/types";
import { useMotion } from "@/components/motion/MotionProvider";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { CLIPPATH_REVEAL } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const data = homepageData as HomepageData;
const { process } = data;

export default function Process() {
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const line = timelineLineRef.current;
    const section = sectionRef.current;
    const stepsEl = stepsRef.current;
    if (!line || !section || !stepsEl) return;

    const ctx = gsap.context(() => {
      // Timeline line draw (DM line 169)
      gsap.from(line, {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // Per-step animations (DM lines 170-172)
      const steps = stepsEl.querySelectorAll(".process-step");
      steps.forEach((step, index) => {
        const isOdd = index % 2 === 0; // 0-indexed: step 1 = index 0 = odd

        // DM line 170: alternating sides — odd from left (x:-40), even from right (x:40)
        gsap.from(step, {
          opacity: 0,
          x: isOdd ? -40 : 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 60%", // DM line 170: individual trigger top 60%
            toggleActions: "play none none none",
          },
        });

        // DM line 171: badge scale bounce
        const badge = step.querySelector(".step-badge");
        if (badge) {
          gsap.from(badge, {
            scale: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: step,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          });
        }

        // DM line 172: ClipPath reveal on titles
        const title = step.querySelector(".step-title");
        if (title) {
          gsap.fromTo(title,
            { clipPath: CLIPPATH_REVEAL.from },
            {
              clipPath: CLIPPATH_REVEAL.to,
              duration: CLIPPATH_REVEAL.duration,
              ease: CLIPPATH_REVEAL.ease,
              scrollTrigger: {
                trigger: step,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
        }
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

        <div ref={stepsRef} className="relative max-w-2xl mx-auto">
          {/* Timeline vertical line */}
          <div
            ref={timelineLineRef}
            className="absolute left-6 lg:left-8 top-0 bottom-0 w-px bg-copper/30"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12 lg:gap-16">
            {process.steps.map((step) => (
              <div key={step.number} className="process-step relative flex gap-6 lg:gap-8">
                {/* Step number badge — DM line 171: bounce */}
                <div className="step-badge relative z-10 flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-copper text-white font-heading text-xl lg:text-2xl font-bold shrink-0 shadow-[0_2px_8px_rgba(184,115,51,0.3)]">
                  {step.number}
                </div>

                {/* Content */}
                <div className="pt-1 lg:pt-3">
                  {/* DM line 172: ClipPath reveal */}
                  <h3 className="step-title font-heading text-xl lg:text-2xl font-semibold text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-3 font-body text-base text-charcoal-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
