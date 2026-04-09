import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container>
          <div className="py-24 text-center">
            <h1 className="font-heading text-5xl mb-4">404</h1>
            <p className="text-lg text-zinc-600 mb-8">
              Diese Seite konnte nicht gefunden werden.
            </p>
            <Link
              href="/"
              className="inline-block rounded-full bg-zinc-900 px-6 py-3 text-white transition-colors hover:bg-zinc-700"
            >
              Zurück zur Startseite
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
