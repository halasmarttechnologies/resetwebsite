export interface HomeServiceEntry {
  index: string;
  slug: string;
  title: string;
  kicker: string;
  description: string;
  href: string;
  image: string;
  alt: string;
}

export const homeServices: HomeServiceEntry[] = [
  {
    index: "01",
    slug: "hair-and-beard",
    title: "Hair & Beard",
    kicker: "Precision Cut & Beard Architecture",
    description:
      "Great grooming starts with the right cut. Our barbers focus on clean lines, strong shape and personal style. If you’re searching for a men's hair salon near me, you’ll find a place that blends skill, honest advice and premium finishing touches to keep your everyday look sharp.",
    href: "https://resetmensalon.ae/hair-beard/",
    image: "/images/services/service-hair-beard.webp",
    alt: "Precision haircut and beard architecture at Reset Men Salon, Business Bay Dubai",
  },
  {
    index: "02",
    slug: "facial",
    title: "Facial",
    kicker: "Cleanse · Hydrate · Refresh",
    description:
      "Our facial for men treatments are built for real results. We cleanse, hydrate and refresh tired skin. It’s a simple way to look healthier and more confident, even with Dubai’s busy lifestyle and climate.",
    href: "https://resetmensalon.ae/men-facial/",
    image: "/site-pics/site-2.jpg",
    alt: "Men's revitalizing facial treatment at Reset Men Salon Dubai",
  },
  {
    index: "03",
    slug: "hair-treatment-and-colouring",
    title: "Hair Treatment & Colouring",
    kicker: "Restore · Nourish · Blend",
    description:
      "Upgrade your look with professional hair coloring designed to look natural. Whether you want a small change or something new, our team focuses on smooth blends, healthy hair and results that last.",
    href: "https://resetmensalon.ae/hair-treatment-and-colouring/",
    image: "/images/services/service-colouring.jpg",
    alt: "Professional hair treatment and natural color blending for men in Dubai",
  },
  {
    index: "04",
    slug: "massage",
    title: "Massage",
    kicker: "Release · Tension Relief · Reset",
    description:
      "Take a break from daily stress with a massage for men Dubai professionals rely on. Each session helps release tension, improve circulation and reset your body so you feel relaxed and focused again.",
    href: "https://resetmensalon.ae/massage/",
    image: "/site-pics/site-7.jpg",
    alt: "Therapeutic tension release massage for men at Reset Men Salon Dubai",
  },
  {
    index: "05",
    slug: "waxing",
    title: "Waxing",
    kicker: "Clean · Private · Comfortable",
    description:
      "Our waxing for men services are clean, private and comfortable. Treatments are done with care to reduce irritation and help you feel fresh, confident and well groomed every day.",
    href: "https://resetmensalon.ae/waxing/",
    image: "/images/services/service-waxing.jpg",
    alt: "Private and comfortable men's waxing service at Reset Men Salon Dubai",
  },
  {
    index: "06",
    slug: "nails",
    title: "Nails",
    kicker: "Manicure · Pedicure · Hygiene",
    description:
      "Clean hands and feet make a strong first impression. Our manicure and pedicure for men services focus on detail, comfort and hygiene so your look stays polished and professional.",
    href: "https://resetmensalon.ae/nails/",
    image: "/images/services/service-nails.jpg",
    alt: "Men's executive manicure and pedicure hand and foot care at Reset Men Salon Dubai",
  },
];
