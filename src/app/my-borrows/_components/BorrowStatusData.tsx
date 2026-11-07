import { Card } from '@/components/ui/card';
import getDueStatus from '@/lib/dueStatus';
import { TBorrowBook } from '@/schemas/book';
import { format } from 'date-fns';
import { BookOpen, Clock } from 'lucide-react';
import React from 'react';

const BorrowStatusData = ({ borrowedBooks }: { borrowedBooks: TBorrowBook[] }) => {

    const dueTodayBooks = borrowedBooks.filter((item) => {
        const status = getDueStatus(item.returnDueDate);
        return status.variant === "warning" || status.variant === "destructive";
    });

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Card 1: Currently Reading */}
            <Card className="rounded-xl border border-border/70 bg-card p-5 shadow-2xs">
                <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
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

            {/* Card 2: Due Today or Overdue (Warm Ochre / Amber Accent) */}
            <Card className="rounded-xl border border-accent/40 bg-accent/15 p-5 shadow-2xs">
                <div className="flex items-start gap-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-accent-foreground">
                        <Clock className="h-4 w-4 stroke-[1.75]" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-[11px] font-medium text-accent-foreground/80">
                            Needs attention
                        </p>
                        <h3 className="font-heading text-2xl font-normal text-accent-foreground">
                            {dueTodayBooks.length} {dueTodayBooks.length === 1 ? "book" : "books"}
                        </h3>
                        <p className="max-w-[170px] truncate text-[11px] text-accent-foreground/75">
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
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
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
    );
};

export default BorrowStatusData;