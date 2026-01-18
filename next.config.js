/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Оптимизация заголовков для предварительного подключения
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://cdnjs.cloudflare.com>; rel=preconnect, <https://cdnjs.cloudflare.com>; rel=dns-prefetch',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
