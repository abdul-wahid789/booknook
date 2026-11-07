import Link from "next/link";
import { ArrowLeft, HeartHandshake } from "lucide-react";

import BookDetailsContent from "./_components/BookDetailsContent";
import { Suspense } from "react";
import BookDetailsSkeleton from "./_components/BookDetailsSkeleton";

export default async function BookDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    return (
        <div className="min-h-screen w-full bg-background py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl space-y-8">
                {/* navigation */}
                <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Link
                        href="/all-books"
                        className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>All Books</span>
                    </Link>
                    <span className="text-border">/</span>
                    <span className="text-foreground">Book details</span>
                </nav>

                {/* main card */}
                <Suspense fallback={<BookDetailsSkeleton />}>
                    <BookDetailsContent params={params} />
                </Suspense>

                {/* Bottom Banner: Community Care Reminder */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border/70 bg-card p-6 shadow-2xs">
                    <div className="flex items-start sm:items-center gap-3.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                            <HeartHandshake className="h-4 w-4" />
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-foreground">
                                A little care goes a long way.
                            </h4>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                Enjoy the story, keep an eye on your return date, and pass it on for the next reader.
                            </p>
                        </div>
                    </div>

                    <div className="text-xs font-medium tracking-wide text-muted-foreground sm:text-right shrink-0">
                        Borrow. Read. Return.
                    </div>
                </div>
            </div>
        </div>
    );
}