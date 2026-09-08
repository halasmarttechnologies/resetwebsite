"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";

const navItems = [
  { href: "/about", label: "ABOUT US" },
  { href: "/services", label: "SERVICES" },
  { href: "/pricing", label: "PRICING" },
  { href: "/blog", label: "BLOG" },
  { href: "/contact", label: "CONTACTS" },
];

export function Header() {
  const pathname = usePathname();
  const isDarkHero = pathname === "/" || pathname === "/about";

  return (
    <header className="absolute top-0 left-0 right-0 z-40 w-full py-5 sm:py-8 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Left Side: Brand Logo (RESET) + Nav Links */}
        <div className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-14">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3 group">
            <Image
              src="/logo.webp"
              alt="Reset Men Salon"
              width={40}
              height={40}
              className={`h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-200 ${
                isDarkHero ? "" : "brightness-0"
              }`}
              priority
            />
            <span
              className={`font-editorial text-2xl sm:text-3xl font-bold tracking-[-0.03em] uppercase transition-colors duration-200 ${
                isDarkHero ? "text-white" : "text-noir-950"
              }`}
            >
              RESET
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            {navItems.map((item) => {
              const isPricing = item.href === "/pricing";

              if (isPricing) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center justify-center px-5 lg:px-6 py-2 rounded-full font-jakarta text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200 shadow-md hover:scale-105 active:scale-95 ${
                      isDarkHero
                        ? "bg-white text-noir-950 shadow-[0_4px_20px_rgba(255,255,255,0.35)] hover:bg-neutral-100"
                        : "bg-noir-950 text-white hover:bg-noir-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-jakarta text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 hover:scale-105 ${
                    isDarkHero
                      ? "text-white hover:text-white/80"
                      : "text-noir-900 hover:text-noir-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side: "Book an Appointment" Pill Button (Non-sticky, Absolute) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={siteConfig.booking.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center justify-center px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] ${
              isDarkHero
                ? "bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-md border border-white/35 text-white"
                : "bg-noir-950 hover:bg-noir-800 text-white shadow-md"
            }`}
          >
            Book an Appointment
          </a>

          {/* Mobile Menu Trigger */}
          <MobileNav isHomePage={isDarkHero} />
        </div>
      </div>
    </header>
  );
}
