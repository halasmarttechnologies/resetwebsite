import { Metadata } from "next";
import {
  ContactHeroSection,
  ContactMainSection,
  ContactFaqSection,
} from "@/components/contact";
import { siteConfig } from "@/config/site";
import { safeJsonLd } from "@/lib/security/sanitize-json-ld";

const CONTACT_URL = `${siteConfig.url}/contact`;

export const metadata: Metadata = {
  title: "Contact Us & Concierge | Business Bay, Dubai | Reset Men Salon",
  description:
    "Get in touch with Reset Men Salon in Business Bay, Dubai. Call +971 4565 5688, chat via WhatsApp at +971 581 021 540, or email info@resetmensalon.ae. Open daily 10 AM – 10 PM.",
  keywords: [
    "Contact Reset Men Salon",
    "Reset Men Salon Business Bay",
    "Men salon Dubai contact",
    "Barbershop Business Bay phone",
    "Reset Men Salon WhatsApp",
    "Dubai luxury men grooming",
  ],
  openGraph: {
    title: "Contact Reset Men Salon | Business Bay, Dubai",
    description:
      "Connect with our salon concierge for appointments, location directions, and private grooming sessions in Business Bay.",
    url: CONTACT_URL,
    images: [
      {
        url: "/images/salon/salon-lounge-interior.webp",
        width: 1200,
        height: 630,
        alt: "Reset Men Salon Business Bay Dubai Concierge",
      },
    ],
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: "Reset Men Salon",
    description:
      "Dubai's premier luxury men's grooming destination in Business Bay, specializing in precision haircuts, beard styling, massage, facial therapies, and Japanese head spa.",
    telephone: "+97145655688",
    email: "info@resetmensalon.ae",
    url: CONTACT_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Business Bay",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "22:00",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <div className="relative w-full bg-white text-noir-900 min-h-screen flex flex-col items-center">
        {/* 1. Dark Parallax Hero with Monumental CONTACT US & Uniform "Book an Appointment" button */}
        <ContactHeroSection />

        {/* 2. Main Contact Section: Cards (Phone, WhatsApp, Email, Location), Inquiry Form, Hours & Map */}
        <ContactMainSection />

        {/* 3. Frequently Asked Questions Accordion */}
        <ContactFaqSection />
      </div>
    </>
  );
}
