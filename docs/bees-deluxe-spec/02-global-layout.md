# Phase 02: Global Layout + Design System

**Core Alignment:** Advances **Goals 1 and 2** by establishing the visual foundation every page inherits — responsive layout shell, color tokens, typography, nav, footer, and the two signature Conrad aesthetic components (page delimiter and section divider).
**Depends on:** Phase 01

**Acceptance Criteria:**
- [ ] Tailwind config defines all color tokens, font stack, and custom utilities
- [ ] `<Nav>` renders correctly at 375px, 768px, and 1280px — logo left, pipe-separated links, social icons, mobile hamburger
- [ ] `<Footer>` renders correctly at all breakpoints — teal band, homogenized social icons
- [ ] `<PageShell>` enforces left/right content delimiters on every page
- [ ] `<SectionDivider>` renders horizontal rule with text label growing from the line
- [ ] All components pass `npm run build` with no TypeScript errors
- [ ] Visual spot-check: open localhost:3015 and compare nav/footer against beesdeluxe.com

---

## Design Token Reference

**Verify these against the live site at beesdeluxe.com before proceeding. Adjust if the visual doesn't match.**

### Color Palette
```typescript
// tailwind.config.ts — extend colors
colors: {
  brand: {
    teal:       '#00B4B4',  // Primary accent — verify against live site
    tealDark:   '#008A8A',  // Hover states, active nav
    tealLight:  '#00D4D4',  // Gradient highlight end
    black:      '#0A0A0A',  // Page background
    charcoal:   '#141414',  // Card/section backgrounds
    slate:      '#1E1E1E',  // Elevated surfaces
    white:      '#F5F5F5',  // Body text
    muted:      '#9A9A9A',  // Secondary text, credits
    rule:       '#00B4B4',  // Hairline rules — same as teal
  }
}
```

### Typography
```typescript
// Font stack — Conrad's site uses a clean sans-serif for body and a slightly display-weight
// face for headings. Use Google Fonts:
// - Headings: 'Oswald' (weight 400, 600) — condensed, slightly industrial, blues-appropriate
// - Body: 'Inter' (weight 400, 500) — clean, readable at small sizes on mobile
// - Mono/accent: 'Courier Prime' — for any cipher/ARG hooks later
fontFamily: {
  heading: ['Oswald', 'sans-serif'],
  body:    ['Inter', 'sans-serif'],
  mono:    ['Courier Prime', 'monospace'],
}
```

Add Google Fonts import to `src/app/layout.tsx` via `next/font/google`.

### Gradient Tokens
```css
/* src/app/globals.css — add to @layer base */
:root {
  --gradient-hero: linear-gradient(180deg, #0A0A0A 0%, #141414 100%);
  --gradient-teal-fade: linear-gradient(90deg, #00B4B4 0%, #008A8A 100%);
  --gradient-dark-surface: linear-gradient(135deg, #141414 0%, #1E1E1E 100%);
}
```

---

## Steps

### Step 1 — Tailwind Config + Global CSS

Update `tailwind.config.ts`:
- Add all color tokens above
- Add font family tokens
- Add custom `container` config: `center: true`, `padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' }`, `screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' }`
- Add custom utility: `delimiter` — sets max-width to match the hero guitar image width constraint (reference: Conrad's content never exceeds a fixed column width on desktop; this is the left/right delimiter)

Update `src/app/globals.css`:
- Import Google Fonts
- Add gradient CSS variables
- Set `body` background to `brand.black`, text to `brand.white`, font to `font-body`
- Add base heading styles using `font-heading`
- Add `.hairline-rule` utility class: `border-t border-brand-teal opacity-30`

### Step 2 — PageShell Component

Create `src/components/layout/PageShell.tsx`:

```typescript
// Props: children, className?
// Behavior:
// - Full-width outer wrapper with brand.black background
// - Inner content column: max-w-[960px] mx-auto px-4 sm:px-6
//   (960px matches Conrad's current content width — the guitar hero image is the reference)
// - This component wraps every page's <main> content
// - Does NOT include Nav or Footer — those are in the root layout
```

This is the page-level delimiter. Every page uses `<PageShell>` as its outermost content wrapper, enforcing the hard left/right limits Conrad designed around.

### Step 3 — SectionDivider Component

Create `src/components/layout/SectionDivider.tsx`:

```typescript
// Props: label: string, className?
// Visual: horizontal rule with the label text centered on top of it,
//   as if the text grew up out of the line
// Implementation:
//   - Relative positioned container
//   - Full-width hr with brand.teal color, 1px height, opacity-40
//   - Label text absolutely centered over the line
//   - Text: uppercase, tracking-widest, text-sm, font-heading, brand.teal color
//   - Background behind text: brand.black (to "cut" the line behind the letters)
//   - Padding: py-8 above and below the whole component
// Usage: <SectionDivider label="Bees Deluxe Shows" />
```

This is Conrad's signature section header treatment. It appears on Shows, Press, and other pages. Build it once here, use it everywhere.

### Step 4 — Navigation Component

Create `src/components/layout/Nav.tsx`:

```typescript
// Structure:
// - Fixed top, full-width, background: brand.black, border-bottom: 1px brand.teal opacity-20
// - Left: Logo image (download from Wixstatic during this step — see URL below)
// - Center/Right desktop: pipe-separated nav links
// - Right desktop: social icons row (homogenized, white, 20x20px)
// - Mobile: logo left, hamburger right — drawer or dropdown reveals nav links stacked vertically

// Logo URL to download and save to public/images/bees-logo.png:
// https://static.wixstatic.com/media/0e02b1_bacbbc7b21f640d7a24ec0026af26bc6~mv2.png

// Nav links (in order):
// Home | Shows | Musicians | Press | Discs | Photos | Videos | EPK | Contact

// Pipe separator: rendered as a <span> with brand.teal color, mx-2, opacity-50
// Active link: brand.teal color, no underline
// Hover: brand.teal color, transition

// Social icons (header): white fill, 20x20px, gap-3
// Platforms: YouTube, Facebook, Instagram, SoundCloud, Twitter/X
// Use lucide-react icons where available; inline SVG for SoundCloud
// Links pulled from siteSettings Sanity doc — but for Phase 02, use placeholder hrefs
// that get replaced in Phase 11 (Sanity Studio config)

// Mobile nav:
// - Hamburger icon (lucide: Menu / X for close)
// - Drawer opens below header, full-width, brand.charcoal background
// - Links stacked, full-width, py-3 each, border-bottom hairline teal rule
// - Social icons row at bottom of drawer
// - Close on link click or outside tap

// Shows nav item has a dropdown indicator but links directly to /shows
// (sub-year pages from old Wix site are not replicated — single shows page)
// Discs links to /discs
// Photos links to /photos
// Videos is nested under Photos in old site — in new site, Videos is a separate nav item
```

### Step 5 — Footer Component

Create `src/components/layout/Footer.tsx`:

```typescript
// Structure:
// - Full-width teal band: background brand.teal, py-6
// - Single row: copyright text left, social icons right
// - Social icons: black fill on teal background, 24x24px, gap-4, homogenized
// - Copyright: "© [year] Bees Deluxe. Slapping Cat Records & Carbonmind Music Publishing."
//   Use new Date().getFullYear() for dynamic year
// - Same platforms as header: YouTube, Facebook, Instagram, SoundCloud, Twitter/X
// - Links pulled from siteSettings — use placeholder hrefs for Phase 02

// Mobile: stack copyright above icons, centered
```

### Step 6 — Root Layout

Update `src/app/layout.tsx`:

```typescript
// - Import and apply Google Fonts (Oswald, Inter, Courier Prime) via next/font/google
// - Apply font CSS variables to <html> element
// - Include <Nav /> above <main>
// - Include <Footer /> below <main>
// - Set metadata: title "Bees Deluxe | Boston Blues", description from brand description
// - Background: brand.black on <body>
// - Add pt-[nav-height] to <main> to account for fixed nav (measure nav height after render)
```

### Step 7 — Placeholder Home Route

Create `src/app/page.tsx` as a minimal placeholder so the build has something to render:

```typescript
// Just renders a <PageShell> with a <SectionDivider label="Coming Soon" /> 
// and a centered brand.teal "Bees Deluxe" heading
// This gets replaced entirely in Phase 03
```

Create stub route files so nav links don't 404 during dev:
- `src/app/shows/page.tsx` — placeholder
- `src/app/musicians/page.tsx` — placeholder
- `src/app/press/page.tsx` — placeholder
- `src/app/discs/page.tsx` — placeholder
- `src/app/discs/[slug]/page.tsx` — placeholder
- `src/app/photos/page.tsx` — placeholder
- `src/app/videos/page.tsx` — placeholder
- `src/app/epk/page.tsx` — placeholder
- `src/app/contact/page.tsx` — placeholder

Each stub: `export default function Page() { return <PageShell><p className="text-brand-muted">Coming soon</p></PageShell> }`

---

## Verification

```bash
# 1. Build passes
npm run build

# 2. Dev server starts on correct port
npm run dev -- -p 3015
```

Visual checks at localhost:3015:
- [ ] Nav renders at 375px: logo visible, hamburger present, no overflow
- [ ] Nav renders at 1280px: all links visible, pipe separators, social icons
- [ ] Footer renders: teal band, black icons, copyright text
- [ ] PageShell: content centered with visible left/right margin at all breakpoints
- [ ] SectionDivider: text appears to grow from the horizontal rule
- [ ] No console errors
