import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { services } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    return { title: "Service not found — NETA AI" };
  }

  return {
    title: `${service.title} — NETA AI`,
    description: service.summary,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.summary}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-border bg-white p-7 shadow-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">What you get</div>
                <ul className="mt-4 space-y-3 text-[14.5px] text-foreground/80">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gradient-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-secondary/30 p-7">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Outcomes</div>
                <ul className="mt-4 space-y-3 text-[14.5px] text-foreground/80">
                  {service.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Timeline</div>
                <div className="mt-3 font-display text-xl font-semibold text-foreground">
                  {service.timeline}
                </div>
                <p className="mt-3 text-[13.5px] text-muted-foreground">
                  Delivery timeline can vary based on your stack and integration needs.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Next step</div>
                <p className="mt-3 text-[13.5px] text-muted-foreground">
                  Tell us about your current workflows and we will recommend the fastest path to launch.
                </p>
                <Link href="/contact" className="btn-primary mt-5 w-full justify-center">
                  Book a strategy call
                </Link>
              </div>

              <Link href="/services" className="btn-ghost w-full justify-center">
                Back to services
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
