"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homepageData from "@/data/homepage.json";
import type { HomepageData } from "@/data/types";
import { useMotion } from "@/components/motion/MotionProvider";
import { useSplitText } from "@/hooks/useSplitText";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { getImageUrl } from "@/lib/getImageUrl";

gsap.registerPlugin(ScrollTrigger);

const data = homepageData as HomepageData;
const { hero } = data;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  // SplitText char reveal on heading
  useSplitText(headingRef, {
    type: "chars",
    stagger: 0.03,
    duration: 0.8,
    yPercent: 100,
    ease: "power2.out",
    delay: 0.5,
  });

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Subheading fade in
      if (subRef.current) {
        gsap.from(subRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          delay: 1.2,
        });
      }

      // CTAs fade in
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          delay: 1.6,
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
            className="mt-6 font-body text-lg lg:text-xl text-cream/80 leading-relaxed max-w-2xl mx-auto"
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
