import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CityPageContent from "@/components/sections/CityPageContent";
import citiesData from "@/data/cities.json";
import type { CitiesData } from "@/data/types";

const data = citiesData as CitiesData;
const city = data.cities.find((c) => c.slug === "bonn")!;

export const metadata: Metadata = {
  title: `${city.h1} | Provenly Homes`,
  description: city.intro.slice(0, 160),
};

export default function BonnPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <CityPageContent city={city} />
      </main>
      <Footer />
    </>
  );
}
