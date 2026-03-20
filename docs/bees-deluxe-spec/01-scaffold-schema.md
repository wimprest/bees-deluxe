# Phase 01: Scaffold + Sanity Schema

**Core Alignment:** Advances **Goal 3** (Sanity-powered content) by establishing the project foundation, all content type definitions, and the image pipeline before any UI is built.
**Depends on:** —

**Acceptance Criteria:**
- [ ] Next.js project scaffolded with correct stack (Next.js 14 App Router, TypeScript, Tailwind)
- [ ] Sanity project created and connected; Studio accessible at `/studio`
- [ ] All schema types defined and deployable without errors (`sanity deploy`)
- [ ] Cloudinary environment variable wired; test upload resolves correctly
- [ ] TypeScript types generated from Sanity schema (`sanity typegen generate` passes)
- [ ] `npm run build` passes with no errors

---

## Reference Sites

Before starting, review these live implementations for schema and component patterns:
- `https://www.themattswantonband.com` — shows page calendar/maps pattern, album filmstrip, musician layout
- `https://bluestorch.com` — band site architecture on same stack

Ask Wim for access to the Matt Swanton Band or Blues Torch repo if direct code reference would accelerate schema work.

---

## Steps

### Step 1 — Project Scaffold

Initialize the Next.js project with the standard Prest Group stack.

```bash
npx create-next-app@latest bees-deluxe \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

Install dependencies:
```bash
npm install next-sanity @sanity/image-url @sanity/vision
npm install next-cloudinary cloudinary
npm install @radix-ui/react-dialog @radix-ui/react-collapsible
npm install framer-motion
npm install lucide-react
npm install date-fns
```

Create `.env.local` with placeholders — do NOT populate values:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

### Step 2 — Sanity Project Init

```bash
cd bees-deluxe
npx sanity@latest init --env .env.local
```

Select: Create new project → name "bees-deluxe" → dataset "production"

Configure `sanity.config.ts` to mount Studio at `/studio` using the Next.js App Router embedded studio pattern.

Configure `src/lib/sanity.ts`:
```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
```

### Step 3 — Sanity Schema Definitions

Create all schema files under `src/sanity/schemas/`. Each schema is a separate file.

---

#### `show.ts`
```typescript
// Fields:
// - date: datetime (required) — used for calendar link generation
// - venueName: string (required)
// - venueAddress: string (required) — full address string for Google Maps URL
// - city: string (required)
// - state: string (required)
// - startTime: string (required) — display string e.g. "8:00 PM"
// - phone: string (optional) — digits only, displayed as "Call for Reservations"
// - notes: string (optional) — e.g. "Supporting as special guest", "No cover"
// - ticketUrl: url (optional)
```

Show documents should be orderable by date. Add a `__experimental_actions` to allow reordering.

---

#### `musician.ts`
```typescript
// Fields:
// - name: string (required)
// - role: string (required) — e.g. "Guitar & Vocals", "Keyboards, Vocals & Harmonica"
// - photo: image (required) — Cloudinary or Sanity asset
// - bio: text (required) — plain text, no portable text needed
// - order: number (required) — manual sort order
// - isCurrentMember: boolean (required, default: true)
//   true = "Current Band" section
//   false = "Special Guests & Friends" section
```

---

#### `album.ts`
```typescript
// Fields:
// - title: string (required)
// - slug: slug (required, source: title)
// - releaseYear: number (required)
// - coverImage: image (required)
// - albumType: string (required) — options: 'album' | 'ep' | 'single'
// - description: text (required) — band-written description
// - tracklist: array of objects { trackNumber: number, title: string }
// - credits: text (optional) — production credits block
// - buyLinks: array of objects { platform: string, url: url }
//   platform options: 'Spotify' | 'Apple Music' | 'iTunes' | 'Amazon' | 'Bandcamp' | 'PayPal CD'
// - pressQuotes: array of objects {
//     quote: text (required),
//     attribution: string (required) — reviewer name,
//     publication: string (required),
//     publicationUrl: url (optional)
//   }
// - order: number (required) — controls filmstrip position; lower = featured/first
// - featured: boolean (default: false) — pins to front of filmstrip
```

---

#### `pressQuote.ts`
```typescript
// Standalone press quotes not tied to a specific album (used on Press page)
// Fields:
// - quote: text (required)
// - attribution: string (required)
// - publication: string (required)
// - publicationUrl: url (optional)
// - year: number (optional)
// - order: number (required)
```

---

#### `video.ts`
```typescript
// Fields:
// - title: string (required)
// - youtubeId: string (required) — 11-char YouTube video ID only, not full URL
// - description: text (optional)
// - order: number (required)
// - featured: boolean (default: false)
```

---

#### `photo.ts`
```typescript
// Fields:
// - image: image (required) — Cloudinary asset
// - caption: string (optional)
// - credit: string (optional) — photographer credit
// - order: number (required)
// - featured: boolean (default: false)
```

---

#### `siteSettings.ts` (singleton)
```typescript
// Single document for global site config
// Fields:
// - heroQuote: string — the main tagline displayed on the homepage
// - heroQuoteAttribution: string
// - bookingAgentName: string
// - bookingAgentEmail: email
// - bookingAgentPhone: string
// - socialLinks: array of objects { platform: string, url: url }
//   platform options: 'YouTube' | 'Facebook' | 'Instagram' | 'SoundCloud' | 'Twitter' | 'Spotify'
// - spotifyEmbedUrl: url — full Spotify embed URL for homepage player
```

---

#### `index.ts` — Schema registry
```typescript
import { show } from './show'
import { musician } from './musician'
import { album } from './album'
import { pressQuote } from './pressQuote'
import { video } from './video'
import { photo } from './photo'
import { siteSettings } from './siteSettings'

export const schemaTypes = [
  show,
  musician,
  album,
  pressQuote,
  video,
  photo,
  siteSettings,
]
```

### Step 4 — TypeScript Type Generation

After schema is defined and Studio compiles without errors:

```bash
npx sanity typegen generate
```

This generates `src/sanity/types.ts`. Commit this file — it is the source of truth for Sanity document types throughout the project.

Create `src/types/index.ts` and re-export the generated Sanity types plus any UI-specific types needed:

```typescript
// Re-export Sanity generated types
export type { Show, Musician, Album, PressQuote, Video, Photo, SiteSettings } from '@/sanity/types'

// UI-specific types
export interface CalendarLinkOptions {
  title: string
  date: string        // ISO datetime
  location: string    // venue name + address
  notes?: string
}
```

### Step 5 — Cloudinary Config

Create `src/lib/cloudinary.ts`:

```typescript
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
})

export default cloudinary
```

Configure `next.config.ts` to allow Wixstatic and Cloudinary image domains (needed during content migration):

```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'static.wixstatic.com' },
    { protocol: 'https', hostname: 'res.cloudinary.com' },
    { protocol: 'https', hostname: 'cdn.sanity.io' },
  ],
}
```

### Step 6 — Utility Functions

Create `src/lib/calendar.ts` — calendar link generators matching Matt Swanton Band implementation:

```typescript
// generateGoogleCalendarUrl(options: CalendarLinkOptions): string
// generateICSContent(options: CalendarLinkOptions): string
// downloadICS(options: CalendarLinkOptions): void
```

Create `src/lib/maps.ts`:
```typescript
// generateGoogleMapsUrl(venueName: string, address: string): string
// Returns: https://www.google.com/maps/search/?api=1&query=ENCODED_STRING
```

Create `src/lib/queries.ts` — all GROQ queries in one place, named exports:
```typescript
// upcomingShowsQuery — future shows ordered by date ASC, limit param
// allShowsQuery — all shows ordered by date ASC
// allMusiciansQuery — ordered by isCurrentMember DESC, order ASC
// allAlbumsQuery — ordered by featured DESC, order ASC
// albumBySlugQuery — single album by slug, includes full pressQuotes array
// allPressQuotesQuery — ordered by order ASC
// allVideosQuery — ordered by featured DESC, order ASC
// allPhotosQuery — ordered by order ASC
// siteSettingsQuery — singleton fetch
```

---

## Verification

Run in order:

```bash
# 1. Studio compiles and schema deploys
npx sanity deploy

# 2. Types generate without errors
npx sanity typegen generate

# 3. Full build passes
npm run build
```

Expected: build passes, no TypeScript errors, Studio accessible at localhost:3000/studio when running `npm run dev`.
