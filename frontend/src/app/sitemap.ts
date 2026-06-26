import type { MetadataRoute } from "next";
import { blogPosts, caseStudies, services, solutions } from "@/lib/site-content";
import { getSiteUrl } from "@/lib/site-url";
import { aiSolutionRoute, blogRoute, caseStudyRoute, routes, serviceRoute } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const paths = [
    routes.home,
    routes.about,
    routes.services,
    routes.aiSolutions,
    routes.caseStudies,
    routes.blogs,
    routes.contact,
    ...services.map((service) => serviceRoute(service.slug)),
    ...solutions.map((solution) => aiSolutionRoute(solution.slug)),
    ...caseStudies.map((study) => caseStudyRoute(study.slug)),
    ...blogPosts.map((post) => blogRoute(post.slug)),
  ];

  return paths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
