# Localized case-study content architecture

## Decision summary

Adopt a **three-part, local-content architecture**:

1. Keep short interface, project-summary, accessibility, and SEO strings in `next-intl` JSON dictionaries.
2. Keep locale-neutral project facts in one typed TypeScript registry.
3. Keep each long-form case study in a locale-specific local MDX file, loaded through an explicit typed loader registry.

Publish only locales that pass validation. Start with `en`; keep `ja` and `zh-Hans` as planned locales until their UI dictionaries and required flagship case study are complete. Do not silently render English prose at a Japanese or Simplified Chinese URL. When an optional case study is not translated, show an explicit “available in English” link to its canonical English route or omit that case-study link from the localized page.

This is the smallest durable seam because each kind of content has one owner, no CMS or content framework is introduced, and the route/page layer consumes a single `work` module instead of knowing file locations or translation storage.

## Repository findings

The repository already has the right base routing shape:

- It uses the App Router under [`src/app/[locale]`](../../src/app/%5Blocale%5D), with `next-intl` configured in [`src/i18n/routing.ts`](../../src/i18n/routing.ts) and [`src/i18n/request.ts`](../../src/i18n/request.ts).
- Only `en` is currently published, and the middleware matcher is hard-coded to `/` and `/en` in [`src/middleware.ts`](../../src/middleware.ts).
- All translated content currently lives in one [`messages/en.json`](../../messages/en.json), including project titles and descriptions.
- Locale-neutral project facts—image, URL, layout class, and ordering—are currently embedded in the rendering component [`Projects.tsx`](../../src/app/%5Blocale%5D/components/Projects.tsx), so they cannot yet be reused safely by case-study routes, metadata, sitemaps, or tests.
- The locale is accepted as a general `string` in the layout, validation uses a manual cast to `'en'`, and the project does not augment `next-intl`'s `Locale` or `Messages` types.
- The current layout has global metadata only. Case-study titles, descriptions, canonical URLs, language alternates, and per-project Open Graph data therefore have no owner yet.
- The project pins Next.js `15.4.10` and `next-intl` `4.1.0` in [`package.json`](../../package.json). It does not currently install the MDX integration packages.

These are seams to improve, not reasons to replace `next-intl`.

## Options considered

| Option | Strengths | Costs and risks | Verdict |
| --- | --- | --- | --- |
| Put UI, metadata, and full case studies in `next-intl` JSON | One loading mechanism; ICU syntax; translator-friendly dictionaries | Long prose becomes escaped JSON; weak document structure; interactive examples and rich layout require awkward rich-text keys; large documents are difficult to review and diff | Reject for case-study bodies; retain for short strings |
| Put all project data and prose in MDX exports/frontmatter | One file per translated story; good authoring experience; content can embed components | Locale-neutral data is duplicated across translations; MDX named exports are not automatically typed; YAML frontmatter is not built into MDX and needs plugins; cards and metadata must compile/read documents | Reject as the source of shared project facts |
| Write locale-specific TSX case-study components | Full TypeScript checking and unrestricted React composition | Prose is noisy to author, review, and translate; presentation and content become inseparable; translators must edit code | Reject |
| Add a CMS/content framework now | Editorial UI, workflows, and potentially structured localization | New service, schema, preview, credentials, caching, failure modes, and migration before the portfolio has enough content to justify them | Defer until authoring volume or collaborators demand it |
| **Split JSON + typed registry + localized MDX** | Each format owns what it handles best; local and statically analyzable; compatible with Server Components; incremental locale rollout | Requires a small loader/validation layer and three coordinated stores | **Recommend** |

MDX is appropriate for the document layer because it supports Markdown plus JSX and compiles to a component; Next.js supports local MDX in App Router Server Components and both static and dynamic imports ([Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx), [MDX usage guide](https://mdxjs.com/docs/using-mdx/)). It is deliberately not the metadata store: MDX's own documentation says named exports are not automatically typed, and YAML frontmatter is not supported by default ([MDX frontmatter guide](https://mdxjs.com/guides/frontmatter/)).

## Proposed ownership and layout

```text
messages/
  en.json                         # Published now
  ja.json                         # Add only during ja translation work
  zh-Hans.json                    # Add only during zh-Hans translation work

content/
  work/
    tripa/
      en.mdx
      ja.mdx                      # Added when authored and reviewed
      zh-Hans.mdx                 # Added when authored and reviewed
    script-blender/
      en.mdx                      # If/when promoted to full case study

src/
  app/
    [locale]/
      work/
        [slug]/
          page.tsx                # Route composition only
  i18n/
    routing.ts                    # Published locales and URL policy
    request.ts                    # Validated locale + dictionary loader
  modules/
    work/
      project-registry.ts         # Locale-neutral facts and ProjectSlug
      case-study-loaders.ts       # Explicit locale/slug -> MDX import
      work-content.ts             # Small public lookup interface
      work-content.test.ts
  mdx-components.tsx              # Whitelisted case-study components
```

With a `src` directory, Next.js allows `mdx-components.tsx` inside `src`; it is required when using `@next/mdx` with App Router ([Next.js MDX guide](https://nextjs.org/docs/app/guides/mdx)).

### 1. `next-intl` owns translatable strings, not documents

Use stable, semantic namespaces rather than component filenames:

```json
{
  "Navigation": {},
  "Home": {},
  "Work": {
    "tripa": {
      "title": "Tripa",
      "summary": "A travel journal designed to remain effortless as history grows.",
      "coverAlt": "Tripa's map and travel journal interface",
      "seoTitle": "Tripa case study — Sean Cheong",
      "seoDescription": "How I designed and engineered ..."
    }
  },
  "CaseStudy": {
    "read": "Read case study",
    "availableInEnglish": "This case study is currently available in English."
  }
}
```

This retains ICU messages and `next-intl`'s typed key support for short UI text. `next-intl` can augment its `Locale` type from `routing.locales` and its `Messages` type from the default-locale JSON, which catches invalid locale and message keys at compile time ([next-intl TypeScript augmentation](https://next-intl.dev/docs/workflows/typescript)).

The English dictionary is the structural contract. A validation script must compare every published locale with it; TypeScript augmentation alone validates calls such as `t('key')`, not the completeness of every translated JSON file.

### 2. The typed project registry owns locale-neutral facts

```ts
export const projectSlugs = ['tripa', 'script-blender', 'chroma-ui'] as const;
export type ProjectSlug = (typeof projectSlugs)[number];

type Project = {
  slug: ProjectSlug;
  year: number;
  featured: boolean;
  technologies: readonly string[];
  cover: string;
  liveUrl?: string;
  sourceUrl?: string;
};

export const projects = {
  tripa: {
    slug: 'tripa',
    year: 2026,
    featured: true,
    technologies: ['Next.js', 'TypeScript'],
    cover: '/work/tripa/cover.webp',
    liveUrl: 'https://tripa-six.vercel.app/'
  }
  // ...
} satisfies Record<ProjectSlug, Project>;
```

Keep proper nouns and technology identifiers here only if they should not be translated. Put human-facing labels, descriptions, image alt text, and SEO copy in the dictionaries. This eliminates duplicated dates, links, ordering, and asset paths across locale files.

### 3. Locale-specific MDX owns the narrative

An MDX file contains only the case-study body and permitted presentation components:

```mdx
## The problem

As a travel history grows, finding and revisiting a place should not become harder.

<DecisionComparison before="..." after="..." />
```

Do not duplicate title, slug, year, cover, or SEO fields as frontmatter. Those already have typed owners. The shared `mdx-components.tsx` maps headings, figures, callouts, and a small whitelist of portfolio-specific components to consistent accessible markup. Local MDX can embed React components, and the default export is the renderable content component ([MDX usage guide](https://mdxjs.com/docs/using-mdx/)).

Use an explicit loader registry rather than letting page components construct filesystem paths:

```ts
import type {ComponentType} from 'react';

type CaseStudyModule = {default: ComponentType};
type Loader = () => Promise<CaseStudyModule>;

export const caseStudyLoaders = {
  tripa: {
    en: () => import('../../../content/work/tripa/en.mdx')
  }
} satisfies Record<ProjectSlug, Partial<Record<PlannedLocale, Loader>>>;
```

The work module should expose a small interface such as:

```ts
getProjects(): readonly Project[]
getProject(slug: string): Project | undefined
getCaseStudy(slug: ProjectSlug, locale: Locale): Promise<CaseStudyModule | undefined>
getCaseStudyLocales(slug: ProjectSlug): readonly Locale[]
getPublishedWorkParams(): Array<{locale: Locale; slug: ProjectSlug}>
```

No page or homepage component should import MDX paths, inspect the filesystem, or know the registry's shape.

## Routing and publication policy

### Locale identifiers

Use these BCP 47 identifiers:

```ts
export const plannedLocales = ['en', 'ja', 'zh-Hans'] as const;
export type PlannedLocale = (typeof plannedLocales)[number];

export const routing = defineRouting({
  locales: ['en'], // Add ja/zh-Hans only when each is publishable
  defaultLocale: 'en',
  localePrefix: 'always',
  alternateLinks: false
});
```

Here, the `Locale` type augmented from `routing.locales` means a **published** locale, while `PlannedLocale` lets content be prepared and reviewed before it becomes routable. The work module must intersect loader availability with published locales before producing routes or SEO alternates.

`zh-Hans` expresses Simplified Chinese by script rather than tying the site to one region. `next-intl` expects BCP 47 locale identifiers, and its default prefix mode produces URLs such as `/en/...` ([next-intl request configuration](https://next-intl.dev/docs/usage/configuration), [next-intl routing configuration](https://next-intl.dev/docs/routing/configuration)).

Keep `localePrefix: 'always'` for the first multilingual release:

- it preserves the current `/en` route shape;
- every language has an unambiguous, symmetric URL;
- locale switching does not change whether a prefix exists;
- the bare `/` remains the language-negotiation entry point.

Keep the internal and external case-study path stable as `/work/[slug]` initially. `next-intl` can localize static pathname portions and rewrite them to a shared internal route, but localized dynamic slugs add locale-switcher and alternate-link coordination ([next-intl localized pathnames](https://next-intl.dev/docs/routing/configuration#pathnames)). That complexity offers little value for a small developer portfolio and can be reconsidered later without changing content ownership.

Set `alternateLinks: false` because next-intl's middleware otherwise emits an `hreflang` link header for every configured locale, while this design intentionally allows some case studies to be unavailable in some published locales. The next-intl docs explicitly identify locale-partial pages as a reason to own alternate links yourself ([next-intl alternate links](https://next-intl.dev/docs/routing/configuration#alternateLinks)). Generate accurate HTML alternates and sitemap alternates from the work content registry instead.

Update the middleware matcher so it does not enumerate locales manually. Follow the current next-intl matcher pattern and exclude Next.js internals and dotted asset paths; otherwise every new locale requires an easy-to-miss middleware edit ([next-intl routing setup](https://next-intl.dev/docs/routing/setup)).

### Static generation

At the locale layout:

- validate `params.locale` with `hasLocale` and call `notFound()` for invalid values;
- return `routing.locales` from `generateStaticParams`;
- call `setRequestLocale(locale)` before translation APIs in every layout/page intended for static rendering.

These are next-intl's documented requirements for statically rendering locale-based App Router pages ([next-intl static rendering setup](https://next-intl.dev/docs/routing/setup#static-rendering)).

At `/[locale]/work/[slug]`, `generateStaticParams` should return only the combinations declared by `getPublishedWorkParams()`. Next.js uses `generateStaticParams` to build dynamic routes ahead of time and can return 404 for undeclared paths with `dynamicParams = false` ([Next.js `generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)). For this small, repository-backed portfolio, generating every published locale/case-study pair is simpler and safer than on-demand rendering.

## Fallback policy

Separate three cases that are often conflated:

1. **Invalid locale:** 404 after locale validation; never coerce an arbitrary URL segment into English at the page layer.
2. **Missing UI message in a published locale:** CI/build failure. Do not deep-merge English at runtime, because that hides translation gaps and can create a mixed-language interface. By default, `next-intl` reports missing/invalid messages and renders the key as a fallback; `onError` and `getMessageFallback` can customize runtime behavior, but they should not be the completeness mechanism ([next-intl error handling](https://next-intl.dev/docs/usage/configuration#error-handling)).
3. **Case study not translated for an otherwise published locale:** no localized case-study route. The localized project preview either links explicitly to `/en/work/<slug>` with a translated availability notice or offers only the live/source links. Do not render English at `/ja/work/<slug>` or advertise an `hreflang="ja"` page containing English prose.

Before `ja` or `zh-Hans` enters `routing.locales`, require:

- complete, schema-valid UI messages;
- reviewed localized navigation, home, contact, accessibility, and SEO strings;
- the flagship launch case study (recommended: Tripa) in that locale;
- passing route, metadata, and browser smoke tests.

Other case studies may be translated incrementally because their availability is explicit in the loader registry.

## Build-time validation

Add one deterministic command such as `pnpm content:check`, and run it before `next build` in CI. It should fail on:

- a published locale without a dictionary;
- missing or extra message keys relative to English;
- ICU syntax errors or mismatched argument/tag names between locale variants;
- a project registry key that does not match its `slug`;
- duplicate slugs or featured ordering;
- a declared case-study loader whose file cannot compile/import;
- an MDX locale that is not a known planned locale;
- a case-study slug absent from the project registry;
- missing localized `title`, `summary`, `coverAlt`, `seoTitle`, or `seoDescription` for any visible project;
- a required flagship case study missing from a published locale;
- generated route/alternate combinations that claim unavailable content.

Use a real ICU parser rather than regular expressions for placeholder parity. If a dedicated validation script imports the FormatJS parser directly, declare it as a direct development dependency instead of relying on a transitive package.

Type augmentation still adds useful editor checks:

```ts
import en from '../messages/en.json';
import {routing} from '@/i18n/routing';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof en;
  }
}
```

This follows next-intl's supported augmentation mechanism ([next-intl TypeScript augmentation](https://next-intl.dev/docs/workflows/typescript)).

## Metadata and discoverability

`generateMetadata({params})` on the case-study page should:

- validate locale and slug through the work module;
- read localized `seoTitle` and `seoDescription` using `getTranslations({locale, namespace: ...})`;
- use invariant project assets/URLs from the registry;
- emit a canonical URL for the actual locale/slug;
- emit `alternates.languages` only for locales returned by `getCaseStudyLocales(slug)`;
- set localized image alt text and an appropriate Open Graph locale.

Passing the explicit locale to next-intl's server translation APIs keeps metadata eligible for static rendering ([next-intl metadata guidance](https://next-intl.dev/docs/environments/actions-metadata-route-handlers#metadata)). Next.js supports generated metadata plus canonical and language-alternate links through `generateMetadata` and `alternates.languages` ([Next.js metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)).

Generate the sitemap from the same project and availability registries. Next.js supports locale alternates in programmatic sitemaps ([Next.js sitemap convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)). This prevents routing, metadata, and sitemap availability from drifting apart.

## Authoring workflow

For a new project:

1. Add locale-neutral facts once to `project-registry.ts`.
2. Add the short English strings under `Work.<slug>`.
3. If it is a full case study, create `content/work/<slug>/en.mdx` and add its explicit loader.
4. Run `pnpm content:check`, unit tests, and `next build`.
5. Add locale files later beside `en.mdx`; register them only after editorial review.

For a new published locale:

1. Add its dictionary and required flagship MDX document.
2. Validate key/ICU parity and content coverage.
3. Review text expansion, line breaking, typography, and localized accessibility copy in the UI.
4. Add the locale to `routing.locales`; navigation, static params, metadata alternates, and sitemap output should then derive from the same source.

Keeping translations as JSON makes them portable to translation tooling later. Keeping long documents as sibling MDX files makes side-by-side editorial review straightforward and avoids introducing a CMS prematurely.

## Testing implications

### Unit and contract tests

- Assert all published dictionaries have the same key tree and ICU argument/tag sets as English.
- Assert every project registry record satisfies invariants and every loader points to a registered project/locale.
- Import every declared MDX module so syntax/component failures occur in CI.
- Test `getProject`, `getCaseStudy`, `getCaseStudyLocales`, and `getPublishedWorkParams` for valid and invalid inputs.
- Test metadata assembly: localized title/description, canonical URL, and alternates only for available document locales.

### Component tests

Wrap translated client components in `NextIntlClientProvider` with the locale dictionary, as recommended by next-intl's testing guide ([next-intl testing](https://next-intl.dev/docs/environments/testing)). Test at least English and one long-text fixture so layout behavior does not accidentally depend on English string length.

### Browser tests

- `/en/work/tripa` renders the English case study and correct `<html lang="en">`.
- Invalid locale and slug combinations return the localized 404 behavior.
- The locale switcher preserves the project route only where that translation exists.
- When a translation is unavailable, the UI clearly links to English rather than navigating to a misleading localized URL.
- Canonical, `hreflang`, Open Graph, sitemap, keyboard navigation, and reduced-motion behavior remain correct.

## Recommended implementation sequence

1. Introduce central locale constants, `hasLocale` validation, type augmentation, and a matcher that does not enumerate locales.
2. Extract locale-neutral project facts into the typed work registry; retain current English strings in `messages/en.json` under the new stable namespaces.
3. Add `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, and `@types/mdx`; add `src/mdx-components.tsx` and one English Tripa document.
4. Add the explicit loader and small work-content API.
5. Build `/[locale]/work/[slug]` with static params, strict missing-content behavior, and localized generated metadata.
6. Add `content:check`, unit/component/browser tests, and CI wiring.
7. Add `ja` and `zh-Hans` only in their translation phase after the publication gate passes.

## Explicitly deferred

- A CMS, visual editor, preview environment, and translator accounts.
- Localized dynamic project slugs.
- Machine-translation fallback in production.
- Automatic filesystem discovery or code generation for content loaders; an explicit registry is clearer at the expected portfolio scale.
- Moving project metadata into MDX frontmatter.

These can be reconsidered if the site grows beyond a small number of curated case studies or non-developer editors need to own publishing.
