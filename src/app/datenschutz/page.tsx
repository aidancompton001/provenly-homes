import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import siteData from "@/data/site.json";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Provenly Homes",
  description: "Datenschutzerklärung von Provenly Homes.",
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-cream pt-32 pb-16 lg:pt-40 lg:pb-24">
          <Container>
            <div className="max-w-2xl mx-auto">
              <h1 className="font-heading text-4xl lg:text-[3rem] font-normal text-charcoal leading-[1.2] mb-10">
                Datenschutzerklärung
              </h1>

              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Datenschutz auf einen Blick</h2>
                  <p className="font-body text-base text-charcoal-light leading-relaxed">
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Hosting</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-3">
                    <p>
                      Diese Website wird gehostet bei <strong className="text-charcoal">GitHub Pages</strong>, einem Dienst der GitHub Inc. / Microsoft Corporation, One Microsoft Way, Redmond, WA 98052-6399, USA.
                    </p>
                    <p>
                      Beim Besuch dieser Website werden durch den Hosting-Provider automatisch Informationen in sogenannten Server-Logfiles gespeichert. Diese umfassen: IP-Adresse, Datum und Uhrzeit des Zugriffs, angeforderte Seite, Browsertyp und -version, Betriebssystem und Referrer-URL.
                    </p>
                    <p>
                      Die Nutzung von GitHub Pages erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer zuverlässigen Darstellung unserer Website.
                    </p>
                    <p>
                      GitHub Inc. ist unter dem EU-US Data Privacy Framework zertifiziert.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Verantwortliche Stelle</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-1">
                    <p><strong className="text-charcoal">{siteData.owner}</strong></p>
                    <p>{siteData.company}</p>
                    <p>{siteData.address}</p>
                    <p>E-Mail: <a href={`mailto:${siteData.emailCanonical}`} className="text-copper hover:text-copper-light transition-colors">{siteData.emailCanonical}</a></p>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Allgemeine Hinweise und Pflichtinformationen</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-3">
                    <p>
                      Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                    </p>
                    <p>
                      Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Datenerfassung auf dieser Website</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-3">
                    <h3 className="font-heading text-lg font-semibold text-charcoal mt-4 mb-2">Kontaktformular</h3>
                    <p>
                      Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
                    </p>
                    <p>
                      Das Kontaktformular wird über den Dienst FormSubmit.co verarbeitet. FormSubmit leitet die Formulardaten per E-Mail weiter, ohne sie dauerhaft zu speichern.
                    </p>

                    <h3 className="font-heading text-lg font-semibold text-charcoal mt-4 mb-2">Cookies</h3>
                    <p>
                      Diese Website verwendet ein Cookie zur Speicherung Ihrer Cookie-Consent-Einstellung. Dieses Cookie ist technisch notwendig und wird auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt. Es werden keine Tracking-Cookies oder Analyse-Tools verwendet.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">SSL-Verschlüsselung</h2>
                  <p className="font-body text-base text-charcoal-light leading-relaxed">
                    Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &ldquo;http://&rdquo; auf &ldquo;https://&rdquo; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Speicherdauer</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-3">
                    <p>
                      Personenbezogene Daten, die über das Kontaktformular übermittelt werden, werden bis zur vollständigen Bearbeitung Ihrer Anfrage gespeichert und anschließend gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
                    </p>
                    <p>
                      Server-Logfiles des Hosting-Providers werden in der Regel nach 30 Tagen automatisch gelöscht.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Ihre Rechte als betroffene Person</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-3">
                    <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong className="text-charcoal">Recht auf Auskunft</strong> (Art. 15 DSGVO) — Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
                      <li><strong className="text-charcoal">Recht auf Berichtigung</strong> (Art. 16 DSGVO) — Sie können die Berichtigung unrichtiger oder die Vervollständigung Ihrer Daten verlangen.</li>
                      <li><strong className="text-charcoal">Recht auf Löschung</strong> (Art. 17 DSGVO) — Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
                      <li><strong className="text-charcoal">Recht auf Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO) — Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</li>
                      <li><strong className="text-charcoal">Recht auf Datenübertragbarkeit</strong> (Art. 20 DSGVO) — Sie können verlangen, dass wir Ihnen Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format übermitteln.</li>
                      <li><strong className="text-charcoal">Recht auf Widerspruch</strong> (Art. 21 DSGVO) — Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen, sofern die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht.</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Widerruf Ihrer Einwilligung</h2>
                  <p className="font-body text-base text-charcoal-light leading-relaxed">
                    Soweit die Verarbeitung Ihrer Daten auf einer Einwilligung beruht (Art. 6 Abs. 1 lit. a DSGVO), können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Beschwerderecht bei der Aufsichtsbehörde</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-3">
                    <p>
                      Wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt, haben Sie das Recht, sich bei einer Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).
                    </p>
                    <p>
                      Zuständige Aufsichtsbehörde:
                    </p>
                    <div className="space-y-1">
                      <p><strong className="text-charcoal">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</strong></p>
                      <p>Kavalleriestraße 2–4</p>
                      <p>40213 Düsseldorf</p>
                      <p>Telefon: +49 211 38424-0</p>
                      <p>E-Mail: poststelle@ldi.nrw.de</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-xl font-semibold text-charcoal mb-3">Plugins und Tools</h2>
                  <div className="font-body text-base text-charcoal-light leading-relaxed space-y-3">
                    <h3 className="font-heading text-lg font-semibold text-charcoal mt-4 mb-2">Google Fonts</h3>
                    <p>
                      Diese Website nutzt Google Fonts, die lokal eingebunden sind. Es findet keine Verbindung zu Google-Servern statt. Die Schriftarten werden direkt von unserem Server geladen.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-sand">
                  <p className="font-body text-xs text-charcoal-light">
                    Quelle: Angelehnt an e-recht24.de, angepasst für GitHub Pages Hosting.
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
