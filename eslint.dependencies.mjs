import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const restricted = (group, message) => ({ group, message });
const rules = (patterns) => ({
  'no-restricted-imports': ['error', { patterns }],
});

// These scopes become active as the approved modules replace legacy code.
const dependencyConfig = [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { parser: tsParser },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: { '@typescript-eslint/no-explicit-any': 'error' },
  },
  {
    files: ['src/portfolio-content/**/*.{ts,tsx}'],
    rules: rules([
      restricted(
        [
          'react',
          'react/**',
          'react-dom',
          'react-dom/**',
          '@/app/**',
          '@/journeys/**',
        ],
        'Portfolio Content returns data and must not depend on rendering or journeys.',
      ),
    ]),
  },
  ...['home', 'case-study', 'articles'].map((journey) => ({
    files: [`src/journeys/${journey}/**/*.{ts,tsx}`],
    rules: rules([
      restricted(
        [
          '@/app/**',
          ...['home', 'case-study', 'articles']
            .filter((name) => name !== journey)
            .flatMap((name) => [`@/journeys/${name}`, `@/journeys/${name}/**`]),
        ],
        'Journeys must not import routes or other journeys.',
      ),
    ]),
  })),
  {
    files: [
      'src/components/ui/**/*.{ts,tsx}',
      'src/portfolio-motion/**/*.{ts,tsx}',
    ],
    rules: rules([
      restricted(
        [
          '@/app/**',
          '@/journeys/**',
          '@/portfolio-content',
          '@/portfolio-content/**',
        ],
        'Generic UI and motion policy must not depend on portfolio content or journeys.',
      ),
    ]),
  },
];

export default dependencyConfig;
