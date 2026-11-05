"use client";

import * as React from "react";
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
import { useSession } from "@/lib/auth-client";
import { getMyBooks, deleteBook } from "@/lib/bookOperation";
import { errorToast, successToast } from "@/lib/toasts";
import { TBook } from "@/schemas/book";
import DeleteBookModal from "@/components/my-books/DeleteBookModal";

export default function MyBooksPage() {
  const { data: session, isPending } = useSession();
  const [books, setBooks] = React.useState<TBook[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [selectedBookForDelete, setSelectedBookForDelete] =
    React.useState<TBook | null>(null);

  // Fetch contributed books for the logged-in user
  React.useEffect(() => {
    let isMounted = true;

    async function fetchUserBooks() {
      if (!session?.user?.email) {
        if (!isPending) setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const res = await getMyBooks(session.user.email);
        if (isMounted) {
          if (!res.error && Array.isArray(res.data)) {
            setBooks(res.data);
          } else {
            setBooks([]);
          }
        }
      } catch (err) {
        console.error("Failed to load user books:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchUserBooks();

    return () => {
      isMounted = false;
    };
  }, [session, isPending]);

  const confirmDeleteAction = async () => {
    if (!selectedBookForDelete?._id) return;

    try {
      setDeletingId(selectedBookForDelete._id);
      const res = await deleteBook(selectedBookForDelete._id);

      if (res.error) {
        errorToast(res.msg || "Failed to delete book.");
        return;
      }

      setBooks((prev) =>
        prev.filter((b) => b._id !== selectedBookForDelete._id)
      );
      successToast(
        res.msg ||
          `"${selectedBookForDelete.title}" has been removed from your shelf.`
      );
      setSelectedBookForDelete(null);
    } catch (error) {
      console.error(error);
      errorToast("Unable to remove book. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Top Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Your corner of the library
            </p>
            <h1 className="font-heading text-4xl font-normal tracking-tight text-primary sm:text-5xl">
              Stories you&apos;ve shared.
            </h1>
            <p className="text-sm text-muted-foreground">
              A little shelf with a lot to give. Manage the books you&apos;ve
              added to BookNook.
            </p>
          </div>

          <Link href="/add-book" className="shrink-0">
            <Button className="h-10 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
              <span>Add Book</span>
              <Plus className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Shelf Meta & Indicator */}
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
            {session?.user?.name
              ? `Shared by ${session.user.name}`
              : "Sign in to see your contributed books"}
          </p>
        </div>

        {/* Shared Books Table Container */}
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border/70 bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3.5 px-4 sm:px-6">Book / Author</th>
                  <th className="hidden py-3.5 px-4 md:table-cell">Category</th>
                  <th className="hidden py-3.5 px-4 md:table-cell">Date Added</th>
                  <th className="hidden py-3.5 px-4 md:table-cell">Copies / Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/60 text-xs">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 text-center text-muted-foreground"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                        <span>Gathering your books...</span>
                      </div>
                    </td>
                  </tr>
                ) : books.length > 0 ? (
                  books.map((book) => {
                    const isDeleting = deletingId === book._id;
                    const isAvailable = (book.totalCopies ?? 0) > 0;

                    const dateAdded = book.createdAt
                      ? format(new Date(book.createdAt), "dd MMM yyyy")
                      : "Recently";

                    return (
                      <tr
                        key={book._id}
                        className="group transition-colors hover:bg-muted/30"
                      >
                        {/* Book / Author & Thumbnail */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="relative aspect-[2/3] h-14 w-10 sm:h-16 sm:w-11 shrink-0 overflow-hidden rounded-xs border border-border/70 bg-muted/50 p-1 shadow-2xs">
                              {book.image ? (
                                <Image
                                  src={book.image}
                                  alt={book.title}
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

                            <div className="space-y-0.5 sm:space-y-1 min-w-0">
                              <Link
                                href={`/books/${book._id}`}
                                className="block font-heading text-sm font-medium text-foreground transition-colors hover:text-primary truncate max-w-[150px] sm:max-w-xs md:max-w-none"
                              >
                                {book.title}
                              </Link>
                              <p className="text-muted-foreground truncate max-w-[150px] sm:max-w-xs md:max-w-none">
                                {book.authorName}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category (Hidden on small screens) */}
                        <td className="hidden py-4 px-4 text-muted-foreground md:table-cell">
                          {book.category}
                        </td>

                        {/* Date Added (Hidden on small screens) */}
                        <td className="hidden py-4 px-4 text-muted-foreground md:table-cell">
                          {dateAdded}
                        </td>

                        {/* Status / Stock (Hidden on small screens) */}
                        <td className="hidden py-4 px-4 md:table-cell">
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

                        {/* Action Buttons */}
                        <td className="py-4 px-4 sm:px-6 text-right">
                          <div className="inline-flex items-center justify-end gap-1.5 sm:gap-2">
                            <Link href={`/book/${book._id}/edit`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-border bg-card px-2.5 sm:px-3 text-xs font-medium text-foreground hover:bg-muted hover:text-primary"
                              >
                                Edit
                              </Button>
                            </Link>

                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={isDeleting}
                              onClick={() => setSelectedBookForDelete(book)}
                              className="h-8 border-border bg-card px-2.5 sm:px-3 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              {isDeleting ? (
                                <>
                                  <Loader2 className="h-3 w-3 animate-spin sm:mr-1" />
                                  <span className="hidden sm:inline">Deleting...</span>
                                </>
                              ) : (
                                <>
                                  <Trash2 className="h-3 w-3 sm:mr-1" />
                                  <span className="hidden sm:inline">Delete</span>
                                </>
                              )}
                            </Button>
                          </div>
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
                        ? "Please sign in to view and manage your books."
                        : "You haven't contributed any books to the library yet."}
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

        {/* Motivational Footer Microcopy */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Library className="h-4 w-4 shrink-0 text-muted-foreground" />
          <p>Every book you share makes this little library a little richer.</p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteBookModal
        book={selectedBookForDelete}
        isOpen={Boolean(selectedBookForDelete)}
        isDeleting={Boolean(deletingId)}
        onClose={() => setSelectedBookForDelete(null)}
        onConfirm={confirmDeleteAction}
      />
    </div>
  );
}