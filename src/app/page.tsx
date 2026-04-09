import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Comparison from "@/components/sections/Comparison";
import Services from "@/components/sections/Services";
import Signatures from "@/components/sections/Signatures";
import Process from "@/components/sections/Process";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import Stats from "@/components/sections/Stats";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Comparison />
        <Services />
        <Signatures />
        <Process />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTASection />
        <Stats />
      </main>
      <Footer />
    </>
  );
}
