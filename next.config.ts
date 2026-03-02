import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',
  trailingSlash: true,
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
