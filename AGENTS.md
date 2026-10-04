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

**Note**: No testing framework configured. To add Vitest:

```bash
bun add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Once configured, use:

- `bun run test` - Run all tests
- `bun run test:watch` - Run tests in watch mode
- `bun run test -- path/to/test.spec.ts` - Run single test file

## Code Style Guidelines

### File Structure

```
app/                    # Next.js App Router
├── main.css            # Global CSS with Tailwind v4 and custom animations
├── layout.tsx          # Root layout with font loading
└── page.tsx            # Slide deck definition (the `slides` array)
components/
├── Presentation.tsx    # Slide navigation, keyboard shortcuts, footer controls
├── Wrapper.tsx         # Fade-up wrapper for regular (non-slide) components
├── Slides/             # Reusable slide components (Cover, Points, CodeBlock, ...)
└── demo/               # Demo components rendered as slides
utils/                  # Animation presets, classNames helper, SEO metadata
assets/                 # Icons used from CSS (custom cursor)
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
- Add new slides to the `slides` array in `app/page.tsx` with a unique `key`
- Use `classNames` utility only when merging base classes with `className`

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
- Custom animations using `@keyframes` and `--animate-*` variables
- Use CSS custom properties (`--sans-font`, `--mono-font`)
- Include `antialiased` for text quality
- Animations: Motion (`motion/react-client`) with presets from `utils/animation.ts`

## Quality Assurance

Always run before completing work:

- `bun run lint` - No oxlint errors
- `bun run type-check` - TypeScript passes
- `bun run build` - Production build succeeds

## Architecture Details

**Presentation**: `components/Presentation.tsx` renders one slide at a time from the `slides` array and wraps around at both ends. The current slide lives in the URL as `?slide=N` (1-based), read with `useSyncExternalStore`, so refreshing or sharing a link keeps the slide.

Controls: `←`/`A`/`PageUp` previous, `→`/`D`/`PageDown` next (presentation clickers send PageUp/PageDown), swipe left/right on touch screens, `F` toggle footer, `Shift+F` toggle fullscreen, `C` toggle controls, `P` toggle page numbers.

**Code highlighting**: `components/Slides/CodeBlock.tsx` is an async server component that highlights code with Shiki (`codeToHtml`, `plastic` theme) at build time; indentation inside the `code` template literal is stripped automatically.

**SEO**: `utils/seo.ts` builds page `Metadata`; update `BASE_URL` and the placeholder names before deploying.

## Project Features

- Next.js 16 with App Router, React 19, React Compiler
- Tailwind CSS v4 with custom animations
- Motion (`motion` package) for slide animations
- Shiki syntax highlighting for code slides
- oxlint for linting and oxfmt for formatting (no ESLint/Prettier/Biome)
- Bun package manager
- Husky pre-commit hooks with lint-staged
