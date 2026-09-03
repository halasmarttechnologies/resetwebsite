import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navigationConfig } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { MapPin, Phone, Mail, Instagram, MessageSquare } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-noir-950 border-t border-noir-800 text-noir-300 pt-16 pb-12">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-noir-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-bold tracking-cinematic text-noir-50">
                RESET
              </span>
              <span className="block text-2xs uppercase tracking-luxury text-noir-400 font-medium">
                Men Salon &bull; Dubai
              </span>
            </Link>

            <p className="text-sm text-noir-400 max-w-sm leading-relaxed">
              Dubai&apos;s premier luxury men&apos;s grooming destination and Japanese Head Spa sanctuary located in Business Bay.
            </p>

            <div className="pt-2 flex items-center gap-3 text-noir-400">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded bg-noir-900 border border-noir-800 hover:text-brand-gold hover:border-brand-gold/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.booking.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Concierge"
                className="p-2 rounded bg-noir-900 border border-noir-800 hover:text-brand-gold hover:border-brand-gold/40 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-luxury text-noir-100">
              Grooming Menu
            </h3>
            <ul className="space-y-2 text-xs">
              {navigationConfig.footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-gold transition-colors text-noir-400"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-luxury text-noir-100">
              The Salon
            </h3>
            <ul className="space-y-2 text-xs">
              {navigationConfig.footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-brand-gold transition-colors text-noir-400"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-luxury text-noir-100">
              Business Bay Sanctuary
            </h3>
            <ul className="space-y-2.5 text-xs text-noir-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <span>Business Bay, Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href={siteConfig.contact.phoneHref} className="hover:text-noir-100">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-noir-100">
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs text-noir-500">
          <p>&copy; {currentYear} Reset Men Salon LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {navigationConfig.footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-noir-300">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
