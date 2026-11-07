import EditBookForm from '@/components/my-books/EditBookForm';
import Retry from '@/components/shared/Retry';
import { getBookDetails } from '@/lib/bookOperation';
import getServerToken from '@/lib/serverToken';
import { TBook } from '@/schemas/book';
import { notFound } from 'next/navigation';
import React from 'react';

const EditBookContent = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {

    const { id } = await params
    const token = await getServerToken()
    const res = await getBookDetails(id, token)
    if (res.error) return <Retry msg={res.msg} />
    if (res?.error || !res?.data) {
        notFound();
    }

    const book: TBook = Array.isArray(res.data)
        ? res.data[0] as TBook
        : res.data as TBook;

    if (!book) {
        notFound();
    }

    return (
        <EditBookForm book={book} />
    )
}

export default EditBookContent;