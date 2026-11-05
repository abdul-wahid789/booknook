"use client";

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { ArrowDownWideNarrow, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import BookCard from "@/components/shared/BookCard";
import { TBook } from "@/schemas/book";

interface AllBooksGridProps {
    initialBooks: TBook[];
}

export default function AllBooksGrid({ initialBooks }: AllBooksGridProps) {

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState<"newest" | "title">("newest");

    const filteredBooks = initialBooks
        .filter((book) => {
            const matchesSearch =
                book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.authorName.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" ||
                book.category.toLowerCase() === selectedCategory.toLowerCase();

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "title") return a.title.localeCompare(b.title);
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        });

    return (
        <>
            <div className="my-10 flex flex-col gap-3 rounded-lg border border-border/80 bg-card p-2.5 shadow-2xs sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Title or Author"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10 border-none bg-transparent pl-9 text-xs focus-visible:ring-0"
                    />
                </div>

                <div className="h-6 w-px bg-border hidden sm:block" />

                {/* Category */}
                <div className="w-full sm:w-45">
                    <Select
                        value={selectedCategory}
                        onValueChange={(val) => setSelectedCategory(val ?? "All")}
                    >
                        <SelectTrigger className="h-10 border-none bg-transparent text-xs">
                            <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent className="bg-card">
                            <SelectItem value="All">All categories</SelectItem>
                            <SelectItem value="Fiction">Fiction</SelectItem>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="History">History</SelectItem>
                            <SelectItem value="Kids">Kids</SelectItem>
                            <SelectItem value="Poetry">Poetry</SelectItem>
                            <SelectItem value="Philosophy">Philosophy</SelectItem>
                            <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="h-6 w-px bg-border hidden sm:block" />

                {/* Sort */}
                <div className="flex items-center justify-between gap-3 px-2 text-xs text-muted-foreground sm:px-0">
                    <span>{filteredBooks.length} books</span>
                    <span className="text-border"></span>
                    <button
                        type="button"
                        onClick={() => setSortBy(sortBy === "newest" ? "title" : "newest")}
                        className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                        <span>{sortBy === "newest" ? "Newest first" : "Alphabetical"}</span>
                        <ArrowDownWideNarrow className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {filteredBooks.map((book) => (
                        <BookCard key={book._id ?? book.title} book={book} />
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border border-dashed border-border py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No books found</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        Try adjusting your search query or selected category.
                    </p>
                </div>
            )}
        </>
    );
}