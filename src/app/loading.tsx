import { BookOpen } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-background py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* Animated Brand Pulse Header */}
        <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border/80 bg-card shadow-2xs">
            <BookOpen className="h-6 w-6 animate-pulse text-primary" />
            <span className="absolute -inset-1 rounded-2xl border border-primary/20 animate-ping opacity-75" />
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-normal tracking-tight text-foreground sm:text-3xl">
              Turning the page...
            </h2>
            <p className="text-xs text-muted-foreground">
              Preparing the shelf and stories for you.
            </p>
          </div>
        </div>

        {/* Filter / Search Bar Skeleton */}
        <div className="h-14 w-full animate-pulse rounded-2xl border border-border/60 bg-muted/40" />

        {/* Book Cards Grid Skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col space-y-3 rounded-xl border border-border/60 bg-card p-3 shadow-2xs"
            >
              {/* Cover Aspect Ratio Skeleton */}
              <div className="aspect-[2/3] w-full animate-pulse rounded-lg bg-muted/60" />

              {/* Title & Metadata Lines */}
              <div className="space-y-2 pt-1">
                <div className="h-3.5 w-4/5 animate-pulse rounded bg-muted/80" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted/50" />
              </div>

              {/* Tag / Button Skeleton */}
              <div className="pt-1">
                <div className="h-7 w-full animate-pulse rounded-md bg-muted/40" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}