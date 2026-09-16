export interface HomeServiceEntry {
  index: string;
  slug: string;
  title: string;
  kicker: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  price: string;
  volumeOrDuration: string;
}

export const homeServices: HomeServiceEntry[] = [
  {
    index: "01",
    slug: "hair-and-beard",
    title: "Hair & Beard",
    kicker: "Precision Cut & Beard Architecture",
    description:
      "Great grooming starts with the right cut. Our barbers focus on clean lines, strong shape and personal style. If you’re searching for a men's hair salon near me, you’ll find a place that blends skill, honest advice and premium finishing touches to keep your everyday look sharp.",
    href: "/services/hair-and-beard",
    image: "/images/salon/haircut-skin-fade-profile.webp",
    alt: "Precision haircut and beard architecture at Reset Men Salon, Business Bay Dubai",
    price: "180.00 AED",
    volumeOrDuration: "45 mins · Precision Sculpting",
  },
  {
    index: "02",
    slug: "japanese-head-spa",
    title: "Japanese Head Spa",
    kicker: "Waterfall Hydrotherapy · Scalp Detox",
    description:
      "Dubai's premier scalp wellness ritual featuring microscopic 200x diagnosis, herbal steam mist, cascading waterfall hydrotherapy, and acupressure tension release in a private sanctuary.",
    href: "/services/japanese-head-spa",
    image: "/images/salon/japanese-head-spa-halo.webp",
    alt: "Signature Japanese Head Spa waterfall hydrotherapy at Reset Men Salon Dubai",
    price: "450.00 AED",
    volumeOrDuration: "60 mins · Hydrotherapy Ritual",
  },
  {
    index: "03",
    slug: "facial",
    title: "Revitalizing Facial",
    kicker: "Cleanse · Hydrate · Refresh",
    description:
      "Our facial for men treatments are built for real results. We cleanse, hydrate and refresh tired skin. It’s a simple way to look healthier and more confident, even with Dubai’s busy lifestyle and climate.",
    href: "/services/facial",
    image: "/images/salon/japanese-head-spa-massage.webp",
    alt: "Men's revitalizing facial treatment at Reset Men Salon Dubai",
    price: "320.00 AED",
    volumeOrDuration: "50 mins · Deep Skin Cleanse",
  },
  {
    index: "04",
    slug: "hair-treatment-and-colouring",
    title: "Hair Treatment & Colouring",
    kicker: "Restore · Nourish · Blend",
    description:
      "Upgrade your look with professional hair coloring designed to look natural. Whether you want a small change or something new, our team focuses on smooth blends, healthy hair and results that last.",
    href: "/services/hair-treatment-and-colouring",
    image: "/images/salon/haircut-scissor-detailing.webp",
    alt: "Professional hair treatment and natural color blending for men in Dubai",
    price: "140.00 AED",
    volumeOrDuration: "45 mins · Organic Conditioning",
  },
  {
    index: "05",
    slug: "massage",
    title: "Tension Release Massage",
    kicker: "Release · Tension Relief · Reset",
    description:
      "Take a break from daily stress with a massage for men Dubai professionals rely on. Each session helps release tension, improve circulation and reset your body so you feel relaxed and focused again.",
    href: "/services/massage",
    image: "/images/salon/scalp-rinse-treatment.webp",
    alt: "Therapeutic tension release massage for men at Reset Men Salon Dubai",
    price: "120.00 AED",
    volumeOrDuration: "30 mins · Acupressure Focus",
  },
  {
    index: "06",
    slug: "waxing",
    title: "Executive Waxing Care",
    kicker: "Clean · Private · Comfortable",
    description:
      "Our waxing for men services are clean, private and comfortable. Treatments are done with care to reduce irritation and help you feel fresh, confident and well groomed every day.",
    href: "/services/waxing",
    image: "/images/salon/beard-razor-contouring.webp",
    alt: "Private and comfortable men's waxing service at Reset Men Salon Dubai",
    price: "20.00 AED",
    volumeOrDuration: "15 mins · Clean & Defined",
  },
  {
    index: "07",
    slug: "nails",
    title: "Executive Nails & Care",
    kicker: "Manicure · Pedicure · Hygiene",
    description:
      "Clean hands and feet make a strong first impression. Our manicure and pedicure for men services focus on detail, comfort and hygiene so your look stays polished and professional.",
    href: "/services/nails",
    image: "/images/salon/pedicure-luxury-soak.webp",
    alt: "Men's executive manicure and pedicure hand and foot care at Reset Men Salon Dubai",
    price: "80.00 AED",
    volumeOrDuration: "40 mins · Polish & Hygiene",
  },
];
