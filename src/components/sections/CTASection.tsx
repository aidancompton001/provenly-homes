"use client";

import homepageData from "@/data/homepage.json";
import type { HomepageData } from "@/data/types";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/motion/ScrollReveal";

const data = homepageData as HomepageData;

export default function CTASection() {
  return (
    <section className="bg-charcoal py-20 lg:py-32">
      <Container>
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            {/* Decorative copper line */}
            <div className="w-12 h-px bg-copper/30 mx-auto mb-8" aria-hidden="true" />

            <h2 className="font-heading text-3xl lg:text-[3rem] font-normal text-cream leading-[1.2]">
              {data.vision.heading}
            </h2>

            <p className="mt-6 font-body text-lg text-sand leading-relaxed">
              {data.vision.body}
            </p>

            <div className="mt-10">
              <Button variant="primary-dark" size="lg" href="/kontakt">
                Erstgespräch vereinbaren
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
