# Lumen & Ash — React + Vite

The perfume brand site, rebuilt as a proper React + Vite project (previously a single static HTML file).

## Run it

```bash
npm install
npm run dev
```

Open the printed localhost URL. For a production build:

```bash
npm run build
npm run preview
```

## What changed from the HTML version

- **Animated bottles** (`src/components/Bottle.jsx`) — layered glass gradient, a wavy liquid
  surface, rising bubbles, and a slow diagonal glint sweep, all built with SMIL so they're
  "alive" on their own (see the Editions cards). The Prism Pour bottle exposes its liquid
  rect and gradient stops via `ref` so the scroll timeline can drive fill level and colour
  directly, without React re-renders on every scroll tick.
- **Animated jewel orbs** (`src/components/JewelOrb.jsx`) — layered radial-gradient core,
  a breathing specular highlight, a rim, and a few orbiting light motes, replacing the old
  flat blurred circles.
- **Attractive post-fill reveal** (`src/components/AccordReveal.jsx`) — once the Prism Pour
  beams split, a glassmorphic panel fades in with a self-drawing jewel-gradient divider, a
  slow-rotating conic glow ring behind it, and three staggered stat chips (3 Accords / 12H
  Wear / Grasse, FR), instead of the old plain line of text.

## Structure

```
src/
  components/     one component + its .css per section
  lib/gsapSetup.js   registers ScrollTrigger once
  styles/index.css   design tokens (jewel-tone palette), reset, shared utility classes
  App.jsx
  main.jsx
```

Colour tokens, fonts, and the scroll-animation logic are unchanged in spirit from the
original build — same jewel-tone (emerald/sapphire/amethyst) blend against the ash-black
base, same GSAP + ScrollTrigger scroll choreography.

## Fixed since last version

- **Hero title was invisible** — the reveal animation tweened GSAP's
  `yPercent`, but the hidden starting position was set with a plain CSS
  `transform: translateY(115%)`. The browser resolves that to a pixel
  matrix before GSAP ever reads it, so GSAP had no `yPercent` on record to
  animate away from — the tween became a no-op and "LUMEN & ASH" stayed
  parked below its own line forever (the empty gap you saw). Fixed by
  setting the starting position with `gsap.set()` instead of CSS, so GSAP
  owns the value it's animating from the start.

## 360° bottle photography

`src/components/PerfumeSpinner.jsx` is a drag-to-rotate / auto-spinning
turntable for a single transparent-background bottle photo, used on the
Editions cards (each already has a title + description next to it). See
`public/bottles/README.md` for image guidelines and how to wire a photo in.
Until a photo is set, it falls back to the illustrated SVG bottle
automatically, so the layout never breaks.

The Prism Pour bottle (the big scroll-driven fill/colour-morph centrepiece)
is left as the SVG illustration on purpose — it needs to visually "fill up"
and change colour as you scroll, which a static photo can't do convincingly.
