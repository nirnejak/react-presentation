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
```

Run `bun run lint`, `bun run type-check`, and `bun run build` before completing work.

## Architecture

**Next.js 16 App Router** with React 19 and React Compiler enabled. Server components by default; use `"use client"` directive only when needed.

- `app/page.tsx` — The deck: a `slides` array of slide components passed to `<Presentation />`
- `components/Presentation.tsx` — Slide navigation, keyboard shortcuts, footer controls
- `components/Slides/` — Reusable slide components (Cover, QuoteBlock, Profile, SingleImage, Points, MultiImage, CodeBlock, About, End)
- `components/Wrapper.tsx` — Fade-up wrapper for regular components used as slides (see `components/demo/`)
- `hooks/useFadeUp.tsx` — In-view fade-up animation shared by all slides
- `utils/` — `classNames` helper and SEO metadata (`seo.ts`)
- `app/main.css` — Tailwind v4 global styles, theme, custom animations, custom cursor

**Keyboard shortcuts**: `←`/`A` previous, `→`/`D` next, `F` footer, `C` controls, `P` page numbers.

**Code slides**: `CodeBlock` highlights code client-side with Shiki (`plastic` theme).

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
- Slides animate with `useFadeUp` + `motion` elements, staggering children by `delay`
- Styling: Tailwind v4 with `@theme` directives in `app/main.css`
