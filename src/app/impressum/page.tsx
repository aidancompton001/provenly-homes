import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import siteData from "@/data/site.json";

export const metadata: Metadata = {
  title: "Impressum | Provenly Homes",
  description: "Impressum und Anbieterkennzeichnung von Provenly Homes.",
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-cream pt-32 pb-16 lg:pt-40 lg:pb-24">
          <Container>
            <div className="max-w-2xl mx-auto">
              <h1 className="font-heading text-4xl lg:text-[3rem] font-normal text-charcoal leading-[1.2] mb-10">
                Impressum
              </h1>

              <div className="prose-custom space-y-8">
                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Angaben gemäß § 5 TMG</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-1">
                    <p><strong className="text-charcoal">{siteData.owner}</strong></p>
                    <p>{siteData.company}</p>
                    <p>{siteData.address}</p>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Kontakt</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-1">
                    <p>Telefon: <a href={`tel:${siteData.phone}`} className="text-copper hover:text-copper-light transition-colors">{siteData.phone}</a></p>
                    <p>E-Mail: <a href={`mailto:${siteData.emailCanonical}`} className="text-copper hover:text-copper-light transition-colors">{siteData.emailCanonical}</a></p>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-1">
                    <p>{siteData.owner}</p>
                    <p>{siteData.address}</p>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">EU-Streitschlichtung</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-3">
                    <p>
                      Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                      <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-copper hover:text-copper-light transition-colors underline">
                        https://ec.europa.eu/consumers/odr/
                      </a>
                    </p>
                    <p>
                      Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-sand">
                  <p className="font-body text-xs text-charcoal-light">
                    Quelle: e-recht24.de
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
