# Phase 1: Project Initialization - Research

**Researched:** 2026-02-10
**Domain:** Next.js project scaffolding with pnpm and Tailwind CSS
**Confidence:** HIGH

## Summary

Phase 1 initializes a greenfield Next.js project with App Router, TypeScript, Tailwind CSS v4, and pnpm as the package manager. The simplest and most reliable path is `pnpm create next-app@latest` with appropriate flags -- this generates a working project with all required tooling in a single command.

The current stable version is **Next.js 16.1.x** (as of February 2026). Since Next.js 15.2, `create-next-app` ships with **Tailwind CSS v4** by default, which uses a CSS-first configuration model (`@import "tailwindcss"` instead of `@tailwind` directives, `@tailwindcss/postcss` instead of `tailwindcss` as PostCSS plugin, no `tailwind.config.js` needed).

**Critical consideration for Phase 2 compatibility:** The project uses FSD (Feature-Sliced Design) architecture in Phase 2. FSD with Next.js App Router requires `app/` at the project root (for routing) and `src/` for FSD layers. The `create-next-app --src-dir` flag puts `app/` inside `src/`, which conflicts with FSD. **Do NOT use `--src-dir`** during initialization. The FSD restructuring (moving `app/` to root, creating `src/` for FSD layers) will happen in Phase 2.

**Primary recommendation:** Run `pnpm create next-app@latest courses-for-veterans --ts --tailwind --eslint --app --use-pnpm` without `--src-dir`, verify with `pnpm dev` and `pnpm build`, then confirm Tailwind classes render on screen.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.x (latest stable) | React framework with App Router, SSR/SSG, file-based routing | Industry standard, recommended defaults include TypeScript + Tailwind |
| React | 19.2.x (bundled with Next.js 16) | UI library | Ships with Next.js 16, includes React Compiler support |
| TypeScript | 5.x (bundled) | Type safety | Default in create-next-app, zero-config with Next.js |
| Tailwind CSS | 4.1.x | Utility-first CSS framework | Default in create-next-app since Next.js 15.2, CSS-first config model |
| pnpm | 10.14.0 (installed on system) | Package manager | Fast, disk-efficient, already installed |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/postcss | 4.x | PostCSS plugin for Tailwind v4 | Required -- replaces the old `tailwindcss` PostCSS plugin |
| postcss | 8.x | CSS transformation pipeline | Required by Tailwind v4 |
| ESLint | 9.x | Code linting | Included by default via create-next-app |
| Turbopack | bundled | Dev server bundler (replaces Webpack) | Default in Next.js 16, used by `next dev` and `next build` |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| pnpm | npm / yarn / bun | pnpm is locked as project decision -- faster, stricter dependency resolution |
| Tailwind v4 | Tailwind v3 | v4 is now default in create-next-app; simpler config, faster builds, no reason to use v3 for greenfield |
| Turbopack | Webpack | Turbopack is default in Next.js 16; Webpack available via `--webpack` flag if needed |

**Installation (single command):**
```bash
pnpm create next-app@latest courses-for-veterans --ts --tailwind --eslint --app --use-pnpm
```

## Architecture Patterns

### Default Project Structure (create-next-app output, no --src-dir)
```
courses-for-veterans/
├── app/                    # Next.js App Router (routing)
│   ├── layout.tsx          # Root layout (html, body, global CSS import)
│   ├── page.tsx            # Home page (/ route)
│   ├── globals.css         # Global styles with @import "tailwindcss"
│   └── favicon.ico         # Default favicon
├── public/                 # Static assets (served at /)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .gitignore
├── eslint.config.mjs       # ESLint configuration (flat config)
├── next.config.ts          # Next.js configuration
├── next-env.d.ts           # Auto-generated TypeScript declarations
├── package.json            # Dependencies and scripts
├── pnpm-lock.yaml          # pnpm lockfile
├── postcss.config.mjs      # PostCSS config with @tailwindcss/postcss
├── tsconfig.json           # TypeScript configuration
└── README.md               # Default README
```

### Pattern 1: FSD-Aware Initialization (Phase 2 compatibility)
**What:** Initialize without `--src-dir` so `app/` stays at root level
**When to use:** Always for this project -- FSD restructuring in Phase 2 needs `app/` at root
**Why:** FSD with Next.js App Router places `app/` at project root for routing and `src/` for FSD layers (pages, widgets, features, entities, shared). Using `--src-dir` puts `app/` inside `src/`, creating a conflict.

```
# Phase 1 output (app/ at root):
courses-for-veterans/
├── app/           # Next.js routing -- stays here
├── public/        # Static assets
└── ...config files

# Phase 2 will restructure to:
courses-for-veterans/
├── app/           # Next.js routing (re-exports from src/pages)
├── pages/         # Empty folder (prevents Next.js Pages Router conflict)
├── src/           # FSD layers
│   ├── app/       # FSD app layer
│   ├── pages/     # FSD pages
│   ├── widgets/
│   ├── features/
│   ├── entities/
│   └── shared/
└── ...config files
```

### Pattern 2: Tailwind v4 CSS-First Configuration
**What:** Tailwind v4 replaces `tailwind.config.js` with CSS-based `@theme` directive
**When to use:** All styling configuration in this project
**Example:**
```css
/* app/globals.css -- generated by create-next-app with Tailwind v4 */
@import "tailwindcss";

/* Custom theme values (if needed later): */
@theme {
  --color-primary: oklch(0.5 0.2 240);
  --font-heading: "Inter", sans-serif;
}
```

### Pattern 3: PostCSS Configuration for Tailwind v4
**What:** Tailwind v4 uses `@tailwindcss/postcss` instead of `tailwindcss` as PostCSS plugin
**When to use:** Automatically set up by create-next-app
**Example:**
```javascript
// postcss.config.mjs -- generated by create-next-app
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### Anti-Patterns to Avoid
- **Using `--src-dir` flag:** Puts `app/` inside `src/`, conflicts with FSD restructuring in Phase 2
- **Installing Tailwind v3 manually:** create-next-app already installs v4; do not downgrade
- **Creating `tailwind.config.js`:** Tailwind v4 uses CSS-first config via `@theme`; JS config is legacy
- **Adding `autoprefixer` or `postcss-import`:** Tailwind v4 handles these automatically
- **Using `@tailwind base/components/utilities`:** v3 syntax; v4 uses `@import "tailwindcss"`

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Project scaffolding | Manual file creation | `pnpm create next-app@latest` | Generates correct config, TypeScript types, ESLint setup, Tailwind integration |
| PostCSS pipeline | Custom PostCSS config | create-next-app default `postcss.config.mjs` | Tailwind v4 auto-handles imports and autoprefixing |
| TypeScript config | Custom tsconfig.json | create-next-app default + `next-env.d.ts` | Next.js generates optimal TS config with path aliases |
| ESLint setup | Manual rules | create-next-app default `eslint.config.mjs` | Includes Next.js-specific rules out of the box |

**Key insight:** `create-next-app` in 2026 produces a production-ready setup. Customizing the generated config at Phase 1 is premature and risks breaking the toolchain. Accept defaults, verify they work, customize in later phases.

## Common Pitfalls

### Pitfall 1: Using --src-dir with FSD
**What goes wrong:** `app/` ends up inside `src/`, FSD restructuring in Phase 2 requires moving it back to root, causing git history churn and potential breakage
**Why it happens:** Habit from non-FSD projects, or not reading FSD + Next.js App Router docs
**How to avoid:** Omit `--src-dir` flag. Phase 2 will create `src/` for FSD layers separately.
**Warning signs:** `app/` directory appears at `src/app/` instead of root-level `app/`

### Pitfall 2: Mixing Tailwind v3 and v4 syntax
**What goes wrong:** Styles don't apply, build warnings, confusing error messages
**Why it happens:** Old tutorials show v3 syntax (`@tailwind base`, `tailwind.config.js`)
**How to avoid:** Use only v4 patterns: `@import "tailwindcss"`, `@theme` directive, `@tailwindcss/postcss` plugin
**Warning signs:** Presence of `tailwind.config.js` file, `@tailwind` directives in CSS

### Pitfall 3: Running npx instead of pnpm
**What goes wrong:** Creates npm lockfile (`package-lock.json`) alongside pnpm lockfile, causing dependency resolution conflicts
**Why it happens:** Tutorials default to npm/npx commands
**How to avoid:** Use `pnpm create next-app@latest` (not `npx create-next-app@latest`). If using npx, always add `--use-pnpm` flag.
**Warning signs:** `package-lock.json` appears in project root

### Pitfall 4: Not verifying Tailwind works
**What goes wrong:** Tailwind appears configured but classes don't render in browser
**Why it happens:** globals.css not imported in root layout, PostCSS misconfigured, or build cache stale
**How to avoid:** After setup, add a Tailwind class (e.g., `className="text-3xl font-bold text-blue-500"`) and visually confirm it renders
**Warning signs:** Default page shows unstyled text, no utility classes in browser DevTools

### Pitfall 5: Initializing inside existing project directory
**What goes wrong:** create-next-app may fail or create nested directories
**Why it happens:** Running the command from wrong directory
**How to avoid:** Run from the parent directory of where you want the project. Since the repo already exists as `courses-for-veterans/`, use `.` as project name or run from parent dir.
**Warning signs:** Nested `courses-for-veterans/courses-for-veterans/` directories

## Code Examples

Verified patterns from official sources:

### Creating the Project
```bash
# Source: https://nextjs.org/docs/app/getting-started/installation
# Source: https://nextjs.org/docs/app/api-reference/cli/create-next-app

# From parent directory of project:
pnpm create next-app@latest courses-for-veterans --ts --tailwind --eslint --app --use-pnpm

# OR from inside existing empty project directory:
pnpm create next-app@latest . --ts --tailwind --eslint --app --use-pnpm
```

### Expected globals.css (Tailwind v4)
```css
/* Source: https://tailwindcss.com/docs/guides/nextjs */
@import "tailwindcss";

/* create-next-app may also include default styling rules */
```

### Expected postcss.config.mjs (Tailwind v4)
```javascript
/* Source: https://tailwindcss.com/docs/guides/nextjs */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### Expected Root Layout
```typescript
// Source: https://nextjs.org/docs/app/getting-started/installation
// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Verification: Tailwind Classes Work
```typescript
// app/page.tsx -- modify to verify Tailwind
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Courses for Veterans
      </h1>
    </main>
  );
}
```

### Verification Commands
```bash
# Start dev server
pnpm dev
# Should output: Ready in Xs on http://localhost:3000

# Build for production (TypeScript + build check)
pnpm build
# Should complete without errors

# Lint check
pnpm lint
# Should pass with no errors
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 (Jan 2025) | Single import, simpler CSS |
| `tailwind.config.js` (JS config) | `@theme` directive in CSS | Tailwind v4 (Jan 2025) | No JS config file needed |
| `tailwindcss` as PostCSS plugin | `@tailwindcss/postcss` package | Tailwind v4 (Jan 2025) | Separate PostCSS plugin package |
| Webpack (default bundler) | Turbopack (default) | Next.js 16 (Oct 2025) | 3-10x faster dev/build |
| `tailwindcss` + `autoprefixer` in PostCSS | `@tailwindcss/postcss` only | Tailwind v4 (Jan 2025) | autoprefixer built-in |
| `next.config.js` | `next.config.ts` | Next.js 15+ | TypeScript config support |
| `eslintrc.json` | `eslint.config.mjs` (flat config) | ESLint 9 / Next.js 15+ | Modern ESLint flat config |

**Deprecated/outdated:**
- `tailwind.config.js`: Still supported in v4 via `@config` directive but no longer auto-detected or recommended
- `@tailwind` directives: Replaced by `@import "tailwindcss"` in v4
- `autoprefixer` package: Built into Tailwind v4, no separate install needed
- `postcss-import`: Built into Tailwind v4
- Webpack as default bundler: Turbopack is now default in Next.js 16 (Webpack available via `--webpack` flag)

## Open Questions

1. **Project name in existing repo**
   - What we know: The git repo `courses-for-veterans` already exists with `.planning/` and `.claude/` directories
   - What's unclear: Whether `create-next-app .` works cleanly in a non-empty directory (it has `.git`, `.planning`, `.claude` dirs)
   - Recommendation: Use `pnpm create next-app@latest . --ts --tailwind --eslint --app --use-pnpm` from inside the project root. If it refuses due to non-empty directory, create in a temp directory and move files. The `.gitignore` generated by create-next-app should not conflict with existing `.planning/` or `.claude/` dirs.

2. **Turbopack vs Webpack for build**
   - What we know: Turbopack is default in Next.js 16 for both dev and build
   - What's unclear: Whether any edge cases exist with Tailwind v4 + Turbopack
   - Recommendation: Accept the Turbopack default. If issues arise, `--webpack` flag is available as fallback.

## Sources

### Primary (HIGH confidence)
- [Next.js Installation Guide](https://nextjs.org/docs/app/getting-started/installation) - create-next-app defaults, flags, project setup
- [Next.js CLI: create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app) - complete flag reference
- [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure) - file conventions, App Router structure
- [Next.js CSS Guide](https://nextjs.org/docs/app/getting-started/css) - Tailwind v4 integration with Next.js
- [Next.js src folder docs](https://nextjs.org/docs/app/api-reference/file-conventions/src-folder) - src/ directory conventions
- [Tailwind CSS Next.js Guide](https://tailwindcss.com/docs/guides/nextjs) - v4 installation steps for Next.js
- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide) - v3 to v4 changes, new syntax
- [FSD + Next.js Guide](https://feature-sliced.design/docs/guides/tech/with-nextjs) - official FSD recommendation for App Router

### Secondary (MEDIUM confidence)
- [Next.js 16.1 Blog Post](https://nextjs.org/blog/next-16-1) - confirmed current stable version 16.1.x
- [GitHub Discussion #75320](https://github.com/vercel/next.js/discussions/75320) - confirmed Tailwind v4 default since Next.js 15.2
- [Next.js v16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) - Turbopack as default bundler

### Tertiary (LOW confidence)
- None needed -- all claims verified with primary/secondary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - verified via official Next.js and Tailwind docs, version numbers confirmed
- Architecture: HIGH - official FSD docs + Next.js file conventions docs cross-referenced
- Pitfalls: HIGH - derived from verified v3-to-v4 changes and FSD integration requirements

**Research date:** 2026-02-10
**Valid until:** 2026-03-10 (stable toolchain, 30-day validity)
