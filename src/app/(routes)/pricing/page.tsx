import { Metadata } from "next";
import {
  PricingHeroSection,
  PricingGridSection,
} from "@/components/pricing";
import {
  TrueParallaxShowcaseSection,
  TestimonialEditorialSection,
} from "@/components/home";
import { safeJsonLd } from "@/lib/security/sanitize-json-ld";

const pricingParallaxItems = [
  {
    id: "pricing-parallax-1",
    src: "/images/salon/haircut-skin-fade-profile.webp",
    alt: "Reset Men Salon Business Bay Barbering Suite",
  },
  {
    id: "pricing-parallax-2",
    src: "/images/salon/japanese-head-spa-halo.webp",
    alt: "Reset Men Salon Japanese Head Spa & Relaxation Sanctuary",
  },
];

export const metadata: Metadata = {
  title: "Service Price List | Reset Men Salon Business Bay Dubai",
  description:
    "Explore the official service price list for Reset Men Salon in Business Bay Dubai. Transparent rates for haircuts, beard styling, hair coloring, botox treatments, head spa, massage, nails, and waxing.",
  keywords: [
    "Reset Men Salon price list",
    "Men haircut price Dubai",
    "Barbershop prices Business Bay",
    "Japanese head spa price Dubai",
    "Beard trim price Dubai",
    "Men salon rates Dubai",
  ],
  openGraph: {
    title: "Services & Price List | Reset Men Salon Dubai",
    description:
      "All-inclusive rates for precision haircutting, beard grooming, Japanese head spa, massage, and nail care in Business Bay.",
    url: "https://resetmensalon.ae/pricing",
    images: [
      {
        url: "/images/salon/salon-rotunda-boutique.webp",
        width: 1200,
        height: 630,
        alt: "Reset Men Salon Services & Price List",
      },
    ],
  },
};

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "Reset Men Salon",
    priceRange: "AED 20 - AED 500",
    url: "https://resetmensalon.ae/pricing",
    telephone: "+97145655688",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Business Bay",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    currenciesAccepted: "AED",
    paymentAccepted: "Cash, Credit Card, Apple Pay",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <div className="relative w-full bg-white text-noir-900 min-h-screen flex flex-col items-center">
        {/* 1. Hero Section: Monumental PRICE LIST Typography with Parallax */}
        <PricingHeroSection />

        {/* 2. Full Services Price List Grid (8 Categories, 36 Services matching Menu Sheet) */}
        <PricingGridSection />

        {/* 3. Parallax Image Showcase */}
        <TrueParallaxShowcaseSection items={pricingParallaxItems} />

        {/* 4. Client Testimonials */}
        <TestimonialEditorialSection />
      </div>
    </>
  );
}
