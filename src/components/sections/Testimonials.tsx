"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import testimonialsData from "@/data/testimonials.json";
import type { TestimonialsData } from "@/data/types";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";

const data = testimonialsData as TestimonialsData;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = data.testimonials.length;

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

  // Auto-play
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, next]);

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
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
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

        {/* Dots navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {data.testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => goTo(i)}
              className={[
                "w-2.5 h-2.5 rounded-full transition-colors duration-200",
                i === current ? "bg-copper" : "bg-sand",
              ].join(" ")}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
