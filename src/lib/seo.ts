import type { Metadata } from "next";

interface SEOParams {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const SITE_NAME = "Provenly Homes";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://provenlyhomes.de";

export function generateSEO({
  title,
  description,
  path = "",
  image = "/og-image.jpg",
}: SEOParams): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "de_DE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_URL}${image}`],
    },
    alternates: {
      canonical: url,
    },
  };
}
