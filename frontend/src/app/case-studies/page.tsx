import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Case Studies — NETA AI",
  description: "Real AI deployments. Measured results. See how NETA AI transforms enterprise operations.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={<>Outcomes From <span className="text-gradient">Real AI Deployments</span></>}
        description="See how teams automate operations, support, and revenue with NETA AI."
      />
      <CaseStudies showHeader={false} />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
