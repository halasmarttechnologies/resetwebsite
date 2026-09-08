"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface AboutServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
}

const aboutServices: AboutServiceItem[] = [
  {
    id: "hair-beard",
    slug: "hair-and-beard",
    title: "Hair & Beard",
    description:
      "Expert haircuts and precise beard shaping tailored to your face and lifestyle, leaving you with a clean, sharp look and long-lasting confidence every visit.",
    image: "/images/services/service-hair-beard.webp",
    alt: "Reset Men Salon Haircut and Beard Architecture in Business Bay Dubai",
    href: "/services/hair-and-beard",
  },
  {
    id: "hair-treatment-colouring",
    slug: "hair-treatment-colouring",
    title: "Hair Treatment & Colouring",
    description:
      "Repair damage, restore shine, or refresh your style with nourishing treatments and professional colouring that protect hair health while delivering vibrant, natural-looking results.",
    image: "/images/services/service-colouring.jpg",
    alt: "Reset Men Salon Professional Hair Treatment and Natural Colouring",
    href: "/services",
  },
  {
    id: "facial",
    slug: "facial",
    title: "Facial",
    description:
      "Deep cleansing and revitalizing facials that hydrate, exfoliate, and improve skin texture, leaving your face refreshed, healthy, and ready for any occasion.",
    image: "/images/services/service-facial.webp",
    alt: "Reset Men Salon Deep Cleansing and Revitalizing Facial Care",
    href: "/services/facial",
  },
  {
    id: "massage",
    slug: "massage",
    title: "Massage",
    description:
      "Relax and unwind with therapeutic massages designed to ease tension, reduce stress, and restore full-body balance for a calmer, more focused day.",
    image: "/site-pics/site-8.jpg",
    alt: "Reset Men Salon Therapeutic Massage and Stress Relief Therapy",
    href: "/services",
  },
  {
    id: "waxing",
    slug: "waxing",
    title: "Waxing",
    description:
      "Quick, hygienic waxing services for smooth, clean results on face or body, helping you maintain a perfectly groomed appearance with lasting comfort.",
    image: "/images/services/service-waxing.jpg",
    alt: "Reset Men Salon Hygienic Body and Facial Waxing Grooming",
    href: "/services",
  },
  {
    id: "nails",
    slug: "nails",
    title: "Nails",
    description:
      "Professional manicures and pedicures that shape, buff, and nourish hands and feet, ensuring neat, healthy nails and a polished, confident look.",
    image: "/images/services/service-nails.jpg",
    alt: "Reset Men Salon Executive Manicure and Pedicure Nail Care",
    href: "/services",
  },
  {
    id: "japanese-head-spa",
    slug: "japanese-head-spa",
    title: "Japanese Head Spa",
    description:
      "A luxurious scalp treatment combining massage and cleansing techniques that stimulate circulation, improve hair health, and provide deep relaxation for mind and body.",
    image: "/site-pics/site-3.jpg",
    alt: "Reset Signature Japanese Head Spa Waterfall Scalp Therapy in Dubai",
    href: "/services/japanese-head-spa",
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: LUXURY_EASE,
    },
  },
};

function ServiceCard({ service }: { service: AboutServiceItem }) {
  return (
    <motion.div variants={cardVariants} className="w-full">
      <Link
        href={service.href}
        className="group relative block w-full aspect-[16/10] sm:aspect-[16/11] overflow-hidden bg-noir-900 rounded-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-noir-950"
      >
        {/* Background Photography with Smooth Zoom on Hover */}
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />

        {/* Subtle Bottom Gradient for Maximum Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

        {/* Card Content Anchored to Bottom */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-7 flex items-end justify-between z-10">
          {/* Left: Service Title & Service Description */}
          <div className="flex flex-col text-left pr-3">
            <h3 className="font-editorial font-semibold text-base sm:text-xl md:text-2xl text-white tracking-[-0.02em] leading-tight uppercase transition-colors duration-300">
              {service.title}
            </h3>
            <p className="font-jakarta text-2xs sm:text-xs text-white/80 font-normal mt-0.5 sm:mt-1 tracking-wide line-clamp-2">
              {service.description}
            </p>
          </div>

          {/* Right: Minimalist Geometric Glyph Icon (Rotates 45° on Hover) */}
          <div className="shrink-0 flex items-center justify-center text-white/90 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-6 sm:h-6"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
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
          className="mb-8 sm:mb-10 md:mb-12 text-center"
        >
          <span className="font-editorial text-xs font-semibold uppercase tracking-[0.2em] text-noir-500">
            Craft & Rituals
          </span>
          <h2 className="mt-3 font-editorial font-bold text-3xl sm:text-4xl md:text-5xl text-noir-950 tracking-tight uppercase">
            Our Services
          </h2>
        </motion.div>

        {/* 2. Responsive Photographic Services Card Grid (Matching Landing Page) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10"
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
            <span>View All</span>
            <span className="w-full h-[1.5px] bg-noir-950 mt-1 origin-left transition-transform duration-300 group-hover:scale-x-110" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
