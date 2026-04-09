import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Impressum | Provenly Homes",
  description: "Impressum und Anbieterkennzeichnung von Provenly Homes.",
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container>
          <div className="py-24">
            <h1 className="font-heading text-4xl mb-8">Impressum</h1>
            <p className="text-lg text-zinc-600 mb-12">
              [Impressum Content]
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
