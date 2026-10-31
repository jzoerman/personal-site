import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const pages = [
      "interests",
      "ai",
      "solar",
      "hydroponics",
      "aquascapes",
      "faith",
      "musings",
      "musing-ai",
      "musing-hydroponics",
      "musing-aquascapes",
      "elsewhere",
    ];
    return [
      { source: "/index.html", destination: "/", permanent: true },
      ...pages.map((page) => ({
        source: `/${page}.html`,
        destination: `/${page}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
