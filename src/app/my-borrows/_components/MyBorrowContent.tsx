import Retry from '@/components/shared/Retry';
import { auth } from '@/lib/auth';
import { getMyBorrows } from '@/lib/bookOperation';
import getDueStatus from '@/lib/dueStatus';
import getServerToken from '@/lib/serverToken';
import { errorToast } from '@/lib/toasts';
import { TBorrowBook } from '@/schemas/book';
import { format } from 'date-fns';
import { AlertTriangle, BookOpen, Check, Clock, Loader2 } from 'lucide-react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BorrowStatusData from './BorrowStatusData';
import BorrowAction from './ReturnBookAction';
import ReturnBookAction from './ReturnBookAction';

const MyBorrowContent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const token = await getServerToken()
  const res = await getMyBorrows(session?.user?.email as string, token);
  if (res.error) return <Retry msg={res.msg} />

  if (!res.data) return <Retry msg="No Books Found" />
  else {
    const borrowedBooks = res.data as TBorrowBook[]

    return (
      <>
        <BorrowStatusData borrowedBooks={borrowedBooks} />
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border/70 bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3.5">Book / Author</th>
                  <th className="px-4 py-3.5">Borrow Date</th>
                  <th className="px-4 py-3.5">Return Date</th>
                  <th className="px-4 py-3.5">Due Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/60 text-xs">

                {borrowedBooks.length > 0 ? (
                  borrowedBooks.map((item) => {
                    const book = item.bookDetails;
                    // const isReturning = returningId === item._id;
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
                        className="group transition-colors hover:bg-muted/30"
                      >
                        {/* Book Title & Cover */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative aspect-[2/3] h-16 w-11 shrink-0 overflow-hidden rounded-xs border border-border/70 bg-muted/50 p-1 shadow-2xs">
                              {book?.image ? (
                                <Image
                                  src={book.image}
                                  alt={book.title || "Book cover"}
                                  sizes='120'
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
                            <span className="inline-flex items-center gap-1.5 rounded-sm border border-destructive/20 bg-destructive/10 px-2 py-0.5 text-[11px] font-medium text-destructive">
                              <AlertTriangle className="h-3 w-3 stroke-[2.5]" />
                              {status.label}
                            </span>
                          ) : status.variant === "warning" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-sm border border-accent/40 bg-accent/20 px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                              <Clock className="h-3 w-3 stroke-[2.5]" />
                              {status.label}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-sm border border-secondary/40 bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                              <Check className="h-3 w-3 stroke-[2.5]" />
                              {status.label}
                            </span>
                          )}
                        </td>

                        {/* Action: Return Button */}
                        <ReturnBookAction book={item} />
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
            {borrowedBooks.length} active {borrowedBooks.length === 1 ? "borrow" : "borrows"} · Sorted by nearest return date
          </div>
        </div>
      </>
    );
  }
};

export default MyBorrowContent;