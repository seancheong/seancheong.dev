# Portfolio quality harness

Use the pinned Node 22 patch in `.node-version`, pnpm 10.20.0, and a frozen install.
Playwright's exact package version also fixes its browser revisions. Install them
with `pnpm exec playwright install --with-deps chromium firefox webkit`.

## Commands

- `pnpm test:unit`: Vitest/Testing Library contracts; JUnit in `artifacts/unit`.
- `pnpm build`: build the application before browser or measurement commands.
- `pnpm test:browser`: Chromium's broader suite plus Firefox/WebKit smoke journeys.
- `pnpm test:axe`: independent hydrated WCAG A/AA scan with JSON attachments.
- `pnpm test:performance`: three mobile and three desktop Lighthouse runs per
  registered route; writes all HTML/JSON reports and median evaluations.
  This measures and reports budget failures; a zero exit means collection
  succeeded, not that release budgets passed.
- `pnpm test:release`: repeats measurement and exits nonzero for budget failures.
- `node scripts/quality/check-report.mjs`: enforce the previously collected report
  without repeating measurement.
- `pnpm test:probes unit browser axe lighthouse`: intentionally fail each harness
  and verify the expected nonzero exit plus useful artifacts. Collect Lighthouse
  reports first. These are separate negative tests, never retries of real failures.

Browser and Lighthouse commands own separate local production servers. They refuse
an existing browser server. Run performance collection without concurrent browser
or build activity when using numbers for comparisons. Each command cleans up its
owned server/browser. Browser assertion retries are zero.

## CI and artifacts

`Portfolio Quality` runs unit/component contracts, all three browser engines, an
independent axe audit, and performance collection on pull requests and main pushes.
Each category demonstrates intentional failure reporting after its real checks.
Artifacts upload even when a check fails, with 14-day retention. Browser failures
retain traces/screenshots and HTML reports; axe includes its full JSON. Unit
failures retain JUnit; Lighthouse retains every sample, server log and summary.
Only package/browser downloads are cached, never build or test correctness outputs.

The manual `Portfolio Quality` workflow defaults to **enforcing release budgets**.
Run it at the exact candidate revision before production promotion. Ordinary
harness CI reports legacy performance debt; it does not certify release readiness.
No numeric budget is relaxed and no failed release audit is waived. A future
release remains blocked until the strict command and all manual gates pass.

Require the unit, three browser, and axe job names through repository protection
when adopting this harness; existing administrator policy and review requirements
are preserved by this change. Release performance is a separate candidate gate.

## Measurement contract

`routes.json` explicitly lists current public routes under test. Extend it as
Takonbini and Articles production routes land; do not add prototype routes.
`budgets.json` preserves the approved mobile/desktop scores, LCP, CLS, TBT, first-load
JavaScript and optimized LCP-media limits. Every metric uses all three samples and
its median. Missing/nonfinite measurements fail collection, never count as zero.
Lighthouse uses its pinned default simulated mobile profile and pinned desktop
configuration, not the user's hardware defaults. All samples and their effective
Lighthouse settings are retained.

First-load JS is the sum of measured Script transfer bytes during navigation
(including headers/third-party scripts), not raw bundle bytes or Next's rounded
build output. LCP media is the measured transfer of the actual browser-selected
image resource; text LCP has no media transfer. A missing image measurement fails
collection. These definitions are fixed for subsequent comparisons.

Set `QUALITY_BASELINE_REPORT=/path/to/reviewed/summary.json` when comparing with a
previous run using the same profiles/toolchain/host. More than 10,000 bytes of JS
growth adds a review failure even below the hard 180,000-byte limit. Document the
review and resulting baseline in the delivery issue. The 160,000-byte Home target
is reported separately from the hard limit. Without a supplied baseline the report
explicitly requires manual growth review; it does not claim a regression pass.

## Coverage and boundaries

The current real homepage proves browser navigation, mobile keyboard menu/focus,
five viewport widths, aggregate overflow checks, reduced-motion navigation, and
server navigation markup without JavaScript. Future Japanese/Chinese strings are
injected only as test fixtures; they are not published locales. This is not a full
responsive, motion, no-JavaScript visibility or screen-reader acceptance audit.
Legacy reveal animations can still hide content without JavaScript; replacing them
remains part of the approved motion/homepage work.

The current route's axe scan has no rule exclusions or baseline suppressions.
Automated axe and Lighthouse accessibility scores cover different audit sets and
states; neither replaces manual checks. A small existing invalid `aria-selected`
on decorative project links was removed with a regression test to unblock axe.

Button contracts prove native keyboard, disabled, and composed-link behavior.
Portfolio Content, journey and Portfolio Motion tests must target their public
interfaces as those modules land. Missing/invalid slugs, metadata, copy-email,
Home → Takonbini depth, Home → article, Home → contact, LCP/lazy-media behavior,
and complete no-JavaScript/reduced-motion acceptance extend this harness later.
Do not invent passing tests for features that are not implemented.

Manual keyboard, zoom, contrast, VoiceOver/NVDA, real Safari/iOS/Android, content,
privacy and rollback reviews remain required by the release checklist.

## References

- [Approved quality gates](https://github.com/seancheong/seancheong.dev/issues/33#issuecomment-5092573697)
- [Playwright production web server](https://playwright.dev/docs/test-webserver)
- [Playwright traces](https://playwright.dev/docs/trace-viewer)
- [Vitest report files](https://vitest.dev/config/outputfile)
- [Lighthouse emulation](https://github.com/GoogleChrome/lighthouse/blob/main/docs/emulation.md)
