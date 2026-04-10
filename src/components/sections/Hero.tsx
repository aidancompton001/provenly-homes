"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import homepageData from "@/data/homepage.json";
import type { HomepageData } from "@/data/types";
import { useMotion } from "@/components/motion/MotionProvider";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { getImageUrl } from "@/lib/getImageUrl";
import { useIsMobile } from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger, SplitText);

const data = homepageData as HomepageData;
const { hero } = data;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();
  const isMobile = useIsMobile();

  // Spotlight cursor effect (DM line 105)
  useEffect(() => {
    if (reducedMotion || isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      section.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion, isMobile]);

  useEffect(() => {
    if (reducedMotion) {
      // Show everything immediately
      if (headingRef.current) gsap.set(headingRef.current, { opacity: 1 });
      if (subRef.current) gsap.set(subRef.current, { opacity: 1 });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // === HEADING ===
      if (headingRef.current) {
        if (isMobile) {
          // Mobile: whole block fade, NO SplitText (DM line 106: "chars too small")
          gsap.from(headingRef.current, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5,
          });
          gsap.set(headingRef.current, { opacity: 1 });
        } else {
          // Desktop: SplitText char reveal (DM line 101)
          const split = SplitText.create(headingRef.current, { type: "chars" });
          gsap.set(headingRef.current, { opacity: 1 });
          gsap.from(split.chars, {
            yPercent: 150, // DM: 150 not 100
            opacity: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: "power3.out", // DM: power3 not power2
            delay: 0.5,
          });
        }
      }

      // === SUBHEADING: Text Generate Effect (DM line 102) ===
      if (subRef.current) {
        if (isMobile) {
          // Mobile: simple fade
          gsap.from(subRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: "power2.out",
            delay: 1.0,
          });
        } else {
          // Desktop: word-by-word fade (Aceternity Text Generate Effect)
          const splitSub = SplitText.create(subRef.current, { type: "words" });
          gsap.set(subRef.current, { opacity: 1 });
          gsap.from(splitSub.words, {
            opacity: 0,
            y: 20,
            stagger: 0.04,
            duration: 0.6,
            ease: "power2.out",
            delay: 1.2,
          });
        }
      }

      // === CTAs ===
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          delay: 1.6,
        });
      }

      // === Parallax fade on scroll (DM line 104) — desktop only ===
      if (sectionRef.current && !isMobile) {
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
  }, [reducedMotion, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-charcoal overflow-hidden"
    >
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={getImageUrl("/images/hero-bg.png")}
          alt=""
          width={1536}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
      </div>

      {/* Spotlight cursor effect (DM line 105) — desktop only */}
      {!isMobile && !reducedMotion && (
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(184,115,51,0.06), transparent 40%)",
          }}
          aria-hidden="true"
        />
      )}

      <Container className="hero-content relative z-10 py-24 lg:py-0">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            ref={headingRef}
            className="font-heading text-4xl md:text-5xl lg:text-[4rem] font-normal text-cream leading-[1.2] opacity-0"
          >
            {hero.heading}
          </h1>

          <p
            ref={subRef}
            className="mt-6 font-body text-lg lg:text-xl text-cream/80 leading-relaxed max-w-2xl mx-auto opacity-0"
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
