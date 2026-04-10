"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import pricingData from "@/data/pricing.json";
import type { PricingData } from "@/data/types";
import { useMotion } from "@/components/motion/MotionProvider";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { MOTION_HOVER_DURATION } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

const data = pricingData as PricingData;

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 text-copper mt-0.5" aria-hidden="true">
      <path d="M4.5 9L7.5 12L13.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Pricing() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // DM line 186: cards stagger + DM line 190: feature stagger
  useEffect(() => {
    if (reducedMotion) return;
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll(".pricing-card");
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        stagger: isMobile ? 0 : 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      // DM line 190: feature list stagger after card appears
      cards.forEach((card) => {
        const features = card.querySelectorAll(".pricing-feature");
        if (features.length > 0) {
          gsap.from(features, {
            opacity: 0,
            x: -10,
            stagger: 0.05,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 55%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }, grid);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  // DM line 191: recommended card FIRST on mobile
  const packages = isMobile
    ? [...data.packages].sort((a, b) => {
        const aIdx = data.packages.indexOf(a);
        const bIdx = data.packages.indexOf(b);
        // index 1 = recommended → move to front
        if (aIdx === 1) return -1;
        if (bIdx === 1) return 1;
        return 0;
      })
    : data.packages;

  return (
    <section id="pricing" className="bg-cream-dark py-16 lg:py-24">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl lg:text-[3rem] font-normal text-charcoal leading-[1.2]">
            {data.heading}
          </h2>
          <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
            {data.subheading}
          </p>
        </div>

        {/* Startvorteil */}
        <div className="max-w-2xl mx-auto mb-12 text-center bg-cream rounded-xl p-6 lg:p-8 border border-copper/20">
          <h3 className="font-heading text-xl lg:text-2xl font-semibold text-copper">
            {data.startvorteil.heading}
          </h3>
          <p className="mt-3 font-body text-base text-charcoal-light leading-relaxed">
            {data.startvorteil.description}
          </p>
        </div>

        {/* Pricing cards — DM line 188: whileHover y:-6 */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {packages.map((pkg, index) => {
            const isHighlighted = pkg.id === data.packages[1]?.id; // middle = recommended
            return (
              <motion.div
                key={pkg.id}
                whileHover={!isMobile ? { y: -6, transition: { duration: MOTION_HOVER_DURATION } } : undefined}
                className={[
                  "pricing-card bg-cream rounded-xl p-6 flex flex-col transition-shadow duration-300 cursor-pointer",
                  isHighlighted
                    ? "ring-2 ring-copper shadow-[0_8px_32px_rgba(184,115,51,0.15)] lg:scale-[1.03] relative z-10"
                    : "shadow-[0_2px_8px_rgba(58,58,58,0.06)] hover:shadow-[0_8px_32px_rgba(58,58,58,0.12)]",
                ].join(" ")}
              >
                {isHighlighted && (
                  <span className="inline-block self-start rounded-full bg-copper/10 text-copper px-3 py-1 text-xs font-medium font-body mb-4">
                    Empfohlen
                  </span>
                )}

                <h3 className="font-heading text-2xl font-semibold text-charcoal">{pkg.name}</h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-5xl font-bold text-charcoal">{pkg.percentage}</span>
                  <span className="font-body text-xl text-charcoal-light">%</span>
                </div>

                <p className="mt-3 font-body text-sm text-charcoal-light leading-relaxed">{pkg.subtitle}</p>

                <ul className="mt-6 flex flex-col gap-3 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="pricing-feature flex items-start gap-2 font-body text-sm text-charcoal">
                      <CheckIcon />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    variant={isHighlighted ? "primary" : "secondary"}
                    size="md"
                    className="w-full"
                    href="/kontakt"
                  >
                    {pkg.cta}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Addons */}
        <div className="mt-10 text-center">
          <p className="font-body text-sm text-charcoal-light mb-1">Erweiterungen:</p>
          <p className="font-body text-base text-charcoal">
            {data.addons.map((addon) => addon.name).join(" \u00B7 ")}
          </p>
        </div>

        {/* Custom CTA */}
        <div className="mt-12 text-center bg-cream rounded-xl p-6 lg:p-8 max-w-xl mx-auto border border-sand">
          <h3 className="font-heading text-xl font-semibold text-charcoal">{data.custom.heading}</h3>
          <p className="mt-3 font-body text-base text-charcoal-light leading-relaxed">{data.custom.description}</p>
          <div className="mt-6">
            <Button variant="primary" href="/kontakt">{data.custom.cta}</Button>
          </div>
          <p className="mt-3 font-body text-xs text-charcoal-light">{data.custom.ctaNote}</p>
        </div>
      </Container>
    </section>
  );
}
