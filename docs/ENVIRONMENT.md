# Environment Configuration Guide — Reset Men Salon

## 1. Environment Variable Reference

| Variable Name | Required | Default / Example | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://resetmensalon.ae` | Base canonical domain |
| `NEXT_PUBLIC_SITE_NAME` | Yes | `Reset Men Salon` | Global application title |
| `NEXT_PUBLIC_SITE_LOCALE` | Yes | `en_AE` | Primary locale tag |
| `NEXT_PUBLIC_PHONE_NUMBER` | Yes | `+971 4 565 5688` | Display telephone |
| `NEXT_PUBLIC_PHONE_CALL` | Yes | `tel:+97145655688` | Tel link protocol |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`| Yes | `+971 58 102 1540` | WhatsApp display number |
| `NEXT_PUBLIC_WHATSAPP_LINK` | Yes | `https://wa.me/971581021540`| Direct concierge link |
| `NEXT_PUBLIC_SALON_EMAIL` | Yes | `info@resetmensalon.ae` | Direct email address |
| `CMS_PROVIDER` | Yes | `mock` (`sanity` / `contentful`)| Active CMS driver |
| `SANITY_PROJECT_ID` | Optional | `""` | Sanity Studio project ID |
| `SANITY_DATASET` | Optional | `production` | Sanity dataset name |
| `RESEND_API_KEY` | Optional | `re_...` | Transactional email key |
| `DATABASE_URL` | Optional | `postgresql://...` | Database connection string |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | `G-...` | Google Analytics 4 |
| `NEXT_PUBLIC_SENTRY_DSN` | Optional | `https://...` | Sentry error tracking |

---

## 2. Setup Instructions
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Verify environment configuration using the verification script:
   ```bash
   npm run validate-env
   ```
