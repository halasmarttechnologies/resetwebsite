"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-30 w-full text-white pt-20 sm:pt-28 md:pt-36 pb-8 sm:pb-12 overflow-hidden select-none bg-noir-950 rounded-none border-t border-white/15">
      {/* 1. Background Image with High Opacity & Crisp Visibility */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/images/footer/footer-bg.webp"
          alt="Reset Men Salon Dubai — Luxury Grooming"
          fill
          priority={false}
          quality={95}
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
        {/* Lighter, subtle gradient overlay so the photo is prominently and clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 sm:px-10 md:px-14 lg:px-16 flex flex-col justify-between">
        {/* 2. Top Inquiry & Booking CTA Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-white/20">
          <div className="max-w-2xl drop-shadow-md">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80 font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_#D4AF37]" />
              <span>Reset Men Salon • Dubai</span>
            </div>

            <h2 className="font-editorial font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] text-white tracking-[-0.025em] leading-[1.25]">
              Interested in <span className="font-extrabold text-white">experiencing Reset</span>, booking a signature ritual, or simply learning more?
            </h2>
          </div>

          <div className="shrink-0">
            <a
              href={siteConfig.booking.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white hover:bg-white/90 text-noir-950 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 shadow-2xl shadow-black/60"
            >
              Book an Appointment
            </a>
          </div>
        </div>

        {/* 3. 3-Column Navigation & Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 py-12 sm:py-16 border-b border-white/15 drop-shadow-sm">
          {/* Column 1: Quick Links */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-editorial font-semibold text-sm uppercase tracking-[0.18em] text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 font-jakarta text-xs uppercase tracking-[0.14em] text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Our Services */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-editorial font-semibold text-sm uppercase tracking-[0.18em] text-white">
              Our Services
            </h3>
            <ul className="space-y-2.5 font-jakarta text-xs uppercase tracking-[0.14em] text-white/80">
              <li>
                <Link href="/services/hair-and-beard" className="hover:text-white transition-colors duration-200">
                  Hair &amp; Beard
                </Link>
              </li>
              <li>
                <Link href="/services/facial" className="hover:text-white transition-colors duration-200">
                  Facial
                </Link>
              </li>
              <li>
                <Link href="/services/hair-treatment-and-colouring" className="hover:text-white transition-colors duration-200">
                  Hair &amp; Colouring
                </Link>
              </li>
              <li>
                <Link href="/services/japanese-head-spa" className="hover:text-white transition-colors duration-200">
                  Japanese Head Spa
                </Link>
              </li>
              <li>
                <Link href="/services/massage" className="hover:text-white transition-colors duration-200">
                  Massage
                </Link>
              </li>
              <li>
                <Link href="/services/waxing" className="hover:text-white transition-colors duration-200">
                  Waxing
                </Link>
              </li>
              <li>
                <Link href="/services/nails" className="hover:text-white transition-colors duration-200">
                  Nails
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Find Us */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-editorial font-semibold text-sm uppercase tracking-[0.18em] text-white">
              Find Us
            </h3>
            <ul className="space-y-3 font-jakarta text-xs tracking-wide text-white/90">
              <li>
                <a
                  href="tel:+97145655688"
                  className="group inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>+971 4 565 5688</span>
                  <span className="text-2xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20services.%20Can%20I%20book%20an%20appointment%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>+971 58 102 1540 (WhatsApp)</span>
                  <span className="text-2xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Dubai, Business Bay
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@resetmensalon.ae"
                  className="group inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>info@resetmensalon.ae</span>
                  <span className="text-2xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Monumental Brand Typography Spanning Across Bottom */}
        <div className="w-full pt-8 sm:pt-12 md:pt-14 pb-4 overflow-hidden">
          <div className="w-full flex items-baseline justify-between select-none">
            <h1 className="w-full font-editorial font-black text-[clamp(4.5rem,15vw,16rem)] text-white tracking-[-0.04em] leading-[0.82] uppercase text-left whitespace-nowrap drop-shadow-xl">
              RESET
            </h1>
          </div>
        </div>

        {/* 5. Bottom Sub-Bar: Copyright & Social Links */}
        <div className="pt-6 sm:pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 font-jakarta">
          <p>&copy; {currentYear} Reset Men Salon LLC. Business Bay, Dubai. All rights reserved.</p>

          <div className="flex items-center gap-6 text-xs uppercase tracking-wider">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={siteConfig.booking.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={siteConfig.contact.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              Google Maps
            </a>
            <a
              href="https://www.tiktok.com/@resetmensalon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
