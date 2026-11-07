import { Suspense } from "react";
import MyBorrowContent from "./_components/MyBorrowContent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import MyBorrowSkeleton from "./_components/MyBorrowSkeleton";

export default function BorrowedBooksPage() {

  // const [borrowedBooks, setBorrowedBooks] = React.useState<IBorrowedItem[]>([]);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [returningId, setReturningId] = React.useState<string | null>(null);

  // // Fetch active borrows
  // React.useEffect(() => {
  //   let isMounted = true;

  //   async function fetchBorrows() {
  //     if (!session?.user?.email) {
  //       if (!isPending) setIsLoading(false);
  //       return;
  //     }

  //     try {
  //       setIsLoading(true);
  //       const res = await getMyBorrows(session.user.email);
  //       if (isMounted) {
  //         if (!res.error && Array.isArray(res.data)) {
  //           setBorrowedBooks(res.data);
  //         } else {
  //           setBorrowedBooks([]);
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch borrows:", err);
  //     } finally {
  //       if (isMounted) setIsLoading(false);
  //     }
  //   }

  //   fetchBorrows();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [session, isPending]);

  // // Dynamic due status calculator mapped to design system variants
  // const getDueStatus = (dueDateStr: string | Date) => {
  //   const targetDate =
  //     typeof dueDateStr === "string" ? parseISO(dueDateStr) : new Date(dueDateStr);
  //   const diff = differenceInCalendarDays(targetDate, new Date());

  //   if (diff < 0) {
  //     return {
  //       label: `Overdue by ${Math.abs(diff)}d`,
  //       variant: "destructive" as const,
  //     };
  //   }
  //   if (diff === 0) {
  //     return { label: "Due today", variant: "warning" as const };
  //   }
  //   return { label: `${diff} days left`, variant: "normal" as const };
  // };

  // const dueTodayBooks = borrowedBooks.filter((item) => {
  //   const status = getDueStatus(item.returnDueDate);
  //   return status.variant === "warning" || status.variant === "destructive";
  // });

  // async function handleReturnBook(borrowId: string, title?: string) {
  //   try {
  //     setReturningId(borrowId);
  //     const res = await returnBook(borrowId);

  //     if (res.error) {
  //       errorToast(res.msg || "Failed to return book. Please try again.");
  //       return;
  //     }

  //     setBorrowedBooks((prev) => prev.filter((item) => item._id !== borrowId));
  //     successToast(
  //       `"${title || "Book"}" returned successfully!`,
  //       "Thank you for passing it on for the next reader."
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     errorToast("Failed to return book. Please try again.");
  //   } finally {
  //     setReturningId(null);
  //   }
  // }

  return (
    <div className="min-h-screen w-full bg-background py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              A little time. A whole new world.
            </p>
            <h1 className="font-heading text-4xl font-normal tracking-tight text-primary sm:text-5xl">
              Your current chapters.
            </h1>
            <p className="text-sm text-muted-foreground">
              Keep track of your borrowed books. Finished a story? Return it for the next reader.
            </p>
          </div>

          <Link href="/books" className="shrink-0">
            <Button
              variant="outline"
              className="h-10 rounded-lg border-border bg-card px-4 text-xs font-semibold text-foreground hover:bg-muted"
            >
              <span>Explore All Books</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <Suspense fallback={<MyBorrowSkeleton />}>
          <MyBorrowContent />
        </Suspense>

        {/* Motivational Footnote */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Heart className="h-4 w-4 shrink-0 text-muted-foreground" />
          <p>Read at your own pace within your borrowing window. Returning early is always welcome.</p>
        </div>
      </div>
    </div>
  );
}