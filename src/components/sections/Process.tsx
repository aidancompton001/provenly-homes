"use client";

import homepageData from "@/data/homepage.json";
import type { HomepageData } from "@/data/types";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";

const data = homepageData as HomepageData;
const { process } = data;

export default function Process() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl lg:text-[3rem] font-normal text-charcoal leading-[1.2]">
              {process.heading}
            </h2>
            <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
              {process.subheading}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative max-w-2xl mx-auto">
          {/* Timeline vertical line */}
          <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-px bg-sand" aria-hidden="true" />

          <div className="flex flex-col gap-12 lg:gap-16">
            {process.steps.map((step, index) => (
              <ScrollReveal
                key={step.number}
                delay={index * 0.15}
                direction="up"
              >
                <div className="relative flex gap-6 lg:gap-8">
                  {/* Step number badge */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-copper text-white font-heading text-xl lg:text-2xl font-bold shrink-0">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="pt-1 lg:pt-3">
                    <h3 className="font-heading text-xl lg:text-2xl font-semibold text-charcoal">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-body text-base text-charcoal-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
