import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        border: 'var(--secondary)',
        input: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
        },
        icon: {
          background: 'var(--icon-background)',
          foreground: 'var(--foreground)',
        },
        chip: {
          background: 'var(--card-background)',
          foreground: 'var(--chip-foreground)',
        },
        timeline: 'var(--timeline)',
      },
    },
  },
  plugins: [],
};
export default config;
