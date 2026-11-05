"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    BookOpen,
    Check,
    HeartHandshake,
    Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Example mock book matching the screenshot
const BOOK_DETAILS = {
    id: "2",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    authorName: "Gabrielle Zevin",
    category: "FICTION",
    isAvailable: true,
    image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    tagline: "A story worth making time for.",
    paragraphs: [
        "Two friends, brought together by a love of video games, build worlds that millions will call home. Across three decades, their creative partnership becomes a story of ambition, connection, and the many ways we love.",
        "Warm, inventive, and deeply human, Gabrielle Zevin's novel asks what it means to make something together—and to begin again.",
    ],
    contributor: {
        name: "Ayaan Malik",
        initials: "AM",
        addedDate: "02 Nov 2026",
    },
};

export default function BookDetailsPage() {
    const [isBorrowing, setIsBorrowing] = React.useState(false);

    const book = BOOK_DETAILS;

    async function handleBorrow() {
        setIsBorrowing(true);
        try {
            // Simulate API call to borrow book
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success(`You have borrowed "${book.title}"!`, {
                description: "Please remember to return it when you're done reading.",
            });
        } catch (err) {
            console.error(err);
            toast.error("Unable to process borrow request.");
        } finally {
            setIsBorrowing(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-background py-10 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl space-y-8">

                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Link
                        href="/books"
                        className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>All Books</span>
                    </Link>
                    <span className="text-border">/</span>
                    <span className="text-foreground">Book details</span>
                </nav>

                {/* Main Content Card / Frame */}
                <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-12">

                        {/* Left Column: Book Stage Display */}
                        <div className="flex flex-col items-center justify-center bg-[#f4ece3] p-10 sm:p-14 md:col-span-5 dark:bg-[#182126]">
                            {/* Realistic Jacket Shadow & Perspective */}
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
                                {/* Book Spine Highlight Overlay */}
                                <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/25 via-black/5 to-transparent" />
                            </div>

                            {/* Tagline */}
                            <p className="mt-8 text-center text-xs italic text-muted-foreground">
                                {book.tagline}
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

                                    {book.isAvailable && (
                                        <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                            <Check className="h-3 w-3 stroke-[2.5]" />
                                            Available to borrow
                                        </span>
                                    )}
                                </div>

                                {/* Title & Author */}
                                <div className="space-y-2">
                                    <h1 className="font-heading text-3xl font-normal leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
                                        {book.title}
                                    </h1>
                                    <p className="text-sm text-muted-foreground">
                                        by <span className="font-medium text-foreground">{book.authorName}</span>
                                    </p>
                                </div>

                                {/* Synopsis */}
                                <div className="space-y-3 pt-2">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                                        About this book
                                    </h3>
                                    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                                        {book.paragraphs.map((p, idx) => (
                                            <p key={idx}>{p}</p>
                                        ))}
                                    </div>
                                </div>

                                <Separator className="my-6 bg-border/60" />

                                {/* Contributor Row */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-heading text-xs font-medium text-foreground">
                                        {book.contributor.initials}
                                    </div>
                                    <div className="text-xs">
                                        <p className="font-medium text-foreground">
                                            Shared by {book.contributor.name}
                                        </p>
                                        <p className="text-muted-foreground">
                                            Added {book.contributor.addedDate}
                                        </p>
                                    </div>
                                </div>

                                {/* Action CTA Row */}
                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <Button
                                        type="button"
                                        disabled={!book.isAvailable || isBorrowing}
                                        onClick={handleBorrow}
                                        className="h-11 rounded-lg bg-primary px-6 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
                                    >
                                        {isBorrowing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <span>Borrow This Book</span>
                                            </>
                                        )}
                                    </Button>

                                    <span className="text-xs text-muted-foreground">
                                        Yours for a few days.
                                    </span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

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