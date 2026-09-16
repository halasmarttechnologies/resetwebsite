import { BlogCategory, BlogPost } from "@/types/blog";

export const blogCategories: BlogCategory[] = [
  {
    id: "bcat-1",
    slug: "scalp-wellness",
    title: "Scalp Wellness",
    description: "Insights into trichology, follicle detoxification, and Japanese scalp therapy rituals.",
    count: 2,
  },
  {
    id: "bcat-2",
    slug: "grooming-guides",
    title: "Grooming Guides",
    description: "Master techniques for beard shaping, pomade selection, and hair maintenance.",
    count: 2,
  },
  {
    id: "bcat-3",
    slug: "barber-techniques",
    title: "Barber Techniques",
    description: "Scissor architecture, razor precision, and executive haircutting craft.",
    count: 2,
  },
  {
    id: "bcat-4",
    slug: "executive-lifestyle",
    title: "Executive Lifestyle",
    description: "Navigating style, skincare in desert climates, and executive self-care.",
    count: 1,
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
      url: "/images/salon/japanese-head-spa-halo.webp",
      alt: "Japanese Head Spa Scalp Hydrotherapy in Dubai",
    },
    category: blogCategories[0],
    authorName: "Maria Santos",
    authorRole: "Head Spa Master",
    publishedAt: "2026-07-27T10:00:00.000Z",
    readingTimeMinutes: 5,
    tags: ["Head Spa", "Scalp Health", "Dubai Grooming", "Wellness"],
    isFeatured: true,
  },
  {
    id: "post-2",
    slug: "maintaining-the-perfect-beard-in-dubai-climate",
    title: "Maintaining the Perfect Beard in High Humidity & Heat: Precision Grooming",
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
      url: "/images/salon/beard-scissor-sculpting.webp",
      alt: "Beard Grooming Guide Reset Men Salon",
    },
    category: blogCategories[1],
    authorName: "Tariq Al-Mansoor",
    authorRole: "Creative Director",
    publishedAt: "2026-07-15T09:00:00.000Z",
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
      url: "/images/salon/haircut-skin-fade-profile.webp",
      alt: "Precision Hair Architecture Guide Reset Men Salon",
    },
    category: blogCategories[2],
    authorName: "Marco Rossi",
    authorRole: "Senior Master Barber",
    publishedAt: "2026-07-02T10:00:00.000Z",
    readingTimeMinutes: 4,
    tags: ["Haircut", "Precision", "Barbering"],
    isFeatured: true,
  },
  {
    id: "post-4",
    slug: "the-executive-scalp-protocol-reversing-fatigue",
    title: "The Executive Scalp Protocol: Reversing Desert Sun Damage & Mental Fatigue",
    excerpt:
      "Clinical trichology meets sensory restoration. How targeted acupressure relieves cranial tension and restores follicle vitality.",
    content: `
# Reversing Scalp Fatigue

Extended screen exposure and UV radiation cause chronic micro-tension in the scalp muscles, restricting blood circulation to hair roots.

## The Acupressure Technique
Targeting the gallbladder and urinary bladder meridians across the cranium triggers immediate parasympathetic relaxation.
    `,
    coverImage: {
      url: "/images/salon/scalp-rinse-treatment.webp",
      alt: "Executive Scalp Therapy Protocol Reset Men Salon",
    },
    category: blogCategories[0],
    authorName: "Maria Santos",
    authorRole: "Head Spa Master",
    publishedAt: "2026-06-28T10:00:00.000Z",
    readingTimeMinutes: 6,
    tags: ["Scalp Care", "Wellness", "Relaxation"],
    isFeatured: true,
  },
  {
    id: "post-5",
    slug: "straight-razor-precision-vs-modern-blades",
    title: "Straight Razor Precision vs Modern Blades: The Art of the Hot Towel Shave",
    excerpt:
      "Why traditional Japanese steel and triple-steamed botanical towels remain the gold standard in clean executive shaving.",
    content: `
# The Art of the Hot Towel Shave

Nothing matches the smoothness of a freshly stropped razor guided at a precise 30-degree angle by a master barber.

## The Preparation Ritual
Pre-shave eucalyptus oils soften the coarsest stubble while warm steam opens pores for frictionless gliding.
    `,
    coverImage: {
      url: "/images/salon/barber-straight-razor-shave.webp",
      alt: "Traditional Straight Razor Shave at Reset Men Salon Dubai",
    },
    category: blogCategories[2],
    authorName: "Kenji Takahashi",
    authorRole: "Master Stylist",
    publishedAt: "2026-06-17T09:00:00.000Z",
    readingTimeMinutes: 5,
    tags: ["Shaving", "Barbering", "Grooming"],
    isFeatured: false,
  },
  {
    id: "post-6",
    slug: "essential-self-care-protocols-business-bay",
    title: "Essential Self-Care Protocols for the Modern Executive in Business Bay",
    excerpt:
      "Balancing high-pace corporate performance with calculated grooming recovery rituals in downtown Dubai.",
    content: `
# Self-Care in Business Bay

In the heart of Dubai's business district, carving out 60 minutes for tailored grooming is a vital strategy for clarity and confidence.
    `,
    coverImage: {
      url: "/images/salon/salon-lounge-interior.webp",
      alt: "Executive Grooming in Business Bay Dubai",
    },
    category: blogCategories[3],
    authorName: "Tariq Al-Mansoor",
    authorRole: "Creative Director",
    publishedAt: "2026-06-16T11:00:00.000Z",
    readingTimeMinutes: 4,
    tags: ["Lifestyle", "Dubai", "Executive"],
    isFeatured: false,
  },
];
