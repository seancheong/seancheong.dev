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

The four existing permitted project cards retain their copy, links, image paths,
image treatment and grid classes. Cashush facts remain in the registry with
unverified permission and withheld publication, as required by [the selected-evidence decision](https://github.com/seancheong/seancheong.dev/issues/24).
Its card and client messages are excluded. No new visual system is introduced.

Takonbini remains draft content until the separate prose/media review. Its local
MDX file is an authoring outline, not a public stub. Selected article titles/URLs
are registered, but curated-note queries return no unapproved summaries. The
publication flags apply to portfolio content, not a blanket claim about a
project's performance, accessibility or security.

`getCaseStudyLocales` and `getPublishedWorkParams` derive only approved documents
intersected with published locales. Current work parameters are empty. Later
route/metadata/sitemap consumers use this source once their production routes
exist; content approval alone is not deployment or indexing evidence.

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

Case-study routes, final Takonbini prose, the homepage redesign, Articles UI,
full localized 404 design, and canonical/sitemap/social output remain their
separate delivery issues. Existing performance and manual release gates remain.
