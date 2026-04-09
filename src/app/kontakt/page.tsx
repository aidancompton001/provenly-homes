import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Kontakt | Provenly Homes",
  description:
    "Kontaktieren Sie Provenly Homes für eine unverbindliche Beratung zur Kurzzeitvermietung Ihrer Immobilie in NRW.",
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container>
          <div className="py-24">
            <h1 className="font-heading text-4xl mb-8">Kontakt</h1>
            <p className="text-lg text-zinc-600 mb-12">
              [Kontakt Form — 13 fields]
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
