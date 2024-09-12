import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: '*.svgrepo.com'
      }
    ]
  }
}

export default withNextIntl(nextConfig)
