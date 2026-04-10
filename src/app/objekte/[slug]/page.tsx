import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import propertiesData from "@/data/properties.json";
import { getImageUrl } from "@/lib/getImageUrl";

const propertyHeroImages: Record<string, string> = {
  "rheinabend-suite": "/images/property-rheinabend-hero.png",
  "rheinblick-family-residence": "/images/property-rheinblick-hero.png",
  "urban-skyline-loft": "/images/property-urban-hero.png",
};

export function generateStaticParams() {
  return propertiesData.properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const property = propertiesData.properties.find((p) => p.slug === slug);
  if (!property) return { title: "Objekt nicht gefunden | Provenly Homes" };

  return {
    title: `${property.name} — ${property.location} | Provenly Homes`,
    description: property.tagline,
  };
}

export default async function PropertyPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const property = propertiesData.properties.find((p) => p.slug === slug);

  if (!property) {
    return (
      <>
        <Header />
        <main id="main-content">
          <Container>
            <div className="py-32 text-center">
              <h1 className="font-heading text-4xl text-charcoal">Objekt nicht gefunden</h1>
              <Button variant="primary" href="/objekte" className="mt-8">Zurück zur Übersicht</Button>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  const heroImage = propertyHeroImages[slug];

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="relative bg-charcoal pt-20">
          {heroImage && (
            <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
              <img
                src={getImageUrl(heroImage)}
                alt={property.name}
                width={1536}
                height={1024}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
            </div>
          )}
          <Container className="relative z-10 -mt-24 pb-12">
            <div className="max-w-3xl">
              {property.feature && (
                <Badge variant="copper" className="mb-4">{property.feature}</Badge>
              )}
              <h1 className="font-heading text-4xl lg:text-[3.5rem] font-normal text-cream leading-[1.2]">
                {property.name}
              </h1>
              <p className="mt-2 font-body text-lg text-cream/80">
                {property.location} &middot; {property.district}
              </p>
              <p className="mt-4 font-body text-base text-sand leading-relaxed italic">
                &ldquo;{property.tagline}&rdquo;
              </p>
            </div>
          </Container>
        </section>

        {/* Specs */}
        <section className="bg-cream py-12 lg:py-16">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-copper">{property.size}</p>
                <p className="font-body text-sm text-charcoal-light mt-1">Wohnfläche</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-copper">{property.capacity}</p>
                <p className="font-body text-sm text-charcoal-light mt-1">Kapazität</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-copper">{property.bedrooms}</p>
                <p className="font-body text-sm text-charcoal-light mt-1">Schlafzimmer</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-copper">ab {property.pricePerNight}€</p>
                <p className="font-body text-sm text-charcoal-light mt-1">pro Nacht</p>
              </div>
            </div>
          </Container>
        </section>

        {/* Amenities */}
        <section className="bg-cream-dark py-12 lg:py-16">
          <Container>
            <h2 className="font-heading text-2xl lg:text-3xl font-normal text-charcoal mb-8">Ausstattung</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-3 font-body text-sm text-charcoal">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-copper shrink-0" aria-hidden="true">
                    <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {amenity}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Highlights */}
        {property.highlights.length > 0 && (
          <section className="bg-cream py-12 lg:py-16">
            <Container>
              <h2 className="font-heading text-2xl lg:text-3xl font-normal text-charcoal mb-8">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {property.highlights.map((highlight) => (
                  <div key={highlight} className="bg-cream-dark rounded-xl p-6 border border-sand">
                    <p className="font-body text-base text-charcoal leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Distances */}
        <section className="bg-cream-dark py-12 lg:py-16">
          <Container>
            <h2 className="font-heading text-2xl lg:text-3xl font-normal text-charcoal mb-8">Entfernungen</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {property.distances.map((d) => (
                <div key={d.label} className="bg-cream rounded-xl p-4 text-center border border-sand">
                  <p className="font-heading text-xl font-bold text-copper">{d.time}</p>
                  <p className="font-body text-sm text-charcoal-light mt-1">{d.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Rating + CTA */}
        <section className="bg-charcoal py-16 lg:py-24">
          <Container>
            <div className="max-w-xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="font-heading text-4xl font-bold text-copper">{property.rating}</span>
                <span className="font-body text-lg text-cream/70">/ 5</span>
              </div>
              <p className="font-body text-sand">{property.reviewCount} Bewertungen</p>
              <div className="mt-8">
                <Button variant="primary-dark" size="lg" href="/kontakt">
                  Erstgespräch vereinbaren
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
