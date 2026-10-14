# CLAUDE.md

Guidance for AI assistants working in this repository.

## What this is

The personal portfolio / studio site for **Stedan Ampofo** ("Stedan."), a product designer and full-stack engineer based in Accra. It markets services (brand, product design and build, AI), shows case studies, and hosts a small blog. Deployed on **Vercel** (production URL in `lib/site.ts` → `site.url`).

## Repository layout

```
/                        Repo root. Nothing runs from here.
├── package.json         Stray root manifest (gray-matter, next-mdx-remote). Not used by the app — don't add deps here.
├── .gitignore
└── stedanwebdev/        ← THE APP. Run every command from this directory.
    ├── app/             Next.js App Router routes
    │   ├── layout.tsx       Root layout: fonts, metadata/OG, pre-paint theme script, Nav/Footer, Vercel Analytics
    │   ├── page.tsx         Home page (Hero, disciplines, featured work, process, recent writing, FAQ, CTA)
    │   ├── globals.css      Tailwind v4 import, @theme tokens, light/dark palettes, .display/.prose-s/etc.
    │   ├── about/ contact/  Static pages
    │   ├── work/            /work index + /work/[slug] case studies
    │   ├── blog/            /blog index + /blog/[slug] posts ("Writing" in the nav)
    │   ├── services/        /services index + /services/[slug]
    │   ├── sitemap.ts robots.ts not-found.tsx
    │   └── lib/utils.tsx    cn() helper (clsx + tailwind-merge)
    ├── components/      Shared UI (PascalCase files, named exports)
    ├── content/
    │   ├── work/*.mdx       Case studies (`_template-concept.mdx` is a draft template)
    │   └── blog/*.mdx       Blog posts
    ├── lib/
    │   ├── site.ts          Site config, feature flags, disciplines, process steps, home FAQs
    │   ├── services.ts      Service definitions (copy, deliverables, steps, prices, FAQs)
    │   ├── content.ts       Reads/parses content/*.mdx with gray-matter; draft filtering; formatDate
    │   └── markdown.ts      toHtml(): remark + remark-gfm + remark-html
    ├── public/          Images; brand assets in public/brand/, case-study images in public/work/<slug>/
    ├── README-BUILD.md  Author's own build/publishing notes (authoritative for content workflow)
    └── README.md        Stock create-next-app readme
```

## Stack

- **Next.js 15** (App Router, Turbopack in dev), **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config`; theme is in `app/globals.css` under `@theme inline`
- **gray-matter** for frontmatter, **remark** (+ GFM, html) for Markdown rendering
- **@formspree/react** for the contact form, **@vercel/analytics**
- Fonts via `next/font/google`: Bricolage Grotesque (display, `--font-bricolage`) and Geist (body, `--font-geist`)
- Path alias: `@/*` → `stedanwebdev/*` (e.g. `@/lib/site`, `@/components/Nav`)

## Commands (run in `stedanwebdev/`)

```bash
npm ci            # install (package-lock.json is committed; use npm, not yarn/pnpm)
npm run dev       # next dev --turbopack, http://localhost:3000
npm run build     # production build — also the best full check
npm run lint      # next lint (next/core-web-vitals + next/typescript)
npx tsc --noEmit  # typecheck
```

There is **no test suite** and no CI workflow in the repo. Before committing, run `npm run lint` and `npx tsc --noEmit` (and `npm run build` for anything touching routes, content loading or config). Vercel builds on push.

## Key concepts

### Feature flags — `lib/site.ts`

```ts
export const flags = { work, services, servicePricing, blog, concierge } as const;
```

A flag set to `false` must hide that section **everywhere**: nav (`components/Nav.tsx`), footer (`components/Footer.tsx`), home page (`app/page.tsx`), sitemap (`app/sitemap.ts`), and the route itself (`if (!flags.x) notFound()` at the top of the page). When adding a new section, wire up all five. `servicePricing` gates price display on services pages; `concierge` (AI assistant) is not implemented yet.

Sections also **auto-hide when empty** — no published docs means no home-page block and no sitemap entries. Never add "coming soon" placeholders.

### Content pipeline

- Files in `content/work/` and `content/blog/` (`.mdx` or `.md`) are read at build time by `lib/content.ts` (`getDocs`, `getDoc`, `getSlugs`), sorted newest-first by `date`.
- Despite the `.mdx` extension, bodies are rendered as **plain Markdown → HTML** via `lib/markdown.ts` and `dangerouslySetInnerHTML` inside `.prose-s`. JSX/MDX components in content will **not** work. `next-mdx-remote` is installed (and listed in `serverExternalPackages`) but unused.
- `[slug]` pages use `generateStaticParams` + `generateMetadata`; `params` is a `Promise` (Next 15) and must be awaited.

Frontmatter:

```yaml
---
title: "Post title"
slug: "my-post"            # defaults to filename
summary: "One sentence."
date: "2026-10-04"         # ISO string; used for sorting
tags: ["Design"]
draft: false               # true = visible in `npm run dev` only, never in production
# work/ only:
nature: "client"           # or "concept" — concepts show a "self-initiated, no client" notice. Use honestly.
role: "..."
year: "2026"
cover: "/work/<slug>/cover.png"
---
```

To publish: add the file, commit, push. Files prefixed `_` are templates and should stay `draft: true`.

### Styling and theming

- Colours are CSS variables (`--paper`, `--paper-2`, `--ink`, `--ink-soft`, `--line`, `--accent`, `--accent-text`, `--accent-on`, `--wash`) defined for light in `:root` and dark in `[data-theme="dark"]`, exposed to Tailwind as `bg-paper`, `text-ink-soft`, `border-line`, `text-accent-text`, etc. **Use these tokens, not raw hex/Tailwind palette colours**, so dark mode works.
- Theme is set on `<html data-theme>` by an inline script in `layout.tsx` before paint and toggled by `ThemeToggle` (persisted in `localStorage.theme`).
- Custom classes: `.display` / `.display-sm` (headings), `.prose-s` (rendered Markdown), `.rv` (used by `<Reveal>` scroll-in animation), `.mark-draw`.
- Layout conventions used throughout: `mx-auto max-w-[1120px] px-[6vw]` containers, section padding `py-[clamp(48px,7vw,90px)]`, fluid type with `text-[clamp(...)]`, `rounded-[3px]` cards with `border-line bg-paper-2`.
- `<Logo>` is an inline SVG that themes itself (wordmark = `currentColor`, mark/dot = `var(--accent)`); size it with a height + `w-auto`.

### Components

Server components by default. Only `ContactForm`, `FAQ`, `Interlace`, `Nav`, `Reveal` and `ThemeToggle` are client components (`"use client"`). Keep data access (`lib/content.ts` uses `node:fs`) in server components only.

## Configuration and secrets

| Env var | Purpose |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID. If unset, `ContactForm` shows a fallback with `site.email`. |

`.env*` files are gitignored. Never commit keys.

## Conventions

- Edit site copy/config in `lib/site.ts` and `lib/services.ts` rather than hard-coding it in pages.
- Copy is British English ("colour", "organisation"), direct and plain; prices in GBP (£).
- Components: named exports (`export function Nav()`), PascalCase filenames, imports via `@/`.
- Quote style is mixed (double quotes in most files, single quotes in `Nav.tsx` and `work/[slug]`); match the file you're editing. There is no Prettier config.
- Commit messages loosely follow Conventional Commits (`fix:`, `refactor:`, `feat:`). Work lands via PRs (historically from a `rebrand` branch).

## Gotchas

- Always `cd stedanwebdev` first; the root `package.json` is not the app.
- `tsconfig.json` `include` lists `app/lib/links.ts`, which does not exist — harmless, but don't rely on it.
- `lib/content.ts` filters drafts twice (in `readAll` and `getDocs`); both use `NODE_ENV === "development"`.
- `public/` still holds images from an older version of the site (e.g. `DreamWise.png`, `MalawiMockup.png`) that nothing references — check usage before deleting or reusing.
- `README-BUILD.md` "Before you go live" checklist is partly done (OG image is referenced; `servicePricing` is now `true`).
