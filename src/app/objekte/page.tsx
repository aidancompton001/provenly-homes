import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Signature Objekte | Provenly Homes",
  description:
    "Entdecken Sie unsere Signature Collection: kuratierte Kurzzeitvermietungs-Objekte in NRW.",
};

export default function ObjektePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Container>
          <div className="py-24">
            <h1 className="font-heading text-4xl mb-8">Signature Collection</h1>
            <p className="text-lg text-zinc-600 mb-12">
              [Signature Collection Grid]
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
