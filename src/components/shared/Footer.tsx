// components/shared/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import { FaGithub, FaInstagram, FaFacebookF } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground mt-16 sm:mt-24 border-t border-primary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-5 pr-0 sm:pr-4 items-center md:items-start flex flex-col">
            <Link
              href="/"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-90"
            >
              <div className="relative h-6 w-6">
                <Image
                  src="/logo-white.png"
                  alt="BookNook Logo"
                  sizes="24px"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                BookNook
              </span>
            </Link>

            <p className="text-center md:text-left  max-w-xs text-xs sm:text-sm leading-relaxed text-white/60">
              A little online library with room for your next favorite. Add a book,
              borrow a book, return a book.
            </p>
          </div>

          {/* Navigation Column (Hidden on mobile) */}
          <div className="hidden md:block space-y-3 lg:col-span-2">
            <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              Find your next read
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/all-books" className="transition-colors hover:text-white">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/sign-up" className="transition-colors hover:text-white">
                  Create an account
                </Link>
              </li>
            </ul>
          </div>

          {/* Say Hello Column */}
          <div className="space-y-3 lg:col-span-3 hidden md:block">
            <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              Say hello
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-white/60">
              <p>
                <a
                  href="mailto:abdulwahid.contact@gmail.com"
                  className="transition-colors hover:text-white break-all"
                >
                  abdulwahid.contact@gmail.com
                </a>
              </p>
              <p className="leading-relaxed">
                Questions about borrowing?
                <br />
                We&apos;re a message away.
              </p>
            </div>
          </div>

          {/* Social Links Column */}
          <div className="space-y-3 lg:col-span-2 flex flex-col items-center md:items-start">
            <h4 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
              Stay in the Touch
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/60 flex md:flex-col gap-2">
              <li>
                <a
                  href="https://abdulwahid789.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Globe className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="hidden md:block">Portfolio</span>
                  <ArrowUpRight className="hidden md:block h-3 w-3 stroke-[1.75] opacity-60 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/abdul-wahid789/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <FaGithub className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="hidden md:block">GitHub</span>
                  <ArrowUpRight className="hidden md:block h-3 w-3 stroke-[1.75] opacity-60 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/abdul.wahid789"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <FaInstagram className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="hidden md:block">Instagram</span>
                  <ArrowUpRight className="hidden md:block h-3 w-3 stroke-[1.75] opacity-60 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/abdulwahid.fb"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <FaFacebookF className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="hidden md:block">Facebook</span>
                  <ArrowUpRight className="hidden md:block h-3 w-3 stroke-[1.75] opacity-60 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center md:items-start justify-between gap-4 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>© 2026 BookNook. All rights reserved.</p>
          <p className="font-heading italic text-white/70">
            Good stories are meant to be shared.
          </p>
        </div>
      </div>
    </footer>
  );
}