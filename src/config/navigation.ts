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
        },
        {
          title: "Hair Treatment & Colouring",
          href: "/services/hair-treatment-and-colouring",
        },
        {
          title: "Facial",
          href: "/services/facial",
        },
        {
          title: "Massage",
          href: "/services/massage",
        },
        {
          title: "Waxing",
          href: "/services/waxing",
        },
        {
          title: "Nails",
          href: "/services/nails",
        },
        {
          title: "Japanese Head Spa",
          href: "/services/japanese-head-spa",
        },
      ],
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Shop",
      href: "/shop",
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
