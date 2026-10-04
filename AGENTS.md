# AGENTS.md

Guidelines and commands for agentic coding agents working in this React Presentation repository.

## Development Commands

### Core Commands

- `bun run dev` - Start development server (http://localhost:3000)
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run oxlint
- `bun run lint:fix` - Run oxlint with automatic fixes
- `bun run format` - Format with oxfmt
- `bun run format:check` - Check if files are formatted correctly
- `bun run type-check` - Run TypeScript type checking

### Testing Commands

Tests use Bun's built-in runner (`bun:test`) and live next to the code as `*.test.ts`. Add `/// <reference types="bun" />` at the top of test files (TypeScript 7 doesn't auto-include `@types/bun`).

- `bun run test` - Run all tests
- `bun test --watch` - Run tests in watch mode
- `bun test utils/slides.test.ts` - Run a single test file

## Code Style Guidelines

### File Structure

```
app/                    # Next.js App Router
├── main.css            # Global CSS with Tailwind v4 and print styles
├── layout.tsx          # Root layout with font loading and MotionProvider
└── page.tsx            # Slide deck definition (the `slides` array)
components/
├── Presentation.tsx    # Deck: navigation, transitions, footer, print layout
├── PresenterView.tsx   # Presenter window: timer, current/next previews, notes
├── SlideEmbed.tsx      # Bare slide rendered inside presenter previews
├── MotionProvider.tsx  # MotionConfig honouring reduced motion
├── Wrapper.tsx         # Fade-up wrapper for regular (non-slide) components
├── Slides/             # Reusable slide components (Cover, Points, CodeBlock, ...)
└── demo/               # Demo components rendered as slides
hooks/                  # useSlides: URL-backed slide state synced across windows
utils/                  # Slide helpers, animation presets, dedent, classNames, SEO
assets/                 # Slide images (imported statically) and the custom cursor icon
fonts/                  # Local Satoshi variable fonts
public/                 # Static assets
```

Server components by default; use `"use client"` directive only when needed. Slides stay server components by importing motion from `motion/react-client`.

### Import Patterns

```typescript
import * as motion from "motion/react-client"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"
import classNames from "@/utils/classNames"
```

- Use `import * as React from "react"` (namespace imports), or `import type * as React` when only types are used
- Use absolute imports with `@/` prefix for internal files
- Group imports: external libraries → internal modules
- Use type-only imports (`import type { Metadata } from "next"`)

### Slide Component Pattern

```typescript
import * as motion from "motion/react-client"
import type * as React from "react"

import { fadeUp } from "@/utils/animation"

interface Props {
  title: string
  subtitle: string
  className?: string
}

const Title: React.FC<Props> = ({ title, subtitle, className }) => {
  return (
    <div className={className}>
      <motion.h1 {...fadeUp()}>{title}</motion.h1>
      <motion.p {...fadeUp(0.1)}>{subtitle}</motion.p>
    </div>
  )
}

export default Title
```

- Use functional components with `React.FC<Props>` and a default export
- Every slide accepts an optional `className` for width/padding set from `app/page.tsx`
- Animate by spreading `fadeUp(delay)` onto `motion` elements; stagger children with increasing `delay` (0.1 steps)
- Use `BASE_TRANSITION` from `utils/animation.ts` for any other motion
- Wrap non-slide components in `<Wrapper>` to get the same fade-up entrance
- Add new slides to the `slides` array in `app/page.tsx` as `{ id, content, notes? }` (`Slide` from `utils/slides.ts`); `id` must be unique
- Use `classNames` utility only when merging base classes with `className`
- Images: put files in `assets/images/`, import them statically and render with `next/image` (`placeholder="blur"`); wrap in a `motion.div` to animate

### Naming Conventions

- **Components**: PascalCase (`CodeBlock`, `QuoteBlock`)
- **Variables**: camelCase (`currentSlide`)
- **Constants**: UPPER_SNAKE_CASE (`BASE_URL`)
- **Types**: PascalCase (`Props`)
- **Files**: PascalCase for components, camelCase for utilities

### TypeScript Guidelines

- Strict mode enabled (`strict: true`, `strictNullChecks: true`, `erasableSyntaxOnly: true`)
- TypeScript 7 (native compiler); Next.js runs the `tsc` CLI via `experimental.useTypeScriptCli`
- Use `interface` for object shapes and component props
- Use `type` for unions and complex type expressions
- Include return type annotations for hook functions

### Formatting Rules

oxlint handles linting and oxfmt handles formatting (no ESLint/Prettier/Biome). Key rules:

- No semicolons, double quotes, ES5 trailing commas, 2-space indent, 80-char line width
- Tailwind classes sorted automatically by oxfmt (`sortTailwindcss` — recognizes `className`, `classNames(...)`, `cva(...)`, `cx(...)`, `clsx(...)`, `twMerge(...)`)
- Pre-commit hook runs `oxlint --fix` and `oxfmt` via lint-staged

### Styling Guidelines

- Tailwind CSS v4 with `@theme` directives in `app/main.css`
- Use CSS custom properties (`--sans-font`, `--mono-font`)
- Use `print:` variants for anything that should differ on paper (e.g. `CodeBlock` drops its height cap)
- Animations: Motion (`motion/react-client`) with presets from `utils/animation.ts`

## Quality Assurance

Always run before completing work:

- `bun run lint` - No oxlint errors
- `bun run type-check` - TypeScript passes
- `bun run test` - Tests pass
- `bun run build` - Production build succeeds

## Architecture Details

**Presentation**: `components/Presentation.tsx` renders one slide at a time from the `slides` array and wraps around at both ends. The current slide lives in the URL as `?slide=N` (1-based), read with `useSyncExternalStore`, so refreshing or sharing a link keeps the slide.

Slides crossfade with a small shift in the direction of travel (`AnimatePresence`; outgoing and incoming slides share one grid cell and overlap, so there is no blank gap); a progress bar sits at the top while the footer is visible. `MotionProvider` sets `reducedMotion="user"`, so transforms are skipped when the OS asks for reduced motion.

Controls: `←`/`A`/`PageUp` previous, `→`/`D`/`PageDown` next (presentation clickers send PageUp/PageDown), swipe left/right on touch screens, `F` toggle footer, `Shift+F` toggle fullscreen, `C` toggle controls, `P` toggle page numbers, `S` open the presenter view.

**Presenter view**: `?mode=presenter` (opened with `S`) shows a timer (`R` resets), previews of the current and next slide, and the slide's `notes`. Previews are iframes of `?mode=embed&offset=N`. All windows share slide changes over a `BroadcastChannel` in `hooks/useSlides.ts`, so navigating in either window moves both.

**Printing**: every slide is also rendered in a hidden `print:block` container, one 1280×720 page per slide (`@page` in `app/main.css`). Print styles force fade-up elements visible. Slide images use `loading="eager"` so they're ready when printing.

**Code highlighting**: `components/Slides/CodeBlock.tsx` is an async server component that highlights code with Shiki (`codeToHtml`, `plastic` theme) at build time; indentation inside the `code` template literal is stripped automatically.

**SEO**: `utils/seo.ts` builds page `Metadata`; update `BASE_URL` and the placeholder names before deploying.

## Project Features

- Next.js 16 with App Router, React 19, React Compiler
- Tailwind CSS v4 with custom animations
- Motion (`motion` package) for slide animations and transitions
- Presenter view with speaker notes, print to PDF, URL-synced slides
- Shiki syntax highlighting for code slides
- oxlint for linting and oxfmt for formatting (no ESLint/Prettier/Biome)
- Bun package manager
- Husky pre-commit hooks with lint-staged
