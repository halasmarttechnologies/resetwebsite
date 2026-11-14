"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
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

  // Close when pathname changes
  React.useEffect(() => {
    setIsOpen(false);
    setServicesExpanded(false);
  }, [pathname]);

  // Complete background scroll freeze (iOS Safari, Android Chrome, Desktop + Lenis)
  React.useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const win = window as unknown as { __lenis?: { stop: () => void; start: () => void } };
    win.__lenis?.stop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);
      win.__lenis?.start();
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
    setServicesExpanded(false);
  };

  const serviceLinks = [
    { label: "Hair & Beard", href: "/services/hair-and-beard" },
    { label: "Japanese Head Spa", href: "/services/japanese-head-spa" },
    { label: "Facial Care", href: "/services/facial" },
    { label: "Hair Treatment & Colouring", href: "/services/hair-treatment-and-colouring" },
    { label: "Massage & Body Rituals", href: "/services/massage" },
    { label: "Executive Nails", href: "/services/nails" },
    { label: "Waxing & Detailing", href: "/services/waxing" },
  ];

  return (
    <div className="flex items-center">
      {/* Trigger Button - Clean & highly responsive */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Navigation Menu"
        aria-expanded={isOpen}
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-noir-950 transition-colors hover:bg-neutral-100 active:scale-95"
      >
        <Menu className="h-6 w-6" strokeWidth={2} />
      </button>

      {/* Clean Full-Screen Fixed Mobile Menu Overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[9999] flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden bg-white text-noir-950"
        >
          {/* Top Bar: Brand Logo & Close Button */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-100 bg-white px-6">
            <Link
              href="/"
              onClick={closeMenu}
              className="inline-flex items-center py-1"
              aria-label="Reset Men Salon Home"
            >
              <Image
                src="/logo.webp"
                alt="Reset Men Salon"
                width={64}
                height={64}
                className="h-10 w-auto object-contain brightness-0"
                priority
              />
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close Navigation Menu"
              className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-noir-950 transition-colors hover:bg-neutral-100 active:scale-95"
            >
              <X className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>

          {/* Simple, Neat Services & Navigation Menu - Fixed and cleanly contained */}
          <div
            data-lenis-prevent="true"
            className="flex-1 overflow-y-auto overscroll-contain px-6 py-6"
          >
            <div className="space-y-3">
              <div>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className={`block py-2 font-editorial text-2xl tracking-tight transition-colors ${
                    pathname === "/" ? "font-bold text-black" : "text-neutral-800 hover:text-black"
                  }`}
                >
                  Home
                </Link>
              </div>

              {/* Services Section with Direct Clean Accordion */}
              <div className="border-y border-neutral-100 py-1">
                <div className="flex items-center justify-between py-1.5">
                  <Link
                    href="/services"
                    onClick={closeMenu}
                    className="font-editorial text-2xl font-bold tracking-tight text-noir-950 hover:text-black"
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    onClick={() => setServicesExpanded((prev) => !prev)}
                    aria-label="Toggle services list"
                    className="cursor-pointer p-2 text-neutral-500 hover:text-black"
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
                        servicesExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {servicesExpanded && (
                  <div className="mb-2 mt-1 space-y-2 border-l-2 border-neutral-200 pl-3">
                    <Link
                      href="/services"
                      onClick={closeMenu}
                      className="block py-1 font-jakarta text-sm font-semibold text-noir-950 hover:underline"
                    >
                      All Services & Rates →
                    </Link>
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={closeMenu}
                        className={`block py-1 font-jakarta text-sm transition-colors ${
                          pathname === service.href
                            ? "font-bold text-black"
                            : "text-neutral-600 hover:text-black"
                        }`}
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    openPriceList();
                  }}
                  className="w-full cursor-pointer py-2 text-left font-editorial text-2xl tracking-tight text-neutral-800 transition-colors hover:text-black"
                >
                  Price List
                </button>
              </div>

              <div>
                <Link
                  href="/about"
                  onClick={closeMenu}
                  className={`block py-2 font-editorial text-2xl tracking-tight transition-colors ${
                    pathname === "/about"
                      ? "font-bold text-black"
                      : "text-neutral-800 hover:text-black"
                  }`}
                >
                  About
                </Link>
              </div>

              <div>
                <Link
                  href="/blog"
                  onClick={closeMenu}
                  className={`block py-2 font-editorial text-2xl tracking-tight transition-colors ${
                    pathname === "/blog"
                      ? "font-bold text-black"
                      : "text-neutral-800 hover:text-black"
                  }`}
                >
                  Journal
                </Link>
              </div>

              <div>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className={`block py-2 font-editorial text-2xl tracking-tight transition-colors ${
                    pathname === "/contact"
                      ? "font-bold text-black"
                      : "text-neutral-800 hover:text-black"
                  }`}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
