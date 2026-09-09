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
        priceAED: 130,
        category: "Hair & Beard",
        categorySlug: "hair-and-beard",
        popular: true,
      },
      {
        id: "hb-2",
        name: "Reset Beard trim & style",
        priceAED: 70,
        category: "Hair & Beard",
        categorySlug: "hair-and-beard",
        popular: true,
      },
      {
        id: "hb-3",
        name: "Reset Hairstyle",
        priceAED: 70,
        category: "Hair & Beard",
        categorySlug: "hair-and-beard",
      },
      {
        id: "hb-4",
        name: "Reset Kids Haircut",
        priceAED: 100,
        category: "Hair & Beard",
        categorySlug: "hair-and-beard",
      },
      {
        id: "hb-5",
        name: "Classic Beard trim line",
        priceAED: 60,
        category: "Hair & Beard",
        categorySlug: "hair-and-beard",
      },
      {
        id: "hb-6",
        name: "Classic Beard shaving",
        priceAED: 50,
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
        priceAED: 140,
        category: "Colouring",
        categorySlug: "colouring",
        popular: true,
      },
      {
        id: "col-2",
        name: "Hair coloring long",
        priceAED: 200,
        category: "Colouring",
        categorySlug: "colouring",
      },
      {
        id: "col-3",
        name: "Highlight short",
        priceAED: 300,
        category: "Colouring",
        categorySlug: "colouring",
      },
      {
        id: "col-4",
        name: "Highlight long",
        priceAED: 500,
        category: "Colouring",
        categorySlug: "colouring",
      },
      {
        id: "col-5",
        name: "Beard coloring",
        priceAED: 60,
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
        priceAED: 200,
        category: "Hair Treatment",
        categorySlug: "hair-treatment",
      },
      {
        id: "ht-2",
        name: "Hair treatment caviar",
        priceAED: 250,
        category: "Hair Treatment",
        categorySlug: "hair-treatment",
        popular: true,
      },
      {
        id: "ht-3",
        name: "Hair Botox normal length",
        priceAED: 300,
        category: "Hair Treatment",
        categorySlug: "hair-treatment",
        popular: true,
      },
      {
        id: "ht-4",
        name: "Hair Botox long length",
        priceAED: 450,
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
        priceAED: 80,
        category: "Nails",
        categorySlug: "nails",
        popular: true,
      },
      {
        id: "nl-2",
        name: "Pedicure",
        priceAED: 120,
        category: "Nails",
        categorySlug: "nails",
        popular: true,
      },
      {
        id: "nl-3",
        name: "Majestic Manicure",
        priceAED: 120,
        category: "Nails",
        categorySlug: "nails",
      },
      {
        id: "nl-4",
        name: "Majestic Pedicure",
        priceAED: 150,
        category: "Nails",
        categorySlug: "nails",
      },
      {
        id: "nl-5",
        name: "Paraffin",
        priceAED: 99,
        category: "Nails",
        categorySlug: "nails",
      },
      {
        id: "nl-6",
        name: "Cut & File",
        priceAED: 99,
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
        priceAED: 50,
        category: "Facial",
        categorySlug: "facial",
      },
      {
        id: "fc-2",
        name: "Black Mask",
        priceAED: 80,
        category: "Facial",
        categorySlug: "facial",
        popular: true,
      },
      {
        id: "fc-3",
        name: "Face Scrub",
        priceAED: 100,
        category: "Facial",
        categorySlug: "facial",
      },
      {
        id: "fc-4",
        name: "Classic Facial",
        priceAED: 150,
        category: "Facial",
        categorySlug: "facial",
        popular: true,
      },
      {
        id: "fc-5",
        name: "Basic Facial",
        priceAED: 250,
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
        priceAED: 250,
        category: "Japanese Head Spa",
        categorySlug: "japanese-head-spa",
      },
      {
        id: "jhs-2",
        name: "45 Min Head Spa",
        priceAED: 350,
        category: "Japanese Head Spa",
        categorySlug: "japanese-head-spa",
        popular: true,
      },
      {
        id: "jhs-3",
        name: "60 Min Head Spa",
        priceAED: 450,
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
    description: "Targeted tension relief, posture realignment, and soothing reflexology.",
    items: [
      {
        id: "msg-1",
        name: "Head Massage",
        priceAED: 120,
        category: "Massage",
        categorySlug: "massage",
        popular: true,
      },
      {
        id: "msg-2",
        name: "Head & Shoulders Massage",
        priceAED: 130,
        category: "Massage",
        categorySlug: "massage",
        popular: true,
      },
      {
        id: "msg-3",
        name: "Feet Massage",
        priceAED: 150,
        category: "Massage",
        categorySlug: "massage",
      },
      {
        id: "msg-4",
        name: "Back Massage",
        priceAED: 170,
        category: "Massage",
        categorySlug: "massage",
        popular: true,
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
        priceAED: 20,
        category: "Waxing",
        categorySlug: "waxing",
        popular: true,
      },
      {
        id: "wx-2",
        name: "Nose Wax",
        priceAED: 20,
        category: "Waxing",
        categorySlug: "waxing",
        popular: true,
      },
      {
        id: "wx-3",
        name: "Face Wax",
        priceAED: 60,
        category: "Waxing",
        categorySlug: "waxing",
      },
    ],
  },
];

export function getWhatsAppBookingUrlForService(serviceName: string, priceAED: number): string {
  const text = `Hello Reset Barber, I'm interested in booking ${serviceName} (${priceAED} AED). Can I schedule an appointment?`;
  return `https://api.whatsapp.com/send?phone=971581021540&text=${encodeURIComponent(text)}`;
}
