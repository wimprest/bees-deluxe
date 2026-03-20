# Phase 07: Press Page

**Core Alignment:** Advances **Goals 1 and 2** by building the press showcase — all quotes from Sanity, a featured photo, and a links section for interviews and reviews, modernized from the flat list on the current site.
**Depends on:** Phase 01, Phase 02

**Acceptance Criteria:**
- [ ] All press quotes render from Sanity in correct order
- [ ] Featured photo renders with correct image
- [ ] Press links section renders with all publication links
- [ ] Media inquiry CTA renders with link to contact page
- [ ] SectionDivider "Bees Deluxe Press" at top
- [ ] Page passes `npm run build` with no TypeScript errors
- [ ] Visual spot-check at 375px and 1280px

---

## Reference

Live site: https://www.beesdeluxe.com/press

The current page is a flat list of quotes followed by a photo and a list of links. The photo (elvis_x600.jpg) is actually a candid shot of the band performing — it's misnamed on Wix. The page is content-rich but visually flat. The new version elevates the quotes while keeping Conrad's aesthetic intact.

---

## Design Approach

Rather than a flat list, use a two-column quote layout on desktop — quotes arranged in a masonry-style grid (CSS columns, not JS masonry). Each quote gets the teal left-border blockquote treatment established on the home page. The featured photo sits between the quotes section and the links section as a visual break. The links section uses the SectionDivider treatment.

This is a deliberate upgrade from the current flat list while remaining true to Conrad's aesthetic — no cards, no colored backgrounds, just well-spaced text with teal accents.

---

## Content Reference

### Press Quotes (seed in Sanity as pressQuote documents)

Enter all of these in order. The `order` field controls display sequence.

1. "what might happen if Freddie King took a lot of acid then wrote a song with Pat Metheny and asked a strung-out Stevie Ray Vaughan to take a solo" — Blues Blast Magazine (order: 1)

2. "smoky vocals and gorgeous guitar work, offers a glossy, atmospheric sound" — Ed Symkus, Metro West Daily News (order: 2)

3. "This is what Steely Dan would sound like if they played the blues" — John Kereiff, The Rock Doctors Hot Wax Album Reviews (order: 3)

4. "The music, for me, has the same impact that Steely Dan did with their first couple of albums. They play very tight Blues that sounds as though they are jamming but this is very tight, and the playing is absolutely superb." — Andy Snipper, Music News (order: 4) — URL: https://www.music-news.com/review/UK/15712/Album/Bees-Deluxe

5. "Keep that in mind as you listen. Instrumentally, their brilliance lies in what lies beneath the threshold of hearing, the eerie subliminal messages in their songs without lyrics. Close your eyes and imagine you're at a concert – or go to a live one." — Rainey Wetnight, Blues Blast Magazine (order: 5)

6. "Bees Deluxe is a band that set out to yank blues into the 21st century, with guitar inspired by Jimi Hendrix and music influenced by a panoply of jazz, blues and rock artists." — Jay N. Miller, The Patriot Ledger (order: 6)

7. "You only have to look at the song titles to see that you do not have to deal with an average blues band here. It is almost impossible to stick a musical label on the Bees Deluxe from Boston. They keep it on 'acid bluesband' but I think that term is far too limited." — Peter Marinus, Blues Magazine (order: 7)

8. "Solid vocals surrounded by a tight band, and check out the tones he gets out of his guitar; this cat can play." — A.J. Wachtel (order: 8)

9. "showcasing their undoubted high-class musicianship. It's all blues music, just with a different coating that makes this band stand out from the rest." — Colin Campbell, Blues Matters! (order: 9)

10. "The record is incredibly pleasing, perhaps taking center stage at a hip Manhattan party, or mellowing down easy in the comfort of your own home with a big cocktail or two." — Karen Nugent, Boston Blues Society (order: 10)

11. "what an incredible voyage it was. One to be taken over and over, each time revealing some new nuance in this mind enriching musical gem." — Greg "Bluesdog" Szalony, Blues Blast Magazine (order: 11)

12. "Bees Deluxe, effortlessly incorporates American blues, R&B, British Invasion and soul into a hearty amalgam of guitar driven rock & roll that shakes and stirs." — Brian Owens, Metronome Magazine (order: 12)

13. "unquestionably unique; acid blues at its finest, dripping with virtuosity" — A.J. Wachtel, Boston Blues Society (order: 13)

14. "I have to recommend Bees Deluxe to music enthusiasts who appreciate strong musicians" — Georgetown Fats (order: 14)

15. "Bees Deluxe have found an important niche for themselves in the greater-Boston blues scene." — Bill Copeland, Bill Copeland Music News (order: 15)

16. "bluesy stuff. Jazz predominates, yet the blues, funk and lots of rock are there. If your taste in music is broad and you have an open mind to new stuff, you will enjoy this CD as I did." — Steve Jones, President of the Crossroads Blues Society (order: 16)

17. "Hendrixesque acid blues fills on a number like his 'I'm a Corpse part 2' are proof positive that the band isn't afraid to mix the brazen with the sedate. This combo is pushing the boundaries and are, in that sense, a band apart." — Francid DiMenno, The Noise (order: 17)

### Featured Photo
Download: `https://static.wixstatic.com/media/0e02b1_2ef9f2e8475d487c9e44b528480f913f~mv2.jpg`
Save as: `public/images/press/press-photo.jpg`
Alt text: "Bees Deluxe live performance"

### Press Links

**Interviews & Features:**
- Q&A with Danny Coleman of New Jersey Stage — https://www.newjerseystage.com/articles2/2025/03/06/rock-on-this-weeks-sound-bites3625/
- Q&A with Conrad Warre by Michael Limnios Blues Network — https://blues.gr/m/blogpost?id=1982923%3ABlogPost%3A490807
- Interview with Lucky Clark for Central Maine News — https://www.centralmaine.com/2022/09/28/conrad-warre-of-british-american-band-bees-deluxe-talks-about-oct-3-show-in-rockland/
- Ed Symkus interviews Bees Deluxe for the TAB — http://www.enterprisenews.com/article/20150905/ENTERTAINMENTLIFE/150907587
- Michalis Limnios Interviews Bees Deluxe for Blues @ Greece — http://blues.gr/profiles/blogs/an-interview-with-conrad-warre-of-bees-deluxe-an-acid-blues-rock
- A.J. Wachtel interviews Bees Deluxe — http://www.bostonblues.com/features.php?key=storyWarre
- The Patriot Ledger features Bees Deluxe — https://www.patriotledger.com/entertainmentlife/20181122/music-lots-of-buzz-around-newtons-bees-deluxe

**Album Reviews:**
- Hallucinate Review by Graham Munn for Blues & Booze — https://rhythmbooze.wordpress.com/2023/12/27/the-bees-deluxe-hallucinate/
- Blues Blast Magazine reviews "mouthful of bees" — http://www.bluesblastmagazine.com/bees-deluxe-mouthful-of-bees-album-review/
- Worcester Magazine reviews "mouthful of bees" — https://www.worcestermag.com/entertainmentlife/20191201/listen-up-bees-deluxe-solid-on-mouthful-of-bees
- Bill Copeland Music News reviews "Bluesapocalypse" — http://www.billcopelandmusicnews.com/2016/08/bees-deluxe-offer-spectacular-live-album-with-bluesapocalypse/
- Blues Blast Magazine reviews "a can of bees" — http://www.bluesblastmagazine.com/bees-deluxe-a-can-of-bees-album-review/
- Blues Blast Magazine reviews "Space Age Bachelor Pad Blues" — http://www.thebluesblast.com/bluesartists/beesdeluxe.htm
- The Boston Blues Society reviews "Space Age Bachelor Pad Blues" — http://www.bostonblues.com/features.php?key=cdBees-Space
- Blues Blast Magazine reviews "Trouble in Paradise" — http://www.bluesblastmagazine.com/bees-deluxe-trouble-in-paradise-album-review/
- Bill Copeland Music News reviews "Trouble in Paradise" — http://www.billcopelandmusicnews.com/2014/05/bees-deluxe-delight-and-impress-again-on-trouble-in-paradise-cd/

---

## Steps

### Step 1 — Seed Press Quotes in Sanity

Enter all 17 pressQuote documents in `/studio`. All fields: quote, attribution, publication, publicationUrl (where available), order.

Download the press photo to `public/images/press/press-photo.jpg`.

### Step 2 — PressQuote Component

Create `src/components/press/PressQuote.tsx`:

```typescript
// Props: quote: PressQuote
//
// Renders a single press quote in the established blockquote style:
//   - Left border: 2px solid brand.teal, opacity-60
//   - Quote text: brand.white, italic, text-sm, leading-relaxed, pl-4
//   - Attribution line below quote:
//     "— [bold white attribution], [muted publication as link if url present]"
//   - No card background — transparent, quote floats on the dark page
//   - mb-8 between quotes
```

### Step 3 — Press Page

Replace stub at `src/app/press/page.tsx`:

```typescript
// Server component — fetch all press quotes from Sanity
// Query: allPressQuotesQuery (ordered by order ASC)
//
// Page structure:
//
// <PageShell>
//
//   {/* Section 1 — Quotes */}
//   <section className="py-16">
//     <SectionDivider label="Bees Deluxe Press" />
//     
//     {/* Two-column CSS masonry on desktop, single column mobile */}
//     <div className="mt-12 columns-1 md:columns-2 gap-8">
//       {pressQuotes.map(quote => (
//         <div key={quote._id} className="break-inside-avoid mb-8">
//           <PressQuote quote={quote} />
//         </div>
//       ))}
//     </div>
//   </section>
//
//   {/* Section 2 — Featured Photo */}
//   <section className="py-8">
//     <Image
//       src="/images/press/press-photo.jpg"
//       alt="Bees Deluxe live performance"
//       width={760}
//       height={640}
//       className="w-full object-cover"
//       // Sharp corners, full content column width
//     />
//   </section>
//
//   {/* Section 3 — Media Inquiry CTA */}
//   <section className="py-8">
//     <p className="text-brand-white text-sm">
//       Need an interview with Bees Deluxe — or a review copy of a Bees Deluxe release?
//     </p>
//     <p className="text-brand-muted text-sm mt-1">
//       Send your credentials via the{' '}
//       <a href="/contact" className="text-brand-teal hover:text-brand-tealLight">
//         contact form
//       </a>
//       {' '}and we'll get back in touch.
//     </p>
//   </section>
//
//   {/* Section 4 — Press Links */}
//   <section className="py-8 pb-16">
//     <SectionDivider label="Interviews & Reviews" />
//     
//     <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
//       {/* Interviews column */}
//       <div>
//         <h3 className="text-brand-teal text-xs uppercase tracking-widest mb-4">
//           Interviews & Features
//         </h3>
//         {interviewLinks.map(link => (
//           <a key={link.url}
//             href={link.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block text-brand-white text-sm hover:text-brand-teal mb-2"
//           >
//             {link.label}
//           </a>
//         ))}
//       </div>
//
//       {/* Reviews column */}
//       <div>
//         <h3 className="text-brand-teal text-xs uppercase tracking-widest mb-4">
//           Album Reviews
//         </h3>
//         {reviewLinks.map(link => (
//           <a key={link.url}
//             href={link.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block text-brand-white text-sm hover:text-brand-teal mb-2"
//           >
//             {link.label}
//           </a>
//         ))}
//       </div>
//     </div>
//   </section>
//
// </PageShell>
//
// Note: Press links are hardcoded in the page component as a static array —
// they don't need to be in Sanity since Conrad won't be adding new press links
// himself. These are legacy links that won't change often. If Conrad ever needs
// to add links, that's a Phase 12+ Sanity enhancement.
```

---

## Visual Design Notes

- CSS `columns-2` masonry keeps the layout clean without JavaScript masonry libraries
- `break-inside-avoid` on each quote prevents awkward column breaks mid-quote
- Shorter quotes will naturally float to fill columns — the varied lengths of these 17 quotes work well for this layout
- The featured photo acts as a visual breath between the dense quote section and the links
- Press links should feel like a reference list — clean, understated, not promotional
- All external links open in new tab

---

## Verification

```bash
npm run build
npm run dev -- -p 3015
```

Navigate to localhost:3015/press and check:
- [ ] 375px: single column, all quotes render, photo full width, links stacked
- [ ] 1280px: two-column quote layout, no quotes split across columns awkwardly
- [ ] Featured photo renders correctly
- [ ] Media inquiry CTA links to /contact
- [ ] All press links present, open in new tab
- [ ] SectionDividers render correctly
- [ ] No console errors
