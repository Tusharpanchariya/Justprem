import type { NextConfig } from "next";

const nextConfig: any = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/harmonium-images/royalerose/:path*",
        destination: "/harmonium-images/radhaprema/:path*",
      },
      {
        source: "/harmonium-images/royal-rose/:path*",
        destination: "/harmonium-images/radhaprema/:path*",
      },
      {
        source: "/harmonium-images/agni/:path*",
        destination: "/harmonium-images/premagni/:path*",
      },
    ];
  },
};

export default nextConfig;
