"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const items = [
  {
    quote:
      "NETA AI replaced three siloed tools with one adaptive automation layer. Our ops team finally spends time on strategy instead of cleanup work.",
    name: "James Morrison",
    role: "Director of Operations",
    company: "Novalink Logistics",
  },
  {
    quote:
      "Their agents resolve 90% of our tier-1 support with the tone of our best human reps. CSAT is up 38 points and handle time is down 61%.",
    name: "Sarah Jenkins",
    role: "Customer Success Manager",
    company: "BrightPath Education",
  },
  {
    quote:
      "Production-ready in six weeks. The team is rigorous, fast, and treats security and evals as first-class engineering work.",
    name: "Michael Chang",
    role: "Founder & CEO",
    company: "Oakwood Retail Solutions",
  },
];

export function Testimonials() {
  return (
    <section className="section-dark relative overflow-hidden py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-top opacity-50" />
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-brand-blue/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(125,211,252,0.9)]" />
            Client Success
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[46px] lg:leading-[1.05]">
            What <span className="text-gradient">Our Clients Say</span>
          </h2>
        </div>

        <div className="mt-24 grid gap-5 lg:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-cyan/30 hover:bg-white/[0.05]"
            >
              <Quote className="h-5 w-5 text-brand-cyan/60" />
              <blockquote className="mt-4 text-[14.5px] leading-relaxed text-white/85">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand font-display text-sm font-semibold text-white shadow-[0_0_18px_-4px_rgba(125,211,252,0.7)]">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="text-[13.5px] font-semibold text-white">{t.name}</div>
                  <div className="text-[12px] text-white/50">
                    {t.role} · <span className="text-white/70">{t.company}</span>
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
