import type { Property } from "@/data/types";
import { getImageUrl, getHref } from "@/lib/getImageUrl";
import Badge from "./Badge";

const propertyImages: Record<string, string> = {
  "rheinabend-suite": "/images/property-rheinabend-1.png",
  "rheinblick-family-residence": "/images/property-rheinblick-1.png",
  "urban-skyline-loft": "/images/property-urban-1.png",
};

type PropertyCardProps = Pick<
  Property,
  "name" | "location" | "district" | "size" | "pricePerNight" | "feature" | "slug"
> & {
  className?: string;
};

export default function PropertyCard({
  name,
  location,
  district,
  size,
  pricePerNight,
  feature,
  slug,
  className = "",
}: PropertyCardProps) {
  return (
    <a
      href={getHref(`/objekte/${slug}`)}
      className={[
        "group block bg-cream rounded-xl shadow-[0_2px_8px_rgba(58,58,58,0.06)] hover:shadow-[0_8px_24px_rgba(58,58,58,0.12)] transition-all duration-300 overflow-hidden cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Property image */}
      <div className="aspect-video bg-sand relative overflow-hidden">
        {propertyImages[slug] ? (
          <img
            src={getImageUrl(propertyImages[slug])}
            alt={name}
            width={600}
            height={400}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-cream/60"
              aria-hidden="true"
            >
              <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17" cy="21" r="3.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 32L16 24L24 30L32 22L42 30V35C42 36.6569 40.6569 38 39 38H9C7.34315 38 6 36.6569 6 35V32Z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}
        {feature && (
          <div className="absolute top-3 left-3">
            <Badge variant="copper">{feature}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-xl font-semibold text-charcoal group-hover:text-copper transition-colors duration-200">
          {name}
        </h3>

        <p className="mt-1 font-body text-sm text-charcoal-light">
          {location} &middot; {district}
        </p>

        {/* Specs row */}
        <div className="mt-3 flex items-center gap-3 font-body text-sm text-charcoal-light">
          <span>{size}</span>
          {feature && (
            <>
              <span className="text-sand">&middot;</span>
              <span>{feature}</span>
            </>
          )}
        </div>

        {/* Price */}
        <div className="mt-4 pt-4 border-t border-sand">
          <span className="font-body text-lg font-semibold text-charcoal">
            ab {pricePerNight}&euro; <span className="text-sm font-normal text-charcoal-light">/ Nacht</span>
          </span>
        </div>
      </div>
    </a>
  );
}
