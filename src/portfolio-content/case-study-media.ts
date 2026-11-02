export type CaseStudyMedia = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export const takonbiniMedia = {
  catalog: {
    src: '/images/work/takonbini/catalog-seven-eleven-desktop.webp',
    width: 1440,
    height: 1000,
    alt: "Takonbini's English catalog with the 7-Eleven filter selected and three food product cards.",
    caption:
      'The catalog keeps store filters in the URL and shows translated names beside the original Japanese titles. Captured 1 November 2026; listings and availability can change.',
  },
  detail: {
    src: '/images/work/takonbini/detail-desktop.webp',
    width: 1440,
    height: 1000,
    alt: 'A sweet-potato cream-puff product dialog over the catalog, with a photo, description, price, release date and Okinawa region.',
    caption:
      'Product details open over the catalog and retain a direct link. In the captured keyboard check, Escape returned focus to the originating product card.',
  },
  mobile: {
    src: '/images/work/takonbini/catalog-food-mobile.webp',
    width: 390,
    height: 844,
    alt: 'The filtered Takonbini catalog at phone width with a full-width sweet-potato cream-puff product card.',
    caption:
      'At 390px, products use a single column. This capture had no horizontal overflow; it is not a complete physical-device audit.',
  },
  filters: {
    src: '/images/work/takonbini/filters-mobile.webp',
    width: 390,
    height: 844,
    alt: "Takonbini's mobile filter panel with store and category checkboxes and visible Reset filters and Apply filters actions.",
    caption:
      'The mobile filter panel keeps explicit apply and reset actions visible while its choices scroll. A scoped axe scan reported no violations in this state; manual checks remain separate.',
  },
} as const;
