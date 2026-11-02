import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';

const BannerGrid = ({ data }) => {
    return (
        <div className='flex'>
            <div className='space-y-5 flex flex-col justify-center'>
                <h3>{data.topText}</h3>
                <h1 className='text-4xl font-bold font-heading'>
                    {data.hd1} <br />
                    {data.hd2}
                </h1>
                <p className='w-1/2'>{data.des}</p>

                <Link href="/all-books" className="flex items-center gap-2 ">
                    <Button size={'lg'}>Browse Books <MoveRight /></Button>
                </Link>

            </div>

            <div>
                <Image
                    src={data.img}
                    alt="Banner Image"
                    width={500}
                    height={300}
                    className="object-cover rounded-lg rounded-tl-[30%] w-150 h-100 "
                />
            </div>
        </div>
    );
};

export default BannerGrid;