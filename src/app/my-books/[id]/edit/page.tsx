import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";

import { getBookDetails } from "@/lib/bookOperation";
import EditBookForm from "@/components/my-books/EditBookForm";
import EditBookSkeleton from "./_components/EditBookSkeleton";
import EditBookContent from "./_components/EditBookContent";

interface EditBookPageProps {
  params: Promise<{ id: string }>;
}

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