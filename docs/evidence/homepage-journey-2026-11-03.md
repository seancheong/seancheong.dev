# Evidence-led homepage — 3 November 2026

Implements [#44](https://github.com/seancheong/seancheong.dev/issues/44) on top of
[case-study PR #56](https://github.com/seancheong/seancheong.dev/pull/56).
The base is `a1f43cc5b8743a5efd25e8c7c667bb2bd5dd1d39`. This is production
implementation prepared for review, not merge, deployment or release acceptance.
The pre-existing untracked CONTEXT.md is preserved and excluded from the change.

## Result and authority

The accepted direction in [#28](https://github.com/seancheong/seancheong.dev/issues/28)
is Orbit, Companion with selectable countries, native-color company wordmarks,
and stacked Showcase. [#29](https://github.com/seancheong/seancheong.dev/issues/29)
and [#31](https://github.com/seancheong/seancheong.dev/issues/31) keep the hierarchy:
introduction → professional leadership → Takonbini → detailed career timeline →
Script Blender → articles → contact. Prototype ordering and external case-study
links do not override this authority. No alternative prototype routes, pickers,
controls, frameworks or dependencies are promoted.

- `HomePage` and `loadHome` are the Home journey's page-level interfaces. The thin
  localized route validates the published locale, sets it explicitly, and generates
  real static output with hourly revalidation. Build checks read the prerender
  manifest and HTML, including the current role and internal case-study path.
- `getHomeContent` owns public career records, approved positioning and concise
  feature evidence. Five roles; Guidewire is Senior Consultant, Kuala Lumpur,
  April 2026–present; Woven ends April 2026. No Guidewire duties, client work or
  outcomes are invented. The source's legacy career consumer and Profile message
  also stop presenting Woven/Tokyo as current. Homepage wording still needs the
  explicit review required by #44; prototype design acceptance is not that approval.
- The portrait sits beside the introduction. Neutral name, violet controls,
  stationary project choices, and the selected project at the orbit center remain.
  Native radio controls change the project without JavaScript. Spin is opt-in;
  the decorative rings pause offscreen, in a hidden tab and for reduced motion.
- The Companion map follows career reading position and pauses synchronization
  while country details are open. Neighboring KL/Singapore coordinates are retained,
  with no decorative travel curves. Countries have native 44px summary controls and
  enhanced SVG targets. Escape/close restores the exact trigger's focus; outside
  pointer dismissal leaves the visitor's new focus alone. SVG keyboard focus uses
  a non-scaling shape stroke; pointer/long-press outlines are removed.
- Native country disclosures remain in document flow without JavaScript. Enhanced
  country details sit on the map. Every company, date and role remains in the
  server-rendered timeline. The decorative progress rail is reversible and uses
  transform only; reduced motion/no JavaScript shows the complete rail. Desktop
  map and date labels are sticky, with natural mobile order.
- Both projects use full-width screenshot/copy cards and dedicated named links.
  Takonbini is the primary internal case-study path. Personal project ownership
  is distinct from employed leadership, and product limitations remain explicit.
  Script Blender is a preview. Other project data/assets remain retained without
  Home entry points. Real screenshot dimensions reserve space and below-fold
  screenshots are lazy.
- Header identity returns Home; navigation is Experience, Projects, Articles,
  Contact. Anchors stay locale-aware, including retained #profile at leadership.
  The final contact entry uses LinkedIn/GitHub and a quieter résumé utility;
  #46 still owns the full contact conversion and copy-email behavior. No message
  form or AWS action enters the new Home dependency graph.
- Draft article summaries remain excluded by the existing content query. Home
  retains the Medium-profile entry; #45 owns the reviewed selections and Articles
  Hub. No draft article is silently promoted to fill the preview.

## Assets and source records

All source artwork is retained. No runtime map API or remote image dependency.

| Asset          | Source and treatment                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Portrait       | Existing `public/images/profile.jpeg`, 400×400; rendered at 72×72.                                                                                                                                                                                                                                                                                                                                                                              |
| Takonbini      | Exact approved M01 catalog image from PR #55/#56; 1440×1000. No new Takonbini media approval inferred.                                                                                                                                                                                                                                                                                                                                          |
| Script Blender | Real 1280×720 screenshot in the accepted 30 October selected-work exploration; converted to WebP with Sharp, quality 85, 12602 bytes. Empty editor/console are described accurately. Old PNG retained.                                                                                                                                                                                                                                          |
| Guidewire      | Official [dark-background SVG](https://www.guidewire.com/gw/brand/logo-white.svg), unchanged from the accepted prototype snapshot.                                                                                                                                                                                                                                                                                                              |
| Woven          | Official [footer PNG](https://woven.toyota/_next/static/media/footer-logo.1eljhlv5_ze8t.png), unchanged from the accepted snapshot.                                                                                                                                                                                                                                                                                                             |
| Asurion        | Official [dark-background SVG](https://images.ctfassets.net/16nm6vz43ids/3aERBdm1kNppmisZ0swoWs/fa5124603ce508cdccb51e3d9dd40bf3/icon-asurion-logo.svg), unchanged from the accepted snapshot.                                                                                                                                                                                                                                                  |
| Thermo Fisher  | Official [light footer SVG](https://corporate.thermofisher.com/content/dam/tfcorpsite/rebranding/Logo.svg), referenced by the corporate site's footer and downloaded unchanged. The prior red/black PNG's secondary lettering was illegible on dark; original PNG retained. No CSS filter or white badge.                                                                                                                                       |
| Fuji Xerox     | Existing native-red transparent PNG, unchanged.                                                                                                                                                                                                                                                                                                                                                                                                 |
| Map            | Natural Earth public-domain [land](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson) and [country boundaries](https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson), from the accepted map snapshot. Singapore uses a coordinate target at this resolution. Static SVG is server-owned and is not shipped as client geometry code. |

Durable prototype reference snapshots remain under the existing local
`2026/10/28/01a1826a-f536-7392-84fe-72658c94639d` visualization directory. They
are references, not production dependencies.

## Verification

Locked Node 22.23.4 / pnpm 10.20.0 and the project's pinned browser revisions.
98 unit/component/route/content tests pass. The final production build passes
its static-output regression checks. Content validation, dependency rules,
zero-warning lint, type checking and formatting are checked with the same pinned
toolchain. The ordinary content check passes; `content:check --release` still
correctly rejects all three draft article summaries. No article approval is inferred.

The first browser pass exposed stale partial-heading/navigation selectors and a
scroll fixture that had not placed the selected role in the reading band. Those
checks were corrected; the observer also ignores zero-area edge intersections.
Firefox's repeated same-URL navigation after a fragment, between viewport changes
in one test, stalled Playwright's navigation wait. The two anchor-offset cases now
use fresh page fixtures at 390 and 1024px, retaining both geometric assertions;
there are no retries or blanket timeout increases. The original failures remain
in local traces and this record; no product failure is silently counted as passing.

[Initial measurement](homepage-journey-2026-11-03/initial-lighthouse-summary.json)
passed Home's enforced medians but reported 164858 script-transfer bytes, above
its separate 160000-byte target. Static geography was then moved into a server
component passed through the interactive map boundary, preserving the same SVG
and behavior while avoiding client geometry code. No thresholds were changed.

The [server-map measurement](homepage-journey-2026-11-03/server-map-lighthouse-summary.json)
then reported 154114 JavaScript bytes, below the 160000 target, but mobile LCP
medians were 2630 ms Home and 2560 ms case study. The network-dependency trace
identified a late 57284-byte Geist Mono request, used only for the shell's two-glyph
`sc` utility. That monogram now uses a system monospace stack within its unchanged
reserved box; all main typography retains Geist Sans, and the Mono source/font
registration remains available for real technical content. No font is subsetted
or redrawn. Final measurement below includes this change on both routes.

## Final local verification

- **98** unit/component/route/content tests pass.
- **121** browser tests pass across Chromium, Firefox and WebKit, with no retries.
  Includes five viewport widths, keyboard, touch, normal/reduced motion and live
  preference changes, opt-in Orbit, Companion selection/focus/outside dismissal,
  progress reversal, no JavaScript, actual 404s, locale links and case-study/contact
  journeys. Compact 640px reflow is an automated proxy, not manual browser zoom.
- **Four axe audits, zero violations**: Home, mobile navigation, expanded case study
  and open country popup. [Axe summary](homepage-journey-2026-11-03/axe-summary.json).
- Content, lint, dependency, type, format, production build and static-output
  regression checks pass. Final screenshots at 360/390/768/1024/1440px, touch, and
  country popups in all three engines are in the adjacent evidence directory.
  Desktop and phone screenshots were visually inspected; no user approval inferred.
- [Final Lighthouse samples/medians](homepage-journey-2026-11-03/lighthouse-summary.json):
  three mobile and three desktop runs per route. Home passes all enforced metrics
  and the separate 160000-byte target. Home CLS is 0 mobile and 0.012 desktop. One Home mobile sample exceeds 2500ms and is
  retained. This is a local median result, not a field/global or cold-load guarantee.

| Route/profile     | Performance | Accessibility | Best practices | SEO | LCP ms | CLS                 | TBT ms | Script transfer bytes |
| ----------------- | ----------- | ------------- | -------------- | --- | ------ | ------------------- | ------ | --------------------- |
| home mobile       | 98          | 100           | 100            | 100 | 2333   | 0                   | 26     | 154114                |
| home desktop      | 100         | 100           | 100            | 100 | 545    | 0.01190534862679859 | 0      | 154114                |
| takonbini mobile  | 99          | 100           | 100            | 66  | 2269   | 0                   | 19     | 122979                |
| takonbini desktop | 100         | 100           | 100            | 66  | 510    | 0                   | 0      | 122979                |

No thresholds were relaxed. `node scripts/quality/check-report.mjs` exits **1**:
its only final failures are case-study SEO 66 versus 100 on both profiles,
consistent with the route's intentional noindex until #47. Collection success
is not strict whole-site release acceptance. `content:check --release` also exits
1 for the three article summaries awaiting review under #45. No new matched-baseline
JS-growth evaluation, manual acceptance, hosted CI or deployment is implied by
these local results. Full local Lighthouse JSON/HTML reports remain in
`artifacts/lighthouse`; all phase summary samples are committed here.

## Hosted Firefox feedback and deterministic no-JavaScript regression

The first [hosted quality run](https://github.com/seancheong/seancheong.dev/actions/runs/41566866537)
at `31eeaf7` passed unit, Chromium, WebKit, axe and report-only performance, but
Firefox failed two no-JavaScript cases while waiting for `page.goto`'s full `load`
event. Both downloaded traces show the document returned 200 and the entire Home
content/country controls rendered. Requests for the lazy 640px Takonbini preview
and 256px Woven logo remained unfinished. The
[redacted trace summary](homepage-journey-2026-11-03/firefox-no-js-trace-summary.json)
records those exact pending resources; no authenticated request data is published.

Five local repeats of the original two cases passed, so retrying until green
would not explain the problem. A controlled pending-image fixture reproduced the
same wait deterministically with:

```
pnpm test:browser --project firefox --grep 'server content and native' --timeout 4000
```

That command failed at `page.goto(... waiting until load)` while the screenshot
and accessibility snapshot already contained the current role and country controls.
The content-readiness contract now uses `DOMContentLoaded` for those two
no-JavaScript navigations, retaining every native interaction/content assertion.
A separate pending-image test proves server text/career records exist while images
remain in flight and releases its controlled requests during cleanup. Full native
interaction tests use real media requests, and independent decoding tests scroll
to and verify all eight portrait/showcase/timeline images with JavaScript both on
and off in all three engines. This avoids making a synthetic blocked request
stall WebKit's interaction/teardown while still locking down the original failure.
The cross-route case-study → contact check likewise waits for DOM readiness and
asserts contact visibility, instead of gating its URL assertion on unrelated
resource completion. No retry or blanket timeout increase was introduced.

Only tests and evidence changed after `31eeaf7`; production source/media/build
inputs are identical, so its final Lighthouse/axe/build measurements remain the
application measurements. The expanded final local suite has 121 browser checks;
hosted follow-up validation is recorded in #44 and the canonical tracker.

## Dark homepage preview refinement — 3 November 2026

Sean requested a dark-theme Takonbini preview in this chat. A fresh real capture
of the same English 7-Eleven-filtered catalog replaces the homepage cover. The
browser used dark OS color scheme with the product's System setting; the live
root's dark class and settled loaded product images were verified before capture.
The 1440×1000 WebP is 81014 bytes. Its updated alt describes the dark catalog,
selected chain and visible product cards. Source URL, date and hash are in
[the capture record](homepage-journey-2026-11-03/dark-preview-media.json).

Production build (including lint/type/static-output checks), content validation,
formatting and eight targeted browser checks pass. The targeted checks cover
390/1440px reflow and real image decoding with JavaScript on/off in Chromium,
Firefox and WebKit. [Rendered preview](homepage-journey-2026-11-03/home-dark-preview-desktop.png)
was inspected in the local production build.

This is a new capture of current listings, not a recoloring of M01. The original
approved case-study M01–M04 remain their original evidence; this request authorizes
the dark homepage preview, not blanket approval of the final homepage or release.
The earlier numeric performance/hosted measurements above belong to their stated
commits; they are not remeasured or relabeled as exact results for this refinement.

## APAC map refinement — 3 November 2026

Sean requested the map focus on APAC rather than the world. The existing Natural
Earth SVG now frames roughly 62°E–182°E and 64°N–50°S, covering India, East/Southeast
Asia, Australia and New Zealand. Overflow is clipped to that regional viewport;
the accessible map label names Asia-Pacific. Projection, real career coordinates,
country selectors, company popups and Companion synchronization are retained.

The map is capped at 320px high. Sticky companionship applies on wide screens at
least 880px high; shorter desktop screens use normal flow to keep the complete
panel reachable. Inspection at 1440×900, 390×844 and 1440×720 found no horizontal
overflow; the desktop panel is sticky at 900px and static at 720px. The measured
panel height is about 652px in those checks. [Desktop capture](homepage-journey-2026-11-03/apac-map-desktop.png)
and [phone capture](homepage-journey-2026-11-03/apac-map-mobile.png) were inspected.

Production build (including lint/type/static-output checks), 14 targeted browser
checks across Chromium/Firefox/WebKit and four zero-violation axe audits pass.
Country activation, focus return, outside dismissal, Companion reading position,
touch and all five required widths remain covered. This is the user-authorized
regional framing refinement, not final acceptance of all homepage copy/design or
release/manual gates. Earlier whole-world captures and numeric performance/hosted
results remain historical evidence for their stated revisions.

## Closer career-location framing — 3 November 2026

Sean's screenshot feedback requested more zoom because the broad APAC framing
looked visually weak. The map now frames 90°E–156°E and 48°N–10°S, making Japan,
Malaysia and Singapore approximately twice as large at the existing panel height.
The background dot stroke is reduced from .85 to .5 SVG units to keep it quiet
at the larger scale. This closer East/Southeast Asia view supersedes the broader
APAC extent as the current framing; the preceding captures remain historical.

[Desktop](homepage-journey-2026-11-03/apac-map-zoom-desktop.png) and
[phone](homepage-journey-2026-11-03/apac-map-zoom-mobile.png) captures were inspected.
Production build including lint/type/static-output checks, formatting, all 14
targeted map/browser checks and four zero-violation axe audits pass. Country
geometry, actual marker coordinates, controls, popups, focus and synchronization
are retained. The local production preview was rebuilt and restarted. No final
user visual acceptance, new whole-site performance result, merge or production
verification is inferred from this refinement.

## Remaining acceptance gates

- Sean's explicit final homepage positioning, leadership, timeline summaries,
  Script Blender/Takonbini copy and rendered visual approval under #44.
- VoiceOver/Safari, NVDA/Chrome, physical-device and manual zoom checks. Browser
  engines, touch emulation and compact reflow do not certify those checks.
- #43 / PR #56 acceptance and merge prerequisite; its product-readiness/finding
  disposition remains open. This task does not fix Takonbini product #27's catalog
  accessible-name finding or certify product operational/performance readiness.
- Reviewed article selection/hub (#45), full contact conversion (#46),
  discoverability (#47), and strict release/manual gates (#48) remain separate.
- Hosted checks, preview verification, merge and production verification must be
  recorded separately. No deployment or user acceptance is inferred from local
  tests or a successful hosting status.

#44 remains open and unchecked. Next: review this concrete homepage implementation,
finish its acceptance gates and prerequisite; the next planned delivery task is
#45's Articles Hub and reviewed summaries, followed by #46's contact conversion.
