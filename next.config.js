/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.ezrahuang.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
