import { careerPlaces } from '@/portfolio-content';

import { countries } from './map-countries';
import { land } from './map-land';

export function MapArtwork() {
  return (
    <svg
      className="home-map"
      viewBox="242 26 120 114"
      role="group"
      aria-label="Asia-Pacific career locations: Singapore, Japan and Malaysia. Kuala Lumpur and Singapore are neighboring cities."
    >
      <path
        d={land}
        fill="none"
        className="home-map-land"
        strokeWidth=".85"
        strokeLinecap="round"
      />
      {careerPlaces.map((place) =>
        place.id === 'singapore' ? (
          <circle
            key={place.id}
            data-map-country={place.id}
            aria-label={`Show companies in ${place.name}`}
            cx={place.longitude + 180}
            cy={90 - place.latitude}
            r="1.5"
            className="home-country-target"
          />
        ) : (
          <path
            key={place.id}
            data-map-country={place.id}
            aria-label={`Show companies in ${place.name}`}
            d={countries[place.name as keyof typeof countries]}
            className="home-country-target"
          />
        ),
      )}
      {careerPlaces.map((place) => (
        <g
          key={place.id}
          data-map-marker={place.id}
          aria-hidden="true"
          className="home-map-marker"
        >
          <circle cx={place.longitude + 180} cy={90 - place.latitude} r=".6" />
          <circle
            cx={place.longitude + 180}
            cy={90 - place.latitude}
            r="1.1"
            fill="none"
            strokeWidth=".18"
          />
        </g>
      ))}
    </svg>
  );
}
