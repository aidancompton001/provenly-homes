import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Ratgeber Kurzzeitvermietung NRW | Provenly Homes",
  description:
    "Strategien, Analysen und klare Antworten rund um Kurzzeitvermietung in NRW.",
};

export default function RatgeberPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container>
          <div className="py-24">
            <h1 className="font-heading text-4xl mb-8">
              Ratgeber zur Kurzzeitvermietung in NRW
            </h1>
            <p className="text-lg text-zinc-600 mb-12">
              [Article Listing Grid]
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
