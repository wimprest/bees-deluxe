# Phase 05: Musicians Page

**Core Alignment:** Advances **Goals 1 and 2** by building the band member showcase — scroll-triggered stagger animation, mobile-first bio truncation, and two distinct sections matching Conrad's current page structure.
**Depends on:** Phase 01, Phase 02

**Acceptance Criteria:**
- [ ] Current band members render in correct order with photo, name, role, and bio
- [ ] Special Guests & Friends render as a separate section below
- [ ] Scroll-triggered stagger animation fires on both sections
- [ ] Mobile: bio truncates to 2 sentences with "Read more" expand toggle
- [ ] Desktop: full bio visible, no truncation
- [ ] Page passes `npm run build` with no TypeScript errors
- [ ] Visual spot-check at 375px and 1280px

---

## Reference

Live site: https://www.beesdeluxe.com/musicians

Conrad's current page animates each musician card in from the left, stacking quickly one after another as the section enters the viewport. The effect is deliberate — it feels like a band taking the stage. Replicate this intent with a scroll-triggered stagger using framer-motion (already installed).

---

## Content Reference

### Current Band Members (isCurrentMember: true)

**Conrad Warre** — Guitar & Vocals
Photo: https://static.wixstatic.com/media/0e02b1_bacbbc7b21f640d7a24ec0026af26bc6~mv2.png (placeholder — use musician photo if available, otherwise download EPK photo in Phase 12)
Bio: Conrad has lived and played in London, New York, Austin, Paris, and Boston. He's toured around Europe with such bands as The English Beat, Joe Jackson, the Specials, and the Selector. He's played at CBGB's and at the Hammersmith Palais. Responsible for bringing Bob Mould's band Sugar to Rykodisc, he has held various jobs including guitar-player, band manager, special-effects builder, illustrator, music journalist, as well as record company production manager.
Order: 1

**Carol Band** — Keyboards, Vocals & Harmonica
Bio: With a name like Band, Carol had no choice. At 12 she accompanied the Baptist church choir in Connecticut, then moved on to playing folk rock in coffeehouses. She discovered jazz and blues after BB King bought her a drink at Jonathan Swifts in Cambridge and never looked back. She's studied theory with Don Hemwall, she cites Bill Evans, Ray Charles and John Medeski as influences and has graced the stage at many Boston-area clubs including Johnny D's, Ryles, the Lilypad and The House of Blues.
Order: 2

**Paul Giovine** — Drums & Percussion
Bio: Paul began playing professionally while still in high school. His bands opened shows for legends such as Bo Diddley, Fats Domino and Jerry Lee Lewis. He studied Music Education at the University of Connecticut, then transferred to the Berklee College of Music. Paul studied with Mike Mangini (Extreme, Stevie Vai, Dream Theater) and Joe Pet (The Joe Perry Project). Paul has opened for artists such as The Gin Blossoms, Jessica Simpson & Colin Raye and performed live with blues guitarist Keb' Mo'.
Order: 3

**Adam Sankowski** — Bass Guitar
Bio: Adam bounced around in basement bands while in music school joining two early 2000's Boston indie troubadours: The Grownup Noise who toured much of the country many times with, and post-punk rockers Horeshands. He divides his time working as a music therapist at Mass General with oncology patients and with special needs students.
Order: 4

### Special Guests & Friends (isCurrentMember: false)

**Jeff Lopez** — Bass
Bio: New York based bass player Jeff Lopez, is an accomplished bandleader, composer, and arranger. Lopez has played 35 countries and 50 states. Gigged at venues from CBGBs to Carnegie Hall; football stadiums to coffee shops.
Order: 1

**Dylan DiChiara** — Drums
Bio: Born and raised in Massachusetts, Dylan DiChiara is a professional drummer, educator, multi-instrumentalist, and songwriter. After a brief stint at UMass Lowell Dylan began playing and teaching professionally in 2011, hitting the road with acts such as Erin Harpe & the Delta Swingers, and playing packed clubs and functions around New England with American Midnight. An avid student, writer, and listener, Dylan brings an attention to detail and a sincere love of music to any project he signs onto.
Order: 2

**Allyn 'Aldo' Dorr** — Bass & Vocals
Bio: Starting in the early 70's on Cape Cod and later, Amherst/Northampton, Aldo survived disco and the oil crisis, gigged and recorded in an eclectic assortment of bands (big band jazz, psychedelic jam, classic country, purist reggae, and of course, blues) culminating in the early 80's with New England reggae favorites, Loose Caboose. On the road around New England and New York, Aldo has performed in bands that opened for Taj Mahal, Gil Scott-Heron, Bonnie Raitt, and Roomful of Blues.
Order: 3

**Mike Wormwood** — Bass & Vocals
Bio: Mike Wormwood, North Shore Massachusetts native bassist & vocalist, when he's not playing with Bees Deluxe, plays regularly for Don Campbell Music and the Wormwoods, and the Legolas band.
Order: 4

---

## Steps

### Step 1 — Seed Musician Data in Sanity

Before building the page, enter all 8 musicians as Sanity documents via `/studio`. Use the content reference above. For photos, use a placeholder image for now — musician headshots will be sourced in Phase 12. A solid charcoal square placeholder is fine.

If Sanity Studio isn't showing a Musician document type, check that the schema is registered in `src/sanity/schemas/index.ts` and that `sanity typegen generate` has been run.

### Step 2 — MusicianCard Component

Create `src/components/musicians/MusicianCard.tsx`:

```typescript
// Props: musician: Musician, index: number (for stagger delay)
//
// Layout — desktop:
//   Square photo (aspect-ratio: 1/1) — full width of card
//   Sharp corners — no border-radius
//   Name below photo: font-heading, text-xl, brand.white
//   Role below name: brand.teal, text-sm, uppercase, tracking-wide
//   Bio below role: brand.white, text-sm, leading-relaxed
//   — Desktop: full bio visible
//   — Mobile: truncated (see Step 3)
//
// Animation (framer-motion):
//   Initial: { opacity: 0, x: -40 }
//   Animate: { opacity: 1, x: 0 }
//   Transition: { duration: 0.4, delay: index * 0.1 }
//   Trigger: useInView — fire once when card enters viewport
//   Use: `ref` from useInView passed to the motion.div wrapper
//
// The stagger effect comes from index * 0.1 delay — card 0 fires immediately,
// card 1 fires 100ms later, card 2 at 200ms, etc. This replicates the
// "band taking the stage" feel of Conrad's current animation.
//
// Photo handling:
//   If musician.photo is a Sanity image asset: use urlFor() from @sanity/image-url
//   If no photo: render a brand.charcoal placeholder div with the musician's
//   initials centered in brand.teal — graceful fallback for Phase 12
```

### Step 3 — Mobile Bio Truncation

Add expand/collapse behavior to MusicianCard for mobile:

```typescript
// On mobile (< md breakpoint):
//   Show first 2 sentences of bio by default
//   "Read more" link below truncated text: brand.teal, text-xs
//   Clicking expands to full bio
//   "Read less" link appears at bottom of expanded bio
//   Use useState for expanded/collapsed state
//   Sentence detection: split on '. ' and take first 2 items + '.'
//
// On desktop (md+):
//   Full bio always visible
//   No truncation, no toggle
//   Hide the Read more/less toggle entirely
//
// Implementation note:
//   Use Tailwind's md: prefix to show/hide the toggle
//   The bio text itself should not be conditionally rendered differently
//   between server and client — use CSS classes, not conditional JSX,
//   to avoid hydration mismatches where possible
```

### Step 4 — Musicians Page

Replace the stub at `src/app/musicians/page.tsx`:

```typescript
// Server component — fetch all musicians from Sanity
// Query: allMusiciansQuery (ordered by isCurrentMember DESC, order ASC)
// Split results into two arrays:
//   currentMembers = musicians.filter(m => m.isCurrentMember)
//   guests = musicians.filter(m => !m.isCurrentMember)
//
// Page structure:
//
// <PageShell>
//   {/* Current Band Section */}
//   <section className="py-16">
//     <SectionDivider label="Bees Deluxe Musicians" />
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
//       {currentMembers.map((musician, index) => (
//         <MusicianCard key={musician._id} musician={musician} index={index} />
//       ))}
//     </div>
//   </section>
//
//   {/* Special Guests Section */}
//   <section className="py-16">
//     <SectionDivider label="Special Musical Guests & Friends" />
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
//       {guests.map((musician, index) => (
//         <MusicianCard key={musician._id} musician={musician} index={index} />
//       ))}
//     </div>
//   </section>
// </PageShell>
//
// Note: MusicianCard uses framer-motion and useInView — it must be a
// client component ('use client'). The page itself stays a server component.
// This is the standard Next.js App Router pattern for mixing server data
// fetching with client animations.
```

### Step 5 — GROQ Query Verification

Verify `allMusiciansQuery` in `src/lib/queries.ts` includes all needed fields:

```groq
*[_type == "musician"] | order(isCurrentMember desc, order asc) {
  _id,
  name,
  role,
  bio,
  isCurrentMember,
  order,
  photo {
    asset -> {
      _id,
      url
    }
  }
}
```

If the query is missing the photo asset projection, update it. Regenerate types if schema changes were needed.

---

## Visual Design Notes

- Grid: 4 columns on desktop (one per current member), 2 on tablet, 1 on mobile
- Photo aspect ratio 1:1 — square cards, sharp corners
- Generous gap between cards: `gap-8`
- The two sections (Musicians / Guests) are visually separated by the SectionDivider and spacing — no additional border or divider needed
- The stagger animation should feel quick and confident, not slow or dramatic — 0.4s duration, 0.1s between cards is the right pace

---

## Verification

```bash
npm run build
npm run dev -- -p 3015
```

Navigate to localhost:3015/musicians and check:
- [ ] 4 current members render in correct order
- [ ] 4 guests render below in correct order
- [ ] Scroll down to trigger animations — cards slide in from left with stagger
- [ ] At 375px: single column, bio truncates, "Read more" toggle works
- [ ] At 768px: 2-column grid
- [ ] At 1280px: 4-column grid, full bios visible, no toggle
- [ ] Placeholder photo renders gracefully (initials or charcoal square)
- [ ] No console errors related to framer-motion or hydration
