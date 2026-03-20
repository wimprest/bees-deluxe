# Bees Deluxe — Phase Index

## Phase List

| # | Name | Status | Description |
|---|------|--------|-------------|
| 01 | Scaffold + Sanity Schema | — | Project init, Sanity schema, Cloudinary config, type definitions |
| 02 | Global Layout + Design System | — | Nav, footer, color tokens, typography, delimiter component, section divider component |
| 03 | Home Page | — | Hero, shows widget (live Sanity data), Spotify embed, review/video section, merch callout |
| 04 | Shows Page | — | Full show listing, calendar dropdown, Google Maps links, phone conditionals, hairline rule treatment |
| 05 | Musicians Page | — | Band members grid, scroll-animate stagger, mobile expand/collapse bios, guests section |
| 06 | Discs Page | — | Filmstrip component, album detail panel, deep-link routing (/discs/[slug]) |
| 07 | Press Page | — | Quote layout, publication links, featured photo, section divider treatment |
| 08 | Photos + Videos | — | Lightbox photo gallery (Sanity/Cloudinary), video grid (YouTube embeds via Sanity) |
| 09 | EPK Page | — | Faithful responsive rebuild of existing EPK — structure and content preserved |
| 10 | Contact Page | — | Clean form, suggested placeholder text, social icons header/footer only, no body socials |
| 11 | Sanity Studio + Admin | — | Studio config, desk structure, role/access, show management workflow |
| 12 | Content Migration | — | Populate all Sanity documents with migrated content from beesdeluxe.com |
| 13 | QA + Launch | — | Cross-breakpoint review, Vercel deploy, DNS cutover |

## Dependencies

| Phase | Depends On | Depended On By |
|-------|------------|----------------|
| 01 | — | All |
| 02 | 01 | 03–10 |
| 03 | 01, 02 | — |
| 04 | 01, 02 | 03 (shows widget) |
| 05 | 01, 02 | — |
| 06 | 01, 02 | — |
| 07 | 01, 02 | — |
| 08 | 01, 02 | — |
| 09 | 01, 02 | — |
| 10 | 01, 02 | — |
| 11 | 01 | 12 |
| 12 | 01–11 | 13 |
| 13 | 01–12 | — |

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-19 | Single `/discs` route with filmstrip + detail panel, deep-linked via slug | Better UX than 6 separate pages; SEO preserved via slug routing |
| 2026-03-19 | Calendar dropdown: Google + Apple/Outlook (.ics) | Reference implementation: themattswantonband.com/shows |
| 2026-03-19 | Photos internalized from Flickr via Sanity/Cloudinary | Flickr dependency removed; lightbox display on-site |
| 2026-03-19 | Social icons: white on black in header, black on teal in footer, homogenized sizing | Conrad's current site has color inconsistency and size variance; clean this up |
| 2026-03-19 | Show listing: 4 lines max (date, venue+phone, location, time), hairline teal rule between entries | Carries Conrad's minimalist aesthetic; phone number appears inline right of venue name when present |
| 2026-03-19 | EPK page: faithful responsive rebuild, no redesign | EPK is a sales tool for paid bookings — Conrad's structure is deliberate |
| 2026-03-20 | Shows page image uses Phase 03 band-photo as placeholder | Proper shows image to be sourced in Phase 12 |
