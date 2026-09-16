/**
 * AUTO-GENERATED DATA for the hair-treatment-and-colouring service page.
 *
 * Every string, image path, price and SVG icon here was extracted
 * byte-for-byte from the original per-service components in
 * src/components/services/hair-treatment-and-colouring/ so the shared components render
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

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20Hair%20Treatment%20%26%20Colouring%20services.%20Can%20I%20book%20an%20appointment%3F";

export const hairTreatmentAndColouringPage = {
  slug: "hair-treatment-and-colouring",
  whatsappUrl: WHATSAPP_URL,

  hero: {
    desktopImageSrc: "/images/salon/haircut-scissor-detailing.webp",
    desktopImageAlt: "Reset Men Salon — Hair Coloring and Treatment For Men in Dubai",
    mobileImageSrc: "/images/salon/haircut-skin-fade-profile.webp",
    mobileImageAlt: "Reset Men Salon — Hair Coloring and Treatment For Men",
    titleWords: ["HAIR &", "COLOUR"] as [string, string],
    subtitle: "Custom color blending, grey coverage, and deep hair restorative treatments in Business Bay. Welcome to Reset.",
  heroTitleClass: "flex flex-col sm:flex-row items-start sm:items-center gap-y-0.5 sm:gap-x-4 md:gap-x-6 lg:gap-x-8 font-editorial font-bold sm:font-black tracking-[-0.03em] text-white text-[clamp(3.8rem,14vw,10.5rem)] sm:text-[clamp(3.5rem,8.5vw,9.5rem)] leading-[0.86] uppercase text-left",
  },

  list: {
    title: "Our Services",
    subtitle: "Professional hair coloring, precision highlights, beard toning, and restorative hair treatments tailored for men in Dubai.",
    filters: {
    categories: [
    { id: "coloring", label: "Hair Coloring", count: 5 },
    { id: "treatment", label: "Hair Treatment", count: 4 },
    ],
  } as { allLabel?: string; categories: ServiceFilterCategory[] } | undefined,
    items: ([
  // --- Hair Coloring Services (5) ---
  {
    id: "srv-color-short",
    title: "Hair Coloring for Short Hair",
    category: "coloring",
    description:
      "Coloring designed to look natural while keeping your hair healthy and balanced. A great option for men who want a clean and refreshed look from a trusted hair coloring salon in Dubai.",
    price: "140 AED",
    image: "/images/salon/haircut-scissor-detailing.webp"
  },
  {
    id: "srv-color-long",
    title: "Hair Coloring for Long Hair",
    category: "coloring",
    description:
      "This service adds depth and tone while helping hair stay soft and strong. Ideal for men looking for professional hair coloring Dubai services with smooth, natural results.",
    price: "200 AED",
    image: "/images/salon/scissor-taper-styling.webp"
  },
  {
    id: "srv-highlight-short",
    title: "Highlight Short Hair",
    category: "coloring",
    description:
      "Short hair highlights add dimension without losing a sharp style. Our experienced stylists focus on precision for a clean and modern finish.",
    price: "300 AED",
    image: "/images/salon/haircut-fade-triptych.webp"
  },
  {
    id: "srv-highlight-long",
    title: "Highlight Long Hair",
    category: "coloring",
    description:
      "Long hair highlights create natural looking layers of color while keeping shine and smoothness. A strong choice for men who want advanced hair coloring Dubai techniques with subtle results.",
    price: "500 AED",
    image: "/images/salon/stylist-haircut-mirror.webp"
  },
  {
    id: "srv-beard-coloring",
    title: "Beard Coloring for Men",
    category: "coloring",
    description:
      "Beard coloring that blends naturally with your hair for an even look. It reduces the look of grey hairs and keeps your beard clean and well defined.",
    price: "60 AED",
    image: "/images/salon/beard-razor-contouring.webp"
  },

  // --- Hair Treatment Services (4) ---
  {
    id: "srv-hair-relaxing",
    title: "Hair Relaxing",
    category: "treatment",
    description:
      "Helps smooth hair texture and reduce frizz, making hair easier to style and manage every day.",
    price: "200 AED",
    image: "/images/salon/shampoo-wash-station.webp"
  },
  {
    id: "srv-caviar-treatment",
    title: "Caviar Hair Treatment",
    category: "treatment",
    description:
      "A treatment designed to bring back shine, hydration, and softness. Great for hair that feels dry or tired.",
    price: "250 AED",
    image: "/images/salon/scalp-rinse-treatment.webp"
  },
  {
    id: "srv-botox-normal",
    title: "Botox For Normal Hair",
    category: "treatment",
    description:
      "A deep care treatment that restores moisture and improves strength. Hair feels smoother, healthier, and easier to handle.",
    price: "300 AED",
    image: "/images/salon/haircut-curly-fade.webp"
  },
  {
    id: "srv-botox-long",
    title: "Botox for Long Hair",
    category: "treatment",
    description:
      "Repairs damaged strands while improving shine and softness. Long hair becomes more manageable and looks naturally healthy.",
    price: "450 AED",
    image: "/images/salon/stylist-client-satisfaction.webp"
  },
] as Omit<ServiceItemCard, "whatsappUrl">[]).map(
      (it) => ({ ...it, whatsappUrl: WHATSAPP_URL }),
    ) as ServiceItemCard[],
  },

  whyChoose: {
    eyebrow: "Precision & Craftsmanship",
    title: "Why Choose Our Hair Coloring and Treatment Services",
    intro: "From symmetrical beard lines and subtle grey blending to restorative hair botox, discover what makes Reset Men Salon Dubai’s definitive sanctuary for gentlemen.",
    pillars: [
  {
    number: "01",
    title: "Expert Stylists and Personalized Care",
    shortDesc:
      "Our stylists listen first. We look at your hair type, your routine, and your goals. Every service is shaped around you, giving results that feel natural, comfortable and easy to maintain.",
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
    number: "02",
    title: "Natural, Refined Results",
    shortDesc:
      "We keep the color soft and the finishes clean. Nothing feels heavy or overdone. The goal is simple. Hair that looks fresh, balanced and polished while still feeling natural and easy every day.",
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
    title: "Strength, Shine, and Texture Improvement",
    shortDesc:
      "Our treatments help repair damage, smooth rough texture and bring back shine. Hair feels softer, stronger and healthier after each visit, making daily styling easier and more manageable without extra effort.",
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
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Deep Hydration and Scalp Protection",
    shortDesc:
      "We use products that hydrate hair and calm the scalp. This helps reduce dryness and breakage while keeping your hair feeling comfortable, balanced and healthy with regular care over time.",
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
    number: "05",
    title: "Relaxing Premium Salon Experience",
    shortDesc:
      "Our space feels calm and welcoming from the moment you walk in. Friendly service, steady care and a relaxed setting help you unwind while enjoying grooming that feels easy and stress free.",
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
    subtitle: "Everything you need to know about our keratin treatments, grey blending, and hair restoration in Business Bay.",
    faqs: [
  {
    id: "faq-ht-1",
    question: "How long does the Keratin Anti-Frizz Treatment last?",
    answer:
      "Our luxury keratin treatment typically lasts between 10 to 12 weeks, depending on your hair wash frequency and home care. It provides complete protection against Dubai’s coastal humidity and high heat.",
  },
  {
    id: "faq-ht-2",
    question: "How is Discreet Grey Camouflage different from regular hair dye?",
    answer:
      "Grey camouflage is an ammonia-free, translucent formula engineered for men. Rather than completely coating hair with an artificial opaque color, it gently blends grey strands with your natural pigmentation, fading gradually without obvious root lines.",
  },
  {
    id: "faq-ht-3",
    question: "Will keratin treatments make my hair flat or pin-straight?",
    answer:
      "No. Our bespoke keratin formulas eliminate coarse frizz while preserving your hair's natural wave, volume, and movement, ensuring effortless daily styling.",
  },
  {
    id: "faq-ht-4",
    question: "Can I get a haircut on the same day as my treatment or colouring?",
    answer:
      "Yes. Most clients combine their haircut with a keratin treatment or grey blend in a single session. Simply request both when booking on WhatsApp.",
  },
  {
    id: "faq-ht-5",
    question: "What post-treatment shampoo should I use after keratin?",
    answer:
      "We recommend using sulfate-free and sodium chloride-free cleansers to maximize the longevity of your keratin infusion. Our stylists will recommend the ideal regimen during your consultation.",
  },
] as ServiceFaq[],
  },

  bookingCta: {
    headline: "Book Your Hair Coloring and Hair Treatment in Dubai",
    description: "If you’re searching for expert hair coloring and treatment, Reset Men Salon offers services that go beyond basic grooming. Every appointment is tailored to your hair type, routine, and goals. From color services to treatments like botox and caviar care, we help you maintain healthier, stronger hair. We use quality products and modern techniques that protect your hair while improving long term results. Our stylists focus on consistency, comfort, and detail. Expect a smooth experience in a clean and relaxed environment built for real results.",
    backgroundImage: {
      src: "/images/salon/salon-chairs-floor.webp",
      alt: "Hair Coloring and Treatment Dubai Atmosphere",
    },
    trustBadges: [
      "Trusted Quality Products",
      "Tailored Consultations",
      "",
    ] as [string, string, string],
    whatsappUrl: WHATSAPP_URL,
  } satisfies BookingCtaProps,
  parallax: [
  {
    id: "hair-treatment-1",
    src: "/images/salon/haircut-scissor-detailing.webp",
    alt: "Reset Men Salon Hair Colouring & Treatment Precision",
  },
  {
    id: "hair-treatment-2",
    src: "/images/salon/salon-rotunda-boutique.webp",
    alt: "Reset Men Salon Treatment & Styling Suite",
  },
] as { id: string; src: string; alt: string }[],

  metadata: {
  title: "Hair Treatment & Colouring Dubai | Keratin & Grey Blending Business Bay",
  description:
    "Luxury hair treatments and discreet grey blending at Reset Men Salon Business Bay. Advanced anti-frizz keratin, deep cuticle reconstruction, and natural hair color.",
  keywords: [
    "Hair treatment Dubai",
    "Keratin treatment men Dubai",
    "Grey hair blending men Dubai",
    "Men hair colour Business Bay",
    "Reset Men Salon hair treatment",
  ],
  openGraph: {
    title: "Hair Treatment & Colouring Dubai | Reset Men Salon",
    description:
      "Advanced hair reconstruction therapies, restorative keratin, and natural grey blending engineered for modern gentlemen.",
    url: "https://resetbarbershop.com/services/hair-treatment-and-colouring",
    images: [
      {
        url: "/images/salon/haircut-scissor-detailing.webp",
        width: 1200,
        height: 630,
        alt: "Reset Men Salon Hair Treatment & Colouring",
      },
    ],
  },
} as import("next").Metadata,

};
