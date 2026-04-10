import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PropertyCard from "@/components/ui/PropertyCard";
import propertiesData from "@/data/properties.json";

export const metadata: Metadata = {
  title: "Signature Objekte | Provenly Homes",
  description:
    "Entdecken Sie unsere Signature Collection: kuratierte Kurzzeitvermietungs-Objekte in NRW.",
};

const { collectionHeading, collectionSubheading, collectionDescription, properties } = propertiesData;

export default function ObjektePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-cream pt-32 pb-16 lg:pt-40 lg:pb-24">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h1 className="font-heading text-4xl lg:text-[3.5rem] font-normal text-charcoal leading-[1.2]">
                {collectionHeading}
              </h1>
              <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
                {collectionSubheading}
              </p>
              <p className="mt-2 font-body text-base text-charcoal-light leading-relaxed">
                {collectionDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.slug}
                  name={property.name}
                  location={property.location}
                  district={property.district}
                  size={property.size}
                  pricePerNight={property.pricePerNight}
                  feature={property.feature}
                  slug={property.slug}
                />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
