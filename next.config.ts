import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [96, 160, 240, 320, 480, 640],
  },
  async redirects() {
    return [
      // Renamed by the website repositioning brief — keep old URLs working.
      {
        source: "/esports-academy",
        destination: "/academy-programmes/",
        permanent: true,
      },
      {
        source: "/esports-academy/",
        destination: "/academy-programmes/",
        permanent: true,
      },
      { source: "/pricing", destination: "/memberships/", permanent: true },
      { source: "/pricing/", destination: "/memberships/", permanent: true },
      { source: "/events", destination: "/arena-events/", permanent: true },
      { source: "/events/", destination: "/arena-events/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
