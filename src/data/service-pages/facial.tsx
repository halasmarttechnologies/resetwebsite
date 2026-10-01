/**
 * AUTO-GENERATED DATA for the facial service page.
 *
 * Every string, image path, price and SVG icon here was extracted
 * byte-for-byte from the original per-service components in
 * src/components/services/facial/ so the shared components render
 * exactly the same output. Edit this file to change copy; the shared
 * components in src/components/services/shared/ own the layout.
 */
import type {
  ServiceItemCard,
  ServiceFilterCategory,
  WhyChoosePillar,
  ServiceFaq,
  BookingCtaProps,
} from "@/components/services/shared";

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20Facial%20services.%20Can%20I%20book%20an%20appointment%3F";

export const facialPage = {
  slug: "facial",
  whatsappUrl: WHATSAPP_URL,

  hero: {
    desktopImageSrc: "/images/salon/japanese-head-spa-massage.webp",
    desktopImageAlt: "Reset Men Salon — Executive Facial Skincare Dubai",
    mobileImageSrc: "/images/salon/scalp-rinse-treatment.webp",
    mobileImageAlt: "Reset Men Salon — Gentlemen's Facial Therapy",
    titleWords: ["FACIAL", "CARE"] as [string, string],
    subtitle: "Dermatological cleansing, deep blackhead extraction, and active botanical hydration in Business Bay. Welcome to Reset.",
  },

  list: {
    title: "Facial & Skincare Menu",
    subtitle: "High-performance dermatological skincare formulated specifically for male skin, combating environmental pollution and fatigue.",
    filters: {
    categories: [
    { id: "cleansing", label: "Deep Cleansing", count: 4 },
    { id: "anti-aging", label: "Rejuvenation & Care", count: 2 },
    ],
  } as { allLabel?: string; categories: ServiceFilterCategory[] } | undefined,
    items: ([
  {
    id: "srv-nose-strip",
    title: "Nose Strip",
    category: "cleansing",
    description:
      "Targeted pore purification to extract stubborn blackheads and excess sebum around the nose for a clean, clear finish.",
    price: "55 AED",
    image: "/images/salon/japanese-head-spa-massage.webp"
  },
  {
    id: "srv-black-mask",
    title: "Black Mask",
    category: "cleansing",
    description:
      "Deep purifying charcoal peel-off mask that detoxifies skin pores, removes impurities, and controls facial oil.",
    price: "90 AED",
    image: "/images/salon/scalp-rinse-treatment.webp"
  },
  {
    id: "srv-face-scrub",
    title: "Face Scrub",
    category: "cleansing",
    description:
      "Gentle dermatological exfoliation buffing away dead epidermal cells, smoothing rough texture and reviving complexion.",
    price: "110 AED",
    image: "/images/salon/manicure-massage-care.webp"
  },
  {
    id: "srv-basic-facial",
    title: "Basic Facial",
    category: "cleansing",
    description:
      "Essential skin reset tailored for men: active cleanse, gentle pore refinement, and protective barrier hydration.",
    price: "275 AED",
    image: "/images/salon/shampoo-wash-station.webp"
  },
  {
    id: "srv-classic-facial",
    title: "Classic Facial",
    category: "anti-aging",
    description:
      "Complete restorative facial combining deep pore cleansing, steam extraction, facial massage, and calming botanical hydration.",
    price: "165 AED",
    image: "/images/salon/japanese-head-spa-halo.webp"
  },
  {
    id: "srv-vitamin-c",
    title: "Vitamin C Facial",
    category: "anti-aging",
    description:
      "High-potency antioxidant treatment infusing pure Vitamin C to brighten dull skin, combat sun damage, and boost elasticity.",
    price: "450 AED",
    image: "/images/salon/salon-lounge-interior.webp"
  },
] as Omit<ServiceItemCard, "whatsappUrl">[]).map(
      (it) => ({ ...it, whatsappUrl: WHATSAPP_URL }),
    ) as ServiceItemCard[],
  },

  whyChoose: {
    eyebrow: "Clinical Purity & Skincare",
    title: "Why Our Facial Therapy Is Trusted in Business Bay",
    intro: "Targeted dermatological treatments designed for modern gentlemen, offering deep detoxification, cellular hydration, and clean skin confidence.",
    pillars: [
  {
    number: "01",
    title: "Deep Pore Detox",
    shortDesc:
      "Ultrasonic acoustic waves dislodge deep blackheads and oil congestion without scarring.",
    icon: (
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Tailored to Male Dermis",
    shortDesc:
      "Formulated specifically for thicker male skin barriers, active sebum, and beard growth zones.",
    icon: (
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l8 4.5v6c0 5.25-3.5 10.05-8 11.5-4.5-1.45-8-6.25-8-11.5v-6L12 2z" />
        <path d="M12 7c-1.5 2-2.5 3.5-2.5 5a2.5 2.5 0 0 0 5 0c0-1.5-1-3-2.5-5z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Anti-Pollution Shield",
    shortDesc:
      "Active marine minerals and antioxidants neutralize desert dust, dry A/C air, and UV oxidation.",
    icon: (
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="3" x2="12" y2="7" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Razor & Shaving Relief",
    shortDesc:
      "Immediate calming of razor burn, inflammation, and folliculitis around the neckline.",
    icon: (
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Zero Downtime Rejuvenation",
    shortDesc:
      "Leaves skin refreshed, deeply hydrated, and matte with no post-facial redness or flaking.",
    icon: (
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
] as WhyChoosePillar[],
  },

  faq: {
    eyebrow: "Got Questions?",
    subtitle: "Everything you need to know about our male dermatological facial treatments in Business Bay.",
    faqs: [
  {
    id: "faq-fc-1",
    question: "How often should men get an executive facial in Dubai?",
    answer:
      "We recommend receiving a deep cleansing facial every 4 to 6 weeks. This cadence matches your skin’s natural cellular renewal cycle and keeps pores clear from Dubai’s environmental dust, humidity, and sun exposure.",
  },
  {
    id: "faq-fc-2",
    question: "Do ultrasonic pore extractions hurt or leave marks?",
    answer:
      "Not at all. We utilize gentle ultrasonic acoustic vibration paired with pre-extraction botanical steam to loosen blackheads painlessly. Our soothing algae cooling masks ensure zero bruising or lasting redness.",
  },
  {
    id: "faq-fc-3",
    question: "Should I shave before my facial appointment?",
    answer:
      "We recommend shaving the evening before or at least 12 hours prior to your facial to allow skin sensitivity to subside. If you have a full beard, our therapists will focus on your T-zone, forehead, and cheeks while conditioning your beard.",
  },
  {
    id: "faq-fc-4",
    question: "Can I combine a facial with a haircut or head spa?",
    answer:
      "Yes. Many clients book our signature Executive Reset package, pairing a precision haircut, beard trim, and deep cleansing facial in a single comprehensive visit.",
  },
  {
    id: "faq-fc-5",
    question: "Is the 24K Luxury Anti-Aging Facial suitable for sensitive skin?",
    answer:
      "Yes. Pure 24K gold has natural anti-inflammatory and cellular calming properties, making it exceptionally gentle and beneficial for sensitive, easily irritated, or sun-fatigued skin.",
  },
] as ServiceFaq[],
  },

  bookingCta: {
    headline: "Book Your Service for the Best Facial Salon in Dubai",
    description: "Reclaim clear, energised, and irritation-free skin. Our master aestheticians specialize in male facial therapies, combining ultrasonic deep pore extraction, active botanical hydration, and anti-aging cell renewal.",
    backgroundImage: {
      src: "/images/salon/salon-armchair-neon.webp",
      alt: "Reset Facial Skincare Atmosphere",
    },
    trustBadges: [
      "Clinical-Grade Extractions",
      "Zero Redness or Downtime",
      "Prime Business Bay Location",
    ] as [string, string, string],
    whatsappUrl: WHATSAPP_URL,
  } satisfies BookingCtaProps,
  parallax: [
  {
    id: "facial-1",
    src: "/images/salon/japanese-head-spa-massage.webp",
    alt: "Reset Men Salon Clinical Facial & Dermatological Hydration",
  },
  {
    id: "facial-2",
    src: "/images/salon/salon-lounge-interior.webp",
    alt: "Reset Men Salon Private Aesthetic Suite Business Bay",
  },
] as { id: string; src: string; alt: string }[],

  metadata: {
  title: "Men's Facial & Skincare Dubai | Deep Cleansing & Anti-Aging Business Bay",
  description:
    "Luxury gentlemen's facial treatments at Reset Men Salon Business Bay. Ultrasonic blackhead extraction, 24K gold anti-aging, and botanical hydration.",
  keywords: [
    "Men facial Dubai",
    "Deep cleansing facial Dubai",
    "Men skincare Business Bay",
    "Ultrasonic extraction Dubai",
    "Reset Men Salon facial",
  ],
  openGraph: {
    title: "Men's Facial & Skincare Dubai | Reset Men Salon",
    description:
      "High-performance dermatological skincare formulated specifically for male skin, combating environmental pollution and fatigue.",
    url: "https://resetbarbershop.com/services/facial",
    images: [
      {
        url: "/images/salon/japanese-head-spa-massage.webp",
        width: 1200,
        height: 630,
        alt: "Reset Men Salon Facial Skincare Dubai",
      },
    ],
  },
} as import("next").Metadata,

};
