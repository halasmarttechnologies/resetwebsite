export interface PriceListItem {
  id: string;
  name: string;
  priceAED: number;
  category: string;
  categorySlug: string;
  popular?: boolean;
  description?: string;
}

export interface PriceListCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  items: PriceListItem[];
}

export const priceListCategories: PriceListCategory[] = [
  {
    id: "cat-hair-beard",
    title: "Hair & Beard",
    slug: "hair-and-beard",
    description: "Precision master haircutting, bespoke beard styling, and traditional hot towel shaves.",
    items: [
      {
        id: "hb-1",
        name: "Reset Haircut",
        priceAED: 150,
        category: "Hair & Beard",
        categorySlug: "hair-and-beard",
        popular: true,
      },
      {
        id: "hb-2",
        name: "Reset Beard trim & style",
        priceAED: 80,
        category: "Hair & Beard",
        categorySlug: "hair-and-beard",
        popular: true,
      },
      {
        id: "hb-3",
        name: "Reset Hairstyle",
        priceAED: 80,
        category: "Hair & Beard",
        categorySlug: "hair-and-beard",
      },
      {
        id: "hb-4",
        name: "Reset Kids Haircut",
        priceAED: 110,
        category: "Hair & Beard",
        categorySlug: "hair-and-beard",
      },
      {
        id: "hb-5",
        name: "Classic Beard trim line",
        priceAED: 70,
        category: "Hair & Beard",
        categorySlug: "hair-and-beard",
      },
      {
        id: "hb-6",
        name: "Classic Beard shaving",
        priceAED: 55,
        category: "Hair & Beard",
        categorySlug: "hair-and-beard",
      },
    ],
  },
  {
    id: "cat-colouring",
    title: "Colouring",
    slug: "colouring",
    description: "Natural grey blending, tailored highlights, and bespoke tone correction.",
    items: [
      {
        id: "col-1",
        name: "Hair coloring short",
        priceAED: 155,
        category: "Colouring",
        categorySlug: "colouring",
        popular: true,
      },
      {
        id: "col-2",
        name: "Hair coloring long",
        priceAED: 220,
        category: "Colouring",
        categorySlug: "colouring",
      },
      {
        id: "col-3",
        name: "Highlight short",
        priceAED: 330,
        category: "Colouring",
        categorySlug: "colouring",
      },
      {
        id: "col-4",
        name: "Highlight long",
        priceAED: 550,
        category: "Colouring",
        categorySlug: "colouring",
      },
      {
        id: "col-5",
        name: "Beard coloring",
        priceAED: 70,
        category: "Colouring",
        categorySlug: "colouring",
        popular: true,
      },
    ],
  },
  {
    id: "cat-hair-treatment",
    title: "Hair Treatment",
    slug: "hair-treatment",
    description: "Deep fiber reconstruction, anti-frizz relaxing, and nourishing caviar therapy.",
    items: [
      {
        id: "ht-1",
        name: "Hair relaxing",
        priceAED: 220,
        category: "Hair Treatment",
        categorySlug: "hair-treatment",
      },
      {
        id: "ht-2",
        name: "Hair treatment caviar",
        priceAED: 275,
        category: "Hair Treatment",
        categorySlug: "hair-treatment",
        popular: true,
      },
      {
        id: "ht-3",
        name: "Hair Botox normal length",
        priceAED: 330,
        category: "Hair Treatment",
        categorySlug: "hair-treatment",
        popular: true,
      },
      {
        id: "ht-4",
        name: "Hair Botox long length",
        priceAED: 500,
        category: "Hair Treatment",
        categorySlug: "hair-treatment",
      },
      {
        id: "ht-5",
        name: "Nashi Armonia Treatment",
        priceAED: 250,
        category: "Hair Treatment",
        categorySlug: "hair-treatment",
      },
      {
        id: "ht-6",
        name: "Nashi Filler Treatment",
        priceAED: 200,
        category: "Hair Treatment",
        categorySlug: "hair-treatment",
      },
    ],
  },
  {
    id: "cat-nails",
    title: "Nails",
    slug: "nails",
    description: "Hygienic executive manicure, soothing spa pedicure, and warm paraffin therapy.",
    items: [
      {
        id: "nl-1",
        name: "Manicure",
        priceAED: 90,
        category: "Nails",
        categorySlug: "nails",
        popular: true,
      },
      {
        id: "nl-2",
        name: "Pedicure",
        priceAED: 135,
        category: "Nails",
        categorySlug: "nails",
        popular: true,
      },
      {
        id: "nl-3",
        name: "Majestic Manicure",
        priceAED: 135,
        category: "Nails",
        categorySlug: "nails",
      },
      {
        id: "nl-4",
        name: "Majestic Pedicure",
        priceAED: 165,
        category: "Nails",
        categorySlug: "nails",
      },
      {
        id: "nl-5",
        name: "Paraffin",
        priceAED: 110,
        category: "Nails",
        categorySlug: "nails",
      },
      {
        id: "nl-6",
        name: "Cut & File",
        priceAED: 110,
        category: "Nails",
        categorySlug: "nails",
      },
    ],
  },
  {
    id: "cat-facial",
    title: "Facial",
    slug: "facial",
    description: "Dermatological exfoliation, deep blackhead extraction, and brightening Vitamin C care.",
    items: [
      {
        id: "fc-1",
        name: "Nose Strip",
        priceAED: 55,
        category: "Facial",
        categorySlug: "facial",
      },
      {
        id: "fc-2",
        name: "Black Mask",
        priceAED: 90,
        category: "Facial",
        categorySlug: "facial",
        popular: true,
      },
      {
        id: "fc-3",
        name: "Face Scrub",
        priceAED: 110,
        category: "Facial",
        categorySlug: "facial",
      },
      {
        id: "fc-4",
        name: "Classic Facial",
        priceAED: 165,
        category: "Facial",
        categorySlug: "facial",
        popular: true,
      },
      {
        id: "fc-5",
        name: "Basic Facial",
        priceAED: 275,
        category: "Facial",
        categorySlug: "facial",
      },
      {
        id: "fc-6",
        name: "Vitamin C",
        priceAED: 450,
        category: "Facial",
        categorySlug: "facial",
      },
    ],
  },
  {
    id: "cat-japanese-head-spa",
    title: "Japanese Head Spa",
    slug: "japanese-head-spa",
    description: "Traditional scalp hydrotherapy, cascading waterfall mist, and deep mental relaxation.",
    items: [
      {
        id: "jhs-1",
        name: "30 Min Head Spa",
        priceAED: 249,
        category: "Japanese Head Spa",
        categorySlug: "japanese-head-spa",
      },
      {
        id: "jhs-2",
        name: "45 Min Head Spa",
        priceAED: 299,
        category: "Japanese Head Spa",
        categorySlug: "japanese-head-spa",
        popular: true,
      },
      {
        id: "jhs-3",
        name: "60 Min Head Spa",
        priceAED: 349,
        category: "Japanese Head Spa",
        categorySlug: "japanese-head-spa",
        popular: true,
      },
    ],
  },
  {
    id: "cat-massage",
    title: "Massage",
    slug: "massage",
    description: "Targeted tension relief, posture realignment, and focused neck, shoulder, and back recovery.",
    items: [
      {
        id: "msg-1",
        name: "Head Massage",
        priceAED: 135,
        category: "Massage",
        categorySlug: "massage",
        popular: true,
      },
      {
        id: "msg-2",
        name: "Head & Shoulders Massage",
        priceAED: 145,
        category: "Massage",
        categorySlug: "massage",
        popular: true,
      },
      {
        id: "msg-3",
        name: "Back Massage",
        priceAED: 190,
        category: "Massage",
        categorySlug: "massage",
        popular: true,
      },
    ],
  },
  {
    id: "cat-full-body-massage",
    title: "Reset Full Body Massage",
    slug: "full-body-massage",
    description: "Comprehensive therapeutic full body restoration, muscle recovery, and chronic stress release.",
    items: [
      {
        id: "fbm-1",
        name: "30 Min Body massage",
        priceAED: 249,
        category: "Reset Full Body Massage",
        categorySlug: "full-body-massage",
      },
      {
        id: "fbm-2",
        name: "45 Min Body massage",
        priceAED: 299,
        category: "Reset Full Body Massage",
        categorySlug: "full-body-massage",
        popular: true,
      },
      {
        id: "fbm-3",
        name: "60 Min Body massage",
        priceAED: 349,
        category: "Reset Full Body Massage",
        categorySlug: "full-body-massage",
        popular: true,
      },
    ],
  },
  {
    id: "cat-feet-reflexology",
    title: "Feet Reflexology",
    slug: "feet-reflexology",
    description: "Restorative pressure-point foot therapy to relieve tension, stimulate circulation, and restore balance.",
    items: [
      {
        id: "fr-1",
        name: "30 Min Reflexology",
        priceAED: 150,
        category: "Feet Reflexology",
        categorySlug: "feet-reflexology",
        popular: true,
      },
      {
        id: "fr-2",
        name: "60 Min Reflexology",
        priceAED: 250,
        category: "Feet Reflexology",
        categorySlug: "feet-reflexology",
      },
    ],
  },
  {
    id: "cat-waxing",
    title: "Waxing",
    slug: "waxing",
    description: "Skin-safe male facial waxing for quick, clean, and lasting grooming lines.",
    items: [
      {
        id: "wx-1",
        name: "Ear Wax",
        priceAED: 25,
        category: "Waxing",
        categorySlug: "waxing",
        popular: true,
      },
      {
        id: "wx-2",
        name: "Nose Wax",
        priceAED: 25,
        category: "Waxing",
        categorySlug: "waxing",
        popular: true,
      },
      {
        id: "wx-3",
        name: "Face Wax",
        priceAED: 70,
        category: "Waxing",
        categorySlug: "waxing",
      },
    ],
  },
  {
    id: "cat-vip-room",
    title: "VIP Room",
    slug: "vip-room",
    description: "Exclusive private suite experience for discreet, dedicated luxury grooming and ultimate relaxation.",
    items: [
      {
        id: "vip-1",
        name: "VIP Room",
        priceAED: 200,
        category: "VIP Room",
        categorySlug: "vip-room",
        popular: true,
      },
    ],
  },
];

export const allPriceListItems: PriceListItem[] = priceListCategories.flatMap((cat) => cat.items);

export const priceListMeta = {
  totalCategories: priceListCategories.length,
  totalServices: allPriceListItems.length,
  minPriceAED: 25,
  maxPriceAED: 550,
} as const;

export function getWhatsAppBookingUrlForService(serviceName: string, priceAED: number): string {
  const text = `Hello Reset Barber, I'm interested in booking ${serviceName} (${priceAED} AED). Can I schedule an appointment?`;
  return `https://api.whatsapp.com/send?phone=971581021540&text=${encodeURIComponent(text)}`;
}
