const invariant = require('tiny-invariant')
const withBlitz = require('@blitzjs/next').withBlitz

const withMakeswiftInitializer = require('@makeswift/runtime/next/plugin')

const withMakeswift = withMakeswiftInitializer()
const { DOCS_URL } = process.env

console.log('DOCS_URL', DOCS_URL)
module.exports = withBlitz(
  withMakeswift({
    reactStrictMode: true,
    images: {
      domains: ['s.mkswft.com', 'cdn.sanity.io', '*.motif.land', 'res.cloudinary.com'],
    },
    async rewrites() {
      invariant(DOCS_URL, 'DOCS_URL env var is not defined.')
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
