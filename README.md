# Sean Cheong's Portfolio

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Toolchain and static checks

Use Node 22 (`.node-version`) and pnpm 10.20.0 (`packageManager`). Install with
`pnpm install --frozen-lockfile` when verifying a checkout. Use `pnpm install`
when intentionally changing dependencies and commit the resulting lockfile.

Run each check independently:

- `pnpm format:check` (or `pnpm format` to apply formatting)
- `pnpm lint` (zero warnings)
- `pnpm typecheck`
- `pnpm check:dependencies`
- `pnpm build`

CI runs these as separate matrix jobs for pull requests to `main` and pushes to
`main`, cancels superseded runs, and caches only the pnpm package store. Browser,
accessibility, and unit test jobs belong to the subsequent quality-harness task.

`eslint.dependencies.mjs` establishes scoped import rules for the future
`src/portfolio-content`, `src/journeys/{home,case-study,articles}`, and
`src/portfolio-motion` modules and existing generic `src/components/ui`.
Routes may depend on journeys; journeys may depend on content, motion, and generic
UI; journeys must not import one another. Content returns data rather than JSX.
Use `@/` imports across module boundaries. As modules land, extend the scoped
rules to their actual public entry points. Final migration verification must also
check relative-import bypasses, content-file ownership, and prototype isolation;
this initial rule setup does not certify completion of the architecture migration.

The design prototype remains reference material on its original branch. The
`codex/portfolio-toolchain` delivery branch starts from `main` and excludes those
prototype changes.

## Automated quality harness

See [the quality harness guide](docs/quality.md) for unit/component, cross-browser,
axe, Lighthouse, release-budget enforcement, failure probes and artifact commands.
The current homepage proves the harness wiring; passing harness checks do not
certify completion of the redesign or release gates.

## Portfolio Content

See [the content guide](docs/content.md) for the typed content interface, locale
availability, explicit server MDX loaders and publication rules. Run
`pnpm content:check` for current content and `pnpm content:check --release` for
flagship/article publication readiness. English is currently the only public locale.
