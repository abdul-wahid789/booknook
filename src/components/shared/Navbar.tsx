"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOutIcon,
  Menu,
  BookOpen,
  PlusCircle,
  BookmarkCheck,
  Library,
  Home,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSession, signOut } from "@/lib/auth-client";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const publicLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "All Books", href: "/all-books", icon: BookOpen },
  ];

  const authLinks = [
    { name: "Add Book", href: "/add-book", icon: PlusCircle },
    { name: "My Books", href: "/my-books", icon: Library },
    { name: "My Borrows", href: "/my-borrows", icon: BookmarkCheck },
  ];

  const visibleLinks = data?.user ? [...publicLinks, ...authLinks] : publicLinks;

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <div className="relative h-7 w-7">
            <Image
              src="/logo.png"
              alt="BookNook Logo"
              fill
              sizes="24px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-primary">
            BookNook
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 md:flex lg:gap-2">
          {visibleLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs font-medium transition-colors hover:text-foreground ${isActive
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                  }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute inset-x-2 -bottom-4.75 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ModeToggle />
          {isPending ? (
            <Button variant="outline" size="sm" disabled className="h-9 gap-2 text-xs">
              <Spinner className="h-3.5 w-3.5" />
              {/* <span className="hidden sm:inline">Loading...</span> */}
            </Button>
          ) : data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    className="flex h-9 items-center gap-2 rounded-full border-border bg-card py-1 pl-3 pr-1 text-xs hover:bg-muted"
                  />
                }
              >
                <span className="hidden max-w-30 truncate font-medium text-foreground sm:inline">
                  {data.user.name}
                </span>
                <Avatar className="h-7 w-7 border border-border">
                  <AvatarImage
                    src={data.user.image || undefined}
                    alt={data.user.name || "Avatar"}
                  />
                  <AvatarFallback className="bg-secondary text-[11px] font-semibold text-secondary-foreground">
                    {getInitials(data.user.name)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 border-border">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-foreground">{data.user.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {data.user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/my-books">
                    <DropdownMenuItem className="cursor-pointer">
                      <Library className="mr-2 h-4 w-4" />
                      <span>My Books</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/my-borrows">
                    <DropdownMenuItem className="cursor-pointer">
                      <BookmarkCheck className="mr-2 h-4 w-4" />
                      <span>My Borrows</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className="h-9 px-3 text-xs">
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm" className="h-9 bg-primary px-3 text-xs text-primary-foreground hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Drawer */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-border" />
                }
              >
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-70 flex-col justify-between p-6 sm:w-[320px]">
                <div className="space-y-6">
                  <SheetHeader className="text-left">
                    <SheetTitle className="flex items-center gap-2">
                      <div className="relative h-6 w-6">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" sizes='50' />
                      </div>
                      <span className="font-heading text-lg font-bold text-primary">BookNook</span>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Filtered Mobile Links */}
                  <div className="flex flex-col space-y-1">
                    {visibleLinks.map((link) => {
                      const isActive = pathname === link.href;
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-colors ${isActive
                              ? "bg-secondary font-semibold text-secondary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                          {Icon && <Icon className="h-4 w-4 shrink-0" />}
                          <span>{link.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Drawer Auth Footer */}
                <div className="border-t border-border pt-4">
                  {data?.user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-1">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarImage src={data.user.image || undefined} />
                          <AvatarFallback className="bg-secondary text-xs">
                            {getInitials(data.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-foreground">
                            {data.user.name}
                          </p>
                          <p className="truncate text-[11px] text-muted-foreground">
                            {data.user.email}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setMobileOpen(false);
                          handleSignOut();
                        }}
                        className="w-full justify-start gap-2 border-border text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <LogOutIcon className="h-4 w-4" />
                        <span>Sign Out</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full text-xs">
                          Login
                        </Button>
                      </Link>
                      <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full bg-primary text-xs text-primary-foreground hover:bg-primary/90">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  );
}