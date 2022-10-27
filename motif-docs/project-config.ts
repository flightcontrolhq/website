const mainSidebar = [
  {
    title: 'Get started',
    href: '/guides/get-started',
    pages: [
      {
        title: 'Setting Up Your First Project',
        href: '/guides/get-started/first-project',
      },
      {
        title: 'Supported Services',
        href: '/guides/get-started/services',
      },
      {
        title: 'How to get AWS credits',
        href: '/guides/get-started/aws-credits',
      },
    ],
  },
  {
    title: 'Configuration',
    href: '/guides/config',
    pages: [
      {
        title: 'Using Code',
        href: '/guides/config/using-code',
      },
      {
        title: 'Using UI',
        href: '/guides/config/using-ui',
      },
      {
        title: 'Preview Environments',
        href: '/guides/config/preview-environment',
      },
      {
        title: 'Monorepos',
        href: '/guides/config/monorepos',
      },
    ],
  },
  {
    title: 'Experimental',
    pages: [
      {
        title: 'Maintenance Mode',
        href: '/guides/experimental/maintenance-mode',
      },
    ],
  },
  {
    title: 'Advanced',
    pages: [
      {
        title: 'Custom Domains',
        href: '/guides/advanced/custom-domains',
      },
      {
        title: 'Fargate Port Change',
        href: '/guides/advanced/fargate-port-change',
      },
      {
        title: 'Service Dependency',
        href: '/guides/advanced/service-dependency',
      },
      {
        title: 'Stale While Revalidate',
        href: '/guides/advanced/swr',
      },
    ],
  },
  {
    title: 'Datadog Integration',
    pages: [
      {
        title: 'Datadog/AWS Setup',
        href: '/guides/datadog/setup',
      },
      {
        title: 'Support for fargate',
        href: '/guides/datadog/support-for-fargate',
      },
    ],
  },
  {
    title: 'Examples',
    href: '/guides/examples',
    pages: [
      {
        title: 'Blitz app',
        href: '/guides/examples/blitz',
      },
      {
        title: 'Docker',
        href: '/guides/examples/docker',
      },
      {
        title: 'Next.js',
        href: '/guides/examples/nextjs',
      },
      {
        title: 'Node',
        href: '/guides/examples/node',
      },
      {
        title: 'Redwood',
        href: '/guides/examples/redwood',
      },
      {
        title: 'Remix',
        href: '/guides/examples/remix',
      },
      {
        title: 'Prisma Studio',
        href: '/guides/examples/prisma-studio',
      },
    ],
  },
]

//eslint-disable-next-line import/no-anonymous-default-export
export default {
  navbar: {
    topLinks: [
      { title: 'Dashboard', href: 'https://app.flightcontrol.dev' },
      { title: 'Create Account', href: 'https://app.flightcontrol.dev/signup' },
    ],
    tabs: [
      { title: 'Documentation', href: '/guides/get-started' },
      {
        title: 'API',
        href: '/http-api',
      },
      { title: 'Troubleshooting', href: '/troubleshooting/concurrency-limit' },
      { title: 'Changelog', href: '/changelog' },
      // Add roadmap
      // { title: "Roadmap", href: "/roadmap" },
    ],
  },
  sidebars: {
    '': mainSidebar,
    guides: mainSidebar,
    'http-api': [
      {
        title: 'Authorization',
        pages: [
          {
            title: 'Get your API Keys',
            href: '/http-api/authorization/api-keys',
          },
        ],
      },
      {
        title: 'Cloudfront Cache',
        pages: [
          {
            title: 'Invalidation',
            href: '/http-api/cloudfront/cache-invalidation-api',
          },
          {
            title: 'Invalidation Status',
            href: '/http-api/cloudfront/cache-invalidation-status-api',
          },
        ],
      },
    ],
    'troubleshooting': [
      {
        title: 'Common Issues',
        pages: [
          {
            title: 'Reached Concurrency Limit on the number of tasks',
            href: '/troubleshooting/concurrency-limit',
          },
          {
            title: 'Deployment Errors',
            href: '/troubleshooting/deployment-errors',
          },
          {
            title: 'Unusually long deploys. Like 30 min instead of normal 10 min',
            href: '/troubleshooting/long-deploys',
          },
        ]
      }    
    ]
  },
}
