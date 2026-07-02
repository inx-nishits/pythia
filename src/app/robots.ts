import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/thank-you/',
        '/policies/',
      ],
    },
    sitemap: 'https://www.pythiascorecard.com/sitemap.xml',
  };
}
