import Link from "next/link";
import siteData from "@/data/site.json";
import type { SiteConfig } from "@/data/types";
import { getImageUrl, getHref } from "@/lib/getImageUrl";
import Container from "@/components/ui/Container";

const site = siteData as SiteConfig;

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label={site.company}>
              <img
                src={getImageUrl("/images/logo-full-dark.svg")}
                alt={site.company}
                className="h-8 w-auto mb-6"
              />
            </Link>
            <p className="font-body text-sm text-sand leading-relaxed">
              {site.footer.address}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-cream mb-4">
              Navigation
            </h3>
            <nav aria-label="Footer Navigation">
              <ul className="flex flex-col gap-3">
                {site.navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={getHref(item.href)}
                      className="font-body text-sm text-cream/80 hover:text-copper transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-cream mb-4">
              Kontakt
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="font-body text-sm text-cream/80 hover:text-copper transition-colors duration-200"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.emailDisplay}`}
                  className="font-body text-sm text-cream/80 hover:text-copper transition-colors duration-200"
                >
                  {site.emailDisplay}
                </a>
              </li>
              <li>
                <p className="font-body text-sm text-cream/80">
                  {site.address}
                </p>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-cream mb-4">
              Rechtliches
            </h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={getHref(link.href)}
                    className="font-body text-sm text-cream/80 hover:text-copper transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-12 pt-8 border-t border-cream/15">
          <p className="font-body text-sm text-sand text-center">
            {site.footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
