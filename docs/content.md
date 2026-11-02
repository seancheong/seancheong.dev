# Portfolio Content and locale availability

Portfolio Content owns the locale-neutral project/article registry, short JSON
messages, publication policy, and local case-study source loading. It returns data;
journey modules own rendering. This follows the later [module-seam decision](https://github.com/seancheong/seancheong.dev/issues/32#issuecomment-5092496371),
including its restriction against React, routes, or journey imports in content.

## Interface

| Entry                         | Purpose                                                                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `@/portfolio-content`         | Published projects, featured projects, curated notes, localized messages/site metadata, case-study locale availability, and work parameters |
| `@/portfolio-content/locales` | Small shared published/planned locale registry and guards, usable by middleware and client navigation                                       |
| `@/portfolio-content/server`  | Server-only MDX loading/compilation and complete content validation                                                                         |

Queries return `found`, `not-found`, or `invalid` results. Case-study queries can
also return `unavailable` with an explicit English link and localized label, when
English is approved but an optional translation is missing in another published
locale. They never substitute an English body for a requested translated body.
The locale in that link is already explicit; use its href as a native/Next link,
or pass English explicitly when using the locale-aware navigation wrapper.

`createPortfolioContent` and `createCaseStudyContent` expose the same interfaces
for authoring validation and isolated fixtures. Tests do not read private registry
files. App consumers cannot import internal model/registry paths: dependency checks
cover aliases, relative imports, re-exports and dynamic imports. Content cannot
import rendering modules, and production code cannot import test fixtures.

## Three content owners within the module

- `registry.ts` keeps stable slugs, URLs, asset paths, order, placement, publication
  permission, evidence states, selected article facts and document approval.
- `messages/en.json` keeps short UI, project-summary, alt-text and SEO strings.
  `next-intl` obtains published messages through the content interface. Draft and
  withheld project/article copy is removed before messages reach the client.
- `content/case-studies/<slug>/<locale>.mdx` keeps long-form narrative. An explicit
  server loader maps each document ID to its local source. No route constructs a
  filesystem path, and no remote content is fetched or evaluated.

The MDX compiler returns source and compiled JavaScript **strings**, never JSX or
a React component. The later case-study journey owns trusted MDX rendering and
its approved component mapping. `server-only` prevents a client import; the module's
small package.json marks its native ESM compiler integration for the authoring CLI.
Next.js traces the local MDX files for server deployment.

## Current publication state

English is the only published locale. Japanese (`ja`) and Simplified Chinese
(`zh-Hans`) are planned identifiers, with fixtures only in tests. Adding a message
file does not publish a locale. Promotion also requires complete ICU/key parity,
required flagship documents, publication review, and the explicit locale-registry
change. Fixtures are structural examples, not complete reviewed translations.

The implementation branch exposes only Takonbini and Script Blender through
`getFeaturedProjects`. Other project records and assets remain retained; Cashush
remains withheld with unverified permission. This is the approved two-project
curation, not deletion of the archive or a new permission grant.

Sean explicitly approved the exact Takonbini prose and media M01–M04 in
[#42](https://github.com/seancheong/seancheong.dev/issues/42#issuecomment-6559956315).
The case-study implementation branch promotes those records and copies only the
approved media into public assets so its preview can be reviewed. The route is
`noindex`; the PR remains draft pending product-readiness, visual/manual review
and the other delivery gates. Do not merge/promote it as if all those gates passed.
Selected article queries still exclude unapproved summaries.

`getCaseStudyLocales` and `getPublishedWorkParams` derive approved documents
intersected with published locales. English Takonbini is the sole work parameter.
The route validates availability through the Case Study journey and generates
static HTML. Later metadata/sitemap work must use the same availability registry.
Content approval, route implementation, merge, deployment, indexing and release
acceptance remain distinct.

Portfolio Content parses real top-level Markdown headings into compiled Summary
and depth sections. Code-fence headings do not create sections. The journey owns
the trusted-local-MDX renderer and native disclosures; content still returns data
and compiled strings, never React components. Only explicitly registered local
sources enter the compiler/renderer. Media alt text, captions and dimensions live
in Portfolio Content; the journey controls their placement and loading behavior.

## Validation and authoring

Run `pnpm content:check` after an edit. It checks registry shape, duplicate slugs,
ordering/document IDs, permission/evidence constraints, required strings, exact
message-key parity, ICU argument/rich-text-tag parity, and every explicit MDX
loader, including drafts. Invalid URLs, missing files/loaders, malformed MDX and
unregistered loaders fail validation. Measured, Learned and Planned are distinct
from Shipped; planned-only evidence cannot substantiate public work. Actual
claim truthfulness and publication permission still require human review.

Run `pnpm content:check --release` before the Initial Portfolio Release. It also
requires the flagship document and selected article summaries to be approved.
It currently fails intentionally because those delivery tasks remain open. The
manual quality workflow includes this independent release-content gate whenever
strict release enforcement is selected. Current build validity is not launch
readiness; no release requirement is waived.

To add or translate a document:

1. Add/update its locale-neutral record and short JSON messages.
2. Register a draft document and explicit local source loader.
3. Run content, unit/interface, dependency and production-build checks.
4. Obtain the prose/media/permission approval required by the delivery issue.
5. Mark approved content only after review. Publish a future locale only after
   its complete UI and required flagship content are reviewed and validated.
6. Let the journey and discoverability adapters expose only actual available
   routes. Do not add placeholder case-study pages or fictional outcomes.

## Routing

The layout and request configuration reject unsupported locale parameters.
Middleware negotiates only `/` and recognizes published locale prefixes; unknown
prefixes continue to Next's actual not-found handling, without an English rewrite.
Navigation uses the same published-locale registry and explicit home anchors.
English is not inferred from a cookie at `/ja`, `/zh-Hans` or another invalid URL.
Automatic middleware alternate links are disabled; the later discoverability
work emits alternates from real content availability.

The homepage redesign, Articles UI,
full localized 404 design, and canonical/sitemap/social output remain their
separate delivery issues. Existing performance and manual release gates remain.
