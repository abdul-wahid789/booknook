import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
    BookOpen,
    Check,
    Library,
    Loader2,
    Plus,
    Trash2,
    Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
// import { authClient, useSession } from "@/lib/auth-client";
// import { getMyBooks, deleteBook } from "@/lib/bookOperation";
// import { errorToast, successToast } from "@/lib/toasts";
// import { TBook } from "@/schemas/book";
// import DeleteBookModal from "@/components/my-books/DeleteBookModal";
// // import { useEffect, useState } from "react";
import getServerToken from "@/lib/serverToken";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getMyBooks } from "@/lib/bookOperation";
import Retry from "@/components/shared/Retry";
import { TBook } from "@/schemas/book";
import BookTableAction from "./BookTableAction";

// const BookContent = async ({ email }: { email: string }) => {
const BookContent = async () => {
    // const { data: session, isPending } = useSession();
    // const [isLoading, setIsLoading] = useState(true);
    // const [deletingId, setDeletingId] = useState<string | null>(null);
    // const [selectedBookForDelete, setSelectedBookForDelete] = useState<TBook | null>(null);

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const email = session?.user?.email;

    const token = await getServerToken()
    const response = await getMyBooks(email as string, token)

    if (response.error) return <Retry msg={response.msg} />
    const books = response.data as TBook[]

    return (
        <div className="space-y-10">
            {/* my books */}
            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2.5">
                    <h2 className="font-heading text-lg font-medium text-foreground">
                        My Books
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-sm border border-secondary/40 bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                        {books.length} {books.length === 1 ? "book" : "books"}
                    </span>
                </div>
                <p className="text-xs text-muted-foreground">
                    {session?.user?.name}
                </p>
            </div>



            {/* books table */}
            <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-2xs">
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed border-collapse text-left">
    <thead>
        <tr className="border-b border-border/70 bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {/* Book/Author gets 45% on desktop, 65% on mobile */}
            <th className="w-[65%] md:w-[30%] py-3.5 px-4 sm:px-6">Book / Author</th>
            <th className="hidden w-[10%] py-3.5 px-4 md:table-cell">Category</th>
            <th className="hidden w-[14%] py-3.5 px-4 md:table-cell">Date Added</th>
            <th className="hidden w-[14%] py-3.5 px-4 md:table-cell">Copies / Status</th>
            {/* Actions gets a fixed footprint */}
            <th className="w-[35%] md:w-[14%] py-3.5 px-4 sm:px-6 text-right">Actions</th>
        </tr>
    </thead>

    <tbody className="divide-y divide-border/60 text-xs">
        {books.length > 0 ? (
            books.map((book) => {
                const isAvailable = (book.totalCopies ?? 0) > 0;
                const dateAdded = book.createdAt
                    ? format(new Date(book.createdAt), "dd MMM yyyy")
                    : "Recently";

                return (
                    <tr key={book._id} className="group transition-colors hover:bg-muted/30">
                        {/* Book / Author Cell */}
                        <td className="py-4 px-4 sm:px-6 min-w-0">
                            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                {/* Book Thumbnail */}
                                <div className="relative aspect-2/3 h-14 w-10 sm:h-16 sm:w-11 shrink-0 overflow-hidden rounded-xs border border-border/70 bg-muted/50 p-1 shadow-2xs">
                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        sizes="120px"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>

                                {/* Title & Author */}
                                <div className="min-w-0 flex-1 space-y-0.5 sm:space-y-1">
                                    <Link
                                        href={`/book/${book._id}`}
                                        title={book.title}
                                        className="block truncate font-heading text-sm font-medium text-foreground transition-colors hover:text-primary"
                                    >
                                        {book.title}
                                    </Link>
                                    <p
                                        title={book.authorName}
                                        className="truncate text-xs text-muted-foreground"
                                    >
                                        {book.authorName}
                                    </p>
                                </div>
                            </div>
                        </td>

                        {/* Category */}
                        <td className="hidden py-4 px-4 text-muted-foreground md:table-cell truncate">
                            {book.category}
                        </td>

                        {/* Date Added */}
                        <td className="hidden py-4 px-4 text-muted-foreground md:table-cell whitespace-nowrap">
                            {dateAdded}
                        </td>

                        {/* Status / Stock */}
                        <td className="hidden py-4 px-4 md:table-cell whitespace-nowrap">
                            {isAvailable ? (
                                <span className="inline-flex items-center gap-1.5 rounded-sm border border-secondary/40 bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                                    <Check className="h-3 w-3 stroke-[2.5]" />
                                    Available ({book.totalCopies})
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-sm border border-accent/40 bg-accent/20 px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
                                    <Clock className="h-3 w-3 stroke-[2.5]" />
                                    Borrowed out
                                </span>
                            )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                            <BookTableAction book={book} />
                        </td>
                    </tr>
                );
            })
        ) : (
            <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-muted-foreground">
                    You haven&apos;t contributed any books to the library yet.
                </td>
            </tr>
        )}
    </tbody>
</table>
                </div>

                {/* Table Bottom Footer Status */}
                <div className="border-t border-border/70 bg-card px-4 sm:px-6 py-3.5 text-xs text-muted-foreground">
                    Showing {books.length} of {books.length} shared books
                </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Library className="h-4 w-4 shrink-0 text-muted-foreground" />
                <p>Every book you share makes this little library a little richer.</p>
            </div>
        </div>

    );
};

export default BookContent;