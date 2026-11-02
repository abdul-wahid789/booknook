import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const Navbar = () => {
    const links = [
        { name: "Home", href: "/" },
        { name: "All Books", href: "/all-books" },
        { name: "Add Book", href: "/add-book" },
    ]

    return (
        <nav className='w-full backdrop-blur-2xl bg-background/70 sticky top-0 z-50'>
            <div className='mx-auto max-w-7xl flex justify-between items-center py-5'>
                <Link href='/'>
                    <div className='flex items-center gap-1'>
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={25}
                            height={25}
                        />
                        <p className='text-primary font-bold text-xl font-heading'>BookNook</p>
                    </div>
                </Link>
                <div className='flex gap-4'>
                    {links.map((link) => (
                        <Link key={link.name} href={link.href}>
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className='flex gap-2'>
                    <Button variant={"outline"}><Link href="/login">Login</Link></Button>
                    <Button ><Link href="/signup">Sign Up</Link></Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;