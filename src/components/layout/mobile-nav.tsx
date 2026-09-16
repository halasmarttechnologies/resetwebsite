"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { usePriceList } from "@/context/price-list-context";

interface MobileNavProps {
  isHomePage?: boolean;
  isScrolled?: boolean;
}

export function MobileNav({}: MobileNavProps = {}) {
  const pathname = usePathname();
  const { openPriceList } = usePriceList();
  const [isOpen, setIsOpen] = React.useState(false);
  const [servicesExpanded, setServicesExpanded] = React.useState(false);

  // Lock body scroll while mobile drawer is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on navigation
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden flex items-center">
      {/* Mobile Menu Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Navigation Menu"
        className="p-2 rounded-lg text-noir-950 hover:bg-neutral-100 transition-colors flex items-center justify-center active:scale-95"
      >
        <Menu className="w-5 h-5 text-noir-950" />
      </button>

      {/* Full-Screen Pure White Mobile Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white text-noir-950 animate-fade-in shadow-2xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-white sticky top-0 z-10">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2.5 group"
            >
              <Image
                src="/logo.webp"
                alt="Reset Men Salon"
                width={30}
                height={30}
                className="h-7 w-auto object-contain brightness-0"
              />
              <div className="flex flex-col">
                <span className="font-editorial text-base font-bold tracking-wider uppercase text-noir-950 leading-none">
                  RESET
                </span>
                <span className="font-jakarta text-[9px] font-semibold tracking-[0.15em] uppercase text-neutral-500 mt-0.5">
                  Men Salon Dubai
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Navigation Menu"
              className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-noir-950 flex items-center justify-center transition-colors active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Navigation Body */}
          <nav className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-neutral-100">
            {/* 1. Home */}
            <div className="py-2.5">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between font-jakarta text-[16px] font-semibold py-1.5 transition-colors ${
                  pathname === "/" ? "text-brand-500 font-bold" : "text-noir-950 hover:text-brand-500"
                }`}
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>

            {/* 2. About */}
            <div className="py-2.5">
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between font-jakarta text-[16px] font-semibold py-1.5 transition-colors ${
                  pathname === "/about" ? "text-brand-500 font-bold" : "text-noir-950 hover:text-brand-500"
                }`}
              >
                <span>About</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>

            {/* 3. Services (With Accordion Submenu) */}
            <div className="py-2.5">
              <div className="flex items-center justify-between py-1.5">
                <Link
                  href="/services"
                  onClick={() => setIsOpen(false)}
                  className={`font-jakarta text-[16px] font-semibold transition-colors ${
                    pathname.startsWith("/services") ? "text-brand-500 font-bold" : "text-noir-950 hover:text-brand-500"
                  }`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setServicesExpanded(!servicesExpanded)}
                  aria-label="Toggle Services Menu"
                  className="p-1 text-neutral-600 hover:text-black transition-colors"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      servicesExpanded ? "rotate-180 text-brand-500" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Subcategories list */}
              {servicesExpanded && (
                <div className="mt-1 pl-3 pt-1 pb-2 flex flex-col gap-1 border-l-2 border-neutral-200">
                  {(
                    navigationConfig.mainNav.find((n) => n.href === "/services")?.children || []
                  ).map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-1.5 px-2.5 rounded-lg text-sm font-jakarta transition-colors ${
                        pathname === sub.href
                          ? "bg-neutral-100 text-noir-950 font-bold"
                          : "text-neutral-700 hover:text-noir-950 hover:bg-neutral-50 font-medium"
                      }`}
                    >
                      {sub.title}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1.5 py-1.5 px-2.5 text-xs font-jakarta font-bold text-brand-600 hover:underline mt-1"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Pricing */}
            <div className="py-2.5">
              <div className="flex items-center justify-between">
                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className={`font-jakarta text-[16px] font-semibold py-1.5 transition-colors ${
                    pathname === "/pricing" ? "text-brand-500 font-bold" : "text-noir-950 hover:text-brand-500"
                  }`}
                >
                  Pricing
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    openPriceList();
                  }}
                  className="text-xs font-jakarta font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 hover:bg-noir-950 hover:text-white transition-colors"
                >
                  Quick Drawer
                </button>
              </div>
            </div>

            {/* 5. Shop */}
            <div className="py-2.5">
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between font-jakarta text-[16px] font-semibold py-1.5 transition-colors ${
                  pathname === "/shop" ? "text-brand-500 font-bold" : "text-noir-950 hover:text-brand-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>Shop</span>
                  <span className="text-[10px] font-jakarta font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-200">
                    Grooming
                  </span>
                </div>
                <ShoppingBag className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>

            {/* 6. Blog / Journal */}
            <div className="py-2.5">
              <Link
                href="/blog"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between font-jakarta text-[16px] font-semibold py-1.5 transition-colors ${
                  pathname === "/blog" ? "text-brand-500 font-bold" : "text-noir-950 hover:text-brand-500"
                }`}
              >
                <span>Journal</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>

            {/* 7. Contact */}
            <div className="py-2.5">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between font-jakarta text-[16px] font-semibold py-1.5 transition-colors ${
                  pathname === "/contact" ? "text-brand-500 font-bold" : "text-noir-950 hover:text-brand-500"
                }`}
              >
                <span>Contact</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>
          </nav>

          {/* Bottom Actions & Concierge Info */}
          <div className="p-5 border-t border-neutral-100 bg-neutral-50/50 space-y-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <a
              href={siteConfig.booking.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center gap-2 shadow-sm bg-noir-950 text-white hover:bg-neutral-800 font-jakarta font-semibold py-3"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Book on WhatsApp</span>
              </Button>
            </a>

            <a href={siteConfig.contact.phoneHref} className="block w-full">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-center gap-2 bg-white text-noir-950 hover:bg-neutral-100 border border-neutral-200 font-jakarta font-semibold py-3 shadow-sm"
              >
                <Phone className="w-4 h-4 text-noir-950" />
                <span>Call {siteConfig.contact.phoneDisplay}</span>
              </Button>
            </a>

            <div className="flex items-center justify-between pt-1 text-[11px] font-jakarta text-neutral-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                Business Bay, Dubai
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                10 AM – 10 PM Daily
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
