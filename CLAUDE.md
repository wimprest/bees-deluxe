# Bees Deluxe

## Overview

Mobile-first responsive rebuild of beesdeluxe.com (Wix → Next.js). Boston acid blues band site.

## Tech Stack

- Next.js 16.2.0 (App Router), TypeScript, Tailwind CSS v4
- Sanity CMS (next-sanity 12.1.3) — Studio at `/studio`
- Cloudinary (next-cloudinary 6.17.5) for image assets
- Radix UI, Framer Motion, Lucide icons, date-fns

## Directory Structure

```
src/
├── app/
│   ├── studio/[[...tool]]/page.tsx   # Embedded Sanity Studio
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/
│   ├── sanity.ts        # Sanity client
│   ├── cloudinary.ts    # Cloudinary config
│   ├── calendar.ts      # Google Calendar + ICS link generators
│   ├── maps.ts          # Google Maps URL generator
│   └── queries.ts       # All GROQ queries
├── sanity/
│   └── schemas/         # 7 schema types (show, musician, album, pressQuote, video, photo, siteSettings)
└── types/
    └── index.ts         # CalendarLinkOptions type
```

## Commands

```bash
npm run dev          # Dev server on port 3015
npm run build        # Build verification
```

## Gotchas

- Parent `E:\Code\package-lock.json` causes a Turbopack workspace root warning during build. Harmless but noisy. Can silence with `turbopack.root` in next.config.ts if needed.
- Sanity project not yet created — `.env.local` has empty placeholders. Studio will error until project ID is populated.
- `sanity typegen generate` and `sanity deploy` require a live Sanity project connection.

## Approved Tools

The following MCP tool actions are pre-approved for this project:
- plugin:playwright:playwright - Navigate to a URL
- plugin:playwright:playwright - Take a screenshot
- plugin:playwright:playwright - Click