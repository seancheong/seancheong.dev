# Launch portfolio evidence selection

## Research question

Which current personal project should anchor the first public case study, which two should receive featured homepage previews, and which two or three externally published articles should appear as Curated Notes?

## Recommendation

- **Public Case Study:** **Takonbini**
- **Featured previews:** **Tripa** and **Script Blender**
- **Curated Notes:**
  1. [Understanding the Importance of Caching and the Stale-While-Revalidate Pattern](https://blog.stackademic.com/understanding-the-importance-of-caching-and-the-stale-while-revalidate-pattern-c23bb1f7382b)
  2. [React Hooks in Action: Implementing Auto-Save with Custom Hooks](https://blog.stackademic.com/react-hooks-in-action-implementing-auto-save-with-custom-hooks-b0be405766c5)
  3. [Building a Task Management Library with Vue 3 and Composition API](https://medium.com/@seancheongzhenxiong/building-a-task-management-library-with-vue-3-and-composition-api-9548aa96f14e)

This combination makes the strongest launch argument for Sean as a senior frontend/product engineer: Takonbini shows an end-to-end product and explicit architectural trade-offs; Tripa shows interaction-rich consumer product work; Script Blender shows a technically distinctive developer tool. The Notes then reinforce performance judgment, user-protective UX, and cross-framework library design without repeating the same topic three times.

## Method and limits

The assessment uses first-party evidence only: Sean's public repositories and source code, public deployments, Sean's existing portfolio assets, and Sean's Medium profile/RSS feed and articles. All six deployed projects returned HTTP 200 during the check on 2026-07-26. Repository activity is not treated as proof of product impact, and no usage or outcome metric is claimed because none is publicly documented.

The in-app browser was unavailable, so this session could not perform hands-on flows, responsive checks, keyboard checks, or live screenshots. UX judgments therefore come from public source, repository documentation, and existing imagery. Before implementation, the selected projects need a short manual product audit and fresh screenshot capture.

## Candidate assessment

Scores are relative launch-readiness judgments on a five-point scale. “Risk” is qualitative: it captures the likelihood that the story could overclaim, expose private material, or require substantial remediation before publication.

| Candidate | Evidence | UX story | Technical / leadership signal | Asset readiness | Risk | Launch role |
|---|---:|---:|---:|---:|---|---|
| Takonbini | 5 | 5 | 5 | 4 | Medium | Full case study |
| Tripa | 4 | 5 | 4 | 4 | Medium | Featured preview |
| Script Blender | 4 | 4 | 5 | 4 | Medium | Featured preview |
| Chroma UI | 4 | 3 | 4 | 2 | High | Archive; revisit after modernization |
| Vue Task Management | 4 | 3 | 4 | 2 | Medium | Archive and supporting Note |
| Cashush | 2 | 3 | 2 | 4 | High | Do not feature at launch |

### 1. Takonbini — anchor the Public Case Study

**Why it wins.** Takonbini has the clearest chain from user problem to interface behavior to system design. The public app lets people browse Japanese convenience-store products and exposes filters, product details, theme switching, and English/Japanese/Simplified Chinese localization. Its web README documents SSR hydration, paginated fetching, an image proxy, and caching; its architecture note records real trade-offs around MongoDB versus DynamoDB, cursor pagination, data expiry, image reliability, and translation quality. Those are unusually strong raw ingredients for explaining *why* decisions were made, not merely listing a stack. See the [public app](https://takonbini.com/), [README](https://github.com/seancheong/takonbini-web/blob/bcf53f4f1e49b4d767d2f55d5e0383b04b9f5f95/README.md), and [architecture notes](https://github.com/seancheong/takonbini-web/blob/bcf53f4f1e49b4d767d2f55d5e0383b04b9f5f95/architecture.md).

**UX evidence.** The product panel distinguishes first-load skeletons, filter/navigation overlays, incremental loading, empty results, and end-of-list states. Product cards preload navigation, expose keyboard focus, handle missing and loading images, localize product text, and use view transitions with a Safari fallback. That provides concrete material about perceived performance, resilient media, interaction continuity, and progressive enhancement. See [`ProductPanel.tsx`](https://github.com/seancheong/takonbini-web/blob/bcf53f4f1e49b4d767d2f55d5e0383b04b9f5f95/src/features/product/components/ProductPanel.tsx) and [`ProductCard.tsx`](https://github.com/seancheong/takonbini-web/blob/bcf53f4f1e49b4d767d2f55d5e0383b04b9f5f95/src/features/product/components/ProductCard.tsx).

**Technical and future-facing signal.** The public architecture connects product filters to database selection, SSR to client hydration, and an image proxy to edge/browser caching. It also documents an OpenAI-backed translation workflow, creating a credible bridge toward Sean's future AI-engineering direction without repositioning the portfolio around an unsupported claim. The case study should present the AI integration as one product/system decision, not as proof of broad AI-engineering expertise.

**Asset readiness.** The repo already contains a polished 1200×630 Open Graph image and a 1024×1024 architecture diagram. It needs fresh captures for filter states, localized variants, product detail, mobile, loading/empty/error behavior, and the shared view transition. The case study should redraw the architecture diagram in the portfolio's visual language rather than use the handwritten image as the primary diagram.

**Risks and guardrails.** The server-side repository is private, while the public architecture note mixes shipped MVP behavior with explicitly future cloud work. Every case-study statement must be tagged internally as **shipped**, **measured**, **planned**, or **learned** before publication. Do not expose private source, credentials, infrastructure identifiers, costs, prompts, or unpublished business data. Avoid inventing scale or outcome metrics. A manual audit must also confirm the live locale, filter, detail, theme, mobile, loading, error, and keyboard flows.

**Recommended case-study thesis.** “Designing a multilingual product browser that stays fast and understandable across unreliable third-party data.” This foregrounds frontend/product judgment while still allowing the architecture and AI-assisted translation decisions to support the story.

### 2. Tripa — first featured preview

**Why feature it.** Tripa has the strongest consumer-product narrative and the most immediately visual identity of the current portfolio projects. It combines maps, search, authentication, responsive navigation, theme support, location journals, and create/edit flows. Its public README and source establish a real product surface rather than a landing-page concept. See the [public app](https://tripa-six.vercel.app/), [README](https://github.com/seancheong/tripa/blob/7474582d166c3e411dce02f3ae73b57c01aa6e0c/README.md), and [`MapView.tsx`](https://github.com/seancheong/tripa/blob/7474582d166c3e411dce02f3ae73b57c01aa6e0c/src/components/MapView.tsx).

**Evidence and UX story.** The map source shows linked list/map selection, hover highlighting, marker dragging, double-click placement, automatic bounds, and animated focus on selected locations. The location search implements validation, submitting, success, empty, and error states. These make a strong preview story about translating a spatial data model into understandable interactions. See [`LocationSearch.tsx`](https://github.com/seancheong/tripa/blob/7474582d166c3e411dce02f3ae73b57c01aa6e0c/src/features/location/components/LocationSearch.tsx).

**Asset readiness and risks.** The current portfolio has a polished 1200×630 hero asset, but it shows only the marketing page. The preview needs a map/dashboard capture and preferably a short loop of selecting a saved location. Authentication gates much of the product, and the map currently includes pointer-centric interactions such as hover and double-click; keyboard and touch equivalents require verification or remediation before accessibility claims. Keep the initial homepage copy focused on the problem and interaction design, not unmeasured user outcomes.

### 3. Script Blender — second featured preview

**Why feature it.** Script Blender is the most technically distinctive public artifact: Monaco editing, JavaScript/TypeScript bundling, package import resolution, Redis caching, responsive resizable panels, delayed auto-execution, shortcut execution, and sandboxed preview output. It signals depth that a typical CRUD portfolio project cannot. See the [public app](https://script-blender.vercel.app/), [README](https://github.com/seancheong/script-blender/blob/7ef71b9102420cfc3ccf5b1b990ab256f099b787/README.md), [`CodePanel`](https://github.com/seancheong/script-blender/blob/7ef71b9102420cfc3ccf5b1b990ab256f099b787/src/components/CodePanel/index.tsx), and [server build service](https://github.com/seancheong/script-blender/blob/7ef71b9102420cfc3ccf5b1b990ab256f099b787/src/services/codeService.ts).

**Evidence and UX story.** Its split editor/console screenshot is already strong and high-resolution. Source code documents skeleton initialization, mobile orientation changes, error output, toast feedback, and a resizable work surface. The project also has component and responsive-layout tests in the public tree. This supports a preview about making code experimentation immediate and usable across viewport constraints.

**Risks and guardrails.** The README's live URL is stale even though repository metadata and the portfolio point to the current deployment. The implementation accepts and bundles user code and external package imports; security, resource-abuse, cache, and isolation behavior need explicit review before the portfolio celebrates the architecture. The preview should say “sandboxed browser preview” only to the extent confirmed by the iframe's `sandbox="allow-scripts"`; it should not imply the complete execution pipeline has been security-audited. See [`Preview.tsx`](https://github.com/seancheong/script-blender/blob/7ef71b9102420cfc3ccf5b1b990ab256f099b787/src/components/CodePanel/Preview.tsx).

## Why the other projects should not lead launch

### Chroma UI

Chroma UI is strategically relevant to the planned internal motion system, and it has public Storybook, tests, CI/release workflows, an npm-oriented package manifest, and three GitHub stars. However, its own README warns that it is early-stage and many components are not production-ready; the current portfolio image is a sparse Storybook button page, and the stack remains React 18, Storybook 7, Create React App, and older build tooling. Leading with it would weaken the “premium and current” impression. Keep it in the archive, then consider a separate modernization/extraction effort after the portfolio motion components have proven themselves. Sources: [README](https://github.com/seancheong/chroma-ui/blob/07cb6cd9020254d90da0435d9f7750118678bb83/README.md), [package manifest](https://github.com/seancheong/chroma-ui/blob/07cb6cd9020254d90da0435d9f7750118678bb83/package.json), and [Storybook](https://seancheong.github.io/chroma-ui/).

### Vue Task Management

This is a coherent, published-style library with a typed API, tests, examples, CI, coverage, and release workflows. It also has a directly corresponding article, which makes it valuable corroborating evidence. Its visual surface is deliberately tiny, though, so it is weaker as premium homepage imagery and better as an archive item plus Curated Note. Sources: [README](https://github.com/seancheong/vue-task-management/blob/18ad43b9277edc66da64684691c4cbdb9795e82a/README.md), [`useTaskManagement.ts`](https://github.com/seancheong/vue-task-management/blob/18ad43b9277edc66da64684691c4cbdb9795e82a/src/lib/useTaskManagement.ts), and [example deployment](https://seancheong.github.io/vue-task-management/).

### Cashush

Cashush has polished landing-page imagery and a live deployment, but the public repository describes itself only as an introductory webpage and provides little evidence of product behavior, architecture, individual ownership, or outcomes. Because it also appears tied to a company, publishing a detailed story could create attribution or confidentiality ambiguity. Keep it out of the launch feature set unless Sean can document his exact role, permission to show the work, and a decision-rich story. Sources: [README](https://github.com/seancheong/cashush-web/blob/ba42c0fdda79a6075b531d76a0368a8a9e36e936/README.md) and [public site](https://www.cashush.com/).

## Curated Notes selection

Sean's first-party [Medium profile](https://medium.com/@seancheongzhenxiong) and [RSS feed](https://medium.com/feed/@seancheongzhenxiong) currently expose seven articles, all published between June 2023 and January 2024. The launch should present three as “Selected writing” with original publication dates, not as recent posts.

### 1. Understanding the Importance of Caching and the Stale-While-Revalidate Pattern

This is the strongest senior-engineering signal of the set because it frames performance through freshness and caching behavior rather than a narrow framework trick. It also connects naturally to Takonbini's documented image proxy and browser/edge caching. The Medium feed confirms Sean's authorship, the 2024-01-08 date, Stackademic publication, and React/SWR/Next.js categories. [Read the article](https://blog.stackademic.com/understanding-the-importance-of-caching-and-the-stale-while-revalidate-pattern-c23bb1f7382b).

### 2. React Hooks in Action: Implementing Auto-Save with Custom Hooks

This is the best direct proof of user-centered thinking. It begins from the risk and frustration of lost work and develops an auto-save mechanism around state persistence; that aligns tightly with the portfolio's intended claim that Sean notices UX details. The Medium feed confirms Sean's authorship, the 2023-09-20 date, Stackademic publication, and React/hooks/state-management categories. [Read the article](https://blog.stackademic.com/react-hooks-in-action-implementing-auto-save-with-custom-hooks-b0be405766c5).

### 3. Building a Task Management Library with Vue 3 and Composition API

This note adds breadth beyond React and is uniquely corroborated by a working public repository, typed library API, tests, examples, and release automation. The article explains the problem as ordered state progression across UI screens and processing tasks, while the repository supplies the implementation evidence. Sources: [article](https://medium.com/@seancheongzhenxiong/building-a-task-management-library-with-vue-3-and-composition-api-9548aa96f14e) and [repository](https://github.com/seancheong/vue-task-management/tree/18ad43b9277edc66da64684691c4cbdb9795e82a).

**Alternates.** “Enhancing Data Fetching in React: Mixing together useSWR and Debounce” is relevant and practical, but overlaps heavily with the selected caching article. “JavaScript Promises in Parallel” and “Unit Testing Asynchronous JavaScript” demonstrate fundamentals but position Sean less distinctly as a senior product/frontend leader. “Balancing Control in React” is a reasonable fourth item if the section later expands.

## Content and asset work required before implementation

1. **Interview Sean about Takonbini.** Capture the original user problem, audience, Sean's role, constraints, alternatives rejected, shipped scope, lessons, and any defensible outcome evidence. Separate public web code from private backend details.
2. **Audit all three selected live products.** Verify desktop/mobile, keyboard, screen reader basics, reduced motion, loading/empty/error states, external dependencies, broken links, and authentication access. Record fixes as implementation tickets; do not conceal known defects in case-study copy.
3. **Create a capture list.** Takonbini needs product grid, filters, product detail, EN/JA/ZH, theme, responsive, error/empty/loading, and view-transition media. Tripa needs authenticated map/list and add/edit flows. Script Blender needs desktop/mobile, execution, package import, loading, and error states.
4. **Refresh supporting metadata.** Add Takonbini to the portfolio registry; update Script Blender's README live URL; ensure every selected project has consistent Open Graph art, descriptive alt text, repository/live links, year, role, and truthful status.
5. **Editorially review the Notes.** Older articles may contain dated package APIs or examples. Link externally with the original date and consider a small “Still relevant / what I would change now” annotation rather than silently rewriting history.

## Decision statement for the Wayfinder ticket

Anchor the first Public Case Study on **Takonbini**, with **Tripa** and **Script Blender** as the two featured previews. Launch Curated Notes with the articles on **stale-while-revalidate caching**, **auto-save with custom React hooks**, and **building the Vue task-management library**. Treat Chroma UI and Vue Task Management as archive evidence, and omit Cashush from featured launch content unless ownership and publication permission are clarified.
