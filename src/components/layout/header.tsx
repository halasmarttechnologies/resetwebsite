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

  React.useEffect(() => {
    setIsServicesOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-8 h-[46px] sm:h-[48px] flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Side: Compact Brand Mark */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 group shrink-0"
          aria-label="Reset Men Salon Home"
        >
          <Image
            src="/logo.webp"
            alt="Reset Men Salon"
            width={32}
            height={32}
            className="h-6 sm:h-7 w-auto object-contain brightness-0 transition-transform duration-200 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Center: Apple-style Minimalist Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            if (item.isDrawer) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => openPriceList()}
                  className="font-jakarta text-[12px] font-normal text-neutral-700 hover:text-black transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              );
            }

            if (item.hasDropdown) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 font-jakarta text-[12px] font-normal text-neutral-700 hover:text-black transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 text-neutral-500 transition-transform duration-200 ${
                        isServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  {/* Clean Dropdown */}
                  {isServicesOpen && (
                    <div className="absolute top-full -left-4 pt-2 w-60 animate-fade-in z-50">
                      <div className="rounded-xl bg-white/98 backdrop-blur-md border border-black/[0.08] p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.1)] text-noir-950 flex flex-col">
                        {(
                          navigationConfig.mainNav.find((n) => n.href === "/services")
                            ?.children || []
                        ).map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block px-3 py-1.5 rounded-lg font-jakarta text-[13px] font-medium text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors"
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
                className="font-jakarta text-[12px] font-normal text-neutral-700 hover:text-black transition-colors"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Book Appointment Button + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Compact "Book" Pill Button */}
          <a
            href={siteConfig.booking.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 sm:px-3.5 py-1 rounded-full text-[11px] font-jakarta font-semibold tracking-wide bg-noir-950 hover:bg-neutral-800 text-white transition-all active:scale-95 shadow-sm"
          >
            Book
          </a>

          {/* Mobile Menu Trigger */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
