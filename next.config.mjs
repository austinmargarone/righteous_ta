/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.coingecko.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.coinranking.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
