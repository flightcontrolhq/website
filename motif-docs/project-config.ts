export default {
  navbar: {
    topLinks: [
      { title: "Dashboard", href: "https://app.flightcontrol.dev" },
      { title: "Create Account", href: "https://app.flightcontrol.dev/signup" },
    ],
    tabs: [
      { title: "Documentation", href: "/documentation/get-started" },
      {
        title: "HTTP API",
        href: "/http-api",
      },
      { title: "Troubleshooting", href: "/troubleshooting" },
      { title: "Changelog", href: "/changelog" },
      // Add roadmap
      // { title: "Roadmap", href: "/roadmap" },
    ],
  },
  sidebars: {
    documentation: [
      {
        title: "Get started",
        href: "/documentation/get-started",
        pages: [
          {
            title: "Setting up your first project",
            href: "/documentation/get-started/first-project",
          },
          {
            title: "Supported services",
            href: "/documentation/get-started/services",
          },
        ],
      },
      {
        title: "Configuration",
        href: "/documentation/config",
        pages: [
          {
            title: "Using a file",
            href: "/documentation/config/using-a-file",
          },
          {
            title: "Using the GUI",
            href: "/documentation/config/using-the-gui",
          },
        ],
      },
      {
        title: "Advanced",
        pages: [
          {
            title: "Custom Domains",
            href: "/documentation/advanced/custom-domains",
          },
          {
            title: "Fargate Port Change",
            href: "/documentation/advanced/fargate-port-change",
          },
          {
            title: "Service Dependency",
            href: "/documentation/advanced/service-dependency",
          },
          {
            title: "Stale While Revalidate",
            href: "/documentation/advanced/swr",
          },
        ],
      },
      {
        title: "Datadog Integration",
        pages: [
          {
            title: "Datadog/AWS Setup",
            href: "/documentation/datadog/setup",
          },
          {
            title: "Support for fargate",
            href: "/documentation/datadog/support-for-fargate",
          },
        ],
      },
      {
        title: "Miscellaneous",
        pages: [
          {
            title: "How to get free AWS credits",
            href: "/documentation/miscellaneous/aws-credits",
          },
        ],
      },
      {
        title: "Examples",
        href: "/documentation/examples",
        pages: [
          {
            title: "Blitz app",
            href: "/documentation/examples/blitz",
          },
          {
            title: "Docker",
            href: "/documentation/examples/docker",
          },
          {
            title: "Next.js",
            href: "/documentation/examples/nextjs",
          },
          {
            title: "Node",
            href: "/documentation/examples/node",
          },
          {
            title: "Redwood",
            href: "/documentation/examples/redwood",
          },
          {
            title: "Remix",
            href: "/documentation/examples/remix",
          },
          {
            title: "Prisma Studio",
            href: "/documentation/examples/prisma-studio",
          },
        ],
      },
    ],
    "http-api": [
      {
        title: "Authorization",
        pages: [
          {
            title: "Get your API Keys",
            href: "/http-api/authorization/api-keys",
          },
        ],
      },
      {
        title: "Cloudfront Cache",
        pages: [
          {
            title: "Invalidation",
            href: "/http-api/cloudfront/cache-invalidation-api",
          },
          {
            title: "Invalidation Status",
            href: "/http-api/cloudfront/cache-invalidation-status-api",
          },
        ],
      },
    ],
  },
};
