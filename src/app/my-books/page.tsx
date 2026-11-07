import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import BookContent from "./_components/BookContent";
import { Suspense } from "react";
import BookContentSkeleton from "./_components/BookContentSkeleton";

export default function MyBooksPage() {

return (
  <div className="min-h-screen w-full bg-background py-14 px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Top Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Your corner of the library
          </p>
          <h1 className="font-heading text-4xl font-normal tracking-tight text-primary sm:text-5xl">
            Stories you&apos;ve shared.
          </h1>
          <p className="text-sm text-muted-foreground">
            A little shelf with a lot to give. Manage the books you&apos;ve
            added to BookNook.
          </p>
        </div>

        <Link href="/add-book" className="shrink-0">
          <Button className="h-10 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
            <span>Add Book</span>
            <Plus className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      <Suspense fallback={<BookContentSkeleton />}>
        <BookContent />
      </Suspense>
    </div>
  </div>
);
}