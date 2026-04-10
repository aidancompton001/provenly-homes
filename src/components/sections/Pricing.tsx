import pricingData from "@/data/pricing.json";
import type { PricingData } from "@/data/types";
import Container from "@/components/ui/Container";
import PricingCard from "@/components/ui/PricingCard";
import Button from "@/components/ui/Button";

const data = pricingData as PricingData;

export default function Pricing() {
  return (
    <section id="pricing" className="bg-cream-dark py-16 lg:py-24">
      <Container>
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl lg:text-[3rem] font-normal text-charcoal leading-[1.2]">
            {data.heading}
          </h2>
          <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
            {data.subheading}
          </p>
        </div>

        {/* Startvorteil block */}
        <div className="max-w-2xl mx-auto mb-12 text-center bg-cream rounded-xl p-6 lg:p-8 border border-copper/20">
          <h3 className="font-heading text-xl lg:text-2xl font-semibold text-copper">
            {data.startvorteil.heading}
          </h3>
          <p className="mt-3 font-body text-base text-charcoal-light leading-relaxed">
            {data.startvorteil.description}
          </p>
        </div>

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {data.packages.map((pkg, index) => (
            <PricingCard
              key={pkg.id}
              id={pkg.id}
              name={pkg.name}
              percentage={pkg.percentage}
              subtitle={pkg.subtitle}
              features={pkg.features}
              cta={pkg.cta}
              highlighted={index === 1}
            />
          ))}
        </div>

        {/* Addons mention */}
        <div className="mt-10 text-center">
          <p className="font-body text-sm text-charcoal-light mb-1">
            Erweiterungen:
          </p>
          <p className="font-body text-base text-charcoal">
            {data.addons.map((addon) => addon.name).join(" \u00B7 ")}
          </p>
        </div>

        {/* Custom / Configure CTA */}
        <div className="mt-12 text-center bg-cream rounded-xl p-6 lg:p-8 max-w-xl mx-auto border border-sand">
          <h3 className="font-heading text-xl font-semibold text-charcoal">
            {data.custom.heading}
          </h3>
          <p className="mt-3 font-body text-base text-charcoal-light leading-relaxed">
            {data.custom.description}
          </p>
          <div className="mt-6">
            <Button variant="primary" href="/kontakt">
              {data.custom.cta}
            </Button>
          </div>
          <p className="mt-3 font-body text-xs text-charcoal-light">
            {data.custom.ctaNote}
          </p>
        </div>
      </Container>
    </section>
  );
}
