import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { Services } from "@/components/sections/Services";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "services-neta-ai",
  description: "AI automation, agents, workflow orchestration, chatbots, CRM and integrations.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={<>Four Core Offers. <span className="text-gradient">One Clear Outcome.</span></>}
        description="We don't offer vague AI consulting. Every service we deliver is a working system with a defined deliverable and a measurable result."
      />
      <Services showHeader={false} />
      <FinalCTA />
    </>
  );
}
