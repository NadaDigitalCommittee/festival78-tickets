/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [require("path").join(__dirname, "styles")],
  },
  output: "standalone",
};

module.exports = nextConfig;
