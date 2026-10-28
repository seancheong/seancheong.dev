# Automated quality harness — 28 October 2026

Delivery: [Establish the automated quality harness](https://github.com/seancheong/seancheong.dev/issues/38).
Authority: [approved quality gates](https://github.com/seancheong/seancheong.dev/issues/33#issuecomment-5092573697)
and [delivery backlog](https://github.com/seancheong/seancheong.dev/issues/35#issuecomment-5098298771).

## Implementation

Pinned Vitest/Testing Library, Playwright browsers, axe and Lighthouse establish
independent commands and diagnostic artifacts. Node remains major 22; its patch
pin advances to 22.23.4 to satisfy patched Lighthouse's runtime requirement.
Initial test-tool versions were replaced after their audit surfaced advisories;
those superseded measurements are not release evidence. The final harness audit
reports no advisories against Vitest, its mocker, Tinypool, Vite, Playwright,
Lighthouse, chrome-launcher or extract-zip. Existing application dependency
findings are separate; this is not a repository-wide security acceptance claim.

The browser suite has zero assertion retries. Performance collection preserves
three samples per route/profile, median scores and metrics, unchanged budgets,
actual selected LCP media transfer and JS transfer measurements. The strict release
command fails when budgets fail. Report-only harness CI is explicitly not release
acceptance; the manual workflow defaults to strict enforcement.

The hydrated homepage axe scan exposed invalid aria-selected attributes on
ordinary project links. Removing that decorative selection state restores native
link semantics; data-active still carries the visual state. The change has a
component regression test and an unfiltered hydrated axe scan. No design or
animation behavior was changed.

## Local verification and limits

- Unit/component and budget-evaluator contracts pass, including missing-metric,
  media-resource mapping and JS-growth rejection cases.
- Fourteen browser tests pass: Chromium's broader suite and smoke journeys in
  Firefox/WebKit, including the mobile keyboard menu and restored trigger focus.
- The hydrated homepage axe scan passes with no excluded rules.
- Unit, browser and axe probes each produce expected failures and their required
  JUnit/JSON/screenshot/trace artifacts. The Lighthouse probe rejects an injected
  above-budget LCP and retains its evaluated summary.
- Initial legacy Lighthouse collection demonstrates real remaining performance,
  JavaScript, SEO and additional audit failures. The new selected-media adapter
  and final CI reports are authoritative; old intermediate media measurements
  must not be used as release acceptance. Report generation is distinct from a
  passing strict release gate.
- No full screen-reader/device, motion, primary-content no-JavaScript, future
  feature, or portfolio release acceptance is claimed. See docs/quality.md for
  existing legacy limits and the required later coverage.

## Remaining gates

Hosted exact-head CI and artifact verification must be linked before implementation
completion. Merge, main CI, deployment and production acceptance remain separate.
Keep this delivery issue open until its applicable gates pass. Keep the planning
map closed; do not mark other delivery issues complete.

Next task: verify hosted harness checks and artifacts, then review this harness PR.
After its approved merge and verification, proceed through the existing dependency
sequence; Portfolio Content/routing and the shared visual shell are still open.
