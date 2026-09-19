# Stedan. — site build

Next.js 15 · App Router · Tailwind v4 · MDX content in the repo.

## Install

Replace your existing files with these, then:

```bash
npm uninstall daisyui antd framer-motion motion react-icons react-hook-form classnames rss-parser
npm install gray-matter next-mdx-remote
npm run dev
```

Delete these from the old build — nothing here uses them:

```
app/(root)/                 the whole route group
app/components/             all of it, replaced by /components
public/fonts/Genty-Sans-Regular.ttf
```

Keep `public/` images you still want. New brand assets are in `public/brand/`.

## tsconfig

Make sure the `@/*` path alias points at the project root:

```json
{ "compilerOptions": { "paths": { "@/*": ["./*"] } } }
```

## Publishing a blog post

1. Create `content/blog/my-post.mdx`
2. Add frontmatter:

```yaml
---
title: "Post title"
slug: "my-post"
summary: "One sentence, shown on the index."
date: "2026-10-04"
tags: ["Design"]
draft: false
---
```

3. Write Markdown below it.
4. Commit and push. Vercel rebuilds and it's live.

`draft: true` means the post shows in `npm run dev` but **never** in production. That's how you write in progress without publishing.

Case studies work identically in `content/work/`, with two extra fields:

- `nature: "client"` or `nature: "concept"` — concepts render a visible label saying there was no client. Use it honestly.
- `role` and `year` — shown under the title.

## Hiding sections

`lib/site.ts` has a `flags` object. Set one to `false` and that section disappears from the nav, the home page and the sitemap, and its route 404s.

```ts
export const flags = {
  work: true,
  services: true,
  servicePricing: false,  // turn on after you've set real prices in lib/services.ts
  blog: true,
  concierge: false,       // the AI assistant, needs pricing first
};
```

Sections also hide themselves when empty. No published case studies means no "Selected work" block on the home page — no "coming soon" placeholders anywhere.

## Environment variables (Vercel → Settings → Environment Variables)

| Key | What for |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | Your Formspree form ID. Without it the contact form shows your email instead. |

Never commit a key to the repo. Never paste one into a chat.

## Before you go live

- [ ] Set `site.url` in `lib/site.ts` to the real domain
- [ ] Decide whether `site.email` stays Gmail or becomes `hello@yourdomain`
- [ ] Flip `draft: false` on the New Leaf case study once the founder signs off
- [ ] Add `public/brand/og.png` at 1200×630 and reference it in `app/layout.tsx`
