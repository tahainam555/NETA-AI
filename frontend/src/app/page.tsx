import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Process } from "@/components/sections/Process";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Testimonials } from "@/components/sections/Testimonials";
import { Blogs } from "@/components/sections/Blogs";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "NETA AI — Intelligent AI Systems for Modern Businesses",
  description:
    "NETA AI builds enterprise-grade AI agents and automation systems that streamline operations, support, sales and workflows.",
};

export default function Page() {
  return (
    <>
      <Hero />
      <Trust />
      <Services />
      <Showcase />
      <CaseStudies />
      <Process />
      <WhyChoose />
      <Testimonials />
      <Blogs />
      <FinalCTA />
    </>
  );
}
