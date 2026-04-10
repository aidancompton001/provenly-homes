"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import propertiesData from "@/data/properties.json";
import { useMotion } from "@/components/motion/MotionProvider";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getImageUrl, getHref } from "@/lib/getImageUrl";

gsap.registerPlugin(ScrollTrigger);

const { collectionHeading, collectionSubheading, properties } = propertiesData;

const propertyImages: Record<string, string> = {
  "rheinabend-suite": "/images/property-rheinabend-1.png",
  "rheinblick-family-residence": "/images/property-rheinblick-1.png",
  "urban-skyline-loft": "/images/property-urban-1.png",
};

export default function Signatures() {
  const gridRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // DM line 152: cards GSAP stagger + DM line 153: image parallax
  useEffect(() => {
    if (reducedMotion) return;
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll(".property-card");

      // DM line 152: stagger y:60
      gsap.from(cards, {
        opacity: 0,
        y: isMobile ? 40 : 60, // DM 156: mobile = 40
        stagger: isMobile ? 0 : 0.15, // DM 156: mobile no stagger
        duration: isMobile ? 0.7 : 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });

      // DM line 153: image parallax — desktop only
      if (!isMobile) {
        const images = grid.querySelectorAll(".property-image");
        images.forEach((img) => {
          gsap.to(img, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".property-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      }
    }, grid);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section className="bg-cream-dark py-16 lg:py-24">
      <Container>
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl lg:text-[3rem] font-normal text-charcoal leading-[1.2]">
              {collectionHeading}
            </h2>
            <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
              {collectionSubheading}
            </p>
          </div>
        </ScrollReveal>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.slug}
              property={property}
              imageSrc={propertyImages[property.slug]}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
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

// Separate component for 3D tilt hover (DM lines 154-155)
function PropertyCard({
  property,
  imageSrc,
  isMobile,
  reducedMotion,
}: {
  property: typeof propertiesData.properties[0];
  imageSrc?: string;
  isMobile: boolean;
  reducedMotion: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // DM line 154: 3D tilt on hover — desktop only, max 5deg
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile || reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * 10); // max ±5deg (0.5 * 10 = 5)
    setRotateY(x * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={getHref(`/objekte/${property.slug}`)}
      className="property-card group block bg-cream rounded-xl shadow-[0_2px_8px_rgba(58,58,58,0.06)] hover:shadow-[0_8px_24px_rgba(58,58,58,0.12)] transition-shadow duration-300 overflow-hidden cursor-pointer"
      style={{ perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
      }}
      transition={{ duration: 0.15 }}
    >
      {/* Image with parallax container + overlay */}
      <div className="aspect-video bg-sand relative overflow-hidden">
        {imageSrc ? (
          <>
            <img
              src={getImageUrl(imageSrc)}
              alt={property.name}
              width={600}
              height={400}
              className="property-image absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* DM line 155: image overlay hover opacity 0.2→0.05 */}
            <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/5 transition-colors duration-200" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-cream/60" aria-hidden="true">
              <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        )}
        {property.feature && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="copper">{property.feature}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-xl font-semibold text-charcoal group-hover:text-copper transition-colors duration-200">
          {property.name}
        </h3>
        <p className="mt-1 font-body text-sm text-charcoal-light">
          {property.location} &middot; {property.district}
        </p>
        <div className="mt-3 flex items-center gap-3 font-body text-sm text-charcoal-light">
          <span>{property.size}</span>
          {property.feature && (
            <>
              <span className="text-sand">&middot;</span>
              <span>{property.feature}</span>
            </>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-sand">
          <span className="font-body text-lg font-semibold text-charcoal">
            ab {property.pricePerNight}&euro; <span className="text-sm font-normal text-charcoal-light">/ Nacht</span>
          </span>
        </div>
      </div>
    </motion.a>
  );
}
