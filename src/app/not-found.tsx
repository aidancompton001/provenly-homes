import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-cream min-h-[60vh] flex items-center">
          <Container>
            <div className="max-w-lg mx-auto text-center py-24">
              <p className="font-heading text-8xl lg:text-9xl font-bold text-copper/20 mb-4" aria-hidden="true">
                404
              </p>
              <h1 className="font-heading text-3xl lg:text-4xl font-normal text-charcoal mb-4">
                Seite nicht gefunden
              </h1>
              <p className="font-body text-lg text-charcoal-light leading-relaxed mb-8">
                Die angeforderte Seite existiert nicht oder wurde verschoben.
              </p>
              <Button variant="primary" size="lg" href="/">
                Zurück zur Startseite
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
