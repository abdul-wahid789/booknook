"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Heart,
  Loader2,
} from "lucide-react";
// import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BorrowedBook {
  id: string;
  title: string;
  authorName: string;
  borrowDate: string;
  returnDate: string;
  dueStatus: {
    label: string;
    variant: "warning" | "normal";
  };
  image: string;
}

const INITIAL_BORROWED_BOOKS: BorrowedBook[] = [
  {
    id: "1",
    title: "The Midnight Library",
    authorName: "Matt Haig",
    borrowDate: "29 Oct 2026",
    returnDate: "03 Nov 2026",
    dueStatus: {
      label: "Due today",
      variant: "warning",
    },
    image:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    title: "A Psalm for the Wild-Built",
    authorName: "Becky Chambers",
    borrowDate: "01 Nov 2026",
    returnDate: "06 Nov 2026",
    dueStatus: {
      label: "3 days left",
      variant: "normal",
    },
    image:
      "https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    authorName: "Gabrielle Zevin",
    borrowDate: "03 Nov 2026",
    returnDate: "08 Nov 2026",
    dueStatus: {
      label: "5 days left",
      variant: "normal",
    },
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
  },
];

export default function BorrowedBooksPage() {
  const [borrowedBooks, setBorrowedBooks] = React.useState<BorrowedBook[]>(
    INITIAL_BORROWED_BOOKS
  );
  const [returningId, setReturningId] = React.useState<string | null>(null);

  const dueTodayBooks = borrowedBooks.filter(
    (b) => b.dueStatus.variant === "warning"
  );

  async function handleReturnBook(id: string, title: string) {
    try {
      setReturningId(id);
      // Simulate API call to return book
      await new Promise((resolve) => setTimeout(resolve, 800));

      setBorrowedBooks((prev) => prev.filter((book) => book.id !== id));
      toast.success(`"${title}" returned successfully!`, {
        description: "Thank you for passing it on for the next reader.",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to return book. Please try again.");
    } finally {
      setReturningId(null);
    }
  }

  return (
    <div className="min-h-screen w-full bg-background py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              A little time. A whole new world.
            </p>
            <h1 className="font-heading text-4xl font-normal tracking-tight text-primary sm:text-5xl">
              Your current chapters.
            </h1>
            <p className="text-sm text-muted-foreground">
              Keep track of your borrowed books. Finished a story? Return it for the next reader.
            </p>
          </div>

          <Link href="/books" className="shrink-0">
            <Button
              variant="outline"
              className="h-10 rounded-lg border-border bg-card px-4 text-xs font-semibold text-foreground hover:bg-muted"
            >
              <span>Explore All Books</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* 3 Metric Cards Strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Card 1: Currently Reading */}
          <Card className="rounded-xl border border-border/70 bg-card p-5 shadow-2xs">
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                <BookOpen className="h-4 w-4 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-muted-foreground">
                  Currently reading
                </p>
                <h3 className="font-heading text-2xl font-normal text-foreground">
                  {borrowedBooks.length} books
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  Good company for a few days.
                </p>
              </div>
            </div>
          </Card>

          {/* Card 2: Due Today (Warm Ochre / Amber Tint) */}
          <Card className="rounded-xl border border-amber-200/80 bg-[#fef5e7] p-5 shadow-2xs dark:border-amber-900/40 dark:bg-[#2a2215]">
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200">
                <Clock className="h-4 w-4 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-amber-900/80 dark:text-amber-200/80">
                  Due today
                </p>
                <h3 className="font-heading text-2xl font-normal text-amber-950 dark:text-amber-100">
                  {dueTodayBooks.length} book
                </h3>
                <p className="text-[11px] text-amber-900/70 dark:text-amber-300/70 truncate max-w-[170px]">
                  {dueTodayBooks.length > 0
                    ? dueTodayBooks.map((b) => b.title).join(", ")
                    : "No books due today"}
                </p>
              </div>
            </div>
          </Card>

          {/* Card 3: Today's Date */}
          <Card className="rounded-xl border border-border/70 bg-card p-5 shadow-2xs">
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                <BookOpen className="h-4 w-4 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-muted-foreground">
                  Today
                </p>
                <h3 className="font-heading text-2xl font-normal text-foreground">
                  03 November
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  2026 · A good day for a few pages.
                </p>
              </div>
            </div>
          </Card>

        </div>

        {/* Borrowed Books Table Card */}
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-border/70 bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3.5 px-6">Book / Author</th>
                  <th className="py-3.5 px-4">Borrow Date</th>
                  <th className="py-3.5 px-4">Return Date</th>
                  <th className="py-3.5 px-4">Due Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-border/60 text-xs">
                {borrowedBooks.length > 0 ? (
                  borrowedBooks.map((book) => {
                    const isReturning = returningId === book.id;

                    return (
                      <tr
                        key={book.id}
                        className="group transition-colors hover:bg-muted/20"
                      >
                        {/* Book Title & Cover */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="relative aspect-[2/3] h-16 w-11 shrink-0 overflow-hidden rounded-xs border border-border/70 bg-[#f4ece3] p-1 shadow-2xs dark:bg-[#182126]">
                              <Image
                                src={book.image}
                                alt={book.title}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            </div>

                            <div className="space-y-1">
                              <Link
                                href={`/books/${book.id}`}
                                className="font-heading text-sm font-medium text-foreground hover:text-primary transition-colors block"
                              >
                                {book.title}
                              </Link>
                              <p className="text-muted-foreground">
                                {book.authorName}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Borrow Date */}
                        <td className="py-4 px-4 text-muted-foreground">
                          {book.borrowDate}
                        </td>

                        {/* Return Date */}
                        <td className="py-4 px-4 text-muted-foreground">
                          {book.returnDate}
                        </td>

                        {/* Due Status Pill */}
                        <td className="py-4 px-4">
                          {book.dueStatus.variant === "warning" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-sm bg-amber-100/80 px-2 py-0.5 text-[11px] font-medium text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
                              <Clock className="h-3 w-3 stroke-[2.5]" />
                              {book.dueStatus.label}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                              <Check className="h-3 w-3 stroke-[2.5]" />
                              {book.dueStatus.label}
                            </span>
                          )}
                        </td>

                        {/* Action: Return Button */}
                        <td className="py-4 px-6 text-right">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={isReturning}
                            onClick={() =>
                              handleReturnBook(book.id, book.title)
                            }
                            className="h-8 border-border px-3 text-xs font-medium text-foreground hover:bg-muted"
                          >
                            {isReturning ? (
                              <>
                                <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                                Returning...
                              </>
                            ) : (
                              "Return Book"
                            )}
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      You have no active borrowed books right now.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Footer Status Strip */}
          <div className="border-t border-border/70 bg-card px-6 py-3.5 text-xs text-muted-foreground">
            {borrowedBooks.length} active borrows · Sorted by return date
          </div>
        </div>

        {/* Motivational Footnote */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Heart className="h-4 w-4 shrink-0 text-muted-foreground" />
          <p>Read at your own pace within your borrowing window. Returning early is always welcome.</p>
        </div>

      </div>
    </div>
  );
}