# Phase 09: EPK Page

**Core Alignment:** Advances **Goals 1 and 2** by faithfully rebuilding the EPK as a responsive page — content and structure preserved exactly, layout made mobile-first.
**Depends on:** Phase 01, Phase 02

**Acceptance Criteria:**
- [ ] All EPK content present and in correct order
- [ ] Band biography text complete and accurate
- [ ] All three album images present with correct links
- [ ] Stage plot image renders correctly
- [ ] Stage plot and EPK PDF download links work
- [ ] Press quote present
- [ ] Page passes `npm run build` with no TypeScript errors
- [ ] Visual spot-check at 375px and 1280px

---

## Critical Note

**Do not redesign this page.** The EPK is a sales tool used by Conrad to get paid bookings. Bookers and venue managers read this page. The structure, content, and tone are deliberate. Rebuild it faithfully as a responsive version. The only improvements allowed are: mobile responsiveness, image quality, and applying the site's typography/color system. No layout innovations.

---

## Content (in exact order)

### Section 1 — Biography

**Heading:** Bees Deluxe EPK

**Subheading:** Bees Deluxe biography

**Body text:**
Winners of the 2025 New Hampshire State Blues Challenge, and semi-finalists at the International Blues Challenge, in Memphis, January 2026.

Hell-bent on their mission to bring the blues into the 21st century, Bees Deluxe pushes the limits, colors outside the lines of convention and bends the genre to create a sound that is distinct, highly musical and yet deeply respectful of the blues tradition.

Fronted and founded by British guitarist Conrad Warre, the band's repertoire includes addictive originals, as well as fresh takes on tunes by artists ranging from Billie Holiday to Jimi Hendrix. Bees Deluxe has toured from Maine to Miami winning fans, amazing audiences and sharing the stage with headliners like: Ronnie Earl, Joanne Shaw Taylor, Mike Zito, Walter Trout, Joanna Connor, Matt Schofield, Mike Welch and Roomful of Blues.

Warre was in a high school band with Paul Kossoff, of the band Free. He toured Europe with Joe Jackson and The English Beat, then moved from London to New York where he became a fixture on the stage at the legendary CBGB's. In Boston, he formed Bees Deluxe to celebrate the music he fell in love with while touring and playing legendary London clubs like Rainbow Theatre, Ronnie Scott's, Dingwalls, The Music Machine and the Moonlight Club. Before forming Bees Deluxe he was Production Manager for Rykodisc the first music audio CD company in the States where he worked directly with Frank Zappa, Yoko Ono, Richard Thompson, David Bowie, Mickey Hart and others.

Carol Band is a classically trained pianist who was recruited while playing jazz in Boston's club scene. She also writes tunes and wows audiences with her blazing harmonica solos.

With a contagious enthusiasm, sense of fun and impeccable musicality, Bees Deluxe breaks all the rules and the blues are better for it. The band is equally adept at filling a dive bar dance floor or commanding a festival stage.

**Press quote block:**
Bees Deluxe: "...what might happen if Freddie King took a lot of acid then wrote a song with Pat Metheny and asked a strung-out Stevie Ray Vaughan to take a solo" — Blues Blast Magazine

### Section 2 — Photos

**Band photo:** Download from `https://static.wixstatic.com/media/0e02b1_35c9c5a82baa43a4b24282c7c3d8a049~mv2.jpg`
Save as `public/images/epk/epk-band-photo.jpg`

**Caption/link:** "Bees Deluxe: for this and other photos visit Photos" — link to /photos

### Section 3 — Albums (three side by side on desktop, stacked on mobile)

**Hallucinate** (cover already at public/images/albums/hallucinate.jpg)
- Link to /discs/hallucinate
- Quote: "Hallucinate is one of those albums that come along very infrequently, a complete outline of musical genius, songs that have substance not only individually, but as an entire album"
- Attribution: Joseph Timmons, Indie Pulse Reviews — link to https://indiepulsemusic.com/2023/12/02/indiepulse-reviews-hallucinate-the-new-album-of-all-original-tracks-by-bees-deluxe/

**Voice of Dog** (cover already at public/images/albums/voice-of-dog.jpg)
- Link to /discs/voice-of-dog
- Text: "Voice of Dog was produced, recorded & mixed by Joe Egan and co-produced by Warre, with special guests Richard 'Rosy' Rosenblatt on harmonica, Colin Rosso on drums, and Tad McKitterick & Jonn Smith on background vocals."

**Mouthful of Bees** (cover already at public/images/albums/mouthful-of-bees.jpg)
- Link to /discs/mouthful-of-bees
- Text: "Mouthful of Bees was produced by Egan & Warre, and it features three originals and seven classic blues songs re-interpreted by the band. Carol Band on keyboards & vocals, Allyn Dorr on bass & vocals, Paul Giovine on drums & percussion and Conrad Warre on guitar & vocals."

### Section 4 — Stage Plot + Downloads

**Stage plot image:** Download from `https://static.wixstatic.com/media/0e02b1_15ecf9f106cc446199546d00d6bdc932~mv2.jpg`
Save as `public/images/epk/stage-plot.jpg`
Full width image, sharp corners.

**Downloads:**
- "Download the Bees Deluxe stage plot" → https://drive.google.com/file/d/1BVMMJdYeyGdvB0ahhTwVVrdhz9yvvE01/view?usp=sharing (opens in new tab)
- "Download the printable interactive EPK" → https://drive.google.com/file/d/1lV77Ul1LsmARgtw8899H1Ublg5Q-_HA4/view?usp=sharing (opens in new tab)

Style download links as: brand.teal, text-sm, with a download icon (lucide: Download) before the text.

---

## Page Implementation

Replace stub at `src/app/epk/page.tsx`:

This is a static page — no Sanity queries needed. All content is hardcoded. Album cover images reference the files already in `public/images/albums/`.

```typescript
// Static server component — no data fetching
// <PageShell>
//   Section 1: Biography (full text as above)
//   Section 2: Band photo + Flickr link
//   Section 3: Three album grid (3-col desktop, 1-col mobile)
//     Each: cover image + quote/description below
//   Section 4: Stage plot image + download links
// </PageShell>
//
// Typography:
//   Page heading "Bees Deluxe EPK": font-heading, text-3xl, brand.white
//   Subheading "Bees Deluxe biography": font-heading, text-xl, brand.teal
//   Body text: body font, brand.white, leading-relaxed
//   Press quote: italic, teal left border blockquote treatment
//   Album titles: font-heading, brand.red
//   Download links: brand.teal, flex items-center gap-2
```

---

## Verification

```bash
npm run build
npm run dev -- -p 3015
```

- [ ] localhost:3015/epk — all sections present in correct order
- [ ] Biography text complete and accurate (spot-check against beesdeluxe.com/epk)
- [ ] Three album images render with correct links to /discs/[slug]
- [ ] Stage plot image renders at full width
- [ ] Both download links present and pointing to correct Google Drive URLs
- [ ] 375px: biography readable, albums stack single column, stage plot full width
- [ ] No console errors
