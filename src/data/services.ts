import { ServiceCategory, ServiceItem } from "@/types/service";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "cat-1",
    slug: "hair-and-beard",
    title: "Hair & Beard",
    subtitle: "Precision Scissor Work & Bespoke Beard Architecture",
    description:
      "Crafted by senior barbers utilizing bespoke cutting techniques, traditional hot-towel steam rituals, and organic grooming elixirs.",
    order: 1,
    heroImage: {
      url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200",
      alt: "Precision Hair & Beard Grooming at Reset Men Salon Dubai",
    },
  },
  {
    id: "cat-2",
    slug: "japanese-head-spa",
    title: "Japanese Head Spa",
    subtitle: "Signature 15-Step Scalp Detoxification & Hydrotherapy",
    description:
      "Dubai's definitive head spa ritual combining microscopic scalp diagnosis, herbal steam mist, cascading waterfall hydrotherapy, and acupressure tension release.",
    order: 2,
    heroImage: {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200",
      alt: "Signature Japanese Head Spa Hydrotherapy Waterfall",
    },
  },
  {
    id: "cat-3",
    slug: "facial",
    title: "Facial Treatments",
    subtitle: "Dermatological Skincare Formulated for Male Skin",
    description:
      "Targeted therapies to combat city pollution, deep blackheads, and premature aging with active botanical and gold extracts.",
    order: 3,
    heroImage: {
      url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200",
      alt: "Gentlemen's Luxury Facial Treatment",
    },
  },
  {
    id: "cat-4",
    slug: "hair-treatment-and-colouring",
    title: "Hair Treatment & Colouring",
    subtitle: "Restorative Keratin & Natural Grey Camouflage",
    description:
      "Advanced hair reconstruction therapies, protein infusions, and discreet grey blending tailored for a subtle, youthful appearance.",
    order: 4,
    heroImage: {
      url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=1200",
      alt: "Hair Conditioning and Colouring for Men",
    },
  },
  {
    id: "cat-5",
    slug: "massage",
    title: "Therapeutic Massage",
    subtitle: "Deep Muscle Recovery & Postural Tension Relief",
    description:
      "Specialized bodywork targeting executive stress points across neck, shoulders, and upper back in serene private rooms.",
    order: 5,
    heroImage: {
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200",
      alt: "Deep Tissue Massage Therapy for Gentlemen",
    },
  },
  {
    id: "cat-6",
    slug: "waxing",
    title: "Waxing & Detailing",
    subtitle: "Precision Facial Threading & Full Body Hair Removal",
    description:
      "Hygienic, gentle hair removal and brow sculpting utilizing hypoallergenic waxes and organic soothing aftercare.",
    order: 6,
    heroImage: {
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200",
      alt: "Gentlemen's Brow Detailing and Waxing",
    },
  },
  {
    id: "cat-7",
    slug: "nails",
    title: "Executive Hand & Foot Care",
    subtitle: "Sterile Medical-Grade Manicure & Spa Pedicure",
    description:
      "Impeccable nail shaping, cuticle nourishment, and warm paraffin therapy designed specifically for modern gentlemen.",
    order: 7,
    heroImage: {
      url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=1200",
      alt: "Executive Manicure and Pedicure for Men",
    },
  },
];

export const serviceItems: ServiceItem[] = [
  // Hair & Beard
  {
    id: "srv-hb-1",
    slug: "signature-haircut",
    categorySlug: "hair-and-beard",
    title: "Reset Signature Haircut",
    subtitle: "Consultation, Tailored Cut, Wash & Styling",
    shortDescription: "A bespoke haircut tailored to your head shape, facial contours, and lifestyle.",
    fullDescription:
      "Experience our benchmark haircut. Includes an in-depth consultation, invigorating scalp cleanse, precision scissor and clipper work, hot towel finish, and bespoke styling with matte finish pomades.",
    durationMinutes: 45,
    priceAED: 180,
    isSignature: true,
    isPopular: true,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
      alt: "Reset Signature Haircut",
    },
    benefits: [
      "Custom facial architecture consultation",
      "Invigorating botanical scalp wash",
      "Precision razor neck detailing",
      "Warm essential oil towel finish",
    ],
    faqs: [
      {
        question: "How long does the Signature Haircut take?",
        answer: "The appointment lasts approximately 45 minutes, allowing time for full consultation, cut, wash, and style.",
      },
    ],
  },
  {
    id: "srv-hb-2",
    slug: "beard-sculpting",
    categorySlug: "hair-and-beard",
    title: "Master Beard Sculpting & Razor Line",
    subtitle: "Shape, Fade, Hot Towel & Razor Edging",
    shortDescription: "Symmetrical beard sculpting with hot towel steam ritual and razor edging.",
    fullDescription:
      "Transform and redefine your beard. Our master barbers sculpt the beard length to harmonize with your jawline, apply organic beard oil steams, and finish with a straight razor outline.",
    durationMinutes: 30,
    priceAED: 120,
    isPopular: true,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800",
      alt: "Master Beard Sculpting at Reset Men Salon",
    },
    benefits: [
      "Symmetrical jawline enhancement",
      "Hot towel essential oil steam",
      "Straight razor sharp perimeter lines",
      "Deep beard hydration elixir",
    ],
  },
  {
    id: "srv-hb-3",
    slug: "royal-hot-towel-shave",
    categorySlug: "hair-and-beard",
    title: "The Royal Hot Towel Shave",
    subtitle: "Multi-Towel Traditional Straight Razor Shave",
    shortDescription: "An indulgent traditional straight razor shaving ritual with rich lather and hot towels.",
    fullDescription:
      "A classic barbershop ritual elevated to high art. Featuring pre-shave aromatic oils, steaming hot towels, rich badger-brush lather, and a flawless traditional straight razor shave.",
    durationMinutes: 40,
    priceAED: 150,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800",
      alt: "Royal Hot Towel Shave",
    },
    benefits: ["Baby-smooth finish with zero razor burn", "Deep facial pore opening with herbal steam", "Cold towel post-shave pore sealing"],
  },

  // Japanese Head Spa
  {
    id: "srv-jhs-1",
    slug: "signature-japanese-head-spa-ritual",
    categorySlug: "japanese-head-spa",
    title: "Signature Japanese Head Spa Ritual",
    subtitle: "15-Step Scalp Detoxification & Hydrotherapy",
    shortDescription:
      "Dubai's premier scalp wellness ritual featuring microscopic analysis, herb steam, and hydro waterfall.",
    fullDescription:
      "Our world-renowned head spa experience begins with a high-definition scalp diagnostic camera to analyze sebum and hair density. You then sink into our ergonomic massage bed for deep exfoliation, herbal steam therapy, acupressure scalp massage, cascading water halo hydrotherapy, and custom tonic infusions.",
    durationMinutes: 75,
    priceAED: 450,
    isSignature: true,
    isPopular: true,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
      alt: "Japanese Head Spa Ritual",
    },
    benefits: [
      "Microscopic 200x scalp diagnostic before & after",
      "Deep sebum and pollutant detoxification",
      "Acupressure meridian scalp and neck massage",
      "Cascading circular hydro waterfall therapy",
      "Stimulates natural hair growth and root strength",
    ],
  },
  {
    id: "srv-jhs-2",
    slug: "express-scalp-revive",
    categorySlug: "japanese-head-spa",
    title: "Express Scalp Revive",
    subtitle: "30-Minute Scalp Detox & Hydro Waterfall",
    shortDescription: "A focused head spa session ideal for executive lunch breaks and quick rejuvenation.",
    fullDescription:
      "Designed for the busy Business Bay executive. Includes quick scalp exfoliation, steam treatment, stimulating waterfall wash, and blow dry.",
    durationMinutes: 35,
    priceAED: 250,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&q=80&w=800",
      alt: "Express Scalp Revive Head Spa",
    },
    benefits: ["Instant headache and screen fatigue relief", "Purified hair follicles", "Fast turnaround"],
  },

  // Facial
  {
    id: "srv-fc-1",
    slug: "deep-cleansing-detox-facial",
    categorySlug: "facial",
    title: "Executive Deep Cleansing Facial",
    subtitle: "Steam, Ultrasonic Extraction & Purifying Mask",
    shortDescription: "Dermatological extraction and hydration targeting Dubai dust, heat, and oil buildup.",
    fullDescription:
      "Restores clear, invigorated skin. Incorporates ultrasonic skin scrubbing, blackhead removal, antibacterial high-frequency therapy, and a calming marine algae cooling mask.",
    durationMinutes: 60,
    priceAED: 320,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800",
      alt: "Executive Deep Cleansing Facial",
    },
    benefits: ["Pore unclogging & blackhead extraction", "Balanced oil production", "Healthy, energized matte complexion"],
  },

  // Hair Treatment & Colouring
  {
    id: "srv-ht-1",
    slug: "keratin-hair-smoothing",
    categorySlug: "hair-and-beard",
    title: "Keratin Anti-Frizz Treatment",
    subtitle: "Manageable, Smooth Hair in Dubai Humidity",
    shortDescription: "Tames coarse and frizzy hair for up to 3 months with formaldehyde-free keratin.",
    fullDescription:
      "Specially formulated for Middle Eastern climate humidity. Infuses keratin proteins deep into the hair cuticle, eliminating frizz while maintaining natural volume and texture.",
    durationMinutes: 90,
    priceAED: 550,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800",
      alt: "Keratin Hair Smoothing",
    },
    benefits: ["100% frizz control in high humidity", "Lasts 10-12 weeks", "Formaldehyde-free luxury formula"],
  },

  // Massage
  {
    id: "srv-msg-1",
    slug: "deep-tissue-executive-massage",
    categorySlug: "massage",
    title: "Executive Deep Tissue Massage",
    subtitle: "Targeted Upper Body & Shoulder Release",
    shortDescription: "Relieves muscle knots and tension caused by long desk hours and gym training.",
    fullDescription:
      "A therapeutic deep-pressure massage using organic eucalyptus and arnica oils. Targets tight traps, lower back, and shoulder joints.",
    durationMinutes: 60,
    priceAED: 280,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800",
      alt: "Executive Deep Tissue Massage",
    },
    benefits: ["Breaks down stubborn muscle adhesions", "Improves posture and spinal mobility", "Releases deep cortisol and stress"],
  },

  // Nails
  {
    id: "srv-nl-1",
    slug: "executive-hand-grooming",
    categorySlug: "nails",
    title: "Executive Hand Grooming (Manicure)",
    subtitle: "Clip, Buff, Cuticle Care & Hand Massage",
    shortDescription: "Clean, well-groomed hands with matte buffing and deep cuticle hydration.",
    fullDescription:
      "Hand care designed specifically for men. Includes hand soak, cuticle detailing, nail trimming, natural matte buff, and a relaxing forearm massage.",
    durationMinutes: 35,
    priceAED: 110,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&q=80&w=800",
      alt: "Executive Hand Grooming Manicure",
    },
    benefits: ["Neat, professional executive hands", "Hydrated cuticles and smooth palms", "Relieves hand fatigue from typing"],
  },

  // Waxing
  {
    id: "srv-wx-1",
    slug: "precision-brow-and-facial-detailing",
    categorySlug: "waxing",
    title: "Precision Brow & Cheek Detailing",
    subtitle: "Waxing & Threading for Clean Facial Lines",
    shortDescription: "Subtle brow clean-up and cheek hairline definition.",
    fullDescription:
      "Subtle, masculine brow framing that removes unibrow and strays without creating an artificial or overly arched look.",
    durationMinutes: 20,
    priceAED: 70,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
      alt: "Precision Brow Detailing",
    },
    benefits: ["Clean, masculine facial contours", "Long-lasting sharpness (3-4 weeks)", "Rapid, gentle process"],
  },
];
