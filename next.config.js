const { join } = require("path");
/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public/manifest",
});

const nextConfig = {
  sassOptions: {
    includePaths: [join(__dirname, "styles")],
  },
  output: "standalone",
};

module.exports = withPWA(nextConfig);
