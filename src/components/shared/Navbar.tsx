'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { useSession } from '@/lib/auth-client';
import { Spinner } from '../ui/spinner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSubTrigger, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { BadgeCheckIcon, CircleUserRound, LogOutIcon, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const links = [
        { name: "Home", href: "/" },
        { name: "All Books", href: "/all-books" },
        { name: "Add Book", href: "/add-book" },
        { name: "My Book", href: "/my-books" },
        { name: "My Borrow", href: "/my-borrows" },
    ]

    const { data, isPending } = useSession()

    const pathname = usePathname()

    const activeClass = 'border-primary/50 border-b-3 font-semibolda hover:text-muted-foreground '

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
                    {
                        links.map((link) => (
                            <Link key={link.name} href={link.href} className={`p-1 ${link.href === pathname ? activeClass : ''}`}>
                                {link.name}
                            </Link>
                        ))
                    }
                </div>

                {
                    isPending ? (
                        <div className='flex gap-2'>

                            <Button variant={"outline"} disabled> <Spinner /> Loading...</Button>
                        </div>
                    ) : data ? (
                        <div className='flex gap-2'>
                            {/* <Button variant={"outline"}><Link href="/profile">{data.user.name}</Link></Button>
                            <Button ><Link href="/logout">Logout</Link></Button> */}




                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    render={
                                        <Button
                                            variant="outline"
                                            className="flex items-center gap-2 rounded-full py-1 pl-3 pr-1 h-auto"
                                        />
                                    }
                                >
                                    <span className="text-sm font-medium">{data.user.name}</span>
                                    <Avatar className="h-7 w-7">
                                        <AvatarImage
                                            src={data.user.image as string}
                                            alt={data.user.name as string}
                                        />
                                        <AvatarFallback>{data.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="start" className="w-56">
                                    <div className="px-2 py-1.5">
                                        <p className="text-sm font-medium leading-none">{data.user.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1 truncate">
                                            {data.user.email}
                                        </p>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <CircleUserRound className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">
                                        <LogOutIcon className="mr-2 h-4 w-4" />
                                        <span>Sign Out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {/* <Avatar>
                                <AvatarImage
                                    src={data.user.image as string}
                                    alt="avater"
                                />
                                <AvatarFallback>{data.user.name.charAt(0)}</AvatarFallback>
                            </Avatar> */}
                        </div>
                    ) : (
                        <div className='flex gap-2'>
                            <Button variant={"outline"}><Link href="/login">Login</Link></Button>
                            <Button ><Link href="/signup">Sign Up</Link></Button>
                        </div>
                    )
                }

            </div>
        </nav>
    );
};

export default Navbar;