interface BooksListSkeletonProps {
  count?: number;
}

export function BooksListSkeleton({ count = 8 }: BooksListSkeletonProps) {
  return (
    // <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card p-3 shadow-2xs transition-all"
        >
          {/* Cover Aspect Ratio Skeleton */}
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted/60 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-t from-muted/80 via-transparent to-transparent opacity-60" />

            {/* Top Tag Pill Skeleton */}
            <div className="absolute top-2.5 left-2.5 h-4 w-14 rounded-full bg-background/50 backdrop-blur-xs" />
          </div>

          {/* Typography Lines Skeleton */}
          <div className="mt-3.5 space-y-2 flex-1">
            {/* Title Line */}
            <div className="h-4 w-4/5 rounded-md bg-muted/90 animate-pulse" />

            {/* Author Line */}
            <div className="h-3 w-1/2 rounded-md bg-muted/60 animate-pulse" />
          </div>

          {/* Meta & Footer Row Skeleton */}
          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-2.5">
            <div className="h-3 w-16 rounded bg-muted/50 animate-pulse" />
            <div className="h-3 w-12 rounded bg-muted/50 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}