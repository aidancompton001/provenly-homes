"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import faqData from "@/data/faq.json";
import type { FAQData } from "@/data/types";
import { useMotion } from "@/components/motion/MotionProvider";
import Container from "@/components/ui/Container";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/motion/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const data = faqData as FAQData;

export default function FAQ() {
  const listRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  // DM line 223: items stagger on enter
  useEffect(() => {
    if (reducedMotion) return;
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      const items = list.querySelectorAll("[data-faq-item]");
      if (items.length > 0) {
        gsap.from(items, {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: list,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
      }
    }, list);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="bg-cream-dark py-16 lg:py-24">
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

        <div className="max-w-2xl mx-auto" ref={listRef}>
          <Accordion items={data.faqs} />

          <div className="mt-10 text-center">
            <Button variant="primary" href="/kontakt">
              Erstgespräch vereinbaren
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
