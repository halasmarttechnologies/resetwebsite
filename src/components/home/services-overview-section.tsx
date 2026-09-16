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

function ServiceCard({ service }: { service: HomeServiceEntry }) {
  return (
    <motion.div variants={cardVariants} className="w-full h-full">
      <Link
        href={service.href}
        className="group relative flex flex-col h-full bg-white transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-noir-950 cursor-pointer"
      >
        {/* 1. Top Media Container (Matches reference image aspect ratio & flush presentation) */}
        <div className="relative w-full aspect-[4/4.4] overflow-hidden bg-[#f4f4f6] shrink-0 border border-black/[0.06]">
          <Image
            src={service.image}
            alt={service.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
          />
        </div>

        {/* 2. Text & Meta Information Area (Title left, Price right, Subtitle below) */}
        <div className="pt-3 pb-2.5 px-0.5 flex flex-col bg-white">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-jakarta font-medium text-sm sm:text-[15px] md:text-base text-noir-950 tracking-tight group-hover:text-neutral-700 transition-colors">
              {service.title}
            </h3>
            <span className="font-jakarta text-xs sm:text-sm font-normal text-noir-950 shrink-0">
              {service.price}
            </span>
          </div>

          <div className="mt-0.5">
            <span className="font-jakarta text-xs text-neutral-500 font-normal">
              {service.volumeOrDuration}
            </span>
          </div>
        </div>

        {/* 3. Bottom Full-Width Solid Button (Matches reference image button styling) */}
        <div className="mt-1 w-full">
          <div className="w-full py-2.5 sm:py-3 bg-noir-950 group-hover:bg-neutral-800 text-white text-xs sm:text-[13px] font-jakarta font-medium tracking-wide text-center transition-colors">
            Select Service
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesOverviewSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 bg-white overflow-hidden flex flex-col justify-center items-center border-b border-noir-950/[0.08]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center">
        {/* 1. Centered Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="mb-8 sm:mb-10 md:mb-12 text-center max-w-2xl"
        >
          <span className="font-jakarta text-xs font-bold uppercase tracking-widest text-noir-400 mb-2 block">
            The Repertoire
          </span>
          <h2 className="font-editorial font-bold text-3xl sm:text-4xl md:text-5xl text-noir-950 tracking-tight">
            Our Services
          </h2>
          <p className="mt-3 font-jakarta text-sm sm:text-base text-noir-600 leading-relaxed">
            Engineered for gentlemen of distinction. Experience bespoke barbering, scalp hydrotherapy, and restorative body rituals in Business Bay.
          </p>
        </motion.div>

        {/* 2. Responsive Photographic Services Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7 mb-10 sm:mb-12"
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
            <span>View All Services</span>
            {/* Animated Underline */}
            <span className="w-full h-[1.5px] bg-noir-950 mt-1 origin-left transition-transform duration-300 group-hover:scale-x-110" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
