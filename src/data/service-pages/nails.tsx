/**
 * AUTO-GENERATED DATA for the nails service page.
 *
 * Every string, image path, price and SVG icon here was extracted
 * byte-for-byte from the original per-service components in
 * src/components/services/nails/ so the shared components render
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

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20Nail%20services.%20Can%20I%20book%20an%20appointment%3F";

export const nailsPage = {
  slug: "nails",
  whatsappUrl: WHATSAPP_URL,

  hero: {
    desktopImageSrc: "/images/services/service-nails.jpg",
    desktopImageAlt: "Reset Men Salon — Manicure and Pedicure for Men in Business Bay Dubai",
    mobileImageSrc: "/phoneview.webp",
    mobileImageAlt: "Reset Men Salon — Men's Nail Care",
    titleWords: ["MEN'S", "NAILS"] as [string, string],
    subtitle: "Clean, precise, and hygienic hand and foot grooming in Business Bay. Welcome to Reset.",
  },

  list: {
    title: "Our Men&apos;s Nail Care Services",
    subtitle: "Hygienic manicures, restorative pedicures, and therapeutic warm paraffin treatments in Business Bay.",
    filters: {
    categories: [
    { id: "manicure", label: "Manicure", count: 3 },
    { id: "pedicure", label: "Pedicure & Care", count: 3 },
    ],
  } as { allLabel?: string; categories: ServiceFilterCategory[] } | undefined,
    items: ([
  {
    id: "srv-manicure",
    title: "Manicure",
    category: "manicure",
    description:
      "A professional manicure for men that includes nail trimming, shaping, cuticle care, and hydration. It keeps hands looking clean, healthy, and neat while helping you maintain a polished everyday appearance.",
    price: "80 AED",
    image: "/images/services/service-nails.jpg"
  },
  {
    id: "srv-pedicure",
    title: "Pedicure",
    category: "pedicure",
    description:
      "Our pedicure for men focuses on deep cleaning, gentle exfoliation, nail care, and moisturizing. It helps reduce dryness, keeps feet comfortable, and supports men who spend long hours standing or walking daily.",
    price: "120 AED",
    image: "/site-pics/site-7.jpg"
  },
  {
    id: "srv-majestic-manicure",
    title: "Majestic Manicure",
    category: "manicure",
    description:
      "A premium manicure designed for men who want more than basic grooming. It combines detailed nail care with relaxing steps that help reduce stress while leaving hands looking smooth, clean and refreshed.",
    price: "120 AED",
    image: "/site-pics/site-11.jpg"
  },
  {
    id: "srv-majestic-pedicure",
    title: "Majestic Pedicure",
    category: "pedicure",
    description:
      "Our reformed pedicure is designed for complete foot care and relaxation. It improves comfort and softens the rough skin while you feel like a new man after each session. Our goal is to make your feet cleaner and lighter so that you feel refreshed, comfortable and confident with every step.",
    price: "150 AED",
    image: "/site-pics/site-10.jpg"
  },
  {
    id: "srv-paraffin",
    title: "Paraffin Treatment",
    category: "pedicure",
    description:
      "A warm paraffin treatment that deeply hydrates dry skin and improves softness. It helps tired hands or feet feel smoother while supporting better comfort and leaving skin looking fresh and well cared for.",
    price: "99 AED",
    image: "/site-pics/site-6.jpg"
  },
  {
    id: "srv-cut-file",
    title: "Cut & File",
    category: "manicure",
    description:
      "Our services are efficient and smooth for those who want neat nails without spending too much time. At Resetmen, we make sure that your hands and feet look clean, keeping your appearance well maintained.",
    price: "99 AED",
    image: "/site-pics/site-2.jpg"
  },
] as Omit<ServiceItemCard, "whatsappUrl">[]).map(
      (it) => ({ ...it, whatsappUrl: WHATSAPP_URL }),
    ) as ServiceItemCard[],
  },

  whyChoose: {
    eyebrow: "Clean & Polished",
    title: "Benefits of Our Men&apos;s Nail Care in Business Bay",
    intro: "From executive manicures to cracked heel recovery, discover why Business Bay gentlemen trust Reset Men Salon for clean, reliable results.",
    pillars: [
  {
    number: "01",
    title: "Enhanced Appearance",
    shortDesc:
      "Clean hands and feet improve your overall look. Well-kept nails signal that you are attentive and put-together, delivering visible returns for work, travel, and daily routines.",
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
    title: "Expert Care",
    shortDesc:
      "Our trained team uses sterile tools and specialized methods tailored to male nail structure, ensuring precision, hygiene, and comfortable care every session.",
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
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Time-Saving",
    shortDesc:
      "Efficient and smooth appointments designed to match your busy schedule. Get meticulous attention to detail and long-lasting results without spending extra time in the chair.",
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
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Protection Against Discomfort",
    shortDesc:
      "Regular professional nail care repairs cracked skin, softens dry cuticles, and prevents painful ingrown nails caused by active routines or long hours on your feet.",
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
    title: "Professional Deep Cleaning",
    shortDesc:
      "Includes deep cleansing, gentle exfoliation, and cuticle smoothing that removes surface grime and dead skin, keeping hands and feet genuinely fresh long after your visit.",
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
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
] as WhyChoosePillar[],
  },

  faq: {
    eyebrow: "Got Questions?",
    subtitle: "Everything you need to know about our hygienic manicures, pedicures, and nail grooming in Business Bay.",
    faqs: [
  {
    id: "faq-nail-1",
    question: "Why should men get regular manicures and pedicures?",
    answer:
      "Beyond clean aesthetics, professional nail care prevents painful ingrown toenails, softens rough calluses, restores cracked heel skin, and promotes overall foot and hand health for active men.",
  },
  {
    id: "faq-nail-2",
    question: "How long does a men's manicure or pedicure take?",
    answer:
      "A standard manicure or cut & file takes approximately 25 to 30 minutes, while our thorough pedicure or majestic session takes 40 to 45 minutes. Services are structured for efficiency to fit busy professional schedules.",
  },
  {
    id: "faq-nail-3",
    question: "How do you ensure hygiene and sanitation?",
    answer:
      "We strictly follow hospital-grade sterilization protocols. All metal instruments undergo ultrasonic and autoclave sterilization between clients, and single-use buffers and files are used for every appointment.",
  },
  {
    id: "faq-nail-4",
    question: "What is a warm paraffin treatment?",
    answer:
      "Warm paraffin is a cosmetic wax bath infused with natural essential oils. It deeply penetrates dry, cracked skin on hands or feet, increasing blood flow and leaving your skin extraordinarily smooth and comfortable.",
  },
  {
    id: "faq-nail-5",
    question: "Can I combine nail care with a haircut or massage?",
    answer:
      "Yes, many clients book a manicure and pedicure simultaneously or pair them with a haircut, head massage, or facial for a streamlined, all-in-one grooming session.",
  },
] as ServiceFaq[],
  },

  bookingCta: {
    headline: "Book the Best Men’s Nail Care in Dubai",
    description: "Enjoy premium grooming at a nail salon in Dubai you can trust for quality and comfort. Reset Men Salon offers luxury manicure and pedicure for men in Dubai with a calm setting, skilled therapists, and attention to detail. Whether you need regular nail care or a full restorative pedicure, our Business Bay location delivers clean and reliable results every time.",
    backgroundImage: {
      src: "/images/services/service-nails.jpg",
      alt: "Gentlemen Nail Care Atmosphere Dubai",
    },
    trustBadges: [
      "Medical-Grade Sterilized Tools",
      "Efficient, Time-Saving Sessions",
      "",
    ] as [string, string, string],
    whatsappUrl: WHATSAPP_URL,
  } satisfies BookingCtaProps,
  parallax: [
  {
    id: "nails-1",
    src: "/images/services/service-nails.jpg",
    alt: "Reset Men Salon Executive Manicure & Pedicure Detail",
  },
  {
    id: "nails-2",
    src: "/site-pics/site-7.jpg",
    alt: "Reset Men Salon Grooming & Nail Care Bay Suite",
  },
] as { id: string; src: string; alt: string }[],

  metadata: {
  title: "Manicure and Pedicure for Men in Business Bay Dubai | Reset Men Salon",
  description:
    "Professional manicures, pedicures, cut & file, and warm paraffin nail treatments for men in Business Bay Dubai at Reset Men Salon.",
  keywords: [
    "Manicure for men Dubai",
    "Pedicure for men Dubai",
    "Men nail care Business Bay",
    "Male nail salon Dubai",
    "Reset Men Salon nails",
  ],
  openGraph: {
    title: "Manicure and Pedicure for Men in Business Bay Dubai | Reset Men Salon",
    description:
      "Hygienic, precise, and relaxing men's hand and foot grooming engineered for modern professionals.",
    url: "https://resetbarbershop.com/services/nails",
    images: [
      {
        url: "/images/services/service-nails.jpg",
        width: 1200,
        height: 630,
        alt: "Reset Men Salon Manicure and Pedicure Business Bay Dubai",
      },
    ],
  },
} as import("next").Metadata,

};
