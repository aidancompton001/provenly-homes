import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import MotionProvider from "@/components/motion/MotionProvider";
import "./globals.css";

const serifFont = DM_Serif_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sansFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
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
      className={`${serifFont.variable} ${sansFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <a href="#main-content" className="skip-link">
          Zum Inhalt springen
        </a>
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
