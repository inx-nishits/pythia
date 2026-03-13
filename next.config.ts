import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
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
  images: {
    unoptimized: true
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
      include: /app[\\/]assets/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
