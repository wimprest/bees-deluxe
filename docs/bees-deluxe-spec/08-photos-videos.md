# Phase 08: Photos + Videos Pages

**Core Alignment:** Advances **Goals 1 and 2** by internalizing the Flickr photo gallery and building a proper video grid — both managed through Sanity, both responsive.
**Depends on:** Phase 01, Phase 02

**Acceptance Criteria:**
- [ ] Photos page renders a lightbox gallery with placeholder images
- [ ] Lightbox opens on photo click, navigates with arrows, closes with X or Escape
- [ ] Videos page renders YouTube embeds in a responsive grid
- [ ] Both pages pull from Sanity
- [ ] Both pages pass `npm run build` with no TypeScript errors
- [ ] Visual spot-check at 375px and 1280px

---

## Photos Page

### Design
Responsive grid of photo thumbnails. Click opens a lightbox (full-screen overlay with prev/next navigation). Sharp corners throughout. No captions visible in grid — caption appears in lightbox below image if present.

Grid layout: 3 columns desktop, 2 columns tablet, 1 column mobile.

### Implementation

Create `src/components/photos/PhotoGallery.tsx` (client component):
```typescript
// Props: photos: Photo[]
// State: selectedIndex: number | null
//
// Grid: responsive CSS grid, gap-2 (tight grid, no large gaps)
// Each thumbnail: aspect-ratio 1/1, object-cover, cursor-pointer,
//   hover: opacity-80 transition
//
// Lightbox (when selectedIndex !== null):
//   Fixed overlay: bg-black/90, z-50
//   Centered image: max-h-[85vh], max-w-[90vw], object-contain
//   Caption below image if present: brand.muted, text-sm, text-center
//   Left arrow: absolute left-4, lucide ChevronLeft, brand.white
//   Right arrow: absolute right-4, lucide ChevronRight, brand.white
//   Close button: absolute top-4 right-4, lucide X, brand.white
//   Keyboard: ArrowLeft, ArrowRight, Escape — add/remove event listeners
//   Click outside image closes lightbox
```

Replace stub at `src/app/photos/page.tsx`:
```typescript
// Server component — fetch all photos from Sanity (allPhotosQuery)
// <PageShell>
//   <SectionDivider label="Bees Deluxe Photos" />
//   <PhotoGallery photos={photos} />
//   <p className="text-brand-muted text-xs text-center mt-8">
//     Photos sourced from the Bees Deluxe archive. 
//     Additional photos on{' '}
//     <a href="https://www.flickr.com/photos/beesdeluxe/" 
//        target="_blank" className="text-brand-teal">Flickr</a>.
//   </p>
// </PageShell>
```

### Photo Seed Data
The Flickr gallery (flickr.com/photos/beesdeluxe) has approximately 16 photos. Claude Code should use Playwright to visit the Flickr page, capture the photo URLs, download them to `public/images/photos/`, and seed them as Sanity photo documents. 

If Flickr blocks automated access, use these placeholder entries with the band photos already downloaded in earlier phases and note in the Phase Report that the full photo set requires manual upload in Phase 12.

---

## Videos Page

### Design
Responsive grid of YouTube embeds. 2 columns desktop, 1 column mobile. Each embed has a title below it. Featured video (order: 1) gets full-width treatment at the top, then grid below.

### Video Seed Data

The current Wix videos page lists titles but not YouTube IDs. Claude Code should visit `https://www.youtube.com/@beesdeluxe/videos` using Playwright to find the actual video IDs for these titles, then seed them in Sanity.

Known videos from the Wix page (find YouTube IDs for each):
1. "Palace of the King" — live at Regent Theatre, Arlington MA (featured: true, order: 1)
2. "Damn Your Eyes" — live at Orpheum Theatre (order: 2)
3. "Zoe's Chromatic Blues" — instrumental from "a can of bees" (order: 3)
4. "Green Tea" — John Scofield, live at Ryles Jazz Club, Cambridge MA (order: 4)
5. "Prison of Love" — live at Boston City Winery (order: 5)
6. "If 6 Was 9" — Jimi Hendrix, live at Jake's Dixie Roadhouse, Waltham MA (order: 6)
7. "3454 miles" — from Space Age Bachelor Pad Blues (order: 7)
8. "Goodbye Pork Pie Hat / Brush with the Blues" — Mingus/Beck, Gardner Ale House (order: 8)
9. "Downhearted" — live at Bull Run, New Year's Eve 2019 (order: 9)
10. "Georgia on My Mind" — live at Bull Run, video by MoeJoe Vision (order: 10)

Also add the video already embedded on the home page:
- "Bees Deluxe live at the Lizzie Rose Music Room" — ID: WSUWKOIGip0 (order: 0, featured: true)

If YouTube IDs cannot be found for some titles, seed what's findable and flag the rest for Phase 12.

### Implementation

Create `src/components/videos/VideoGrid.tsx`:
```typescript
// Props: videos: Video[]
// Split: featuredVideos = videos where featured === true
//        gridVideos = remaining videos
//
// Featured video(s): full content-column width embed
//   iframe: width="100%" height="400" (desktop), height="220" (mobile via aspect-ratio)
//   Title below: font-heading, brand.white, text-base
//   Description if present: brand.muted, text-sm
//
// Grid videos: 2-column grid desktop, 1-column mobile
//   iframe: aspect-video (16:9), width="100%"
//   Title below: brand.white, text-sm
//
// All iframes: frameBorder="0", allow="accelerometer; autoplay; clipboard-write;
//   encrypted-media; gyroscope; picture-in-picture", allowFullScreen, loading="lazy"
//
// YouTube subscribe CTA at bottom:
//   "More Bees Deluxe videos →" link to https://www.youtube.com/@beesdeluxe/videos
//   brand.teal, hover:brand.tealLight
```

Replace stub at `src/app/videos/page.tsx`:
```typescript
// Server component — fetch all videos from Sanity (allVideosQuery)
// <PageShell>
//   <SectionDivider label="Bees Deluxe Videos" />
//   <VideoGrid videos={videos} />
// </PageShell>
```

---

## Verification

```bash
npm run build
npm run dev -- -p 3015
```

- [ ] localhost:3015/photos — grid renders, lightbox opens/closes, keyboard nav works
- [ ] localhost:3015/videos — featured embed full width, grid below, all titles present
- [ ] 375px: photos single column, videos single column
- [ ] No console errors
