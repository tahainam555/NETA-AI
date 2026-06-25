import { SectionHeader } from "./SiteShell";

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary/30">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="absolute -top-32 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-gradient-brand opacity-15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 pt-32 pb-12 lg:px-8 lg:pt-40 lg:pb-16">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      </div>
    </section>
  );
}
