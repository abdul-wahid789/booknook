import { getAllBooks } from '@/lib/bookOperation';
import AllBooksGrid from '@/components/all-books/AllBooksGrid';
import Retry from '@/components/shared/Retry';
import { TBook } from '@/schemas/book';

export default async function BooksList() {
    const res = await getAllBooks();
    const books = res?.error ? [] : (res?.data ?? []) as TBook[];

    if (res?.error) {
        return <Retry msg={res.msg} />;
    }

    return <AllBooksGrid initialBooks={books} />;
}