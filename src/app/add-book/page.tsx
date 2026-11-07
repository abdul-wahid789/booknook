import BookForm from "@/components/add-book/BookForm";
import { Card } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { BookOpen, User } from "lucide-react";
import Link from "next/link";
import ProfileNote from "./_components/ProfileNote";
import { Suspense } from "react";
import BookFormSkeleton from "./_components/BookFormSkeleton";
import ProfileNoteSkeleton from "./_components/ProfileNoteSkeleton";
import AddBookFormUser from "@/components/add-book/AddBookFormUser";

export default function AddBookPage() {

    return (
        <div className="min-h-screen w-full bg-background py-14 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Page Top Header */}
                <div className="space-y-2">
                    <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Make room on the shared shelf
                    </p>
                    <h1 className="text-4xl font-heading font-normal tracking-tight text-foreground sm:text-5xl">
                        Pass on a good story.
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Add a book you love and help someone discover their next favorite.
                    </p>
                </div>

                {/* 2-Column Grid */}
                <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">

                    {/* Left Column: Main Form Card */}
                    <div className="lg:col-span-8">
                        <Card className="rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-sm">
                            <div className="mb-8 flex items-baseline justify-between border-b border-border/60 pb-4">
                                <h2 className="font-heading text-2xl font-normal tracking-tight text-card-foreground">
                                    Book details
                                </h2>
                                <span className="text-xs text-muted-foreground">
                                    All book fields are required
                                </span>
                            </div>


                            <Suspense fallback={<BookFormSkeleton />}>
                                <AddBookFormUser />
                            </Suspense>
                        </Card>
                    </div>

                    {/* Right Column: Editorial Sidebar Guide */}
                    <aside className="space-y-6 lg:col-span-4">
                        <div className="rounded-2xl border border-border/80 bg-muted p-7">

                            <h3 className="font-heading text-2xl font-normal tracking-tight text-foreground">
                                Your favorite could be someone&apos;s next.
                            </h3>
                            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                A few thoughtful details make it easier for a story to find its next reader.
                            </p>

                            <div className="mt-6 space-y-4 border-t border-border/50 pt-5 text-xs">
                                <div>
                                    <h4 className="font-semibold text-foreground">
                                        A title worth finding
                                    </h4>
                                    <p className="mt-0.5 text-muted-foreground">
                                        Use the full title and author&apos;s name.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-foreground">
                                        A cover worth noticing
                                    </h4>
                                    <p className="mt-0.5 text-muted-foreground">
                                        Choose a crisp image of the book cover.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-foreground">
                                        A little introduction
                                    </h4>
                                    <p className="mt-0.5 text-muted-foreground">
                                        Share the feeling, not the ending.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Profile note at bottom of sidebar */}
                        <Suspense fallback={<ProfileNoteSkeleton />}>
                            <ProfileNote />
                        </Suspense>
                    </aside>

                </div>
            </div>
        </div>
    );
}