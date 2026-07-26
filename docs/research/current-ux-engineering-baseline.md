# Current UX and engineering baseline

**Research question:** What is the current accessibility, responsive, SEO, performance, testing, dependency, motion, and module-structure baseline of `seancheong.dev`, and which facts materially constrain the redesign?

**Captured:** 26 July 2026  
**Repository baseline:** `ae8b01a` (`feat: Update script blender's URL`)  
**Public site checked:** [https://www.seancheong.dev/en](https://www.seancheong.dev/en)

## Executive summary

The current site is a functional, localized, one-page resume with a valid production build and useful foundations: semantic `main`/`section` structure, real links and buttons, labelled form fields, responsive single-column fallbacks, `next/image`, local fonts, shadcn-style primitives, and working Open Graph/Twitter metadata declarations. It does not yet function as a portfolio evidence system: all five projects leave the site, there are no case-study or writing routes, most content is presented with the same card treatment, and the hero identifies Sean through rotating roles rather than a durable value proposition.

The redesign should treat the following as hard constraints rather than cosmetic cleanup:

1. **Progressive rendering and reduced motion need to be redesigned together.** Every major section is server-rendered at `opacity: 0` and waits for client JavaScript; the only `h1` is empty in initial HTML; no code responds to `prefers-reduced-motion`; and the rotating role updates indefinitely without a pause mechanism.
2. **The current locale route accepts invalid locales and swallows metadata assets.** `/robots.txt`, `/sitemap.xml`, and the configured social image `/screenshot.png` all return the portfolio HTML with HTTP 200 and an invalid `lang` derived from the path. The real image is `/images/screenshot.png`.
3. **The page ships a material animation/UI client payload before it has case-study value.** The current local build reports 282 kB first-load JavaScript for `/[locale]`; the public page referenced about 319 KiB compressed JavaScript across its initial script tags, excluding CSS and HTML. These are baseline observations, not performance-budget recommendations.
4. **The module boundaries encode the present resume page.** Work data, experience data, homepage layout, contact behavior, and motion policy are embedded in rendering components. A generic `components/ui` module imports portfolio translation and routing concerns. The redesign needs domain modules before multiple case-study and locale routes multiply those dependencies.
5. **Quality automation is below the agreed release bar.** CI runs only lint and build on pull requests to `main`; there are no tests, browser checks, automated accessibility checks, performance budgets, or explicit formatting/typecheck scripts.

## Method and confidence

This audit used primary evidence only:

- repository source, configuration, lockfile, assets, and CI workflow;
- a local production build and static rendered HTML audit;
- HTTP responses and initial HTML from the public site;
- axe-core 4.10.0 against the public server-rendered document;
- official W3C and Next.js documentation for benchmark statements.

Facts labelled **measured** were directly observed in source, command output, HTML, or HTTP responses. Statements labelled **inference** explain likely consequences and should be validated in a browser prototype or implementation ticket.

The in-app browser was unavailable in this session. Therefore this report does **not** claim a Lighthouse score, Core Web Vitals, computed color-contrast result, keyboard walkthrough, screen-reader result, or visual viewport screenshot. The locked dependency install was also unavailable; local build tools came from the primary worktree and used Next.js 15.3.4, while the manifest and lockfile specify Next.js 15.4.10. Those limitations are retained below rather than filled with estimates.

## Product and content baseline

### Measured facts

- The site is one route, [`/[locale]`](../../src/app/%5Blocale%5D/page.tsx), composed as Hero, Profile, Experience, Projects, Contact, and Email sections. Navigation is anchor-based.
- The hero leads with “Hi, I'm Sean,” and rotates through five roles: Frontend Team Lead, Frontend Engineer, Fullstack Engineer, Certified AWS Solutions Architect, and Certified ScrumMaster ([`Hero.tsx`](../../src/app/%5Blocale%5D/components/Hero.tsx), [`messages/en.json`](../../messages/en.json)).
- Five projects are embedded in [`Projects.tsx`](../../src/app/%5Blocale%5D/components/Projects.tsx). Every project card opens an external live site or GitHub repository; there are no internal work or case-study routes.
- Employment history is embedded in [`ExperienceTimeline.tsx`](../../src/app/%5Blocale%5D/components/ExperienceTimeline.tsx). The page lists roles, dates, employer logos, locations, and technology badges, but no project outcomes or decision narratives.
- Medium appears only as an icon link in the contact area. There is no Notes/Writing section.
- The contact journey is duplicated: mailto buttons appear in the hero and contact section, followed by a full contact form ([`Hero.tsx`](../../src/app/%5Blocale%5D/components/Hero.tsx), [`Contact.tsx`](../../src/app/%5Blocale%5D/components/Contact.tsx), [`Email.tsx`](../../src/app/%5Blocale%5D/components/Email.tsx)).
- Most substantial sections use the same rounded, bordered, white container treatment. The project title is itself a card, followed by five more cards ([`globals.css`](../../src/app/%5Blocale%5D/globals.css), [`Experience.tsx`](../../src/app/%5Blocale%5D/components/Experience.tsx), [`Projects.tsx`](../../src/app/%5Blocale%5D/components/Projects.tsx)).

### Material inference

The current information architecture optimizes for scanning credentials, not evaluating product judgment. The first redesign release needs an internal evidence path—at minimum the already-agreed one complete case study—before visual polish can change that perception. The existing external project destinations should remain secondary actions, not the primary journey.

## Accessibility baseline

### Strengths observed

- The document has `html[lang="en"]`, one `main`, a `nav`, section headings, real anchor/button controls, and visible form labels.
- Icon-only social links include screen-reader-only names; the mobile menu trigger has an accessible name; company and project images have `alt` attributes.
- The contact form uses shadcn/Radix form primitives that render label associations, descriptions, invalid-state attributes, and validation messages ([`form.tsx`](../../src/components/ui/form.tsx), [`Email.tsx`](../../src/app/%5Blocale%5D/components/Email.tsx)).
- Project cards remain full links, so their core action does not depend on hover animation.

### Defects and risks observed

1. **Initial `h1` is empty (measured).** `TypingText` initializes `displayedText` to an empty string and fills it only in an effect. The public server-rendered HTML contains an empty `h1`; axe reports `empty-heading` ([`typing.tsx`](../../src/components/animate-ui/text/typing.tsx), [`Hero.tsx`](../../src/app/%5Blocale%5D/components/Hero.tsx)). The primary positioning statement should be complete semantic HTML before motion enhancement.

2. **MotionHighlight emits unsupported ARIA (measured).** It applies `aria-selected` to generic `div` elements and project anchors without a widget role. Axe reports seven `aria-allowed-attr` violations, classified critical by axe ([`motion-highlight.tsx`](../../src/components/animate-ui/effects/motion-highlight.tsx)). WAI-ARIA requires states and properties to be used only where supported; this maps to WCAG 4.1.2 Name, Role, Value ([W3C understanding document](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)). Decorative selection state should use `data-*`, while genuine selection semantics need an appropriate composite widget role and keyboard model.

3. **No reduced-motion policy exists (measured).** A repository-wide search found neither `useReducedMotion` nor a `prefers-reduced-motion` media query. Global CSS forces smooth scrolling, while reveals, typing, rotating text, hover highlights, image scaling, tooltips, and animated icons remain enabled ([`globals.css`](../../src/app/%5Blocale%5D/globals.css), [`Reveal.tsx`](../../src/components/Reveal.tsx)). `prefers-reduced-motion` is the standardized user preference for minimizing non-essential motion ([CSS Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion)).

4. **The rotating role is indefinite auto-updating content (measured).** It changes every four seconds and provides no pause, stop, hide, or frequency control ([`rotating.tsx`](../../src/components/animate-ui/text/rotating.tsx), [`Hero.tsx`](../../src/app/%5Blocale%5D/components/Hero.tsx)). WCAG 2.2.2 requires a control for qualifying auto-updating content that starts automatically and appears alongside other content ([W3C Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)). Replacing it with stable positioning removes this issue rather than adding controls to a low-value effect.

5. **All primary content visually depends on hydration (measured).** `Reveal` renders its child at `opacity: 0` with a 50 px transform, waits for `useInView`, then animates for 600 ms after a default 500 ms delay. The public initial HTML showed these inline hidden styles on the header and every section ([`Reveal.tsx`](../../src/components/Reveal.tsx), [`page.tsx`](../../src/app/%5Blocale%5D/page.tsx)). **Inference:** JavaScript failure or delayed hydration leaves sighted users with an effectively blank page even though the text remains in the DOM.

6. **Image alternatives are present but weak in two places (measured).** The two personal images use only `alt="portrait"` and `alt="profile"`, which do not identify the subject or explain whether the images are informative ([`Profile.tsx`](../../src/app/%5Blocale%5D/components/Profile.tsx), [`Contact.tsx`](../../src/app/%5Blocale%5D/components/Contact.tsx)). The redesign should make them either meaningfully descriptive or decorative.

7. **Focus treatment needs visual verification (risk).** Shared controls replace the default outline with a one-pixel ring, while plain navigation/project links rely on browser defaults or hover-only styling ([`button.tsx`](../../src/components/ui/button.tsx), [`bento-grid.tsx`](../../src/components/ui/bento-grid.tsx)). No computed-color or keyboard test was possible, so this is a prototype/test requirement, not a recorded WCAG failure.

### Accessibility constraint for the plan

The motion system cannot be a styling wrapper applied after components are built. Its contract must include semantic HTML, keyboard parity, focus visibility, non-motion fallbacks, server-visible content, and reduced-motion behavior. Automated axe checks will catch only part of this; the implementation backlog still needs keyboard and screen-reader acceptance checks.

## Responsive behavior baseline

### Measured from source

- The page container is capped at `max-w-5xl` with 24 px horizontal padding.
- Below Tailwind's `md` breakpoint, desktop navigation is hidden and a Radix dropdown trigger appears. Profile changes from two columns to a stacked 400 px image plus content. Projects change from a five-column bento layout to one column. Hero actions stack and the primary contact button becomes full width ([`page.tsx`](../../src/app/%5Blocale%5D/page.tsx), [`Header.tsx`](../../src/app/%5Blocale%5D/components/Header.tsx), [`Profile.tsx`](../../src/app/%5Blocale%5D/components/Profile.tsx), [`bento-grid.tsx`](../../src/components/ui/bento-grid.tsx)).
- Project images use responsive `sizes`; the main portrait is priority-loaded. Company logos use `sizes="50vw"` despite rendering around 80 px wide ([`ExperienceTimeline.tsx`](../../src/app/%5Blocale%5D/components/ExperienceTimeline.tsx)).
- The mobile menu uses a 100 ms timeout before `router.push` because otherwise scrolling reportedly returns to the top. This is a documented workaround in [`Header.tsx`](../../src/app/%5Blocale%5D/components/Header.tsx), not a verified browser result.

### Unverified risks

- No viewport screenshots or device interaction runs were possible. Text wrapping in the future longer English, Japanese, and Simplified Chinese content is therefore unresolved.
- The layout has only one major breakpoint and several fixed dimensions. The 400 px mobile portrait and project image aspect behavior deserve direct prototype review at narrow and intermediate widths.
- Hover effects have no explicit `@media (hover: hover)` boundary. Core actions remain accessible, but touch and hybrid-device behavior should be defined in the motion contract.

## Motion and visual-system baseline

### Measured facts

- The code uses both `framer-motion` 11 and `motion` 12. `Reveal` imports the former; all animate-ui components import `motion/react` from the latter ([`package.json`](../../package.json)). The lockfile consequently contains Motion 12 and both Framer Motion 11 and 12 package entries.
- Reveal timings are decentralized from animate-ui timings. The main reveal is 50 px / 600 ms / 500 ms default delay; rotating text is 50 px / 400 ms every four seconds; project images scale to 1.05 over 500 ms; highlight uses a spring ([`Reveal.tsx`](../../src/components/Reveal.tsx), [`Hero.tsx`](../../src/app/%5Blocale%5D/components/Hero.tsx), [`Projects.tsx`](../../src/app/%5Blocale%5D/components/Projects.tsx), [`motion-highlight.tsx`](../../src/components/animate-ui/effects/motion-highlight.tsx)).
- Local Geist Sans and Geist Mono are loaded and their CSS variables are attached to `body`, but a later global rule explicitly sets `font-family: Arial, Helvetica, sans-serif`; no rule consumes either Geist variable ([`layout.tsx`](../../src/app/%5Blocale%5D/layout.tsx), [`globals.css`](../../src/app/%5Blocale%5D/globals.css)).
- Light and dark tokens exist, but no theme provider, theme toggle, or default `dark` class exists. `next-themes` is declared but unused. The rendered site is light-only.

### Constraint for the plan

Standardizing on `motion/react` and a central motion policy is not merely dependency cleanup: it is required to make timing, reduced motion, interruption, SSR visibility, hover capability, and test behavior consistent. Dark-first visual work should also begin by replacing the token and typography foundations, not by layering gradients over the current card system.

## Internationalization and SEO baseline

### Localization facts

- `next-intl` is correctly integrated through a request configuration, middleware, client provider, and a dynamic `[locale]` segment ([`next.config.mjs`](../../next.config.mjs), [`request.ts`](../../src/i18n/request.ts), [`routing.ts`](../../src/i18n/routing.ts), [`middleware.ts`](../../src/middleware.ts)).
- Only `en` is configured. There is no locale switcher and no Japanese or Simplified Chinese content.
- Components frequently call `useTranslations()` without a namespace, coupling them to the complete message object. Long profile/experience passages are HTML strings sanitized and injected at render time.
- Internal navigation uses `next/link` and `next/navigation`, not the locale-aware wrappers exported by [`routing.ts`](../../src/i18n/routing.ts). The current single-locale site masks the consequences; multi-locale routing needs explicit conventions.

### Metadata strengths

- The layout declares a title, description, keywords, author, Open Graph fields, Twitter card fields, favicon, and correct dynamic `html[lang]` for `/en` ([`layout.tsx`](../../src/app/%5Blocale%5D/layout.tsx)).
- `/` returns a 307 locale redirect to `/en`; the public `/en` page returns HTTP 200.

### Metadata and routing defects

1. **The configured social image is broken.** Metadata points to `https://www.seancheong.dev/screenshot.png`, but the repository asset is [`public/images/screenshot.png`](../../public/images/screenshot.png). The public `/screenshot.png` endpoint returns the portfolio HTML as `text/html`, not an image.
2. **Robots and sitemap endpoints are missing and become false pages.** The repository contains no `robots` or `sitemap` metadata file. Public `/robots.txt` and `/sitemap.xml` each return the portfolio HTML with HTTP 200 and `text/html`. Next.js supports dedicated metadata-file conventions for [`robots.txt`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) and [`sitemap.xml`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).
3. **Arbitrary strings are accepted as locales.** The middleware matcher handles `/` and `/en`, but the dynamic route itself does not reject unknown locale params. Direct requests above rendered `<html lang="robots.txt">` and `<html lang="sitemap.xml">`; the message loader fell back to English while the layout used the raw route param ([`middleware.ts`](../../src/middleware.ts), [`request.ts`](../../src/i18n/request.ts), [`layout.tsx`](../../src/app/%5Blocale%5D/layout.tsx)).
4. **No canonical or language alternatives are emitted.** The metadata has no `alternates`. This is not material for English alone, but becomes required design work before the committed `ja` and `zh-CN`/`zh-Hans` launch.
5. **Metadata is site-wide and generic.** There is no route-level title/description or social preview strategy because there are no case-study routes yet.

### Constraint for the plan

Keep `next-intl`, but make locale validation a route invariant before adding more routes. The content model and metadata interface should require localized title/summary/SEO fields, canonical URLs, language alternatives, and locale-safe internal navigation. Standard metadata endpoints must sit outside locale capture.

## Performance and build baseline

### Local build (measured with caveat)

The production build completed successfully, as did `pnpm lint` and `tsc --noEmit`. The build reported:

| Item                              |                   Observed output |
| --------------------------------- | --------------------------------: |
| `/[locale]` route                 |           154 kB route JavaScript |
| `/[locale]` first-load JavaScript |                            282 kB |
| Shared first-load JavaScript      |                            101 kB |
| Middleware                        |                           67.6 kB |
| Route rendering mode              | Dynamic/server-rendered on demand |

Important caveat: this used a pre-existing dependency tree with Next.js 15.3.4. [`package.json`](../../package.json) and [`pnpm-lock.yaml`](../../pnpm-lock.yaml) specify Next.js 15.4.10. A frozen install could not be completed because registry access was unavailable and elevated third-party lifecycle execution was not approved. The numbers are useful as an approximate baseline, not release-gate values.

### Public delivery (measured)

- `/en` returned `cache-control: private, no-cache, no-store, max-age=0, must-revalidate`, consistent with a dynamically rendered page rather than cached static portfolio content.
- The initial public HTML referenced ten JavaScript files totaling approximately **319 KiB compressed**, plus approximately **6.9 KiB compressed CSS**. The compressed HTML response in one coarse request was approximately 19.8 KiB. Network timing from that single request is intentionally not reported as a performance conclusion.
- Public source images total approximately 1.7 MiB on disk. The largest originals are Cashush (712 KiB PNG), Script Blender (368 KiB PNG), and the screenshot (252 KiB PNG). `next/image` optimizes displayed content images, but the social preview asset is currently unreachable at its configured URL.
- Nineteen of the 38 TypeScript/TSX source modules are client components. The page needs client code for header navigation, form state, every reveal, typing/rotating text, highlight behavior, animated icons, tooltip, and toasts.

### Constraint for the plan

The agreed Lighthouse budgets need a reproducible measurement ticket using the exact locked toolchain and browser environment. Before setting numeric budgets, prototype pages should establish what the new case-study media and motion system actually require. Independently of the final budget, static generation/caching, progressive SSR visibility, client-boundary reduction, image policy, and bundle inspection are clearly in scope.

## Engineering and module-structure baseline

### Repository shape

- 38 TypeScript/TSX files, approximately 3,665 lines total.
- Route-specific portfolio components live in [`src/app/[locale]/components`](../../src/app/%5Blocale%5D/components).
- Generic primitives and portfolio-aware components both live in [`src/components/ui`](../../src/components/ui).
- Motion components live in both [`src/components/Reveal.tsx`](../../src/components/Reveal.tsx) and [`src/components/animate-ui`](../../src/components/animate-ui).
- Email UI lives beside the route, while its server action lives in [`src/features/email/actions/emailAction.ts`](../../src/features/email/actions/emailAction.ts).
- There is no `content`, `work`, `craft`, or case-study module.

### Ownership problems observed

1. [`bento-grid.tsx`](../../src/components/ui/bento-grid.tsx) is not a generic UI primitive: it imports `next-intl` and `next/link`, owns “Show more” copy, forces external navigation, and encodes project-card presentation.
2. Project definitions include React image nodes, layout classes, URLs, and identifiers inside the rendering component. The same records cannot cleanly drive case-study routes, metadata, project navigation, or localized archives.
3. Employment content likewise combines domain data, locale keys, image details, responsive classes, date formatting, and timeline rendering.
4. Motion values and accessibility behavior have no owner. Components can choose either animation package and invent independent timings.
5. Contact spans route components and a feature action. The server action accepts three raw strings, performs no server-side schema validation or throttling, interpolates the message into HTML, and exposes no typed result state ([`emailAction.ts`](../../src/features/email/actions/emailAction.ts)). The agreed removal of form/SES eliminates this module rather than requiring a redesign.
6. The route page is shallow enough today, but adding three locales, case studies, Notes, Craft demonstrations, and per-route metadata without new module seams would duplicate data and routing logic.

### Dependency observations

- `framer-motion` 11 and `motion` 12 overlap.
- Both individual `@radix-ui/react-*` packages and the broad `radix-ui` package are declared; the broad package has no source import and brings a large Radix package graph into the lockfile.
- `next-themes` is declared but unused.
- `jsdom` is a production dependency, transitively supporting `isomorphic-dompurify` usage in server-rendered copy; the future typed content approach may remove the need for runtime HTML sanitization.
- `eslint-config-next` is 15.3.4 while `next` is 15.4.10 in the manifest/lockfile. Toolchain packages should be aligned before defining CI as a release gate.

### Recommended dependency direction to validate in the architecture ticket

```text
app routes and route composition
        ↓
portfolio modules (work, craft, notes, contact, motion)
        ↓
brand-neutral UI primitives + utilities
```

This is an inference from observed ownership, not an implementation prescription. The architecture decision still needs to define which homepage-only components remain colocated with the route and which modules need public interfaces.

## Tests and CI baseline

### Measured facts

- No test/spec files or configuration for Vitest, Jest, Playwright, or Cypress exist.
- No testing or coverage packages are declared.
- Package scripts are only `dev`, `build`, `start`, and `lint`; there are no explicit format, typecheck, unit, component, E2E, accessibility, or Lighthouse scripts ([`package.json`](../../package.json)).
- CI runs on pull requests targeting `main`, using Node 22 and pnpm 10. It installs dependencies, runs `pnpm lint`, then `pnpm build`. It does not run on pushes and has no cache, concurrency cancellation, artifact, preview, accessibility, or performance step ([`continuous_integration.yml`](../../.github/workflows/continuous_integration.yml)).
- TypeScript is strict, but `skipLibCheck` and `allowJs` are enabled ([`tsconfig.json`](../../tsconfig.json)). ESLint includes Next core-web-vitals, Next TypeScript rules, and Prettier-as-ESLint ([`eslint.config.mjs`](../../eslint.config.mjs)).

### Constraint for the plan

The quality strategy should be staged so architecture work is not blocked by an oversized test migration: first establish reliable format/lint/typecheck/build commands and exact dependencies; then add unit/component coverage for content and motion contracts; then browser smoke, axe, localization, and Lighthouse gates around completed routes. Visual and assistive-technology manual checks still need explicit release criteria.

## Decisions this baseline should constrain

| Planning area            | Evidence-backed constraint                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Positioning              | Replace the animated list of roles with one server-rendered statement for frontend leadership/product judgment; AI remains a future evidence-backed direction.                                   |
| Information architecture | Create an internal case-study path and a curated Notes path; external product/GitHub/Medium links become supporting actions.                                                                     |
| Visual prototype         | Compare dark product-like and dark editorial directions using real hero/project/case-study content, including narrow and intermediate widths. Do not prototype only a desktop hero.              |
| Motion prototype         | Test a small tokenized system with reduced-motion and no-JS fallbacks; stable content must render first. Prototype focus, hover, touch, and interrupted state transitions.                       |
| Accessibility            | Remove invalid ARIA from highlight behavior, preserve real controls, verify focus contrast, and include keyboard plus screen-reader acceptance criteria beyond axe.                              |
| Localization             | Retain `next-intl`; validate locale params; use locale-aware navigation; design content/metadata for `en`, future `ja`, and Simplified Chinese without duplicating structural project facts.     |
| SEO                      | Add correct social assets, canonical/language alternatives, route-specific metadata, robots, sitemap, and real not-found behavior before public launch.                                          |
| Rendering/performance    | Prefer static/cached portfolio and case-study output where possible; reduce client boundaries and animation packages; set budgets only after an exact-toolchain browser baseline.                |
| Architecture             | Separate route composition, portfolio domains, and brand-neutral UI. Centralize motion policy and typed content records. Remove the contact form/SES path per the already-made product decision. |
| Quality                  | Align dependencies first, then make formatting, linting, typechecking, tests, production build, accessibility checks, locale smoke tests, and performance checks independently visible in CI.    |

## Baseline qualities worth preserving

- A small, understandable Next.js App Router codebase.
- `next-intl` as the localization foundation.
- Editable shadcn/Radix-style primitives rather than a closed component package.
- Real links/buttons and labelled form primitives.
- Local font files and semantic color tokens, though their application needs correction.
- `next/image`, meaningful company/project names, and source-controlled project assets.
- Strict TypeScript and an existing pull-request CI workflow.
- A restrained page width and mobile-first single-column fallback.

## Follow-up measurements required before implementation sign-off

These are blockers to **numeric acceptance criteria**, not blockers to the Wayfinder map:

1. Run Lighthouse and Core Web Vitals lab checks against the exact locked dependency build, with mobile and desktop profiles.
2. Run axe after hydration and perform a keyboard walkthrough of navigation, project previews, locale selection, Craft controls, copy-email feedback, and case-study navigation.
3. Perform screen-reader checks of the hero, dynamic/morphing control announcements, project cards, and locale changes.
4. Capture visual viewport evidence at narrow mobile, wide mobile, tablet/intermediate, laptop, and large desktop widths.
5. Validate Japanese and Simplified Chinese line breaking with representative translated content, not machine-length placeholders.
6. Measure final case-study media and font loading before setting image/LCP budgets.
