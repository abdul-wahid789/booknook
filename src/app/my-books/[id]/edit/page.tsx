import { notFound } from "next/navigation";
import { getBookDetails } from "@/lib/bookOperation";
import EditBookForm from "@/components/my-books/EditBookForm";

export default async function EditBookPage({
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

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <EditBookForm book={book} />
      </div>
    </main>
  );
}