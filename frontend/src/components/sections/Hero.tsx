"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Activity, Zap, Bot } from "lucide-react";
import heroImg from "@/assets/hero-dashboard.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-radial" />
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-[0.10] blur-3xl" />
      <div className="absolute top-40 -right-20 h-72 w-72 rounded-full bg-brand-purple/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-24 lg:px-8 lg:pt-28 lg:pb-32">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Built by Builders. Obsessed with Outcomes.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 font-display text-[40px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[52px] lg:text-[60px]"
            >
              We Turn AI Adoption <br />
              <span className="text-gradient">Into Revenue.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-xl text-[16px] leading-relaxed text-muted-foreground"
            >
              Most businesses use AI. Very few make money from it. We design, build, and manage done-for-you automation systems that qualify leads, accelerate follow-up, and drive measurable growth around the clock.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="/contact" className="btn-primary group">
                Book a strategy call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/services" className="btn-ghost">
                Explore Our Services
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 grid max-w-md grid-cols-3 gap-6"
            >
              {[
                { k: "88%", v: "Marketers use AI" },
                { k: "6%", v: "See actual ROI" },
                { k: "24/7", v: "Done-for-you systems" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl font-semibold text-foreground">{s.k}</div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: visual */}
          <div className="relative lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[28px] bg-gradient-brand opacity-20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-elevated">
                <Image
                  src={heroImg}
                  alt="AI workflow automation dashboard"
                  width={1536}
                  height={1152}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/30" />
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 top-10 hidden w-[230px] rounded-xl border border-border bg-white/90 p-3.5 shadow-elevated backdrop-blur sm:block"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-white">
                    <Bot className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <div className="text-[12.5px] font-semibold">AI Agent · Live</div>
                    <div className="text-[11px] text-muted-foreground">Resolved 1,284 tickets</div>
                  </div>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[78%] rounded-full bg-gradient-brand" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-4 bottom-10 hidden w-[210px] rounded-xl border border-border bg-white/90 p-3.5 shadow-elevated backdrop-blur sm:block"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-primary">
                    <Activity className="h-4 w-4" />
                  </span>
                  <div className="flex-1">
                    <div className="text-[12.5px] font-semibold">Pipeline throughput</div>
                    <div className="text-[11px] text-muted-foreground">+42% this week</div>
                  </div>
                </div>
                <div className="mt-3 flex items-end gap-1">
                  {[35, 50, 42, 68, 55, 80, 72].map((h, i) => (
                    <span
                      key={i}
                      className="w-2.5 rounded-sm bg-gradient-to-t from-brand-cyan to-brand-blue"
                      style={{ height: `${h * 0.4}px` }}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-5 left-10 hidden items-center gap-2 rounded-full border border-border bg-white px-3 py-2 shadow-elevated sm:inline-flex"
              >
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span className="text-[12px] font-medium">Workflow synced · 2s ago</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
