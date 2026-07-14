# FamCare Circle — Real Next.js Build (v0.1)

This is the first real, working codebase for FamCare Circle — a genuine Next.js 14 (App Router) application, not the earlier single-file HTML prototype. It's been built, run, and verified to actually render real content end to end.

## What's real here

- **Actual Next.js App Router project** — `npm install && npm run build` succeeds; verified by running a production server and confirming the homepage, an article page, and a checklist page all render live.
- **A working content layer** (`lib/content.js`) that reads structured JSON from `/content` — a lightweight stand-in for a real headless CMS. Every content-reading function is isolated here specifically so a real CMS (Contentful, Sanity, or a custom Postgres-backed admin, per the original CMS deliverable) can be swapped in later by editing only this one file.
- **Statically generated pages** for every article and checklist (`generateStaticParams`), which is what makes this fast and cheap to host — no database round-trip per page view once built.
- **The full brand design system** as real Tailwind config (`tailwind.config.js`) — exact colors, Sora/Inter fonts — not approximated.
- **One real interactive component** — the Checklist page has actual React state (checkbox toggles, live progress bar, reset) as a client component, with the data-fetching kept in a separate server component so the split between "static content" and "interactive UI" is done the right way for Next.js.

## What's NOT built yet (be clear-eyed about this)

- **Only 1 article and 1 checklist are wired in** as real content (`content/articles/`, `content/checklists/`). The other 175 drafted articles, 13 checklists, and 16 worksheets still need to be converted from the markdown drafts into this JSON content structure — a real but mechanical task.
- **No database.** Content is flat JSON files, not a real CMS with an admin UI, editorial workflow, or review-status gating. The CMS schema from Deliverable 5 (statuses, roles, citation tracking) is not implemented — only represented as fields sitting unused in the JSON.
- **No assessment, calculator, roadmap, or download-landing-page routes yet** — those exist in the earlier HTML prototype but haven't been rebuilt as real Next.js pages/components.
- **No auth, no email integration, no analytics, no search** — all specced in the original deliverables, none implemented.
- **Security note:** Next.js 14.2.35 (the latest 14.x patch) still has some open advisories per `npm audit` — mostly affecting self-hosted edge cases (Image Optimizer, Server Components DoS). Before any real deployment, run `npm audit` again and consider whether upgrading to Next 15/16 (a larger jump requiring React 19) is worth it at that point.

## Running this locally

```bash
npm install
npm run dev     # http://localhost:3000
```

or for a production build:

```bash
npm install
npm run build
npm run start
```

## Adding new content

Drop a new JSON file in `content/articles/` or `content/checklists/` matching the shape of the existing sample files, and it's automatically picked up — no code changes needed. Rebuild to regenerate the static pages.

## Suggested next steps, in order

1. Convert the remaining drafted articles/checklists from markdown into this JSON shape (mechanical, but 190+ files of work)
2. Rebuild the Assessment, Calculator, Roadmap, and Download Landing Page as real routes/components
3. Replace the flat-file content layer with a real headless CMS or database once there's a real editorial team using it
4. Add the email, search, and analytics integrations from the original deliverable specs
