import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Legacy /Solutions URLs from the previous site still get crawled. Redirect matching is
  // case-insensitive and this pattern also matches the bare path and a trailing slash.
  // skipTrailingSlashRedirect stops Next's own "/x/ -> /x" 308 from running first, which
  // would otherwise make /Solutions/ a two-hop chain. Side effect: "/about/" now serves
  // 200 instead of redirecting; every page declares a canonical, so that's harmless for SEO.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: "/solutions/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
