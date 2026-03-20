# Bees Deluxe — Project State

## Current Status

Phase 01 partially complete. All code scaffolded and building clean. Blocked on Sanity project creation (interactive step requiring user).

**What's built:**
- Next.js 16.2.0 project with TypeScript, Tailwind, ESLint
- 7 Sanity schema definitions (show, musician, album, pressQuote, video, photo, siteSettings)
- Embedded Sanity Studio route at `/studio`
- Cloudinary config, calendar/maps utilities, GROQ queries
- `npm run build` passes

**What's not done:**
- Sanity project not created (`.env.local` placeholders empty)
- `sanity deploy` not run (needs project connection)
- `sanity typegen generate` not run (needs project connection)
- GitHub repo not created (`gh` CLI not installed)

## Next Steps

1. Create Sanity project and populate `.env.local` with project ID + API token
2. Run `sanity typegen generate` → creates `src/sanity/types.ts`
3. Update `src/types/index.ts` to re-export generated Sanity types
4. Run `sanity deploy` to verify schema
5. Create GitHub repo and push initial commit
6. Begin Phase 02: Global Layout + Design System

## Open Questions / Blockers

- Sanity project creation requires interactive CLI or dashboard — user must complete
- GitHub repo creation requires `gh` CLI (not installed) or manual creation
- Cloudinary cloud name needed for `.env.local`

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-19 | Next.js 16.2.0 instead of spec'd 14 | `create-next-app@latest` installs current version; spec command uses `@latest` |

## Work Log

| Date | Summary |
|------|---------|
| 2026-03-19 | Phase 01 scaffold: Next.js project, all Sanity schemas, Cloudinary config, utility functions, GROQ queries. Build passes. |
