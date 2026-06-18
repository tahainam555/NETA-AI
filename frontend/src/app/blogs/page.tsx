import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { Blogs } from "@/components/sections/Blogs";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Blogs — NETA AI",
  description: "Insights on AI agents, automation and enterprise operations from the NETA AI team.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Blogs"
        title={<>Field notes on <span className="text-gradient">AI and automation</span></>}
        description="Long-form thinking, technical deep-dives, operator-grade playbooks."
      />
      <Blogs showHeader={false} />
      <FinalCTA />
    </>
  );
}
