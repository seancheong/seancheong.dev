# Visual foundation and shared shell — 1 November 2026

Implements [Build the dark-first visual foundation and shared site shell](https://github.com/seancheong/seancheong.dev/issues/40)
from the accepted Orbit/Companion/Showcase visual decision. This is the foundation
slice, not the final homepage, map, motion system, case study or release.

## Result

- Dark-only semantic palette, violet action color, neutral text, local Geist Sans
  and Mono, responsive gutters/type, surfaces, visible focus and reduced-motion
  anchor scrolling. Removed the Arial override and unused next-themes dependency.
- One server-rendered header, primary navigation, skip link, main landmark and
  footer, owned by the locale layout through `SiteShell`.
- Native locale-prefixed links and mobile details/summary disclosure. The only
  shell client boundary adds Escape dismissal and closes the disclosure on link
  selection. Native fragment targets receive focus; Escape returns to Menu.
- Home, Experience, Projects, Articles and Contact navigation resolve. Existing
  `#profile` remains reachable. Articles temporarily reaches the existing Medium
  profile; no new article selection or Articles Hub publication is implied.
- Removed the obsolete header and content-hiding Reveal wrapper; critical title
  and role text render directly instead of starting empty/transparent.
- `DESIGN.md` documents the actual tokens, Container and SiteShell conventions.

## Validation

Pinned Node **22.23.4**, pnpm **10.20.0**; frozen offline install succeeded.

| Check                                            | Result                                                  |
| ------------------------------------------------ | ------------------------------------------------------- |
| Formatting                                       | Passed                                                  |
| Zero-warning ESLint                              | Passed                                                  |
| TypeScript                                       | Passed                                                  |
| Dependency boundaries                            | Passed                                                  |
| Portfolio Content / ICU / publication validation | Passed                                                  |
| Production build                                 | Passed                                                  |
| Vitest / Testing Library                         | 78 passed                                               |
| Playwright                                       | 55 passed across Chromium, Firefox and WebKit           |
| axe                                              | Desktop and expanded mobile navigation: zero violations |

Browser checks cover five widths, longer Japanese/Simplified Chinese labels,
landmarks, skip navigation, mobile keyboard selection/Escape/focus, working
anchors, actual locale 404s, and desktop/mobile navigation with JavaScript disabled.
WebKit uses Option-Tab for native link navigation, matching Safari's keyboard
mode; Chromium/Firefox use Tab. These checks do not publish future locales.

The first runs exposed a missing explicit summary role in role-based navigation
and a stale expectation that focus remain on Menu after fragment navigation.
The final implementation gives the disclosure a button role and focusable fragment
destinations. The rebuilt complete suite passed without assertion retries.

The CI fault probe now targets the hydrated-home test where the fault is injected.
Adding the mobile audit exposed the old single-report assumption: the probe could
read the passing mobile report instead. Both real audits remain required; the
negative probe still requires the injected image-alt failure, screenshot and trace.

### Color checks

Calculated from the shipped HSL tokens using WCAG sRGB relative luminance:

| Pair                                   | Ratio   |
| -------------------------------------- | ------- |
| Body / page                            | 13.48:1 |
| Heading / page                         | 17.37:1 |
| Muted text / page                      | 8.73:1  |
| Violet action text / action background | 7.62:1  |
| Popover text / popover                 | 14.55:1 |
| Secondary text / secondary             | 12.48:1 |
| Accent text / accent                   | 8.31:1  |
| Error text / error                     | 5.62:1  |
| Focus ring / page                      | 17.37:1 |
| Essential control boundary / popover   | 4.68:1  |

Decorative separators are not essential control boundaries. Shell controls have
44px hit areas. A live browser check confirmed the computed Geist font and no
horizontal overflow at 1440px.

### Screenshots

The existing body is retained while journey replacements are delivered; these
images validate the shell and responsive foundation, not final content approval.

- [360px](visual-foundation-2026-11-01/shell-360.png)
- [390px](visual-foundation-2026-11-01/shell-390.png)
- [768px](visual-foundation-2026-11-01/shell-768.png)
- [1024px](visual-foundation-2026-11-01/shell-1024.png)
- [1440px](visual-foundation-2026-11-01/shell-1440.png)
- [Keyboard focus in the mobile navigation](visual-foundation-2026-11-01/shell-keyboard-menu-chromium.png)

## Remaining gates

Production merge/deployment, physical Safari/iOS review and release performance
measurements remain separate. No Lighthouse/Core Web Vitals score or release
approval is claimed here. The retained legacy biography/experience copy, other
project UI and contact form still await their approved homepage/content/contact
replacement tasks; this PR does not reinterpret those as current publication
approvals. The accepted prototype remains a reference, imported by no production
module. Further work proceeds with the Portfolio Motion System and journey issues.
