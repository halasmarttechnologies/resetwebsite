import type { Metadata } from "next";
import { fontSans, fontSerif, fontDisplay, fontAvalance, fontOutfit } from "@/styles/fonts";
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
      className={`${fontSans.variable} ${fontSerif.variable} ${fontDisplay.variable} ${fontAvalance.variable} ${fontOutfit.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-noir-900 text-noir-50 font-sans antialiased selection:bg-brand-gold/30 selection:text-brand-100 flex min-h-screen flex-col">
        <SmoothScrollProvider>
          <div className="w-full relative flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
