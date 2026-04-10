"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homepageData from "@/data/homepage.json";
import type { HomepageData } from "@/data/types";
import { useMotion } from "@/components/motion/MotionProvider";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const data = homepageData as HomepageData;

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();
  const isMobile = useIsMobile();

  // DM lines 256-257: separate GSAP reveals with delay offset
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // DM line 256: heading
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        });
      }

      // DM line 257: subtext with 0.2 delay offset
      if (subtextRef.current) {
        gsap.from(subtextRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }

      // Button fade in
      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.4,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="bg-charcoal py-20 lg:py-32">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Decorative copper line */}
          <div className="w-12 h-px bg-copper/20 mx-auto mb-8" aria-hidden="true" />

          <h2
            ref={headingRef}
            className="font-heading text-3xl lg:text-[3rem] font-normal text-cream leading-[1.2]"
          >
            {data.vision.heading}
          </h2>

          <p
            ref={subtextRef}
            className="mt-6 font-body text-lg text-sand leading-relaxed"
          >
            {data.vision.body}
          </p>

          {/* DM line 258: Moving Border on desktop, simple button on mobile (DM 260) */}
          <div ref={buttonRef} className="mt-10">
            {isMobile ? (
              <Button variant="primary-dark" size="lg" href="/kontakt">
                Erstgespräch vereinbaren
              </Button>
            ) : (
              <a
                href="/kontakt"
                className="moving-border-btn inline-flex items-center justify-center px-8 py-4 font-body font-semibold text-lg text-white bg-copper hover:bg-copper-light rounded-lg transition-colors duration-200 relative overflow-hidden"
              >
                <span className="relative z-10">Erstgespräch vereinbaren</span>
              </a>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
