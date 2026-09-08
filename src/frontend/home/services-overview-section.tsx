"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { homeServices, type HomeServiceEntry } from "@/data/home-services";

const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

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

function ServiceCard({ service }: { service: HomeServiceEntry }) {
  const isExternal = service.href.startsWith("http");

  const cardInner = (
    <div className="group relative block w-full aspect-[16/10] sm:aspect-[16/11] overflow-hidden bg-noir-900 rounded-none cursor-pointer">
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
        {/* Left: Service Title & Service Kicker */}
        <div className="flex flex-col text-left pr-3">
          <h3 className="font-editorial font-semibold text-base sm:text-xl md:text-2xl text-white tracking-[-0.02em] leading-tight uppercase transition-colors duration-300">
            {service.title}
          </h3>
          <p className="font-jakarta text-2xs sm:text-xs text-white/80 font-normal mt-0.5 sm:mt-1 tracking-wide">
            {service.kicker}
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
    </div>
  );

  return (
    <motion.div variants={cardVariants} className="w-full">
      {isExternal ? (
        <a
          href={service.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-noir-950"
        >
          {cardInner}
        </a>
      ) : (
        <Link
          href={service.href}
          className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-noir-950"
        >
          {cardInner}
        </Link>
      )}
    </motion.div>
  );
}

export function ServicesOverviewSection() {
  return (
    <section className="relative w-full py-10 sm:py-14 md:py-18 bg-white overflow-hidden flex flex-col justify-center items-center border-b border-noir-950/[0.08]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center">
        {/* 1. Centered Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mb-6 sm:mb-8 md:mb-10 text-center"
        >
          <h2 className="font-editorial font-bold text-3xl sm:text-4xl md:text-5xl text-noir-950 tracking-tight">
            Our Services
          </h2>
        </motion.div>

        {/* 2. Responsive Photographic Services Card Grid (6 Services) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10"
        >
          {homeServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </motion.div>

        {/* 3. Bottom Center Action: View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASE }}
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
