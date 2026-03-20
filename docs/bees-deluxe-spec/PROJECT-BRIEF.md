# Bees Deluxe — Project Brief

> **Created:** 2026-03-19
> **Owner:** Wim Prest / Prest Group
> **Verification command:** `npm run build`

## Core Contract

Replace an existing Wix site that fails on mobile with a responsive, mobile-first Next.js site that serves concert-goers searching for the band on their phones. The new site preserves Conrad Warre's deliberate visual aesthetic — teal on black, hard left/right content delimiters, minimalist typography — while modernizing the presentation layer with gradients and current web patterns. All dynamic content (shows, musicians, albums, press, videos, photos) is managed through a Sanity CMS admin interface.

## Success Criteria

1. Site renders correctly and is fully navigable at 375px, 768px, and 1280px breakpoints
2. All content from beesdeluxe.com is accounted for in the new site — nothing dropped
3. Conrad can update shows, and only shows, without touching code or calling anyone
4. Every page passes `npm run build` with no errors

## This Project Is NOT

- A redesign that abandons Conrad's aesthetic identity
- A portfolio showcase that prioritizes novelty over the band's needs
- A platform that requires Conrad to learn a complex CMS workflow — show management must be dead simple

## Goals

1. **Mobile-first responsive rebuild** — The primary use case is a fan standing outside a venue on their phone. Every layout decision serves that user first.
2. **Preserve visual identity** — Teal/black palette, hard content delimiters, horizontal rule + text section dividers, pipe-separated nav, minimalist show listings. Modernize with gradients and current typography; do not reinvent.
3. **Sanity-powered content** — Shows, musicians, albums, press quotes, videos, and photos all managed via Sanity Studio embedded in the site's admin section. Conrad's only regular task is entering new show dates.

## Parking Lot

### Serves Core (Future Phases)
- Blues Torch ARG integration hooks (hidden pages, cipher elements in photo alt tags, faction-adjacent content)

### Tangential (Evaluate Later)
- Mailing list / newsletter signup
- Merch integration beyond current Printify link
