"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homepageData from "@/data/homepage.json";
import type { HomepageData } from "@/data/types";
import { useMotion } from "@/components/motion/MotionProvider";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Stagger from "@/components/motion/Stagger";

gsap.registerPlugin(ScrollTrigger);

const data = homepageData as HomepageData;
const { comparison } = data;

function CellIcon({ value }: { value: string }) {
  if (value === "✓") {
    return (
      <svg
        width="20" height="20" viewBox="0 0 20 20" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="comparison-icon text-copper mx-auto"
        aria-label="Ja"
      >
        <path d="M5 10L8.5 13.5L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (value === "?") {
    return (
      <span className="comparison-icon font-body text-charcoal-light text-lg" aria-label="Unsicher">?</span>
    );
  }
  return <span className="comparison-icon font-body text-sm text-charcoal-light">{value}</span>;
}

export default function Comparison() {
  const tableRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();

  // Icon scale bounce (DM line 121)
  useEffect(() => {
    if (reducedMotion) return;
    const table = tableRef.current;
    if (!table) return;

    const ctx = gsap.context(() => {
      const icons = table.querySelectorAll(".comparison-icon");
      if (icons.length > 0) {
        gsap.from(icons, {
          scale: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: table,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }
    }, table);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="bg-cream-dark py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl lg:text-[3rem] font-normal text-charcoal leading-[1.2]">
              {comparison.heading}
            </h2>
            <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
              {comparison.subheading}
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop table */}
        <ScrollReveal className="hidden md:block">
          <div ref={tableRef} className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {comparison.columns.map((col, i) => (
                    <th
                      key={col}
                      className={[
                        "font-heading text-base font-semibold text-charcoal text-left py-4 px-4",
                        i === comparison.columns.length - 1
                          ? "border-l-2 border-copper bg-copper/5 shadow-[-4px_0_16px_rgba(184,115,51,0.1)]"
                          : "",
                      ].join(" ")}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.category} className="border-t border-sand">
                    <td className="py-4 px-4 font-body text-sm text-charcoal">
                      {row.category}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CellIcon value={row.private} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CellIcon value={row.agency} />
                    </td>
                    {/* DM line 120: Provenly column glow */}
                    <td className="py-4 px-4 text-center border-l-2 border-copper bg-copper/5 shadow-[-4px_0_16px_rgba(184,115,51,0.1)]">
                      <CellIcon value={row.provenly} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* Mobile stacked cards */}
        <Stagger triggerOnScroll className="md:hidden flex flex-col gap-4" staggerDelay={0.08}>
          {comparison.rows.map((row) => (
            <div key={row.category} className="bg-white rounded-xl p-4 shadow-[0_2px_8px_rgba(58,58,58,0.06)] border border-sand">
              <p className="font-heading text-base font-semibold text-charcoal mb-3">{row.category}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="font-body text-xs text-charcoal-light mb-1">{comparison.columns[1]}</p>
                  <CellIcon value={row.private} />
                </div>
                <div>
                  <p className="font-body text-xs text-charcoal-light mb-1">{comparison.columns[2]}</p>
                  <CellIcon value={row.agency} />
                </div>
                <div className="bg-copper/5 rounded-lg p-1">
                  <p className="font-body text-xs text-copper font-medium mb-1">{comparison.columns[3]}</p>
                  <CellIcon value={row.provenly} />
                </div>
              </div>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
