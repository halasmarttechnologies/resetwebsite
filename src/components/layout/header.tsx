"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-luxury ${
        isScrolled
          ? "bg-noir-950/80 backdrop-blur-lg border-b border-white/10 py-4 shadow-xl"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16 flex items-center justify-between">
        {/* Left Side: Brand Logo + Nav Links (Grouped just like screenshot) */}
        <div className="flex items-center gap-10 md:gap-14 lg:gap-20">
          {/* Logo with Stylized Letter Mark */}
          <Link href="/" className="inline-flex items-center group">
            <span className="font-sans text-xl sm:text-2xl font-black tracking-[-0.02em] text-white flex items-center uppercase select-none">
              <span>LXN</span>
              <span className="text-brand-300 mx-[0.5px]">A</span>
              <span>RIA</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <Link
              href="/about"
              className="text-2xs sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/90 hover:text-white transition-colors duration-200"
            >
              ABOUT US
            </Link>
            <Link
              href="/services"
              className="text-2xs sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/90 hover:text-white transition-colors duration-200"
            >
              SERVICES
            </Link>
            <Link
              href="/blog"
              className="text-2xs sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/90 hover:text-white transition-colors duration-200"
            >
              BLOG
            </Link>
            <Link
              href="/contact"
              className="text-2xs sm:text-xs font-semibold uppercase tracking-[0.18em] text-white/90 hover:text-white transition-colors duration-200"
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
            className="hidden sm:inline-flex items-center justify-center px-6 md:px-7 py-2.5 rounded-full bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-lg shadow-black/20 hover:scale-[1.02]"
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
