"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "../SiteShell";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { caseStudies } from "@/lib/site-content";

export function CaseStudies({ showHeader = true }: { showHeader?: boolean }) {
  const sectionPadding = showHeader ? "py-28 lg:py-36" : "py-20 lg:py-28";
  const gridSpacing = showHeader ? "mt-16" : "mt-10";

  return (
    <section className={sectionPadding}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {showHeader && (
          <SectionHeader
            eyebrow="Proven Results"
            title={<>Outcomes That <span className="text-gradient">Drive Growth</span></>}
            description="Real deployments with measurable enterprise results."
          />
        )}

        <div className={`${gridSpacing} grid gap-6 lg:grid-cols-3`}>
          {caseStudies.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/case-studies/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <Image
                    src={c.img}
                    alt={c.title}
                    width={1024}
                    height={768}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/85 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
                    {c.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[18px] font-semibold leading-snug tracking-tight text-foreground">
                    {c.title}
                  </h3>
                  <dl className="mt-4 space-y-3 text-[13.5px]">
                    <div>
                      <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Challenge</dt>
                      <dd className="mt-1 text-foreground/80">{c.challenge}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Solution</dt>
                      <dd className="mt-1 text-foreground/80">{c.solution}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
                    {c.metrics.map((m) => (
                      <div key={m.v}>
                        <div className="font-display text-xl font-semibold text-gradient">{m.k}</div>
                        <div className="text-[11.5px] text-muted-foreground">{m.v}</div>
                      </div>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-[13px] font-medium text-primary transition-all group-hover:gap-1.5">
                    Read case study <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
