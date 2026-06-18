import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "About — NETA AI",
  description: "NETA AI is an enterprise AI automation company building intelligent systems for modern businesses.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>Built by Builders. <span className="text-gradient">Obsessed with Outcomes.</span></>}
        description="We are an AI marketing automation agency that turns AI adoption into measurable business revenue."
      />
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
          {[
            { k: "Our Mission", v: "To make AI marketing automation accessible, outcome-driven, and genuinely profitable for every business we work with." },
            { k: "Our Vision", v: "A world where businesses of every size can run enterprise-grade automation systems — without the enterprise budget, the lengthy integration timeline, or the in-house technical team." },
            { k: "Our Team", v: "Founded by a team of four specialists in automation engineering, growth strategy, content, and operations." },
            { k: "Our Promise", v: "Defined scope, honest timelines, and weekly progress reports. We price for the outcome we deliver, not the hours we spend." },
          ].map((b) => (
            <div key={b.k} className="rounded-2xl border border-border bg-white p-8 shadow-card">
              <h3 className="font-display text-xl font-semibold">{b.k}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{b.v}</p>
            </div>
          ))}
        </div>
      </section>
      <WhyChoose />
      <Process />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
