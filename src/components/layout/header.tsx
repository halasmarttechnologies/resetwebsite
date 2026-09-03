"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 w-full py-6 md:py-8 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto w-full px-6 sm:px-10 md:px-12 lg:px-14 flex items-center justify-between">
        {/* Left Side: Brand Logo (RESET) + Nav Links */}
        <div className="flex items-center gap-10 md:gap-14 lg:gap-16">
          {/* Logo in Plus Jakarta Sans bold */}
          <Link href="/" className="inline-flex items-center group">
            <span className="font-jakarta text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-white flex items-center select-none uppercase">
              RESET
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/about"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/95 hover:text-white transition-all duration-200 hover:scale-105"
            >
              ABOUT US
            </Link>
            <Link
              href="/services"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/95 hover:text-white transition-all duration-200 hover:scale-105"
            >
              SERVICES
            </Link>
            <Link
              href="/blog"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/95 hover:text-white transition-all duration-200 hover:scale-105"
            >
              BLOG
            </Link>
            <Link
              href="/contact"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/95 hover:text-white transition-all duration-200 hover:scale-105"
            >
              CONTACTS
            </Link>
          </nav>
        </div>

        {/* Right Side: Frosted Glass "Book an Appointment" Pill Button */}
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.booking.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-6 md:px-7 py-2.5 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02]"
          >
            Book an Appointment
          </a>

          {/* Mobile Menu Trigger */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
