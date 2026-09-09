/**
 * AUTO-GENERATED DATA for the hair-and-beard service page.
 *
 * Every string, image path, price and SVG icon here was extracted
 * byte-for-byte from the original per-service components in
 * src/components/services/hair-and-beard/ so the shared components render
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

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20Hair%20%26%20Beard%20services.%20Can%20I%20book%20an%20appointment%3F";

export const hairAndBeardPage = {
  slug: "hair-and-beard",
  whatsappUrl: WHATSAPP_URL,

  hero: {
    desktopImageSrc: "/images/services/service-hair-beard.webp",
    desktopImageAlt: "Reset Men Salon — Hair & Beard Grooming Dubai",
    mobileImageSrc: "/phoneview.webp",
    mobileImageAlt: "Reset Men Salon — Hair & Beard Precision Barbering",
    titleWords: ["HAIR &", "BEARD"] as [string, string],
    subtitle: "Precision haircuts, tailored fades, and bespoke beard architecture in Business Bay. Welcome to Reset.",
  },

  list: {
    title: "Our Grooming Services",
    subtitle: "Haircuts designed to match your face shape and personal style. Expect clean lines and a sharp finish that lasts.",
    filters: {
    categories: [
    { id: "hair", label: "Haircuts", count: 3 },
    { id: "beard", label: "Beard", count: 4 },
    ],
  } as { allLabel?: string; categories: ServiceFilterCategory[] } | undefined,
    items: ([
  {
    id: "srv-mens-haircut",
    title: "Men’s Haircut",
    category: "hair",
    description:
      "Haircuts designed to match your face shape and personal style. Expect clean lines and a sharp finish that lasts.",
    price: "180 AED",
    image: "/images/services/service-hair-beard.webp"
  },
  {
    id: "srv-kids-haircut",
    title: "Kid’s Haircut",
    category: "hair",
    description:
      "Our kids haircut in Dubai service is calm and friendly. We create styles that suit kids of all ages while keeping parents and children relaxed.",
    price: "100 AED",
    image: "/site-pics/site-10.jpg"
  },
  {
    id: "srv-hairstyle-men",
    title: "Hairstyle for Men",
    category: "hair",
    description:
      "We create modern and classic hairstyles based on your hair texture, face shape and lifestyle. Every cut is made to look clean and natural.",
    price: "70 AED",
    image: "/images/hero/hero-model.jpg"
  },
  {
    id: "srv-classic-beard-trim",
    title: "Classic Beard Trim",
    category: "beard",
    description:
      "Our beard shaving salon service gives you a close and comfortable shave. We use professional methods to keep skin smooth and irritation free.",
    price: "60 AED",
    image: "/site-pics/site-1.jpg"
  },
  {
    id: "srv-classic-beard-shaving",
    title: "Classic Beard Shaving",
    category: "beard",
    description:
      "Our beard shaving salon service gives you a close and comfortable shave. We use professional methods to keep skin smooth and irritation free.",
    price: "60 AED",
    image: "/site-pics/site-7.jpg"
  },
  {
    id: "srv-reset-beard-trim-style",
    title: "Reset Beard Trim & Style",
    category: "beard",
    description:
      "A premium beard grooming experience with precision trimming, detailed shaping, and expert styling to enhance your look while maintaining a sharp, polished finish.",
    price: "80 AED",
    image: "/site-pics/site-11.jpg"
  },
  {
    id: "srv-beard-brushing-styling",
    title: "Beard Brushing & Styling",
    category: "beard",
    description:
      "Shapes and softens your beard using precise grooming techniques, enhancing texture and definition while keeping it neat, healthy, and easy to manage daily.",
    price: "50 AED",
    image: "/site-pics/site-4.jpg"
  },
] as Omit<ServiceItemCard, "whatsappUrl">[]).map(
      (it) => ({ ...it, whatsappUrl: WHATSAPP_URL }),
    ) as ServiceItemCard[],
  },

  whyChoose: {
    eyebrow: "Precision & Craftsmanship",
    title: "Why Our Hair and Beard Style Is Trusted in Business Bay",
    intro: "From symmetrical beard lines to effortless daily maintenance, discover what makes Reset Men Salon Dubai’s trusted grooming sanctuary.",
    pillars: [
  {
    number: "01",
    title: "Polished & Refined Results",
    shortDesc:
      "Regular grooming keeps your hair and beard balanced with clean lines that look sharp every day.",
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
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Achieve Your Desired Look",
    shortDesc:
      "Modern trends and classic cuts customized to your face contours and personal lifestyle.",
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
        <path d="M4 14c0-4.418 3.582-8 8-8s8 3.582 8 8" />
        <path d="M4 11c1.5-2.5 4-4 8-4s6.5 1.5 8 4" />
        <path d="M7 7c2-2 4.5-3 8-3 2 0 3.5.5 5 1.5" />
        <circle cx="12" cy="15" r="4" />
        <path d="M10 19v2" />
        <path d="M14 19v2" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Improved Skin Comfort",
    shortDesc:
      "Gentle professional techniques and sterile tools that eliminate irritation and razor burn.",
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
    number: "04",
    title: "Reduced Daily Maintenance",
    shortDesc:
      "A well shaped cut and beard stay manageable longer, cutting styling time every morning.",
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
        <polyline points="12 7 12 12 16 14" />
        <path d="M19 12a7 7 0 1 1-2.05-4.95L19 9" />
        <polyline points="15 9 19 9 19 5" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Professional Beard Care",
    shortDesc:
      "Strict hygiene, precision trimming, and straight-razor detailing for defined jawlines.",
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
        <path d="M4 11c2-2 4-2 6 0 1.5 1.5 2.5 1.5 4 0 2-2 4-2 6 0-1 2-3 3-6 2-1 0-1.5-.5-2-.5s-1 .5-2 .5c-3 1-5 0-6-2z" />
        <path d="M5 13c1 4.5 4 8 7 8s6-3.5 7-8" />
        <path d="M12 16v3" />
      </svg>
    ),
  },
] as WhyChoosePillar[],
  },

  faq: {
    eyebrow: "Got Questions?",
    subtitle: "Everything you need to know about our precision hair cutting and beard architecture rituals in Business Bay.",
    faqs: [
  {
    id: "faq-hb-1",
    question: "How often should I get a haircut or beard trim to maintain clean lines?",
    answer:
      "For optimal sharpness and structure, we recommend visiting every 2 to 3 weeks for haircuts and every 10 to 14 days for beard shaping and razor edge maintenance. Regular appointments keep the neckline clean and make daily styling quick and effortless.",
  },
  {
    id: "faq-hb-2",
    question: "What is included in the Reset Men’s Haircut (180 AED)?",
    answer:
      "Every haircut at Reset includes an in-depth facial architecture consultation, revitalizing scalp shampoo wash, precision scissor and clipper craftsmanship, hot towel essential oil ritual, razor neck detailing, and finishing with premium matte clay or pomade.",
  },
  {
    id: "faq-hb-3",
    question: "Do you offer friendly kids haircut services in Dubai?",
    answer:
      "Yes! Our Kid’s Haircut service (100 AED) is gentle, calm, and welcoming. Our experienced barbers know how to keep children relaxed while crafting modern, age-appropriate haircuts that look sharp and natural.",
  },
  {
    id: "faq-hb-4",
    question: "How do your barbers prevent razor bumps and irritation during beard shaving?",
    answer:
      "We prepare the skin with organic botanical pre-shave oils, apply steaming hot towels to soften facial hair follicles, use single-use surgical blades with light featherweight technique, and finish with cold compress towels and antiseptic calming balms.",
  },
  {
    id: "faq-hb-5",
    question: "Can I book both a haircut and beard trim in the same appointment?",
    answer:
      "Absolutely. You can combine any of our hair and beard grooming treatments in a single seamless session. Simply mention your preferred combination when scheduling on WhatsApp and we will allocate dedicated time with your master barber.",
  },
  {
    id: "faq-hb-6",
    question: "Where is Reset Men Salon located in Business Bay, Dubai?",
    answer:
      "We are conveniently located in Business Bay, Dubai, with dedicated valet parking and easy accessibility from Downtown Dubai, DIFC, and Sheikh Zayed Road. Our concierge can share direct Google Maps coordinates upon WhatsApp booking.",
  },
] as ServiceFaq[],
  },

  bookingCta: {
    headline: "Book Your Service for the Best Hair Salon in Dubai",
    description: "If you’re looking for a reliable hair and beard salon near me, Reset Men Salon offers expert grooming in a calm, premium space. From men’s grooming to family friendly services like kids haircut, we help you look sharp and feel confident every day. Each appointment is personal. Our barbers focus on precision, cleanliness and steady results. Every visit is relaxed and easy, with grooming you can count on.",
    backgroundImage: {
      src: "/images/services/service-hair-beard.webp",
      alt: "Reset Barbering Atmosphere",
    },
    trustBadges: [
      "Hospital-Grade Sterilization",
      "Zero Rush Appointments",
      "Prime Business Bay Location",
    ] as [string, string, string],
    whatsappUrl: WHATSAPP_URL,
  } satisfies BookingCtaProps,
  parallax: [
  {
    id: "hair-beard-1",
    src: "/images/services/service-hair-beard.webp",
    alt: "Reset Men Salon Haircut & Beard Architecture Mastery",
  },
  {
    id: "hair-beard-2",
    src: "/site-pics/site-1.jpg",
    alt: "Reset Men Salon Business Bay Styling Suite",
  },
] as { id: string; src: string; alt: string }[],

  metadata: {
  title: "Hair & Beard Salon Dubai | Men's Haircuts & Beard Grooming Business Bay",
  description:
    "Discover the best hair and beard salon in Dubai at Reset Men Salon, Business Bay. Precision men's haircuts, kids haircut, master beard sculpting, and hot towel shaves.",
  keywords: [
    "Hair and Beard salon Dubai",
    "Men's haircut Dubai",
    "Kids haircut Dubai",
    "Beard trim Business Bay",
    "Best hair salon for men Dubai",
    "Beard sculpting Dubai",
    "Reset Men Salon",
  ],
  openGraph: {
    title: "Hair & Beard Salon Dubai | Reset Men Salon Business Bay",
    description:
      "Expert men's grooming in a calm, luxury sanctuary. Clean lines, tailored fades, and precision beard sculpting.",
    url: "https://resetbarbershop.com/services/hair-and-beard",
    images: [
      {
        url: "/images/services/service-hair-beard.webp",
        width: 1200,
        height: 630,
        alt: "Reset Men Salon Hair & Beard Grooming Dubai",
      },
    ],
  },
} as import("next").Metadata,

};
