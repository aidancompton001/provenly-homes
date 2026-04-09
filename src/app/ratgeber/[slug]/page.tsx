import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";

export function generateStaticParams() {
  return [
    { slug: "wie-aufwendig-ist-kurzzeitvermietung-in-koeln" },
    { slug: "lohnt-sich-kurzzeitvermietung-koeln" },
    { slug: "kurzzeitvermietung-vs-langzeitvermietung-moebliert-koeln" },
    { slug: "kurzzeitvermietung-koeln-2026-chancen-risiken-gesetzeslage" },
    { slug: "kurzzeitvermietung-verstehen-bevor-man-startet" },
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
    title: `${title} | Provenly Homes Ratgeber`,
    description: `Ratgeber-Artikel: ${title}`,
  };
}

export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  return (
    <>
      <Header />
      <main id="main-content">
        <Container>
          <article className="py-24">
            <h1 className="font-heading text-4xl mb-8">
              Artikel: {slug}
            </h1>
            <p className="text-lg text-zinc-600 mb-12">
              [Article Content — {slug}]
            </p>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}
