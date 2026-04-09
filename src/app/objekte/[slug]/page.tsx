import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export function generateStaticParams() {
  return [
    { slug: "rheinabend-suite" },
    { slug: "rheinblick-family-residence" },
    { slug: "urban-skyline-loft" },
  ];
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${title} | Provenly Homes`,
    description: `Details zum Signature-Objekt ${title} von Provenly Homes.`,
  };
}

export default async function PropertyPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  return (
    <>
      <Header />
      <main id="main-content">
        <Container>
          <div className="py-24">
            <h1 className="font-heading text-4xl mb-8">
              Objekt: {slug}
            </h1>
            <p className="text-lg text-zinc-600 mb-12">
              [Property Detail — {slug}]
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
