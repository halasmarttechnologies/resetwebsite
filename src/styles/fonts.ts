import {
  Cormorant_Garamond,
  Cinzel,
  Outfit,
  Plus_Jakarta_Sans,
  Syne,
  Inter,
} from "next/font/google";

export const fontEditorial = Outfit({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

export const fontOutfit = fontEditorial;

export const fontSyne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["700", "800"],
});

export const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const fontSans = fontJakarta;

export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontDisplay = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});
