import { type NextConfig } from "next";

const allowedOrigin = process.env.ALLOWED_ORIGIN ?? "https://www.pythiascorecard.com";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  async rewrites() {
    return [
      { source: "/privacy-policy", destination: "/policies/privacy-policy" },
      { source: "/terms-of-use", destination: "/policies/terms-of-use" },
    ];
  },
  async redirects() {
    return [
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/faq/", destination: "/#faq", permanent: true },
      { source: "/policies/privacy-policy", destination: "/privacy-policy", permanent: true },
      { source: "/policies/terms-of-use", destination: "/terms-of-use", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // HSTS: Forces the browser to use HTTPS for the next year.
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // CSP: Defines which external resources are allowed to load.
          // IF YOU INTEGRATE NEW SERVICES (e.g. Meta Pixel, HubSpot, Intercom):
          // 1. Add their script domain to 'script-src'
          // 2. Add their tracking/API domain to 'connect-src'
          // 3. Add their image domain to 'img-src'
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://assets.calendly.com https://vitals.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com; img-src 'self' blob: data: https://res.cloudinary.com https://www.googletagmanager.com https://www.google-analytics.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; frame-src 'self' https://www.googletagmanager.com https://calendly.com; object-src 'none'; base-uri 'self';",
          },
          // Prevents the browser from sniffing the MIME type (Security hardening).
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Controls how much referrer info is sent when navigating to external sites.
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // Disables browser features like camera/microphone that this site doesn't use.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: allowedOrigin },
          { key: "Access-Control-Allow-Methods", value: "POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
          { key: "Access-Control-Max-Age", value: "86400" },
        ],
      },
    ];
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "www.pythiascorecard.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "./src/app/assets/**/*.svg": {
        as: "*.js",
        loaders: ["@svgr/webpack"],
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      include: /app[\\\/]assets/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
