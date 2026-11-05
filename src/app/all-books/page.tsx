import AllBooksGrid from '@/components/all-books/AllBooksGrid';
import BooksList from '@/components/all-books/BooksList';
import React, { Suspense } from 'react';

const page = () => {


    return (
        <div className="min-h-screen w-full bg-background py-14 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className='space-y-2'>
                    <p className='font-bold text-muted-foreground'>The Community Collection</p>
                    <h1 className='text-4xl font-heading text-primary'>Find your next chapter.</h1>
                    <p className='text-muted-foreground'>Good books, shared by good people. Browse the shelves and borrow a story for a few days.</p>
                </div>

                <Suspense fallback={'loadingg.....'}>
                    <BooksList />
                </Suspense>

            </div>
        </div>
    );
};

export default page;