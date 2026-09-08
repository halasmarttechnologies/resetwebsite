import { BlogCategory, BlogPost } from "@/types/blog";

export const blogCategories: BlogCategory[] = [
  {
    id: "bcat-1",
    slug: "scalp-wellness",
    title: "Scalp Wellness & Head Spa",
    description: "Insights into trichology, follicle detoxification, and Japanese scalp therapy rituals.",
    count: 3,
  },
  {
    id: "bcat-2",
    slug: "grooming-guides",
    title: "Grooming & Haircare Guides",
    description: "Master techniques for beard shaping, pomade selection, and hair maintenance.",
    count: 4,
  },
  {
    id: "bcat-3",
    slug: "lifestyle-dubai",
    title: "Executive Lifestyle & Dubai Living",
    description: "Navigating style, skincare in desert climates, and executive self-care.",
    count: 2,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    slug: "the-science-of-japanese-head-spa",
    title: "The Science of Japanese Head Spa: Why Dubai Men Are Prioritizing Scalp Health",
    excerpt:
      "Beyond supreme relaxation: How 15-step scalp hydrotherapy purges sebum buildup, stimulates follicles, and reverses stress fatigue.",
    content: `
# The Science of Japanese Head Spa

In modern executive life, high stress levels, air conditioning, and Dubai's summer climate create a compounding burden on the scalp. 

## The Underestimated Scalp Microbiome
Your scalp is skin, but with four times the sebaceous glands of your face. When excess sebum oxidizes under dust and humidity, hair follicles suffocate.

### Why Microscopic Analysis Matters
At Reset Men Salon, our head spa begins with a 200x microscopic lens. You will visually inspect your hair follicles before and after the detoxification ritual.

### The 15-Step Protocol
1. Microscopic Scalp Analysis
2. Customized Herbal Oil Infusion
3. Deep Ultrasonic Scalp Scrubbing
4. Warm Botanical Steam Therapy
5. Acupressure Meridian Scalp Release
6. Hydrotherapy Halo Waterfall
7. Trichological Tonic Application
    `,
    coverImage: {
      url: "/site-pics/site-3.jpg",
      alt: "Japanese Head Spa Scalp Hydrotherapy in Dubai",
    },
    category: blogCategories[0],
    authorName: "Kenji Takahashi",
    authorRole: "Head Spa Master",
    publishedAt: "2026-08-20T10:00:00.000Z",
    readingTimeMinutes: 5,
    tags: ["Head Spa", "Scalp Health", "Dubai Grooming", "Wellness"],
    isFeatured: true,
  },
  {
    id: "post-2",
    slug: "maintaining-the-perfect-beard-in-dubai-climate",
    title: "Maintaining the Perfect Beard in High Humidity & Heat",
    excerpt:
      "Expert tips from our master barbers on preventing beard itch, frizz, and asymmetry during the UAE warmer months.",
    content: `
# Maintaining the Perfect Beard in Dubai

Dubai's unique transition between dry heat and humid coastal breezes presents challenges for facial hair. Here is how to keep your beard sculpted and healthy.

## 1. Wash Less, Hydrate More
Over-washing strips the natural oils produced by your skin. Use a sulfate-free beard wash no more than 2-3 times per week.

## 2. Straight Razor Precision
Regular edging maintains the distinction between jawline definition and neckline stray hairs.
    `,
    coverImage: {
      url: "/site-pics/site-6.jpg",
      alt: "Beard Grooming Guide Reset Men Salon",
    },
    category: blogCategories[1],
    authorName: "Tariq Al-Mansoor",
    authorRole: "Creative Director",
    publishedAt: "2026-08-10T09:00:00.000Z",
    readingTimeMinutes: 4,
    tags: ["Beard Care", "Styling", "Men Grooming"],
    isFeatured: true,
  },
  {
    id: "post-3",
    slug: "precision-hair-architecture-face-shape-guide",
    title: "Precision Hair Architecture: Matching Cuts to Facial Bone Structure",
    excerpt:
      "How scissor taper angles, temple fades, and vertex proportions sculpt an effortless executive silhouette.",
    content: `
# Precision Hair Architecture

Every skull and facial contour is distinct. At Reset, our master stylists tailor haircuts based on cranial proportions, hairline patterns, and jawline angles.

## The Architectural Consultation
Before the first scissor cut, our barbers assess your profile, growth direction, and styling habits to engineer a cut that grows out impeccably.
    `,
    coverImage: {
      url: "/site-pics/site-1.jpg",
      alt: "Precision Hair Architecture Guide Reset Men Salon",
    },
    category: blogCategories[1],
    authorName: "Marco Rossi",
    authorRole: "Senior Master Barber",
    publishedAt: "2026-08-28T10:00:00.000Z",
    readingTimeMinutes: 4,
    tags: ["Haircut", "Precision", "Barbering"],
    isFeatured: true,
  },
];
