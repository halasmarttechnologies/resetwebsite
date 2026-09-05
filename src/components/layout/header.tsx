"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="absolute top-0 left-0 right-0 z-40 w-full py-6 sm:py-8 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto w-full px-5 sm:px-10 md:px-14 lg:px-16 flex items-center justify-between">
        {/* Left Side: Brand Logo (RESET) + Nav Links */}
        <div className="flex items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center group">
            <span
              className={`font-editorial text-2xl sm:text-3xl font-bold tracking-[-0.03em] uppercase select-none transition-colors duration-200 ${
                isHomePage ? "text-white" : "text-noir-950"
              }`}
            >
              RESET
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link
              href="/about"
              className={`font-jakarta text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 hover:scale-105 ${
                isHomePage
                  ? "text-white hover:text-white/80"
                  : "text-noir-900 hover:text-noir-600"
              }`}
            >
              ABOUT US
            </Link>
            <Link
              href="/services"
              className={`font-jakarta text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 hover:scale-105 ${
                isHomePage
                  ? "text-white hover:text-white/80"
                  : "text-noir-900 hover:text-noir-600 font-bold"
              }`}
            >
              SERVICES
            </Link>
            <Link
              href="/pricing"
              className={`font-jakarta text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 hover:scale-105 ${
                isHomePage
                  ? "text-white hover:text-white/80"
                  : "text-noir-900 hover:text-noir-600"
              }`}
            >
              PRICING
            </Link>
            <Link
              href="/blog"
              className={`font-jakarta text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 hover:scale-105 ${
                isHomePage
                  ? "text-white hover:text-white/80"
                  : "text-noir-900 hover:text-noir-600"
              }`}
            >
              BLOG
            </Link>
            <Link
              href="/contact"
              className={`font-jakarta text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 hover:scale-105 ${
                isHomePage
                  ? "text-white hover:text-white/80"
                  : "text-noir-900 hover:text-noir-600"
              }`}
            >
              CONTACTS
            </Link>
          </nav>
        </div>

        {/* Right Side: "Book an Appointment" Pill Button (Non-sticky, Absolute) */}
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.booking.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] ${
              isHomePage
                ? "bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-md border border-white/35 text-white"
                : "bg-noir-950 hover:bg-noir-800 text-white shadow-md"
            }`}
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
