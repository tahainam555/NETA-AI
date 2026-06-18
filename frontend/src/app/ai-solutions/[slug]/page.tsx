import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { solutions } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) {
    return { title: "AI Solution not found — NETA AI" };
  }

  return {
    title: `${solution.title} — NETA AI`,
    description: solution.summary,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="AI Solution"
        title={solution.title}
        description={solution.summary}
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-border bg-white p-7 shadow-card">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Capabilities</div>
                <ul className="mt-4 space-y-3 text-[14.5px] text-foreground/80">
                  {solution.capabilities.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gradient-brand" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-secondary/30 p-7">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Ideal for</div>
                <ul className="mt-4 space-y-3 text-[14.5px] text-foreground/80">
                  {solution.idealFor.map((item) => (
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
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Next step</div>
                <p className="mt-3 text-[13.5px] text-muted-foreground">
                  We will map this solution to your current stack and define the fastest pilot path.
                </p>
                <Link href="/contact" className="btn-primary mt-5 w-full justify-center">
                  Talk to an AI strategist
                </Link>
              </div>

              <Link href="/ai-solutions" className="btn-ghost w-full justify-center">
                Back to AI solutions
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
