import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export for Vercel deployment
  // Vercel handles Next.js natively, static export causes issues
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
