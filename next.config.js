const invariant = require('tiny-invariant')
const withBlitz = require('@blitzjs/next').withBlitz

const withMakeswiftInitializer = require('@makeswift/runtime/next/plugin')

const withMakeswift = withMakeswiftInitializer()

module.exports = withBlitz(
  withMakeswift({
    reactStrictMode: true,
    images: {
      domains: ['s.mkswft.com', 'cdn.sanity.io', '*.motif.land', 'res.cloudinary.com'],
    },
    async rewrites() {
      const DOCS_URL = 'https://www.flightcontrol.dev'
      return {
        beforeFiles: [
          {
            source: '/home',
            destination: `/`,
          },
          {
            source: '/docs',
            destination: `${DOCS_URL}/docs`,
          },
          {
            source: '/docs/:path*',
            destination: `${DOCS_URL}/docs/:path*`,
          },
        ],
      }
    },
  }),
)
