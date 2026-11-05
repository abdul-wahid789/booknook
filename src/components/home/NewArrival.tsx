import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import BookCard from '../shared/BookCard';
import { getNewBooks } from '@/lib/bookOperation';
import { IResponse } from '@/schemas/server';
import { TBook } from '@/schemas/book';
import { Button } from '@/components/ui/button';

const NewArrival = async () => {
    const resData: IResponse = await getNewBooks();
    const books: TBook[] = Array.isArray(resData?.data) ? resData.data : [];

    return (
        <section className="w-full bg-background py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

                {/* Header Row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-primary uppercase">
                            <Sparkles className="h-3 w-3" />
                            <span>Fresh on the shared shelf</span>
                        </div>
                        <h2 className="font-heading text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                            New Arrivals
                        </h2>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                            Six recent additions. Which one will you open first?
                        </p>
                    </div>

                    <Link href="/all-books" className="shrink-0">
                        <Button
                            variant="outline"
                            className="h-10 rounded-lg border-border bg-card px-4 text-xs font-semibold text-foreground hover:bg-muted"
                        >
                            <span>Explore Collection</span>
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                    </Link>
                </div>

                {/* Content Grid */}
                {resData?.error ? (
                    <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-center text-xs text-destructive">
                        {resData.msg || 'Unable to fetch recent arrivals.'}
                    </div>
                ) : books.length > 0 ? (
                    /* Responsive column scale: 2 on mobile, 3 on tablet, 6 on large desktop */
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
                        {books.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl border border-border/70 bg-card p-12 text-center text-sm text-muted-foreground">
                        No new arrivals on the shelf yet. Check back soon!
                    </div>
                )}
            </div>
        </section>
    );
};

export default NewArrival;