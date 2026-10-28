import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: { '/*': ['./content/case-studies/**/*.mdx'] },
};

export default withNextIntl(nextConfig);
