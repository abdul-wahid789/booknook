'use client'

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { returnBook } from '@/lib/bookOperation';
import getClientToken from '@/lib/clientToken';
import { errorToast, successToast } from '@/lib/toasts';
import { TBook, TBorrowBook } from '@/schemas/book';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

const ReturnBookAction = ({ book }: { book: TBorrowBook }) => {
    const [isSubmitting, setSubmitting] = useState(false)
    async function handleReturnBook() {
        setSubmitting(true);
        const token = await getClientToken()
        const res = await returnBook(book._id as string, token);
        if (res.error) {
            errorToast(res.msg);
            setSubmitting(false)
            return;
        }
        setSubmitting(false)
        successToast(res.msg)
        redirect('/my-borrows')
    }

    return (
        <td className="px-6 py-4 text-right">
            <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isSubmitting}
                onClick={handleReturnBook}
                className="h-8 border-border bg-card px-3 text-xs font-medium text-foreground hover:bg-muted hover:text-primary"

            >
                {isSubmitting ? (
                    <>
                        <Spinner />
                        Returning...
                    </>
                ) : (
                    "Return Book"
                )}
            </Button>
        </td>
    );
};

export default ReturnBookAction;