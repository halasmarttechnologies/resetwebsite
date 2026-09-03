# Animation System & Motion Architecture — Reset Men Salon

## 1. Animation Philosophy
- **Editorial & Intentional**: Animations must never feel game-like or flashy. Motion serves to guide the eye and convey the quiet luxury of Reset Men Salon.
- **Timing & Curves**:
  - `luxury-ease`: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy entrance with lingering decelerated settle)
  - `smooth-ease`: `cubic-bezier(0.4, 0, 0.2, 1)` (standard UI transitions)
- **Duration Guidelines**:
  - Micro-interactions (hovers, focus): `200ms - 300ms`
  - Section entrances / reveals: `600ms - 900ms`
  - Page transitions: `400ms`

---

## 2. Motion Architecture Stack

### 1. Lenis Smooth Scrolling (`src/components/animation/smooth-scroll.tsx`)
- Provides inertial physics to browser scrolling.
- Automatically disables when `prefers-reduced-motion` is detected.
- Bridges scroll coordinates to GSAP `ScrollTrigger`.

### 2. Framer Motion (`src/components/animation/motion-wrapper.tsx`)
- Standardized declarative animation variants:
  - `fadeInUp`: `opacity: 0, y: 24` -> `opacity: 1, y: 0`
  - `staggerContainer`: Children staggered by `0.08s`
  - `scaleReveal`: `opacity: 0, scale: 0.96` -> `opacity: 1, scale: 1.0`
  - `luxuryLineReveal`: Width expands from `0%` to `100%`

### 3. GSAP Parallax (`src/lib/animation/gsap.ts`)
- Reserved strictly for high-impact pinned stages (such as the Signature Japanese Head Spa interactive ritual walkthrough and cinematic hero parallax).

---

## 3. Accessibility & Reduced Motion
- All animation hooks inspect `window.matchMedia('(prefers-reduced-motion: reduce)')`.
- If reduced motion is requested:
  - Lenis smooth scrolling is deactivated.
  - Framer Motion durations collapse to `0.01s` or immediate opacity toggle without translations (`translateY: 0`).
