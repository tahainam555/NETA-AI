import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { Showcase } from "@/components/sections/Showcase";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "AI Solutions — NETA AI",
  description: "Multi-agent orchestration, intelligent pipelines and connected dashboards for enterprise operations.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="AI Solutions"
        title={<>Real Problems. <span className="text-gradient">Engineered Solutions.</span></>}
        description="Every system we build is anchored to a specific, costly business problem. Here is how we solve them."
      />
      <Showcase showHeader={false} />
      <WhyChoose />
      <FinalCTA />
    </>
  );
}
