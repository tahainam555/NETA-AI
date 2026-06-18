import { SectionHeader } from "../SiteShell";
import { Rocket, Lock, Layers, Brain, Settings2, LineChart } from "lucide-react";

const features = [
  { icon: Layers, title: "Done-for-you Systems", desc: "We don't offer vague strategy packages. We build working systems and install them into your operations." },
  { icon: LineChart, title: "Priced for Outcomes", desc: "We price for the outcome we deliver, not the hours we spend. If it doesn't perform, we make it right." },
  { icon: Rocket, title: "Honest Timelines", desc: "Every engagement is scoped clearly and delivered on a strictly defined timeline with weekly reports." },
  { icon: Brain, title: "Built by Builders", desc: "Founded by a team of specialists in automation engineering, growth strategy, and operations." },
  { icon: Settings2, title: "Custom Architecture", desc: "Tailored to your business model, your existing CRM, and your specific revenue goals." },
  { icon: Lock, title: "Enterprise Grade", desc: "Run enterprise-grade automation systems without the enterprise budget or in-house technical team." },
];

export function WhyChoose() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Our Promise"
          title={<>Built by Builders. <span className="text-gradient">Obsessed with Outcomes.</span></>}
          description="We exist for one reason: to turn AI adoption into measurable business revenue."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all hover:border-primary/30 hover:shadow-card"
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-brand opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />
              <div className="relative flex items-start gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-soft text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-display text-[16px] font-semibold">{f.title}</h4>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
