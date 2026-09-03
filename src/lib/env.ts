import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://resetmensalon.ae"),
  NEXT_PUBLIC_SITE_NAME: z.string().default("Reset Men Salon"),
  NEXT_PUBLIC_SITE_LOCALE: z.string().default("en_AE"),
  NEXT_PUBLIC_PHONE_NUMBER: z.string().default("+971 4 565 5688"),
  NEXT_PUBLIC_PHONE_CALL: z.string().default("tel:+97145655688"),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().default("+971 58 102 1540"),
  NEXT_PUBLIC_WHATSAPP_LINK: z.string().default("https://wa.me/971581021540"),
  NEXT_PUBLIC_SALON_EMAIL: z.string().email().default("info@resetmensalon.ae"),
  CMS_PROVIDER: z.enum(["mock", "sanity", "contentful", "strapi"]).default("mock"),
  SANITY_PROJECT_ID: z.string().optional(),
  SANITY_DATASET: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SITE_LOCALE: process.env.NEXT_PUBLIC_SITE_LOCALE,
  NEXT_PUBLIC_PHONE_NUMBER: process.env.NEXT_PUBLIC_PHONE_NUMBER,
  NEXT_PUBLIC_PHONE_CALL: process.env.NEXT_PUBLIC_PHONE_CALL,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_WHATSAPP_LINK: process.env.NEXT_PUBLIC_WHATSAPP_LINK,
  NEXT_PUBLIC_SALON_EMAIL: process.env.NEXT_PUBLIC_SALON_EMAIL,
  CMS_PROVIDER: process.env.CMS_PROVIDER,
  SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  SANITY_DATASET: process.env.SANITY_DATASET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
