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
  AlertTriangle,
} from "lucide-react";
import { format, differenceInCalendarDays, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { getMyBorrows, returnBook, IBorrowedItem } from "@/lib/bookOperation";
import { errorToast, successToast } from "@/lib/toasts";

export default function BorrowedBooksPage() {
  const { data: session, isPending } = useSession();
  const [borrowedBooks, setBorrowedBooks] = React.useState<IBorrowedItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [returningId, setReturningId] = React.useState<string | null>(null);

  // Fetch active borrows
  React.useEffect(() => {
    let isMounted = true;

    async function fetchBorrows() {
      if (!session?.user?.email) {
        if (!isPending) setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const res = await getMyBorrows(session.user.email);
        if (isMounted) {
          if (!res.error && Array.isArray(res.data)) {
            setBorrowedBooks(res.data);
          } else {
            setBorrowedBooks([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch borrows:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchBorrows();

    return () => {
      isMounted = false;
    };
  }, [session, isPending]);

  // Dynamic due status calculator
  const getDueStatus = (dueDateStr: string | Date) => {
    const targetDate = typeof dueDateStr === "string" ? parseISO(dueDateStr) : new Date(dueDateStr);
    const diff = differenceInCalendarDays(targetDate, new Date());

    if (diff < 0) {
      return { label: `Overdue by ${Math.abs(diff)}d`, variant: "destructive" as const };
    }
    if (diff === 0) {
      return { label: "Due today", variant: "warning" as const };
    }
    return { label: `${diff} days left`, variant: "normal" as const };
  };

  const dueTodayBooks = borrowedBooks.filter((item) => {
    const status = getDueStatus(item.returnDueDate);
    return status.variant === "warning" || status.variant === "destructive";
  });

  async function handleReturnBook(borrowId: string, title?: string) {
    try {
      setReturningId(borrowId);
      const res = await returnBook(borrowId);

      if (res.error) {
        errorToast(res.msg || "Failed to return book. Please try again.");
        return;
      }

      setBorrowedBooks((prev) => prev.filter((item) => item._id !== borrowId));
      successToast(
        `"${title || "Book"}" returned successfully!`,
        "Thank you for passing it on for the next reader."
      );
    } catch (error) {
      console.error(error);
      errorToast("Failed to return book. Please try again.");
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
            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
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

          {/* Card 2: Due Today or Overdue */}
          <Card className="rounded-xl border border-amber-200/80 bg-[#fef5e7] p-5 shadow-2xs dark:border-amber-900/40 dark:bg-[#2a2215]">
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200">
                <Clock className="h-4 w-4 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-amber-900/80 dark:text-amber-200/80">
                  Needs attention
                </p>
                <h3 className="font-heading text-2xl font-normal text-amber-950 dark:text-amber-100">
                  {dueTodayBooks.length} {dueTodayBooks.length === 1 ? "book" : "books"}
                </h3>
                <p className="max-w-[170px] truncate text-[11px] text-amber-900/70 dark:text-amber-300/70">
                  {dueTodayBooks.length > 0
                    ? dueTodayBooks
                        .map((b) => b.bookDetails?.title || "Book")
                        .join(", ")
                    : "No books due today"}
                </p>
              </div>
            </div>
          </Card>

          {/* Card 3: Today's Date */}
          <Card className="rounded-xl border border-border/70 bg-card p-5 shadow-2xs">
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                <Clock className="h-4 w-4 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-medium text-muted-foreground">
                  Today
                </p>
                <h3 className="font-heading text-2xl font-normal text-foreground">
                  {format(new Date(), "dd MMMM")}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                  {format(new Date(), "yyyy")} · A good day for a few pages.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Borrowed Books Table Card */}
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border/70 bg-muted/40 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                  <th className="px-6 py-3.5">Book / Author</th>
                  <th className="px-4 py-3.5">Borrow Date</th>
                  <th className="px-4 py-3.5">Return Date</th>
                  <th className="px-4 py-3.5">Due Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/60 text-xs">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-muted-foreground">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <span>Loading your shelf...</span>
                      </div>
                    </td>
                  </tr>
                ) : borrowedBooks.length > 0 ? (
                  borrowedBooks.map((item) => {
                    const book = item.bookDetails;
                    const isReturning = returningId === item._id;
                    const status = getDueStatus(item.returnDueDate);

                    const borrowDateFormatted = item.borrowedAt
                      ? format(new Date(item.borrowedAt), "dd MMM yyyy")
                      : "—";

                    const returnDateFormatted = item.returnDueDate
                      ? format(new Date(item.returnDueDate), "dd MMM yyyy")
                      : "—";

                    return (
                      <tr
                        key={item._id}
                        className="group transition-colors hover:bg-muted/20"
                      >
                        {/* Book Title & Cover */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative aspect-[2/3] h-16 w-11 shrink-0 overflow-hidden rounded-xs border border-border/70 bg-[#f4ece3] p-1 shadow-2xs dark:bg-[#182126]">
                              {book?.image ? (
                                <Image
                                  src={book.image}
                                  alt={book.title || "Book cover"}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                  <BookOpen className="h-4 w-4" />
                                </div>
                              )}
                            </div>

                            <div className="space-y-1">
                              <Link
                                href={`/books/${item.bookId}`}
                                className="block font-heading text-sm font-medium text-foreground transition-colors hover:text-primary"
                              >
                                {book?.title || "Untitled Book"}
                              </Link>
                              <p className="text-muted-foreground">
                                {book?.authorName || "Unknown Author"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Borrow Date */}
                        <td className="px-4 py-4 text-muted-foreground">
                          {borrowDateFormatted}
                        </td>

                        {/* Return Date */}
                        <td className="px-4 py-4 text-muted-foreground">
                          {returnDateFormatted}
                        </td>

                        {/* Due Status Pill */}
                        <td className="px-4 py-4">
                          {status.variant === "destructive" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-sm bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive">
                              <AlertTriangle className="h-3 w-3 stroke-[2.5]" />
                              {status.label}
                            </span>
                          ) : status.variant === "warning" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-sm bg-amber-100/80 px-2 py-0.5 text-[11px] font-medium text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
                              <Clock className="h-3 w-3 stroke-[2.5]" />
                              {status.label}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                              <Check className="h-3 w-3 stroke-[2.5]" />
                              {status.label}
                            </span>
                          )}
                        </td>

                        {/* Action: Return Button */}
                        <td className="px-6 py-4 text-right">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={isReturning}
                            onClick={() => handleReturnBook(item._id, book?.title)}
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
                      {!session?.user
                        ? "Please sign in to view your borrowed books."
                        : "You have no active borrowed books right now."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Footer Status Strip */}
          <div className="border-t border-border/70 bg-card px-6 py-3.5 text-xs text-muted-foreground">
            {borrowedBooks.length} active {borrowedBooks.length === 1 ? "borrow" : "borrows"} · Sorted by nearest return date
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