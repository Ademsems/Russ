import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Legacy /Solutions URLs (from the previous site) still get crawled and 404. Redirect matching is case-insensitive, so this covers /Solutions, /solutions and any trailing slash.
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
