/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  assetPrefix: undefined,
  poweredByHeader: false,
};

export default nextConfig;
