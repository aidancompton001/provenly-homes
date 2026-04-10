"use client";

import type { ReactElement } from "react";
import { motion } from "motion/react";
import servicesData from "@/data/services.json";
import type { ServicesData } from "@/data/types";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Stagger from "@/components/motion/Stagger";
import { MOTION_HOVER_DURATION } from "@/lib/animations";

const data = servicesData as ServicesData;

function ServiceIcon({ icon }: { icon: string }) {
  const iconMap: Record<string, ReactElement> = {
    building: (
      <path d="M3 21H21M5 21V7L13 3V21M19 21V11L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
    "message-circle": (
      <path d="M21 11.5C21 16.75 16.75 21 11.5 21C9.84 21 8.27 20.59 6.9 19.87L3 21L4.13 17.1C3.41 15.73 3 14.16 3 12.5C3 7.25 7.25 3 12.5 3C17.75 3 21 6.25 21 11.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
    sparkles: (
      <>
        <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 15L19.83 17.17L22 18L19.83 18.83L19 21L18.17 18.83L16 18L18.17 17.17L19 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    "trending-up": (
      <path d="M22 7L13.5 15.5L8.5 10.5L2 17M22 7H16M22 7V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
    wrench: (
      <path d="M14.7 6.3C14.3 5.9 13.7 5.9 13.3 6.3L6.3 13.3C5.9 13.7 5.9 14.3 6.3 14.7L9.3 17.7C9.7 18.1 10.3 18.1 10.7 17.7L17.7 10.7C18.1 10.3 18.1 9.7 17.7 9.3L14.7 6.3ZM19 4L20 5M17 2L18 3M21 6L22 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
    "bar-chart": (
      <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  };

  return (
    <svg
      width="32" height="32" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      /* DM line 137: icon hover scale 1.05, transition 200ms */
      className="text-copper transition-transform duration-200 group-hover:scale-105"
      aria-hidden="true"
    >
      {iconMap[icon] || iconMap["building"]}
    </svg>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-cream py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl lg:text-[3rem] font-normal text-charcoal leading-[1.2]">
              {data.heading}
            </h2>
            <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
              {data.subheading}
            </p>
          </div>
        </ScrollReveal>

        <Stagger
          triggerOnScroll
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {data.services.map((service) => (
            /* DM line 136: Motion whileHover y:-4 + shadow transition */
            <motion.div
              key={service.id}
              whileHover={{ y: -4, transition: { duration: MOTION_HOVER_DURATION } }}
              /* DM line 138: border-radius 8px (rounded-lg) not 12px */
              className="group bg-cream rounded-lg shadow-[0_2px_8px_rgba(58,58,58,0.06)] hover:shadow-[0_4px_16px_rgba(58,58,58,0.1)] transition-shadow duration-200 p-6 border border-sand cursor-pointer"
            >
              <div className="mb-4">
                <ServiceIcon icon={service.icon} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
                {service.title}
              </h3>
              <p className="font-body text-sm text-charcoal-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </Stagger>

        <ScrollReveal delay={0.3}>
          <p className="mt-12 text-center font-body text-lg text-charcoal-light leading-relaxed max-w-2xl mx-auto italic">
            {data.closing}
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
