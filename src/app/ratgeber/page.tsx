import type { Metadata } from "next";
import Link from "next/link";
import { getHref } from "@/lib/getImageUrl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import articlesData from "@/data/articles.json";

export const metadata: Metadata = {
  title: articlesData.pageTitle,
  description: articlesData.subheading,
};

export default function RatgeberPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-cream pt-32 pb-16 lg:pt-40 lg:pb-24">
          <Container>
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h1 className="font-heading text-4xl lg:text-[3.5rem] font-normal text-charcoal leading-[1.2]">
                {articlesData.heading}
              </h1>
              <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
                {articlesData.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articlesData.articles.map((article) => (
                <Link
                  key={article.slug}
                  href={getHref(`/ratgeber/${article.slug}`)}
                  className="group block bg-cream rounded-xl shadow-[0_2px_8px_rgba(58,58,58,0.06)] hover:shadow-[0_8px_24px_rgba(58,58,58,0.12)] transition-all duration-300 overflow-hidden border border-sand cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="copper">{article.category}</Badge>
                      {article.readingTime && (
                        <span className="font-body text-xs text-charcoal-light">{article.readingTime}</span>
                      )}
                    </div>

                    <h2 className="font-heading text-xl font-semibold text-charcoal group-hover:text-copper transition-colors duration-200 leading-tight">
                      {article.title}
                    </h2>

                    <p className="mt-3 font-body text-sm text-charcoal-light leading-relaxed line-clamp-3">
                      {article.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-sand flex items-center justify-between">
                      <span className="font-body text-xs text-charcoal-light">
                        {article.author} &middot; {new Date(article.date).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
