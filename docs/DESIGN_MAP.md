# DESIGN MAP — Provenly Homes

**Version:** 1.0
**Date:** 2026-04-09
**Author:** #2 Kai Richter (UX/UI + Creative Engineer)

---

## Research Summary

### GSAP Awwwards Patterns (from Fullstack-Empire/GSAP-Awwwards-Website)

Key patterns adopted:
1. **SplitText char-by-char reveal** — `SplitText.create(".selector", { type: "chars" })` then `gsap.from(split.chars, { yPercent: 200, stagger: 0.02, ease: "power2.out" })`
2. **ClipPath reveal** — Elements start with `clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)"` (center-collapsed), animate to `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)` (full)
3. **ScrollTrigger timelines** — `gsap.timeline({ scrollTrigger: { trigger, start: "top 60%", end: "top top", scrub: 1.5 } })`
4. **Pinned sections** — `scrollTrigger: { pin: true, start: "10% top", end: "200% top", scrub: 1.5 }`
5. **Word color stagger on scroll** — `SplitText type: "words"` + `gsap.to(words, { color: "#target", stagger: 1, scrollTrigger: { scrub: true } })`
6. **useGSAP hook** — All animations inside `useGSAP(() => { ... })` for React lifecycle safety
7. **ScrollSmoother** — Registered globally: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother)` (we use Lenis instead per ANIMATION_RULES.md)
8. **Mobile branching** — `useMediaQuery` to disable complex animations / swap video for images on mobile

### Aceternity UI Components Selected

| Component | Target Section |
|-----------|---------------|
| **Animated Testimonials** | Testimonials (carousel with image + quote) |
| **3D Card Effect** | Signatures property cards (hover perspective) |
| **Spotlight** | Hero (draw attention to heading) |
| **Timeline** | Process (sticky header + scroll beam) |
| **Floating Navbar** | Header (hides on scroll down, reveals on scroll up) |
| **Moving Border** | CTA buttons (animated border trace) |
| **Sticky Scroll Reveal** | Comparison section (sticky while scrolling) |
| **Card Hover Effect** | Services cards (slide highlight) |
| **Text Generate Effect** | Hero subheading (word-by-word fade) |
| **Tabs** | Pricing tiers (animated background switch) |
| **Expandable Card** | FAQ accordion items |

### React Bits Components Selected

React Bits site uses JS-rendered components; WebFetch could not extract full catalog. Based on known React Bits library:

| Component | Target Section |
|-----------|---------------|
| **SplitText** (React Bits) | Hero heading (char animation) — BUT we use GSAP SplitText instead (per ANIMATION_RULES.md) |
| **BlurText** | Section subtitles (blur-to-sharp on scroll) |
| **CountUp** | Stats section (animated counters) |
| **ScrollReveal** | General section entry animations |

### Next.js 16 Gotchas

| Breaking Change | Impact on Our Build |
|----------------|-------------------|
| **Turbopack default** | Remove `--turbopack` flags from scripts. If we use custom webpack config, must pass `--webpack` flag or migrate. |
| **Async Request APIs** | `cookies()`, `headers()`, `params`, `searchParams` are ALL async now. Every `page.tsx` and `layout.tsx` must `await params`. Use `PageProps<'/path'>` type helper. |
| **`middleware` renamed to `proxy`** | Rename `middleware.ts` to `proxy.ts`, export `proxy()` not `middleware()`. `skipMiddlewareUrlNormalize` becomes `skipProxyUrlNormalize`. |
| **`next/legacy/image` removed** | Use `next/image` only. |
| **`images.domains` deprecated** | Use `images.remotePatterns` instead. |
| **`images.qualities` default `[75]`** | Only quality 75 served unless configured. |
| **`images.minimumCacheTTL` now 4h** | Fine for our property images. |
| **`revalidateTag` needs 2 args** | `revalidateTag('tag', 'max')` — second arg is cacheLife profile. |
| **`cacheLife`/`cacheTag` stable** | Remove `unstable_` prefix from imports. |
| **`experimental.dynamicIO` removed** | Use `cacheComponents: true` instead. |
| **Parallel routes need `default.js`** | Every `@slot` needs explicit `default.js`. |
| **Scroll behavior no longer overridden** | Add `data-scroll-behavior="smooth"` to `<html>` if we want Next.js to handle it (we use Lenis, so skip this). |
| **`next lint` removed** | Use ESLint CLI directly. Flat config is default. |
| **React 19.2** | Adds `ViewTransition`, `useEffectEvent`, `Activity` — consider ViewTransition for page transitions. |
| **React Compiler stable** | Enable `reactCompiler: true` in config for auto-memoization (optional, test first). |

---

## Section Design Map

---

### 1. Header

- **Data source:** `src/data/site.json` → `navigation`, `company`
- **Visual reference:** Aceternity Floating Navbar — hides on scroll down, reveals on scroll up with backdrop blur
- **Library:** CSS/Tailwind (blur, transitions) + Motion (mount/hamburger states)
- **Animation:**
  - Sticky `position: fixed`, `backdrop-filter: blur(12px)`, bg `rgba(58, 58, 58, 0.85)` on scroll
  - Hide/reveal: Motion `animate={{ y: scrollingDown ? -100 : 0 }}` with `transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}`
  - Logo: already visible, no animation
  - Nav links: CSS `transition: color 200ms ease`
  - CTA button: CSS hover `background-color 200ms ease` (charcoal to copper per BRAND_GUIDE)
  - Hamburger (mobile): Motion `AnimatePresence` slide-in overlay from right, `duration: 0.3`
- **Mobile:** Hamburger menu replaces nav links. Full-screen overlay with stagger `staggerChildren: 0.05, delayChildren: 0.1` (Motion)
- **Reduced motion:** Header always visible, no hide/reveal animation, instant state changes
- **React Bits / Aceternity component:** Aceternity `Floating Navbar` pattern (adapt, not install — we build our own)

---

### 2. Hero

- **Data source:** `src/data/homepage.json` → `hero` (heading, subheading, ctas)
- **Visual reference:** GSAP-Awwwards-Website HeroSection — full-screen dark bg, SplitText char reveal, clipPath subtitle
- **Library:** GSAP SplitText + ScrollTrigger
- **Animation:**
  - **Container:** Full viewport height, bg `#3A3A3A`, opacity 0 initially
  - **Heading (H1, Lora 64px):** `SplitText.create(".hero-heading", { type: "chars" })` then `gsap.from(split.chars, { yPercent: 150, stagger: 0.03, duration: 0.8, ease: "power3.out", delay: 0.5 })`. Overflow hidden on parent.
  - **Subheading:** Aceternity `Text Generate Effect` pattern — words fade in sequentially. `gsap.from(words, { opacity: 0, y: 20, stagger: 0.04, duration: 0.6, ease: "power2.out", delay: 1.2 })`
  - **CTAs (2 buttons):** `gsap.from(".hero-ctas", { opacity: 0, y: 30, duration: 0.6, ease: "power2.out", delay: 1.6 })`
  - **Scroll-linked exit:** `gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "1% top", end: "bottom top", scrub: true } }).to(".hero-content", { yPercent: -15, opacity: 0.3 })` — parallax fade on scroll
  - **Spotlight effect:** Subtle radial gradient follows cursor (CSS custom property updated via JS mousemove, NOT GSAP), `background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(184,115,51,0.06), transparent 40%)`
- **Mobile:** No SplitText (chars too small). Heading fades in as whole block: `gsap.from(".hero-heading", { opacity: 0, y: 40, duration: 0.8, ease: "power2.out" })`. No spotlight. No parallax exit.
- **Reduced motion:** All elements visible immediately, no animation. Static layout.
- **React Bits / Aceternity component:** Aceternity `Spotlight` (adapted), Aceternity `Text Generate Effect` (pattern only)

---

### 3. Comparison

- **Data source:** `src/data/homepage.json` → `comparison`
- **Visual reference:** Aceternity Sticky Scroll Reveal — table sticks while rows reveal
- **Library:** GSAP ScrollTrigger
- **Animation:**
  - **Section heading:** `gsap.from(".comparison-heading", { opacity: 0, y: 40, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".comparison", start: "top 75%" } })`
  - **3-column table:** Each row staggers in from bottom. `gsap.from(".comparison-row", { opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".comparison-table", start: "top 65%" } })`
  - **Provenly column highlight:** Left border `2px solid #B87333` with subtle glow `box-shadow: -4px 0 16px rgba(184,115,51,0.1)`
  - **Check/X icons:** Scale in after row appears. `gsap.from(".comparison-icon", { scale: 0, stagger: 0.08, duration: 0.4, ease: "back.out(1.7)", scrollTrigger: { trigger: ".comparison-table", start: "top 60%" } })`
- **Mobile:** Stacked cards instead of table. Same fade-in, no stagger (all at once per card).
- **Reduced motion:** Table and all icons visible immediately. No stagger, no scale.
- **React Bits / Aceternity component:** None (custom table)

---

### 4. Services

- **Data source:** `src/data/services.json` → `services` (array of 6)
- **Visual reference:** Aceternity Card Hover Effect — highlight slides to hovered card
- **Library:** GSAP ScrollTrigger (reveal) + Motion (hover states)
- **Animation:**
  - **Section heading:** `gsap.from(".services-heading", { opacity: 0, y: 40, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".services", start: "top 75%" } })`
  - **6 cards stagger:** `gsap.from(".service-card", { opacity: 0, y: 50, stagger: 0.1, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".services-grid", start: "top 65%" } })`
  - **Card hover (Motion):** `whileHover={{ y: -4, transition: { duration: 0.2 } }}` + CSS `box-shadow` transition from `0 2px 8px rgba(58,58,58,0.06)` to `0 4px 16px rgba(58,58,58,0.1)` over `200ms`
  - **Icon:** Copper line icon, CSS `transition: transform 200ms ease` on hover (subtle `scale(1.05)`)
  - **Background:** `#F5EDE3` cream, `border: 1px solid #B8A48E`, `border-radius: 8px`
- **Mobile:** 2-column grid on tablet, 1-column on phone. Reveal all 6 at once (no stagger). Hover disabled (touch).
- **Reduced motion:** Cards visible, no reveal animation. Hover shadow still transitions (CSS only, acceptable).
- **React Bits / Aceternity component:** Aceternity `Card Hover Effect` pattern (sliding highlight)

---

### 5. Signatures (Property Cards)

- **Data source:** `src/data/properties.json` → `properties` (array of 3)
- **Visual reference:** Aceternity 3D Card Effect — perspective tilt on hover; GSAP-Awwwards parallax images
- **Library:** GSAP ScrollTrigger (parallax) + Motion (hover tilt)
- **Animation:**
  - **Section heading:** Same pattern as Services. `gsap.from` opacity/y, `power2.out`, 800ms, trigger `top 75%`
  - **3 property cards stagger:** `gsap.from(".property-card", { opacity: 0, y: 60, stagger: 0.15, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".signatures-grid", start: "top 65%" } })`
  - **Image parallax:** `gsap.to(".property-image", { yPercent: -10, ease: "none", scrollTrigger: { trigger: ".property-card", start: "top bottom", end: "bottom top", scrub: true } })` — image moves slower than scroll
  - **Hover tilt (Motion):** 3D perspective, `whileHover` rotateX/rotateY based on mouse position within card (Aceternity 3D Card pattern). `transition: { duration: 0.15 }`. Subtle — max 5deg rotation.
  - **Image overlay on hover:** CSS `transition: opacity 200ms` from `rgba(58,58,58,0.2)` to `rgba(58,58,58,0.05)`
- **Mobile:** No parallax. No 3D tilt. Cards stack vertically. Simple fade-in: `gsap.from` opacity 0, y 40, 700ms.
- **Reduced motion:** Cards visible immediately. No parallax, no tilt. Static images.
- **React Bits / Aceternity component:** Aceternity `3D Card Effect`

---

### 6. Process (Timeline)

- **Data source:** `src/data/homepage.json` → `process` (3 steps)
- **Visual reference:** Aceternity Timeline — sticky header with scroll beam follow; GSAP-Awwwards BenefitSection clipPath stagger
- **Library:** GSAP ScrollTrigger
- **Animation:**
  - **Section heading:** `gsap.from` opacity/y pattern, `power2.out`, 800ms, trigger `top 75%`
  - **Timeline line:** Vertical line draws from top to bottom as user scrolls. `gsap.fromTo(".timeline-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".process-timeline", start: "top 60%", end: "bottom 40%", scrub: true } })`. `transform-origin: top center`.
  - **Step 1/2/3 reveal:** Each step triggers when its node hits 60% viewport. `gsap.from(".process-step-N", { opacity: 0, x: -40, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".process-step-N", start: "top 60%" } })`. Alternating sides: odd steps from left (`x: -40`), even from right (`x: 40`).
  - **Step number badge:** `gsap.from(".step-badge-N", { scale: 0, duration: 0.4, ease: "back.out(1.7)", scrollTrigger: { trigger: ".process-step-N", start: "top 60%" } })`
  - **ClipPath reveal for step titles:** Adopt GSAP-Awwwards pattern. Start `clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"`, animate to full. `duration: 0.8, ease: "circ.out"`.
- **Mobile:** Single column, all steps from same side (bottom). Timeline line still draws. Steps reveal at `top 80%`.
- **Reduced motion:** All steps visible. Timeline line fully drawn. No clipPath animation.
- **React Bits / Aceternity component:** Aceternity `Timeline` (pattern reference)

---

### 7. Pricing

- **Data source:** `src/data/pricing.json` → pricing tiers (3)
- **Visual reference:** Aceternity Tabs + Card Hover Effect — animated background switch between tiers
- **Library:** GSAP ScrollTrigger (reveal) + Motion (hover) + CSS (transitions)
- **Animation:**
  - **Section heading:** Standard reveal pattern. `gsap.from` opacity/y, 800ms, `power2.out`, trigger `top 75%`
  - **3 tier cards stagger:** `gsap.from(".pricing-card", { opacity: 0, y: 50, stagger: 0.12, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".pricing-grid", start: "top 65%" } })`
  - **Recommended tier:** Larger card, copper top border `3px solid #B87333`, subtle badge "Empfohlen" with `background: #B87333`, `color: #FFFFFF`
  - **Hover (Motion):** `whileHover={{ y: -6, transition: { duration: 0.2 } }}` + CSS shadow `0 8px 32px rgba(58,58,58,0.12)` transition 200ms
  - **CTA button hover:** CSS `transition: background-color 200ms ease, color 200ms ease` (charcoal to copper)
  - **Feature list items:** Stagger after card appears. `gsap.from(".pricing-feature", { opacity: 0, x: -10, stagger: 0.05, duration: 0.4, ease: "power2.out" })` triggered after parent card completes
- **Mobile:** Cards stack vertically. No stagger between cards (all reveal together). Recommended card first in order.
- **Reduced motion:** All cards visible. No stagger. Hover shadow still works (CSS).
- **React Bits / Aceternity component:** None (custom cards)

---

### 8. Testimonials

- **Data source:** `src/data/testimonials.json` → `testimonials` (array of 6)
- **Visual reference:** Aceternity Animated Testimonials — minimal section with image and quote; GSAP-Awwwards TestimonialSection pinned card stagger
- **Library:** Motion (carousel state/presence) + CSS (transitions)
- **Animation:**
  - **Section heading:** Standard GSAP reveal pattern
  - **Carousel:** Motion `AnimatePresence` for slide transitions. Active testimonial: `initial={{ opacity: 0, x: 50 }}, animate={{ opacity: 1, x: 0 }}, exit={{ opacity: 0, x: -50 }}`, `transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}`
  - **Quote mark (decorative):** Large copper `"` with `opacity: 0.15`, scale `1.2`, no animation (static decoration)
  - **Author image:** `border-radius: 999px`, `border: 2px solid #B8A48E`
  - **Auto-advance:** 6-second interval, pause on hover. Use `useEffect` + `setInterval`.
  - **Navigation dots:** CSS `transition: background-color 200ms` between `#B8A48E` (inactive) and `#B87333` (active)
  - **Navigation arrows:** CSS hover `transition: opacity 150ms`
- **Mobile:** Same carousel, swipe-enabled (touch events). Dots visible. No auto-advance on mobile (battery concern).
- **Reduced motion:** Instant slide swap (no x-translation). `transition: { duration: 0 }`.
- **React Bits / Aceternity component:** Aceternity `Animated Testimonials`

---

### 9. FAQ

- **Data source:** `src/data/faq.json` → `faqs` (array of 7)
- **Visual reference:** Clean accordion, Aceternity Expandable Card pattern
- **Library:** Motion (expand/collapse layout animation)
- **Animation:**
  - **Section heading:** Standard GSAP reveal
  - **Accordion items stagger on enter:** `gsap.from(".faq-item", { opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".faq-list", start: "top 70%" } })`
  - **Expand/collapse (Motion):** `motion.div` with `layout` prop. `initial={{ height: 0, opacity: 0 }}`, `animate={{ height: "auto", opacity: 1 }}`, `transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}`. Use `AnimatePresence` for presence toggle.
  - **Chevron rotate:** Motion `animate={{ rotate: isOpen ? 180 : 0 }}`, `transition={{ duration: 0.2 }}`
  - **Border:** `1px solid #B8A48E` between items. Active item: `border-left: 2px solid #B87333`
- **Mobile:** Same accordion. Touch-friendly hit target `min-height: 48px`.
- **Reduced motion:** Instant expand/collapse. `transition: { duration: 0 }`. Chevron snaps.
- **React Bits / Aceternity component:** Aceternity `Expandable Card` (pattern adapted for accordion)

---

### 10. Stats

- **Data source:** `src/data/homepage.json` → (stats embedded in relevant section, or derived from services/properties counts)
- **Visual reference:** Animated counter pattern (common Awwwards technique)
- **Library:** GSAP ScrollTrigger
- **Animation:**
  - **Counter animation:** `gsap.from(".stat-number", { textContent: 0, duration: 2, ease: "power1.out", snap: { textContent: 1 }, scrollTrigger: { trigger: ".stats-section", start: "top 70%", toggleActions: "play none none none" } })`. Uses GSAP snap to ensure integer display.
  - **Stat items stagger:** `gsap.from(".stat-item", { opacity: 0, y: 30, stagger: 0.15, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".stats-section", start: "top 70%" } })`
  - **Suffix animation:** `+`, `%`, `x` characters appear after number completes. `gsap.from(".stat-suffix", { opacity: 0, scale: 0.5, duration: 0.3, ease: "back.out(1.7)", delay: 2 })` (chained after counter)
  - **Background:** Cream `#F5EDE3`, numbers in Lora 48px `#3A3A3A`, labels in Plus Jakarta Sans 16px `#5A5A5A`
- **Mobile:** Same counters but `duration: 1.5` (shorter). 2-column grid.
- **Reduced motion:** Final numbers shown immediately. No counting animation.
- **React Bits / Aceternity component:** React Bits `CountUp` pattern (but implemented with GSAP per ANIMATION_RULES)

---

### 11. CTASection

- **Data source:** `src/data/homepage.json` → (CTA text, or hardcoded in component)
- **Visual reference:** GSAP-Awwwards full-dark sections; Aceternity Moving Border for button
- **Library:** GSAP ScrollTrigger + CSS
- **Animation:**
  - **Background:** `#3A3A3A` charcoal, full-width
  - **Heading reveal:** `gsap.from(".cta-heading", { opacity: 0, y: 50, duration: 1, ease: "power2.out", scrollTrigger: { trigger: ".cta-section", start: "top 65%" } })`
  - **Subtext:** `gsap.from(".cta-subtext", { opacity: 0, y: 30, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".cta-section", start: "top 60%" } })`, `delay: 0.2` offset from heading
  - **CTA button:** Aceternity Moving Border pattern — animated border trace around button using CSS `conic-gradient` + `@keyframes rotate`. Copper `#B87333` bg, white text. CSS hover: `background: #D4955A`, `transition: 200ms`
  - **Decorative:** Subtle copper line accent, `opacity: 0.2`, static
- **Mobile:** Same dark section. Button full-width. No moving border (too distracting on small screens). Simple copper button.
- **Reduced motion:** Heading and subtext visible immediately. No moving border animation.
- **React Bits / Aceternity component:** Aceternity `Moving Border`

---

### 12. Footer

- **Data source:** `src/data/site.json` → `footer`, `navigation`, `company`, `address`, `phone`, `social`
- **Visual reference:** GSAP-Awwwards FooterSection — dark section with clean columns
- **Library:** CSS/Tailwind only (no scroll animations needed for footer)
- **Animation:**
  - **Background:** `#3A3A3A` charcoal
  - **Link hover:** CSS `transition: color 200ms ease` from `#F5EDE3` to `#B87333`
  - **Social icons hover:** CSS `transition: opacity 150ms, transform 150ms` → `opacity: 0.8` + `translateY(-2px)`
  - **Logo:** `logo-full-dark.svg` (copper icon + cream wordmark)
  - **Divider:** `1px solid rgba(245, 237, 227, 0.15)`
  - **No scroll-triggered animations** — footer is at page bottom, user already committed to scrolling there
- **Mobile:** Single column stack. Same hover states (touch-friendly padding).
- **Reduced motion:** No changes needed (already CSS-only).
- **React Bits / Aceternity component:** None

---

### 13. CookieBanner

- **Data source:** Hardcoded text (GDPR compliant copy)
- **Visual reference:** Clean bottom bar, blur background
- **Library:** Motion (AnimatePresence)
- **Animation:**
  - **Enter:** `initial={{ y: 100, opacity: 0 }}, animate={{ y: 0, opacity: 1 }}`, `transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 1.5 }}` (delay so it doesn't compete with Hero)
  - **Exit (on accept/decline):** `exit={{ y: 100, opacity: 0 }}`, `transition={{ duration: 0.3 }}`
  - **Background:** `backdrop-filter: blur(12px)`, `background: rgba(58, 58, 58, 0.9)`
  - **Buttons:** CSS hover transitions, 200ms
- **Mobile:** Full-width bottom sheet. Larger tap targets.
- **Reduced motion:** Instant appear/disappear. No slide animation.
- **React Bits / Aceternity component:** None

---

### 14. FloatingContacts (Mobile Sticky)

- **Data source:** `src/data/site.json` → `phone`, `emailCanonical`
- **Visual reference:** Floating action bar, common in mobile-first property sites
- **Library:** Motion (visibility toggle) + CSS
- **Animation:**
  - **Appear:** Shows after scrolling past Hero (scroll threshold ~100vh). Motion `animate={{ y: scrolledPastHero ? 0 : 80 }}`, `transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}`
  - **Background:** `backdrop-filter: blur(12px)`, `background: rgba(58, 58, 58, 0.9)`, `border-top: 1px solid rgba(245, 237, 227, 0.15)`
  - **Phone + Email icons:** Copper `#B87333`, `24px`. CSS hover: `opacity: 0.8`, `150ms`
  - **Position:** `fixed bottom-0 left-0 right-0`, `z-index: 40` (below header z-50)
- **Mobile:** Only visible on screens `< 768px`. Desktop: hidden entirely.
- **Reduced motion:** Instant show/hide.
- **React Bits / Aceternity component:** None

---

### 15. ContactForm

- **Data source:** `src/data/contact-form.json` → `sections` (4 sections, 13 fields total)
- **Visual reference:** Aceternity Signup Form (Motion-powered form with clean inputs)
- **Library:** Motion (field focus states, section transitions) + CSS (input styling)
- **Animation:**
  - **Form sections stagger on load:** `gsap.from(".form-section", { opacity: 0, y: 30, stagger: 0.15, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: ".contact-form", start: "top 70%" } })`
  - **Input focus (CSS):** `transition: border-color 200ms ease, box-shadow 200ms ease`. Default `border: 1px solid #B8A48E`, focus `border: 1px solid #B87333` + `box-shadow: 0 0 0 3px rgba(184, 115, 51, 0.1)`
  - **Label float:** CSS `transition: transform 200ms ease, font-size 200ms ease` (label moves up on focus)
  - **Validation error:** Motion `initial={{ opacity: 0, y: -5 }}, animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.2 }}`
  - **Submit button:** Loading state with spinner, success state with checkmark. Motion `AnimatePresence` mode="wait" to swap states.
  - **Success message:** Motion `initial={{ scale: 0.95, opacity: 0 }}, animate={{ scale: 1, opacity: 1 }}`, `transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}`
- **Mobile:** Full-width inputs. Single column. Same animations.
- **Reduced motion:** Instant focus/blur states. No stagger on load. Validation errors appear instantly.
- **React Bits / Aceternity component:** Aceternity `Signup Form` (pattern reference)

---

### 16. Scroll Polish (Lenis + Overall Feel)

- **Data source:** N/A (global configuration)
- **Visual reference:** GSAP-Awwwards ScrollSmoother (smooth: 3) — we use Lenis equivalent
- **Library:** Lenis (smooth scroll)
- **Configuration:**
  ```
  Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  })
  ```
  - **duration 1.2:** Smooth but not sluggish (GSAP-Awwwards uses smooth: 3 which is too aggressive for corporate)
  - **easing:** Exponential ease-out — fast start, gentle stop
  - **wheelMultiplier: 1:** Native feel, no speed boost
  - **touchMultiplier: 2:** Mobile needs more responsiveness
- **Integration:**
  - Initialize Lenis in root layout `useEffect`
  - Sync with GSAP: `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add((time) => { lenis.raf(time * 1000) })` + `gsap.ticker.lagSmoothing(0)`
  - Lenis handles scroll, GSAP ScrollTrigger reads scroll position — they do NOT fight
- **Anchor links:** Lenis `lenis.scrollTo('#section', { offset: -80, duration: 1.2 })` (offset for fixed header)
- **Mobile:** Same Lenis config. `touchMultiplier: 2` ensures swipe feels natural.
- **Reduced motion:** Disable Lenis entirely. Native browser scroll. `if (prefersReducedMotion) return` before Lenis init.
- **React Bits / Aceternity component:** None

---

## Global Animation Registration

```typescript
// In root layout or providers file:
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Lenis + GSAP sync (see Section 16)
```

## Shared Animation Presets

For consistency, define reusable animation configs:

```typescript
// lib/animations.ts
export const REVEAL = {
  from: { opacity: 0, y: 40 },
  duration: 0.8,
  ease: "power2.out",
  triggerStart: "top 75%",
}

export const STAGGER = {
  from: { opacity: 0, y: 30 },
  stagger: 0.1,
  duration: 0.7,
  ease: "power2.out",
  triggerStart: "top 65%",
}

export const HEADING_REVEAL = {
  from: { opacity: 0, y: 40 },
  duration: 0.8,
  ease: "power2.out",
  triggerStart: "top 75%",
}

export const CHAR_SPLIT = {
  from: { yPercent: 150 },
  stagger: 0.03,
  duration: 0.8,
  ease: "power3.out",
}

export const CLIPPATH_REVEAL = {
  from: "polygon(0 0, 0 0, 0 100%, 0 100%)",
  to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  duration: 0.8,
  ease: "circ.out",
}

export const MOTION_PAGE_EASE = [0.25, 0.1, 0.25, 1]
export const MOTION_HOVER_DURATION = 0.2
```

---

*Design map created by #2 Kai Richter. References: ANIMATION_RULES.md, BRAND_GUIDE.md, GSAP-Awwwards-Website repo, Aceternity UI, React Bits.*
