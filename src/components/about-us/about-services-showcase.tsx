"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface AboutServiceItem {
  id: string;
  slug: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  price?: string;
  volumeOrDuration?: string;
}

const aboutServices: AboutServiceItem[] = [
  {
    id: "hair-beard",
    slug: "hair-and-beard",
    index: "01",
    title: "Hair & Beard",
    kicker: "Precision Cut & Beard Architecture",
    description:
      "Expert haircuts and precise beard shaping tailored to your face and lifestyle, leaving you with a clean, sharp look and long-lasting confidence every visit.",
    image: "/images/salon/haircut-skin-fade-profile.webp",
    alt: "Reset Men Salon Haircut and Beard Architecture in Business Bay Dubai",
    href: "/services/hair-and-beard",
    price: "180.00 AED",
    volumeOrDuration: "45 mins · Precision Sculpting",
  },
  {
    id: "japanese-head-spa",
    slug: "japanese-head-spa",
    index: "02",
    title: "Japanese Head Spa",
    kicker: "Waterfall Hydrotherapy · Scalp Detox",
    description:
      "A luxurious scalp treatment combining massage and cleansing techniques that stimulate circulation, improve hair health, and provide deep relaxation for mind and body.",
    image: "/images/salon/japanese-head-spa-halo.webp",
    alt: "Reset Signature Japanese Head Spa Waterfall Scalp Therapy in Dubai",
    href: "/services/japanese-head-spa",
    price: "450.00 AED",
    volumeOrDuration: "60 mins · Hydrotherapy Ritual",
  },
  {
    id: "facial",
    slug: "facial",
    index: "03",
    title: "Facial Care",
    kicker: "Cleanse · Hydrate · Refresh",
    description:
      "Deep cleansing and revitalizing facials that hydrate, exfoliate, and improve skin texture, leaving your face refreshed, healthy, and ready for any occasion.",
    image: "/images/salon/japanese-head-spa-massage.webp",
    alt: "Reset Men Salon Deep Cleansing and Revitalizing Facial Care",
    href: "/services/facial",
    price: "320.00 AED",
    volumeOrDuration: "50 mins · Deep Skin Cleanse",
  },
  {
    id: "hair-treatment-colouring",
    slug: "hair-treatment-and-colouring",
    index: "04",
    title: "Hair Treatment & Colouring",
    kicker: "Restore · Nourish · Blend",
    description:
      "Repair damage, restore shine, or refresh your style with nourishing treatments and professional colouring that protect hair health while delivering vibrant, natural-looking results.",
    image: "/images/salon/haircut-scissor-detailing.webp",
    alt: "Reset Men Salon Professional Hair Treatment and Natural Colouring",
    href: "/services/hair-treatment-and-colouring",
    price: "140.00 AED",
    volumeOrDuration: "45 mins · Organic Conditioning",
  },
  {
    id: "massage",
    slug: "massage",
    index: "05",
    title: "Therapeutic Massage",
    kicker: "Release · Tension Relief · Reset",
    description:
      "Relax and unwind with therapeutic massages designed to ease tension, reduce stress, and restore full-body balance for a calmer, more focused day.",
    image: "/images/salon/scalp-rinse-treatment.webp",
    alt: "Reset Men Salon Therapeutic Massage and Stress Relief Therapy",
    href: "/services/massage",
    price: "120.00 AED",
    volumeOrDuration: "30 mins · Acupressure Focus",
  },
  {
    id: "waxing",
    slug: "waxing",
    index: "06",
    title: "Waxing & Grooming",
    kicker: "Clean · Private · Comfortable",
    description:
      "Quick, hygienic waxing services for smooth, clean results on face or body, helping you maintain a perfectly groomed appearance with lasting comfort.",
    image: "/images/salon/beard-razor-contouring.webp",
    alt: "Reset Men Salon Hygienic Body and Facial Waxing Grooming",
    href: "/services/waxing",
    price: "20.00 AED",
    volumeOrDuration: "15 mins · Clean & Defined",
  },
  {
    id: "nails",
    slug: "nails",
    index: "07",
    title: "Hand & Foot Care",
    kicker: "Manicure · Pedicure · Hygiene",
    description:
      "Professional manicures and pedicures that shape, buff, and nourish hands and feet, ensuring neat, healthy nails and a polished, confident look.",
    image: "/images/salon/pedicure-luxury-soak.webp",
    alt: "Reset Men Salon Executive Manicure and Pedicure Nail Care",
    href: "/services/nails",
    price: "80.00 AED",
    volumeOrDuration: "40 mins · Polish & Hygiene",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: LUXURY_EASE,
    },
  },
};

function ServiceCard({ service }: { service: AboutServiceItem }) {
  return (
    <motion.div variants={cardVariants} className="w-full h-full">
      <Link
        href={service.href}
        className="group relative flex flex-col h-full bg-white transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-noir-950 cursor-pointer"
      >
        {/* 1. Top Media Container */}
        <div className="relative w-full aspect-[4/4.4] overflow-hidden bg-[#f4f4f6] shrink-0 border border-black/[0.06]">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
          />
        </div>

        {/* 2. Text & Meta Information Area */}
        <div className="pt-3 pb-2.5 px-0.5 flex flex-col bg-white">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-jakarta font-medium text-sm sm:text-[15px] md:text-base text-noir-950 tracking-tight group-hover:text-neutral-700 transition-colors">
              {service.title}
            </h3>
            {service.price && (
              <span className="font-jakarta text-xs sm:text-sm font-normal text-noir-950 shrink-0">
                {service.price}
              </span>
            )}
          </div>

          {service.volumeOrDuration && (
            <div className="mt-0.5">
              <span className="font-jakarta text-xs text-neutral-500 font-normal">
                {service.volumeOrDuration}
              </span>
            </div>
          )}
        </div>

        {/* 3. Bottom Full-Width Solid Button */}
        <div className="mt-1 w-full">
          <div className="w-full py-2.5 sm:py-3 bg-noir-950 group-hover:bg-neutral-800 text-white text-xs sm:text-[13px] font-jakarta font-medium tracking-wide text-center transition-colors">
            Select Service
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function AboutServicesShowcase() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-24 bg-white overflow-hidden flex flex-col justify-center items-center border-b border-noir-950/[0.08]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center">
        {/* 1. Centered Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mb-8 sm:mb-10 md:mb-12 text-center max-w-2xl"
        >
          <span className="font-jakarta text-xs font-bold uppercase tracking-widest text-noir-400 mb-2 block">
            Craft &amp; Rituals
          </span>
          <h2 className="font-editorial font-bold text-3xl sm:text-4xl md:text-5xl text-noir-950 tracking-tight">
            Our Services
          </h2>
          <p className="mt-3 font-jakarta text-sm sm:text-base text-noir-600 leading-relaxed">
            Every ritual at Reset is curated with unhurried precision, clinical-grade formulations, and timeless craftsmanship.
          </p>
        </motion.div>

        {/* 2. Responsive Photographic Services Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 mb-10 sm:mb-12"
        >
          {aboutServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* 3. Bottom Center Action: View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASE }}
          className="flex justify-center"
        >
          <Link
            href="/services"
            className="group relative inline-flex flex-col items-center text-noir-950 font-jakarta text-base sm:text-lg md:text-xl font-semibold tracking-wide hover:text-noir-700 transition-colors duration-300"
          >
            <span>View All Services</span>
            <span className="w-full h-[1.5px] bg-noir-950 mt-1 origin-left transition-transform duration-300 group-hover:scale-x-110" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
