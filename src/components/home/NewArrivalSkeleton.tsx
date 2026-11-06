export function NewArrivalSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card p-3 shadow-2xs transition-all"
        >
          {/* Book Cover Skeleton */}
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted/60 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-t from-muted/80 via-transparent to-transparent opacity-60" />
            <div className="absolute top-2.5 left-2.5 h-4 w-12 rounded-full bg-background/50 backdrop-blur-xs" />
          </div>

          {/* Typography Skeleton */}
          <div className="mt-3.5 space-y-2 flex-1">
            <div className="h-4 w-4/5 rounded-md bg-muted/90 animate-pulse" />
            <div className="h-3 w-1/2 rounded-md bg-muted/60 animate-pulse" />
          </div>

          {/* Meta/Status Footer Skeleton */}
          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-2.5">
            <div className="h-3 w-14 rounded bg-muted/50 animate-pulse" />
            <div className="h-3 w-10 rounded bg-muted/50 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}