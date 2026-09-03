# Design System & Token Foundation — Reset Men Salon

## 1. Aesthetic Vision
- **Mood**: Premium, Masculine, Editorial, Minimal, Sophisticated, Cinematic.
- **Atmosphere**: Architectural darkness punctuated with warm bronze and antique gold accents.
- **Strict Anti-Patterns**:
  - No generic barber-template clichés (barber poles, cartoon scissors, neon glows).
  - No gratuitous glassmorphism, heavy rainbow gradients, or loud animations.
  - Every border, shadow, and transition must convey restraint, purpose, and prestige.

---

## 2. Color Palette & Semantic Tokens

### Canvas & Surfaces (Noir & Obsidian)
- `noir-950` (`#070708`): Deepest background canvas
- `noir-900` (`#0B0B0C`): Primary page canvas
- `noir-850` (`#101012`): Secondary surface
- `noir-800` (`#161618`): Card & elevated module surface
- `noir-700` (`#242429`): Structural divider & subtle border

### Brand Accents (Warm Bronze & Gold)
- `brand-gold` (`#D4AF37`): Primary brand highlight, active states, key CTAs
- `brand-bronze` (`#C29B38`): Secondary metallic tone, badges, subheadings
- `brand-sand` (`#DFD3C3`): Warm champagne off-white for soft contrast

### Typography & Neutrals
- `text-primary` (`#F5F5F7`): High contrast headings and hero titles
- `text-secondary` (`#A1A1AA`): Body paragraphs and descriptive metadata
- `text-muted` (`#71717A`): Captions, timestamps, disabled states

---

## 3. Typography Architecture

### Font Families
1. **Editorial Display (Headings & Accents)**: `Cinzel` / `Cormorant Garamond` (Serif / Editorial Luxury)
2. **Body & Interface**: `Inter` / `Outfit` (Modernist Sans-serif with crisp legibility)

### Scale & Hierarchy
- `display-2xl`: `4.5rem` / `72px` (Hero headlines, letter spacing `-0.03em`)
- `display-xl`: `3.75rem` / `60px` (Section headlines, letter spacing `-0.025em`)
- `display-lg`: `3.0rem` / `48px` (Category titles, letter spacing `-0.02em`)
- `heading-md`: `2.25rem` / `36px` (Card group titles)
- `heading-sm`: `1.5rem` / `24px` (Service item titles)
- `body-lg`: `1.125rem` / `18px` (Lead paragraph text)
- `body-md`: `1.0rem` / `16px` (Standard body text)
- `caption`: `0.875rem` / `14px` (Meta info, pricing details)
- `overline`: `0.75rem` / `12px` (All-caps tracked uppercase labels: `letter-spacing: 0.25em`)

---

## 4. Spacing, Grid & Layout
- **Base Grid**: 8px modular scale (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`)
- **Container Max Widths**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1440px
- **Section Padding**: `py-20 lg:py-32` for spacious, breathable luxury flow.

---

## 5. UI Component Primitives
- **Button System**:
  - `primary`: Bronze/Gold solid button with dark text, subtle shine on hover.
  - `secondary`: Noir surface with 1px bronze border and light text.
  - `ghost`: Transparent button with animated underline.
  - `link`: Editorial arrow link with hover displacement.
- **Cards**:
  - `service-card`: Dark obsidian surface, 1px subtle border (`border-noir-700`), hover micro-lift.
  - `pricing-card`: Highlighted luxury package card with bronze badge and feature breakdown.
