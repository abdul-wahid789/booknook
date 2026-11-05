"use client";

import Image from "next/image";
import { format } from "date-fns";
import { AlertTriangle, BookOpen, Loader2, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TBook } from "@/schemas/book";

interface DeleteBookModalProps {
  book: TBook | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteBookModal({
  book,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteBookModalProps) {
  if (!book) return null;

  const formattedDate = book.createdAt
    ? format(new Date(book.createdAt), "dd MMM yyyy")
    : "Recently";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
      <DialogContent className="max-w-[480px] gap-0 rounded-2xl border border-border/80 bg-card p-6 shadow-xl sm:p-7">
        {/* Header with rounded warning badge icon */}
        <DialogHeader className="space-y-4 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
              <Trash2 className="h-5 w-5 stroke-[1.75]" />
            </div>
            <DialogTitle className="font-heading text-2xl font-normal tracking-tight text-foreground sm:text-[1.65rem]">
              Remove this book?
            </DialogTitle>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            You&apos;re about to remove this book from the shared collection. Other readers will
            no longer be able to find or borrow it.
          </p>
        </DialogHeader>

        {/* Embedded Book Preview Card */}
        <div className="mt-5 flex items-center gap-3.5 rounded-xl border border-border/70 bg-muted/30 p-3 sm:p-3.5">
          <div className="relative aspect-[2/3] h-16 w-11 shrink-0 overflow-hidden rounded-xs border border-border/60 bg-muted/60 shadow-2xs">
            {book.image ? (
              <Image
                src={book.image}
                alt={book.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <BookOpen className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 space-y-0.5">
            <h4 className="truncate font-heading text-sm font-medium text-foreground">
              {book.title}
            </h4>
            <p className="truncate text-xs text-muted-foreground">
              {book.authorName}
            </p>
            <p className="text-[11px] text-muted-foreground/80">
              Added by you · {formattedDate}
            </p>
          </div>
        </div>

        {/* Permanent Warning */}
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-destructive">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          <span>This can&apos;t be undone.</span>
        </div>

        {/* Footer Actions */}
        <div className="mt-7 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            onClick={onClose}
            className="h-10 rounded-lg border-border px-5 text-xs font-medium text-foreground hover:bg-muted"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="h-10 rounded-lg bg-[#b43d34] px-5 text-xs font-semibold text-white shadow-sm hover:bg-[#9a342c] dark:bg-destructive dark:hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                <span>Removing...</span>
              </>
            ) : (
              "Delete Book"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}