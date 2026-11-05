import React from 'react';
import BookCard from '../shared/BookCard';
import { getNewBooks } from '@/lib/bookOperation';
import { IResponse } from '@/schemas/server';

const NewArrival = async () => {
    const resData: IResponse = await getNewBooks()

    if (resData.error) {
        console.log(resData.msg)
    }

    return (
        <section className='max-w-7xl mx-auto mt-18 space-y-10'>
            <div className='space-y-2'>
                <p className='font-bold text-muted-foreground'>FRESH ON THE SHARED SHELF</p>
                <h1 className='text-4xl font-heading text-primary'>New Arrivals</h1>
                <p className='text-muted-foreground'>Six recent additions. Which one will you open first?</p>
            </div>

            {
                resData.error ? (
                    <p className='bg-destructive'>{resData.msg}</p>

                ) : (
                    <div className='grid grid-cols-6 gap-5'>
                        {
                            resData.data.map(book=><BookCard key={book._id} book={book}/>)
                        }
                    </div>)

            }
        </section>
    );
};

export default NewArrival;