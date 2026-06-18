"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="section-dark relative overflow-hidden rounded-[28px] p-10 lg:p-20"
        >
          {/* glows */}
          <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-brand-blue/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-brand-purple/25 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-top" />

          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_12px_rgba(125,211,252,0.9)]" />
              Get Started
            </span>
            <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[54px] lg:leading-[1.04]">
              Ready To Turn AI <span className="text-gradient">Into Revenue</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-white/60">
              Deploy AI automation systems tailored to your business model, existing CRM, and specific revenue goals.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary group">
                <Calendar className="h-4 w-4" />
                Book a strategy call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/case-studies" className="btn-ghost-dark">
                See enterprise case studies
              </Link>
            </div>
            <p className="mt-6 text-[12px] text-white/40">
              SOC2-aligned · SSO/SAML · Private VPC deployments available
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
