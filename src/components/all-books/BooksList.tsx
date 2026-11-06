import { getAllBooks } from '@/lib/bookOperation';
import AllBooksGrid from '@/components/all-books/AllBooksGrid';
import Retry from '@/components/shared/Retry';

export default async function BooksList() {
    const res = await getAllBooks();
    const books = res?.error ? [] : (res?.data ?? []);

    if (res?.error) {
        return <Retry msg={res.msg} />;
    }

    return <AllBooksGrid initialBooks={books} />;
}