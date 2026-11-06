'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';

const Retry = ({ msg }: { msg: string }) => {
    const router = useRouter();


    return (
        <div className="max-w-2xl mx-auto my-8 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center flex flex-col gap-3 items-center justify-center">
            <p className="text-2xl font-bold text-destructive">{msg}</p>
            <Button size={"lg"} className='w-fit' onClick={() => router.refresh()}>Try again</Button>
        </div>
    );
};

export default Retry;