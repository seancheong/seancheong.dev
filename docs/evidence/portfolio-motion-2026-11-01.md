# Portfolio Motion validation — 1 November 2026

Delivery: [Build the accessible Portfolio Motion System](https://github.com/seancheong/seancheong.dev/issues/41).
Base: merged foundation `c3c0082`. Implementation branch: `codex/portfolio-motion`.

## Implemented policy

- A narrow `@/portfolio-motion` interface exports Reveal, PointerSpotlight and
  MotionPolicy. It contains no content, route or journey imports.
- CSS owns 120ms/220ms ease-out timing and the 12px reveal. Initial HTML remains
  fully opaque and untransformed; only an offscreen section's first intersection
  plays a transform-only enhancement. Already-visible content skips entrance.
- Keyboard focus cancels reveal travel immediately. Reduced motion cancels active
  reveals, collapses tokens, disables CSS animations/transitions and configures
  retained Motion consumers. Re-enabling motion never replays a consumed reveal.
- The 1.1%-opacity violet spotlight accepts only mouse movement on a hover-capable
  fine-pointer device. A clipped, aria-hidden, pointer-transparent layer cannot
  widen the document, capture input or add a focus stop. Pointer movement updates
  once per animation frame without React renders. Touch, pen, keyboard, blur,
  pointer exit and reduced-motion changes hide it.
- Layout mounts policy/spotlight once; retained Experience and Projects opt into
  Reveal without changing native headings/links/sections. The old location-icon
  loop is removed. The duplicate direct framer-motion 11 dependency is removed;
  all retained Motion consumers use the existing motion 12 runtime.
- No prototype modules, stagger, reading-progress UI or page choreography added.
  The later accepted career-timeline rail stays in homepage issue #44.

## Verification

Toolchain: Node 22.23.4 from `.node-version`, pnpm 10.20.0.

| Check                                             | Result                                                          |
| ------------------------------------------------- | --------------------------------------------------------------- |
| Frozen offline install                            | Pass; obsolete dependency removed                               |
| Prettier, zero-warning ESLint, TypeScript         | Pass                                                            |
| Dependency-direction check and content validation | Pass                                                            |
| Production build                                  | Pass; homepage First Load JS reported as 229kB (build estimate) |
| Vitest / Testing Library                          | 85 passed                                                       |
| Playwright                                        | 71 passed across Chromium, Firefox and WebKit, zero retries     |
| axe                                               | Desktop and expanded mobile navigation: zero violations         |

A first standalone TypeScript run raced Next's generation of `.next/types` during
build and reported missing generated files. The build's own type check passed;
standalone TypeScript passed after the build. Browser servers required the normal
local-server sandbox escalation. Neither event is an application test failure.

Public-interface tests cover server-visible native controls, once-only behavior,
keyboard cancellation, live reduced-motion cancellation, initial reduced motion,
initial viewport content and missing IntersectionObserver. Browser checks record
the actual 220ms CSS animation, prevent replay after reverse scrolling, exercise
normal/reduced preference changes, verify 120ms control timing and 1.1% spotlight
opacity, reject pen/touch, check edge overflow, and verify JavaScript-disabled
content in all three engines. Existing shell/routing checks cover the five widths,
keyboard navigation/Escape/focus, locale boundaries and anchors.

Screenshots are real production-build captures of the retained homepage; they are
motion/fallback evidence, not approval of its legacy content or project curation:

- [Normal motion / keyboard focus](portfolio-motion-2026-11-01/motion-normal-chromium.png)
- [Reduced motion](portfolio-motion-2026-11-01/motion-reduced-chromium.png)
- [Touch / native mobile disclosure](portfolio-motion-2026-11-01/motion-touch-chromium.png)
- [JavaScript disabled](portfolio-motion-2026-11-01/motion-no-js-chromium.png)

## Performance

Collected three mobile and three desktop samples from the production build.
The strict stored-report evaluator exits 1, preserving the release gate.

| Median                   | Mobile        | Desktop       |
| ------------------------ | ------------- | ------------- |
| Performance              | 95            | 100           |
| Accessibility            | 100           | 100           |
| Best Practices           | 92            | 92            |
| SEO                      | 91            | 91            |
| LCP                      | 3007ms        | 627ms         |
| CLS                      | 0             | 0             |
| TBT                      | 44ms          | 0ms           |
| Measured Script transfer | 236,227 bytes | 236,227 bytes |
| LCP media transfer       | 32,035 bytes  | 32,035 bytes  |

[All samples, medians and failed gates](portfolio-motion-2026-11-01/lighthouse-summary.json).
Raw Lighthouse HTML/JSON remains under `artifacts/lighthouse` and is collected
again by hosted CI. Whole-page JavaScript exceeds the 180,000-byte hard limit and
160,000-byte Home target; mobile LCP exceeds 2500ms. Best Practices and SEO remain
below 100. No matched current-base measurement was supplied, so this report does
not claim a measured JavaScript regression pass or attribute whole-site failures
to this module. Existing legacy replacement and release scopes retain those
failures; thresholds and assertions are unchanged. Module behavior/static/browser
validation is complete, but strict performance acceptance is not.

## Remaining gates

Review, merge, merged-revision CI and deployment verification are pending. No new
user visual acceptance, physical-device or VoiceOver/NVDA sign-off is inferred.
Legacy contextual icon/project effects, biography, project curation and contact
form remain in their existing homepage/contact replacement scopes. Final journey
and publication approval, strict whole-site performance budgets, physical-device
and manual accessibility checks remain in the later delivery/release gates.

Next: review/merge this delivery after hosted checks, verify merged main and scoped
production behavior, then author publication-ready Takonbini evidence/media (#42)
before the case-study journey (#43) can complete.
