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

  // Close menu on navigation
  React.useEffect(() => {
    setIsOpen(false);
    setServicesExpanded(false);
  }, [pathname]);

  const close = () => {
    setIsOpen(false);
    setServicesExpanded(false);
  };

  const navLinkClass = (active: boolean) =>
    `flex items-center justify-between w-full font-jakarta text-[17px] font-semibold py-4 px-5 transition-colors border-b border-neutral-100 ${
      active ? "text-brand-500" : "text-noir-950 active:bg-neutral-50"
    }`;

  return (
    <div className="md:hidden flex items-center">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Navigation Menu"
        aria-expanded={isOpen}
        className="p-2 rounded-lg text-noir-950 hover:bg-neutral-100 transition-colors flex items-center justify-center active:scale-95"
      >
        <Menu className="w-5 h-5 text-noir-950" />
      </button>

      {/* Full-Screen Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 flex flex-col bg-white text-noir-950"
          style={{ zIndex: 9999, top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-white shrink-0">
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
                <span className="font-editorial text-base font-bold tracking-wider uppercase text-noir-950 leading-none">
                  RESET
                </span>
                <span className="font-jakarta text-[9px] font-semibold tracking-[0.15em] uppercase text-neutral-500 mt-0.5">
                  Men Salon Dubai
                </span>
              </div>
            </Link>

            <button
              onClick={close}
              aria-label="Close Navigation Menu"
              className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-noir-950 flex items-center justify-center transition-colors active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Nav Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <nav className="flex flex-col">
              {/* Home */}
              <Link href="/" onClick={close} className={navLinkClass(pathname === "/")}>
                <span>Home</span>
                <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0" />
              </Link>

              {/* About */}
              <Link href="/about" onClick={close} className={navLinkClass(pathname === "/about")}>
                <span>About</span>
                <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0" />
              </Link>

              {/* Services accordion */}
              <div className="border-b border-neutral-100">
                <div className="flex items-center">
                  <Link
                    href="/services"
                    onClick={close}
                    className={`flex-1 font-jakarta text-[17px] font-semibold py-4 pl-5 pr-2 transition-colors ${
                      pathname.startsWith("/services") ? "text-brand-500" : "text-noir-950"
                    }`}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    onClick={() => setServicesExpanded((v) => !v)}
                    aria-label="Toggle Services Submenu"
                    className="p-4 text-neutral-500"
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        servicesExpanded ? "rotate-180 text-brand-500" : ""
                      }`}
                    />
                  </button>
                </div>

                {servicesExpanded && (
                  <div className="bg-neutral-50 px-5 pb-3 flex flex-col gap-0.5">
                    {(
                      navigationConfig.mainNav.find((n) => n.href === "/services")?.children || []
                    ).map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={close}
                        className={`block py-2.5 px-3 rounded-lg text-[14px] font-jakarta font-medium transition-colors ${
                          pathname === sub.href
                            ? "text-brand-500 bg-brand-50"
                            : "text-neutral-700 hover:text-noir-950 hover:bg-neutral-100"
                        }`}
                      >
                        {sub.title}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      onClick={close}
                      className="inline-flex items-center gap-1.5 py-2 px-3 text-xs font-jakarta font-bold text-brand-600 hover:underline mt-1"
                    >
                      <span>View All Services</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="border-b border-neutral-100 flex items-center">
                <Link
                  href="/pricing"
                  onClick={close}
                  className={`flex-1 font-jakarta text-[17px] font-semibold py-4 px-5 transition-colors ${
                    pathname === "/pricing" ? "text-brand-500" : "text-noir-950"
                  }`}
                >
                  Pricing
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    close();
                    openPriceList();
                  }}
                  className="mr-5 text-xs font-jakarta font-bold px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-800 hover:bg-noir-950 hover:text-white transition-colors shrink-0"
                >
                  Quick View
                </button>
              </div>

              {/* Blog / Journal */}
              <Link href="/blog" onClick={close} className={navLinkClass(pathname === "/blog")}>
                <span>Journal</span>
                <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0" />
              </Link>

              {/* Contact */}
              <Link href="/contact" onClick={close} className={navLinkClass(pathname === "/contact")}>
                <span>Contact</span>
                <ArrowRight className="w-4 h-4 text-neutral-400 shrink-0" />
              </Link>
            </nav>
          </div>

          {/* Bottom CTA Area */}
          <div
            className="shrink-0 p-5 border-t border-neutral-100 bg-neutral-50/70 space-y-3"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          >
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
