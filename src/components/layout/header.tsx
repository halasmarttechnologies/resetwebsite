"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { navigationConfig } from "@/config/navigation";
import { ChevronDown } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { usePriceList } from "@/context/price-list-context";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/pricing", label: "Pricing", isDrawer: true },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { openPriceList } = usePriceList();

  const [isServicesOpen, setIsServicesOpen] = React.useState(false);
  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  React.useEffect(() => {
    setIsServicesOpen(false);
  }, [pathname]);

  const services =
    navigationConfig.mainNav.find((n) => n.href === "/services")?.children || [];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-8 h-[56px] sm:h-[60px] md:h-[64px] flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Side: Brand Logo */}
        <Link
          href="/"
          className="inline-flex items-center group shrink-0 py-1"
          aria-label="Reset Men Salon Home"
        >
          <Image
            src="/logo.webp"
            alt="Reset Men Salon"
            width={64}
            height={64}
            className="h-10 sm:h-11 md:h-12 w-auto object-contain brightness-0 transition-transform duration-200 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Center: Minimalist Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            if (item.isDrawer) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => openPriceList()}
                  className="font-jakarta text-[13px] font-normal text-neutral-700 hover:text-black transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              );
            }

            if (item.hasDropdown) {
              return (
                <div
                  key={item.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 font-jakarta text-[13px] font-normal text-neutral-700 hover:text-black transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${
                        isServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  {/* High-Contrast, Fully Legible Solid Dropdown */}
                  {isServicesOpen && (
                    <div className="absolute top-full -left-4 pt-2.5 w-64 animate-fade-in z-50">
                      <div className="rounded-xl bg-white border border-neutral-200/90 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.18)] text-neutral-900 flex flex-col gap-0.5">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block px-3 py-2 rounded-lg font-jakarta text-[13px] font-medium text-neutral-800 hover:text-black hover:bg-neutral-100 transition-colors"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="font-jakarta text-[13px] font-normal text-neutral-700 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Book Appointment Button + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Clean "Book" Pill Button */}
          <a
            href={siteConfig.booking.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[12px] font-jakarta font-semibold tracking-wide bg-noir-950 hover:bg-neutral-800 text-white transition-all active:scale-95 shadow-sm"
          >
            Book
          </a>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
