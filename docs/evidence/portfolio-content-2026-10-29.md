# Portfolio Content and locale-safe routing — 29 October 2026

Delivery: [Establish Portfolio Content and locale-safe routing](https://github.com/seancheong/seancheong.dev/issues/39).
Authority: the approved content architecture, evidence contract and later
[data-only module-seam decision](https://github.com/seancheong/seancheong.dev/issues/32#issuecomment-5092496371).

## Implementation

A single typed content interface resolves project/article facts, localized copy,
publication/evidence rules and case-study availability. A server-only explicit
MDX loader returns validated source/compiled data, without importing React or
returning JSX. The renderer remains the later journey module's responsibility.
No public case-study stub or future-locale route was introduced.

Existing permitted card facts/presentation are preserved. Cashush is retained as
withheld/unverified rather than republished, following the approved evidence
selection. Takonbini and selected article summaries remain drafts. Unapproved
project/article messages are also excluded from the client dictionary.

English is the only published locale. The routing configuration, parameter
checks and navigation wrappers derive from that registry. Unsupported locale
prefixes produce actual 404s without an English redirect or silent body fallback.
Canonical/hreflang/sitemap consumers can derive approved case-study locales and
parameters later; current published work parameters are empty.

Dependency rules enforce the content interface across alias and relative imports,
prevent rendering/fixture imports, and have negative probes. A blocking static CI
command validates registry invariants, dictionaries with a real ICU parser, and
all explicit MDX sources. The independent release-content mode also checks the
still-outstanding flagship/article approvals.

## Local verification

- 76 unit/interface/measurement/dependency tests pass, covering real queries,
  missing/invalid content, every evidence state, permission, duplicate registry
  entries, optional English links, future-locale promotion, ICU arguments/tags,
  server MDX loading and import enforcement.
- 43 Chromium/Firefox/WebKit cases pass, including valid English navigation,
  real no-redirect 404 responses, unavailable case-study routes and unchanged
  browser/viewport behavior. The hydrated homepage axe scan passes.
- Current content validation, formatting, lint, strict types, dependency checks
  and production build are exercised independently.
- `content:check --release` correctly exits 1 for the three unapproved selected
  article summaries and the required English Takonbini case study. This preserves
  the remaining authoring/release gates rather than treating drafts as ready.
- English metadata fields and existing permitted project copy/links are retained.
  The only intentional current content removal is the withheld Cashush card.

## Remaining gates

Hosted exact-head CI, artifacts and preview must be linked before implementation
verification is claimed complete. Keep the delivery issue and checklist entry
open until review, merge and main verification. Keep the planning map closed.

Final prose/media approval, case-study rendering, homepage/Articles composition,
future locale publication, full discoverability and existing numeric/manual release
gates remain separate. No new user acceptance, merge, production deployment,
performance improvement or complete Initial Portfolio Release is claimed here.

Next task: verify hosted checks and review the content/routing PR. After its
approved merge and main verification, proceed to the shared visual foundation
under the existing dependency sequence.
