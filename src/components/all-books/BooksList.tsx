import { getAllBooks } from "@/lib/bookOperation";
import AllBooksGrid from "./AllBooksGrid";

export default async function BooksList() {
    const res = await getAllBooks();
    const books = res?.error ? [] : (res?.data ?? []);

    if (res?.error) {
        return (
            <div className="my-8 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center">
                <p className="text-xs font-medium text-destructive">{res.msg}</p>
            </div>
        );
    }

    return <AllBooksGrid initialBooks={books} />;
}