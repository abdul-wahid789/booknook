// components/shared/BookCard.tsx
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { TBook } from "@/schemas/book";

interface BookCardProps {
  book: TBook;
}

export default function BookCard({ book }: BookCardProps) {
  const isAvailable = (book.totalCopies ?? 0) > 0;

  return (
    <Link
      href={`/books/${book._id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-3 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
    >
      {/* Cover Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-border/60 bg-muted/40">
        {book.image ? (
          <Image
            src={book.image}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <BookOpen className="h-6 w-6 stroke-[1.5]" />
          </div>
        )}

        {/* Category Badge (Simple div/span, NOT a Link) */}
        <span className="absolute top-2.5 left-2.5 rounded-full border border-border/60 bg-background/80 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-xs">
          {book.category}
        </span>
      </div>

      {/* Book Metadata (Simple div/h3/p, NOT nested Links) */}
      <div className="mt-3 flex flex-1 flex-col justify-between space-y-2">
        <div className="space-y-0.5">
          <h3 className="line-clamp-1 font-heading text-sm font-medium text-foreground transition-colors group-hover:text-primary">
            {book.title}
          </h3>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {book.authorName}
          </p>
        </div>

        {/* Status / Copies */}
        <div className="flex items-center justify-between border-t border-border/60 pt-2 text-[11px]">
          <span
            className={
              isAvailable
                ? "text-emerald-600 dark:text-emerald-400 font-medium"
                : "text-accent-foreground font-medium"
            }
          >
            {isAvailable ? `${book.totalCopies} available` : "Borrowed"}
          </span>

          <span className="font-semibold text-primary transition-transform group-hover:translate-x-0.5">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}