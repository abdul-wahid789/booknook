import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TBook } from "@/schemas/book";

interface BookCardProps {
    book: TBook
}

export const BookCard = ({ book }: BookCardProps) => {
    console.log(book)
    const isAvailable = book.totalCopies > 0
    return (
        <Link href={`/book/${book._id}`}>

            <Card className="group relative flex h-full flex-col overflow-hidden p-0 border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                {/* 3:4 Cover Aspect Ratio */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                    <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Ambient Gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-70" />

                    {/* Top Badge */}
                    <div className="absolute top-2 left-2 z-10">
                        <Badge
                            variant={isAvailable ? "default" : "secondary"}
                            className={`px-1.5 py-0 text-[10px] font-medium leading-tight ${isAvailable
                                ? "border-none bg-primary text-primary-foreground"
                                : "border-border bg-destructive/50 text-white"
                                }`}
                        >
                            {isAvailable ? "Available" : "Not Available"}
                        </Badge>
                    </div>

                    {/* Category Pill */}
                    <div className="absolute bottom-2 left-2 z-10">
                        <span className="rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-xs">
                            {book.category}
                        </span>
                    </div>
                </div>

                {/* Metadata */}
                <CardHeader className="p-3 pb-1 space-y-0.5">
                    <CardTitle
                        title={book.title}
                        className="line-clamp-2 min-h-[2.25rem] font-heading text-sm font-medium leading-snug text-card-foreground transition-colors group-hover:text-primary"
                    >
                        {book.title}
                    </CardTitle>
                    <p className="line-clamp-1 text-[11px] text-muted-foreground">
                        by <span className="font-medium text-foreground">{book.authorName}</span>
                    </p>
                </CardHeader>

                {/* Button Footer */}
                <CardFooter className="mt-auto p-3 pt-2">
                    <Link href={`/book/${book._id}`} className="w-full">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="group/btn h-8 w-full  rounded-md border border-border/70 bg-secondary/60 px-2.5 text-sm font-medium text-secondary-foreground transition-all hover:bg-primary hover:text-primary-foreground flex"
                        >
                            <span>View Details</span>
                            <MoveUpRight className="h-3 w-3 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default BookCard;