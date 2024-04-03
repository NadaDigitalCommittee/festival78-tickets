const { join } = require("path");
/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public/manifest",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  sassOptions: {
    includePaths: [join(__dirname, "styles")],
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
