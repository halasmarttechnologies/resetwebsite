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
} from "lucide-react";
import { usePriceList } from "@/context/price-list-context";

interface MobileNavProps {
  isHomePage?: boolean;
  isScrolled?: boolean;
}

/**
 * Full-page mobile navigation overlay.
 *
 * Editorial styling on a pure white canvas:
 *  - Numbered list in Cormorant serif — big, calm, elegant.
 *  - Bronze/gold accents (brand-300) mark the active route and the
 *    Services accordion state.
 *  - Two priority CTAs at the bottom (WhatsApp + Call) plus a
 *    subtle info row (address / hours) so the whole navigation
 *    fits in one screen without scrolling on phones ≥ iPhone SE.
 */
export function MobileNav({}: MobileNavProps = {}) {
  const pathname = usePathname();
  const { openPriceList } = usePriceList();
  const [isOpen, setIsOpen] = React.useState(false);
  const [servicesExpanded, setServicesExpanded] = React.useState(false);

  // Lock body scroll while the overlay is open.
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

  // Close on route change.
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
    navigationConfig.mainNav.find((n) => n.href === "/services")?.children ??
    [];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Portal target — render outside the sticky/backdrop-filter header so
  // position:fixed measures the viewport, not the header's containing block.
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(null);
  React.useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const overlay = isOpen ? (
    <div
      className="fixed inset-0 flex flex-col bg-white text-noir-950 animate-fade-in md:hidden"
      style={{ zIndex: 9999 }}
      role="dialog"
      aria-modal="true"
      aria-label="Main Navigation"
    >
          {/* Header row: logo + close */}
          <div className="flex items-center justify-between px-5 pt-4 pb-4 border-b border-noir-100 shrink-0">
            <Link
              href="/"
              onClick={close}
              className="inline-flex items-center gap-2.5 group"
              aria-label="Reset Men Salon Home"
            >
              <Image
                src="/logo.webp"
                alt="Reset Men Salon"
                width={30}
                height={30}
                className="h-7 w-auto object-contain brightness-0"
              />
              <div className="flex flex-col">
                <span className="font-editorial text-base font-bold tracking-[0.15em] uppercase text-noir-950 leading-none">
                  RESET
                </span>
                <span className="font-jakarta text-[9px] font-semibold tracking-[0.22em] uppercase text-neutral-500 mt-0.5">
                  Men Salon · Dubai
                </span>
              </div>
            </Link>

            <button
              onClick={close}
              aria-label="Close Navigation Menu"
              className="w-11 h-11 rounded-full border border-noir-100 hover:border-noir-950 hover:bg-noir-950 hover:text-white text-noir-950 flex items-center justify-center transition-all active:scale-95"
            >
              <X className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>

          {/* MENU label */}
          <div className="px-5 pt-6 pb-3 flex items-center gap-3 shrink-0">
            <span className="font-jakarta text-[10px] font-bold tracking-[0.35em] uppercase text-brand-500">
              Menu
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-brand-300/60 via-noir-100 to-transparent" />
          </div>

          {/* Nav list — scrollable if content overflows */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <nav className="flex flex-col px-5 pb-4">
              {primaryNav.map((item, index) => {
                const active = isActive(item.href);
                const num = String(index + 1).padStart(2, "0");

                // Pricing → open the drawer instead of navigating.
                if (item.isDrawer) {
                  return (
                    <div
                      key={item.label}
                      className="border-b border-noir-100/70"
                    >
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={close}
                          className={`flex-1 flex items-baseline gap-4 py-4 group ${
                            active ? "text-brand-500" : "text-noir-950"
                          }`}
                        >
                          <span className="font-jakarta text-[10px] font-semibold tracking-[0.2em] text-brand-500/80 pt-1">
                            {num}
                          </span>
                          <span className="font-serif text-[28px] leading-none font-normal tracking-tight">
                            {item.label}
                          </span>
                          {active && (
                            <span className="ml-1 w-1.5 h-1.5 rounded-full bg-brand-300" />
                          )}
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            close();
                            openPriceList();
                          }}
                          className="ml-3 text-[10px] font-jakarta font-bold tracking-[0.18em] uppercase px-3 py-2 rounded-full border border-noir-950 text-noir-950 hover:bg-noir-950 hover:text-white transition-colors shrink-0"
                        >
                          Quick view
                        </button>
                      </div>
                    </div>
                  );
                }

                // Services → expandable list of categories.
                if (item.hasChildren) {
                  return (
                    <div
                      key={item.label}
                      className="border-b border-noir-100/70"
                    >
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={close}
                          className={`flex-1 flex items-baseline gap-4 py-4 ${
                            active ? "text-brand-500" : "text-noir-950"
                          }`}
                        >
                          <span className="font-jakarta text-[10px] font-semibold tracking-[0.2em] text-brand-500/80 pt-1">
                            {num}
                          </span>
                          <span className="font-serif text-[28px] leading-none font-normal tracking-tight">
                            {item.label}
                          </span>
                          {active && (
                            <span className="ml-1 w-1.5 h-1.5 rounded-full bg-brand-300" />
                          )}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setServicesExpanded((v) => !v)}
                          aria-label="Toggle Services submenu"
                          aria-expanded={servicesExpanded}
                          className="ml-2 w-10 h-10 flex items-center justify-center text-noir-500 hover:text-noir-950"
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ease-luxury ${
                              servicesExpanded ? "rotate-180 text-brand-500" : ""
                            }`}
                            strokeWidth={1.75}
                          />
                        </button>
                      </div>

                      {servicesExpanded && (
                        <div className="pl-9 pb-4 -mt-1 grid grid-cols-1 gap-0.5">
                          {services.map((sub) => {
                            const subActive = pathname === sub.href;
                            return (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={close}
                                className={`flex items-center gap-2 py-2 pr-2 font-jakarta text-[14px] font-medium tracking-tight transition-colors ${
                                  subActive
                                    ? "text-brand-500"
                                    : "text-neutral-600 hover:text-noir-950"
                                }`}
                              >
                                <span className="w-4 h-px bg-noir-200" />
                                <span>{sub.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                // Default: plain link.
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={close}
                    className={`border-b border-noir-100/70 flex items-baseline gap-4 py-4 group ${
                      active ? "text-brand-500" : "text-noir-950"
                    }`}
                  >
                    <span className="font-jakarta text-[10px] font-semibold tracking-[0.2em] text-brand-500/80 pt-1">
                      {num}
                    </span>
                    <span className="font-serif text-[28px] leading-none font-normal tracking-tight">
                      {item.label}
                    </span>
                    {active && (
                      <span className="ml-1 w-1.5 h-1.5 rounded-full bg-brand-300" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom CTA + info block */}
          <div
            className="shrink-0 px-5 pt-5 border-t border-noir-100 bg-white space-y-3"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          >
            <a
              href={siteConfig.booking.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-noir-950 hover:bg-noir-800 text-white font-jakarta text-[13px] font-semibold tracking-[0.05em] transition-colors shadow-[0_8px_24px_-8px_rgba(7,7,8,0.35)] active:scale-[0.99]"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" strokeWidth={2} />
              <span>Book on WhatsApp</span>
            </a>

            <a
              href={siteConfig.contact.phoneHref}
              className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-full border border-noir-950 text-noir-950 hover:bg-noir-950 hover:text-white font-jakarta text-[13px] font-semibold tracking-[0.05em] transition-colors active:scale-[0.99]"
            >
              <Phone className="w-4 h-4" strokeWidth={2} />
              <span>Call {siteConfig.contact.phoneDisplay}</span>
            </a>

            {/* Info row */}
            <div className="pt-3 grid grid-cols-2 gap-3 border-t border-noir-100">
              <div className="flex items-start gap-2">
                <MapPin
                  className="w-3.5 h-3.5 text-brand-500 mt-0.5 shrink-0"
                  strokeWidth={1.75}
                />
                <div className="flex flex-col">
                  <span className="font-jakarta text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500">
                    Location
                  </span>
                  <span className="font-jakarta text-[11px] font-medium text-noir-950 leading-tight">
                    Business Bay
                    <br />
                    Dubai
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock
                  className="w-3.5 h-3.5 text-brand-500 mt-0.5 shrink-0"
                  strokeWidth={1.75}
                />
                <div className="flex flex-col">
                  <span className="font-jakarta text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-500">
                    Hours
                  </span>
                  <span className="font-jakarta text-[11px] font-medium text-noir-950 leading-tight">
                    10 AM – 10 PM
                    <br />
                    Daily
                  </span>
                </div>
              </div>
            </div>

            {/* Social + signature */}
            <div className="flex items-center justify-between pt-3 border-t border-noir-100">
              <span className="font-editorial text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-400">
                Reset · EST. Dubai
              </span>
              {siteConfig.socials?.instagram && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full border border-noir-100 flex items-center justify-center text-noir-950 hover:border-brand-300 hover:text-brand-500 transition-colors"
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
        onClick={() => setIsOpen(true)}
        aria-label="Open Navigation Menu"
        aria-expanded={isOpen}
        className="p-2 rounded-lg text-noir-950 hover:bg-neutral-100 transition-colors flex items-center justify-center active:scale-95"
      >
        <Menu className="w-5 h-5 text-noir-950" strokeWidth={1.75} />
      </button>

      {portalTarget && overlay ? createPortal(overlay, portalTarget) : null}
    </div>
  );
}
