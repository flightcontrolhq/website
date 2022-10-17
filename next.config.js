const withMakeswiftInitializer = require('@makeswift/runtime/next/plugin')

const withMakeswift = withMakeswiftInitializer()
const { DOCS_URL } = process.env

module.exports = withMakeswift({
  reactStrictMode: true,
  images: {
    domains: ['s.mkswft.com', '*.motif.land', 'res.cloudinary.com'],
  },
  async rewrites() {
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
