import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Datenschutz | Provenly Homes",
  description: "Datenschutzerklärung von Provenly Homes.",
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container>
          <div className="py-24">
            <h1 className="font-heading text-4xl mb-8">Datenschutzerklärung</h1>
            <p className="text-lg text-zinc-600 mb-12">
              [Datenschutz Content]
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
