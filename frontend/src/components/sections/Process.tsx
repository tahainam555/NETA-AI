"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Code, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Discovery",
    desc: "Audit workflows, map bottlenecks, define measurable outcomes.",
    icon: Search,
  },
  {
    n: "02",
    title: "Strategy",
    desc: "Design the agent architecture, data layer, and integration plan.",
    icon: Lightbulb,
  },
  {
    n: "03",
    title: "Build",
    desc: "Develop AI agents with evals, guardrails, and security-first design.",
    icon: Code,
  },
  {
    n: "04",
    title: "Integrate",
    desc: "Ship into CRM, support, sales and internal systems with observability.",
    icon: Zap,
  },
  {
    n: "05",
    title: "Optimize",
    desc: "Monitor, tune, and expand automation as results compound.",
    icon: TrendingUp,
  },
];

export function Process() {
  return (
    <section className="section-dark relative overflow-hidden py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(125,211,252,0.9)]" />
              How We Deliver
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[46px] lg:leading-[1.05]">
              The Blueprint For <span className="text-gradient">AI Automation</span>
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-white/55 lg:col-span-6">
            A five-stage delivery system built for enterprise reliability, security, and speed.
          </p>
        </div>

        <div className="relative mt-24">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-cyan/40 to-transparent lg:block" />
          <div className="space-y-14">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col items-center gap-10 lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"}`}
                >
                  <div className="flex-1">
                    <div className="relative rounded-2xl border border-white/[0.10] bg-white/[0.04] p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-cyan/35 hover:bg-white/[0.07]">
                      <div className="flex items-center gap-4">
                        <span className="font-display text-3xl font-semibold text-gradient">{step.n}</span>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>
                      <h3 className="mt-4 font-display text-[18px] font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">{step.desc}</p>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-blue shadow-[0_20px_50px_-20px_rgba(59,130,246,0.75)]">
                      <Icon className="h-7 w-7 text-white" />
                      <span className="absolute inset-0 rounded-2xl border border-white/30 opacity-40" />
                    </div>
                  </div>

                  <div className="hidden flex-1 lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
