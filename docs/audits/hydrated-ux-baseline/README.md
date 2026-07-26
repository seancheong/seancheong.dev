# Selected products and hydrated UX baseline

Captured on 2026-07-26 (UTC+08:00) for
[issue #36](https://github.com/seancheong/seancheong.dev/issues/36).

This is a browser-observed baseline for the current portfolio and the three
selected products: Takonbini as the full case study, plus Tripa and Script
Blender as previews. It records what a visitor can actually reach after
hydration, including responsive layouts, interactive states, semantics, and
the evidence that was unavailable in the supported audit environment.

## Reproduction profile

| Item                         | Value                                                          |
| ---------------------------- | -------------------------------------------------------------- |
| Audit surface                | Codex in-app Browser (`iab`)                                   |
| Portfolio                    | <https://www.seancheong.dev/en>                                |
| Takonbini                    | <https://takonbini.com/>                                       |
| Tripa                        | <https://tripa-six.vercel.app/> and authenticated `/dashboard` |
| Script Blender               | <https://script-blender.vercel.app/>                           |
| Viewports                    | 1440 x 1000 desktop; 768 x 1024 intermediate; 390 x 844 mobile |
| Host preferences             | Dark color scheme; `prefers-reduced-motion: false`             |
| Repository commit at capture | `282da91e98b0c3c1ab0c8deb4c437aab589a0218`                     |
| Local runtime                | Node 22.16.0; pnpm 10.20.0; axe-core 4.10.0 installed          |

All screenshots were taken after the page reported `document.readyState ===
"complete"` and after a settling wait. Console warnings and errors were checked
for each target during the observed flows; none were emitted.

## Baseline summary

| Target         | Hydrated UX observed                                                                                                                                        | Highest-value constraint                                                                                                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Portfolio      | Project navigation, responsive sections, project cards, and contact validation all hydrate and respond.                                                     | The mobile menu control produced no visible or semantic open state; the rotating hero heading can expose an empty H1; seven elements use `aria-selected="false"` without a selection role.                            |
| Takonbini      | Filters, language selection, and light/dark/system theme selection work at desktop and mobile widths.                                                       | The live catalog was empty, preventing product card, detail, transition, pagination/end-state, and image-loading evidence. The Chinese locale is Traditional Chinese, not the previously recorded Simplified Chinese. |
| Tripa          | Public theme switching works. Authenticated search, location creation, detail, editing, deletion, action menu, and mobile sidebar were verified end to end. | The mobile dashboard keeps the map mounted at a 0 x 0 layout box, so its touch map experience is unavailable at that width.                                                                                           |
| Script Blender | Monaco input, formatting, successful execution, syntax-error output, package import, preview sandbox, and responsive stacking work.                         | Execution errors are visible but were not exposed through a non-empty alert/live region; the loading state was too fast and cached to capture reliably.                                                               |

## Portfolio

### Responsive and hydrated behavior

- At 1440 x 1000 the page hydrated 11 images and exposed the main navigation,
  project links, and contact controls. The document height was 3,977 px.
- At 768 x 1024 the desktop navigation remained visible. The document did not
  overflow horizontally (`scrollWidth === clientWidth === 753`, excluding the
  browser scrollbar).
- At 390 x 844 the compact menu button was present. Activating the button did
  not add menu content or a changed open state to the accessibility snapshot.
- The hero role heading rotated between values, but the H1 was intermittently
  empty in the hydrated accessibility snapshot.

### Forms and semantics

- Submitting an empty contact form focused the Name field and displayed:
  `Name must contain at least 3 characters`, `Invalid email`, and
  `Message must contain at least 3 characters`.
- Seven elements had `aria-selected="false"` without a corresponding selection
  role: two `div` elements and five project links.

## Takonbini

### Responsive and interactive behavior

- Desktop and mobile pages reached a stable `No products available yet.` state.
- The filter panel exposes a search textbox, store checkboxes, price
  spinbuttons, Reset, and Apply controls.
- Applying search `zzzz-no-match` plus Seven-Eleven updated the URL to
  `?search=zzzz-no-match&stores=%5B%22SevenEleven%22%5D` and displayed
  `2 active` while retaining the empty result.
- Keyboard arrow selection worked in the language and theme controls.
- Japanese and Chinese locale changes completed without a reload failure.
- The Chinese UI uses Traditional Chinese orthography, including `選擇主題`,
  `篩選`, `門市`, `關東煮`, and `瀏覽`.
- The theme control exposes Light, Dark, and System; Dark changed both the root
  class and computed foreground/background colors.

### Unavailable product evidence

Because the production catalog returned zero products, this audit could not
measure product cards, product detail pages, view transitions, progressive
image behavior, infinite loading, or the natural catalog end state. This is a
content-availability boundary, not a finding that those features failed.

## Tripa

### Public experience

- The landing page rendered at desktop and mobile widths with the heading
  `Your JourneyBeautifully Mapped` and the Track Locations / Write Stories
  feature sections.
- The theme switch changed the public page from dark to light.
- The mobile layout had no horizontal overflow.
- The public CTA structure includes anchor elements containing buttons. Several
  other icon-only controls had neither text nor an attribute-level accessible
  name in the DOM projection and warrant assistive-technology verification.

### Authenticated workflow

The signed-in account began with no locations. A temporary publication-safe
record was used to exercise the complete workflow:

1. Searched for `Tokyo Station` and selected the exact result at
   `35.6816190, 139.7653303`.
2. Created `Codex Audit Sample` with coordinates rounded to
   `35.68162, 139.76533`.
3. Opened its detail view and used the action menu to edit the description.
4. Verified the updated detail, then deleted the record through the named
   confirmation dialog.
5. Confirmed the dashboard returned to the original empty state.

The dashboard map exposes a `region` named `Map` with zoom-in, zoom-out, and
reset-bearing controls. At 390 x 844 the sidebar opens as a dialog named
`Sidebar`, but the mounted MapLibre container measured 0 x 0. The location card
remained reachable; the touch map did not.

The audit screenshots crop the signed-in header so no account identity is
published. The temporary record was deleted before the audit ended.

## Script Blender

### Execution and responsive behavior

- Monaco exposes a textbox named `Editor content`; the preview is a titled,
  sandboxed iframe with `sandbox="allow-scripts"`.
- Running `console.log("baseline-ok")` displayed `Code Executed` and the expected
  console output.
- Running `const = broken` displayed the esbuild failure
  `Expected identifier but found "="`.
- Importing `dayjs` and formatting `2020-01-01` displayed `2020`.
- Format changed quote style and added semicolons.
- At 390 x 844 the editor and preview stack vertically, the separator becomes
  horizontal, and the layout has no horizontal overflow.

The visible error output did not produce a non-empty element with
`role="alert"`. The loading state completed too quickly, including on repeat
runs with warmed resources, to capture a trustworthy loading screenshot.

## Accessibility and motion matrix

| Check                       | Portfolio                                                           | Takonbini                                                       | Tripa                                                                 | Script Blender                                            |
| --------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------- |
| Hydrated accessibility tree | Inspected                                                           | Inspected                                                       | Public and authenticated inspected                                    | Inspected                                                 |
| Named primary controls      | Mostly present; mobile menu activation did not expose an open state | Filter, language, theme, and product-empty state present        | Map and sidebar named; some public icon controls need AT verification | Editor and preview named; output live announcement absent |
| Responsive overflow         | None at 768 or 390                                                  | None at 390                                                     | None on public mobile; dashboard map collapses to 0 x 0               | None at 390                                               |
| Reduced-motion CSS          | Only shared toast/loading rules found                               | No `prefers-reduced-motion` rules found                         | Only shared toast/loading rules found                                 | Only shared toast/loading rules found                     |
| Motion observed             | Rotating hero text and section/card animation                       | Theme and locale state changes; product transitions unavailable | Theme, map, dialogs, and sidebar                                      | Editor resize, execution status, and preview update       |

The current environment reported `prefers-reduced-motion: false`. The Browser
surface does not expose media-emulation controls, so the reduced-motion branch
could not be activated. Stylesheet inspection is therefore a code-path signal,
not proof of behavior under the preference.

## Evidence boundaries

The following requested measurements were explicitly attempted or checked and
were unavailable through the supported in-app Browser workflow:

- **Lighthouse:** the repository does not lock or install the Lighthouse CLI,
  and the Browser surface exposes no Lighthouse runner. No score is reported.
- **axe:** axe-core 4.10.0 is installed locally, but the Browser evaluation API
  is read-only and cannot inject the runner into these live pages. No axe result
  or violation count is reported.
- **Sequential Tab order:** synthetic Tab input did not advance focus in the
  Browser backend. This is an audit-surface limitation, not a product failure.
  Keyboard behavior that could be reached directly (notably select arrow-key
  navigation) is recorded above.
- **Assistive technology:** no screen reader session was available. Accessible
  names and roles are based on the browser accessibility snapshot and selective
  read-only DOM projection.
- **Reduced-motion emulation:** unavailable, as noted above.
- **Motion video:** the Browser supports still screenshots but not a timeline or
  video capture. The observed motion inventory is recorded in the matrix.
- **Physical touch:** mobile viewport behavior was measured, but no physical
  touch device was attached.

These boundaries prevent false precision. They also define the follow-up audit
toolchain: lock Lighthouse and an axe browser runner in the repository, provide
real keyboard/AT sessions, and add reduced-motion media emulation before using
numeric accessibility or performance claims in the portfolio.

## Screenshot inventory

All paths are relative to this report.

| Captured (UTC+08:00) | Evidence                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| 22:25:04             | [Portfolio desktop, 1440 x 1000](assets/portfolio-desktop-1440x1000.jpg)                       |
| 22:26:19             | [Portfolio mobile, 390 x 844](assets/portfolio-mobile-390x844.jpg)                             |
| 22:26:21             | [Portfolio mobile after menu activation attempt](assets/portfolio-mobile-menu-390x844.jpg)     |
| 22:35:20             | [Portfolio intermediate, 768 x 1024](assets/portfolio-intermediate-768x1024.jpg)               |
| 22:27:21             | [Takonbini desktop empty catalog](assets/takonbini-desktop-empty-1440x1000.jpg)                |
| 22:28:06             | [Takonbini filter controls](assets/takonbini-controls-open-1440x1000.jpg)                      |
| 22:29:25             | [Takonbini mobile empty catalog](assets/takonbini-mobile-empty-390x844.jpg)                    |
| 22:45:02             | [Takonbini Traditional Chinese, dark theme](assets/takonbini-chinese-dark-empty-1440x1000.jpg) |
| 22:29:50             | [Tripa public desktop](assets/tripa-desktop-1440x1000.jpg)                                     |
| 22:30:43             | [Tripa public mobile](assets/tripa-mobile-public-390x844.jpg)                                  |
| 22:39:58             | [Tripa authenticated empty dashboard](assets/tripa-dashboard-empty-desktop-1440x1000.jpg)      |
| 22:41:03             | [Tripa add-location workflow](assets/tripa-add-location-desktop-1440x1000.jpg)                 |
| 22:43:03             | [Tripa authenticated mobile dashboard](assets/tripa-dashboard-mobile-390x844.jpg)              |
| 22:32:41             | [Script Blender desktop](assets/script-blender-desktop-1440x1000.jpg)                          |
| 22:33:22             | [Script Blender successful execution](assets/script-blender-execution-success-1440x1000.jpg)   |
| 22:33:43             | [Script Blender syntax error](assets/script-blender-execution-error-1440x1000.jpg)             |
| 22:34:20             | [Script Blender package import](assets/script-blender-package-import-1440x1000.jpg)            |
| 22:34:44             | [Script Blender mobile stack](assets/script-blender-mobile-390x844.jpg)                        |

## Decision implications

- Keep Takonbini as the deep case study, but do not build the proof around live
  product detail or transition evidence until the catalog is populated.
- Describe Takonbini's Chinese locale accurately as Traditional Chinese.
- Tripa can support a credible workflow preview using its end-to-end location
  flow, while the mobile map collapse should be treated as a known constraint.
- Script Blender can support concrete execution and package-import evidence;
  pair error screenshots with an accessibility follow-up for status
  announcements.
- The portfolio redesign should treat reduced motion, a stable non-empty H1,
  mobile navigation state, and valid selection semantics as explicit acceptance
  criteria rather than inherited behavior.
