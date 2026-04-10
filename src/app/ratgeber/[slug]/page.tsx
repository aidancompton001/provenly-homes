import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Accordion from "@/components/ui/Accordion";
import articlesData from "@/data/articles.json";

export function generateStaticParams() {
  return articlesData.articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const article = articlesData.articles.find((a) => a.slug === slug);
  if (!article) return { title: "Artikel nicht gefunden | Provenly Homes" };

  return {
    title: `${article.title} | Provenly Homes Ratgeber`,
    description: article.description,
  };
}

export default async function ArticlePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const article = articlesData.articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <>
        <Header />
        <main id="main-content">
          <Container>
            <div className="py-32 text-center">
              <h1 className="font-heading text-4xl text-charcoal">Artikel nicht gefunden</h1>
              <Button variant="primary" href="/ratgeber" className="mt-8">Zurück zum Ratgeber</Button>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  const faqItems = article.faqs
    .filter((f) => f.answer)
    .map((f, i) => ({
      id: `faq-${i}`,
      question: f.question,
      answer: f.answer || "",
    }));

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Article header */}
        <section className="bg-cream pt-32 pb-12 lg:pt-40 lg:pb-16">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="copper">{article.category}</Badge>
                {article.readingTime && (
                  <span className="font-body text-sm text-charcoal-light">{article.readingTime}</span>
                )}
              </div>

              <h1 className="font-heading text-3xl lg:text-[2.75rem] font-normal text-charcoal leading-[1.2]">
                {article.title}
              </h1>

              <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
                {article.description}
              </p>

              <div className="mt-6 font-body text-sm text-charcoal-light">
                Von {article.author} &middot; {new Date(article.date).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
              </div>
            </div>
          </Container>
        </section>

        {/* Article body */}
        <section className="bg-cream-dark py-12 lg:py-16">
          <Container>
            <div className="max-w-3xl mx-auto">
              {article.sections.map((section, i) => (
                <div key={i} className="mb-10 last:mb-0">
                  <h2 className="font-heading text-2xl font-semibold text-charcoal mb-4">
                    {section.title}
                  </h2>
                  {section.body && (
                    <p className="font-body text-base text-charcoal-light leading-relaxed">
                      {section.body}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Key quotes */}
        {article.keyQuotes.length > 0 && (
          <section className="bg-charcoal py-12 lg:py-16">
            <Container>
              <div className="max-w-3xl mx-auto space-y-6">
                {article.keyQuotes.map((quote, i) => (
                  <blockquote key={i} className="border-l-2 border-copper pl-6">
                    <p className="font-heading text-xl lg:text-2xl text-cream/90 italic leading-relaxed">
                      &ldquo;{quote}&rdquo;
                    </p>
                  </blockquote>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* FAQ */}
        {faqItems.length > 0 && (
          <section className="bg-cream py-12 lg:py-16">
            <Container>
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-2xl lg:text-3xl font-normal text-charcoal mb-8">
                  Häufige Fragen
                </h2>
                <Accordion items={faqItems} />
              </div>
            </Container>
          </section>
        )}

        {/* CTA */}
        <section className="bg-cream-dark py-12 lg:py-16">
          <Container>
            <div className="max-w-xl mx-auto text-center bg-cream rounded-xl p-8 border border-sand shadow-[0_2px_8px_rgba(58,58,58,0.06)]">
              <h2 className="font-heading text-2xl font-semibold text-charcoal">
                Potenzial Ihrer Immobilie prüfen
              </h2>
              <p className="mt-3 font-body text-base text-charcoal-light leading-relaxed">
                Finden Sie heraus, ob sich Kurzzeitvermietung für Ihr Objekt lohnt — kostenlos und unverbindlich.
              </p>
              <div className="mt-6">
                <Button variant="primary" size="lg" href="/kontakt">
                  Erstgespräch vereinbaren
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
