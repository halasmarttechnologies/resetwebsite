"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-black/30 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
          : "py-6 md:py-8 bg-transparent"
      }`}
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 flex items-center justify-between">
        {/* Left Side: Brand Logo + Nav Links (Identical layout to screenshot) */}
        <div className="flex items-center gap-10 md:gap-14 lg:gap-20">
          {/* Logo with Stylized Lettermark (RESET) */}
          <Link href="/" className="inline-flex items-center group">
            <span className="font-sans text-xl sm:text-2xl md:text-3xl font-black tracking-[-0.03em] text-white flex items-center select-none uppercase drop-shadow-md">
              <span>R</span>
              {/* Stylized geometric glyph matching the screenshot logo aesthetic */}
              <span className="relative inline-flex items-center justify-center mx-[1px]">
                <span>E</span>
              </span>
              <span>S</span>
              <span className="relative inline-flex items-center justify-center mx-[1px]">
                <span>E</span>
              </span>
              <span>T</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link
              href="/about"
              className="text-2xs sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-all duration-200 drop-shadow-sm hover:scale-105"
            >
              ABOUT US
            </Link>
            <Link
              href="/services"
              className="text-2xs sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-all duration-200 drop-shadow-sm hover:scale-105"
            >
              SERVICES
            </Link>
            <Link
              href="/blog"
              className="text-2xs sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-all duration-200 drop-shadow-sm hover:scale-105"
            >
              BLOG
            </Link>
            <Link
              href="/contact"
              className="text-2xs sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-all duration-200 drop-shadow-sm hover:scale-105"
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
            className="hidden sm:inline-flex items-center justify-center px-6 md:px-7 py-2.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/35 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
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
