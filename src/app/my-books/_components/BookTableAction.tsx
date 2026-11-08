import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import BookDeleteModal from './BookDeleteModal';
import { TBook } from '@/schemas/book';

const BookTableAction = ({book}:{book:TBook}) => {

    return (
        <div className="inline-flex items-center justify-end gap-1.5 sm:gap-2">
            <Link href={`/my-books/${book._id}/edit`}>
                <Button
                    variant="outline"
                    >
                    Edit
                </Button>
            </Link>
            <BookDeleteModal book={book} />

        </div>
    );
};

export default BookTableAction;