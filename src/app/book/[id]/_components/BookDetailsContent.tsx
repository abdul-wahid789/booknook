import BorrowAction from '@/app/book/[id]/_components/BorrowAction';
import { Separator } from '@/components/ui/separator';
import { getBookDetails } from '@/lib/bookOperation';
import getServerToken from '@/lib/serverToken';
import { TBook } from '@/schemas/book';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import BorrowModal from './BorrowModal';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { checkBorrowStatus } from '@/lib/response';
import Retry from '@/components/shared/Retry';

const BookDetailsContent = async ({ params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params
    const token = await getServerToken()
    const resData = await getBookDetails(id, token);

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if(!session) return <Retry msg={'Session Error'} />
    const user = session.user

    const isBorrowed = await checkBorrowStatus(id, user.email, token)

    if (resData?.error || !resData?.data) {
        notFound();
    }

    const book: TBook = Array.isArray(resData.data)
        ? resData.data[0] as TBook
        : resData.data as TBook;

    if (!book) {
        notFound();
    }

    const isAvailable = (book.totalCopies ?? 0) > 0;

    const initials = book.userName
        ? book.userName
            .split(" ")
            .map((p: string) => p[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "AW";

    const formattedDate = book.createdAt
        ? new Date(book.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "Recently";

    return (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left Column: Book Stage Display */}
                <div className="flex flex-col items-center justify-center bg-[#f4ece3] p-10 sm:p-14 md:col-span-5 dark:bg-[#182126]">
                    <div className="relative aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-xs shadow-[0_20px_35px_-10px_rgba(0,0,0,0.35),0_8px_16px_-4px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:scale-[1.02]">
                        <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover"
                            unoptimized
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 via-black/5 to-transparent" />
                    </div>

                    <p className="mt-8 text-center text-xs italic text-muted-foreground">
                        A story worth making time for.
                    </p>
                </div>

                {/* Right Column: Book Details & Actions */}
                <div className="flex flex-col justify-between p-8 sm:p-12 md:col-span-7">
                    <div className="space-y-6">
                        {/* Category & Availability Badges */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                                {book.category}
                            </span>

                            {isAvailable ? (
                                <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                    <Check className="h-3 w-3 stroke-[2.5]" />
                                    Available to borrow
                                </span>
                            ) : (
                                <span className="inline-flex items-center rounded-sm bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                    Currently checked out
                                </span>
                            )}
                        </div>

                        {/* Title & Author */}
                        <div className="space-y-2">
                            <h1 className="font-heading text-3xl font-normal leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
                                {book.title}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                by{" "}
                                <span className="font-medium text-foreground">
                                    {book.authorName}
                                </span>
                            </p>
                        </div>

                        {/* Description */}
                        <div className="space-y-3 pt-2">
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                                About this book
                            </h3>
                            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                                <p>{book.shortDescription}</p>
                            </div>
                        </div>

                        <Separator className="my-6 bg-border/60" />

                        {/* Contributor Row */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-heading text-xs font-medium text-foreground">
                                {initials}
                            </div>
                            <div className="text-xs">
                                <p className="font-medium text-foreground">
                                    Shared by {book.userName}
                                </p>
                                <p className="text-muted-foreground">
                                    Added {formattedDate}
                                </p>
                            </div>
                        </div>

                        <BorrowAction
                            book={book}
                            user={user}
                            isBorrowed={isBorrowed}
                            isAvailable={isAvailable} />


                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsContent;