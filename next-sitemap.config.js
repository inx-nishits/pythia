/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://www.pythiascorecard.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  trailingSlash: true,
  exclude: [
    '/manifest.json',
    '/icon*.png',
    '/icon*.svg',
    '/apple-icon.png',
    '/favicon.ico',
    '/api/*',
  ],
};

