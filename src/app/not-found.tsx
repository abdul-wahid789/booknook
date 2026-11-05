import Link from "next/link";
import { ArrowLeft, BookX, Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">

        {/* Editorial Watermark Badge */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border/80 bg-card shadow-2xs">
          <BookX className="h-8 w-8 text-primary stroke-[1.5]" />
        </div>

        {/* Numerical Accent Kicker */}
        <p className="mt-6 text-xs font-mono font-semibold uppercase tracking-widest text-accent">
          404 · Page Not Found
        </p>

        {/* Heading */}
        <h1 className="mt-2 font-heading text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
          An unwritten chapter.
        </h1>

        {/* Narrative Description */}
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          The page or story you are looking for doesn&apos;t seem to be on the shelf. It may have been borrowed, relocated, or never written.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="h-10 w-full rounded-lg bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
              <Home className="mr-2 h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>

          <Link href="/all-books" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="h-10 w-full rounded-lg border-border bg-card px-5 text-xs font-medium text-foreground hover:bg-muted"
            >
              <Compass className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Browse All Books</span>
            </Button>
          </Link>
        </div>

        {/* Subtle Footnote */}
        <div className="mt-12 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/70">
          <ArrowLeft className="h-3 w-3" />
          <span>Every lost page leads to a new discovery.</span>
        </div>

      </div>
    </div>
  );
}