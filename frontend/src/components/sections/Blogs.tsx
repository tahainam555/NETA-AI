"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SiteShell";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/site-content";

export function Blogs({ showHeader = true }: { showHeader?: boolean }) {
  const sectionPadding = showHeader ? "py-28 lg:py-36" : "py-20 lg:py-28";
  const gridSpacing = showHeader ? "mt-14" : "mt-10";

  return (
    <section className={sectionPadding}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {showHeader && (
          <div className="flex items-end justify-between gap-6">
            <SectionHeader
              align="left"
              eyebrow="Expert Insights"
              title={<>Ideas On <span className="text-gradient">AI And Operations</span></>}
              description="Research and field notes from production AI deployments."
            />
            <Link href="/blogs" className="btn-ghost hidden shrink-0 sm:inline-flex">
              All articles <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        <div className={`${gridSpacing} grid gap-5 lg:grid-cols-3`}>
          {blogPosts.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/blogs/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
              >
                <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${p.accent}`}>
                  <div className="absolute inset-0 grid-bg-dark opacity-60 mix-blend-overlay z-10" />
                  <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur z-20">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[11.5px] uppercase tracking-wider text-muted-foreground">
                    {p.date} · {p.read}
                  </div>
                  <h3 className="mt-3 font-display text-[18px] font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <span className="mt-auto pt-6 inline-flex items-center gap-1 text-[13px] font-medium text-primary">
                    Read article <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
