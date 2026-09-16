/**
 * AUTO-GENERATED DATA for the massage service page.
 *
 * Every string, image path, price and SVG icon here was extracted
 * byte-for-byte from the original per-service components in
 * src/components/services/massage/ so the shared components render
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

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20Massage%20services.%20Can%20I%20book%20an%20appointment%3F";

export const massagePage = {
  slug: "massage",
  whatsappUrl: WHATSAPP_URL,

  hero: {
    desktopImageSrc: "/images/salon/scalp-rinse-treatment.webp",
    desktopImageAlt: "Reset Men Salon — Best Massage for Men in Business Bay Dubai",
    mobileImageSrc: "/images/salon/japanese-head-spa-massage.webp",
    mobileImageAlt: "Reset Men Salon — Best Massage for Men",
    titleWords: ["MASSAGE", "THERAPY"] as [string, string],
    subtitle: "Targeted muscle tension relief, physical recovery, and deep mental relaxation in Business Bay. Welcome to Reset.",
  heroTitleClass: "flex flex-col sm:flex-row items-start sm:items-center gap-y-0.5 sm:gap-x-3 md:gap-x-4 lg:gap-x-6 font-editorial font-bold sm:font-black tracking-[-0.03em] text-white text-[clamp(3.2rem,13vw,7.5rem)] sm:text-[clamp(2.6rem,6.2vw,6.4rem)] lg:text-[clamp(3rem,6.8vw,7.2rem)] leading-[0.88] uppercase text-left",
  },

  list: {
    title: "Our Massage Services",
    subtitle: "Targeted therapies engineered to release deep muscle tension, alleviate posture fatigue, and restore mental clarity in Business Bay.",
    filters: undefined as { allLabel?: string; categories: ServiceFilterCategory[] } | undefined,
    items: ([
  {
    id: "srv-head-massage",
    title: "Head Massage",
    description:
      "You need a calming head massage that helps reduce mental stress and tension. It improves circulation of blood, supports focus, relaxes tense facial muscles and gives you a quiet moment to slow down and reset during busy days.",
    price: "120 AED",
    image: "/images/salon/japanese-head-spa-massage.webp"
  },
  {
    id: "srv-head-shoulders",
    title: "Head & Shoulders Massage",
    description:
      "This massage focuses on stressed areas around the neck and shoulders. It helps reduce stiffness caused by long hours at work, daily stress or poor posture. This treatment helps leave your upper body relaxed and comfortable.",
    price: "130 AED",
    image: "/images/salon/scalp-rinse-treatment.webp"
  },
  {
    id: "srv-feet-massage",
    title: "Feet Massage",
    description:
      "A refreshing foot massage from an expert that targets pressure points and improves blood circulation. It helps reduce full body fatigue, ease stiffness and bring back balance after long days of walking, standing or intense routines.",
    price: "150 AED",
    image: "/images/salon/pedicure-luxury-soak.webp"
  },
  {
    id: "srv-back-massage",
    title: "Back Massage",
    description:
      "Focused back therapy by our experts is designed to release deep muscle tension and stiffness. This massage helps improve movement, reduce discomfort, and support better posture. It will leave your back feeling lighter and more flexible.",
    price: "170 AED",
    image: "/images/salon/manicure-massage-care.webp"
  },
] as Omit<ServiceItemCard, "whatsappUrl">[]).map(
      (it) => ({ ...it, whatsappUrl: WHATSAPP_URL }),
    ) as ServiceItemCard[],
  },

  whyChoose: {
    eyebrow: "Precision & Wellness",
    title: "Why Our Massage for Men in Dubai Stands Apart",
    intro: "From desk tension relief to targeted foot acupressure, experience therapeutic bodywork designed specifically for male physiology and executive lifestyles.",
    pillars: [
  {
    number: "01",
    title: "Central Business Bay Location",
    shortDesc:
      "Our salon is easy to reach for busy professionals working in Business Bay. Stop by for quick but effective relaxation without changing your routine or stepping too far away from work.",
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
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Targeted Pain & Tension Relief",
    shortDesc:
      "Our massage sessions focus on real problem areas. We work on tight muscles, stiffness and office related aches from long hours of sitting. You leave feeling relaxed, refreshed and free from daily tension.",
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
    number: "03",
    title: "Stress Reduction & Mental Reset",
    shortDesc:
      "Slow and steady massage movements help calm the mind and body. Each session gives you space to reset, release mental pressure and feel more clear headed while enjoying deep relaxation throughout the experience.",
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
    number: "04",
    title: "Improved Flexibility & Movement",
    shortDesc:
      "By working on muscles, tendons and joints, our massages help improve movement and flexibility. Regular sessions can reduce strain, support better posture and keep your body feeling strong for everyday activities.",
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
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Experienced Massage Therapists",
    shortDesc:
      "Our trained therapists bring real experience to every session. They adjust pressure based on your comfort level and focus on safe techniques that help you relax while getting the most benefit from your treatment.",
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
] as WhyChoosePillar[],
  },

  faq: {
    eyebrow: "Got Questions?",
    subtitle: "Everything you need to know about our therapeutic massages, head treatments, and body recovery in Business Bay.",
    faqs: [
  {
    id: "faq-msg-1",
    question: "How often should men get a massage in Dubai?",
    answer:
      "For active professionals and gym-goers in Dubai, a massage every 1 to 2 weeks helps relieve chronic upper body tension, correct desk posture stiffness, and accelerate muscle recovery.",
  },
  {
    id: "faq-msg-2",
    question: "What should I wear during the massage?",
    answer:
      "Comfortable loose attire is recommended. For targeted head, shoulder, or foot treatments, you remain comfortably clothed in our ergonomic treatment chairs.",
  },
  {
    id: "faq-msg-3",
    question: "Can I combine a massage with a haircut or facial?",
    answer:
      "Absolutely. Many clients pair a head or back massage with our signature haircut or facial treatment for a complete restorative grooming session.",
  },
  {
    id: "faq-msg-4",
    question: "Can the therapist adjust the pressure level?",
    answer:
      "Yes, our therapists customize the pressure to your exact preference, whether you prefer gentle relaxation or firm, targeted acupressure relief.",
  },
  {
    id: "faq-msg-5",
    question: "Do I need an appointment or can I walk in?",
    answer:
      "While walk-ins are welcomed subject to availability, we strongly recommend scheduling in advance via WhatsApp to secure your preferred therapist and time slot.",
  },
] as ServiceFaq[],
  },

  bookingCta: {
    headline: "Book the Best Massage for Men in Dubai",
    description: "Whether you need a head massage, back massage or a full stress relief session, Reset Men’s Salon offers a men massage in Dubai experience built around your needs. Each treatment is designed to ease tension, restore balance and help your body recover naturally. Our calm and private space makes it easy to relax while our therapists focus on your comfort. You walk out feeling refreshed, recharged and ready to move through your day with more energy and clarity.",
    backgroundImage: {
      src: "/images/salon/salon-lounge-interior.webp",
      alt: "Massage Therapy Atmosphere Dubai",
    },
    trustBadges: [
      "Certified Bodywork Therapists",
      "Private Treatment Rooms",
      "",
    ] as [string, string, string],
    whatsappUrl: WHATSAPP_URL,
  } satisfies BookingCtaProps,
  parallax: [
  {
    id: "massage-1",
    src: "/images/salon/japanese-head-spa-halo.webp",
    alt: "Reset Men Salon Massage Therapy & Body Recovery",
  },
  {
    id: "massage-2",
    src: "/images/salon/salon-armchair-neon.webp",
    alt: "Reset Men Salon Relaxation & Wellness Sanctuary",
  },
] as { id: string; src: string; alt: string }[],

  metadata: {
  title: "Best Massage for Men in Business Bay Dubai | Reset Men Salon",
  description:
    "Experience the best massage for men in Business Bay Dubai. Head massage, head & shoulders massage, feet reflexology, and targeted back muscle recovery.",
  keywords: [
    "Massage for men Dubai",
    "Best massage for men in Business Bay",
    "Head massage Dubai",
    "Back massage men Dubai",
    "Reset Men Salon massage",
    "Foot massage Business Bay",
  ],
  openGraph: {
    title: "Best Massage for Men in Business Bay Dubai | Reset Men Salon",
    description:
      "Targeted bodywork and deep tissue therapies engineered to release muscle tension, correct posture stiffness, and restore mental clarity.",
    url: "https://resetbarbershop.com/services/massage",
    images: [
      {
        url: "/images/salon/scalp-rinse-treatment.webp",
        width: 1200,
        height: 630,
        alt: "Reset Men Salon Massage Business Bay Dubai",
      },
    ],
  },
} as import("next").Metadata,

};
