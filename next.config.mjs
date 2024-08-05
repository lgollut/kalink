import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
        port: '',
        pathname: '/kalink/**',
      },
    ],
  },
};

export default withVanillaExtract(nextConfig);
