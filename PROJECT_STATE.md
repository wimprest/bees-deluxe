# Bees Deluxe — Project State

## Current Status

Phases 01–13 complete. Build passes clean. Site is QA-verified and ready for Vercel deployment + DNS cutover.

**What's built:**
- Next.js 16.2.0 project with TypeScript, Tailwind v4, ESLint
- Sanity project (ID: 5mm9b0kb) with 7 schemas, generated types, embedded Studio at `/studio`
- Cloudinary config wired (folder: bees-deluxe)
- Global layout: Nav, Footer, PageShell, SectionDivider, SiteTagline, direction-aware page transitions
- All 9 public pages: Home, Shows, Musicians, Press, Discs, Photos, Videos, EPK, Contact
- Full admin CRUD suite: dashboard, login, shows, musicians, albums, press, videos, photos, settings
- 197 shows migrated from beesdeluxe.com (2023–2026)
- 8 API routes for admin operations
- GitHub repo: wimprest/bees-deluxe

**Sanity data seeded:**
- 16+ upcoming 2026 shows, 181 past shows (2023–2026)
- 8 musicians with photos and bios
- 7 albums with covers, tracklists, credits, buy links
- 17 press quotes
- 17 YouTube videos
- 16 gallery photos
- siteSettings with social links

## Next Steps

1. Set Vercel environment variables (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
2. Deploy to Vercel, share staging URL with Conrad
3. DNS cutover: add beesdeluxe.com domain, update records, verify SSL
4. Finalize Conrad handoff guide
5. Contact form email delivery (Resend integration — deferred)

## Open Questions / Blockers

- Merch t-shirt image is low-res
- Contact form email delivery not yet wired (intentionally deferred)

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-19 | Next.js 16.2.0 | `create-next-app@latest` |
| 2026-03-19 | Tailwind v4 CSS config | Next.js 16 default |
| 2026-03-19 | Teal tokens #00DDDD | User-requested |
| 2026-03-19 | brand.red #E0003B | Nav active + album titles |
| 2026-03-20 | Custom CSS page transitions | AnimatePresence flash issue in App Router |
| 2026-03-20 | Album covers as local images | Sanity image assets deferred to Phase 12 |
| 2026-03-20 | turbopack.root: parent dir | Workspace hoisting requires parent root for module resolution |
| 2026-03-20 | Contact form email deferred | Ship site first, wire Resend post-launch |

## Work Log

| Date | Summary |
|------|---------|
| 2026-03-19 | Phase 01–03: Scaffold, layout, home page. |
| 2026-03-20 | Phase 04: Shows page with calendar, tickets, silo image, tagline. |
| 2026-03-20 | Phase 05: Musicians page with stagger animation, red cards, bio truncation. |
| 2026-03-20 | Page transitions: direction-aware CSS slides replacing AnimatePresence. |
| 2026-03-20 | Phase 06: Discs page — filmstrip, album detail, deep-link routing, 7 albums seeded. |
| 2026-03-20 | Phase 07: Press page — 17 quotes, interviews & reviews section. |
| 2026-03-20 | Phase 08: Photos gallery (16 photos, lightbox) + Videos page (17 YouTube embeds). |
| 2026-03-20 | Phase 09: EPK page — bio, featured albums, stage plot + EPK PDF downloads. |
| 2026-03-20 | Phase 10: Contact page — form with press/booking/merch info. |
| 2026-03-20 | Phase 11: Admin panel — full CRUD for all content types, image upload, reorder. |
| 2026-03-20 | Phase 12: Data migration — 197 shows from beesdeluxe.com, musician photos, showRole toggle. |
| 2026-03-20 | Phase 13: QA — build fix (turbopack.root for workspace), all 9 pages verified at 375/768/1280px, functional tests passed, image warnings fixed. |
