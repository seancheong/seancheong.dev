# Takonbini authoring review

Prepared 1 November 2026 for portfolio [#42](https://github.com/seancheong/seancheong.dev/issues/42).
Status: review draft, not approved for publication. The project and English
case-study document remain `draft` in Portfolio Content. No public route, media
URL or locale is promoted by this work.

## Editorial direction

The opening comes from Sean's account in this chat: while living in Japan, he
wanted to know what was new that week at the Lawson near his home. He liked the
food and its price, and built a personal project to solve that problem. Helping
konbini fans around the world is his ambition; there are no measured audience or
business outcomes. This is Personal Project Ownership, with no team-leadership
claim. His statement establishes motivation, not approval of this final draft.

The [English narrative](../../content/case-studies/takonbini/en.mdx) has a complete
summary followed by optional decision, outcome, reflection and remaining-work
sections. Summary reading time is an estimate at ordinary reading speed, not a
measured hiring-manager result. Technical vocabulary stays in the depth sections
where possible. Reflection wording is proposed for Sean's review, not a quotation.

## Readiness and source authority

The old [external readiness prerequisite](https://github.com/seancheong/seancheong.dev/issues/42#issuecomment-5098328968)
requires a real catalog, the intended refactor, verified deployment and fresh
publication-safe evidence before final authoring/closure. July's empty catalog is
historical: fresh 1 November captures contain real products and loaded detail.
Public web main is `6d9e63e78fd8cd77449214773dbbd65fcb3f8889`; its recorded production
release and 256-test verification are in [the implementation tracker](https://github.com/seancheong/takonbini-web/issues/17).

The outstanding recovery workflow now reports successful execution, including
its final full-scraper/persistence-verification step. Only that sanitized result
belongs in public review. Private source, raw logs, run identifiers and retailer
payloads are excluded. This does not prove real-time retailer inventory, translation
quality, count/cost explanations, alert delivery or a completed stability window.

The product tracker remains open for acceptance and operational work. The new
catalog accessible-name finding also needs manual review and disposition. Accordingly, this package
is a draft and evidence review, not a declaration that every product-readiness or
publication gate has passed. Sean's final publication approval is still required.

`architecture.md` and `CONTEXT.md` in the product repository contain superseded
local-scheduler, immutable-generation and future-virtualization descriptions. They
are not current implementation authority. Use the dated released code and
measurements below. Do not describe DynamoDB migration, atomic catalog publication,
local scheduling, guaranteed freshness, cost savings or perfect translations as
shipped capabilities.

## Evidence-to-claim review

Every material claim in the draft is mapped here. Shipped means implementation
exists; Measured means a bounded observation; Learned means a proposed reflection;
Planned means unfinished work or ambition. None implies final release acceptance.

| ID  | Claim                                                                                             | Class                       | Evidence and limit                                                                                                                                                                                                                                                                                                                                                                                               | Review                              |
| --- | ------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| C01 | Lawson-near-home motivation; inexpensive food and something new to try                            | Learned / personal account  | Sean's 1 November statement in this chat. Confirmed motivation, not invented research.                                                                                                                                                                                                                                                                                                                           | Confirm final wording               |
| C02 | Personal project, solving Sean's own problem                                                      | Shipped / ownership account | Sean's statement and public project. No employed-work or team-leadership claim.                                                                                                                                                                                                                                                                                                                                  | Confirm scope/wording               |
| C03 | Three stores; English/Japanese/Traditional Chinese interfaces                                     | Shipped                     | [Live catalog](https://takonbini.com/?lang=en), fresh locale headings and captures. No exhaustive translation-quality claim.                                                                                                                                                                                                                                                                                     | Supported within scope              |
| C04 | Search and store/category/region/price controls                                                   | Shipped                     | Live filter panel and settled 7-Eleven selection; not every filter combination independently exercised here.                                                                                                                                                                                                                                                                                                     | Supported; full acceptance separate |
| C05 | Loaded product dialog; Escape returns link focus; direct URL                                      | Measured                    | [Browser summary](takonbini-authoring-2026-11-01/browser-summary.json), one real product in Chromium. No all-browser or screen-reader inference.                                                                                                                                                                                                                                                                 | Supported within scope              |
| C06 | Five resident pages, 20 products/page, virtualized rows and cursor recovery                       | Shipped                     | [Released window coordinator](https://github.com/seancheong/takonbini-web/blob/6d9e63e78fd8cd77449214773dbbd65fcb3f8889/src/features/products/catalog/catalog-window.ts) and [recorded alternatives](https://github.com/seancheong/takonbini-web/blob/6d9e63e78fd8cd77449214773dbbd65fcb3f8889/docs/plans/catalog-infinite-scroll.md). Focus/detail exceptions and bounded fallback remain part of the contract. | Supported                           |
| C07 | At most 100 resident products/21 mounted links across 96 samples; 0.125px deep-reload difference  | Measured                    | [25 October fixture report](https://github.com/seancheong/takonbini-web/blob/6d9e63e78fd8cd77449214773dbbd65fcb3f8889/docs/evidence/catalog-memory-2026-10-25.md). Synthetic traversal up to 1,100 encountered products; not a current production or whole-browser-memory guarantee.                                                                                                                             | Supported with method/date          |
| C08 | Focus restoration waits for the catalog to stop being inert                                       | Shipped                     | [Diagnosis and regression evidence](https://github.com/seancheong/takonbini-web/blob/6d9e63e78fd8cd77449214773dbbd65fcb3f8889/docs/evidence/catalog-history-focus-2026-10-22.md). Body-focus failure was reproduced; current sampled Escape return passes.                                                                                                                                                       | Supported                           |
| C09 | Complete inline CSS; request-scoped SSR seed retained separately from browser eviction            | Shipped                     | [Released rendering evidence](https://github.com/seancheong/takonbini-web/blob/6d9e63e78fd8cd77449214773dbbd65fcb3f8889/docs/evidence/homepage-rendering-2026-10-26.md) plus #17 production checkpoint. Experimental framework option and output checks are explicit tradeoffs.                                                                                                                                  | Supported                           |
| C10 | Local LCP 1.505/1.506s versus 0.705/0.706s; HTML +9,958 compressed bytes                          | Measured                    | Same rendering report: two alternating samples per condition, frozen public HTML/data/assets, local mirror, mobile emulation/CPU/Slow 4G. No production speedup, field INP, causal business impact or global claim.                                                                                                                                                                                              | Supported only with limits          |
| C11 | Fresh six-sample live lab results, with one mobile LCP above 2.5s                                 | Measured                    | [All fresh samples](takonbini-authoring-2026-11-01/performance-samples.json). Lighthouse 13.5.0 simulated profiles, sequential runs, no matched baseline or forced cold state.                                                                                                                                                                                                                                   | Supported; not release pass         |
| C12 | Catalog scan reports an accessible-name finding; dialog/filter scans report zero violations       | Measured                    | [Fresh axe summary](takonbini-authoring-2026-11-01/accessibility-summary.json). Catalog rule `label-content-name-mismatch`, serious, 12 mounted nodes; incomplete checks remain. No WCAG-conformance claim.                                                                                                                                                                                                      | Finding open                        |
| C13 | Product identity is a better restoration anchor than raw scrollY; diagnose the actual LCP element | Learned                     | Proposed reflections grounded in C06-C10. Not a universal finding or quotation supplied by Sean.                                                                                                                                                                                                                                                                                                                 | Sean review required                |
| C14 | Help konbini fans around the world                                                                | Planned / ambition          | Sean's stated hope. No adoption, conversion, user-research or revenue metric.                                                                                                                                                                                                                                                                                                                                    | Keep aspirational                   |
| C15 | Reliability/cost/field interaction/stability and broader device/manual checks remain open         | Planned                     | Current [product tracker #17](https://github.com/seancheong/takonbini-web/issues/17) and acceptance issues. No current gate is silently waived.                                                                                                                                                                                                                                                                  | Preserve gates                      |

## Fresh measurement notes

Captures and audits used pinned Playwright Chromium 156.0.8078.4. English desktop
1440×1000, mobile 390×844 and Japanese 768×1000 captures are real production UI.
Traditional Chinese was checked through its loaded heading. The catalog's status
reported 20 reached results while virtualization mounted 12 links in the initial
sample; these are different counts. No empty-catalog or invented-product image is
used. The first attempted detail capture was a loading placeholder and was replaced.
A transient store-filter loading capture was also replaced by a settled
all-7-Eleven result capture. A temporary URL assertion expected an unencoded store
value; the site's JSON-encoded filter contract was correct. No product bug follows
from that capture-script mismatch.

Three axe 4.14.0 scans used WCAG 2 A/AA, 2.1 A/AA and 2.2 AA tags. Catalog: one
serious rule affecting 12 links, two incomplete checks. Loaded detail: zero
violations, one incomplete. Mobile filters: zero violations, one incomplete. No
rules excluded or finding suppressed. Lighthouse initial-navigation accessibility
100 samples do not exercise the same hydrated states/rule set and do not negate
the axe finding. Manual assistive-technology verification remains outstanding.

Live Lighthouse samples were collected sequentially after the capture/audit pass
completed, using the installed Lighthouse 13.5.0 default simulated mobile and
desktop profiles. Full reports remain local; the sanitized numeric samples are
committed. No source, configuration, production data, refresh schedule, indexing
request or telemetry was changed by these checks.

| Metric                  | Mobile runs                 | Desktop runs                |
| ----------------------- | --------------------------- | --------------------------- |
| Performance             | 92 / 100 / 100              | 100 / 100 / 100             |
| LCP (seconds)           | 2.571 / 1.400 / 1.387       | 0.693 / 0.568 / 0.579       |
| CLS                     | 0 / 0 / 0                   | 0 / 0 / 0                   |
| TBT (ms)                | 63 / 11.5 / 13              | 0 / 0 / 0                   |
| Script transfer (bytes) | 248,449 / 248,473 / 248,525 | 248,476 / 248,522 / 248,484 |

LCP medians are 1.400s mobile and 0.579s desktop. One original mobile sample exceeds
2.5s; it is retained, not retried away. TBT is not field INP. No CrUX or field data
was collected here. The product's adopted applied-throttling acceptance method is
separate, so these samples do not close #27/#102 or compare directly with earlier
remote PageSpeed, local CSS-mirror, or applied-throttling results. Portfolio-page
budgets will be measured on the future #43 route, not inferred from the product.

## Candidate media inventory

See [media inventory](takonbini-authoring-2026-11-01/media-inventory.md) for the
selected four and supporting two captures, exact dimensions/bytes/hashes, purpose,
alt text, caption and publication-review status. Files are outside `public/` and
are not wired into a production route. Original PNGs and raw audits remain in the
chat's local evidence artifacts; no private account UI or operational logs are
included. No image is invented or an old prototype schematic.

## Publication review

- [x] Personal motivation supplied by Sean and separated from ambition.
- [x] Claims mapped to Shipped, Measured, Learned or Planned with source limits.
- [x] Current real catalog, responsive/detail media, scoped axe and performance evidence captured.
- [x] No confidential employer work, credentials, private API source/logs, raw retailer dataset or unsupported business metric included.
- [x] Experimental CSS option, synthetic versus live results and remaining gates disclosed.
- [ ] Sean approves final prose, ownership wording and proposed reflections.
- [ ] Sean approves the exact selected media/captions and confirms permission to reproduce retailer images/branding in the portfolio context. Public availability alone is not recorded as permission.
- [ ] Resolve or explicitly decide publication treatment of the live catalog accessible-name finding; preserve product acceptance gates.
- [ ] Complete the external product-readiness review required by the existing #42 prerequisite. Current operational/full release gates are not inferred complete.
- [ ] Record explicit final publication approval in #42 before changing document/project publication flags.

## Authoring validation

Node 22.23.4 / pnpm 10.20.0: ordinary content validation, Prettier,
zero-warning ESLint, dependency rules, 85 unit/component tests and production
build pass. The case-study interface tests prove that the registered draft MDX
compiles while public queries still return not-found. No test was weakened and no
new route or media-serving behavior was added. Full portfolio browser/performance
reruns belong to the later route implementation; the live-product observations
above are separate evidence, not portfolio-route tests. The release-content gate
remains intentionally blocked by unapproved flagship/article content.

## Next task

Sean reviews this concrete narrative and selected-media inventory. Resolve the
catalog accessible-name finding in the product's acceptance workflow and finish
the prerequisite/readiness disposition. Keep #42 open and both publication flags
draft until the required approval is recorded. #43's case-study route, visual
approval and release validation remain separate work.
