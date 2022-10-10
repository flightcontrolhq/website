export default {
  navbar: {
    topLinks: [
      { title: 'Dashboard', href: 'https://app.flightcontrol.dev' },
      { title: 'Create Account', href: 'https://app.flightcontrol.dev/signup' },
    ],
    tabs: [
      { title: 'Documentation', href: '/docs/guides/get-started' },
      {
        title: 'HTTP API',
        href: '/docs/http-api',
      },
      { title: 'Troubleshooting', href: '/docs/troubleshooting' },
      { title: 'Changelog', href: '/docs/changelog' },
      // Add roadmap
      // { title: "Roadmap", href: "/roadmap" },
    ],
  },
  sidebars: {
    documentation: [
      {
        title: 'Get started',
        href: '/docs/guides/get-started',
        pages: [
          {
            title: 'Setting up your first project',
            href: '/docs/guides/get-started/first-project',
          },
          {
            title: 'Supported services',
            href: '/docs/guides/get-started/services',
          },
        ],
      },
      {
        title: 'Configuration',
        href: '/docs/guides/config',
        pages: [
          {
            title: 'Using a file',
            href: '/docs/guides/config/using-a-file',
          },
          {
            title: 'Using the GUI',
            href: '/docs/guides/config/using-the-gui',
          },
        ],
      },
      {
        title: 'Advanced',
        pages: [
          {
            title: 'Custom Domains',
            href: '/docs/guides/advanced/custom-domains',
          },
          {
            title: 'Fargate Port Change',
            href: '/docs/guides/advanced/fargate-port-change',
          },
          {
            title: 'Service Dependency',
            href: '/docs/guides/advanced/service-dependency',
          },
          {
            title: 'Stale While Revalidate',
            href: '/docs/guides/advanced/swr',
          },
        ],
      },
      {
        title: 'Datadog Integration',
        pages: [
          {
            title: 'Datadog/AWS Setup',
            href: '/docs/guides/datadog/setup',
          },
          {
            title: 'Support for fargate',
            href: '/docs/guides/datadog/support-for-fargate',
          },
        ],
      },
      {
        title: 'Miscellaneous',
        pages: [
          {
            title: 'How to get free AWS credits',
            href: '/docs/guides/miscellaneous/aws-credits',
          },
        ],
      },
      {
        title: 'Examples',
        href: '/docs/guides/examples',
        pages: [
          {
            title: 'Blitz app',
            href: '/docs/guides/examples/blitz',
          },
          {
            title: 'Docker',
            href: '/docs/guides/examples/docker',
          },
          {
            title: 'Next.js',
            href: '/docs/guides/examples/nextjs',
          },
          {
            title: 'Node',
            href: '/docs/guides/examples/node',
          },
          {
            title: 'Redwood',
            href: '/docs/guides/examples/redwood',
          },
          {
            title: 'Remix',
            href: '/docs/guides/examples/remix',
          },
          {
            title: 'Prisma Studio',
            href: '/docs/guides/examples/prisma-studio',
          },
        ],
      },
    ],
    'http-api': [
      {
        title: 'Authorization',
        pages: [
          {
            title: 'Get your API Keys',
            href: '/docs/http-api/authorization/api-keys',
          },
        ],
      },
      {
        title: 'Cloudfront Cache',
        pages: [
          {
            title: 'Invalidation',
            href: '/docs/http-api/cloudfront/cache-invalidation-api',
          },
          {
            title: 'Invalidation Status',
            href: '/docs/http-api/cloudfront/cache-invalidation-status-api',
          },
        ],
      },
    ],
  },
}
