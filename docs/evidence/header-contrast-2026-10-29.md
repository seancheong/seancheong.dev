# Header contrast investigation — 29 October 2026

Follow-up to [Portfolio Content and locale-safe routing](https://github.com/seancheong/seancheong.dev/issues/39).

## Failure and cause

[Main quality run, attempt 1](https://github.com/seancheong/seancheong.dev/actions/runs/40784614510/attempts/1)
reported serious color-contrast findings on five header links. Attempt 2 passed
without a code change; that retry did not explain or fix the finding.

The retained trace shows the header inside a Reveal wrapper during its delayed
opacity entrance. The wrapper starts at opacity zero on the server and animates
regardless of the browser's reduced-motion preference. Axe can sample the links
while they blend into their background. Navigation also remains transparent if
JavaScript does not run.

The original full scan passed ten normal-speed local runs. A temporary Chromium
reproduction with 6× CPU throttling failed five of ten runs. Restricting the
scan to the header after the same Projects scroll retained four failures in ten
runs, including the same navigation link targets. Before scrolling, the scoped
scan passed ten runs: the timing window matters. The existing colors alone do
not explain that difference.

## Fix and regression coverage

Render Header directly instead of wrapping it in Reveal. Navigation is available
at full opacity immediately; no sleeps, retries, scan exclusions, color changes,
or rule suppressions are added to the quality harness.

The no-JavaScript browser regression checks the combined computed opacity of
navigation and all its ancestors, in addition to its real localized destination.
It failed before the fix with expected opacity 1, received 0. It now runs as a
smoke test in Chromium, Firefox and WebKit. Other legacy reveals and the broader
motion, no-JavaScript and manual release gates remain later work.

## Local verification

With pinned Node 22.23.4 and pnpm 10.20.0:

- The same throttled header-only reproduction passed 20 consecutive runs after
  removing the wrapper. The temporary diagnostic test was then removed.
- All 45 browser cases passed, including the no-JavaScript opacity regression in
  Chromium, Firefox and WebKit.
- The unchanged full-page axe audit passed ten consecutive runs with no rule
  exclusions. Its injected image-alt failure and diagnostic artifacts still work.
- All 76 unit/interface tests, production build, content validation, formatting,
  lint, strict types and dependency checks passed.

Verification results and exact-head hosted evidence are recorded in the delivery
issue. Implementation, PR checks, merge and production verification remain
separate gates; this record does not claim deployment or user acceptance.
