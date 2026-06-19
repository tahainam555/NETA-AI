import type { MetadataRoute } from "next";
import { blogPosts, caseStudies, services, solutions } from "@/lib/site-content";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
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
