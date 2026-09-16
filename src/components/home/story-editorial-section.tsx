"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const points = [
  "Master Stylists You Can Trust",
  "A Grooming Experience Tailored to You",
  "Premium Products for Superior Results",
  "A Space Designed for Relaxation",
];

export function StoryEditorialSection() {
  return (
    <section className="relative w-full bg-noir-950 text-white flex flex-col justify-center items-center py-16 sm:py-20 md:py-28 overflow-hidden border-b border-noir-950/[0.12]">
      {/* 1. Full Hero Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/salon/stylist-haircut-mirror.webp"
          alt="Reset Men Salon — Dubai Luxury Grooming Master Barbering"
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-[center_top] sm:object-[center_20%] md:object-[right_center] lg:object-[82%_center]"
          priority
        />
        {/* Deep Contrast Multi-Stop Dark Gradient Overlay for Crisp White Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/95 via-black/85 to-black/70 lg:from-black/95 lg:via-black/85 lg:to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-noir-950/40 pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Pure White Simple Points */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:col-span-8 xl:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Main Headline (Pure White) */}
            <h2 className="font-editorial font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] xl:text-[2.6rem] text-white tracking-[-0.03em] leading-[1.14] uppercase mb-8 sm:mb-10 drop-shadow-md">
              Why Reset Men Salon Is the Preferred Choice for Men’s Grooming in Business Bay
            </h2>

            {/* Simple, Pure-White Points List (No Icons, No Long Subtext) */}
            <div className="space-y-3.5 sm:space-y-4 mb-8 sm:mb-10 max-w-2xl">
              {points.map((title, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-3.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 opacity-80" />
                  <h3 className="font-editorial font-bold text-base sm:text-lg md:text-xl text-white tracking-tight uppercase">
                    {title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Action Links (Pure White) */}
            <div className="flex items-center gap-6 pt-1">
              <a
                href={siteConfig.booking.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex flex-col items-start text-white font-jakarta text-sm sm:text-base font-semibold tracking-wide hover:text-white/80 transition-colors duration-300"
              >
                <span>Book an Appointment</span>
                <span className="w-full h-[1.5px] bg-white mt-1 origin-left transition-transform duration-300 group-hover:scale-110" />
              </a>

              <Link
                href="/services"
                className="group relative inline-flex flex-col items-start text-white/75 font-jakarta text-sm sm:text-base font-normal tracking-wide hover:text-white transition-colors duration-300"
              >
                <span>Explore Services</span>
                <span className="w-full h-[1px] bg-white/50 mt-1 origin-left transition-transform duration-300 group-hover:scale-110" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column Spacer (Leaves Hero Model Face in the Background Unobstructed on Desktop) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-5 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
