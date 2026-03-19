import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ['jspdf', 'fflate'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'sothebys-md.brightspotcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'dam.sothebys.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
      }
    ],
  },
};

export default nextConfig;
