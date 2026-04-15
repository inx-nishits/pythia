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
      { source: "/policies/privacy-policy", destination: "/privacy-policy", permanent: true },
      { source: "/policies/terms-of-use", destination: "/terms-of-use", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
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
    unoptimized: false
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
