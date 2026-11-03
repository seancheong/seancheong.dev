import { isPublishedLocale } from './locales';

// Public career facts and the selected prototype's scope lines; no client work or metrics.
const career = [
  {
    id: 'guidewire',
    name: 'Guidewire',
    role: 'Senior Consultant',
    dates: 'April 2026–present',
    year: '2026',
    city: 'Kuala Lumpur, Malaysia',
    country: 'malaysia',
    logo: '/images/companies/guidewire.svg',
    scope: 'Current role in Kuala Lumpur.',
  },
  {
    id: 'woven',
    name: 'Woven by Toyota',
    role: 'Senior Software Engineer',
    dates: '2023–April 2026',
    year: '2023',
    city: 'Tokyo, Japan',
    country: 'japan',
    logo: '/images/companies/woven.png',
    scope: 'Building product interfaces inside a global mobility company.',
  },
  {
    id: 'asurion',
    name: 'Asurion',
    role: 'Frontend Team Lead',
    dates: '2018–2023',
    year: '2018',
    city: 'Tokyo, Japan',
    country: 'japan',
    logo: '/images/companies/asurion.svg',
    scope: 'Five years leading frontend teams across shipped product work.',
  },
  {
    id: 'thermo',
    name: 'Thermo Fisher Scientific',
    role: 'Software Engineer II',
    dates: '2015–2018',
    year: '2015',
    city: 'Singapore',
    country: 'singapore',
    logo: '/images/companies/thermofisher.svg',
    scope: 'Delivered software across frontend, backend, and cloud boundaries.',
  },
  {
    id: 'fuji',
    name: 'Fuji Xerox',
    role: 'Software Engineer',
    dates: '2011–2015',
    year: '2011',
    city: 'Singapore',
    country: 'singapore',
    logo: '/images/fujixerox.png',
    scope: 'Built the engineering foundation for a long frontend career.',
  },
] as const;
export type CareerEntry = (typeof career)[number];
export const careerPlaces = [
  {
    id: 'singapore',
    name: 'Singapore',
    city: 'Singapore',
    dates: '2011–2018',
    longitude: 103.82,
    latitude: 1.35,
  },
  {
    id: 'japan',
    name: 'Japan',
    city: 'Tokyo',
    dates: '2018–April 2026',
    longitude: 139.69,
    latitude: 35.68,
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    city: 'Kuala Lumpur',
    dates: 'April 2026–present',
    longitude: 101.69,
    latitude: 3.14,
  },
] as const;
export function getHomeContent(locale: string) {
  if (!isPublishedLocale(locale)) return { status: 'not-found' as const };
  return {
    status: 'found' as const,
    value: {
      career,
      positioning:
        'Senior frontend engineer with 15 years of experience building applications at global companies.',
      supporting:
        'Five years leading frontend teams, from requirements through launch and maintenance.',
      leadership: [
        {
          title: '15 years building software',
          description:
            'Experience across global companies, now working as a Senior Consultant at Guidewire.',
        },
        {
          title: 'Five years leading frontend teams',
          description:
            'Frontend Team Lead at Asurion, alongside hands-on engineering.',
        },
        {
          title: 'From requirements to maintenance',
          description:
            'Experience across the full software development lifecycle.',
        },
      ],
      takonbini: {
        problem:
          'While living in Japan, I wanted to find the new food at the Lawson near my home. Takonbini grew out of that everyday question.',
        role: 'A personal project: I own the product decisions and implementation.',
        outcomes: [
          'Filter the catalog by convenience-store chain and food category.',
          'Read product details across English, Japanese and Traditional Chinese.',
          'Browse a bounded catalog window instead of rendering every loaded product.',
        ],
        limitation:
          'Accessibility, performance and operational readiness work remains. The case study separates verified behavior from remaining work.',
      },
    },
  };
}
