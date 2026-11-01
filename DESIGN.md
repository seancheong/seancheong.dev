# Visual foundation

The accepted direction is a dark portfolio with neutral text, violet controls,
Orbit, a country map beside experience, and stacked project showcases. This shell
lands before those journey components. The visual-decision resolution is in
[Choose the dark-first visual direction](https://github.com/seancheong/seancheong.dev/issues/28).

## Tokens

Source: `src/app/[locale]/globals.css`. Components use semantic Tailwind colors
or `hsl(var(--token))`; never introduce a second decorative accent. Company logos
and real product media retain their native colors.

Choose a surface:

- Page → `background`; content region → `container` or `card`.
- Floating content → `popover`, with `popover-foreground` text.
- Quiet controls → `secondary`; selected/hovered regions → `accent`.

Choose text:

- Headings → `heading`; body → `foreground`; supporting text → `muted-foreground`.
- Violet control → `primary` with `primary-foreground`, never white text on violet.
- Keyboard focus → `ring`, with a 2px outline and 4px offset.
- Separators → `border`; essential control boundaries → `input`.
- Error feedback → `destructive` with `destructive-foreground`.

The HSL channel values remain compatible with the existing UI primitives.
`brand-*` and `gradient-*` aliases resolve to the same violet during migration;
use `primary` for new work. No visitor theme switch or light palette exists.

## Typography and space

The local Geist variable fonts are loaded once in the locale layout. Use the
inherited sans font; `font-mono` is available for code/technical labels. Do not
restore the previous Arial override or load a remote font.

Body text is 16px with 1.6 line height; shell navigation/captions are 14px. Heading
sizes and tracking are defined in base CSS. Wrap long text instead of truncating
navigation labels. `--site-section-space` is 48–80px and `--site-gutter` is 24–48px.

## Container

Use `Container` from `@/components/ui/container` for shared page width and gutters.
Use an ordinary div inside a journey for local grids. Container accepts standard
div props and `className`; it has no variants or portfolio content. Shell CSS lives
in `@layer components`, so caller utilities can override Container width/gutters.

```tsx
// Correct: shared width comes from the foundation.
<Container><main id="main-content">{children}</main></Container>

// Incorrect: a second page-width system would drift from the header/footer.
<div className="mx-auto max-w-5xl px-6">{children}</div>
```

## SiteShell

Use `SiteShell` from `@/site-shell` once, in the locale layout. Journeys supply
content, not another header, main landmark or footer. Its only inputs are `locale`
and `children`; there are no appearance variants. Labels live in `messages/en.json`
and flow through next-intl/Portfolio Content. Generic UI must not import this module.

```tsx
// Correct: layout owns the shell; route content remains inside its main landmark.
<SiteShell locale={locale}>{children}</SiteShell>

// Incorrect: a journey-owned shell would duplicate navigation and landmarks.
<main><SiteShell locale={locale}>{children}</SiteShell></main>
```

Navigation uses locale-prefixed native links. Home, Experience, Projects, Articles
and Contact use the current homepage anchors until dedicated journeys land. Keep
`#profile` reachable for old links. Articles currently reaches the existing Medium
profile, not unapproved article selections or a fabricated Articles Hub.

Mobile navigation is a native details/summary disclosure. JavaScript only adds
Escape dismissal and focus return to the summary. Selecting a link moves focus
to the native fragment destination. Never replace these
links with router callbacks or a JavaScript-only menu. The skip link is the first
focusable element; its target must remain visible without JavaScript.

## Implementation boundaries

Use native links for navigation and buttons for actions. Shell controls have 44px
hit areas. Focus remains visible, including in reduced-motion mode. Smooth anchor
scrolling is enabled only when reduced motion is not requested. The root
`scroll-padding-top: 6rem` is the single sticky-header offset; do not add another
scroll margin to fragment targets.

Do not add entrance opacity/typing wrappers to the shell or critical text. Motion
policy belongs to the Portfolio Motion delivery, not the shell. Rebuild approved
prototypes within production module boundaries; do not import prototype files.
Existing legacy sections, contact-form behavior and project curation are replaced
by their delivery tasks. This foundation is not final homepage or release sign-off.
