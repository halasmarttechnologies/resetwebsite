import type { Metadata } from "next";
import {
  fontJakarta,
  fontEditorial,
  fontInter,
  fontSerif,
  fontDisplay,
  fontOutfit,
  fontSyne,
} from "@/styles/fonts";
import "@/styles/globals.css";
import { defaultSeoConfig } from "@/config/seo";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/animation/smooth-scroll";
import { generateHairSalonJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = defaultSeoConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateHairSalonJsonLd();

  return (
    <html
      lang="en"
      className={`${fontJakarta.variable} ${fontEditorial.variable} ${fontInter.variable} ${fontSerif.variable} ${fontDisplay.variable} ${fontOutfit.variable} ${fontSyne.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-noir-900 font-sans antialiased selection:bg-brand-gold/30 selection:text-noir-900 flex min-h-screen flex-col">
        <SmoothScrollProvider>
          <div className="w-full relative flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1 w-full bg-white">{children}</main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
