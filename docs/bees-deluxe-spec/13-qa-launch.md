# Phase 13: QA + Launch

**Core Alignment:** Advances all Goals by verifying the complete site works correctly before Conrad sees it, and deploying to production.
**Depends on:** Phases 01–12

**Acceptance Criteria:**
- [ ] All pages pass visual check at 375px, 768px, and 1280px
- [ ] All Sanity content is live and rendering correctly
- [ ] All external links verified working
- [ ] Vercel environment variables complete
- [ ] `npm run build` passes with no errors
- [ ] DNS pointed to Vercel deployment
- [ ] beesdeluxe.com (or staging domain) loads the new site

---

## Pre-Launch Checklist

### Content Verification
- [ ] All 2026 upcoming shows entered in Sanity and rendering on home + shows pages
- [ ] All 7 albums in Sanity with covers, tracklists, credits, buy links
- [ ] All 8 musicians with photos (real photos, not placeholders)
- [ ] All 17 press quotes in Sanity
- [ ] All videos seeded with correct YouTube IDs
- [ ] Photos gallery populated
- [ ] siteSettings social links all correct and working
- [ ] Stage plot and EPK PDFs accessible via Google Drive links

### Cross-Breakpoint Visual Check (every page)
Run through each page at 375px, 768px, and 1280px:
- [ ] Home
- [ ] Shows
- [ ] Musicians
- [ ] Press
- [ ] Discs (filmstrip + all 7 album detail views)
- [ ] Photos
- [ ] Videos
- [ ] EPK
- [ ] Contact

### Functional Check
- [ ] Calendar dropdown works on Shows page and home widget (Google + ICS)
- [ ] Google Maps links open correctly for all test shows
- [ ] Phone "Call for Reservations" links work (tap on mobile)
- [ ] "Buy Tickets" links work where present
- [ ] Lightbox opens/closes/navigates on Photos page
- [ ] Discs filmstrip — all 7 albums clickable, detail panel updates
- [ ] Deep links work: /discs/hallucinate, /discs/speechless, etc.
- [ ] Contact form submits and shows success state
- [ ] All nav links route correctly
- [ ] Page transitions (directional slide) work in all directions
- [ ] Mobile hamburger menu opens/closes
- [ ] All external links open in new tab

### Performance
- [ ] Run Lighthouse on home page — target 90+ performance score
- [ ] Check for any large unoptimized images (should all be Next.js Image optimized)
- [ ] Verify no console errors on any page

### Vercel Environment Variables
Confirm all are set in Vercel dashboard:
- [ ] NEXT_PUBLIC_SANITY_PROJECT_ID
- [ ] NEXT_PUBLIC_SANITY_DATASET
- [ ] SANITY_API_TOKEN
- [ ] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

### Contact Form
- [ ] If using mailto fallback from Phase 10: flag for upgrade to Resend
- [ ] Confirm form submissions reach Conrad's inbox

### DNS Cutover
When Conrad approves the staging preview:
1. Add beesdeluxe.com as a custom domain in Vercel
2. Update DNS A record or CNAME at Conrad's domain registrar
3. Verify SSL certificate provisioned
4. Test beesdeluxe.com loads new site
5. Verify old Wix site is no longer serving (may take up to 48 hours for DNS propagation)

### Post-Launch
- [ ] Share staging URL with Conrad for review before DNS cutover
- [ ] Document the Sanity Studio URL and login process for Conrad
- [ ] Write a one-page "How to add a show" guide for Conrad
- [ ] Add site to Prest Group portfolio

---

## Conrad Handoff Guide (draft — finalize at launch)

```
BEES DELUXE WEBSITE — HOW TO ADD A SHOW

1. Go to [studio URL]/studio
2. Log in with your Sanity account
3. Click "Shows" in the left sidebar
4. Click the "+" button to create a new show
5. Fill in:
   - Date (required)
   - Venue Name (required) — this becomes the Google Maps link
   - Full Address (required) — used for Google Maps and calendar
   - City and State (required)
   - Start Time (required) — e.g. "8:00 PM"
   - Phone (optional) — if venue takes reservations
   - Ticket URL (optional) — paste the advance ticket link if there is one
   - Notes (optional) — e.g. "Opening for Joanna Connor", "No cover"
6. Click "Publish"

The show will appear on the website immediately.
To remove a past show: open it in Studio and click "Unpublish" or delete it.
```
