import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Project photos added from the ERP live on ImageKit.
    remotePatterns: [{ protocol: "https", hostname: "ik.imagekit.io" }],
  },
  async redirects() {
    // "News" in the nav and footer shares the Blog & News page; a permanent redirect passes
    // search-engine value to /blog instead of leaving a duplicate page.
    return [
      { source: "/news", destination: "/blog", permanent: true },
      // The footer used to link to a page that does not exist; the only event on the site is the NACS banner.
      { source: "/events", destination: "/#nacs", permanent: false },
    ];
  },
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
    ];
    // Media in /public keeps stable names, so cache for a day and refresh in the background.
    const media = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];
    return [
      { source: "/:path*", headers: security },
      { source: "/videos/:path*", headers: media },
      { source: "/images/:path*", headers: media },
    ];
  },
};

export default nextConfig;
