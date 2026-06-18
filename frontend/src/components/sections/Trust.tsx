const COMPANIES = [
  "ACME Corp", "Northwind", "Vertexa", "Lumenlabs", "Quanta", "Helix", "Kairos", "Stratify",
];

export function Trust() {
  return (
    <section className="border-y border-border bg-secondary/30 py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-center text-[11.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Trusted By Innovative Businesses
        </p>
        <div className="mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max gap-14 animate-marquee hover:[animation-play-state:paused]">
            {[...COMPANIES, ...COMPANIES].map((c, i) => (
              <span
                key={i}
                className="font-display text-xl font-semibold tracking-tight text-muted-foreground/70 inline-block transition-all duration-300 hover:scale-110 hover:text-[#2563eb]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
