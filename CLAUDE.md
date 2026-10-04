# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev              # Start dev server (localhost:3000)
bun run build            # Production build
bun run lint             # oxlint
bun run lint:fix         # oxlint with auto-fix
bun run format           # oxfmt
bun run type-check       # TypeScript type checking
bun run test             # Bun tests (utils/*.test.ts)
```

Run `bun run lint`, `bun run type-check`, `bun run test`, and `bun run build` before completing work.

## Architecture

**Next.js 16 App Router** with React 19 and React Compiler enabled. Server components by default; use `"use client"` directive only when needed.

- `app/page.tsx` — The deck: a `slides` array of `{ id, content, notes? }` passed to `<Presentation />`
- `components/Presentation.tsx` — Deck (navigation, transitions, progress, footer, print layout); switches to `PresenterView` for `?mode=presenter` and `SlideEmbed` for `?mode=embed`
- `hooks/useSlides.ts` — URL-backed slide state (`?slide=N`), synced across windows with `BroadcastChannel`
- `components/Slides/` — Reusable slide components (Cover, QuoteBlock, Profile, SingleImage, Points, MultiImage, CodeBlock, About, End)
- `components/Wrapper.tsx` — Fade-up wrapper for regular components used as slides (see `components/demo/`)
- `utils/` — Slide helpers (`slides.ts`), animation presets (`animation.ts`), `dedent`, `classNames`, SEO metadata (`seo.ts`)
- `app/main.css` — Tailwind v4 global styles, theme, custom animations, custom cursor

**Navigation**: `←`/`A`/`PageUp` previous, `→`/`D`/`PageDown` next (clickers send PageUp/PageDown), swipe on touch screens. `F` footer, `Shift+F` fullscreen, `C` controls, `P` page numbers, `S` presenter view (timer, next-slide preview, notes). Printing renders one slide per 1280×720 page. The current slide is synced to `?slide=N` (1-based) via `useSyncExternalStore`, so the URL is the source of truth.

**Code slides**: `CodeBlock` highlights code on the server with Shiki (`plastic` theme).

## Code Style

oxlint handles linting and oxfmt handles formatting (no ESLint/Prettier/Biome). Key rules:

- No semicolons, double quotes, ES5 trailing commas, 2-space indent, 80-char line width
- Tailwind classes sorted automatically by oxfmt (`sortTailwindcss` — recognizes `className`, `classNames(...)`, `cva(...)`, `cx(...)`, `clsx(...)`, `twMerge(...)`)
- Pre-commit hook runs `oxlint --fix` and `oxfmt` via lint-staged

See `AGENTS.md` for detailed slide component patterns, import conventions, and naming rules.

## Key Conventions

- Use `bun` as the package manager (not npm/yarn)
- Absolute imports via `@/*` path alias (e.g., `@/utils/classNames`)
- Namespace imports for React: `import * as React from "react"`
- Type-only imports: `import type { Metadata } from "next"`
- Components: `React.FC<Props>` with default export, optional `className` prop
- Slides are server components using `motion/react-client`; spread `fadeUp(delay)` from `utils/animation.ts` onto motion elements
- Styling: Tailwind v4 with `@theme` directives in `app/main.css`
