import type { MetadataRoute } from "next";
import { blogPosts, caseStudies, services, solutions } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://neta.ai";
  const routes = [
    "/",
    "/about",
    "/services",
    "/ai-solutions",
    "/case-studies",
    "/blogs",
    "/contact",
    ...services.map((service) => `/services/${service.slug}`),
    ...solutions.map((solution) => `/ai-solutions/${solution.slug}`),
    ...caseStudies.map((study) => `/case-studies/${study.slug}`),
    ...blogPosts.map((post) => `/blogs/${post.slug}`),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
