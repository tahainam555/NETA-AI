import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/about-neta-ai", permanent: true },
      { source: "/services", destination: "/services-neta-ai", permanent: true },
      { source: "/services/:slug", destination: "/services-neta-ai/:slug", permanent: true },
      { source: "/ai-solutions", destination: "/ai-solutions-neta-ai", permanent: true },
      { source: "/ai-solutions/:slug", destination: "/ai-solutions-neta-ai/:slug", permanent: true },
      { source: "/case-studies", destination: "/case-studies-neta-ai", permanent: true },
      { source: "/case-studies/:slug", destination: "/case-studies-neta-ai/:slug", permanent: true },
      { source: "/blogs", destination: "/blogs-neta-ai", permanent: true },
      { source: "/blogs/:slug", destination: "/blogs-neta-ai/:slug", permanent: true },
      { source: "/contact", destination: "/contact-neta-ai", permanent: true },
    ];
  },
};

export default nextConfig;
