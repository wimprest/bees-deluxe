# Phase 11: Custom Admin Section

**Core Alignment:** Advances **Goal 3** (Sanity-powered content) by building a purpose-built admin interface at `/admin` that gives Conrad full control over all site content without requiring him to interact with Sanity Studio's generic CMS interface. Conrad should be able to manage every piece of content on the site independently, forever, without coming back to Wim.
**Depends on:** Phase 01, all content phases (07–10 for full context)

**Acceptance Criteria:**
- [ ] `/admin` route is protected — requires authentication
- [ ] Dashboard shows all content sections with entry counts
- [ ] Shows: full CRUD (create, edit, delete, reorder)
- [ ] Albums: full CRUD including cover image upload
- [ ] Musicians: full CRUD including photo upload, reorder current/guest sections
- [ ] Press Quotes: full CRUD, reorder
- [ ] Photos: full CRUD including image upload, reorder
- [ ] Videos: full CRUD, reorder
- [ ] Site Settings: edit hero quote, booking agent info, social links, Spotify embed URL
- [ ] All forms use the site's design system (teal/black/red, sharp corners, brand fonts)
- [ ] Image uploads work via Sanity asset pipeline
- [ ] `npm run build` passes with no TypeScript errors

---

## Architecture

The admin is a custom Next.js application section using Sanity's client API directly — not Sanity Studio. Every form is hand-built in the site's design language. Data reads and writes go through `@sanity/client` with a write token.

```
/admin                    → Dashboard (content overview)
/admin/shows              → Show list + inline create
/admin/shows/new          → New show form
/admin/shows/[id]         → Edit show form
/admin/albums             → Album list
/admin/albums/new         → New album form
/admin/albums/[id]        → Edit album form
/admin/musicians          → Musician list with drag reorder
/admin/musicians/new      → New musician form
/admin/musicians/[id]     → Edit musician form
/admin/press              → Press quote list with reorder
/admin/press/new          → New quote form
/admin/press/[id]         → Edit quote form
/admin/photos             → Photo grid with reorder
/admin/photos/new         → Upload + caption form
/admin/videos             → Video list with reorder
/admin/videos/new         → New video form
/admin/videos/[id]        → Edit video form
/admin/settings           → Site settings singleton form
```

---

## Authentication

Use Next.js middleware to protect all `/admin/*` routes. Simple password-based auth stored in an environment variable — no OAuth needed for a single-user admin.

```typescript
// .env.local
ADMIN_PASSWORD=<set a strong password — Conrad's to keep>
ADMIN_SESSION_SECRET=<random 32-char string>

// src/middleware.ts
// Check for admin session cookie on all /admin/* routes
// If not present: redirect to /admin/login
// Session cookie set on successful login, httpOnly, sameSite strict

// src/app/admin/login/page.tsx
// Simple password form — one field, one button
// On correct password: set session cookie, redirect to /admin
// On wrong password: show error in brand.red
// Style: consistent with site design system
```

---

## Design System for Admin

All admin pages use the same design tokens as the public site:
- Background: brand.black / brand.charcoal
- Inputs: brand.slate bg, brand.teal/20 border, focus:brand.teal border
- Labels: brand.muted, text-xs, uppercase, tracking-wide
- Buttons: Primary = brand.teal bg + brand.black text / Danger = brand.red bg + white text
- Sharp corners everywhere (no rounded-lg)
- Font: same Oswald/Inter stack
- Page header: "Admin — [Section Name]" in font-heading, brand.white
- Back links: brand.teal, text-sm, "← Back to [section]"

The admin should feel like it belongs to the same site, not like a generic CRUD panel.

---

## Steps

### Step 1 — Admin Layout + Auth

Create `src/app/admin/layout.tsx`:
- Wraps all admin pages
- Checks for valid session — redirects to /admin/login if not found
- Renders a minimal admin nav sidebar:
  - Bees Deluxe logo (small)
  - Links: Dashboard, Shows, Albums, Musicians, Press, Photos, Videos, Settings
  - "← View Site" link at bottom
  - "Log Out" button at bottom
- Main content area to the right of sidebar (desktop) or below (mobile)

Create `src/app/admin/login/page.tsx` — password form as described above.

Create `src/app/api/admin/auth/route.ts` — handles login POST, sets/clears session cookie.

Create `src/middleware.ts` — protects `/admin/*` routes (except `/admin/login`).

### Step 2 — Admin Dashboard

Create `src/app/admin/page.tsx`:

```typescript
// Fetches counts from Sanity:
//   - Upcoming shows count
//   - Total albums count
//   - Musicians count
//   - Press quotes count
//   - Photos count
//   - Videos count
//
// Renders a grid of content cards, each showing:
//   - Section name
//   - Count
//   - "Manage →" link
//
// Shows card gets special treatment — shows next 3 upcoming shows
// inline as a quick reference so Conrad can see what's coming up
// without clicking through
```

### Step 3 — Shows Admin

This is Conrad's primary workflow. Make it the most polished section.

**List page** (`/admin/shows`):
- Table/list of all shows sorted by date DESC
- Each row: date, venue, city, "Edit" link, "Delete" button
- Past shows visually de-emphasized (brand.muted)
- Upcoming shows full opacity
- "Add New Show" button prominent at top (brand.teal)
- Quick inline delete with confirmation ("Are you sure?") — no separate page

**Form** (`/admin/shows/new` and `/admin/shows/[id]`):
Fields match the Sanity show schema exactly:
- Date (date picker or text input: YYYY-MM-DD)
- Venue Name (text)
- Venue Address (text) — helper text: "Used for Google Maps link. Include street, city, state."
- City (text)
- State (text — or select dropdown of US states)
- Start Time (text — e.g. "8:00 PM")
- Phone (text — optional, helper: "For 'Call for Reservations' link")
- Ticket URL (url — optional, helper: "Advance ticket purchase link")
- Notes (text — optional, helper: "e.g. 'Opening for Joanna Connor', 'No cover'")

Save button: "Publish Show" (creates/updates and publishes in one step — no draft state for shows)

### Step 4 — Albums Admin

**List page** (`/admin/albums`):
- Grid of album covers with title and year
- Drag to reorder (updates `order` field in Sanity)
- "Add Album" button
- Edit / Delete per album

**Form** (`/admin/albums/new` and `/admin/albums/[id]`):
- Title, Slug (auto-generated from title, editable), Release Year
- Album Type (select: Album / EP / Single)
- Cover Image upload (Sanity asset upload)
- Featured toggle (checkbox)
- Description (textarea)
- Tracklist (dynamic list — add/remove/reorder track entries)
- Credits (textarea)
- Buy Links (dynamic list — platform name + URL pairs)
- Press Quotes (dynamic list — quote text, attribution, publication, publication URL)

### Step 5 — Musicians Admin

**List page** (`/admin/musicians`):
- Two sections: Current Band / Special Guests
- Drag to reorder within each section
- Each entry: name, role, photo thumbnail, Edit / Delete
- "Add Musician" button

**Form** (`/admin/musicians/new` and `/admin/musicians/[id]`):
- Name, Role
- Photo upload (Sanity asset)
- Bio (textarea)
- Is Current Member (toggle — determines which section they appear in)
- Order (number — or managed via drag on list page)

### Step 6 — Press Quotes Admin

**List page** (`/admin/press`):
- Numbered list matching display order
- Drag to reorder
- Each entry: first 60 chars of quote, attribution, Edit / Delete
- "Add Quote" button

**Form** (`/admin/press/new` and `/admin/press/[id]`):
- Quote (textarea)
- Attribution (text — reviewer name)
- Publication (text)
- Publication URL (url — optional)
- Year (number — optional)

### Step 7 — Photos Admin

**Grid page** (`/admin/photos`):
- Photo grid matching public display
- Drag to reorder
- Each photo: thumbnail, caption preview, Edit / Delete
- "Upload Photo" button (opens upload form)

**Form** (`/admin/photos/new` and `/admin/photos/[id]`):
- Image upload (Sanity asset — drag/drop or click to upload)
- Caption (text — optional)
- Photo Credit (text — optional)
- Featured toggle

### Step 8 — Videos Admin

**List page** (`/admin/videos`):
- List of videos with title and YouTube thumbnail preview
- Drag to reorder
- Featured toggle per video
- Edit / Delete

**Form** (`/admin/videos/new` and `/admin/videos/[id]`):
- Title
- YouTube ID (text — just the 11-character ID, not full URL)
  - Helper text: "The ID is the part after 'v=' in a YouTube URL. Example: for youtube.com/watch?v=WSUWKOIGip0 the ID is WSUWKOIGip0"
  - Show a live YouTube thumbnail preview as they type the ID
- Description (textarea — optional)
- Featured toggle

### Step 9 — Site Settings Admin

**Single page** (`/admin/settings`):
One form for all siteSettings fields:

- Hero Quote (text)
- Hero Quote Attribution (text)
- Spotify Embed URL (url)
- Booking Agent Name (text)
- Booking Agent Email (email)
- Booking Agent Phone (text)
- Social Links (dynamic list — platform select + URL)
  - Platform options: YouTube, Facebook, Instagram, SoundCloud, Twitter/X, Spotify

Save button: "Save Settings"

### Step 10 — Sanity Write Token

The admin needs a Sanity API token with write permissions.

Add to `.env.local`:
```
SANITY_WRITE_TOKEN=<generate in sanity.io → API → Tokens → Add API token → Editor role>
```

Add to Vercel environment variables as well.

Create `src/lib/sanity.server.ts` (server-only client with write token):
```typescript
import { createClient } from 'next-sanity'

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})
```

All admin mutations use `writeClient`. All public reads use the existing `client` (no token, CDN OK).

### Step 11 — Drag-to-Reorder Utility

Install `@dnd-kit/core` and `@dnd-kit/sortable` for drag-to-reorder functionality used in Albums, Musicians, Press, Photos, and Videos admin sections.

Create `src/components/admin/SortableList.tsx` — a reusable drag-to-reorder wrapper that:
- Accepts items with `_id` and `order` fields
- Renders children as draggable items
- On reorder: patches all affected documents in Sanity to update their `order` fields

---

## Environment Variables Summary

Add to `.env.local` and Vercel:
```
ADMIN_PASSWORD=<strong password for Conrad>
ADMIN_SESSION_SECRET=<random 32-char string>
SANITY_WRITE_TOKEN=<editor-role token from sanity.io>
```

---

## Verification

```bash
npm run build
npm run dev -- -p 3015
```

- [ ] /admin redirects to /admin/login when not authenticated
- [ ] Login with correct password sets session and shows dashboard
- [ ] Login with wrong password shows error
- [ ] Dashboard shows content counts
- [ ] Shows: create a new show, verify it appears on /shows
- [ ] Shows: edit a show, verify change appears on /shows
- [ ] Shows: delete a show, verify it disappears from /shows
- [ ] Albums: create a test album, verify it appears in /discs filmstrip
- [ ] Musicians: reorder musicians, verify order changes on /musicians
- [ ] Press: add a quote, verify it appears on /press
- [ ] Photos: upload a photo, verify it appears on /photos
- [ ] Videos: add a YouTube ID, verify embed appears on /videos
- [ ] Settings: update Spotify URL, verify home page player updates
- [ ] Log out, verify /admin redirects to login
- [ ] No console errors on any admin page
