import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";
import FloatingContacts from "@/components/layout/FloatingContacts";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Comparison from "@/components/sections/Comparison";
import Services from "@/components/sections/Services";
import Signatures from "@/components/sections/Signatures";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Stats />
        <Comparison />
        <Services />
        <Signatures />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
      <CookieBanner />
      <FloatingContacts />
    </>
  );
}
