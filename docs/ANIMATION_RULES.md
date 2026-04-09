# Animation Rules — Provenly Homes

## Library Responsibilities

| Library | Scope | Use For |
|---------|-------|---------|
| **GSAP + ScrollTrigger** | Scroll-linked animations, timelines, complex sequences | Section reveals, scroll progress, pinned sections, counter animations |
| **GSAP SplitText** | Text splitting and animation | Hero heading char-by-char, word reveals, text stagger |
| **Motion (Framer Motion)** | React UI state, layout, presence | Component mount/unmount, hover/tap states, layout transitions, AnimatePresence for page transitions |
| **Lenis** | Smooth scrolling | Global smooth scroll, scroll velocity for parallax |
| **CSS/Tailwind** | Simple transitions | Hover color changes, focus states, opacity transitions |

## Decision Rules

1. **"Does it respond to scroll position?"** → GSAP ScrollTrigger
2. **"Does it animate text characters/words?"** → GSAP SplitText
3. **"Does it animate on React state change (hover, mount, layout)?"** → Motion
4. **"Is it a simple color/opacity transition?"** → CSS/Tailwind `transition-*`
5. **"Does it need smooth scrolling?"** → Lenis (global, not per-element)

## Never

- Never use GSAP for hover states (use Motion or CSS)
- Never use Motion for scroll-linked animations (use GSAP)
- Never animate layout properties (width, height, top, left) with GSAP — use Motion's layout animations
- Never use both GSAP and Motion on the same element simultaneously

## Easing Standards

| Context | Easing | Value |
|---------|--------|-------|
| Section reveal | Smooth out | `power2.out` (GSAP) |
| Text appear | Gentle | `power3.out` (GSAP) |
| Hover | Quick | `duration: 0.2` (CSS/Motion) |
| Page transition | Smooth | `ease: [0.25, 0.1, 0.25, 1]` (Motion) |

## Duration Standards

| Animation Type | Duration |
|---------------|----------|
| Micro (hover, focus) | 150-200ms |
| Element reveal | 600-800ms |
| Section reveal | 800-1200ms |
| Text stagger (per char) | 30-50ms delay |
| Page transition | 300-500ms |

## Stagger Pattern

```
Container appears → children stagger in
Delay between children: 100-150ms
Use GSAP stagger for scroll-triggered
Use Motion staggerChildren for mount-triggered
```

## prefers-reduced-motion

When `prefers-reduced-motion: reduce`:
- GSAP: skip all ScrollTrigger animations, show elements immediately
- Motion: set `transition: { duration: 0 }`
- Lenis: disable smooth scroll, use native
- CSS: `transition-duration: 0.01ms`
