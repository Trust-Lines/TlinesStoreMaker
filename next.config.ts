import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Project photos added from the ERP live on ImageKit.
    remotePatterns: [{ protocol: "https", hostname: "ik.imagekit.io" }],
  },
};

export default nextConfig;
