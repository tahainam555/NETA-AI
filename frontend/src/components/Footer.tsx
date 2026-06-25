"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "./Logo";
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { apiUrl } from "@/lib/api";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch(apiUrl("/api/subscribe"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscription failed");
      
      setStatus("success");
      setEmail("");
      toast.success("Subscribed successfully!", {
        description: "You'll receive our next insights report.",
      });
    } catch {
      setStatus("idle");
      toast.error("Failed to subscribe.", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[var(--ink)] text-white/80">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline-top opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[800px] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-72 w-72 rounded-full bg-brand-purple/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo dark />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/55">
              NETA AI builds intelligent automation systems and autonomous agents
              for modern enterprises — from customer operations to revenue and analytics.
            </p>
            <form 
              onSubmit={handleSubscribe}
              className="mt-7 flex max-w-sm overflow-hidden rounded-full border border-white/[0.10] bg-white/[0.04] focus-within:border-brand-cyan/40 focus-within:ring-4 focus-within:ring-brand-blue/15"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get research-grade AI insights"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
              />
              <button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className="btn-primary group m-1 !px-4 !py-1.5 !text-xs cursor-pointer disabled:opacity-70 disabled:cursor-wait"
              >
                {status === "loading" ? "..." : status === "success" ? "Done" : "Subscribe"}
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <FooterCol
              title="Company"
              items={[
                { label: "About Us", to: "/about" },
                { label: "Case Studies", to: "/case-studies" },
                { label: "Blogs", to: "/blogs" },
                { label: "Contact", to: "/contact" },
              ]}
            />
            <FooterCol
              title="Solutions"
              items={[
                { label: "AI Automation", to: "/services" },
                { label: "AI Agents", to: "/ai-solutions" },
                { label: "Workflow Orchestration", to: "/services" },
                { label: "CRM Automation", to: "/services" },
              ]}
            />
            <FooterCol
              title="Resources"
              items={[
                { label: "Services", to: "/services" },
                { label: "AI Solutions", to: "/ai-solutions" },
                { label: "Insights", to: "/blogs" },
                { label: "Talk to Sales", to: "/contact" },
              ]}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} NETA AI, Inc. — Crafted for AI-native enterprises.
          </p>
          <div className="flex items-center gap-2.5">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/company/neta-ai-pk/", label: "NETA AI on LinkedIn" },
              { Icon: Mail, href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "neta.ai.pk@gmail.com"}`, label: "Email NETA AI" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.10] bg-white/[0.03] text-white/60 transition-all hover:-translate-y-0.5 hover:border-brand-cyan/40 hover:text-white hover:shadow-[0_0_24px_-6px_rgba(125,211,252,0.55)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70">{title}</h4>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it.label}>
            <Link href={it.to} className="text-[14px] text-white/55 transition-colors hover:text-white">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
