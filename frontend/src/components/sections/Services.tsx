"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../SiteShell";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/site-content";
import { serviceRoute } from "@/lib/routes";

export function Services({ showHeader = true }: { showHeader?: boolean }) {
  const sectionPadding = showHeader ? "py-28 lg:py-36" : "py-20 lg:py-28";
  const gridSpacing = showHeader ? "mt-24" : "mt-16";

  return (
    <section id="services" className={`relative ${sectionPadding}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {showHeader && (
          <SectionHeader
            eyebrow="Services"
            title={<>Four Core Offers. <span className="text-gradient">One Clear Outcome.</span></>}
            description="Every service we deliver is a working system with a defined deliverable, a transparent price, and a measurable result."
          />
        )}

        <div className={`${gridSpacing} grid gap-5 sm:grid-cols-2`}>
          {services.map((s, i) => {
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={serviceRoute(s.slug)}
                  className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated lg:p-8"
                >
                  <div className="absolute inset-x-0 -top-12 h-24 bg-gradient-to-b from-brand-cyan/0 via-brand-cyan/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:from-brand-cyan/20 group-hover:via-brand-blue/10 group-hover:opacity-100" />
                  <div className="relative">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-secondary/60 text-primary transition-all group-hover:border-primary/30 group-hover:bg-gradient-brand group-hover:text-white">
                      <s.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-6 font-display font-semibold tracking-tight text-foreground text-[20px] lg:text-[22px]">
                      {s.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground text-[14.5px] max-w-lg">
                      {s.desc}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-[13px] font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
