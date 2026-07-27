export const prototypeContent = {
  nav: ['Experience', 'Projects', 'Articles'],
  positioning:
    'Senior frontend engineer with 15 years of experience building applications at global companies.',
  supporting:
    'Five years leading frontend teams and delivering products from requirements through launch and maintenance.',
  credibility: [
    { value: '15', label: 'years building software' },
    { value: '04', label: 'global companies' },
    { value: '05', label: 'years leading teams' },
    { value: 'JP', label: 'based in Tokyo' },
  ],
  outcomes: [
    'Localized filtering verified across English, Japanese, and Traditional Chinese',
    'Responsive filter workflow observed at desktop and mobile widths',
    'Light, dark, and system appearance controls verified',
  ],
  projects: [
    {
      name: 'Tripa',
      eyebrow: 'Selected project · Preview',
      summary:
        'A map-led travel journal for turning saved locations into personal stories.',
      evidence: 'Search → create → edit → delete verified',
      constraint: 'Mobile map collapse remains a known constraint',
      image: '/images/tripa.png',
    },
    {
      name: 'Script Blender',
      eyebrow: 'Selected project · Preview',
      summary:
        'A browser workspace for formatting and running JavaScript and TypeScript.',
      evidence: 'Execution, syntax errors, and package imports verified',
      constraint: 'Error announcements need accessibility follow-up',
      image: '/images/scriptblender.png',
    },
  ],
  experience: [
    {
      years: '2023—Now',
      role: 'Senior Software Engineer',
      company: 'Woven by Toyota · Tokyo',
      scope: 'Building product interfaces inside a global mobility company.',
    },
    {
      years: '2018—2023',
      role: 'Frontend Team Lead',
      company: 'Asurion · Tokyo',
      scope: 'Five years leading frontend teams across shipped product work.',
    },
    {
      years: '2015—2018',
      role: 'Software Engineer II',
      company: 'Thermo Fisher Scientific · Singapore',
      scope:
        'Delivered software across frontend, backend, and cloud boundaries.',
    },
    {
      years: '2011—2015',
      role: 'Software Engineer',
      company: 'Fuji Xerox · Singapore',
      scope: 'Built the engineering foundation for a long frontend career.',
    },
  ],
  articles: [
    'Stale-while-revalidate caching in practice',
    'Auto-save with custom React hooks',
    'Building a Vue task-management library',
  ],
} as const;

export const prototypeVariants = [
  { key: 'A', name: 'Product Ledger' },
  { key: 'B', name: 'Editorial Dispatch' },
  { key: 'C', name: 'Evidence Spine' },
] as const;

export type PrototypeVariant = (typeof prototypeVariants)[number]['key'];

export function normalizeVariant(value?: string): PrototypeVariant {
  const normalized = value?.toUpperCase();

  return normalized === 'B' || normalized === 'C' ? normalized : 'A';
}
