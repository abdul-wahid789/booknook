import Link from "next/link";
import { PlusCircle, ArrowUpRight, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ShareBookCTA() {
  return (
    <section className="w-full bg-background py-14 sm:py-18 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-6 sm:p-10 md:p-12 shadow-sm">

          {/* Subtle Decorative Background Book Graphic */}
          <div className="pointer-events-none absolute -bottom-10 -right-10 text-muted/20 dark:text-muted/10 select-none">
            <BookOpen className="h-48 w-48 sm:h-64 sm:w-64 -rotate-12 stroke-[1.2]" />
          </div>

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

            {/* Copy Column */}
            <div className="max-w-xl space-y-4">
              <Badge
                variant="secondary"
                className="inline-flex items-center gap-1.5 rounded-full border border-secondary/60 bg-secondary/80 px-3 py-1 text-[11px] font-semibold text-secondary-foreground"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span>Keep the library alive</span>
              </Badge>

              <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Have a book sitting on your shelf?
              </h2>

              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
                List it in 30 seconds. Put your favorite story into circulation for other readers in the community to borrow, cherish, and return safely.
              </p>
            </div>

            {/* Actions Column */}
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                nativeButton={false}
                render={<Link href="/add-book" />}
                className="h-11 w-full justify-center rounded-lg bg-primary px-6 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm transition-transform active:scale-[0.98] hover:bg-primary/90 sm:w-auto"
              >
                <PlusCircle className="mr-2 h-4 w-4 stroke-[2]" />
                <span>Add a Book Now</span>
              </Button>

              <Button
                nativeButton={false}
                render={<Link href="/#how-it-works" />}
                variant="outline"
                className="h-11 w-full justify-center rounded-lg border-border bg-card px-5 text-xs sm:text-sm font-medium text-foreground transition-colors hover:bg-muted sm:w-auto"
              >
                <span>How It Works</span>
                <ArrowUpRight className="ml-1.5 h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}