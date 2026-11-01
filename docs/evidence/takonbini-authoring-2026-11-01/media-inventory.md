# Takonbini candidate media

All captures are from the real public product on 1 November 2026, using Chromium
156.0.8078.4 with reduced motion. These are review candidates, not approved assets.
[File dimensions, encoded sizes and SHA-256 hashes](media-files.json) identify
exact review versions. WebP conversion uses sharp at quality 85 without cropping,
retouching, generated content or altered product data. Original PNGs are retained
locally. Even the largest candidate is below the later 250kB LCP-media limit; the
actual #43 route will need its own selected-resource measurement.

The screenshots contain Takonbini UI, retailer names, product photography and
translated descriptions. No user account, analytics console, private source,
credential or operational interface is visible. Sean must approve the exact
selection and confirm reproduction permission for third-party material before
portfolio publication. A capture of a public page does not establish those rights.

The UI's product information is a dated observation. Captions must not imply the
pictured product is stocked at a particular shop or available when a reader visits.
English/Japanese screenshots reflect Takonbini's product locales; portfolio launch
remains English only, with Japanese/Simplified Chinese still planned.

## Recommended selection

### M01: Filtered desktop catalog

[Candidate image](../../../content/case-studies/takonbini/media/catalog-seven-eleven-desktop.webp)

- Source: https://takonbini.com/?stores=%5B%22SevenEleven%22%5D&lang=en
- Viewport: 1440×1000. Encoded: 68,314 bytes.
- Purpose: show the real catalog, store filter and English/Japanese product labels.
- Placement: lead media after the summary, subject to final layout review.
- Alt: "Takonbini's English catalog with the 7-Eleven filter selected and three food product cards."
- Caption: "The catalog keeps store filters in the URL and shows translated names beside the original Japanese titles. Captured 1 November 2026; listings and availability can change."
- State: Shipped interface, measured capture. No universal availability claim.
- Review: final selection, third-party reproduction permission and caption approval pending.

### M02: Loaded desktop product dialog

[Candidate image](../../../content/case-studies/takonbini/media/detail-desktop.webp)

- Source: https://takonbini.com/products/6ea992752c5e0704d705b3842909eba3?limit=20&lang=en
- Viewport: 1440×1000. Encoded: 48,200 bytes.
- Purpose: show useful product detail over the retained browsing context.
- Placement: beside the product-focus/restoration discussion, loaded lazily.
- Alt: "A sweet-potato cream-puff product dialog over the catalog, with a photo, description, price, release date and Okinawa region."
- Caption: "Product details open over the catalog and retain a direct link. In the captured keyboard check, Escape returned focus to the originating product card."
- State: Shipped UI and one measured Chromium focus-return check.
- Review: final selection, retailer-photo reproduction permission and caption approval pending. The image does not prove keyboard behavior on its own.

### M03: Mobile product cards

[Candidate image](../../../content/case-studies/takonbini/media/catalog-food-mobile.webp)

- Source: M01's filtered catalog at 390×844, scrolled to the first food card.
- Encoded: 12,404 bytes.
- Purpose: show the responsive single-column treatment with real product content.
- Placement: responsive depth alongside M01; avoid downloading both as duplicate lead media.
- Alt: "The filtered Takonbini catalog at phone width with a full-width sweet-potato cream-puff product card."
- Caption: "At 390px, products use a single column. This capture had no horizontal overflow; it is not a complete physical-device audit."
- State: Measured viewport capture, not physical-touch acceptance.
- Review: final selection, retailer-photo reproduction permission and caption approval pending.

### M04: Mobile filter panel

[Candidate image](../../../content/case-studies/takonbini/media/filters-mobile.webp)

- Source: https://takonbini.com/?lang=en with Filters open.
- Viewport: 390×844. Encoded: 20,884 bytes.
- Purpose: show how store/category choices remain usable in the compact layout.
- Placement: optional depth discussing native controls, loaded lazily.
- Alt: "Takonbini's mobile filter panel with store and category checkboxes and visible Reset filters and Apply filters actions."
- Caption: "The mobile filter panel keeps explicit apply and reset actions visible while its choices scroll. A scoped axe scan reported no violations in this state; manual checks remain separate."
- State: Shipped interface and scoped measured automated scan.
- Review: final selection and caption approval pending. No whole-site compliance claim.

## Supporting captures

### M05: Japanese tablet catalog

[Candidate image](../../../content/case-studies/takonbini/media/catalog-ja-768.webp)

- Source: https://takonbini.com/?lang=ja
- Viewport: 768×1000. Encoded: 51,236 bytes.
- Purpose: verify an actual Japanese interface, not a mocked future portfolio locale.
- Alt: "Takonbini's Japanese catalog at tablet width, with Japanese search and store controls above real product cards."
- Caption: "The product has its own Japanese interface. This does not publish a Japanese version of the portfolio."
- Review: supporting evidence only; retailer/character artwork is present, so omit from the public narrative unless separately approved and needed.

### M06: Mobile catalog introduction

[Candidate image](../../../content/case-studies/takonbini/media/catalog-mobile.webp)

- Source: https://takonbini.com/?lang=en
- Viewport: 390×844. Encoded: 19,732 bytes.
- Purpose: context for compact heading, search and wrapped store controls.
- Alt: "Takonbini's English introduction, search and store controls at 390px, with the first product card beginning below."
- Caption: "The catalog's compact layout before scrolling into products."
- Review: supporting evidence only. The partial first product adds little to the story; prefer M03/M04 and omit this duplicate from initial publication.

## Rejected capture states

The first detail image showed "Loading product details" and was replaced by M02
after its actual content and image loaded. The first selected-store screenshot
showed a loading overlay over the previous results; it was replaced by M01 after
all mounted cards matched 7-Eleven and visible images had loaded. The initial
all-store desktop screenshot is retained locally as evidence, but M01 is the
recommended lead because it demonstrates a settled filter decision with food
products. No mock catalog, generated product image or prototype schematic is used.
