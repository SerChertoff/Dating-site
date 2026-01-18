/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Оптимизация изображений
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'cdnjs.cloudflare.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Оптимизация компиляции
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Оптимизация заголовков - только критические preconnect
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://images.unsplash.com>; rel=preconnect',
          },
        ],
      },
    ];
  },
  // Оптимизация экспериментальных функций
  experimental: {
    optimizePackageImports: ['@/components'],
  },
}

module.exports = nextConfig
