import propertiesData from "@/data/properties.json";
import Container from "@/components/ui/Container";
import PropertyCard from "@/components/ui/PropertyCard";
import Button from "@/components/ui/Button";

const { collectionHeading, collectionSubheading, properties } = propertiesData;

export default function Signatures() {
  return (
    <section className="bg-cream-dark py-16 lg:py-24">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl lg:text-[3rem] font-normal text-charcoal leading-[1.2]">
            {collectionHeading}
          </h2>
          <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
            {collectionSubheading}
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

        <div className="mt-10 text-center">
          <Button variant="secondary" href="/objekte">
            Weitere Signatures entdecken
          </Button>
        </div>
      </Container>
    </section>
  );
}
