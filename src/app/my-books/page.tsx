"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Library, Plus } from "lucide-react";
// import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface SharedBook {
  id: string;
  title: string;
  authorName: string;
  category: string;
  dateAdded: string;
  status: "Available" | "Borrowed";
  image: string;
}

const INITIAL_SHARED_BOOKS: SharedBook[] = [
  {
    id: "1",
    title: "The Creative Act",
    authorName: "Rick Rubin",
    category: "Others",
    dateAdded: "03 Nov 2026",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    title: "Braiding Sweetgrass",
    authorName: "Robin Wall Kimmerer",
    category: "Science",
    dateAdded: "31 Oct 2026",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    title: "The Little Prince",
    authorName: "Antoine de Saint-Exupéry",
    category: "Kids",
    dateAdded: "29 Oct 2026",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
  },
];

export default function MyBooksPage() {
  const [books, setBooks] = React.useState<SharedBook[]>(INITIAL_SHARED_BOOKS);

  const currentUserName = "Abdul Wahid";

  const handleDelete = (id: string, title: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    toast.success(`"${title}" has been removed from your shelf.`);
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
              A little shelf with a lot to give. Manage the books you&apos;ve added to BookNook.
            </p>
          </div>

          <Link href="/add-book" className="shrink-0">
            <Button className="h-10 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
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
            <span className="inline-flex items-center gap-1 rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              <Check className="h-3 w-3 stroke-[2.5]" />
              {books.length} books
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            Only books shared by {currentUserName}
          </p>
        </div>

        {/* Shared Books Table Container */}
        <div className="overflow-hidden rounded-xl border border-border/70 bg-card shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-border/70 bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-3.5 px-6">Book / Author</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Date Added</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>

              {/* Table Rows */}
              <tbody className="divide-y divide-border/60 text-xs">
                {books.map((book) => (
                  <tr
                    key={book.id}
                    className="group transition-colors hover:bg-muted/20"
                  >
                    {/* Book / Author & Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative aspect-[2/3] h-16 w-11 shrink-0 overflow-hidden rounded-xs border border-border/70 bg-[#f4ece3] p-1 shadow-2xs dark:bg-[#182126]">
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        <div className="space-y-1">
                          <Link
                            href={`/books/${book.id}`}
                            className="font-heading text-sm font-medium text-foreground hover:text-primary transition-colors block"
                          >
                            {book.title}
                          </Link>
                          <p className="text-muted-foreground">
                            {book.authorName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 text-muted-foreground">
                      {book.category}
                    </td>

                    {/* Date Added */}
                    <td className="py-4 px-4 text-muted-foreground">
                      {book.dateAdded}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                        {book.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link href={`/books/${book.id}/edit`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-border px-3 text-xs font-medium text-foreground hover:bg-muted"
                          >
                            Edit
                          </Button>
                        </Link>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(book.id, book.title)}
                          className="h-8 border-border px-3 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Footer Status */}
          <div className="border-t border-border/70 bg-card px-6 py-3.5 text-xs text-muted-foreground">
            Showing {books.length} of {books.length} shared books
          </div>
        </div>

        {/* Motivational Footer Microcopy */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Library className="h-4 w-4 shrink-0 text-muted-foreground" />
          <p>Every book you share makes this little library a little richer.</p>
        </div>

      </div>
    </div>
  );
}