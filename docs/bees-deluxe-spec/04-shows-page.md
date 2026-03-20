# Phase 04: Shows Page

**Core Alignment:** Advances **Goals 1 and 3** by building the primary tour date destination — minimalist, mobile-first, and fully Sanity-powered so Conrad can manage his own show listings.
**Depends on:** Phase 01, Phase 02

**Acceptance Criteria:**
- [ ] All upcoming shows render from Sanity with correct data
- [ ] Date links to calendar dropdown (Google + Apple/Outlook)
- [ ] Venue name links to Google Maps in new tab
- [ ] Phone number renders as "Call for Reservations" tel: link when present, absent when not
- [ ] Hairline teal rule separates each show entry
- [ ] SectionDivider "Bees Deluxe Shows" renders at top of listing
- [ ] Image renders to the right of the show listing on desktop
- [ ] Page passes `npm run build` with no TypeScript errors
- [ ] Visual spot-check at 375px and 1280px

---

## Reference

Live site: https://www.beesdeluxe.com/info  
Matt Swanton Band implementation: https://www.themattswantonband.com/shows  
Reference the Matt Swanton Band codebase for calendar dropdown and Google Maps link implementation — the pattern is identical, only the visual treatment differs.

---

## Visual Design

Conrad's current shows page is deliberately minimal — a tight list of dates with almost no chrome. The new version carries that forward with the following treatment:

Each show entry is 4 lines maximum:
```
Line 1: Day, Month Date Year          (font-heading, brand.white, text-base)
Line 2: Venue Name        Phone       (venue: brand.teal link; phone: brand.muted, text-sm, right-aligned — conditional)
Line 3: City, State                   (brand.muted, text-sm)
Line 4: Start Time                    (brand.muted, text-sm)
         [Add to Calendar ▾]          (brand.teal, text-xs, dropdown trigger)
```

Separator: `<hr>` — 1px, brand.teal, opacity-20, full width of the listing column. No margin bloat — tight `my-4` above and below.

No cards. No shadows. No background surfaces. Just text and a whisper of color between entries.

---

## Steps

### Step 1 — Shows Page Image

Download and save to `public/images/shows/`:

The current site uses a band performance image to the right of the show listing. Use the band photo already downloaded in Phase 03 (`public/images/home/band-photo.jpg`) — copy it to `public/images/shows/shows-hero.jpg` for semantic clarity. This gets replaced with a proper shows-specific image in Phase 12 if Conrad provides one.

### Step 2 — AddToCalendar Component

Create `src/components/shows/AddToCalendar.tsx`:

```typescript
// Props: show: Show
// Renders a dropdown button with two options:
//   - "Google Calendar" → opens generateGoogleCalendarUrl() in new tab
//   - "Apple / Outlook" → triggers downloadICS()
//
// Visual:
//   - Trigger: text-xs, brand.teal, uppercase, tracking-wide
//     Label: "Add to Calendar ▾" (use ChevronDown from lucide-react)
//   - Dropdown: brand.charcoal background, border 1px brand.teal opacity-30
//     Items: py-2 px-3, text-sm, brand.white, hover:brand.teal
//   - Dropdown closes on selection or outside click
//   - Use Radix UI Popover or a simple useState toggle — keep it lightweight
//
// Calendar event details to pass:
//   title: `Bees Deluxe at ${show.venueName}`
//   date: show.date (ISO string)
//   location: `${show.venueName}, ${show.venueAddress}`
//   notes: show.notes ?? undefined
//
// Reference the Matt Swanton Band implementation for generateGoogleCalendarUrl
// and generateICSContent — these utility functions already exist in src/lib/calendar.ts
// from Phase 01. Wire them up here.
```

### Step 3 — ShowListItem Component

Create `src/components/shows/ShowListItem.tsx`:

```typescript
// Props: show: Show
//
// Renders a single show entry — 4 lines + calendar trigger:
//
// Line 1 — Date
//   Format: "Thursday, April 2, 2026" using date-fns format(parseISO(show.date), 'EEEE, MMMM d, yyyy')
//   Style: font-heading, text-base, brand.white
//
// Line 2 — Venue + Phone (conditional)
//   Layout: flex justify-between items-baseline
//   Left: venue name as Google Maps link
//     - generateGoogleMapsUrl(show.venueName, show.venueAddress) from src/lib/maps.ts
//     - Style: brand.teal, hover:brand.tealLight, no underline, text-sm
//     - Opens in new tab
//   Right (conditional — only if show.phone exists):
//     - <a href={`tel:${show.phone}`}>Call for Reservations</a>
//     - Style: brand.muted, text-xs, hover:brand.white
//
// Line 3 — Location
//   `${show.city}, ${show.state}`
//   Style: brand.muted, text-sm
//
// Line 4 — Time + Calendar
//   Layout: flex justify-between items-center
//   Left: show.startTime — brand.muted, text-sm
//   Right: <AddToCalendar show={show} />
//
// Notes (conditional — only if show.notes exists):
//   Render below Line 4, brand.muted, text-xs, italic
//   e.g. "Supporting as special guest" or "No cover"
```

### Step 4 — Shows Page

Replace the stub at `src/app/shows/page.tsx` with the full shows page.

```typescript
// Server component — fetch all upcoming shows from Sanity
// Query: allShowsQuery from src/lib/queries.ts
// Filter client-side to future dates only (date >= today)
//
// Page layout:
//
// <PageShell>
//   <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 py-16">
//
//     {/* Left column — show listing */}
//     <div>
//       <SectionDivider label="Bees Deluxe Shows" />
//       {upcomingShows.length > 0 ? (
//         <div>
//           {upcomingShows.map((show, index) => (
//             <>
//               <ShowListItem key={show._id} show={show} />
//               {index < upcomingShows.length - 1 && (
//                 <hr className="border-t border-brand-teal opacity-20 my-4" />
//               )}
//             </>
//           ))}
//         </div>
//       ) : (
//         <p className="text-brand-muted">Check back for upcoming shows.</p>
//       )}
//     </div>
//
//     {/* Right column — image, desktop only */}
//     <div className="hidden lg:block">
//       <Image
//         src="/images/shows/shows-hero.jpg"
//         alt="Bees Deluxe live"
//         width={380}
//         height={500}
//         className="object-cover w-full"
//         // Sharp corners — no border-radius
//       />
//     </div>
//
//   </div>
// </PageShell>
//
// Note: The right column image is hidden on mobile — shows listing goes full width.
// The SectionDivider sits above the listing only, not spanning both columns.
```

### Step 5 — Wire UpcomingShowsWidget to Live Data

Now that the shows page and Sanity query infrastructure are confirmed working, update `src/components/shows/UpcomingShowsWidget.tsx` on the home page to confirm it's using the same `upcomingShowsQuery` from `src/lib/queries.ts`. No visual changes — just verify the data plumbing is consistent between home and shows page.

### Step 6 — Update 00-index.md

Add to the Decisions Log:
```
| 2026-03-20 | Shows page image uses Phase 03 band-photo as placeholder | Proper shows image to be sourced in Phase 12 |
```

---

## Sanity Content Note

The shows page will render empty until show documents are entered in Sanity Studio. Phase 12 covers full content migration. For development and visual verification, manually enter 2-3 test show documents directly in Sanity Studio at `/studio` before running the visual spot-check. Use real upcoming dates from beesdeluxe.com:

```
Show 1:
  date: 2026-04-02T20:00:00
  venueName: Sanctuary Bar & Lounge
  venueAddress: 1 Nason St, Maynard, MA 01754
  city: Maynard
  state: MA
  startTime: 8:00 PM

Show 2:
  date: 2026-04-08T20:00:00
  venueName: Bull Run
  venueAddress: 215 Great Road, Shirley, MA 01464
  city: Shirley
  state: MA
  startTime: 8:00 PM
  phone: 9786250089

Show 3:
  date: 2026-05-02T20:00:00
  venueName: Grumpy's
  venueAddress: 29 Scranton Ave, Falmouth, MA 02540
  city: Falmouth
  state: MA
  startTime: 8:00 PM
```

Show 2 has a phone number so you can verify the conditional "Call for Reservations" render.

---

## Verification

```bash
npm run build
npm run dev -- -p 3015
```

Navigate to localhost:3015/shows and check:
- [ ] 375px: shows stack full width, no overflow, all tap targets finger-friendly
- [ ] 1280px: show listing left, image right, correct column proportions
- [ ] Hairline rules visible between entries
- [ ] SectionDivider "Bees Deluxe Shows" renders correctly
- [ ] Venue name taps open Google Maps (new tab)
- [ ] "Add to Calendar" dropdown opens with two options
- [ ] Google Calendar option opens Google Calendar in new tab with pre-filled event
- [ ] Apple/Outlook option triggers .ics download
- [ ] Show with phone number shows "Call for Reservations" — show without does not
- [ ] Home page shows widget also rendering the test shows correctly
