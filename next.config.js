const withMakeswiftInitializer = require('@makeswift/runtime/next/plugin')

const withMakeswift = withMakeswiftInitializer()
const { APP_ORIGIN } = process.env

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
          destination: `${APP_ORIGIN}:4000/docs`,
        },
        {
          source: '/docs/:path*',
          destination: `${APP_ORIGIN}:4000/docs/:path*`,
        },
      ],
    }
  },
})
