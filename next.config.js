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
      return {
        beforeFiles: [
          {
            source: '/home',
            destination: `/`,
          },
        ],
      }
    },
  }),
)
