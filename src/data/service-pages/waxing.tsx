/**
 * AUTO-GENERATED DATA for the waxing service page.
 *
 * Every string, image path, price and SVG icon here was extracted
 * byte-for-byte from the original per-service components in
 * src/components/services/waxing/ so the shared components render
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

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20Waxing%20services.%20Can%20I%20book%20an%20appointment%3F";

export const waxingPage = {
  slug: "waxing",
  whatsappUrl: WHATSAPP_URL,

  hero: {
    desktopImageSrc: "/images/services/service-waxing.jpg",
    desktopImageAlt: "Reset Men Salon — Waxing for Men in Business Bay Dubai",
    mobileImageSrc: "/phoneview.png",
    mobileImageAlt: "Reset Men Salon — Waxing for Men",
    titleWords: ["MEN'S", "WAXING"] as [string, string],
    subtitle: "Simple, clean, and skin-safe grooming in Business Bay. Welcome to Reset.",
  },

  list: {
    title: "Our Waxing Services for Men",
    subtitle: "Fast, skin-safe, and long-lasting hair removal engineered for modern gentlemen in Business Bay.",
    filters: undefined as { allLabel?: string; categories: ServiceFilterCategory[] } | undefined,
    items: ([
  {
    id: "srv-ear-waxing",
    title: "Ear Waxing",
    description:
      "Removes unwanted hair from the outer ear area for a cleaner look. The service is quick and comfortable, helping you stay neat without constant trimming. Simple care, long lasting results.",
    price: "20 AED",
    image: "/images/services/service-waxing.jpg"
  },
  {
    id: "srv-nose-waxing",
    title: "Nose Waxing",
    description:
      "A safe way to remove visible nose hair without daily trimming. It keeps your look clean, helps slow regrowth and makes grooming easier. Fast service, smooth results, no hassle.",
    price: "20 AED",
    image: "/site-pics/site-8.jpg"
  },
  {
    id: "srv-face-waxing",
    title: "Face Waxing",
    description:
      "Face waxing removes unwanted facial hair while keeping skin smooth and fresh. It reduces rough stubble, gives longer lasting results and helps your face look clean and even.",
    price: "60 AED",
    image: "/site-pics/site-9.jpg"
  },
] as Omit<ServiceItemCard, "whatsappUrl">[]).map(
      (it) => ({ ...it, whatsappUrl: WHATSAPP_URL }),
    ) as ServiceItemCard[],
  },

  whyChoose: {
    eyebrow: "Clean & Skin-Safe",
    title: "Why Choose Our Waxing for Men in Dubai",
    intro: "From precision ear and nose detailing to smooth facial grooming, discover why Business Bay gentlemen trust Reset Men Salon for comfortable, long-lasting results.",
    pillars: [
  {
    number: "01",
    title: "Hair Removed from the Root",
    shortDesc:
      "Waxing pulls hair from the root instead of cutting it at the surface. That means smoother skin for longer and less rough regrowth. Results last weeks, not days. Over time, hair feels softer and easier to manage, helping you keep a clean and polished look without constant trimming.",
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
    title: "Finer & Slower Regrowth",
    shortDesc:
      "With regular sessions, hair grows back softer and lighter, making it less noticeable between visits. This helps reduce how often you need grooming appointments. Your routine becomes easier and your skin stays smoother longer. Many clients enjoy the confidence that comes from a cleaner, well maintained appearance every day.",
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
    number: "03",
    title: "Professional Male Waxing Expertise",
    shortDesc:
      "Our team understands the needs of male grooming and works with care during every session. We focus on steady technique, comfort and clean application. Each step is handled with attention and patience so the process feels smooth, simple and reliable from start to finish for every client.",
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
    number: "04",
    title: "Hygienic & Skin-Safe Environment",
    shortDesc:
      "Clean tools, fresh supplies and safe products are used during every appointment. We follow careful hygiene practices to keep your skin protected and comfortable. The space feels calm and organized, giving you peace of mind while helping reduce irritation and keeping the entire waxing experience safe and stress free.",
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
    title: "Relaxing Grooming Experience",
    shortDesc:
      "Step into a calm and private setting made for comfort and ease. Friendly staff guide you through each service with care. The relaxed environment helps you feel at ease, turning grooming into something simple and enjoyable instead of rushed or uncomfortable, so you leave feeling confident and refreshed.",
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
    subtitle: "Everything you need to know about our skin-safe ear, nose, and face waxing services in Business Bay.",
    faqs: [
  {
    id: "faq-wax-1",
    question: "Does waxing hurt, and how do you minimize discomfort?",
    answer:
      "Our therapists use premium hot wax formulated specifically for sensitive male skin and facial contours. Because the hair is removed rapidly from the root with proper skin bracing, discomfort is minimal and brief.",
  },
  {
    id: "faq-wax-2",
    question: "How long do waxing results last compared to trimming?",
    answer:
      "Waxing results typically last between 3 to 5 weeks because hair is removed directly from the follicle root. When regrowth occurs, the hairs are noticeably softer and finer than the prickly stubble left by razors or trimmers.",
  },
  {
    id: "faq-wax-3",
    question: "Is nose and ear waxing safe?",
    answer:
      "Yes, completely safe. We only apply wax to the outer perimeter of the nostrils and outer ear canal, preserving your internal protective nasal and ear hairs while cleanly removing unsightly exterior strays.",
  },
  {
    id: "faq-wax-4",
    question: "Can I get waxing done during my haircut appointment?",
    answer:
      "Yes. Ear, nose, and eyebrow waxing only take a few minutes and are commonly added to haircuts and beard trims. Simply mention it when booking on WhatsApp or at check-in.",
  },
  {
    id: "faq-wax-5",
    question: "What aftercare should I follow after face waxing?",
    answer:
      "We apply a soothing, anti-bacterial post-wax lotion immediately after treatment. We recommend avoiding direct sauna heat, intense workouts, and heavy sun exposure for 12 to 24 hours to keep the skin calm and irritation-free.",
  },
] as ServiceFaq[],
  },

  bookingCta: {
    headline: "Book the Best Waxing for Men in Dubai",
    description: "Looking for reliable waxing for men near me? Reset Men Salon offers services that keep you clean, sharp and confident without extra effort. From ear and nose waxing to full face waxing, clients across Business Bay trust our team for steady results and a smooth experience every visit.",
    backgroundImage: {
      src: "/images/services/service-waxing.jpg",
      alt: "Gentlemen Waxing Atmosphere Dubai",
    },
    trustBadges: [
      "Skin-Safe Hypoallergenic Wax",
      "Quick & Comfortable Application",
      "",
    ] as [string, string, string],
    whatsappUrl: WHATSAPP_URL,
  } satisfies BookingCtaProps,
  parallax: [
  {
    id: "waxing-1",
    src: "/images/services/service-waxing.jpg",
    alt: "Reset Men Salon Male Waxing & Skin Detailing",
  },
  {
    id: "waxing-2",
    src: "/site-pics/site-4.jpg",
    alt: "Reset Men Salon Private Grooming Suite Business Bay",
  },
] as { id: string; src: string; alt: string }[],

  metadata: {
  title: "Waxing for Men in Business Bay Dubai | Reset Men Salon",
  description:
    "Professional waxing for men in Business Bay Dubai. Skin-safe ear waxing, nose waxing, and smooth facial grooming at Reset Men Salon.",
  keywords: [
    "Waxing for men Dubai",
    "Men waxing Business Bay",
    "Ear waxing men Dubai",
    "Nose waxing men Dubai",
    "Face waxing men Business Bay",
    "Reset Men Salon waxing",
  ],
  openGraph: {
    title: "Waxing for Men in Business Bay Dubai | Reset Men Salon",
    description:
      "Simple, clean, and skin-safe male waxing delivering weeks of smooth results and slower, finer regrowth.",
    url: "https://resetbarbershop.com/services/waxing",
    images: [
      {
        url: "/images/services/service-waxing.jpg",
        width: 1200,
        height: 630,
        alt: "Reset Men Salon Waxing for Men Business Bay Dubai",
      },
    ],
  },
} as import("next").Metadata,

};
