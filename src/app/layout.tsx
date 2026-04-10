import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import MotionProvider from "@/components/motion/MotionProvider";
import "./globals.css";

const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Provenly Homes | Kurzzeitvermietung mit System für Eigentümer in NRW",
  description:
    "Professionelle Kurzzeitvermietung für Eigentümer in NRW. Vermarktung, Preisstrategie, Gäste-Kommunikation und operative Abläufe – strukturiert, rechtssicher und renditeorientiert.",
  metadataBase: new URL("https://provenlyhomes.de"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${lora.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Zum Inhalt springen
        </a>
        <MotionProvider>
          {children}
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Provenly Homes",
              description: "Professionelle Kurzzeitvermietung für Eigentümer in NRW.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Nathan-Kahn-Str. 15",
                addressLocality: "Köln",
                postalCode: "51061",
                addressCountry: "DE",
              },
              telephone: "+49 163 4555833",
              email: "provenlyhomes@web.de",
              url: "https://provenlyhomes.de",
              areaServed: [
                { "@type": "City", name: "Köln" },
                { "@type": "City", name: "Bonn" },
                { "@type": "City", name: "Düsseldorf" },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
