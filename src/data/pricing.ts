import { PricingCategoryGroup, PricingPackage } from "@/types/pricing";

export const pricingPackages: PricingPackage[] = [
  {
    id: "pkg-the-executive",
    slug: "the-executive-reset",
    title: "The Executive Reset",
    subtitle: "Complete Signature Grooming Experience",
    priceAED: 280,
    originalPriceAED: 330,
    durationEstimate: "1h 15m",
    isPopular: true,
    description: "Our most requested ritual for Dubai executives before important meetings or events.",
    includedServices: [
      "Reset Signature Haircut & Consultation",
      "Master Beard Sculpting or Royal Shave",
      "Aromatherapy Hot Towel Ritual",
      "Scalp Energizing Botanical Wash",
      "Executive Beverage (Espresso / Sparkling)",
    ],
    ctaText: "Book Executive Reset",
  },
  {
    id: "pkg-the-zenith",
    slug: "the-japanese-sanctuary",
    title: "The Japanese Sanctuary",
    subtitle: "Total Head & Beard Rejuvenation",
    priceAED: 590,
    originalPriceAED: 700,
    durationEstimate: "2 Hours",
    isVip: true,
    description: "The ultimate multisensory relaxation ritual combining our signature Japanese Head Spa and grooming.",
    includedServices: [
      "Signature 15-Step Japanese Head Spa",
      "Microscopic 200x Scalp Diagnosis",
      "Hydrotherapy Waterfall Halo Therapy",
      "Reset Signature Haircut & Style",
      "Luxury Hand Grooming (Manicure)",
      "Dedicated Private Suite",
    ],
    ctaText: "Reserve Sanctuary Experience",
  },
  {
    id: "pkg-total-gentleman",
    slug: "the-total-gentleman",
    title: "The Total Gentleman",
    subtitle: "Comprehensive Full-Body Grooming",
    priceAED: 750,
    originalPriceAED: 880,
    durationEstimate: "2h 45m",
    isVip: true,
    description: "Complete full-service restoration covering hair, beard, skin, hands, and therapeutic massage.",
    includedServices: [
      "Signature Haircut & Beard Sculpt",
      "Deep Cleansing Facial Detox",
      "Executive Deep Tissue Massage (45m)",
      "Executive Manicure & Spa Pedicure",
      "Complimentary Refreshment Pairing",
    ],
    ctaText: "Book Total Gentleman",
  },
];

export const pricingMenuGroups: PricingCategoryGroup[] = [
  {
    categorySlug: "hair-and-beard",
    categoryTitle: "Hair & Beard Craft",
    items: [
      { id: "p-1", name: "Reset Signature Haircut", durationMinutes: 45, priceAED: 180, categorySlug: "hair-and-beard", isPopular: true },
      { id: "p-2", name: "Master Beard Sculpting", durationMinutes: 30, priceAED: 120, categorySlug: "hair-and-beard", isPopular: true },
      { id: "p-3", name: "Royal Hot Towel Shave", durationMinutes: 40, priceAED: 150, categorySlug: "hair-and-beard" },
      { id: "p-4", name: "Junior Gentleman Cut (<12 yrs)", durationMinutes: 30, priceAED: 130, categorySlug: "hair-and-beard" },
      { id: "p-5", name: "Haircut & Beard Duo", durationMinutes: 60, priceAED: 270, categorySlug: "hair-and-beard", isPopular: true },
    ],
  },
  {
    categorySlug: "japanese-head-spa",
    categoryTitle: "Japanese Head Spa Rituals",
    items: [
      { id: "p-6", name: "Signature 15-Step Head Spa Ritual", durationMinutes: 75, priceAED: 450, categorySlug: "japanese-head-spa", isPopular: true },
      { id: "p-7", name: "Express Scalp Revive & Waterfall", durationMinutes: 35, priceAED: 250, categorySlug: "japanese-head-spa" },
      { id: "p-8", name: "Anti-Hair Loss Deep Follicle Therapy", durationMinutes: 90, priceAED: 580, categorySlug: "japanese-head-spa" },
    ],
  },
  {
    categorySlug: "facial",
    categoryTitle: "Facial & Skin Care",
    items: [
      { id: "p-9", name: "Executive Deep Cleansing Facial", durationMinutes: 60, priceAED: 320, categorySlug: "facial", isPopular: true },
      { id: "p-10", name: "24K Gold Luxury Anti-Aging Facial", durationMinutes: 75, priceAED: 490, categorySlug: "facial" },
      { id: "p-11", name: "Instant Eye Contour & Dark Circle Treatment", durationMinutes: 25, priceAED: 140, categorySlug: "facial" },
    ],
  },
  {
    categorySlug: "nails",
    categoryTitle: "Hand & Foot Care",
    items: [
      { id: "p-12", name: "Executive Manicure", durationMinutes: 35, priceAED: 110, categorySlug: "nails" },
      { id: "p-13", name: "Deep Spa Pedicure", durationMinutes: 45, priceAED: 150, categorySlug: "nails", isPopular: true },
      { id: "p-14", name: "Executive Hand & Foot Duo", durationMinutes: 75, priceAED: 230, categorySlug: "nails" },
    ],
  },
];
