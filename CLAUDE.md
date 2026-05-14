# CLAUDE.md — Project Brief: yurii-ai-demos

> Read this file in full before making any changes to this project. It is the source of truth for design decisions, conventions, and content direction.

---

## What this project is

**yurii-ai-demos** is a Next.js portfolio site that showcases live, interactive AI chatbot and automation demos. The audience is potential clients on Fiverr and direct outreach who want to evaluate the quality of AI work before hiring.

This is **not a marketing site for an agency**. It is a working demo gallery. Each demo subpage is a realistic, themed landing page for a fictional business, with a functional AI chatbot embedded. Visitors can interact with the bots immediately, without sign-up or friction.

The success metric: a Fiverr buyer lands on this site, clicks one of the demos, has a 2-minute conversation with the AI, and walks away thinking "this person knows what they're doing — let me message them".

## What this project is NOT

- Not a generic SaaS landing page
- Not an "AI engineer portfolio" with a wall of badges and "10 years of experience"
- Not a CMS-driven blog
- Not anything that needs authentication, a database, or API routes (it's static + embedded third-party widgets)
- Not a place to demonstrate every JavaScript trick — restraint matters more than flair

---

## Stack

- **Next.js 15+** with App Router
- **TypeScript** strict mode — no `any`, no `as unknown as`
- **Tailwind CSS v4** with the new `@import "tailwindcss"` syntax in `globals.css`
- **shadcn/ui** for primitive components (Button, Card, etc.) — install only what is used
- **Lucide React** for icons
- **next/font** for fonts (no CDN imports)
- **pnpm** as package manager
- Deployment: **Vercel** (static, no server functions needed)

Do not add:
- State management libraries (no Zustand, Jotai, Redux)
- Animation libraries (no Framer Motion) — use CSS transitions if needed
- UI libraries beyond shadcn (no Radix raw, no Headless UI, no MUI)
- Analytics, except Vercel Analytics if explicitly requested later

---

## Design system

### Color palette

Use these exact tokens via Tailwind config or CSS variables:

```
--background:         #FAF7F2   (warm off-white, cream)
--foreground:         #1A1A1A   (near-black, never pure black)
--muted:              #6B6258   (warm gray for secondary text)
--muted-background:   #F0EBE3   (subtle backgrounds, borders)
--accent:             #8B1E1E   (deep burgundy — primary brand color)
--accent-hover:       #6F1717   (darker burgundy for hover states)
--border:             #E5DFD5   (subtle warm border)
```

### Typography

- **Headlines (h1, h2, h3):** Fraunces (serif, editorial). Variable font via next/font/google. Weights used: 400, 500, 600. Sometimes use the optical-sizing trick for large display headlines.
- **Body and UI:** Geist (sans-serif, via next/font). Weights: 400, 500. Already configured in app/layout.tsx via the Nova shadcn preset.
- **Code / monospace** (if needed): JetBrains Mono.

Sizing scale (Tailwind defaults are fine):
- Display headline: `text-5xl md:text-6xl lg:text-7xl`, `font-serif`, `tracking-tight`, `leading-[1.05]`
- Section heading: `text-3xl md:text-4xl`, `font-serif`, `tracking-tight`
- Body lead: `text-lg md:text-xl`, `text-muted-foreground`, `leading-relaxed`
- Body regular: `text-base`, `leading-relaxed`
- UI / labels: `text-sm`, sometimes uppercase tracking-wider for accents

### Spacing

- Generous. This is editorial-feeling, not dense.
- Section padding (top/bottom): `py-24 md:py-32`
- Container max width: `max-w-6xl mx-auto px-6 md:px-8`
- Vertical rhythm between sections: never less than `py-16`

### Visual style — DO

- Lots of whitespace
- Serif/sans pairing for editorial feel
- Subtle warm tones (cream + burgundy + warm grays)
- One accent color, used sparingly (links, primary CTAs, status dots)
- Thin 1px borders in `var(--border)` for separation
- Subtle 1-2px lift on hover for cards (`hover:-translate-y-0.5 transition`)
- Status dots: small 8px filled circles, green for "live", warm gray for "coming soon"

### Visual style — DON'T

- ❌ Gradients on text ("AI Studio" with a rainbow gradient — never)
- ❌ Glassmorphism (`backdrop-blur`, semi-transparent panels)
- ❌ Neon glow shadows
- ❌ Dark mode by default — this site is light-mode-only on launch
- ❌ Emoji icons in UI (use Lucide)
- ❌ "AI bot" mascots or robot avatars
- ❌ Pulsing animations on CTAs
- ❌ Generic stock photos of "team meeting" or "diverse people in office"
- ❌ Confetti, sparkles, or any kind of celebratory motion

If a design choice would look at home on a generic SaaS landing page from 2021, reconsider it.

---

## Project structure

```
app/
  layout.tsx              ← root layout, metadata, font loading
  page.tsx                ← home / demo gallery
  globals.css             ← Tailwind v4 import + CSS variables
  restaurant/
    page.tsx              ← La Strada Trattoria demo page
  clinic/
    page.tsx              ← Bright Smile Dental demo page (later)
  shop/
    page.tsx              ← Loop & Linen demo page (later)
components/
  ui/                     ← shadcn primitives
  Header.tsx              ← simple top nav, used on all pages
  Footer.tsx              ← simple footer, used on all pages
  DemoCard.tsx            ← card for home gallery
  ChatbaseEmbed.tsx       ← client component for Chatbase script injection
lib/
  chatbots.ts             ← typed config: chatbotIds per demo
  cn.ts                   ← shadcn's `cn` helper utility
public/
  ...                     ← favicon, og-image placeholder
```

---

## Content direction

### Home page

**Audience:** A Fiverr buyer who landed here from a gig link. They want to verify the seller is real and skilled in 30 seconds.

**Structure:**

1. **Header:** "Yurii — AI Automation Studio" (left). On the right: minimal nav with "Demos", "About" anchors. No login, no signup.
2. **Hero:**
    - Headline: *"AI chatbots and automation workflows that actually work."*
    - Subheadline: *"Live, interactive demos of AI assistants I've built for real-world business scenarios. Click any demo to chat with the assistant directly."*
    - Single subtle badge or link: "Available for hire on Fiverr" → links to Fiverr gig (placeholder href for now).
3. **Demo gallery:** Three `DemoCard`s in a responsive grid (1 / 2 / 3 columns).
4. **About strip:** A single paragraph, ~50 words:
   > *"Each demo is a fully functional AI assistant, trained on a realistic knowledge base for the kind of business it represents. The frontends are built with Next.js. Chatbots are powered by Chatbase, OpenAI, and custom n8n workflows for the more complex cases."*
5. **Footer:** Copyright, link to Fiverr profile, simple.

### Demo cards (used on home)

Each `DemoCard` shows:
- A small monogram or letter mark (no images) — burgundy circle with serif initial (L for La Strada, B for Bright Smile, etc.)
- Business name (serif, h3)
- One-line description (sans, muted)
- Tech stack inline badges (small, muted): e.g., "Chatbase · OpenAI" or "Voiceflow · n8n"
- Status dot (green = Live, warm gray = Coming soon)
- Hover effect: subtle lift, accent border on left side appearing

### Demo pages — La Strada (the first one)

**Concept:** This is a fictional Italian restaurant landing page that looks completely real. The chatbot widget floats in the bottom right corner, exactly as it would on a production site. The visitor doesn't think "this is a demo" — they think "this is what a restaurant site with AI customer service looks like".

**Page sections (in order):**

1. **Hero:** Restaurant name in large serif type, tagline, hero image area (placeholder for now — solid burgundy block with the monogram, we'll add a stock image later or generate one).
2. **About:** Brief paragraph about the restaurant (family-owned, Roman/Tuscan cuisine, Brooklyn).
3. **Menu preview:** A few signature dishes — Carbonara, Tagliatelle Bolognese, Pistachio Tiramisu — each with a short description and price. Not the full menu, just a teaser.
4. **Hours and location:** Simple two-column block with hours and address.
5. **Reservation CTA:** "Book a table — or just ask Sofia, our AI host, in the chat." Button: "Make a reservation" (placeholder link).
6. **Demo banner (at bottom of page, before footer):** A discreet, narrow strip in burgundy that says: *"This is a portfolio demo by Yurii. The restaurant is fictional — the AI assistant is real. → Back to all demos"*. This is the only thing that breaks the illusion, intentionally, so a Fiverr buyer knows it's a showcase.

The Chatbase widget is embedded site-wide and floats in the bottom-right corner.

### Tone of voice

- Confident, not boastful
- Specific, not vague ("trained on a realistic knowledge base of 50+ FAQs" beats "powerful AI")
- Plain English, not "leverage cutting-edge AI to transform your business"
- Short sentences in headlines and CTAs. Slightly longer in body.
- Never use the word "revolutionize"
- Never use 🚀, 💡, or emoji in UI text

---

## Code conventions

### TypeScript

- Strict mode. Never disable a rule without a comment explaining why.
- No `any`. Use `unknown` and narrow.
- Prefer types over interfaces for object shapes unless extending.
- Use `as const` for tuple/literal narrowing where useful.

### React / Next.js

- Server Components by default. Add `"use client"` only when a component needs interactivity (state, effects, browser APIs).
- The Chatbase embed component MUST be a client component (it injects scripts).
- File naming: PascalCase for components (`DemoCard.tsx`), kebab-case for everything else.
- No `useEffect` for data fetching — this app is static.
- Co-locate component-specific types in the same file unless reused.

### Tailwind

- Use the design tokens defined in globals.css. Do not hardcode `#8B1E1E` in className — use `text-accent`, `bg-accent` etc.
- Group related classes logically: layout → sizing → spacing → colors → typography → effects.
- For longer class strings, use the `cn()` helper to compose conditionally.
- Avoid arbitrary values (`text-[#8B1E1E]`) — define tokens instead.

### Imports

- Order: external libs → internal absolute imports (`@/components/...`) → relative imports → types.
- Use absolute imports (`@/`) for everything outside the same directory.

### Components

- Each component file: one default export (the component), named exports for types.
- Props interfaces named `<ComponentName>Props`.
- Destructure props in the function signature.
- No prop drilling beyond 2 levels — lift state or use composition.

### Commits

- Conventional commits: `feat:`, `fix:`, `chore:`, `style:`, `refactor:`, `docs:`.
- One logical change per commit. Don't bundle unrelated changes.
- Commit messages in English.

---

## Chatbase embed

The Chatbase widget injects via a `<script>` tag. To embed it cleanly in Next.js without breaking SSR:

```tsx
// components/ChatbaseEmbed.tsx
"use client";

import { useEffect } from "react";

type ChatbaseEmbedProps = {
  chatbotId: string;
};

export default function ChatbaseEmbed({ chatbotId }: ChatbaseEmbedProps) {
  useEffect(() => {
    // injection logic — see lib/chatbots.ts for the actual script
  }, [chatbotId]);

  return null;
}
```

The actual script body is copied from the Chatbase Embed tab in the agent's dashboard. It will be plugged in once we have the chatbotId. For now, scaffold the component with a placeholder.

`lib/chatbots.ts` maps each demo to its chatbotId:

```ts
export const CHATBOTS = {
  restaurant: { id: "PLACEHOLDER_LA_STRADA_ID", name: "La Strada Assistant" },
  clinic:     { id: "", name: "Bright Smile Assistant" }, // not built yet
  shop:       { id: "", name: "Loop & Linen Assistant" }, // not built yet
} as const;
```

When embedding on a demo page, the page's `page.tsx` imports `ChatbaseEmbed` and passes the appropriate chatbotId from the config.

---

## Metadata

`app/layout.tsx`:
- Title template: `%s · Yurii AI Demos`
- Default title: `Yurii — AI Automation Studio`
- Description: `Interactive demos of AI chatbots and automation workflows for small businesses. Built with Next.js, Chatbase, OpenAI, and n8n.`
- Open Graph image: 1200×630 placeholder for now — burgundy background, serif title, simple monogram.

Each demo page sets its own metadata:
- `/restaurant`: `La Strada Trattoria · Demo` / `An AI customer service assistant for an Italian restaurant in Brooklyn.`
- Similar pattern for /clinic and /shop.

`robots.txt`: allow all.
`sitemap.ts`: generate dynamically from the routes.

---

## Things to ask before doing

If at any point during a task you would:
- Add a new dependency
- Change the color palette
- Use a new font
- Introduce dark mode
- Add animations beyond simple CSS transitions
- Restructure the directory layout
- Use a CMS or any data fetching pattern

→ **Pause and ask first**. These are scope-changing decisions, not implementation details.

---

## Working style I prefer

- **Confirm the plan before writing code.** Especially for tasks that touch multiple files. A 5-line plan saves us 30 minutes of corrections.
- **Make small, logical commits as you go.** Don't dump everything in one giant commit at the end.
- **Show me design decisions.** If a section could look multiple ways, sketch the options before picking one.
- **Push back if something I asked for would harm the site.** I'd rather hear "I think that gradient would clash with the editorial feel" than have it silently added.
- **Don't over-engineer.** No abstractions until they're needed twice. No generic components until there are two concrete uses.
- **Comments only where the code can't speak for itself.** No `// set the title to "x"`.

---

## Out of scope (for now)

- Internationalization (English only)
- Accessibility audit (we'll do a pass before going public, not now)
- Performance optimization beyond Next.js defaults
- Tests (this is a static portfolio, not production software)
- A real domain (we'll launch on `*.vercel.app` first)
- Newsletter, contact form, anything dynamic

---

## Deployment notes

### Environment variables (Vercel)

Server-only env vars must be set in **Vercel → Project Settings → Environment Variables** (Production + Preview) with the same values used locally in `.env.local`. They are not bundled with the client.

| Variable | Used by | Purpose |
| --- | --- | --- |
| `N8N_CLINIC_WEBHOOK_URL` | `/api/clinic-chat` | n8n webhook for the Bright Smile Dental (`/clinic`) demo. Server-only; never prefix with `NEXT_PUBLIC_`. |

See `.env.example` for the full local-dev template.
