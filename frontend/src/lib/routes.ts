export const routes = {
  home: "/",
  about: "/about-neta-ai",
  services: "/services-neta-ai",
  aiSolutions: "/ai-solutions-neta-ai",
  caseStudies: "/case-studies-neta-ai",
  blogs: "/blogs-neta-ai",
  contact: "/contact-neta-ai",
} as const;

export const legacyRoutes = {
  about: "/about",
  services: "/services",
  aiSolutions: "/ai-solutions",
  caseStudies: "/case-studies",
  blogs: "/blogs",
  contact: "/contact",
} as const;

export function serviceRoute(slug: string) {
  return `${routes.services}/${slug}`;
}

export function aiSolutionRoute(slug: string) {
  return `${routes.aiSolutions}/${slug}`;
}

export function caseStudyRoute(slug: string) {
  return `${routes.caseStudies}/${slug}`;
}

export function blogRoute(slug: string) {
  return `${routes.blogs}/${slug}`;
}
