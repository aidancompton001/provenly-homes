"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homepageData from "@/data/homepage.json";
import type { HomepageData } from "@/data/types";
import { useMotion } from "@/components/motion/MotionProvider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

const data = homepageData as HomepageData;
const { hero } = data;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Subheading animation
      if (subRef.current) {
        gsap.from(subRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          delay: 1.0,
        });
      }

      // CTAs animation
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          delay: 1.4,
        });
      }

      // Parallax fade on scroll
      if (sectionRef.current) {
        const content = sectionRef.current.querySelector(".hero-content");
        if (content) {
          gsap.to(content, {
            yPercent: -15,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "1% top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-charcoal overflow-hidden"
    >
      <Container className="hero-content relative z-10 py-24 lg:py-0">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            ref={headingRef}
            className="font-heading text-4xl md:text-5xl lg:text-[4rem] font-normal text-cream leading-[1.2]"
          >
            {hero.heading}
          </h1>

          <p
            ref={subRef}
            className="mt-6 font-body text-lg lg:text-xl text-sand leading-relaxed max-w-2xl mx-auto"
          >
            {hero.subheading}
          </p>

          <div
            ref={ctaRef}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {hero.ctas.map((cta) => (
              <Button key={cta.href + cta.label} variant="primary-dark" size="lg" href={cta.href}>
                {cta.label}
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
