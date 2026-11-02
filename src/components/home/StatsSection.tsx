import { BookOpen, Users, Clock, Flame } from "lucide-react";

interface StatItem {
  number: string;
  label: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

const stats: StatItem[] = [
  {
    number: "4,820+",
    label: "Cataloged Editions",
    detail: "From timeless classics to modern releases",
    icon: BookOpen,
  },
  {
    number: "1,240",
    label: "Active Readers",
    detail: "Sharing reads across local communities",
    icon: Users,
  },
  {
    number: "98.4%",
    label: "Safe Returns",
    detail: "Preserved with care, returned on schedule",
    icon: Clock,
  },
  {
    number: "14 Days",
    label: "Average Loan Cycle",
    detail: "Enough time to savor every chapter",
    icon: Flame,
  },
];

export function StatsSection() {
  return (
    <section className="w-full bg-[#f4f7f8] py-20 px-6 md:px-14 lg:px-20 border-b border-border/40">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-6 bg-primary" />
              <span className="text-[11px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                Community Circulation
              </span>
            </div>
            <h2 className="font-heading text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              Pages turning across the city.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Every borrowed title lives on through someone new. Here is how our shared shelf looks today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-border/60 bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-sm"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f0f5f6] text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5 stroke-[1.75]" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">0{idx + 1}</span>
                </div>

                <div className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {item.number}
                </div>
                <div className="mt-1 text-sm font-medium text-foreground">
                  {item.label}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}