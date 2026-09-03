export const siteConfig = {
  name: "Reset Men Salon",
  legalName: "Reset Men Salon LLC",
  tagline: "The Architecture of Modern Grooming",
  description:
    "Dubai's premier luxury men's grooming destination in Business Bay. Specializing in precision haircuts, beard architecture, facial therapies, and signature Japanese Head Spa.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://resetmensalon.ae",
  locale: "en_AE",
  contact: {
    phoneDisplay: "+971 4 565 5688",
    phoneHref: "tel:+97145655688",
    whatsappDisplay: "+971 58 102 1540",
    whatsappLink: "https://wa.me/971581021540?text=Hello%20Reset%20Men%20Salon,%20I%20would%20like%20to%20inquire%20about%20booking.",
    email: "info@resetmensalon.ae",
    address: {
      street: "Business Bay",
      city: "Dubai",
      emirate: "Dubai",
      country: "United Arab Emirates",
      countryCode: "AE",
    },
    geo: {
      latitude: 25.1867,
      longitude: 55.2744,
    },
    hours: {
      weekdays: "10:00 AM - 10:00 PM",
      weekends: "10:00 AM - 10:00 PM",
      daysSummary: "Monday – Sunday, 10:00 AM – 10:00 PM",
    },
  },
  socials: {
    instagram: "https://instagram.com/resetmensalon",
    tiktok: "https://tiktok.com/@resetmensalon",
  },
  booking: {
    primaryUrl: "https://wa.me/971581021540?text=Hello%20Reset%20Men%20Salon,%20I%20would%20like%20to%20book%20an%20appointment.",
    secondaryUrl: "/contact",
  },
} as const;

export type SiteConfig = typeof siteConfig;
