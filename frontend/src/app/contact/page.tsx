import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact — NETA AI",
  description: "Talk to the NETA AI team about your AI automation strategy.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's design your <span className="text-gradient">AI roadmap</span></>}
        description="Tell us about your operations. We'll map the highest-impact opportunities."
      />
      <ContactSection />
    </>
  );
}
