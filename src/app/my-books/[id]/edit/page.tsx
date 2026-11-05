import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";

import { getBookDetails } from "@/lib/bookOperation";
import EditBookForm from "@/components/my-books/EditBookForm";

interface EditBookPageProps {
  params: Promise<{ id: string }>;
}

// 1. Move `await params` inside the component that sits inside <Suspense>
async function EditBookContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getBookDetails(id);

  if (res?.error || !res?.data) {
    notFound();
  }

  const book = Array.isArray(res.data) ? res.data[0] : res.data;

  if (!book) {
    notFound();
  }

  return <EditBookForm book={book} />;
}

function EditBookSkeleton() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <p className="font-heading text-sm text-foreground">
        Retrieving book details...
      </p>
    </div>
  );
}

// 2. The main page component remains synchronous/instant and renders the shell immediately
export default function EditBookPage({ params }: EditBookPageProps) {
  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Suspense fallback={<EditBookSkeleton />}>
          <EditBookContent params={params} />
        </Suspense>
      </div>
    </main>
  );
}