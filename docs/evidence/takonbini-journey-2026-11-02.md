# Takonbini journey verification — 2 November 2026

Delivery [#43](https://github.com/seancheong/seancheong.dev/issues/43), branch
`codex/takonbini-journey`, based on merged `802f1b1`. Implementation is prepared for
review; no merge, production release or new user visual acceptance is claimed.

## Implemented behavior

The thin localized route resolves approved content through the Case Study journey,
returns real not-found results for invalid/unpublished locales and slugs, and
statically generates `/en/work/takonbini`. The emitted static HTML is checked by the build, including its hourly revalidation and absence of Home route scripts. Locale is set explicitly before server translation calls to avoid an implicit request-header bailout. The journey
owns rendered MDX, layout, disclosures, metadata inputs, media placement/loading
and tests; Portfolio Content owns narrative, media alternatives/captions and
availability. Only registered repository-local MDX enters compilation/evaluation.
No request-supplied path or remote MDX is executed. Section extraction uses real
Markdown headings, including a regression for heading-like text inside code fences.

The complete 217-word personal summary is server-visible. Native optional-depth
disclosures work without JavaScript and with keyboard/touch. Remaining work starts
open and a separate visible limitation note prevents closed depth from hiding the
outstanding acceptance work. Native links return to locale-aware Home/projects
and contact; the live product and public source destinations are explicitly named.
No new entrance animation, autoplay, focus trap, reading-progress UI or page
choreography is introduced.

Only approved M01–M04 are copied into public image assets. Original M05–M06 and
other retained authoring/project assets remain outside the new journey. Captions
retain their approved dated scope/measurement limits. Explicit image dimensions
reserve geometry; the lead source is 68,314 bytes. Every screenshot sits below the
complete brief and is lazy-loaded, so none is incorrectly prioritized over the
actual text LCP. A failed image has a geometry-preserving readable fallback; captions and
live-product recovery links remain available. Missing media inventory also leaves
the full narrative readable.

The Home entry uses the existing project surface, not the later Orbit rebuild.
It now reads the approved two-project featured selection (Takonbini and Script
Blender); the case study stays in the same tab. Other project data/code/assets are
retained without UI entry points. #44 still owns the accepted Orbit, Companion,
wordmark timeline and stacked Showcase implementation.

## Approval and publication boundary

Sean's [explicit prose and M01–M04 approval](https://github.com/seancheong/seancheong.dev/issues/42#issuecomment-6559956315)
is the content authority. The obsolete authoring-only banner is removed from the
rendered MDX; approved prose itself is unchanged. Project/document availability is
promoted on this implementation branch so the complete page can be reviewed. The
route emits `noindex, follow`; canonical/title/description/Open Graph inputs derive
from the approved project and locale, ready for #47's final discoverability work.
No future portfolio locale or new public case study is introduced.

This branch promotion is not permission to merge or publish immediately. Keep the
PR draft until readiness and visual/manual gates are resolved. The product's
catalog accessible-name finding, broader product acceptance and operational gates
remain open; the case-study prose discloses them. Passing portfolio-page axe does
not resolve the separate Takonbini product finding. Source authoring reports keep
their original draft checkpoint as history; explicit #42 approval and this delivery
record supersede those pending-approval statements only within their scope.

## Automated verification

Node 22.23.4 / pnpm 10.20.0 frozen offline install passes. Added only
`@types/mdast` 4.0.4 as a development type dependency; no new runtime package.

| Check                                                         | Result                                                                 |
| ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Content validation, TypeScript, formatting, zero-warning lint | Pass                                                                   |
| Dependency-direction checks                                   | Pass                                                                   |
| Unit/component/interface/route contracts                      | 94 pass                                                                |
| Production build                                              | Static case-study HTML; 106kB estimated first-load JS, 807B route      |
| Browser suite                                                 | 88 pass across Chromium, Firefox and WebKit; no assertion retries      |
| axe                                                           | Home, mobile navigation and all-open case-study depth: zero violations |

Contracts cover actual approved content, complete summary, hidden optional depth,
visible remaining work, native disclosures, invalid locales/slugs, metadata,
geometry/lazy loading, media failure/missing-media states and retained draft
fixture exclusion. Browser paths cover Home → case study → depth → contact,
keyboard, touch with normal motion, reduced-motion defaults, JavaScript-disabled
reading/disclosures, decoded images, five widths and project curation.

The first browser pass found an incorrect test assumption that a responsive
image's density-adjusted `naturalWidth` must equal its original 1440-pixel source.
The browser correctly selected responsive resources (reported widths 1100/412).
The final assertion verifies the explicit source geometry and successful image
decoding. No application image failure was suppressed. The final full suite passes
without retries. The media-wrapper alt attribute was made explicit to satisfy
zero-warning static accessibility checks.

Screenshots:

- [360px](takonbini-journey-2026-11-02/case-study-360.png)
- [390px](takonbini-journey-2026-11-02/case-study-390.png)
- [768px](takonbini-journey-2026-11-02/case-study-768.png)
- [1024px](takonbini-journey-2026-11-02/case-study-1024.png)
- [1440px](takonbini-journey-2026-11-02/case-study-1440.png)
- [Mobile depth after touch activation](takonbini-journey-2026-11-02/case-study-touch-chromium.png)

## Static-generation and bundle regression

The first audit exposed 237,937 measured Script bytes on the case study despite a
106kB build estimate. The initial static-output assertion also failed: next-intl
was reading the request locale from headers, so no case-study entry existed in
the actual prerender manifest. Explicit request locale/message loading now yields
real static output with 3600-second revalidation.

Client-reference inspection identified shared Motion and next-intl provider
references resolving through the Home route chunk. Motion now keeps its layout
policy/spotlight entry separate from page reveals, with behavior unchanged. An
owned client boundary around the locale provider keeps its RSC reference in the
layout bundle while preserving explicit locale/messages/server time zone. A new
build assertion fails if the case-study HTML loads the Home route's script. It
failed on the initial candidate and passes on the final emitted HTML. The ordinary
build now runs these checks, so this is tested output, not a bundle-size estimate.

Local Vercel Analytics previously requested an unavailable hosting-only endpoint
and logged a 404. It now renders only when Vercel provides that endpoint; Vercel
production/preview retain their analytics integration. Local audits do not hide
or suppress the console error, and real deployed transfer remains a separate
verification gate. Unknown slugs resolve through the content not-found result,
avoiding Next's internal NoFallbackError path from dynamicParams=false.

The route-wiring unit test mocks next-intl's server-only locale setter as a framework
boundary; the real compiler/static-output check and browser suite exercise it in
Next. No application behavior was replaced by the mock. [Initial failed performance
summary](takonbini-journey-2026-11-02/initial-lighthouse-summary.json) is retained.

## Font and media delivery

The measured text LCP led to inspection of the actual font requests: both local
WOFF files were preloaded, about 135kB including headers. Existing Geist Sans and
Mono are recompressed to WOFF2 with FontTools 4.60.2, without subsetting or glyph
edits. The sources remain for reproducibility. Source bytes fall from 134,132 to
112,472 combined. Only the body Sans is preloaded; Mono remains available on demand.
[Conversion recipe](takonbini-journey-2026-11-02/compress-fonts.py) and
[hashes/equivalence results](takonbini-journey-2026-11-02/font-compression.json)
record identical glyph order, character maps, horizontal metrics, variable axes,
and 4,824 matching glyph-outline comparisons at weights 100/400/900. No project
runtime dependency was added for this one-off conversion.

The actual LCP is summary text, not the lead screenshot (which is below the brief).
All screenshots are therefore lazy, without an inappropriate image preload
competing with critical text/fonts. The approved media itself is unchanged.
[Intermediate isolated-bundle report](takonbini-journey-2026-11-02/isolated-lighthouse-summary.json)
retains the 136,553-byte JS result and 2.781s mobile-LCP failure before these final
font/media changes. It is not a release pass or a production before/after claim.

## CSS delivery

The installed Next 15.4.10 framework's experimental `inlineCss` option includes
the generated CSS in the first response. Source styling remains in the same CSS
files and layers; no hand-maintained critical subset or new styling runtime is
introduced. The build compares the complete generated layout/journey CSS with
emitted HTML and rejects blocking stylesheet links. The final case HTML has one
inline style block containing both generated sources and no stylesheet link.
This experimental option and increased HTML bytes are explicit review tradeoffs,
not a universal production-performance guarantee. Browser navigation, native
no-JavaScript disclosures and responsive/keyboard behavior are rerun on this build.

[Font/media candidate samples before inlining](takonbini-journey-2026-11-02/fonts-lighthouse-summary.json)
preserve its remaining mobile-LCP miss. The trace identified the actual summary
paragraph as LCP and a separate blocking stylesheet request; this change tests
that delivery mechanism rather than removing or hiding primary content.

## Performance

Final collection retains three mobile and three desktop samples per route.
[All final samples and evaluator results](takonbini-journey-2026-11-02/lighthouse-summary.json).

| Route/profile                | Performance | Accessibility | Best Practices | SEO | LCP    | CLS | TBT  | Script transfer |
| ---------------------------- | ----------- | ------------- | -------------- | --- | ------ | --- | ---- | --------------- |
| /en / mobile                 | 94          | 100           | 100            | 91  | 3106ms | 0   | 53ms | 235,730 bytes   |
| /en / desktop                | 100         | 100           | 96             | 91  | 586ms  | 0   | 0ms  | 235,730 bytes   |
| /en/work/takonbini / mobile  | 98          | 100           | 100            | 66  | 2346ms | 0   | 27ms | 136,558 bytes   |
| /en/work/takonbini / desktop | 100         | 100           | 100            | 66  | 512ms  | 0   | 0ms  | 136,558 bytes   |

Case-study mobile LCP samples are 2727/2346/2260ms; the above-budget first
sample is retained. Desktop samples are 570/512/508ms. The approved median-based
case-study performance/LCP/CLS/TBT/JavaScript/media limits pass in this local
run; text is LCP, so LCP-media transfer is 0. No forced-cold, field-INP, deployed
global-performance or matched-baseline JavaScript growth pass is inferred.

Strict whole-site evaluation still exits 1. Home retains excess JS and its
mobile median LCP miss, plus SEO/desktop Best Practices debt. Case-study SEO is
66 because the deliberately unfinished/unlisted route emits noindex. Final
discoverability is #47 work; do not remove that safeguard just to improve an
audit score. The full release remains blocked, with all thresholds unchanged.
No failed original candidate or sample is discarded.

## Remaining gates and next task

- Sean's case-study visual approval remains required.
- VoiceOver/Safari, NVDA/Chrome, physical-device and manual zoom review are not
  inferred from browser engine emulation or axe.
- Product-readiness/finding disposition, final discoverability/SEO and strict
  performance/release acceptance remain open. No existing threshold is relaxed.
- Hosted latest-head checks, preview review, specific merge approval, merged-main
  verification and deployment smoke remain separate steps.

Next: review the complete case-study preview and close the remaining #43 gates.
The next planned implementation is #44's accepted homepage prototype, not a new
visual exploration or another foundation task.
