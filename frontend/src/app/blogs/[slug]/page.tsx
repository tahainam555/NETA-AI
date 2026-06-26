import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { blogPosts } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    return { title: "article-not-found-neta-ai" };
  }

  return {
    title: `${post.slug}-neta-ai`,
    description: post.excerpt,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero eyebrow={post.tag} title={post.title} description={post.excerpt} />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="text-[12px] uppercase tracking-wider text-muted-foreground">
            {post.date} · {post.read}
          </div>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <div key={section.heading} className="space-y-3">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {section.heading}
                </h2>
                <p className="text-[15px] leading-relaxed text-foreground/80">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6">
            <Link href="/blogs" className="btn-ghost">
              Back to blogs
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
