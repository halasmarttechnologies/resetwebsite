export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

export const navigationConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Services",
      href: "/services",
      children: [
        {
          title: "Hair & Beard",
          href: "/services/hair-and-beard",
          description: "Precision haircuts, tailored fades, beard sculpting & hot towel shaves.",
        },
        {
          title: "Japanese Head Spa",
          href: "/services/japanese-head-spa",
          description: "Signature 15-step scalp detox, hydrotherapy waterfall & acupressure.",
          badge: "Signature",
        },
        {
          title: "Facial Treatments",
          href: "/services/facial",
          description: "High-performance male dermatological skincare & detox.",
        },
        {
          title: "Hair Treatment & Colouring",
          href: "/services/hair-treatment-and-colouring",
          description: "Keratin smoothing, deep conditioning & natural grey blending.",
        },
        {
          title: "Massage",
          href: "/services/massage",
          description: "Deep tissue tension relief & posture restoration.",
        },
        {
          title: "Waxing & Detailing",
          href: "/services/waxing",
          description: "Brow architecture, waxing and threading services.",
        },
        {
          title: "Nails & Hand Care",
          href: "/services/nails",
          description: "Executive manicure, spa pedicure & paraffin care.",
        },
      ],
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Journal",
      href: "/blog",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ] as NavItem[],
  footerNav: {
    services: [
      { title: "Hair & Beard Grooming", href: "/services/hair-and-beard" },
      { title: "Japanese Head Spa Ritual", href: "/services/japanese-head-spa" },
      { title: "Facial Care & Detox", href: "/services/facial" },
      { title: "Hair Treatment & Colouring", href: "/services/hair-treatment-and-colouring" },
      { title: "Therapeutic Massage", href: "/services/massage" },
      { title: "Executive Nails", href: "/services/nails" },
      { title: "Waxing & Threading", href: "/services/waxing" },
    ],
    company: [
      { title: "The Salon Story", href: "/about" },
      { title: "Grooming Menu & Pricing", href: "/pricing" },
      { title: "The Editorial Journal", href: "/blog" },
      { title: "Concierge & Location", href: "/contact" },
    ],
    legal: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
} as const;
