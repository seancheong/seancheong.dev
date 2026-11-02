import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { inlineCss: true },
  outputFileTracingIncludes: { '/*': ['./content/case-studies/**/*.mdx'] },
};

export default withNextIntl(nextConfig);
