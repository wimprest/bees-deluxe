# Phase 06: Discs Page — Filmstrip + Album Detail

**Core Alignment:** Advances **Goals 1 and 2** by building the most interactive page on the site — a horizontal filmstrip of album covers that expands into a full detail view on click, with deep-linking via slug for shareability.
**Depends on:** Phase 01, Phase 02

**Acceptance Criteria:**
- [ ] Filmstrip renders all albums as clickable cover thumbnails in order
- [ ] Clicking an album replaces the main content area with the album detail panel
- [ ] Detail panel shows: cover (full size), title, year, tracklist, credits, press quotes, buy links
- [ ] "HALLUCINATE" title in detail panel renders in brand.red
- [ ] Deep-link routing works: `/discs/hallucinate` loads directly to that album detail
- [ ] Default state (no album selected): shows featured album (Hallucinate) detail on desktop, filmstrip only on mobile
- [ ] Back/close control returns to filmstrip-only view on mobile
- [ ] Filmstrip is horizontally scrollable on mobile
- [ ] Page passes `npm run build` with no TypeScript errors
- [ ] Visual spot-check at 375px and 1280px

---

## Reference

Live site: https://www.beesdeluxe.com/discs (currently redirects to /hallucinate)
The current site has separate pages per album — the new design collapses all of them into a single interactive `/discs` route.

---

## Album Data to Seed in Sanity

Seed all 7 releases before building. Use `/studio` to enter documents.

### 1. Hallucinate (featured: true, order: 1)
- **Slug:** hallucinate
- **Year:** 2023
- **Type:** album
- **Cover:** Download from `https://static.wixstatic.com/media/0e02b1_6fb3c9cc3901468290f63f26f6d9895c~mv2.jpg` → save as `public/images/albums/hallucinate.jpg`
- **Description:** The all-originals Bees Deluxe album. Recorded in a studio hidden in the forests of Massachusetts, the band took a year to produce a dozen new songs. Mixing Chicago blues and a heavy dose of psychedelic rock, the album is eclectic, different, and deeply musical.
- **Tracklist:** 1. Sharkskin Suit / 2. When Is Yesterday / 3. Another Close Shave / 4. Scared / 5. Queen Midas / 6. How to Play 96 Tears / 7. Nitro / 8. Call Me Frank / 9. Men & Women / 10. Gary Burton's ex-Guitar Player Stole My Highschool Girlfriend And Now I Can't Stop Dreaming About Her / 11. Houdini / 12. What's Wrong With Me?
- **Credits:** Produced & Mixed by Joe Egan, Tight Squeeze Studios. Executive Producer Conrad Warre. Basics recordings & mastered by Joe Idzal, All Things Audio. Front Cover Art 'Lady in Waiting' by Wendy Brusick. All songs by C. Warre except track 6 by Carol Band.
- **Buy Links:** Spotify: https://spoti.fi/46pplbM | iTunes: https://apple.co/3Mv5dho | Apple Music: https://apple.co/46X5F0f | Amazon: https://amzn.to/3MzIEIy | PayPal CD: (placeholder — add in Phase 12)
- **Press Quotes:** (5 quotes — see Phase 03 content reference for full text)
  - John Muller, North Jersey Blues Society
  - Meg Trogolo, Worcester Magazine
  - William Munn, Rhythm & Booze
  - John Kereiff, Music Reviews & Get Off My Lawn!
  - Joseph Timmons, Indie Pulse Music

### 2. Smash Hits (featured: true, order: 2)
- **Slug:** smash-hits
- **Year:** 2022
- **Type:** album
- **Cover:** Download from `https://static.wixstatic.com/media/0e02b1_6a8fc652b4654834b24ef7937d53e4cf~mv2.jpg` → save as `public/images/albums/smash-hits.jpg`
- **Tracklist:** 1. Somebody Loan Me a Dime / 2. When Is Yesterday / 3. King of Bad Luck / 4. Beer / 5. Blues for the Decline of Western Civilization / 6. Nitro / 7. How to Play 96 Tears / 8. Bad Influence / 9. Homework / 10. Kidnap / 11. Crank Part 2 / 12. I Wouldn't Treat a Dog (The Way You Treated Me) / 13. Gee Whiz (demo)
- **Description:** From Maine to Miami, Bees Deluxe has distilled years of East Coast touring magic into 13 explosive tracks. Reimagined classics by Fenton Robinson, Otis Rush, Robert Cray and Bobby 'Blue' Bland alongside Bees Deluxe originals that push the envelope of contemporary blues. Almost all tracks produced & mixed by Joe Egan.
- **Credits:** Featuring Joe Egan, Carol Band, Richard 'Rosy' Rosenblatt, JR Rost, Allyn Dorr, Paul Giovine, Patrick Sanders, Poogie Bell, James Gildea, Jamie Lonto, JL Claybourne, Doug Rich, Sebastian Kossack, Steve Gaetz, Paul Gallo, Rich Shields, Dan Sevush, Bruce Mattson, Adam Sankowski, Conrad Warre & Jeff Lopez. Almost all tracks produced & mixed by Joe Egan.
- **Press Quotes:**
  - "The intermix of Conrad's guitar with Carol's keyboards definitely gives many of the songs a touch of Steely Dan, although definitely staying in the blues line." — John Sacksteder, Blues Blast Magazine
  - "SMASH HITS is another exceptional recording, a sampling that brings to the public's eye a group that is a far cry from your average blues band. Musically addictive!!" — John Muller, Blue Notes & Conversations
  - "You can't really put your finger on what they actually are, other than an unorthodox blues band that likes to have fun and slyly break the rules." — Eric Harabadian, Geoff Wilbur Music
- **Buy Links:** CD $20 includes p+p (PayPal — add in Phase 12)

### 3. Speechless {the instrumentals} (order: 3)
- **Slug:** speechless
- **Year:** 2021
- **Type:** album
- **Cover:** Download from https://www.beesdeluxe.com/speechless
- **Tracklist:** 1. Industrial (Espionage) / 2. All Miles / 3. Song No. 9 / 4. Beer / 5. Fake Instrumental / 6. Flat Earth Conspiracy / 7. Blues for Cameroon / 8. Strange Matter / 9. Spaghetti Western / 10. You Say Red / 11. An Imaginary Conversation Between Björk and Buddy Guy
- **Credits:** Featuring Colin Rosso, Patrick Sanders, Richard 'Rosy' Rosenblatt, Joe Egan, Carol Band, Allyn Dorr, Paul Giovine and Conrad Warre. Mastered by Joe Idzal. Produced by Joe Egan & Conrad Warre.
- **Buy Links:** Spotify / iTunes / Apple Music / Amazon (links from /speechless page)

### 4. Mouthful of Bees (order: 4)
- **Slug:** mouthful-of-bees
- **Year:** 2019
- **Type:** album
- **Cover:** Download from https://www.beesdeluxe.com/catalog (BeesDeluxe_FCOVER_x300.jpg)
- **Tracklist:** 1. Voodoo Doll / 2. Damn Your Eyes / 3. Prison of Love / 4. Bad Influence / 5. Walking Out / 6. I Wouldn't Treat a Dog (The Way You Treated Me) / 7. For the Love of a Woman / 8. Homework / 9. Palace of the King / 10. Blue + Yellow
- **Credits:** Carol Band: Keyboards, Harmonica & Vocals. Allyn Dorr: Bass & Vocals. Paul Giovine: Drums & Percussion. Conrad Warre: Guitar & Vocals. Mastered by Joe Idzal. Recorded & Mixed by Joe Egan. Produced by Egan & Warre.

### 5. Voice of Dog (order: 5)
- **Slug:** voice-of-dog
- **Year:** 2018
- **Type:** album
- **Cover:** Download from https://www.beesdeluxe.com/catalog (voice_cover image)
- **Tracklist:** 1. Song No. 9 / 2. Beer / 3. All Miles / 4. Industrial (espionage) / 5. Fake Instrumental / 6. Flat Earth Conspiracy / 7. Blues for Cameroon / 8. Strange Matter / 9. Spaghetti Western / 10. You Say Red / 11. Imaginary Conversation between Björk & Buddy Guy
- **Credits:** Produced, recorded & mixed by Joe Egan, co-produced by Conrad Warre. Carol Band: keyboards, Allyn "Aldo" Dorr: bass, Patrick Sanders: drums & percussion, Conrad Warre: guitar & vocals. Guests: Richard "Rosy" Rosenblatt on harmonica, Colin Rosso & Paul Giovine on drums, Tad McKitterick & Jonn Smith on background vocals.
- **Buy Links:** iTunes: https://apple.co/2Euh3X6 | Apple Music: https://apple.co/2snpiQe | Amazon MP3: http://amzn.to/2sopCy0 | Spotify: http://spoti.fi/2snDrNb

### 6. Nitro — Single (order: 6)
- **Slug:** nitro
- **Type:** single
- **Year:** 2020
- **Cover:** Download from https://www.beesdeluxe.com/catalog (brusick_nitro_beesdeluxe_x300.jpg)
- **Description:** Featuring Poogie Bell on drums. Original artwork by Wendy Brusick. Produced by Joe Egan.
- **Buy Links:** Spotify: https://spoti.fi/3cFceY1 | iTunes: https://apple.co/2LmEqUC | Amazon: https://amzn.to/3dQNDkb

### 7. Bees Deluxe EP (order: 7)
- **Slug:** bees-deluxe-ep
- **Type:** ep
- **Year:** 2021
- **Cover:** Download from https://www.beesdeluxe.com/catalog (Bees_Deluxe_EP_x400.jpg)
- **Tracklist:** 1. Wherever You Hide / 2. End of the World / 3. Start It Up / 4. Song No. 9 (instrumental mix)
- **Credits:** Produced by Joe Egan.
- **Buy Links:** Available via direct order — $10 includes p+p (PayPal link — add in Phase 12)

---

## Steps

### Step 1 — Seed Album Data + Download Cover Images

Download all cover images to `public/images/albums/` with clean filenames:
- `hallucinate.jpg`
- `smash-hits.jpg`
- `speechless.jpg`
- `mouthful-of-bees.jpg`
- `voice-of-dog.jpg`
- `nitro.jpg`
- `bees-deluxe-ep.jpg`

Enter all 7 album documents in Sanity Studio at `/studio`. Hallucinate and Smash Hits should have `featured: true`.

### Step 2 — AlbumFilmstrip Component

Create `src/components/discs/AlbumFilmstrip.tsx`:

```typescript
// Props:
//   albums: Album[]
//   selectedSlug: string | null
//   onSelect: (slug: string) => void
//
// Layout:
//   Horizontal row of album cover thumbnails
//   Desktop: fixed height strip, ~120px tall thumbnails
//   Mobile: horizontally scrollable, same thumbnail height
//   Thumbnails: square, sharp corners, object-cover
//
// States per thumbnail:
//   Default: slight opacity (opacity-70), no border
//   Selected/Active: full opacity, 2px brand.teal border on bottom
//   Hover: full opacity, cursor-pointer
//
// Behavior:
//   Clicking a thumbnail calls onSelect(album.slug.current)
//   Selected thumbnail is visually highlighted
//   On mobile, auto-scroll selected thumbnail into view
//
// Ordering: albums sorted by order ASC, featured first
//   (Sanity query handles this — allAlbumsQuery orders by featured DESC, order ASC)
```

### Step 3 — AlbumDetail Component

Create `src/components/discs/AlbumDetail.tsx`:

```typescript
// Props: album: Album, onClose?: () => void (mobile only)
//
// Layout — desktop (two columns):
//   Left column (~45%):
//     - Cover image, full size, sharp corners
//     - Album type badge if EP or Single: brand.muted, text-xs, uppercase
//     - Buy links row: platform names as links, pipe-separated
//       Spotify | iTunes | Apple Music | Amazon | Order CD
//     - "Order CD" link in brand.red when present
//   Right column (~55%):
//     - Album title: font-heading, large, brand.red if "HALLUCINATE",
//       brand.white for all others
//       NOTE: Apply brand.red to ALL album titles for visual consistency —
//       not just Hallucinate. Conrad uses red as his accent for album titles.
//     - Release year: brand.muted, text-sm
//     - Tracklist: numbered list, brand.muted, text-sm, compact line-height
//     - Credits block: brand.muted, text-xs, italic, mt-4
//     - SectionDivider label="Press" if pressQuotes exist
//     - Press quotes: each quote in a blockquote with teal left border,
//       attribution bold white, publication muted
//
// Layout — mobile:
//   Single column, stacked
//   Close button (X) top right — calls onClose()
//   Cover image full width
//   Title, year, tracklist, credits, quotes below
//   Buy links at bottom
//
// Animation:
//   Fade in on mount: opacity 0 → 1, duration 0.3s
//   Use framer-motion motion.div with initial={{opacity:0}} animate={{opacity:1}}
```

### Step 4 — Discs Page

Replace stub at `src/app/discs/page.tsx`:

```typescript
// Server component — fetch all albums
// Query: allAlbumsQuery (ordered featured DESC, order ASC)
//
// Default selected album: first album in results (Hallucinate)
// Pass to client component for interactivity
//
// Since the filmstrip interaction requires client-side state,
// create a client wrapper: src/components/discs/DiscsPageClient.tsx
// The server page fetches data and passes albums[] to DiscsPageClient
//
// DiscsPageClient manages:
//   - selectedSlug: string (default: albums[0].slug.current)
//   - selectedAlbum: derived from selectedSlug
//   - URL sync: update URL to /discs/[slug] on selection without full navigation
//     Use window.history.pushState to update URL without triggering page transition
//
// Layout:
// <PageShell>
//   <SectionDivider label="Bees Deluxe Discs" />
//   <AlbumFilmstrip
//     albums={albums}
//     selectedSlug={selectedSlug}
//     onSelect={handleSelect}
//   />
//   <div className="mt-8">
//     <AlbumDetail album={selectedAlbum} />
//   </div>
// </PageShell>
//
// Mobile layout:
//   Default view: filmstrip only, no detail panel
//   Tapping a thumbnail: slides detail panel up (or replaces view)
//   Back button in detail panel: returns to filmstrip
//   Use a boolean showDetail state for mobile view switching
```

### Step 5 — Deep Link Route

Update `src/app/discs/[slug]/page.tsx`:

```typescript
// Server component
// Fetch album by slug using albumBySlugQuery
// If not found: notFound() from next/navigation
// Render DiscsPageClient with albums (all) and initialSlug set to this slug
// This allows the page to load with the correct album pre-selected
// URL: /discs/hallucinate, /discs/speechless, etc.
```

### Step 6 — Update GROQ Queries

Ensure these queries exist and are correct in `src/lib/queries.ts`:

```groq
// allAlbumsQuery — all fields needed for filmstrip + detail
*[_type == "album"] | order(featured desc, order asc) {
  _id,
  title,
  slug,
  releaseYear,
  albumType,
  description,
  tracklist,
  credits,
  featured,
  order,
  coverImage {
    asset -> { _id, url }
  },
  buyLinks,
  pressQuotes
}

// albumBySlugQuery — single album by slug
*[_type == "album" && slug.current == $slug][0] {
  // same projection as above
}
```

---

## Visual Design Notes

- The filmstrip sits between the SectionDivider and the detail panel — it's always visible on desktop
- The selected album's cover in the filmstrip gets the teal bottom border indicator
- The detail panel transition (fade in) should feel like flipping to a record sleeve
- Tracklist: compact, numbered, no bullet points — use an `ol` with custom counter styling
- Press quotes in the detail panel use the same blockquote treatment as the home page (teal left border, bold attribution)
- All album titles in the detail panel render in brand.red — this is Conrad's accent color for album titles across the site

---

## Verification

```bash
npm run build
npm run dev -- -p 3015
```

Navigate to localhost:3015/discs and check:
- [ ] Filmstrip renders all 7 releases in correct order
- [ ] Clicking each thumbnail loads that album's detail panel
- [ ] URL updates to /discs/[slug] on selection
- [ ] Direct navigation to /discs/hallucinate loads correctly
- [ ] Hallucinate detail: tracklist, credits, press quotes all present
- [ ] Buy links render correctly, pipe-separated
- [ ] 375px: filmstrip horizontally scrollable, tap opens detail, back button works
- [ ] 1280px: filmstrip + detail panel side by side, Hallucinate pre-selected
- [ ] No console errors
