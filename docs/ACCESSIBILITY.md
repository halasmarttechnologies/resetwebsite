# Accessibility (a11y) Strategy — Reset Men Salon

## 1. Compliance Standard
Target: **WCAG 2.1 Level AA** compliance across all viewports and input modalities.

---

## 2. Core Implementation Rules
1. **Color Contrast**: Minimum contrast ratio of `4.5:1` for normal text and `3:1` for large headlines and interactive icons against the dark obsidian canvas.
2. **Keyboard Navigation**:
   - Visible, distinct focus ring (`ring-2 ring-brand-gold ring-offset-2 ring-offset-noir-900`) on all interactive elements.
   - Logical tab index order across all navigation menus, modals, and booking drawers.
   - Escape key dismisses modals and mobile drawers.
3. **Semantic Hierarchy**:
   - Exact single `<h1>` per page.
   - Strict hierarchical nesting: `<h1>` -> `<h2>` -> `<h3>`.
4. **Screen Reader Support**:
   - Meaningful `alt` text on all imagery; decorative background textures marked `aria-hidden="true"`.
   - Dynamic form validation messages accompanied by `aria-live="polite"`.
5. **Reduced Motion**:
   - Full support for `prefers-reduced-motion: reduce` across Lenis and Framer Motion.
