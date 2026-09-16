"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Instagram,
  ArrowUpRight,
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

  // Lock body & document scroll while the overlay is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key press
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setServicesExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close on route change
  React.useEffect(() => {
    setIsOpen(false);
    setServicesExpanded(false);
  }, [pathname]);

  const close = () => {
    setIsOpen(false);
    setServicesExpanded(false);
  };

  const primaryNav: Array<{
    label: string;
    href: string;
    hasChildren?: boolean;
    isDrawer?: boolean;
  }> = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services", hasChildren: true },
    { label: "Pricing", href: "/pricing", isDrawer: true },
    { label: "Shop", href: "/shop" },
    { label: "Journal", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const services =
    navigationConfig.mainNav.find((n) => n.href === "/services")?.children ?? [];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Portal target outside sticky header
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(null);
  React.useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const overlay = isOpen ? (
    <div
      className="fixed inset-0 flex flex-col bg-white text-black animate-fade-in md:hidden"
      style={{ zIndex: 9999 }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      {/* 1. Header Bar: Brand Logo & Close Action */}
      <div className="flex items-center justify-between px-5 h-[58px] border-b border-neutral-100 shrink-0 bg-white">
        <Link
          href="/"
          onClick={close}
          className="inline-flex items-center gap-2.5 group"
          aria-label="Reset Men Salon Home"
        >
          <Image
            src="/logo.webp"
            alt="Reset Men Salon"
            width={28}
            height={28}
            className="h-6 w-auto object-contain brightness-0"
            priority
          />
          <div className="flex flex-col">
            <span className="font-editorial text-[14px] font-bold tracking-[0.2em] uppercase text-black leading-none">
              RESET
            </span>
            <span className="font-jakarta text-[9px] font-semibold tracking-[0.22em] uppercase text-neutral-400 mt-0.5">
              Men Salon · Dubai
            </span>
          </div>
        </Link>

        <button
          type="button"
          onClick={close}
          aria-label="Close Navigation Menu"
          className="w-9 h-9 rounded-full border border-neutral-200 hover:border-black hover:bg-black hover:text-white text-black flex items-center justify-center transition-all active:scale-95"
        >
          <X className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      {/* 2. Section Subtitle Strip */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between shrink-0">
        <span className="font-jakarta text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-400">
          Directory
        </span>
        <span className="font-jakarta text-[10px] font-medium tracking-[0.15em] uppercase text-neutral-400">
          Business Bay
        </span>
      </div>

      {/* 3. Navigation List (Scrollable) */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-2 divide-y divide-neutral-100">
        <nav className="flex flex-col">
          {primaryNav.map((item, index) => {
            const active = isActive(item.href);
            const num = String(index + 1).padStart(2, "0");

            // Services Item (Accordion)
            if (item.hasChildren) {
              return (
                <div key={item.label} className="py-2.5">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setServicesExpanded((prev) => !prev)}
                      className="flex-1 flex items-center gap-3 py-1.5 text-left group"
                      aria-expanded={servicesExpanded}
                      aria-label="Toggle Services menu"
                    >
                      <span className="font-jakarta text-[11px] font-medium tracking-widest text-neutral-400 select-none w-5">
                        {num}
                      </span>
                      <span
                        className={`font-editorial text-[22px] sm:text-[24px] leading-tight tracking-tight transition-colors ${
                          active
                            ? "font-bold text-black"
                            : "font-normal text-neutral-800 group-hover:text-black"
                        }`}
                      >
                        {item.label}
                      </span>
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-black ml-1" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setServicesExpanded((prev) => !prev)}
                      aria-label="Toggle Services submenu"
                      aria-expanded={servicesExpanded}
                      className="w-8 h-8 rounded-full border border-neutral-200 hover:border-black flex items-center justify-center text-black transition-colors"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesExpanded ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.75}
                      />
                    </button>
                  </div>

                  {/* Submenu Accordion */}
                  {servicesExpanded && (
                    <div className="ml-8 pl-4 my-2 border-l border-neutral-200 space-y-2 animate-fade-in">
                      <Link
                        href="/services"
                        onClick={close}
                        className="block py-1 font-jakarta text-[12px] font-semibold tracking-wider uppercase text-black hover:underline underline-offset-4"
                      >
                        All Services Overview →
                      </Link>
                      {services.map((sub) => {
                        const subActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={close}
                            className={`block py-1 font-jakarta text-[13px] tracking-tight transition-colors ${
                              subActive
                                ? "font-semibold text-black"
                                : "font-normal text-neutral-600 hover:text-black"
                            }`}
                          >
                            {sub.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Pricing Item (Drawer + Page link)
            if (item.isDrawer) {
              return (
                <div key={item.label} className="py-2.5">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex-1 flex items-center gap-3 py-1.5 group"
                    >
                      <span className="font-jakarta text-[11px] font-medium tracking-widest text-neutral-400 select-none w-5">
                        {num}
                      </span>
                      <span
                        className={`font-editorial text-[22px] sm:text-[24px] leading-tight tracking-tight transition-colors ${
                          active
                            ? "font-bold text-black"
                            : "font-normal text-neutral-800 group-hover:text-black"
                        }`}
                      >
                        {item.label}
                      </span>
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-black ml-1" />
                      )}
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        close();
                        openPriceList();
                      }}
                      className="px-3 py-1 rounded-full border border-black text-[10px] font-jakarta font-semibold tracking-wider uppercase text-black hover:bg-black hover:text-white transition-all active:scale-95 shrink-0"
                    >
                      Instant Menu
                    </button>
                  </div>
                </div>
              );
            }

            // Standard Navigation Links
            return (
              <div key={item.label} className="py-2.5">
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-center gap-3 py-1.5 group"
                >
                  <span className="font-jakarta text-[11px] font-medium tracking-widest text-neutral-400 select-none w-5">
                    {num}
                  </span>
                  <span
                    className={`font-editorial text-[22px] sm:text-[24px] leading-tight tracking-tight transition-colors ${
                      active
                        ? "font-bold text-black"
                        : "font-normal text-neutral-800 group-hover:text-black"
                    }`}
                  >
                    {item.label}
                  </span>
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black ml-1" />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* 4. Bottom Concierge & Action Bar */}
      <div
        className="shrink-0 px-5 pt-4 pb-5 border-t border-neutral-100 bg-white space-y-3"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        {/* Primary Booking CTA */}
        <a
          href={siteConfig.booking.primaryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-11 rounded-full bg-black hover:bg-neutral-800 text-white font-jakarta text-[12px] font-semibold tracking-[0.12em] uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm"
        >
          <span>Book Appointment</span>
          <ArrowUpRight className="w-4 h-4 text-white" />
        </a>

        {/* Secondary Contact Actions (Pure Black & White) */}
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={siteConfig.booking.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 rounded-full border border-neutral-200 hover:border-black hover:bg-neutral-50 text-black font-jakarta text-[11px] font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors active:scale-[0.98]"
          >
            <MessageSquare className="w-3.5 h-3.5 text-black" strokeWidth={1.75} />
            <span>WhatsApp</span>
          </a>

          <a
            href={siteConfig.contact.phoneHref}
            className="h-10 rounded-full border border-neutral-200 hover:border-black hover:bg-neutral-50 text-black font-jakarta text-[11px] font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors active:scale-[0.98]"
          >
            <Phone className="w-3.5 h-3.5 text-black" strokeWidth={1.75} />
            <span>Call Salon</span>
          </a>
        </div>

        {/* Concierge Details Strip */}
        <div className="pt-2.5 grid grid-cols-2 gap-3 border-t border-neutral-100">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-black mt-0.5 shrink-0" strokeWidth={1.75} />
            <div className="flex flex-col">
              <span className="font-jakarta text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">
                Location
              </span>
              <span className="font-jakarta text-[11px] font-medium text-black leading-tight mt-0.5">
                Business Bay, Dubai
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-3.5 h-3.5 text-black mt-0.5 shrink-0" strokeWidth={1.75} />
            <div className="flex flex-col">
              <span className="font-jakarta text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400">
                Hours
              </span>
              <span className="font-jakarta text-[11px] font-medium text-black leading-tight mt-0.5">
                10 AM – 10 PM Daily
              </span>
            </div>
          </div>
        </div>

        {/* Footer Signature & Social */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <span className="font-editorial text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-400">
            RESET · EST. DUBAI
          </span>
          {siteConfig.socials?.instagram && (
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-7 h-7 rounded-full border border-neutral-200 flex items-center justify-center text-black hover:border-black hover:bg-neutral-100 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" strokeWidth={1.75} />
            </a>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="md:hidden flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Navigation Menu"
        aria-expanded={isOpen}
        className="w-8 h-8 rounded-full border border-neutral-200 hover:border-black text-black flex items-center justify-center transition-all active:scale-95"
      >
        <Menu className="w-4 h-4 text-black" strokeWidth={2} />
      </button>

      {portalTarget && overlay ? createPortal(overlay, portalTarget) : null}
    </div>
  );
}
