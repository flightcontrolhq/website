/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.flightcontrol.dev',
  generateRobotsTxt: true,
  exclude: ['/health'],
  changefreq: 'hourly',
  priority: 0.75,
}

export default config
