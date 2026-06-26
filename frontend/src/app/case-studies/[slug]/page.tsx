import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { caseStudies } from "@/lib/site-content";
import { routes } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) {
    return { title: "Case study not found — NETA AI" };
  }

  return {
    title: `${study.title} — NETA AI`,
    description: study.summary,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) {
    notFound();
  }

  return (
    <>
      <PageHero eyebrow={study.tag} title={study.title} description={study.summary} />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="space-y-8 lg:col-span-3">
              <div className="overflow-hidden rounded-2xl border border-border bg-secondary/40">
                <Image
                  src={study.img}
                  alt={study.title}
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Challenge</div>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">{study.challenge}</p>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Solution</div>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/80">{study.solution}</p>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Results</div>
                <ul className="mt-4 space-y-3 text-[14.5px] text-foreground/80">
                  {study.results.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gradient-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Impact</div>
                <div className="mt-4 space-y-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.v}>
                      <div className="font-display text-2xl font-semibold text-gradient">{metric.k}</div>
                      <div className="text-[12.5px] text-muted-foreground">{metric.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 shadow-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Next step</div>
                <p className="mt-3 text-[13.5px] text-muted-foreground">
                  Want results like this? We will map the fastest path to launch for your team.
                </p>
                <Link href={routes.contact} className="btn-primary mt-5 w-full justify-center">
                  Schedule a strategy call
                </Link>
              </div>

              <Link href={routes.caseStudies} className="btn-ghost w-full justify-center">
                Back to case studies
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
