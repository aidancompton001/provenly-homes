import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/sections/ContactForm";
import contactData from "@/data/contact-form.json";
import type { ContactFormData } from "@/data/types";

const data = contactData as ContactFormData;

export const metadata: Metadata = {
  title: data.title,
  description: data.body,
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="bg-cream py-16 lg:py-24">
          <Container>
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="font-heading text-3xl lg:text-[3rem] font-normal text-charcoal leading-[1.2]">
                  {data.heading}
                </h1>
                <p className="mt-4 font-body text-lg text-charcoal-light leading-relaxed">
                  {data.body}
                </p>
              </div>
              <ContactForm />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
