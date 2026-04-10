"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MOTION_PAGE_EASE } from "@/lib/animations";
import testimonialsData from "@/data/testimonials.json";
import type { TestimonialsData } from "@/data/types";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";

const data = testimonialsData as TestimonialsData;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = data.testimonials.length;

  // DM line 210: detect mobile for auto-advance control
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play — DM line 210: NO auto-advance on mobile
  useEffect(() => {
    if (paused || isMobile) return;
    intervalRef.current = setInterval(next, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, next, isMobile]);

  const testimonial = data.testimonials[current];

  return (
    <section
      className="bg-cream py-16 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl lg:text-[3rem] font-normal text-charcoal leading-[1.2]">
              {data.heading}
            </h2>
            <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
              {data.intro}
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <div className="relative max-w-2xl mx-auto overflow-hidden">
          {/* Decorative quote */}
          <span
            className="absolute top-0 left-0 font-heading text-[6rem] leading-none text-copper/15 select-none pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={testimonial.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-cream rounded-xl p-8 lg:p-10 border border-sand shadow-[0_2px_8px_rgba(58,58,58,0.06)]"
            >
              <div className="flex items-center gap-4 mb-6">
                {/* Initials avatar */}
                <div className="w-12 h-12 rounded-full bg-copper/10 border-2 border-sand flex items-center justify-center">
                  <span className="font-heading text-lg font-semibold text-copper">
                    {testimonial.profile.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-heading text-base font-semibold text-charcoal">
                    {testimonial.profile}
                  </p>
                  <p className="font-body text-sm text-charcoal-light">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="font-body text-xs font-medium text-copper uppercase tracking-wide mb-1">
                    Ziel
                  </p>
                  <p className="font-body text-base text-charcoal leading-relaxed">
                    {testimonial.goal}
                  </p>
                </div>
                <div>
                  <p className="font-body text-xs font-medium text-copper uppercase tracking-wide mb-1">
                    Ergebnis
                  </p>
                  <p className="font-body text-base text-charcoal leading-relaxed">
                    {testimonial.result}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* DM line 209: Navigation arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={prev}
            className="p-2 text-charcoal-light hover:text-copper transition-opacity duration-150 cursor-pointer"
            aria-label="Vorheriges Testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1">
          {data.testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => goTo(i)}
              className="p-2 cursor-pointer"
              aria-label={`Testimonial ${i + 1}`}
            >
              <span
                className={[
                  "block rounded-full transition-all duration-300",
                  i === current ? "bg-copper w-3 h-3" : "bg-sand w-2 h-2",
                ].join(" ")}
              />
            </button>
          ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="p-2 text-charcoal-light hover:text-copper transition-opacity duration-150 cursor-pointer"
            aria-label="Nächstes Testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </Container>
    </section>
  );
}
