const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NEXT_BUNDLE_ANALYZE_ENABLED === 'true',
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['page.tsx', 'api.ts'],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      ...(process.env.NEXT_PUBLIC_MSW_ENABLED === 'true'
        ? ['cdn.fakercloud.com', 'placeimg.com']
        : []),
    ],
  },
  i18n: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },
};

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
