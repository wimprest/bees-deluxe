# Phase 03: Home Page

**Core Alignment:** Advances **Goals 1 and 2** by building the primary entry point — faithful to Conrad's layout intent, mobile-first, and pulling live show data from Sanity.
**Depends on:** Phase 01, Phase 02, Phase 04 (shows query — build Phase 04 first if show data is needed for testing; otherwise use static placeholder shows for Phase 03 and wire live data after Phase 04)

**Acceptance Criteria:**
- [ ] Hero section renders at all breakpoints with guitar image as content delimiter reference
- [ ] Band description block renders correctly
- [ ] Upcoming shows widget displays next 6 shows from Sanity (or static placeholders if Phase 04 not yet complete)
- [ ] Spotify embed renders publicly without login requirement
- [ ] Album/review section renders with Hallucinate cover, pull quote, and buy links
- [ ] Merch section renders with t-shirt image and Printify link
- [ ] Second press quote renders
- [ ] Page passes `npm run build` with no TypeScript errors
- [ ] Visual spot-check at 375px and 1280px against beesdeluxe.com home page

---

## Reference

Live site: https://www.beesdeluxe.com  
Conrad's layout is deliberate. Respect the section order and proportions. Modernize the aesthetic (gradients, typography) but do not reorder or remove sections.

---

## Content Reference

### Hero Tagline (h1)
"This is what Steely Dan would sound like if they played the blues"
— John Kereiff, The Rock Doctors Hot Wax Album Reviews

### Band Description
"Winners of the 2025 New Hampshire State Blues Challenge, and semi-finalists at the International Blues Challenge, in Memphis January 2026.

Hell-bent on their mission to bring the blues into the 21st century, Bees Deluxe pushes the limits, colors outside the lines of convention and bends the genre to create a sound that is distinct, highly musical and yet deeply respectful of the blues tradition."

### Hallucinate Review Pull Quote
"Hallucinate is one of those albums that come along very infrequently, a complete outline of musical genius, songs that have substance not only individually, but as an entire album, like one lone and complete song, no matter where you are in the album, it evolves and transforms into something grand and magical."
— Joseph Timmons, Indie Pulse Reviews

### Hallucinate Buy Links
- Spotify: https://spoti.fi/46pplbM
- iTunes: https://apple.co/3Mv5dho
- Apple Music: https://apple.co/46X5F0f
- Amazon: https://amzn.to/3MzIEIy
- Order CD (PayPal): link from Sanity album doc

### Merch
- Image: download from https://static.wixstatic.com/media/0e02b1_07083f8f2214428f8f69fd11b9a47d49~mv2.jpg
- Link: https://bees-deluxe.printify.me/products
- Copy: "Get a Bees Deluxe T-Shirt — available in lots of colors and styles. Wear yours to a show and we'll give you a free CD."

### Second Press Quote
"The music, for me, has the same impact that Steely Dan did with their first couple of albums. They play very tight Blues that sounds as though they are jamming but this is very tight, and the playing is absolutely superb."
— Andy Snipper, Music News (https://www.music-news.com/review/UK/15712/Album/Bees-Deluxe)

### Hero/Band Image
Download and save to public/images/:
- Hero banner: https://static.wixstatic.com/media/0e02b1_17123ef94c0f449a9d8327fc77b6f622~mv2.jpg
- Band photo: https://static.wixstatic.com/media/0e02b1_698f871da40a4f0ca39da37a1f6f1f46~mv2.jpg
- Hallucinate cover: https://static.wixstatic.com/media/0e02b1_5b7bb7becf7041d3b7f6ae38167522fc~mv2.jpg

---

## Steps

### Step 1 — Spotify Embed Note

The Spotify embed URL for the homepage player is stored in `siteSettings.spotifyEmbedUrl` in Sanity. For Phase 03, use this hardcoded embed URL as a placeholder until Sanity content is populated in Phase 12:

```
https://open.spotify.com/embed/artist/17Y0kmsT4nzoNXI9nMkrp3?utm_source=generator&theme=0
```

The `theme=0` parameter forces dark mode on the Spotify player, which matches the site aesthetic. The embed is publicly playable — no Spotify login required for 30-second previews; full playback requires a Spotify account but the widget renders and plays for anyone.

Implement as:
```tsx
<iframe
  src={spotifyEmbedUrl}
  width="100%"
  height="152"
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>
```

### Step 2 — Upcoming Shows Widget Component

Create `src/components/shows/UpcomingShowsWidget.tsx`:

```typescript
// Props: shows: Show[] (accepts pre-fetched array), maxShows?: number (default 6)
// Filters to future shows only (date >= today) at render time
// Displays up to maxShows entries
// Each entry — 3 lines of text, no card chrome:
//   Line 1: Day of week + date — e.g. "Thursday, April 2"  (font-heading, brand.white)
//   Line 2: Venue name (left) + phone if present (right) — both tappable
//     - Venue: links to Google Maps via generateGoogleMapsUrl()
//     - Phone: tel: link, text "Call for Reservations"
//     - If no phone: venue name full-width left
//   Line 3: City, State — (brand.muted, text-sm)
//   Line 4: Start time — (brand.muted, text-sm)
// Separated by hairline teal rule (1px, brand.teal, opacity-30)
// No padding between rule and next entry — tight/minimalist
// "More Bees Deluxe Dates →" link below list, routes to /shows
//
// Note: calendar add functionality lives on the full /shows page only.
// The home widget is read-only — date, venue, location, time, phone.
// Keep it minimal.
```

### Step 3 — Home Page Sections

Replace `src/app/page.tsx` with the full home page. This is a server component — fetch Sanity data at the top.

```typescript
// Data fetching:
// - upcomingShows: fetch via upcomingShowsQuery with limit 6
// - If Sanity not yet populated, fall back to empty array and render 
//   "Check back for upcoming shows" in the widget

// Page structure — sections in this exact order:
```

#### Section 1: Hero
```
// Full-width section, no PageShell constraint
// Background: var(--gradient-hero) — dark fade
// Content centered within PageShell max-width
// 
// Layout (desktop): two columns
//   Left: h1 tagline + attribution
//   Right: hero banner image (inca_flyer / band image)
//
// Layout (mobile): single column, stacked
//   Image first (full width), then tagline below
//
// h1 styling: font-heading, text-2xl sm:text-3xl lg:text-4xl, brand.white
// Quote marks: brand.teal, slightly larger than surrounding text
// Attribution: text-sm, brand.muted, mt-2
//
// The hero image acts as the visual right delimiter on desktop.
// On mobile it becomes a full-width banner above the text.
```

#### Section 2: Band Description
```
// Inside PageShell
// Two columns on desktop: text left, band photo right
// Single column on mobile: text above photo
// 
// Text: body font, brand.white, leading-relaxed
// Band photo: rounded-none (sharp corners — Conrad's aesthetic), 
//   object-cover, aspect-square on mobile, fixed height on desktop
//
// Add <SectionDivider> BELOW this section as transition to Shows
```

#### Section 3: Upcoming Shows
```
// Inside PageShell
// <SectionDivider label="Upcoming Shows" /> at top
// <UpcomingShowsWidget shows={upcomingShows} maxShows={6} />
// "More Bees Deluxe Dates →" link below (brand.teal, hover:brand.tealLight)
```

#### Section 4: Featured Album + Review
```
// Inside PageShell
// <SectionDivider label="Latest Release" /> at top
//
// Desktop layout: two columns with sharp visual division
//   Left column (~40%): 
//     - Hallucinate cover image (square, sharp corners)
//     - "Order CD — $20" PayPal link below image
//     - Streaming platform links in a tight row: Spotify | iTunes | Apple Music | Amazon
//   Right column (~60%):
//     - "HALLUCINATE" label in brand.teal, uppercase, tracking-widest, text-sm
//     - Pull quote in large italic font, brand.white
//     - Attribution: brand.muted, text-sm
//     - "More Bees Deluxe Videos on YouTube →" link (brand.teal)
//
// Mobile: cover image full-width, then quote below, then links
//
// Sharp left delimiter between columns on desktop — use a 1px brand.teal 
// vertical line (opacity-30) between the two columns as a visual divider
// This echoes Conrad's hard delimiter aesthetic at the section level
```

#### Section 5: Spotify Player
```
// Inside PageShell
// Full-width within the content column
// Label above: "Listen on Spotify" — brand.muted, text-sm, uppercase, tracking-widest
// Iframe embed (see Step 1)
// Subtle gradient surface behind the embed: var(--gradient-dark-surface), rounded-none, p-4
```

#### Section 6: Merch
```
// Inside PageShell
// <SectionDivider label="Merch" /> at top
//
// Desktop: two columns
//   Left: t-shirt image (sharp corners, fixed size)
//   Right: copy text + "Get Yours →" link to Printify
//
// Mobile: image above, text below
// Keep copy tight — one or two sentences max
```

#### Section 7: Press Quote
```
// Inside PageShell — no SectionDivider, just the quote
// Large italic pull quote, brand.white
// Attribution + publication link: brand.muted, text-sm
// Subtle left border: 2px solid brand.teal — classic blockquote treatment
// Padding: py-8
```

---

## Notes for Claude Code

- All images downloaded in this phase should go to `public/images/home/`
- Sharp corners everywhere — no `rounded-lg` or similar. Conrad's aesthetic is all right angles.
- No drop shadows on images or cards
- Spacing between sections: `py-16 sm:py-20` — generous vertical rhythm
- The page should feel like a well-designed concert poster: dark, tight, deliberate
- Do not add any sections not listed above. Do not reorder sections.

---

## Verification

```bash
npm run build
npm run dev -- -p 3015
```

Visual checks at localhost:3015:
- [ ] 375px: all sections stack cleanly, no horizontal overflow, text readable
- [ ] 768px: two-column layouts start to emerge
- [ ] 1280px: full desktop layout matches beesdeluxe.com section order and proportions
- [ ] Spotify embed renders (dark theme)
- [ ] No console errors
- [ ] All links present and pointing to correct hrefs
