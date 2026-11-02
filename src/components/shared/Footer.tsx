import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-primary text-muted mt-15">
            <div className="mx-auto max-w-7xl py-16">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

                    {/* Brand Column */}
                    <div className="space-y-4 lg:col-span-5 pr-4">
                        {/* <Link href="/" className="inline-flex items-center gap-2.5 text-white">
                            <Image
                                src={'/logo.png'}
                                alt={'logo'}
                                width={25}
                                height={25}
                                className="h-6 w-6 object-cover"
                            />
                            <span className="font-heading text-2xl font-normal tracking-tight">
                                BookNook
                            </span>
                        </Link> */}

                        <div className='flex items-center gap-1 '>
                            <Image
                                src="/logo-white.png"
                                alt="Logo"
                                width={25}
                                height={25}
                                className="h-6 w-6 object-cover "
                            />
                            <p className='text-white font-bold text-xl font-heading'>BookNook</p>
                        </div>

                        <p className="max-w-xs text-sm leading-relaxed text-white/40">
                            A little online library with room for your next favorite. Add a book,
                            borrow a book, return a book.
                        </p>
                    </div>

                    {/* Navigation Column */}
                    <div className="space-y-3 lg:col-span-2">
                        <h4 className="text-sm font-semibold text-white">
                            Find your next read
                        </h4>
                        <ul className="space-y-2.5 text-sm text-white/40">
                            <li>
                                <Link href="/" className="transition-colors hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/books" className="transition-colors hover:text-white">
                                    All Books
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup" className="transition-colors hover:text-white">
                                    Create an account
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Say Hello Column */}
                    <div className="space-y-3 lg:col-span-3">
                        <h4 className="text-sm font-semibold text-white">
                            Say hello
                        </h4>
                        <div className="space-y-2.5 text-sm text-white/40">
                            <p>
                                <a
                                    href="mailto:abdulwahid.contact@gmail.com"
                                    className="transition-colors hover:text-white"
                                >
                                    abdulwahid.contact@gmail.com
                                </a>
                            </p>
                            <p className="leading-snug">
                                Questions about borrowing?
                                <br />
                                We&apos;re a message away.
                            </p>
                        </div>
                    </div>

                    {/* Social Column */}
                    <div className="space-y-3 lg:col-span-2">
                        <h4 className="text-sm font-semibold text-white">
                            Stay in the loop
                        </h4>
                        <ul className="space-y-2 text-sm text-white/40">
                            <li>
                                <a
                                    href="https://abdulwahid789.vercel.app/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 transition-colors hover:text-white"
                                >
                                    Portfolio
                                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.75]" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/abdul-wahid789/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 transition-colors hover:text-white"
                                >
                                    Github
                                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.75]" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://instagram.com/abdul.wahid789"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 transition-colors hover:text-white"
                                >
                                    Instagram
                                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.75]" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://facebook.com/abdulwahid.fb"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 transition-colors hover:text-white"
                                >
                                    Facebook
                                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.75]" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Separator */}
                <div className="my-10 h-px w-full bg-white/10" />

                {/* Bottom Bar */}
                <div className="flex flex-col items-start justify-between gap-4 text-xs text-[#8da6ae] sm:flex-row sm:items-center">
                    <p>© 2026 BookNook. All rights reserved.</p>
                    <p className="font-heading italic text-[#b8cbd0]">
                        Good stories are meant to be shared.
                    </p>
                </div>
            </div>
        </footer>
    );
}