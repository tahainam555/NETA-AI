"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import showcase from "@/assets/ai-showcase.jpg";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { solutions } from "@/lib/site-content";
import { aiSolutionRoute } from "@/lib/routes";

export function Showcase({ showHeader = true }: { showHeader?: boolean }) {
  const sectionPadding = showHeader ? "py-28 lg:py-36" : "py-20 lg:py-28";
  const gridSpacing = showHeader ? "mt-16" : "mt-10";

  return (
    <section className={`section-dark relative overflow-hidden ${sectionPadding}`}>
      <div className="pointer-events-none absolute inset-0 dot-bg-dark opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[820px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {showHeader && (
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(125,211,252,0.9)]" />
              Engineered Solutions
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[46px] lg:leading-[1.05]">
              AI Systems That Run <span className="text-gradient">Modern Operations</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/60">
              Orchestrated agents, secure integrations, and dashboards built for the enterprise.
            </p>
          </div>
        )}

        <div className={`${gridSpacing} grid gap-10 lg:grid-cols-12 lg:items-stretch`}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-7 h-full"
          >
            <div className="absolute -inset-6 rounded-[28px] bg-brand-blue/30 opacity-50 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--ink-2)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] h-full min-h-[300px]">
              <Image
                src={showcase}
                alt="AI orchestration network"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ink)]/60 via-transparent to-transparent" />
              {/* Floating chip */}
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-[var(--ink)]/80 px-3 py-1.5 text-[11.5px] text-white/85 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                Live · 4 Agents Collaborating
              </div>
            </div>
          </motion.div>

          <div className="space-y-3.5 lg:col-span-5">
            {solutions.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={aiSolutionRoute(f.slug)}
                  className="group flex gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur transition-all hover:border-brand-cyan/35 hover:bg-white/[0.05]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-brand text-white shadow-[0_0_24px_-6px_rgba(125,211,252,0.7)]">
                    <f.icon className="h-4.5 w-4.5" />
                  </span>
                  <div className="flex-1">
                    <h4 className="font-display text-[15px] font-semibold text-white">{f.title}</h4>
                    <p className="mt-1 text-[13px] leading-relaxed text-white/55">{f.desc}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
