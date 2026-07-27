import { notFound } from 'next/navigation';

import { ResponsiveJourneyPrototype } from './responsive-journey-prototype';

interface TakonbiniPrototypePageProps {
  searchParams: Promise<{ journey?: string | string[] }>;
}

export default async function TakonbiniPrototypePage({
  searchParams,
}: TakonbiniPrototypePageProps) {
  if (process.env.NODE_ENV === 'production') notFound();

  const rawJourney = (await searchParams).journey;
  const journey = Array.isArray(rawJourney) ? rawJourney[0] : rawJourney;

  return <ResponsiveJourneyPrototype journey={journey} />;
}
