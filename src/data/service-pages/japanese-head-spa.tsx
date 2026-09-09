/**
 * AUTO-GENERATED DATA for the japanese-head-spa service page.
 *
 * Every string, image path, price and SVG icon here was extracted
 * byte-for-byte from the original per-service components in
 * src/components/services/japanese-head-spa/ so the shared components render
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

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20Japanese%20Head%20Spa%20services.%20Can%20I%20book%20an%20appointment%3F";

export const japaneseHeadSpaPage = {
  slug: "japanese-head-spa",
  whatsappUrl: WHATSAPP_URL,

  hero: {
    desktopImageSrc: "/images/services/service-head-spa.webp",
    desktopImageAlt: "Reset Men Salon — Japanese Head Spa in Dubai",
    mobileImageSrc: "/phoneview.png",
    mobileImageAlt: "Reset Men Salon — Japanese Head Spa",
    titleWords: ["HEAD", "SPA"] as [string, string],
    subtitle: "Traditional Japanese scalp hydrotherapy and mental reset in Business Bay. Welcome to Reset.",
  },

  list: {
    title: "Head Spa Rituals",
    subtitle: "Multi-sensory scalp detoxification, waterfall hydrotherapy, and acupressure meridian release in Business Bay.",
    filters: undefined as { allLabel?: string; categories: ServiceFilterCategory[] } | undefined,
    items: ([
  {
    id: "srv-sig-head-spa",
    title: "Signature Japanese Head Spa Ritual",
    duration: "75 Minutes",
    description:
      "Dubai's premier scalp wellness ritual featuring microscopic 200x diagnosis, herbal steam therapy, acupressure meridian massage, and circular waterfall hydrotherapy.",
    price: "450 AED",
    image: "/images/services/service-head-spa.webp"
  },
  {
    id: "srv-express-head-spa",
    title: "Express Scalp Detox & Revive",
    duration: "35 Minutes",
    description:
      "Focused scalp exfoliation, steam therapy, and stimulating waterfall hydrotherapy designed for busy Business Bay executives needing instant headache and fatigue relief.",
    price: "250 AED",
    image: "/site-pics/site-5.jpg"
  },
  {
    id: "srv-sanctuary-head-spa",
    title: "The Japanese Sanctuary Ritual",
    duration: "120 Minutes",
    description:
      "The ultimate multisensory relaxation experience combining our 15-step Japanese head spa with high-performance hair conditioning and luxury hand care.",
    price: "590 AED",
    image: "/site-pics/site-3.jpg"
  },
] as Omit<ServiceItemCard, "whatsappUrl">[]).map(
      (it) => ({ ...it, whatsappUrl: WHATSAPP_URL }),
    ) as ServiceItemCard[],
  },

  whyChoose: {
    eyebrow: "Hydrotherapy & Wellness",
    title: "Why Our Japanese Head Spa for Men Stands Apart",
    intro: "From deep sebum detoxification to tension relief, experience traditional Japanese scalp hydrotherapy engineered for male relaxation in Business Bay.",
    pillars: [
  {
    number: "01",
    title: "Deep Relaxation for Mind & Body",
    shortDesc:
      "Slow massage and warm treatments help release tension in your head, neck and shoulders. Your mind begins to quiet. Stress fades away. This Japanese head spa session helps you feel calm, rested and mentally clear long after you leave.",
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
    title: "Healthier, Cleaner Scalp",
    shortDesc:
      "We gently cleanse your scalp to remove oil, sweat and buildup from daily life. This creates a clean base for better hair growth. A healthy scalp supports stronger roots and better looking hair over time.",
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
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Boosted Blood Circulation",
    shortDesc:
      "Careful massage movements increase blood flow to your scalp. Better circulation helps bring nutrients to the hair roots. This supports stronger strands, natural shine and healthier growth while improving overall scalp comfort and balance.",
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
        <path d="M12 3a9 9 0 0 1 0 18v-18z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Relief from Headaches and Fatigue",
    shortDesc:
      "Steady pressure and slow massage strokes help ease headaches and mental stress. Your body starts to relax. Tension lifts from your scalp and temples. You feel more focused, balanced and energized after each session.",
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
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Luxury Hair Conditioning",
    shortDesc:
      "We use quality Japanese masks and plant based formulas to hydrate both scalp and hair. These treatments improve softness and shine. Hair feels smoother, easier to manage and healthier after every visit.",
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
    subtitle: "Everything you need to know about our Japanese Head Spa hydrotherapy ritual in Business Bay.",
    faqs: [
  {
    id: "faq-jhs-1",
    question: "What makes a Japanese Head Spa different from a regular scalp wash?",
    answer:
      "A Japanese Head Spa is a multi-step therapeutic ritual that begins with microscopic scalp diagnosis, followed by deep pore cleansing, herbal steam, acupressure meridian stimulation, and soothing circular hydrotherapy waterfall. It purifies the scalp at a cellular level.",
  },
  {
    id: "faq-jhs-2",
    question: "How often should men experience a Japanese Head Spa?",
    answer:
      "For optimal scalp hygiene, stress relief, and follicular stimulation, we recommend a session every 3 to 4 weeks. Clients with excess sebum or dandruff may benefit from bi-weekly sessions initially.",
  },
  {
    id: "faq-jhs-3",
    question: "Does the Head Spa help with hair loss and thinning?",
    answer:
      "Yes. By removing hardened sebum plugs from hair follicles, boosting microcirculation with acupressure, and infusing Japanese botanical peptides, it creates the ideal environment for healthier, stronger hair growth.",
  },
  {
    id: "faq-jhs-4",
    question: "Can I combine the Japanese Head Spa with a haircut?",
    answer:
      "Yes, our Japanese Sanctuary package pairs the full 15-step head spa experience with our signature haircut and beard styling for a total restorative session.",
  },
  {
    id: "faq-jhs-5",
    question: "Do I need to prepare my hair before the appointment?",
    answer:
      "No preparation is needed. We ask only that you arrive relaxed. Our high-definition diagnostic camera will analyze your scalp's baseline condition before we begin the treatment.",
  },
] as ServiceFaq[],
  },

  bookingCta: {
    headline: "Book the Best Japanese Head Spa in Dubai",
    description: "If you want the best Japanese head spa in Dubai, Reset Men Salon offers a calm and private setting made for men. Our head spa for men works well for regular care or when you need a break from daily pressure. Take time for yourself. Relax your mind. Refresh your scalp. Feel better from the inside out.",
    backgroundImage: {
      src: "/images/services/service-head-spa.webp",
      alt: "Japanese Head Spa Hydrotherapy Atmosphere Dubai",
    },
    trustBadges: [
      "Microscopic Scalp Diagnostic",
      "Private Hydro Waterfall Suite",
      "",
    ] as [string, string, string],
    whatsappUrl: WHATSAPP_URL,
  } satisfies BookingCtaProps,
  parallax: [
  {
    id: "head-spa-1",
    src: "/images/services/service-head-spa.webp",
    alt: "Reset Men Salon Japanese Head Spa Hydrotherapy Ritual",
  },
  {
    id: "head-spa-2",
    src: "/site-pics/site-9.jpg",
    alt: "Reset Men Salon Zen Scalp Wellness Retreat Business Bay",
  },
] as { id: string; src: string; alt: string }[],

  metadata: {
  title: "Japanese Head Spa in Dubai | Reset Men Salon Business Bay",
  description:
    "Experience the premier Japanese head spa in Dubai at Reset Men Salon Business Bay. 15-step scalp detox, cascading hydro waterfall, and acupressure relaxation.",
  keywords: [
    "Japanese head spa Dubai",
    "Head spa for men Dubai",
    "Scalp detox Business Bay",
    "Japanese head spa near me",
    "Reset Men Salon head spa",
  ],
  openGraph: {
    title: "Japanese Head Spa in Dubai | Reset Men Salon Business Bay",
    description:
      "Traditional Japanese scalp care and hydrotherapy engineered to relieve stress, purify follicles, and restore mental clarity.",
    url: "https://resetbarbershop.com/services/japanese-head-spa",
    images: [
      {
        url: "/images/services/service-head-spa.webp",
        width: 1200,
        height: 630,
        alt: "Reset Men Salon Japanese Head Spa Dubai",
      },
    ],
  },
} as import("next").Metadata,

};
