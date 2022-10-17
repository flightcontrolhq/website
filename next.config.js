const invariant = require('tiny-invariant')

const withMakeswiftInitializer = require('@makeswift/runtime/next/plugin')

const withMakeswift = withMakeswiftInitializer()
const { DOCS_URL } = process.env

module.exports = withMakeswift({
  reactStrictMode: true,
  images: {
    domains: ['*.motif.land', 'res.cloudinary.com', 'cdn.sanity.io'],
  },
  async rewrites() {
    invariant(DOCS_URL, 'DOCS_URL env var is not defined.')
    return {
      beforeFiles: [
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
})
