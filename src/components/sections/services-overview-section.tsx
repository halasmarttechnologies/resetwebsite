"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const services = [
  {
    title: "HAIR & BEARD",
    count: "12 services",
    image: "/images/services/service-hair-beard.webp",
    href: "/services/hair-and-beard",
    alt: "Reset Men Salon — Luxury Haircut & Beard Architecture in Dubai",
  },
  {
    title: "BODY & HEAD SPA",
    count: "8 rituals",
    image: "/images/services/service-head-spa.webp",
    href: "/services/japanese-head-spa",
    alt: "Reset Men Salon — Japanese Head Spa & Relaxation Sanctuary Dubai",
  },
  {
    title: "FACIAL & SKINCARE",
    count: "14 services",
    image: "/images/services/service-facial.webp",
    href: "/services/facial",
    alt: "Reset Men Salon — Revitalizing Facial & Skin Treatments Dubai",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export function ServicesOverviewSection() {
  return (
    <section className="relative w-full h-screen min-h-[750px] bg-white overflow-hidden flex flex-col justify-center items-center select-none border-b border-noir-950/[0.08]">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center">
        {/* 1. Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10 md:mb-12 text-center"
        >
          <h2 className="font-editorial font-black text-4xl sm:text-5xl md:text-6xl text-noir-950 tracking-[-0.035em] uppercase">
            OUR SERVICES
          </h2>
        </motion.div>

        {/* 2. 3-Column Services Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mb-8 sm:mb-10 md:mb-12"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants} className="w-full">
              <Link
                href={service.href}
                className="group relative block w-full aspect-square overflow-hidden bg-noir-900 rounded-none cursor-pointer"
              >
                {/* Background Photography with Smooth Zoom on Hover */}
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />

                {/* Subtle Bottom Gradient for Maximum Text Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                {/* Card Content Anchored to Bottom */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7 flex items-end justify-between z-10">
                  {/* Left: Service Title & Service Count */}
                  <div className="flex flex-col text-left">
                    <h3 className="font-editorial font-black text-lg sm:text-xl md:text-2xl text-white tracking-[-0.02em] leading-tight uppercase group-hover:text-brand-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="font-jakarta text-xs sm:text-sm text-white/80 font-normal mt-1 tracking-wide">
                      {service.count}
                    </p>
                  </div>

                  {/* Right: Minimalist Geometric Glyph Icon */}
                  <div className="flex items-center justify-center text-white/90 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* 3. Bottom Center Action: View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <Link
            href="/services"
            className="group relative inline-flex flex-col items-center text-noir-950 font-jakarta text-base sm:text-lg md:text-xl font-semibold tracking-wide hover:text-noir-700 transition-colors duration-300"
          >
            <span>View All</span>
            {/* Animated Underline */}
            <span className="w-full h-[1.5px] bg-noir-950 mt-1 origin-left transition-transform duration-300 group-hover:scale-x-110" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
