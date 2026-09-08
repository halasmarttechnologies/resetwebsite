"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="relative z-30 w-full overflow-hidden bg-black text-white min-h-[680px] sm:min-h-[780px] lg:min-h-[850px] flex flex-col justify-between pt-16 sm:pt-24 md:pt-28 pb-6 sm:pb-8">
      {/* Background Image with Cinematic Luxury Gradient Matching Screenshot */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/images/footer/footer-bg.webp"
          alt="Reset Men Salon"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top sm:object-[center_20%]"
        />
        {/* Gradients matching screenshot: model visible at top, deep noir contrast at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/65 to-black pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-between h-full flex-1 gap-12 sm:gap-16">
        {/* ── 1. Top Section: Headline (Left) & Newsletter (Right) ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
          {/* Left: Statement Headline */}
          <div className="max-w-2xl">
            <h2 className="font-editorial font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] text-white tracking-tight leading-[1.06] uppercase">
              GLOW BRIGHTER WITH
              <br />
              A CUSTOM CRAFTED
              <br />
              SKINCARE RITUAL
            </h2>
          </div>

          {/* Right: Newsletter Email Subscribe */}
          <div className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] lg:min-w-[360px]">
            {isSubscribed ? (
              <p className="font-jakarta text-sm text-white/90 py-2">
                Thank you for subscribing. Welcome to Reset.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex items-center justify-between border-b border-white/40 pb-2.5 transition-colors focus-within:border-white"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                  className="w-full bg-transparent font-jakarta text-sm sm:text-base text-white placeholder:text-white/60 focus:outline-none pr-3"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="text-white/80 hover:text-white transition-transform hover:translate-x-0.5 hover:-translate-y-0.5 focus:outline-none p-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── 2. Middle Navigation Row with Vertical Dividers Matching Screenshot ── */}
        <nav
          aria-label="Footer Navigation"
          className="border-t border-b border-white/20 py-4 sm:py-5"
        >
          <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            <Link
              href="/"
              className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-0 font-jakarta text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-colors group"
            >
              <span>Home</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            <Link
              href="/services"
              className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-0 font-jakarta text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-colors group"
            >
              <span>Services</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            <Link
              href="/about"
              className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-0 font-jakarta text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-colors group"
            >
              <span>About Us</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            <Link
              href="/pricing"
              className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-0 font-jakarta text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-colors group"
            >
              <span>Pricing</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            <Link
              href="/contact"
              className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-0 font-jakarta text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-colors group"
            >
              <span>Contact Us</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </div>
        </nav>

        {/* ── 3. Brand Logo (Left) + Relevant Information (Right) ── */}
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-12 pt-4 sm:pt-6 pb-2">
          {/* Left: Bigger Logo */}
          <Link href="/" className="inline-block group shrink-0">
            <Image
              src="/logo.webp"
              alt="Reset Men Salon Logo"
              width={260}
              height={260}
              className="h-24 sm:h-32 md:h-36 lg:h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Right: Relevant Information (Our Services & Find Us) */}
          <div className="flex flex-wrap sm:flex-nowrap items-start gap-8 sm:gap-14 lg:gap-16">
            {/* Our Services */}
            <div>
              <h4 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-white mb-3">
                Our Services
              </h4>
              <ul className="space-y-2 font-jakarta text-xs text-white/75">
                <li>
                  <Link href="/services/hair-and-beard" className="hover:text-white transition-colors">
                    Hair &amp; Beard
                  </Link>
                </li>
                <li>
                  <Link href="/services/japanese-head-spa" className="hover:text-white transition-colors">
                    Japanese Head Spa
                  </Link>
                </li>
                <li>
                  <Link href="/services/facial" className="hover:text-white transition-colors">
                    Facial
                  </Link>
                </li>
                <li>
                  <Link href="/services/massage" className="hover:text-white transition-colors">
                    Massage
                  </Link>
                </li>
                <li>
                  <Link href="/services/hair-treatment-and-colouring" className="hover:text-white transition-colors">
                    Hair &amp; Colouring
                  </Link>
                </li>
              </ul>
            </div>

            {/* Find Us */}
            <div>
              <h4 className="font-editorial text-xs font-bold uppercase tracking-[0.2em] text-white mb-3">
                Find Us
              </h4>
              <ul className="space-y-2 font-jakarta text-xs text-white/75">
                <li>
                  <a href="tel:+97145655688" className="hover:text-white transition-colors">
                    +971 4 565 5688
                  </a>
                </li>
                <li>
                  <a
                    href="https://api.whatsapp.com/send?phone=971581021540&text=Hello%20Reset%20Barber%2C%20I%27m%20interested%20in%20your%20services.%20Can%20I%20book%20an%20appointment%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    +971 58 102 1540 (WhatsApp)
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
                  <a href="mailto:info@resetmensalon.ae" className="hover:text-white transition-colors">
                    info@resetmensalon.ae
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── 4. Bottom Legal Bar Matching Screenshot ── */}
        <div className="w-full pt-4 sm:pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-2xs sm:text-xs text-white/60 font-jakarta text-center">
          <p>©2026 All Rights Reserved</p>

          <Link
            href="/contact"
            className="hover:text-white transition-colors"
          >
            Terms &amp; Conditions
          </Link>

          <Link
            href="/contact"
            className="hover:text-white transition-colors"
          >
            Privacy &amp; Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
