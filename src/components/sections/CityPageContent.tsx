import type { CityData } from "@/data/types";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface CityPageContentProps {
  city: CityData;
}

export default function CityPageContent({ city }: CityPageContentProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16 lg:pt-40 lg:pb-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl lg:text-[3.5rem] font-normal text-cream leading-[1.2]">
              {city.h1}
            </h1>
            <p className="mt-6 font-body text-lg text-sand leading-relaxed">
              {city.intro}
            </p>
          </div>
        </Container>
      </section>

      {/* Market stats */}
      <section className="bg-cream py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-cream-dark rounded-xl p-6 text-center border border-sand">
              <p className="font-heading text-2xl font-bold text-copper">{city.marketStats.avgNightlyRate}</p>
              <p className="font-body text-sm text-charcoal-light mt-2">Ø Nachtrate</p>
            </div>
            <div className="bg-cream-dark rounded-xl p-6 text-center border border-sand">
              <p className="font-heading text-2xl font-bold text-copper">{city.marketStats.avgOccupancy}</p>
              <p className="font-body text-sm text-charcoal-light mt-2">Ø Auslastung</p>
            </div>
            <div className="bg-cream-dark rounded-xl p-6 text-center border border-sand">
              <p className="font-body text-sm text-charcoal leading-relaxed">{city.marketStats.demandDrivers}</p>
              <p className="font-body text-xs text-charcoal-light mt-2">Nachfragetreiber</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Districts */}
      <section className="bg-cream-dark py-12 lg:py-16">
        <Container>
          <h2 className="font-heading text-2xl lg:text-3xl font-normal text-charcoal mb-8">
            Top-Stadtteile in {city.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {city.districts.map((district) => (
              <div key={district.name} className="bg-cream rounded-xl p-6 border border-sand">
                <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">{district.name}</h3>
                <p className="font-body text-sm text-charcoal-light leading-relaxed">{district.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Regulations */}
      <section className="bg-cream py-12 lg:py-16">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl lg:text-3xl font-normal text-charcoal mb-8">
              {city.regulations.heading}
            </h2>
            <ul className="space-y-4">
              {city.regulations.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-copper shrink-0 mt-0.5" aria-hidden="true">
                    <path d="M10 2L10 18M10 2L6 6M10 2L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-body text-base text-charcoal leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-16 lg:py-24">
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-heading text-3xl lg:text-[2.5rem] font-normal text-cream leading-[1.2]">
              {city.cta.heading}
            </h2>
            <p className="mt-4 font-body text-lg text-sand leading-relaxed">
              {city.cta.text}
            </p>
            <div className="mt-8">
              <Button variant="primary-dark" size="lg" href={city.cta.buttonHref}>
                {city.cta.buttonLabel}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
