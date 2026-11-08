import { Search, CalendarCheck, RotateCcw, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    label: "Step 1",
    title: "Find a book",
    desc: "Browse our shared community shelf and discover stories across every category.",
    icon: Search,
  },
  {
    step: "02",
    label: "Step 2",
    title: "Set a return date",
    desc: "Pick your reading window (up to 30 days) and confirm your borrow in seconds.",
    icon: CalendarCheck,
  },
  {
    step: "03",
    label: "Step 3",
    title: "Return & share",
    desc: "Done reading? Return it from My Borrows in one click so the next reader can enjoy.",
    icon: RotateCcw,
  },
];

export function HowItWorks() {
  return (
    <section className="w-full bg-background py-16 sm:py-20 lg:py-24" id='how-it-works'>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
            Simple & Transparent
          </p>
          <h2 className="font-heading text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            How borrowing works.
          </h2>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            A community-first lending flow built for everyday book lovers. No hidden hurdles, just good reads.
          </p>
        </div>

        {/* 3 Step Flow Grid */}
        <div className="relative mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-3 md:gap-8 max-w-5xl mx-auto">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div
                key={item.step}
                className="group relative flex flex-col items-center rounded-2xl border border-border/70 bg-card p-7 text-center shadow-2xs transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-md sm:p-8"
              >
                {/* Step Pill */}
                <div className="flex items-center gap-1.5 self-center rounded-full border border-border/80 bg-muted/40 px-3 py-0.5 text-[11px] font-mono font-medium text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary">
                  <span>{item.step}</span>
                  <span className="text-border">·</span>
                  <span className="font-sans font-semibold uppercase tracking-wider">{item.label}</span>
                </div>

                {/* Elevated Icon Badge */}
                <div className="mt-6 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground shadow-2xs">
                  <Icon className="h-6 w-6 stroke-[1.8]" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-medium text-foreground transition-colors group-hover:text-primary">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {item.desc}
                </p>

                {/* Subtle horizontal indicator between cards on desktop */}
                {!isLast && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-border">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}