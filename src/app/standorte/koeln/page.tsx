import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Kurzzeitvermietung Köln | Provenly Homes",
  description:
    "Professionelle Kurzzeitvermietung in Köln. Vermarktung, Preisstrategie und operatives Management für Eigentümer.",
};

export default function KoelnPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container>
          <div className="py-24">
            <h1 className="font-heading text-4xl mb-8">
              Kurzzeitvermietung Köln
            </h1>
            <p className="text-lg text-zinc-600 mb-12">
              [City Page — Köln]
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
