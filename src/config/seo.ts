import { Metadata } from "next";
import { siteConfig } from "./site";

export const defaultSeoConfig: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Luxury Men Salon & Japanese Head Spa Dubai`,
    template: `%s | ${siteConfig.name} Dubai`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Reset Men Salon",
    "Luxury Men Salon Dubai",
    "Japanese Head Spa Dubai",
    "Barber Business Bay",
    "Men Haircut Business Bay Dubai",
    "Beard Grooming Dubai",
    "Men Facial Dubai",
    "Men Scalp Treatment Dubai",
    "Executive Grooming Dubai",
    "Best Men Salon Dubai",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Luxury Men Salon Dubai`,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/brand/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Luxury Grooming Sanctuary, Business Bay Dubai`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Luxury Men Salon Dubai`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/brand/og-image.jpg`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  other: {
    "format-detection": "telephone=no",
    "geo.region": "AE-DU",
    "geo.placename": "Dubai, Business Bay",
    "geo.position": `${siteConfig.contact.geo.latitude};${siteConfig.contact.geo.longitude}`,
    ICBM: `${siteConfig.contact.geo.latitude}, ${siteConfig.contact.geo.longitude}`,
  },
};
