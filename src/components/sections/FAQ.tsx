"use client";

import faqData from "@/data/faq.json";
import type { FAQData } from "@/data/types";
import Container from "@/components/ui/Container";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/motion/ScrollReveal";

const data = faqData as FAQData;

export default function FAQ() {
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

        <div className="max-w-2xl mx-auto">
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
